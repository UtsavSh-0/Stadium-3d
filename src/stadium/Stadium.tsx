import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { seats, seatStatus } from '@/booking/inventory';
import type { StadiumInteraction } from './interaction';
import * as THREE from "three";
import {
  BOWL,
  LEVELS,
  PITCH,
  TIERS,
  buildSeats,
  buildStairs,
  evenStations,
  project,
  roofY,
  tierEnd,
  trussProfile,
  trussStations,
} from "./layout";
import { beamMatrix, seatGeometry, sweepProfile, terraceProfile, type P2 } from "./geometry";
import {
  concreteTexture,
  facadeTextures,
  ledTexture,
  membraneTexture,
  netTexture,
  pitchTexture,
  plazaTexture,
  roofTexture,
} from "./textures";

type Disposable = { dispose: () => void };

/** Create GPU resources once and free them when the scene unmounts. */
function useOwned<T>(factory: () => T, collect: (v: T) => Disposable[] = (v) => [v as unknown as Disposable]): T {
  const value = useMemo(factory, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => collect(value).forEach((d) => d.dispose()), [value]); // eslint-disable-line react-hooks/exhaustive-deps
  return value;
}

const COLORS = {
  seatRed: new THREE.Color("#9a0f19"),
  seatBlue: new THREE.Color("#1a3aa8"),
  steel: "#c7ced8",
  darkSteel: "#262d3b",
  orange: "#ff7a1a",
};

/* ------------------------------------------------------------------ */
/* Pitch                                                               */
/* ------------------------------------------------------------------ */

function Pitch() {
  const tex = useOwned(pitchTexture);
  const track = useOwned(() => sweepProfile([[0, 0.02], [3, 0.02]], { uScale: 3 }));
  const trackTex = useOwned(() => concreteTexture("#3b4250"));
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[BOWL.halfX * 2, BOWL.halfZ * 2]} />
        <meshStandardMaterial map={tex} roughness={0.92} metalness={0} />
      </mesh>
      <mesh geometry={track} receiveShadow>
        <meshStandardMaterial map={trackTex} roughness={0.95} />
      </mesh>
    </group>
  );
}

function scaleUV(g: THREE.BufferGeometry, su: number, sv: number) {
  const uv = g.getAttribute("uv");
  for (let i = 0; i < uv.count; i++) uv.setXY(i, uv.getX(i) * su, uv.getY(i) * sv);
  uv.needsUpdate = true;
  return g;
}

function Goal({ side }: { side: 1 | -1 }) {
  const W = 7.32;
  const H = 2.44;
  const R = 0.06;
  const cell = 0.12;
  const net = useOwned(netTexture);
  const geos = useOwned(
    () => {
      const top = scaleUV(new THREE.PlaneGeometry(1, W), 1 / cell, W / cell);
      const backLen = Math.hypot(1, H);
      const back = scaleUV(new THREE.PlaneGeometry(backLen, W), backLen / cell, W / cell);
      const shape = new THREE.Shape([new THREE.Vector2(0, 0), new THREE.Vector2(2, 0), new THREE.Vector2(1, H), new THREE.Vector2(0, H)]);
      const sideG = scaleUV(new THREE.ShapeGeometry(shape), 1 / cell, 1 / cell);
      return { top, back, sideG, backLen };
    },
    (v) => [v.top, v.back, v.sideG],
  );
  const backAngle = Math.atan2(H, 1);
  return (
    <group position={[side * (PITCH.length / 2), 0, 0]} scale={[side, 1, 1]}>
      {[-W / 2, W / 2].map((z) => (
        <mesh key={z} position={[R, H / 2, z]} castShadow>
          <cylinderGeometry args={[R, R, H, 14]} />
          <meshStandardMaterial color="#f4f6f8" roughness={0.3} metalness={0.2} />
        </mesh>
      ))}
      <mesh position={[R, H, 0]} rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[R, R, W + 2 * R, 14]} />
        <meshStandardMaterial color="#f4f6f8" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* support frame */}
      {[-W / 2, W / 2].map((z) => (
        <group key={`f${z}`}>
          <mesh position={[0.5 + R, H, z]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.025, 0.025, 1, 8]} />
            <meshStandardMaterial color="#d9dde2" />
          </mesh>
          <mesh position={[1.5 + R, H / 2, z]} rotation-z={Math.PI / 2 - backAngle}>
            <cylinderGeometry args={[0.025, 0.025, geos.backLen, 8]} />
            <meshStandardMaterial color="#d9dde2" />
          </mesh>
          <mesh position={[1 + R, 0.02, z]} rotation-z={Math.PI / 2}>
            <cylinderGeometry args={[0.025, 0.025, 2, 8]} />
            <meshStandardMaterial color="#d9dde2" />
          </mesh>
        </group>
      ))}
      <mesh position={[2 + R, 0.02, 0]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.025, 0.025, W, 8]} />
        <meshStandardMaterial color="#d9dde2" />
      </mesh>
      {/* nets */}
      <group>
        <mesh geometry={geos.top} position={[0.5 + R, H, 0]} rotation-x={-Math.PI / 2}>
          <meshStandardMaterial map={net} alphaMap={net} transparent alphaTest={0.3} side={THREE.DoubleSide} color="#ffffff" depthWrite={false} />
        </mesh>
        <mesh geometry={geos.back} position={[1.5 + R, H / 2, 0]} rotation={[-Math.PI / 2, 0, -backAngle, "ZYX"]}>
          <meshStandardMaterial map={net} alphaMap={net} transparent alphaTest={0.3} side={THREE.DoubleSide} color="#ffffff" depthWrite={false} />
        </mesh>
        {[-W / 2, W / 2].map((z) => (
          <mesh key={`s${z}`} geometry={geos.sideG} position={[R, 0, z]}>
            <meshStandardMaterial map={net} alphaMap={net} transparent alphaTest={0.3} side={THREE.DoubleSide} color="#ffffff" depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function CornerFlags() {
  const pts: [number, number][] = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];
  return (
    <group>
      {pts.map(([sx, sz]) => (
        <group key={`${sx}${sz}`} position={[(sx * PITCH.length) / 2, 0, (sz * PITCH.width) / 2]}>
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.5, 6]} />
            <meshStandardMaterial color="#f2f2f2" />
          </mesh>
          <mesh position={[0.2, 1.33, 0]}>
            <planeGeometry args={[0.4, 0.3]} />
            <meshStandardMaterial color={COLORS.orange} emissive={COLORS.orange} emissiveIntensity={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function AdBoards({ led }: { led: THREE.Texture }) {
  const boards = useMemo(
    () => [
      { pos: [0, 0.45, 38] as const, rot: Math.PI, len: 100 },
      { pos: [0, 0.45, -38] as const, rot: 0, len: 100 },
      { pos: [57, 0.45, 0] as const, rot: -Math.PI / 2, len: 64 },
      { pos: [-57, 0.45, 0] as const, rot: Math.PI / 2, len: 64 },
    ],
    [],
  );
  const geos = useOwned(
    () => boards.map((b) => scaleUV(new THREE.PlaneGeometry(b.len, 0.9), b.len / 14, 1)),
    (v) => v,
  );
  return (
    <group>
      {boards.map((b, i) => (
        <group key={i} position={b.pos} rotation-y={b.rot}>
          <mesh position={[0, 0, -0.1]} castShadow>
            <boxGeometry args={[b.len, 0.9, 0.18]} />
            <meshStandardMaterial color="#111827" roughness={0.6} />
          </mesh>
          <mesh {...(geos[i] ? { geometry: geos[i] } : {})} position={[0, 0, 0.001]}>
            <meshStandardMaterial map={led} emissiveMap={led} emissive="#ffffff" emissiveIntensity={1.4} toneMapped={false} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Dugouts() {
  return (
    <group>
      {[-10, 10].map((x) => (
        <group key={x} position={[x, 0, 36.4]}>
          <mesh position={[0, 0.25, 0.3]}>
            <boxGeometry args={[7, 0.5, 0.9]} />
            <meshStandardMaterial color="#1a2236" />
          </mesh>
          <mesh position={[0, 0.7, 0.55]}>
            <boxGeometry args={[6.6, 0.5, 0.25]} />
            <meshStandardMaterial color={x < 0 ? "#b3141f" : "#1f45c9"} roughness={0.5} />
          </mesh>
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[7.2, 2, 1.8]} />
            <meshStandardMaterial color="#9fc3e8" transparent opacity={0.22} roughness={0.05} metalness={0.6} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 2.02, 0]}>
            <boxGeometry args={[7.3, 0.06, 1.9]} />
            <meshStandardMaterial color="#2b3446" metalness={0.5} roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Stands                                                              */
/* ------------------------------------------------------------------ */

function Stands({ led }: { led: THREE.Texture }) {
  const concrete = useOwned(() => concreteTexture("#8d939b"));
  const lightConcrete = useOwned(() => concreteTexture("#a7adb5"));
  const facade = useOwned(facadeTextures, (v) => [v.map, v.emissive]);

  const g = useOwned(
    () => {
      const [t1, t2, t3] = TIERS;
      const e1 = tierEnd(t1);
      const e2 = tierEnd(t2);
      const e3 = tierEnd(t3);
      const roofAtFacade = roofY(LEVELS.facade);
      const terraces = [
        sweepProfile(terraceProfile(t1, 0.02, [LEVELS.skyboxFront, e1.y])),
        sweepProfile(terraceProfile(t2, LEVELS.tier2FasciaBottom, [t3.d0, e2.y])),
        sweepProfile(
          terraceProfile(t3, e2.y, undefined).concat([
            [LEVELS.facade, e3.y],
            [LEVELS.facade, roofAtFacade],
          ] as P2[]),
        ),
      ];
      const sky = {
        glass: sweepProfile([[LEVELS.skyboxFront, e1.y], [LEVELS.skyboxFront, LEVELS.tier2FasciaBottom]]),
        back: sweepProfile([[LEVELS.skyboxBack, e1.y], [LEVELS.skyboxBack, LEVELS.tier2FasciaBottom]], { uScale: 5, vScale: 3 }),
        ceiling: sweepProfile([[LEVELS.skyboxBack, LEVELS.tier2FasciaBottom], [t2.d0, LEVELS.tier2FasciaBottom]]),
      };
      const ledStrips = [
        sweepProfile([[t1.d0 - 0.02, 0.3], [t1.d0 - 0.02, 1.25]], { uScale: 18, vScale: 0.95 }),
        sweepProfile([[t2.d0 - 0.02, 10.0], [t2.d0 - 0.02, 10.85]], { uScale: 18, vScale: 0.85 }),
        sweepProfile([[t3.d0 - 0.02, 18.2], [t3.d0 - 0.02, 19.25]], { uScale: 22, vScale: 1.05 }),
      ];
      const glassRails = [
        sweepProfile([[t2.d0 + 0.05, t2.y0], [t2.d0 + 0.05, t2.y0 + 1.0]]),
        sweepProfile([[t3.d0 + 0.05, t3.y0], [t3.d0 + 0.05, t3.y0 + 1.0]]),
        sweepProfile([[t1.d0 + 0.05, t1.y0], [t1.d0 + 0.05, t1.y0 + 0.9]]),
      ];
      const topRails = [
        sweepProfile([[t2.d0 + 0.0, t2.y0 + 1.0], [t2.d0 + 0.1, t2.y0 + 1.0]]),
        sweepProfile([[t3.d0 + 0.0, t3.y0 + 1.0], [t3.d0 + 0.1, t3.y0 + 1.0]]),
        sweepProfile([[t1.d0 + 0.0, t1.y0 + 0.9], [t1.d0 + 0.1, t1.y0 + 0.9]]),
      ];
      const facadeG = sweepProfile([[LEVELS.facade, roofAtFacade], [LEVELS.facade, 0]], { uScale: 16, vScale: roofAtFacade });
      const apron = sweepProfile([[LEVELS.facade, 0.03], [80, 0.03]], { uScale: 10, vScale: 10 });
      return { terraces, sky, ledStrips, glassRails, topRails, facadeG, apron };
    },
    (v) => [...v.terraces, v.sky.glass, v.sky.back, v.sky.ceiling, ...v.ledStrips, ...v.glassRails, ...v.topRails, v.facadeG, v.apron],
  );

  // VIP skybox mullions every 5 m
  const mullions = useMemo(() => {
    const st = evenStations(5, LEVELS.skyboxFront);
    const e1 = tierEnd(TIERS[0]);
    const m = new THREE.Matrix4();
    return st.map((s) => {
      const [x, z] = project(s, LEVELS.skyboxFront);
      return {
        front: beamMatrix({ x, y: e1.y, z }, { x, y: LEVELS.tier2FasciaBottom, z }, 0.12, m.clone()),
      };
    });
  }, []);
  const mullionRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = mullionRef.current;
    if (!mesh) return;
    mullions.forEach((mm, i) => mesh.setMatrixAt(i, mm.front));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [mullions]);
  const wallRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = wallRef.current;
    if (!mesh) return;
    const y0 = tierEnd(TIERS[0]).y;
    const h = LEVELS.tier2FasciaBottom - y0;
    const depth = LEVELS.skyboxBack - LEVELS.skyboxFront;
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    const m = new THREE.Matrix4();
    evenStations(5, LEVELS.skyboxFront).forEach((st, i) => {
      const [x, z] = project(st, (LEVELS.skyboxFront + LEVELS.skyboxBack) / 2);
      q.setFromAxisAngle(up, Math.atan2(st.nx, st.nz));
      mesh.setMatrixAt(i, m.compose(new THREE.Vector3(x, y0 + h / 2, z), q, new THREE.Vector3(0.1, h, depth)));
    });
    mesh.instanceMatrix.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [mullions]);

  return (
    <group>
      {g.terraces.map((geo, i) => (
        <mesh key={i} geometry={geo} castShadow receiveShadow>
          <meshStandardMaterial map={concrete} roughness={0.92} color="#e2e4e8" />
        </mesh>
      ))}
      {/* VIP skyboxes */}
      <mesh geometry={g.sky.back}>
        <meshStandardMaterial color="#3a2c22" emissive="#ffb070" emissiveIntensity={0.55} roughness={0.8} />
      </mesh>
      <mesh geometry={g.sky.ceiling}>
        <meshStandardMaterial color="#d9cbb8" emissive="#ffd6a0" emissiveIntensity={0.25} roughness={0.9} />
      </mesh>
      <mesh geometry={g.sky.glass} renderOrder={2}>
        <meshStandardMaterial color="#9cc4ea" transparent opacity={0.32} metalness={0.9} roughness={0.04} depthWrite={false} side={THREE.DoubleSide} envMapIntensity={1.6} />
      </mesh>
      <instancedMesh ref={mullionRef} args={[undefined, undefined, mullions.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#1c2230" metalness={0.7} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={wallRef} args={[undefined, undefined, mullions.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#4a3a2e" roughness={0.8} />
      </instancedMesh>
      {/* LED fascia ribbons */}
      {g.ledStrips.map((geo, i) => (
        <mesh key={`l${i}`} geometry={geo}>
          <meshStandardMaterial map={led} emissiveMap={led} emissive="#ffffff" emissiveIntensity={1.5} toneMapped={false} />
        </mesh>
      ))}
      {/* glass balustrades with steel handrails */}
      {g.glassRails.map((geo, i) => (
        <mesh key={`g${i}`} geometry={geo} renderOrder={2}>
          <meshStandardMaterial color="#bcd6ee" transparent opacity={0.22} metalness={0.8} roughness={0.05} depthWrite={false} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {g.topRails.map((geo, i) => (
        <mesh key={`t${i}`} geometry={geo}>
          <meshStandardMaterial color={COLORS.steel} metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
        </mesh>
      ))}
      {/* exterior facade + plaza apron */}
      <mesh geometry={g.facadeG} castShadow receiveShadow>
        <meshStandardMaterial map={facade.map} emissiveMap={facade.emissive} emissive="#ffffff" emissiveIntensity={1.1} roughness={0.55} metalness={0.4} />
      </mesh>
      <mesh geometry={g.apron} receiveShadow>
        <meshStandardMaterial map={lightConcrete} color="#46505f" roughness={0.95} />
      </mesh>
    </group>
  );
}

/** Thousands of individual seats in one instanced draw call. */
function Seats({ low, interaction }: { low: boolean; interaction?: StadiumInteraction }) {
  const data = useMemo(() => buildSeats(), []);
  const geo = useOwned(() => seatGeometry(low));
  const ref = useRef<THREE.InstancedMesh>(null);
  const invalidate = useThree(state => state.invalidate);
  const previousColors = useRef<string[]>([]);
  const selected = useMemo(() => new Set(interaction?.selected ?? []), [interaction?.selected]);
  const palette = useMemo(() => {
    const colors = new Map<string, THREE.Color>();
    const canvas = document.createElement('canvas'); canvas.width = 1; canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (ctx) for (const token of ['--primary', '--seat-booked', '--seat-soldout', '--seat-vip', '--seat-available']) {
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(token).trim(); ctx.fillRect(0, 0, 1, 1);
      const rgba = ctx.getImageData(0, 0, 1, 1).data;
      colors.set(token, new THREE.Color().setRGB((rgba[0] ?? 0) / 255, (rgba[1] ?? 0) / 255, (rgba[2] ?? 0) / 255, THREE.SRGBColorSpace));
    }
    return colors;
  }, []);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const p = new THREE.Vector3();
    const s = new THREE.Vector3(1, 1, 1);
    const up = new THREE.Vector3(0, 1, 0);
    const c = new THREE.Color();
    const t = data.transforms;
    for (let i = 0; i < data.count; i++) {
      p.set((t[i * 4] ?? 0), (t[i * 4 + 1] ?? 0), (t[i * 4 + 2] ?? 0));
      q.setFromAxisAngle(up, (t[i * 4 + 3] ?? 0));
      mesh.setMatrixAt(i, m.compose(p, q, s));
      c.copy(data.blue[i] ? COLORS.seatBlue : COLORS.seatRed).multiplyScalar((data.shade[i] ?? 0));
      mesh.setColorAt(i, c);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
    invalidate();
  }, [data, invalidate]);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh || !interaction) return;
    let changed = false;
    const ranges: number[] = [];
    for (const seat of seats) {
      const status = seatStatus(seat, interaction.matchId, interaction.reserved);
      const token = selected.has(seat.id) ? '--primary' : status === 'booked' ? '--seat-booked' : status === 'soldout' ? '--seat-soldout' : seat.category === 'Executive' ? '--seat-vip' : '--seat-available';
      if (previousColors.current[seat.index] === token) continue;
      mesh.setColorAt(seat.index, palette.get(token) ?? COLORS.seatBlue);
      previousColors.current[seat.index] = token;
      ranges.push(seat.index * 3); changed = true;
    }
    if (changed && mesh.instanceColor) {
      mesh.instanceColor.clearUpdateRanges();
      if (ranges.length < 128) for (const start of ranges) mesh.instanceColor.addUpdateRange(start, 3);
      mesh.instanceColor.needsUpdate = true;
      invalidate();
    }
  }, [interaction?.matchId, interaction?.reserved, selected, palette, invalidate]);
  return (
    <instancedMesh ref={ref} args={[geo, undefined, data.count]} receiveShadow onClick={event => { if (!interaction || event.instanceId === undefined) return; event.stopPropagation(); const seat = seats[event.instanceId]; if (seat) interaction.onSeat(seat.id); }} onPointerMove={event => { if (!interaction || event.instanceId === undefined) return; event.stopPropagation(); interaction.onHover(seats[event.instanceId] ?? null); }} onPointerOut={() => interaction?.onHover(null)}>
      <meshStandardMaterial roughness={0.45} metalness={0.05} side={low ? THREE.DoubleSide : THREE.FrontSide} />
    </instancedMesh>
  );
}

/** Concrete aisle steps and steel handrails. */
function Stairways() {
  const { steps, rails } = useMemo(() => buildStairs(), []);
  const stepRef = useRef<THREE.InstancedMesh>(null);
  const railRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const sm = stepRef.current;
    const rm = railRef.current;
    if (!sm || !rm) return;
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const up = new THREE.Vector3(0, 1, 0);
    steps.forEach((s, i) => {
      q.setFromAxisAngle(up, s.rotY);
      sm.setMatrixAt(i, m.compose(new THREE.Vector3(s.x, s.y, s.z), q, new THREE.Vector3(s.w, s.h, s.depth)));
    });
    rails.forEach(([x1, y1, z1, x2, y2, z2], i) => rm.setMatrixAt(i, beamMatrix({ x: x1, y: y1, z: z1 }, { x: x2, y: y2, z: z2 }, 0.06, m)));
    sm.instanceMatrix.needsUpdate = true;
    rm.instanceMatrix.needsUpdate = true;
    sm.computeBoundingSphere();
    rm.computeBoundingSphere();
  }, [steps, rails]);
  return (
    <group>
      <instancedMesh ref={stepRef} args={[undefined, undefined, steps.length]} receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b9bec6" roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={railRef} args={[undefined, undefined, rails.length]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={COLORS.steel} metalness={0.85} roughness={0.25} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Roof                                                                */
/* ------------------------------------------------------------------ */

function Roof() {
  const roofTex = useOwned(roofTexture);
  const memTex = useOwned(membraneTexture);
  const ri = LEVELS.roofInner;
  const g = useOwned(
    () => ({
      membrane: sweepProfile([[ri, roofY(ri)], [LEVELS.membraneEnd, roofY(LEVELS.membraneEnd)]], { uScale: 6, vScale: 8 }),
      metal: sweepProfile([[LEVELS.membraneEnd, roofY(LEVELS.membraneEnd)], [LEVELS.roofOuter, roofY(LEVELS.roofOuter)]], { uScale: 8, vScale: 8 }),
      edge: sweepProfile([[LEVELS.roofOuter, roofY(LEVELS.roofOuter)], [LEVELS.roofOuter, roofY(LEVELS.roofOuter) - 1.2]]),
      fascia: sweepProfile([[ri, roofY(ri) - 1.4], [ri, roofY(ri) + 0.6]]),
      fasciaUnder: sweepProfile([[ri + 1.4, roofY(ri) - 1.4], [ri, roofY(ri) - 1.4]]),
      ledRing: sweepProfile([[ri - 0.03, roofY(ri) - 1.3], [ri - 0.03, roofY(ri) - 1.0]]),
    }),
    (v) => Object.values(v),
  );

  const { trussMats, columnMats } = useMemo(() => {
    const stations = trussStations();
    const profile = trussProfile();
    const trussMats: THREE.Matrix4[] = [];
    const columnMats: THREE.Matrix4[] = [];
    const at = (st: (typeof stations)[number], d: number, y: number) => {
      const [x, z] = project(st, d);
      return { x, y, z };
    };
    const topY = (d: number) => {
      const h = d <= 38 ? 0.6 + ((d - 6) / 32) * 5.4 : 6 - ((d - 38) / 6.5) * 4;
      return roofY(d) + 0.2 + h;
    };
    stations.forEach((st, i) => {
      for (const mem of profile) trussMats.push(beamMatrix(at(st, mem.a[0], mem.a[1]), at(st, mem.b[0], mem.b[1]), mem.thick));
      // perimeter columns carrying the roof down to the ground
      columnMats.push(beamMatrix(at(st, 45.4, 0), at(st, 45.4, topY(44.5) + 0.2), 0.9));
      // longitudinal purlins linking neighbouring trusses
      const next = (stations[(i + 1) % stations.length] ?? st);
      for (const d of [ri, 16.5, 27, 37.5, 44.5]) {
        trussMats.push(beamMatrix(at(st, d, topY(d)), at(next, d, topY(d)), 0.22));
      }
      for (const d of [13.5, 31.5]) {
        trussMats.push(beamMatrix(at(st, d, roofY(d) + 0.2), at(next, d, roofY(d) + 0.2), 0.16));
      }
    });
    return { trussMats, columnMats };
  }, [ri]);

  const trussRef = useRef<THREE.InstancedMesh>(null);
  const colRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const t = trussRef.current;
    const c = colRef.current;
    if (!t || !c) return;
    trussMats.forEach((m, i) => t.setMatrixAt(i, m));
    columnMats.forEach((m, i) => c.setMatrixAt(i, m));
    t.instanceMatrix.needsUpdate = true;
    c.instanceMatrix.needsUpdate = true;
    t.computeBoundingSphere();
    c.computeBoundingSphere();
  }, [trussMats, columnMats]);

  return (
    <group>
      <mesh geometry={g.membrane} renderOrder={3}>
        <meshStandardMaterial map={memTex} transparent opacity={0.42} roughness={0.35} metalness={0.1} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      <mesh geometry={g.metal} castShadow receiveShadow>
        <meshStandardMaterial map={roofTex} roughness={0.45} metalness={0.55} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={g.edge} castShadow>
        <meshStandardMaterial color={COLORS.darkSteel} metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={g.fascia} castShadow>
        <meshStandardMaterial color={COLORS.darkSteel} metalness={0.6} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={g.fasciaUnder}>
        <meshStandardMaterial color="#1a2030" metalness={0.5} roughness={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh geometry={g.ledRing}>
        <meshBasicMaterial color={[2.4, 0.9, 0.18]} toneMapped={false} />
      </mesh>
      <instancedMesh ref={trussRef} args={[undefined, undefined, trussMats.length]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={COLORS.steel} metalness={0.75} roughness={0.32} />
      </instancedMesh>
      <instancedMesh ref={colRef} args={[undefined, undefined, columnMats.length]} castShadow receiveShadow>
        <cylinderGeometry args={[0.5, 0.5, 1, 12]} />
        <meshStandardMaterial color="#d5dbe3" metalness={0.5} roughness={0.4} />
      </instancedMesh>
      <Floodlights />
    </group>
  );
}

function Floodlights() {
  const items = useMemo(() => {
    const st = evenStations(3.4, 6.6);
    const o = new THREE.Object3D();
    return st.map((s) => {
      const [x, z] = project(s, 6.6);
      const [ax, az] = project(s, -30);
      o.position.set(x, roofY(LEVELS.roofInner) - 1.8, z);
      o.lookAt(ax, 0, az);
      o.updateMatrix();
      return o.matrix.clone();
    });
  }, []);
  const housing = useRef<THREE.InstancedMesh>(null);
  const face = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const h = housing.current;
    const f = face.current;
    if (!h || !f) return;
    const off = new THREE.Matrix4().makeTranslation(0, 0, 0.26);
    items.forEach((m, i) => {
      h.setMatrixAt(i, m);
      f.setMatrixAt(i, m.clone().multiply(off));
    });
    h.instanceMatrix.needsUpdate = true;
    f.instanceMatrix.needsUpdate = true;
    h.computeBoundingSphere();
    f.computeBoundingSphere();
  }, [items]);
  return (
    <group>
      <instancedMesh ref={housing} args={[undefined, undefined, items.length]}>
        <boxGeometry args={[1.15, 0.75, 0.5]} />
        <meshStandardMaterial color="#1b202b" metalness={0.7} roughness={0.35} />
      </instancedMesh>
      <instancedMesh ref={face} args={[undefined, undefined, items.length]}>
        <planeGeometry args={[1.0, 0.6]} />
        <meshBasicMaterial color={[3.2, 3.0, 2.6]} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Surroundings                                                        */
/* ------------------------------------------------------------------ */

function Plaza() {
  const tex = useOwned(() => {
    const t = plazaTexture();
    t.repeat.set(90, 90);
    return t;
  });
  const posts = useMemo(() => evenStations(16, 62).map((s) => project(s, 62)), []);
  const poleRef = useRef<THREE.InstancedMesh>(null);
  const lampRef = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    const p = poleRef.current;
    const l = lampRef.current;
    if (!p || !l) return;
    const m = new THREE.Matrix4();
    posts.forEach(([x, z], i) => {
      p.setMatrixAt(i, m.makeTranslation(x, 4, z));
      l.setMatrixAt(i, m.makeTranslation(x, 8.1, z));
    });
    p.instanceMatrix.needsUpdate = true;
    l.instanceMatrix.needsUpdate = true;
    p.computeBoundingSphere();
    l.computeBoundingSphere();
  }, [posts]);
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position-y={-0.05} receiveShadow>
        <planeGeometry args={[1400, 1400]} />
        <meshStandardMaterial map={tex} roughness={0.95} color="#4a5468" />
      </mesh>
      <instancedMesh ref={poleRef} args={[undefined, undefined, posts.length]}>
        <cylinderGeometry args={[0.12, 0.16, 8, 6]} />
        <meshStandardMaterial color="#2a3142" metalness={0.6} roughness={0.4} />
      </instancedMesh>
      <instancedMesh ref={lampRef} args={[undefined, undefined, posts.length]}>
        <sphereGeometry args={[0.38, 10, 8]} />
        <meshBasicMaterial color={[2.6, 1.5, 0.6]} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */

export function Stadium({ low, interaction }: { low: boolean; interaction?: StadiumInteraction }) {
  const led = useOwned(() => ledTexture("OMNYA LAB STADIUM"));
  const boardLed = useOwned(() => ledTexture("OMNYA LAB", { bg: "#08122a", fg: "#ff8a2a" }));
  useFrame((_, dt) => {
    const d = Math.min(dt, 0.05);
    led.offset.x = (led.offset.x + d * 0.06) % 1;
    boardLed.offset.x = (boardLed.offset.x - d * 0.12) % 1;
  });
  return (
    <group>
      <Pitch />
      <Goal side={1} />
      <Goal side={-1} />
      <CornerFlags />
      <AdBoards led={boardLed} />
      <Dugouts />
      <Stands led={led} />
      <Seats low={low} {...(interaction ? { interaction } : {})} />
      <Stairways />
      <Roof />
      <Plaza />
    </group>
  );
}
