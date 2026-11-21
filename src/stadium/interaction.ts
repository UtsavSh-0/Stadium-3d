import type { Seat } from '@/booking/inventory';
export type StadiumInteraction = { matchId: string; selected: string[]; reserved: string[]; onSeat: (id: string) => void; onHover: (seat: Seat | null) => void };
export type CameraTarget = { pos: [number, number, number]; target: [number, number, number]; key: string };