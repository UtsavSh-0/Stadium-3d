/**
 * Pure stadium layout math (no React, no three.js).
 *
 * The bowl is a rounded rectangle: a core rectangle grown by a radius. Every
 * structure is described in a 2D "profile" (d = distance outward from the
 * bowl edge, y = height) and swept around the loop, so the four stands and
 * the corners stay connected as one piece of architecture.
 */

export const PITCH = { length: 105, width: 68 } as const;

/** Inner bowl edge (the grass ends here). */
export const BOWL = { halfX: 60, halfZ: 42, cornerR: 9 } as const;
export const CORE = { x: BOWL.halfX - BOWL.cornerR, z: BOWL.halfZ - BOWL.cornerR } as const;

export const CORNER_SEGMENTS = 16;

export type Tier = {
  name: string;
  d0: number; // first row front edge
  y0: number; // first tread height
  rows: number;
  tread: number;
  rise: number;
};

export const TIERS: [Tier, Tier, Tier] = [
  { name: "Lower", d0: 3, y0: 1.4, rows: 16, tread: 0.8, rise: 0.36 },
  { name: "Middle", d0: 17, y0: 11.0, rows: 13, tread: 0.85, rise: 0.48 },
  { name: "Upper", d0: 30.5, y0: 19.6, rows: 15, tread: 0.85, rise: 0.58 },
];

export const tierEnd = (t: Tier) => ({ d: t.d0 + t.rows * t.tread, y: t.y0 + (t.rows - 1) * t.rise });

/** Key architectural levels derived from the tiers. */
export const LEVELS = {
  walkway1: tierEnd(TIERS[0]).y, // concourse behind lower tier
  skyboxFront: 18,
  skyboxBack: 23,
  tier2FasciaBottom: 9.8,
  walkway2: tierEnd(TIERS[1]).y,
  facade: 44.5,
  roofInner: 6,
  roofOuter: 46,
  membraneEnd: 22,
} as const;

/** Roof surface height at distance d (slopes gently outward for drainage). */
export const roofY = (d: number) => 35.5 - (d - LEVELS.roofInner) * 0.06;

export type Station = {
  ox: number;
  oz: number;
  nx: number;
  nz: number;
  kind: "straight" | "corner";
};

/** World XZ of profile distance d at a station. */
export function project(st: Station, d: number): [number, number] {
  const r = BOWL.cornerR + d;
  return [st.ox + st.nx * r, st.oz + st.nz * r];
}

/** Centre of corner arc k (0..3, loop order). */
function cornerAt(k: number): [number, number] {
  return [k === 0 || k === 3 ? CORE.x : -CORE.x, k < 2 ? CORE.z : -CORE.z];
}
/** Length of the straight side that ends at corner k. */
const sideLength = (k: number) => (k % 2 === 0 ? 2 * CORE.z : 2 * CORE.x);

/** Closed polyline of stations used to sweep profiles (corners are arcs, sides are straight). */
export function loopStations(segments = CORNER_SEGMENTS): Station[] {
  const out: Station[] = [];
  for (let k = 0; k < 4; k++) {
    const [cx, cz] = cornerAt(k);
    for (let j = 0; j <= segments; j++) {
      const a = (k * Math.PI) / 2 + (j / segments) * (Math.PI / 2);
      out.push({ ox: cx, oz: cz, nx: Math.cos(a), nz: Math.sin(a), kind: "corner" });
    }
  }
  return out;
}

/** Perimeter of the loop at distance d. */
export const perimeterAt = (d: number) => 4 * CORE.x + 4 * CORE.z + 2 * Math.PI * (BOWL.cornerR + d);

/** Station at arc length s (measured at distance d) around the loop. */
export function stationAt(s: number, d: number): Station {
  const r = BOWL.cornerR + d;
  const arc = (Math.PI / 2) * r;
  const P = perimeterAt(d);
  let rem = ((s % P) + P) % P;
  for (let k = 0; k < 4; k++) {
    // straight side k ends at corner k
    const L = sideLength(k);
    const [cx, cz] = cornerAt(k);
    const a0 = (k * Math.PI) / 2;
    if (rem <= L) {
      const nx = Math.cos(a0);
      const nz = Math.sin(a0);
      // tangent direction = derivative of angle direction
      const tx = -Math.sin(a0);
      const tz = Math.cos(a0);
      const back = L - rem;
      return { ox: cx - tx * back, oz: cz - tz * back, nx, nz, kind: "straight" };
    }
    rem -= L;
    if (rem <= arc) {
      const a = a0 + rem / r;
      return { ox: cx, oz: cz, nx: Math.cos(a), nz: Math.sin(a), kind: "corner" };
    }
    rem -= arc;
  }
  return stationAt(0, d);
}

/** Evenly spaced stations around the loop (spacing measured at distance d). */
export function evenStations(spacing: number, d: number): Station[] {
  const P = perimeterAt(d);
  const n = Math.max(4, Math.round(P / spacing));
  return Array.from({ length: n }, (_, i) => stationAt((i / n) * P, d));
}

/** Deterministic RNG so seat colours never change between loads. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const SEAT = { pitch: 0.52, blockSeats: 18, aisle: 1.3 } as const;
export const BLUE_SEAT_RATIO = 0.09;

/** Aisle centre positions along a straight side of length L (centred at 0). */
export function straightAisles(L: number): { aisles: number[]; blocks: [number, number][] } {
  const blockLen = SEAT.blockSeats * SEAT.pitch;
  const n = Math.floor((L - SEAT.aisle) / (blockLen + SEAT.aisle));
  const used = n * blockLen + (n + 1) * SEAT.aisle;
  let s = -used / 2;
  const aisles: number[] = [];
  const blocks: [number, number][] = [];
  for (let i = 0; i < n; i++) {
    aisles.push(s + SEAT.aisle / 2);
    s += SEAT.aisle;
    blocks.push([s, s + blockLen]);
    s += blockLen;
  }
  aisles.push(s + SEAT.aisle / 2);
  return { aisles, blocks };
}

/** Radial aisle angle fractions inside each corner, per tier. */
export const CORNER_AISLES: [number[], number[], number[]] = [[0.5], [1 / 3, 2 / 3], [0.25, 0.5, 0.75]];
const cornerAisles = (ti: number) => CORNER_AISLES[ti] ?? [];

export type SeatData = {
  count: number;
  /** x, y, z, rotationY per seat */
  transforms: Float32Array;
  /** 0 = red, 1 = blue */
  blue: Uint8Array;
  /** brightness jitter per seat, 0.9..1.05 */
  shade: Float32Array;
  perTier: number[];
};

/** Every seat in the stadium, row by row, with aisles left clear for stairways. */
export function buildSeats(seed = 7): SeatData {
  const rng = mulberry32(seed);
  const xs: number[] = [];
  const perTier: number[] = [];
  const blue: number[] = [];
  const shade: number[] = [];

  const push = (x: number, y: number, z: number, nx: number, nz: number) => {
    xs.push(x, y, z, Math.atan2(-nx, -nz));
    blue.push(rng() < BLUE_SEAT_RATIO ? 1 : 0);
    shade.push(0.9 + rng() * 0.15);
  };

  TIERS.forEach((tier, ti) => {
    const before = blue.length;
    for (let row = 0; row < tier.rows; row++) {
      const d = tier.d0 + row * tier.tread + tier.tread * 0.42;
      const y = tier.y0 + row * tier.rise;
      const r = BOWL.cornerR + d;
      for (let k = 0; k < 4; k++) {
        const [cx, cz] = cornerAt(k);
        const a0 = (k * Math.PI) / 2;
        // straight side k (ends at corner k)
        const nx = Math.cos(a0);
        const nz = Math.sin(a0);
        const tx = -Math.sin(a0);
        const tz = Math.cos(a0);
        const L = sideLength(k);
        const { blocks } = straightAisles(L);
        for (const [s0, s1] of blocks) {
          for (let s = s0 + SEAT.pitch / 2; s < s1; s += SEAT.pitch) {
            // s measured from side centre; side runs back from corner centre
            const along = L / 2 - s;
            const ox = cx - tx * along;
            const oz = cz - tz * along;
            push(ox + nx * r, y, oz + nz * r, nx, nz);
          }
        }
        // corner k arc with radial aisles
        const arcLen = (Math.PI / 2) * r;
        const cuts = [0, ...cornerAisles(ti), 1];
        const margin = 0.9;
        for (let c = 0; c < cuts.length - 1; c++) {
          const sa = (cuts[c] ?? 0) * arcLen + (c === 0 ? margin : SEAT.aisle / 2);
          const sb = (cuts[c + 1] ?? 0) * arcLen - (c === cuts.length - 2 ? margin : SEAT.aisle / 2);
          const n = Math.floor((sb - sa) / SEAT.pitch);
          if (n <= 0) continue;
          const pad = (sb - sa - n * SEAT.pitch) / 2;
          for (let i = 0; i < n; i++) {
            const a = a0 + (sa + pad + (i + 0.5) * SEAT.pitch) / r;
            const cnx = Math.cos(a);
            const cnz = Math.sin(a);
            push(cx + cnx * r, y, cz + cnz * r, cnx, cnz);
          }
        }
      }
    }
    perTier.push(blue.length - before);
  });

  return {
    count: blue.length,
    transforms: new Float32Array(xs),
    blue: Uint8Array.from(blue),
    shade: Float32Array.from(shade),
    perTier,
  };
}

/** Stairway steps: one intermediate step per row inside every aisle. */
export type StairStep = { x: number; y: number; z: number; rotY: number; w: number; depth: number; h: number };

export function buildStairs(): { steps: StairStep[]; rails: [number, number, number, number, number, number][] } {
  const steps: StairStep[] = [];
  const rails: [number, number, number, number, number, number][] = [];
  const aisleStations: { st: Station; ti: number }[] = [];

  TIERS.forEach((_, ti) => {
    for (let k = 0; k < 4; k++) {
      const [cx, cz] = cornerAt(k);
      const a0 = (k * Math.PI) / 2;
      const tx = -Math.sin(a0);
      const tz = Math.cos(a0);
      const L = sideLength(k);
      for (const s of straightAisles(L).aisles) {
        const along = L / 2 - s;
        aisleStations.push({
          st: { ox: cx - tx * along, oz: cz - tz * along, nx: Math.cos(a0), nz: Math.sin(a0), kind: "straight" },
          ti,
        });
      }
      for (const f of cornerAisles(ti)) {
        const a = a0 + f * (Math.PI / 2);
        aisleStations.push({ st: { ox: cx, oz: cz, nx: Math.cos(a), nz: Math.sin(a), kind: "corner" }, ti });
      }
    }
  });

  for (const { st, ti } of aisleStations) {
    const tier = (TIERS[ti] ?? TIERS[0]);
    const rotY = Math.atan2(-st.nx, -st.nz);
    for (let row = 0; row < tier.rows; row++) {
      const d = tier.d0 + row * tier.tread + tier.tread * 0.75;
      const [x, z] = project(st, d);
      const yTop = tier.y0 + row * tier.rise + tier.rise / 2;
      steps.push({ x, y: yTop - tier.rise / 4, z, rotY, w: SEAT.aisle * 0.92, depth: tier.tread / 2, h: tier.rise / 2 });
    }
    const end = tierEnd(tier);
    const [x1, z1] = project(st, tier.d0 + 0.3);
    const [x2, z2] = project(st, end.d - 0.2);
    rails.push([x1, tier.y0 + 0.95, z1, x2, end.y + 0.95, z2]);
  }
  return { steps, rails };
}

/** Roof truss members in profile space: pairs of (d, y) points. */
export function trussProfile(): { a: [number, number]; b: [number, number]; thick: number }[] {
  const bottom = (d: number) => roofY(d) + 0.2;
  const height = (d: number) => (d <= 38 ? 0.6 + ((d - 6) / 32) * 5.4 : 6 - ((d - 38) / 6.5) * 4);
  const top = (d: number) => bottom(d) + height(d);
  const pts: number[] = [];
  for (let d = LEVELS.roofInner; d <= 44.6; d += 3.5) pts.push(d);
  const out: { a: [number, number]; b: [number, number]; thick: number }[] = [];
  for (let i = 0; i < pts.length; i++) {
    const d = (pts[i] ?? 0);
    out.push({ a: [d, bottom(d)], b: [d, top(d)], thick: 0.16 });
    if (i < pts.length - 1) {
      const e = (pts[i + 1] ?? 0);
      out.push({ a: [d, bottom(d)], b: [e, bottom(e)], thick: 0.34 });
      out.push({ a: [d, top(d)], b: [e, top(e)], thick: 0.34 });
      out.push(i % 2 === 0 ? { a: [d, bottom(d)], b: [e, top(e)], thick: 0.14 } : { a: [d, top(d)], b: [e, bottom(e)], thick: 0.14 });
    }
  }
  return out;
}

/** Stations where a roof truss and back column stand (straights every ~8.5 m, corners every 22.5°). */
export function trussStations(): Station[] {
  const out: Station[] = [];
  for (let k = 0; k < 4; k++) {
    const [cx, cz] = cornerAt(k);
    const a0 = (k * Math.PI) / 2;
    const tx = -Math.sin(a0);
    const tz = Math.cos(a0);
    const L = sideLength(k);
    const m = Math.round(L / 8.5);
    for (let i = 0; i < m; i++) {
      const back = L - (i / m) * L;
      out.push({ ox: cx - tx * back, oz: cz - tz * back, nx: Math.cos(a0), nz: Math.sin(a0), kind: "straight" });
    }
    for (let j = 0; j < 4; j++) {
      const a = a0 + (j / 4) * (Math.PI / 2);
      out.push({ ox: cx, oz: cz, nx: Math.cos(a), nz: Math.sin(a), kind: "corner" });
    }
  }
  return out;
}

export function stadiumStats() {
  const seats = buildSeats();
  const skyboxes = evenStations(5, LEVELS.skyboxFront).length;
  return {
    capacity: seats.count,
    tiers: TIERS.length,
    rows: TIERS.reduce((n, t) => n + t.rows, 0),
    skyboxes,
    blueSeats: seats.blue.reduce((n, b) => n + b, 0),
    roofSpan: LEVELS.roofOuter - LEVELS.roofInner,
    height: Math.round(roofY(40) + 6),
  };
}
