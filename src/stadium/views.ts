export type ViewKey = "aerial" | "interior" | "pitch" | "goal";

export type CameraView = {
  key: ViewKey;
  label: string;
  caption: string;
  pos: [number, number, number];
  target: [number, number, number];
};

export const VIEWS: CameraView[] = [
  { key: "aerial", label: "Aerial", caption: "Full bowl, roof and floodlight ring", pos: [182, 164, 199], target: [0, 12, 0] },
  { key: "interior", label: "Interior", caption: "Middle tier, block 214", pos: [14, 14.4, 63.2], target: [-12, 3, 0] },
  { key: "pitch", label: "Pitch-side", caption: "Touchline, between the dugouts", pos: [0, 1.7, 36.2], target: [-30, 4, 0] },
  { key: "goal", label: "Behind goal", caption: "Behind the west goal net", pos: [-58.6, 2.4, 5], target: [10, 3, 0] },
];

export const INTRO_POS: [number, number, number] = [330, 240, 300];
