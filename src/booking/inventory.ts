import { buildSeats, TIERS } from '@/stadium/layout';

export const matches = [
  { id: 'demo-01', home: 'OMNYA FC', away: 'LAB UNITED', homeCode: 'OFC', awayCode: 'LU', competition: 'Stadium Invitational', date: '2026-12-05', time: '19:30', price: 1200, multiplier: 1, label: 'Opening night', status: 'On sale' },
  { id: 'demo-02', home: 'LAB UNITED', away: 'OMNYA FC', homeCode: 'LU', awayCode: 'OFC', competition: 'Winter Cup', date: '2026-12-12', time: '20:00', price: 1500, multiplier: 1.25, label: 'Under the lights', status: 'On sale' },
  { id: 'demo-03', home: 'OMNYA FC', away: 'LAB UNITED', homeCode: 'OFC', awayCode: 'LU', competition: 'Stadium Invitational', date: '2026-12-19', time: '18:30', price: 1320, multiplier: 1.1, label: 'The season finale', status: 'On sale' },
] as const;
export type Match = typeof matches[number];
export type Stand = 'North' | 'South' | 'East' | 'West';
export const stands: Stand[] = ['North', 'South', 'East', 'West'];
export type Seat = { id: string; index: number; stand: Stand; tier: string; block: string; row: number; number: number; category: string; position: [number, number, number]; rotation: number; capacity: number };
const geometry = buildSeats();
const rowCounters = new Map<string, number>();
export const seats: Seat[] = Array.from({ length: geometry.count }, (_, index) => {
  const x = geometry.transforms[index * 4] ?? 0;
  const y = geometry.transforms[index * 4 + 1] ?? 0;
  const z = geometry.transforms[index * 4 + 2] ?? 0;
  const stand: Stand = Math.abs(x) / 60 > Math.abs(z) / 42 ? (x > 0 ? 'East' : 'West') : (z > 0 ? 'South' : 'North');
  const tierIndex = y >= TIERS[2].y0 ? 2 : y >= TIERS[1].y0 ? 1 : 0;
  const tier = TIERS[tierIndex] ?? TIERS[0];
  const row = Math.round((y - tier.y0) / tier.rise) + 1;
  const along = stand === 'North' || stand === 'South' ? x : z;
  const extent = stand === 'North' || stand === 'South' ? 98 : 78;
  const blockIndex = Math.min(7, Math.max(0, Math.floor((along + extent) / (extent * 2) * 8)));
  const block = `${stand[0]}${tierIndex + 1}${blockIndex + 1}`;
  const key = `${block}-${row}`;
  const number = (rowCounters.get(key) ?? 0) + 1;
  rowCounters.set(key, number);
  const vip = tierIndex === 1 && stand === 'South' && Math.abs(x) < 22;
  return { id: `seat-${index}`, index, stand, tier: tier.name, block, row, number, category: vip ? 'Executive' : tierIndex === 1 ? 'Premium' : tierIndex === 2 ? 'Standard' : 'Pitch-side', position: [x, y, z], rotation: geometry.transforms[index * 4 + 3] ?? 0, capacity: 1 };
});
export const skyboxes: Seat[] = [-15, -5, 5, 15].map((x, index) => ({ id: `skybox-${index + 1}`, index: geometry.count + index, stand: 'South', tier: 'Skybox', block: `VIP${index + 1}`, row: 1, number: index + 1, category: 'Private Skybox', position: [x, 7.3, 63], rotation: Math.PI, capacity: 8 }));
export const allSeats = [...seats, ...skyboxes];
export const seatById = new Map(allSeats.map(s => [s.id, s]));
export function matchById(id: string): Match { return matches.find(m => m.id === id) ?? matches[0]; }
export type Status = 'available' | 'booked' | 'soldout';
export function seatStatus(seat: Seat, matchId: string, reserved: string[] = []): Status {
  if (reserved.includes(`${matchId}:${seat.id}`)) return 'booked';
  if (seat.category === 'Private Skybox') return seat.number === 4 ? 'booked' : 'available';
  const seed = (seat.index * 37 + (matchId === 'demo-02' ? 41 : matchId === 'demo-03' ? 73 : 0)) % 100;
  if (seat.block.endsWith('1') && seat.tier === 'Upper') return 'soldout';
  return seed < 16 ? 'soldout' : seed < 43 ? 'booked' : 'available';
}
export function seatPrice(seat: Seat, match: Match): number {
  const base = seat.category === 'Private Skybox' ? 80000 : seat.category === 'Executive' ? 7500 : seat.tier === 'Middle' ? 2500 : seat.tier === 'Upper' ? 1200 : 1800;
  const standPremium = seat.stand === 'South' || seat.stand === 'North' ? 1.15 : 1;
  return Math.round(base * (seat.category === 'Private Skybox' ? 1 : standPremium) * match.multiplier / 10) * 10;
}
export function seatView(seat: Seat) {
  const [x, y, z] = seat.position;
  return { pos: [x, y + 1.15, z] as [number, number, number], target: [0, 1, 0] as [number, number, number], distance: Math.round(Math.hypot(x, z)), angle: Math.round(Math.atan2(y + 1.15, Math.hypot(x, z)) * 180 / Math.PI), perspective: seat.stand === 'East' || seat.stand === 'West' ? 'Behind the goal' : Math.abs(x) < 25 ? 'Central pitch view' : 'Corner-side view' };
}
export function reserveDemo(ids: string[], matchId: string, reserved: string[]): string[] {
  if (!ids.length) throw new Error('Please select at least one seat.');
  const unique = [...new Set(ids)];
  for (const id of unique) {
    const seat = seatById.get(id);
    if (!seat || seatStatus(seat, matchId, reserved) !== 'available') throw new Error('A selected seat is no longer available. Please choose another.');
  }
  return [...reserved, ...unique.map(id => `${matchId}:${id}`)];
}
export const money = (value: number) => `₹${value.toLocaleString('en-IN')}`;
export const matchDate = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });