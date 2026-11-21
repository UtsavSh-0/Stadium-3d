import { allSeats, seatStatus, type Seat } from './inventory';
export const seatsBySection = new Map<string, Seat[]>();
export const seatsByBlock = new Map<string, Seat[]>();
for (const seat of allSeats) {
  const sectionKey = `${seat.stand}:${seat.tier}`;
  const section = seatsBySection.get(sectionKey) ?? [];
  section.push(seat); seatsBySection.set(sectionKey, section);
  const block = seatsByBlock.get(seat.block) ?? [];
  block.push(seat); seatsByBlock.set(seat.block, block);
}
export function countBlock(list: Seat[], matchId: string, reserved: string[]) {
  const result = { total: list.length, available: 0, booked: 0, soldout: 0 };
  for (const seat of list) result[seatStatus(seat, matchId, reserved)]++;
  return result;
}