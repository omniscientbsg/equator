"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

/**
 * Initializes Lenis smooth scroll and binds it to the GSAP ticker so
 * ScrollTrigger and Lenis share a single scroll source of truth.
 * No-ops (native scroll) when the user prefers reduced motion.
 */
export function useLenis(): void {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScrollTrigger();
  }, []);
}
