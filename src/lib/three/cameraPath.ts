import { clamp, lerp } from "@/lib/scroll-math";

type Vec3 = [number, number, number];
interface Keyframe {
  position: Vec3;
  target: Vec3;
}

/** Camera keyframes for the hero act, ordered by progress 0..1. */
const KEYFRAMES: Keyframe[] = [
  { position: [0, 8, 18], target: [0, 4, 0] },
  { position: [6, 5, 9], target: [0, 5, -2] },
  { position: [0, 3, 2], target: [0, 6, -8] },
];

function lerpVec(a: Vec3, b: Vec3, t: number): Vec3 {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

/** Interpolate camera position+target along the keyframe path. */
export function cameraAt(progress: number): Keyframe {
  const p = clamp(progress, 0, 1) * (KEYFRAMES.length - 1);
  const i = Math.floor(p);
  if (i >= KEYFRAMES.length - 1) {
    return KEYFRAMES[KEYFRAMES.length - 1];
  }
  const t = p - i;
  return {
    position: lerpVec(KEYFRAMES[i].position, KEYFRAMES[i + 1].position, t),
    target: lerpVec(KEYFRAMES[i].target, KEYFRAMES[i + 1].target, t),
  };
}
