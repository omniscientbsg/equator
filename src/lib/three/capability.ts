/** Pure capability checks for the 3D experience. SSR-safe. */

export const MIN_3D_WIDTH = 1024;

function hasWebGL(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    return false;
  }
}

function reducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True only on a capable, wide, motion-allowing, WebGL-enabled client. */
export function canRender3D(): boolean {
  if (typeof window === "undefined") return false;
  if (window.innerWidth < MIN_3D_WIDTH) return false;
  if (reducedMotion()) return false;
  return hasWebGL();
}
