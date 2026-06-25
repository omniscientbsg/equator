/** Opacity 0..1 for a story beat active across [start,end] of scroll progress,
 *  fading in over the first `fade` and out over the last `fade` of that window. */
export function beatOpacity(
  progress: number,
  start: number,
  end: number,
  fade: number,
): number {
  if (progress <= start || progress >= end) return 0;
  const inT = (progress - start) / fade;
  const outT = (end - progress) / fade;
  const v = Math.min(inT, outT, 1);
  return Math.max(0, Math.min(1, v));
}
