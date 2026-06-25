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

/** Camera keyframes for flying through the Digital Twin skyscraper. */
const KEYFRAMES: Keyframe[] = [
  // 1. Hero: Sweeping view of the massive city and the Hero Building from high above
  { position: [0, 120, 180], target: [0, 40, 0], roll: 0 },
  { position: [40, 60, 80], target: [0, 20, 0], roll: 0.05 },
  
  // 2. Gatekeeping: Swoop down to street level, facing the front entrance
  { position: [0, 2, 40], target: [0, 2, 0], roll: 0 },
  { position: [0, 2, 25], target: [0, 2, 0], roll: -0.02 },
  
  // 3. Reception: Move forward into the 1st floor lobby
  { position: [0, 8, 15], target: [0, 8, 0], roll: 0.02 },
  { position: [0, 8, 5], target: [0, 20, -5], roll: 0 },
  
  // 4. Elevator: Move inside the central shaft and look straight UP, then fly up
  { position: [0, 10, 0], target: [0, 100, 0], roll: 0.1 },
  { position: [0, 50, 0], target: [0, 100, 0], roll: 0 },
  
  // 5. Office: Emerge on Floor 10 (y=60) and pan across
  { position: [0, 62, 5], target: [15, 62, -15], roll: -0.05 },
  
  // 6. Contact: Pull back out through the glass into the sky
  { position: [30, 80, 60], target: [0, 40, 0], roll: 0 },
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
