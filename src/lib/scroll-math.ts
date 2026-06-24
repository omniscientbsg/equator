/** Pure scroll math helpers. No DOM, no side effects — unit-tested. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/** Map a scroll progress (0..1, clamped) onto a numeric range. */
export function interpolate(progress: number, from: number, to: number): number {
  return lerp(from, to, clamp(progress, 0, 1));
}

/** Format a stat number for display (rounded, grouped with commas). */
export function formatStatValue(value: number, decimals = 0): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function toHex(n: number): string {
  return Math.round(clamp(n, 0, 255)).toString(16).padStart(2, "0");
}

/** Mix two #rrggbb colors. t=0 → a, t=1 → b. */
export function mixHex(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const tt = clamp(t, 0, 1);
  return `#${toHex(lerp(ar, br, tt))}${toHex(lerp(ag, bg, tt))}${toHex(lerp(ab, bb, tt))}`;
}
