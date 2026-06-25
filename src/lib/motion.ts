import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

/** True if the user asked the OS to reduce motion. SSR-safe (returns false). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let registered = false;

/** Register ScrollTrigger once, client-side only. Safe to call repeatedly. */
export function registerScrollTrigger(): void {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}
