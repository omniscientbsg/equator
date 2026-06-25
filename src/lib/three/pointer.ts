/** Map a normalized pointer position (-1..1) to a small camera offset. */
export function parallaxOffset(
  nx: number,
  ny: number,
  strength: number,
): [number, number] {
  const cx = Math.max(-1, Math.min(1, nx));
  const cy = Math.max(-1, Math.min(1, ny));
  return [cx * strength, cy * strength];
}
