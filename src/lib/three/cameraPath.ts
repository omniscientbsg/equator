import { clamp, lerp } from "@/lib/scroll-math";

type Vec3 = [number, number, number];

interface Keyframe {
  position: Vec3;
  target: Vec3;
  roll: number;
}

export interface CameraFrame {
  position: Vec3;
  target: Vec3;
  roll: number;
}

/** Camera keyframes for the hero act, scaled to the city, ordered by progress 0..1. */
const KEYFRAMES: Keyframe[] = [
  { position: [0, 20, 46], target: [0, 12, 0], roll: 0 },
  { position: [20, 13, 20], target: [0, 10, -8], roll: 0.04 },
  { position: [-10, 9, 6], target: [0, 11, -20], roll: -0.03 },
  { position: [0, 8, -8], target: [0, 12, -34], roll: 0 },
];

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Interpolate camera position+target+roll along the eased keyframe path. */
export function cameraAt(progress: number): CameraFrame {
  const p = clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
  const i = Math.floor(p);
  if (i >= KEYFRAMES.length - 1) {
    const k = KEYFRAMES[KEYFRAMES.length - 1];
    return { position: k.position, target: k.target, roll: k.roll };
  }
  const t = easeInOutCubic(p - i);
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  return {
    position: lerpVec(a.position, b.position, t),
    target: lerpVec(a.target, b.target, t),
    roll: lerp(a.roll, b.roll, t),
  };
}
