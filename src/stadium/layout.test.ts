import { describe, expect, it } from "vitest";
import { BLUE_SEAT_RATIO, PITCH, TIERS, buildSeats, buildStairs, stadiumStats } from "./layout";

describe("stadium layout", () => {
  it("has three seating tiers", () => {
    expect(TIERS).toHaveLength(3);
  });

  it("uses a regulation 105 x 68 m pitch", () => {
    expect(PITCH.length).toBe(105);
    expect(PITCH.width).toBe(68);
  });

  it("places thousands of individual seats", () => {
    const seats = buildSeats();
    expect(seats.count).toBeGreaterThan(10000);
    expect(seats.perTier.every((n) => n > 1000)).toBe(true);
  });

  it("scatters royal-blue seats among mostly red seats", () => {
    const seats = buildSeats();
    const blue = seats.blue.reduce((n, b) => n + b, 0) / seats.count;
    expect(blue).toBeGreaterThan(BLUE_SEAT_RATIO * 0.7);
    expect(blue).toBeLessThan(BLUE_SEAT_RATIO * 1.3);
  });

  it("fills all four stands, corners included", () => {
    const t = buildSeats().transforms;
    const quadrants = { east: 0, west: 0, north: 0, south: 0 };
    for (let i = 0; i < t.length; i += 4) {
      const x = (t[i] ?? 0);
      const z = (t[i + 2] ?? 0);
      if (Math.abs(x) > 62) quadrants[x > 0 ? "east" : "west"]++;
      if (Math.abs(z) > 44) quadrants[z > 0 ? "south" : "north"]++;
    }
    expect(Object.values(quadrants).every((n) => n > 1000)).toBe(true);
  });

  it("is stable between loads", () => {
    expect(stadiumStats()).toEqual(stadiumStats());
    expect(buildStairs().steps.length).toBeGreaterThan(500);
  });
});
