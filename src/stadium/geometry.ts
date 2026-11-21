import * as THREE from "three";
import { loopStations, project, type Station } from "./layout";

export type P2 = [number, number];

/**
 * Sweeps a 2D profile (d, y) around the stadium loop. Each consecutive pair of
 * profile points becomes a strip; the front face is to the left of the A->B
 * direction in profile space (tread inner->outer faces up, riser bottom->top faces the pitch).
 */
export function sweepProfile(profile: P2[], opts: { stations?: Station[]; uScale?: number; vScale?: number; closed?: boolean } = {}) {
  const stations = opts.stations ?? loopStations();
  const uScale = opts.uScale ?? 4;
  const vScale = opts.vScale ?? 4;
  const closed = opts.closed ?? true;
  const pos: number[] = [];
  const nrm: number[] = [];
  const uv: number[] = [];
  const idx: number[] = [];
  let vAcc = 0;

  for (let p = 0; p < profile.length - 1; p++) {
    const [da, ya] = (profile[p] ?? [0, 0]);
    const [db, yb] = (profile[p + 1] ?? [0, 0]);
    const td = db - da;
    const ty = yb - ya;
    const len = Math.hypot(td, ty) || 1;
    const pnD = -ty / len;
    const pnY = td / len;
    const base = pos.length / 3;
    const dm = (da + db) / 2;
    let uAcc = 0;
    let prev: [number, number] | null = null;
    for (const st of stations) {
      const [ax, az] = project(st, da);
      const [bx, bz] = project(st, db);
      const [mx, mz] = project(st, dm);
      if (prev) uAcc += Math.hypot(mx - prev[0], mz - prev[1]);
      prev = [mx, mz];
      pos.push(ax, ya, az, bx, yb, bz);
      const nx = st.nx * pnD;
      const nz = st.nz * pnD;
      nrm.push(nx, pnY, nz, nx, pnY, nz);
      uv.push(uAcc / uScale, vAcc / vScale, uAcc / uScale, (vAcc + len) / vScale);
    }
    const n = stations.length;
    const segs = closed ? n : n - 1;
    for (let i = 0; i < segs; i++) {
      const j = (i + 1) % n;
      const Ai = base + i * 2;
      const Bi = Ai + 1;
      const Aj = base + j * 2;
      const Bj = Aj + 1;
      idx.push(Ai, Aj, Bj, Ai, Bj, Bi);
    }
    vAcc += len;
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeBoundingSphere();
  return g;
}

/** Stepped terrace profile for a tier: fascia, then tread/riser pairs, then the back. */
export function terraceProfile(t: { d0: number; y0: number; rows: number; tread: number; rise: number }, fasciaBottom: number, backTo?: P2): P2[] {
  const pts: P2[] = [[t.d0, fasciaBottom], [t.d0, t.y0]];
  for (let r = 0; r < t.rows; r++) {
    const y = t.y0 + r * t.rise;
    const dEnd = t.d0 + (r + 1) * t.tread;
    pts.push([dEnd, y]);
    if (r < t.rows - 1) pts.push([dEnd, y + t.rise]);
  }
  if (backTo) pts.push(backTo);
  return pts;
}

/** Stadium seat: moulded pan + backrest, facing +Z, origin at floor level. */
export function seatGeometry(low: boolean) {
  if (low) {
    const pan = new THREE.PlaneGeometry(0.44, 0.4).rotateX(-Math.PI / 2).translate(0, 0.42, 0.02);
    const back = new THREE.PlaneGeometry(0.44, 0.42).rotateX(-0.12).translate(0, 0.66, -0.2);
    return mergeSimple([pan, back]);
  }
  const shape = new THREE.Shape();
  // profile in (z, y): z forward, extruded along x (seat width)
  shape.moveTo(0.22, 0.38);
  shape.lineTo(0.22, 0.45);
  shape.lineTo(-0.14, 0.46);
  shape.lineTo(-0.2, 0.84);
  shape.lineTo(-0.26, 0.83);
  shape.lineTo(-0.22, 0.38);
  const g = new THREE.ExtrudeGeometry(shape, { depth: 0.44, bevelEnabled: false, steps: 1, curveSegments: 1 });
  // shape x -> world z, shape y -> world y, extrude z -> world x
  const m = new THREE.Matrix4().set(0, 0, 1, -0.22, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1);
  g.applyMatrix4(m);
  // fix winding after the mirror transform
  const index = g.getIndex();
  if (index) {
    const a = index.array as Uint16Array;
    for (let i = 0; i < a.length; i += 3) {
      const t = (a[i + 1] ?? 0);
      a[i + 1] = (a[i + 2] ?? 0);
      a[i + 2] = t;
    }
  } else {
    const p = g.getAttribute("position");
    for (let i = 0; i < p.count; i += 3) {
      for (let c = 0; c < 3; c++) {
        const t = p.getComponent(i + 1, c);
        p.setComponent(i + 1, c, p.getComponent(i + 2, c));
        p.setComponent(i + 2, c, t);
      }
    }
  }
  g.deleteAttribute("uv");
  g.computeVertexNormals();
  return g;
}

function mergeSimple(geos: THREE.BufferGeometry[]) {
  const pos: number[] = [];
  const nrm: number[] = [];
  for (const g of geos) {
    const ng = g.index ? g.toNonIndexed() : g;
    pos.push(...(ng.getAttribute("position").array as Float32Array));
    nrm.push(...(ng.getAttribute("normal").array as Float32Array));
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.Float32BufferAttribute(nrm, 3));
  return out;
}

const _m = new THREE.Matrix4();
const _q = new THREE.Quaternion();
const _s = new THREE.Vector3();
const _p = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);

/** Matrix that stretches a unit box (centred, along +Y) between two points. */
export function beamMatrix(a: THREE.Vector3Like, b: THREE.Vector3Like, thick: number, out = new THREE.Matrix4()) {
  _a.set(a.x, a.y, a.z);
  _b.set(b.x, b.y, b.z);
  const dir = _b.clone().sub(_a);
  const len = dir.length();
  dir.normalize();
  _q.setFromUnitVectors(_up, dir);
  _p.copy(_a).add(_b).multiplyScalar(0.5);
  _s.set(thick, len, thick);
  return out.compose(_p, _q, _s);
}

export { _m as scratchMatrix };
