import { describe, expect, it } from 'vitest';
import { seats, matches, reserveDemo, seatPrice, seatStatus, seatView } from './inventory';
describe('match-specific demo inventory', () => {
  const available = seats.find(s => seatStatus(s, 'demo-01') === 'available');
  it('rejects booked seats', () => {
    const booked = seats.find(s => seatStatus(s, 'demo-01') === 'booked');
    if (!booked) throw new Error('Booked inventory missing');
    expect(() => reserveDemo([booked.id], 'demo-01', [])).toThrow('no longer available');
  });
  it('rejects sold-out seats', () => {
    const soldout = seats.find(s => seatStatus(s, 'demo-01') === 'soldout');
    if (!soldout) throw new Error('Sold-out inventory missing');
    expect(() => reserveDemo([soldout.id], 'demo-01', [])).toThrow('no longer available');
  });
  it('prevents repeat reservations for the same match', () => {
    if (!available) throw new Error('Available inventory missing');
    const reserved = reserveDemo([available.id], 'demo-01', []);
    expect(() => reserveDemo([available.id], 'demo-01', reserved)).toThrow('no longer available');
  });
  it('reserves a seat only for the selected match', () => {
    const seat = seats.find(s => seatStatus(s, 'demo-01') === 'available' && seatStatus(s, 'demo-02') === 'available');
    if (!seat) throw new Error('Shared available inventory missing');
    const reserved = reserveDemo([seat.id], 'demo-01', []);
    expect(seatStatus(seat, 'demo-01', reserved)).toBe('booked');
    expect(seatStatus(seat, 'demo-02', reserved)).toBe('available');
  });
  it('varies prices by tier, stand and selected match', () => {
    if (!available) throw new Error('Available inventory missing');
    expect(seatPrice({ ...available, stand: 'East', tier: 'Middle', category: 'Premium' }, matches[0])).toBe(2500);
    expect(seatPrice({ ...available, stand: 'East', tier: 'Upper', category: 'Standard' }, matches[0])).toBe(1200);
    expect(seatPrice({ ...available, stand: 'North', tier: 'Middle', category: 'Premium' }, matches[0])).toBe(2880);
    expect(seatPrice({ ...available, stand: 'East', tier: 'Middle', category: 'Premium' }, matches[1])).toBe(3130);
  });
  it('previews the selected model position at seated eye level', () => {
    const first = seats[0]; const second = seats[20];
    if (!first || !second) throw new Error('Seats missing');
    expect(seatView(first).pos).toEqual([first.position[0], first.position[1] + 1.15, first.position[2]]);
    expect(seatView(first).pos).not.toEqual(seatView(second).pos);
  });
});