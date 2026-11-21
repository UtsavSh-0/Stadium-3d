import { Component, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls, Environment, Lightformer, PerformanceMonitor, Stars } from "@react-three/drei";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { Stadium } from "./Stadium";
import { INTRO_POS, VIEWS, type ViewKey } from "./views";
import { LEVELS, evenStations, project, roofY } from "./layout";
import type { StadiumInteraction, CameraTarget } from "./interaction";

type Quality = "high" | "medium" | "low";
type DeviceType = "mobile" | "tablet" | "desktop";

function getDeviceType(): DeviceType {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  const height = window.innerHeight;
  const dpr = window.devicePixelRatio ?? 1;

  // Mobile: portrait or small landscape, high DPR, or explicit mobile
  if (width < 768 || (width < 900 && dpr > 1.5 && ('ontouchstart' in window || navigator.maxTouchPoints > 0))) {
    return "mobile";
  }
  // Tablet: medium width, can be portrait or landscape
  if (width < 1024) {
    return "tablet";
  }
  return "desktop";
}

function detectQuality(): Quality {
  if (typeof window === "undefined") return "high";
  const device = getDeviceType();
  const cores = navigator.hardwareConcurrency ?? 8;
  const dpr = window.devicePixelRatio ?? 1;

  if (device === "mobile") return "low";
  if (device === "tablet") return "medium";

  // Desktop: consider cores and pixel ratio
  if (dpr > 2 || cores <= 4) return "low";
  if (dpr > 1.5 || cores <= 6) return "medium";
  return "high";
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Cinematic camera: arcing flights between views, idle orbit in aerial. */
function CameraRig({ view, cameraTarget, onFlightEnd, device }: { view: ViewKey; cameraTarget?: CameraTarget; onFlightEnd?: () => void; device?: DeviceType }) {
  const ref = useRef<CameraControls>(null);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const flight = useRef<{
    from: THREE.Vector3;
    mid: THREE.Vector3;
    to: THREE.Vector3;
    ft: THREE.Vector3;
    tt: THREE.Vector3;
    t: number;
    dur: number;
  } | null>(null);
  const idle = useRef(0);
  const first = useRef(true);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const v = VIEWS.find((x) => x.key === view) ?? VIEWS[0];
    if (!v) return;
    const aspect = size.width / Math.max(1, size.height);
    const target = new THREE.Vector3(...(cameraTarget?.target ?? v.target));
    const to = new THREE.Vector3(...(cameraTarget?.pos ?? v.pos));
    if (!cameraTarget && v.key === "aerial" && aspect < 1.1) to.sub(target).multiplyScalar(1.2 + (1.1 - aspect) * 1.6).add(target);
    // on wide screens, slide the aerial framing right so the title never covers the bowl
    const offsetX = !cameraTarget && v.key === "aerial" && size.width >= 1024 ? -Math.min(22, (aspect - 1) * 32) : 0;
    c.setFocalOffset(offsetX, 0, 0, true);
    // ?instant skips flights (handy for screenshots and deep links)
    const instant = new URLSearchParams(window.location.search).has("instant") || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (first.current || instant) {
      first.current = false;
      c.setLookAt(...(to.toArray() as [number, number, number]), ...(target.toArray() as [number, number, number]), false);
      c.enabled = true;
      return;
    }
    const from = new THREE.Vector3();
    const ft = new THREE.Vector3();
    c.getPosition(from);
    c.getTarget(ft);
    const dist = from.distanceTo(to);
    const mid = from.clone().lerp(to, 0.5);
    // lift over the roof when travelling between stands so the camera never cuts through structure
    mid.y = Math.max(mid.y, Math.max(from.y, to.y) + THREE.MathUtils.clamp(dist * 0.45, 10, 85));
    flight.current = { from, mid, to, ft, tt: target, t: 0, dur: THREE.MathUtils.clamp(1.6 + dist / 110, 2, 4.2) };
    c.enabled = false;
    invalidate();
  }, [view, cameraTarget, size.width, size.height]);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const reset = () => (idle.current = 0);
    c.addEventListener("controlstart", reset);
    c.addEventListener("control", reset);
    return () => {
      c.removeEventListener("controlstart", reset);
      c.removeEventListener("control", reset);
    };
  }, []);

  const p = useRef(new THREE.Vector3());
  const tg = useRef(new THREE.Vector3());
  useFrame((_, delta) => {
    const c = ref.current;
    if (!c) return;
    const dt = Math.min(delta, 0.25);
    const f = flight.current;
    if (f) {
      invalidate();
      f.t = Math.min(1, f.t + dt / f.dur);
      const e = easeInOut(f.t);
      const u = 1 - e;
      p.current.set(
        u * u * f.from.x + 2 * u * e * f.mid.x + e * e * f.to.x,
        u * u * f.from.y + 2 * u * e * f.mid.y + e * e * f.to.y,
        u * u * f.from.z + 2 * u * e * f.mid.z + e * e * f.to.z,
      );
      tg.current.copy(f.ft).lerp(f.tt, e);
      c.setLookAt(p.current.x, p.current.y, p.current.z, tg.current.x, tg.current.y, tg.current.z, false);
      if (f.t >= 1) {
        flight.current = null;
        c.enabled = true;
        idle.current = 0;
        onFlightEnd?.();
      }
      return;
    }
    idle.current += dt;
    if (!cameraTarget && view === "aerial" && idle.current > 3) c.rotate(dt * 0.035, 0, false);
  });

  return (
    <CameraControls
      ref={ref}
      makeDefault
      minDistance={0.3}
      maxDistance={device === "mobile" ? 350 : 420}
      maxPolarAngle={Math.PI * 0.7}
      smoothTime={device === "mobile" ? 0.5 : 0.35}
      draggingSmoothTime={device === "mobile" ? 0.25 : 0.15}
      // Touch-friendly settings for mobile/tablet
      enableRotate={true}
      enablePan={device !== "mobile"}
      enableZoom={true}
      pinchRotate={device === "mobile"}
    />
  );
}

function Lights({ quality }: { quality: Quality }) {
  const spotCount = quality === "high" ? 60 : quality === "medium" ? 10 : 0;
  const lightIntensity = quality === "low" ? 0.7 : quality === "medium" ? 0.8 : 1.05;
  const shadowMapSize = quality === "high" ? 2048 : quality === "medium" ? 1024 : 512;
  const spots = evenStations(spotCount, 6).map((s) => {
    const [x, z] = project(s, 7);
    return [x, roofY(LEVELS.roofInner) - 2, z] as [number, number, number];
  });
  const target = useRef(new THREE.Object3D());
  const isLow = quality === "low";
  return (
    <>
      <hemisphereLight args={["#5b74b8", "#1a2a1c", isLow ? 0.45 : 0.55]} />
      <ambientLight intensity={isLow ? 0.08 : 0.12} color="#9fb3ff" />
      <directionalLight
        position={[70, 160, 50]}
        intensity={lightIntensity}
        color="#fff3e2"
        castShadow={!isLow}
        shadow-mapSize={[shadowMapSize, shadowMapSize]}
        shadow-camera-left={-130}
        shadow-camera-right={130}
        shadow-camera-top={130}
        shadow-camera-bottom={-130}
        shadow-camera-near={10}
        shadow-camera-far={isLow ? 200 : 400}
        shadow-bias={-0.0004}
        shadow-normalBias={isLow ? 0.3 : 0.6}
      />
      <primitive object={target.current} position={[0, 0, 0]} />
      {spots.map((p, i) => (
        <spotLight key={i} position={p} target={target.current} angle={0.75} penumbra={isLow ? 0.6 : 0.8} intensity={lightIntensity} decay={0} color="#fff6e8" />
      ))}
      {/* fill on the stands from the pitch glow */}
      <directionalLight position={[0, 20, 0]} intensity={isLow ? 0.25 : 0.35} color="#d8f0d0" />
    </>
  );
}

function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    frames.current++;
    if (frames.current >= 1) {
      done.current = true;
      onReady();
    }
  });
  return null;
}

class CanvasBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  override state = { error: null as string | null };
  static getDerivedStateFromError(e: Error) {
    return { error: e.message };
  }
  override render() {
    if (this.state.error)
      return (
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center text-muted-foreground">
          The 3D stadium couldn't start on this device ({this.state.error}). Try a recent desktop browser.
        </div>
      );
    return this.props.children;
  }
}

export default function StadiumCanvas({ view, onReady, interaction, cameraTarget, lounge = false }: { view: ViewKey; onReady: () => void; interaction?: StadiumInteraction; cameraTarget?: CameraTarget; lounge?: boolean }) {
  const [quality] = useState<Quality>(detectQuality);
  const [device, setDevice] = useState<DeviceType>(() => typeof window === "undefined" ? "desktop" : getDeviceType());
  // Lower DPR on mobile/tablet for performance
  const [dpr, setDpr] = useState(() => {
    const d = typeof window === "undefined" ? "desktop" : getDeviceType();
    return d === "mobile" ? 1 : d === "tablet" ? 1.25 : 1.5;
  });
  const [fx, setFx] = useState(() => {
    const d = typeof window === "undefined" ? "desktop" : getDeviceType();
    return d !== "mobile";
  });

  // Update device type on resize (for SSR compatibility)
  useEffect(() => {
    const updateDevice = () => {
      const newDevice = getDeviceType();
      setDevice(newDevice);
      setDpr(newDevice === "mobile" ? 1 : (newDevice === "tablet" ? 1.25 : 1.5));
      setFx(newDevice !== "mobile");
    };
    const mql = window.matchMedia(`(orientation:portrait)`);
    updateDevice();
    mql.addEventListener('change', updateDevice);
    return () => mql.removeEventListener('change', updateDevice);
  }, []);
  return (
    <CanvasBoundary>
      <Canvas
        frameloop="demand"
        shadows={device === "desktop"}
        dpr={[1, dpr]}
        camera={{ fov: device === "mobile" ? 45 : 42, near: 0.4, far: 2000, position: INTRO_POS }}
        gl={{
          antialias: device !== "mobile",
          powerPreference: device === "mobile" ? "low-power" : "high-performance",
          toneMappingExposure: 0.92,
          preserveDrawingBuffer: false,
        }}
      >
        <color attach="background" args={["#060c1c"]} />
        <fog attach="fog" args={["#060c1c", quality === "low" ? 200 : 280, quality === "low" ? 800 : 1000]} />
        <PerformanceMonitor
          onDecline={() => {
            setDpr(1);
            setFx(false);
          }}
        />
        <Lights quality={quality} />
        <Environment resolution={device === "mobile" ? 64 : device === "tablet" ? 96 : 128} frames={1}>
          <Lightformer intensity={2.2} position={[0, 60, 0]} rotation-x={Math.PI / 2} scale={[device === "mobile" ? 80 : 120, device === "mobile" ? 60 : 80, 1]} color="#fff2df" />
          <Lightformer intensity={1.2} position={[-80, 20, 0]} rotation-y={Math.PI / 2} scale={[device === "mobile" ? 150 : 200, 10, 1]} color="#ff9a4a" />
          <Lightformer intensity={0.8} position={[80, 20, 0]} rotation-y={-Math.PI / 2} scale={[device === "mobile" ? 150 : 200, 10, 1]} color="#5a7cff" />
          <Lightformer intensity={0.5} position={[0, 10, 90]} scale={[device === "mobile" ? 150 : 200, 20, 1]} color="#9fb8ff" />
        </Environment>
        <Stars radius={500} depth={120} count={quality === "low" ? 900 : 1800} factor={device === "mobile" ? 7 : 5} saturation={0} fade speed={0.3} />
        <Suspense fallback={null}>
          <Stadium low={quality === "low"} {...(interaction ? { interaction } : {})} />
          {lounge && <VipLounge />}
        </Suspense>
        <CameraRig view={view} device={device} {...(cameraTarget ? { cameraTarget } : {})} />
        <ReadySignal onReady={onReady} />
        {fx && quality === "high" && device === "desktop" && (
          <EffectComposer multisampling={4}>
            <Bloom mipmapBlur intensity={0.55} luminanceThreshold={1.0} luminanceSmoothing={0.2} />
            <Vignette offset={0.25} darkness={0.55} />
          </EffectComposer>
        )}
      </Canvas>
    </CanvasBoundary>
  );
}

function VipLounge() {
  return <group position={[0, 6.8, 65]}>
    <mesh position={[0, 0.03, 0]}><boxGeometry args={[40, 0.06, 4]} /><meshStandardMaterial color="#363c44" /></mesh>
    {[-15, -5, 5, 15].map(x => <group key={x} position={[x, 0, 0]}>
      <mesh position={[0, 0.4, 0.5]}><boxGeometry args={[3.8, 0.8, 1.2]} /><meshStandardMaterial color="#d0b784" roughness={0.8} /></mesh>
      <mesh position={[0, 0.85, 0.9]}><boxGeometry args={[3.8, 0.8, 0.4]} /><meshStandardMaterial color="#ab9471" /></mesh>
      <mesh position={[0, 0.45, -0.8]}><boxGeometry args={[2, 0.08, 0.8]} /><meshStandardMaterial color="#535965" metalness={0.6} /></mesh>
      <mesh position={[0, 0.2, -0.8]}><cylinderGeometry args={[0.08, 0.08, 0.45, 8]} /><meshStandardMaterial color="#c3a368" metalness={0.7} /></mesh>
    </group>)}
  </group>;
}
