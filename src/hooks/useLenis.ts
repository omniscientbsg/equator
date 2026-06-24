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

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}
