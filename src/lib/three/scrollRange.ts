import { clamp } from "@/lib/scroll-math";

/** Map a scroll position within [start,end] to 0..1. Degenerate range → 0. */
export function computeProgress(scrollY: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp((scrollY - start) / (end - start), 0, 1);
}
