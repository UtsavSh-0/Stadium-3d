import * as THREE from "three";
import { BOWL, PITCH, mulberry32 } from "./layout";

function canvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const context = c.getContext("2d");
  if (!context) throw new Error("Canvas rendering is unavailable");
  return [c, context] as const;
}

function finish(c: HTMLCanvasElement, opts: { repeat?: boolean; srgb?: boolean; aniso?: number } = {}) {
  const t = new THREE.CanvasTexture(c);
  if (opts.srgb !== false) t.colorSpace = THREE.SRGBColorSpace;
  if (opts.repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = opts.aniso ?? 8;
  t.needsUpdate = true;
  return t;
}

/** Natural striped grass with regulation markings, covering the whole bowl floor. */
export function pitchTexture() {
  const W = 3072;
  const H = Math.round((W * BOWL.halfZ) / BOWL.halfX);
  const [c, g] = canvas(W, H);
  const ppm = W / (BOWL.halfX * 2);
  const X = (m: number) => (m + BOWL.halfX) * ppm;
  const Z = (m: number) => (m + BOWL.halfZ) * ppm;

  // mowing stripes across the full surface, aligned to the pitch
  const stripe = PITCH.length / 18;
  for (let i = -3; i < 21; i++) {
    const x0 = -PITCH.length / 2 + i * stripe;
    g.fillStyle = i % 2 === 0 ? "#235c27" : "#2d6e30";
    g.fillRect(X(x0), 0, stripe * ppm + 1, H);
  }
  // fine grass grain
  const rng = mulberry32(3);
  for (let i = 0; i < 140000; i++) {
    const x = rng() * W;
    const y = rng() * H;
    const l = rng();
    g.fillStyle = l > 0.5 ? `rgba(120,190,90,${0.05 + rng() * 0.06})` : `rgba(10,40,15,${0.05 + rng() * 0.08})`;
    g.fillRect(x, y, 1.5, 1.5);
  }
  // subtle wear in goalmouths and centre
  const wear = (x: number, z: number, r: number) => {
    const gr = g.createRadialGradient(X(x), Z(z), 0, X(x), Z(z), r * ppm);
    gr.addColorStop(0, "rgba(110,120,60,0.18)");
    gr.addColorStop(1, "rgba(110,120,60,0)");
    g.fillStyle = gr;
    g.fillRect(X(x) - r * ppm, Z(z) - r * ppm, r * 2 * ppm, r * 2 * ppm);
  };
  wear(-50, 0, 6);
  wear(50, 0, 6);
  wear(0, 0, 5);

  g.strokeStyle = "rgba(245,248,240,0.95)";
  g.fillStyle = "rgba(245,248,240,0.95)";
  g.lineWidth = 0.12 * ppm;
  const L = PITCH.length / 2;
  const Wd = PITCH.width / 2;
  const rect = (x0: number, z0: number, x1: number, z1: number) => g.strokeRect(X(x0), Z(z0), (x1 - x0) * ppm, (z1 - z0) * ppm);
  const arc = (x: number, z: number, r: number, a0 = 0, a1 = Math.PI * 2) => {
    g.beginPath();
    g.arc(X(x), Z(z), r * ppm, a0, a1);
    g.stroke();
  };
  const spot = (x: number, z: number, r = 0.2) => {
    g.beginPath();
    g.arc(X(x), Z(z), r * ppm, 0, Math.PI * 2);
    g.fill();
  };
  rect(-L, -Wd, L, Wd);
  g.beginPath();
  g.moveTo(X(0), Z(-Wd));
  g.lineTo(X(0), Z(Wd));
  g.stroke();
  arc(0, 0, 9.15);
  spot(0, 0, 0.25);
  for (const s of [-1, 1]) {
    const gx = s * L;
    rect(Math.min(gx, gx - s * 16.5), -20.16, Math.max(gx, gx - s * 16.5), 20.16);
    rect(Math.min(gx, gx - s * 5.5), -9.16, Math.max(gx, gx - s * 5.5), 9.16);
    const px = gx - s * 11;
    spot(px, 0);
    const a = Math.acos(5.5 / 9.15);
    if (s < 0) arc(px, 0, 9.15, -a, a);
    else arc(px, 0, 9.15, Math.PI - a, Math.PI + a);
    // corner arcs
    for (const t of [-1, 1]) {
      const cz = t * Wd;
      const start = s < 0 ? (t < 0 ? 0 : -Math.PI / 2) : t < 0 ? Math.PI / 2 : Math.PI;
      arc(gx, cz, 1, start, start + Math.PI / 2);
    }
  }
  return finish(c, { aniso: 16 });
}

/** Goal net mesh: transparent with white cord grid. */
export function netTexture() {
  const [c, g] = canvas(64, 64);
  g.clearRect(0, 0, 64, 64);
  g.strokeStyle = "rgba(255,255,255,1)";
  g.lineWidth = 5;
  g.beginPath();
  g.moveTo(0, 2);
  g.lineTo(64, 2);
  g.moveTo(2, 0);
  g.lineTo(2, 64);
  g.stroke();
  const t = finish(c, { repeat: true });
  return t;
}

/** Weathered concrete for terraces and walkways. */
export function concreteTexture(base = "#8a8f96") {
  const [c, g] = canvas(512, 512);
  g.fillStyle = base;
  g.fillRect(0, 0, 512, 512);
  const rng = mulberry32(11);
  for (let i = 0; i < 26000; i++) {
    const v = rng();
    g.fillStyle = v > 0.5 ? `rgba(255,255,255,${rng() * 0.07})` : `rgba(0,0,0,${rng() * 0.09})`;
    const s = rng() * 3 + 0.5;
    g.fillRect(rng() * 512, rng() * 512, s, s);
  }
  // expansion joints
  g.strokeStyle = "rgba(0,0,0,0.18)";
  g.lineWidth = 2;
  g.beginPath();
  g.moveTo(0, 1);
  g.lineTo(512, 1);
  g.moveTo(1, 0);
  g.lineTo(1, 512);
  g.stroke();
  return finish(c, { repeat: true });
}

/** LED ribbon used on tier fascias and pitch-side boards. */
export function ledTexture(text: string, opts: { bg?: string; fg?: string; h?: number } = {}) {
  const h = opts.h ?? 64;
  const font = `800 ${Math.round(h * 0.68)}px "Big Shoulders Display", Impact, "Arial Narrow", sans-serif`;
  const label = `${text}   •   `;
  // size the canvas to whole repeats of the label so the scrolling ribbon tiles seamlessly
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) throw new Error("Canvas rendering is unavailable");
  probe.font = font;
  const mw = Math.ceil(probe.measureText(label).width);
  const w = mw * 2;
  const [c, g] = canvas(w, h);
  g.fillStyle = opts.bg ?? "#0b1630";
  g.fillRect(0, 0, w, h);
  g.fillStyle = opts.fg ?? "#ff7a1a";
  g.font = font;
  g.textBaseline = "middle";
  g.fillText(label, 0, h / 2 + 2);
  g.fillText(label, mw, h / 2 + 2);
  // LED pixel grid
  g.fillStyle = "rgba(0,0,0,0.28)";
  for (let x = 0; x < w; x += 4) g.fillRect(x, 0, 1, h);
  for (let y = 0; y < h; y += 4) g.fillRect(0, y, w, 1);
  return finish(c, { repeat: true });
}

/** Exterior facade: vertical steel fins with glowing concourse glazing and orange light bands. */
export function facadeTextures() {
  const W = 512;
  const H = 1024;
  const [c, g] = canvas(W, H);
  const [ce, ge] = canvas(W, H);
  ge.fillStyle = "#000";
  ge.fillRect(0, 0, W, H);
  g.fillStyle = "#1a2236";
  g.fillRect(0, 0, W, H);
  const yPx = (m: number) => H - (m / 33.2) * H;
  // glazing bands (concourse levels)
  const bands: [number, number, string][] = [
    [1.2, 5.6, "#ffcf8a"],
    [8.0, 10.2, "#ffd9a6"],
    [17.8, 19.8, "#ffd9a6"],
  ];
  for (const [y0, y1, col] of bands) {
    g.fillStyle = "#2b3550";
    g.fillRect(0, yPx(y1), W, yPx(y0) - yPx(y1));
    ge.fillStyle = col;
    ge.globalAlpha = 0.55;
    ge.fillRect(0, yPx(y1), W, yPx(y0) - yPx(y1));
    ge.globalAlpha = 1;
  }
  // orange accent bands
  for (const y of [6.6, 14.5, 27.5]) {
    g.fillStyle = "#ff7a1a";
    g.fillRect(0, yPx(y + 0.35), W, yPx(y) - yPx(y + 0.35));
    ge.fillStyle = "#ff7a1a";
    ge.fillRect(0, yPx(y + 0.35), W, yPx(y) - yPx(y + 0.35));
  }
  // vertical fins
  for (let x = 0; x < W; x += 32) {
    const grd = g.createLinearGradient(x, 0, x + 14, 0);
    grd.addColorStop(0, "#3a4560");
    grd.addColorStop(1, "#1f2840");
    g.fillStyle = grd;
    g.fillRect(x, 0, 14, H);
    ge.fillStyle = "#000";
    ge.fillRect(x, 0, 14, H);
  }
  const map = finish(c, { repeat: true });
  const emissive = finish(ce, { repeat: true });
  // geometry v runs top -> bottom on the facade
  map.flipY = false;
  emissive.flipY = false;
  return { map, emissive };
}

/** Roof cladding: standing-seam metal panels. */
export function roofTexture() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#4a5366";
  g.fillRect(0, 0, 256, 256);
  for (let x = 0; x < 256; x += 16) {
    g.fillStyle = "#5d6880";
    g.fillRect(x, 0, 3, 256);
    g.fillStyle = "#363d4d";
    g.fillRect(x + 3, 0, 2, 256);
  }
  return finish(c, { repeat: true });
}

/** Translucent polycarbonate roof glazing with frame grid. */
export function membraneTexture() {
  const [c, g] = canvas(256, 256);
  g.fillStyle = "#c9d6e6";
  g.fillRect(0, 0, 256, 256);
  g.fillStyle = "#59647a";
  g.fillRect(0, 0, 256, 6);
  g.fillRect(0, 0, 6, 256);
  g.fillRect(124, 0, 3, 256);
  return finish(c, { repeat: true });
}

/** Paved plaza outside the stadium. */
export function plazaTexture() {
  const [c, g] = canvas(512, 512);
  g.fillStyle = "#1b2233";
  g.fillRect(0, 0, 512, 512);
  const rng = mulberry32(21);
  for (let i = 0; i < 9000; i++) {
    g.fillStyle = `rgba(255,255,255,${rng() * 0.035})`;
    g.fillRect(rng() * 512, rng() * 512, 2, 2);
  }
  g.strokeStyle = "rgba(255,255,255,0.06)";
  g.lineWidth = 2;
  for (let i = 0; i <= 512; i += 64) {
    g.beginPath();
    g.moveTo(i, 0);
    g.lineTo(i, 512);
    g.moveTo(0, i);
    g.lineTo(512, i);
    g.stroke();
  }
  return finish(c, { repeat: true });
}
