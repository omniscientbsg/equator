"use client";

import { useEffect } from "react";
import { registerScrollTrigger } from "@/lib/motion";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { scrollProgress } from "@/lib/three/scrollStore";
import { setChromeHidden } from "@/lib/three/chromeStore";

/**
 * Drives `scrollProgress.value` (0..1) from scroll position over the element
 * referenced by `triggerId`, across `distance` viewport-heights of scroll.
 */
export function useScrollProgress(triggerId: string): void {
  useEffect(() => {
    registerScrollTrigger();
    const el = document.getElementById(triggerId);
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        scrollProgress.value = self.progress;
        setChromeHidden(self.progress < 0.92);
      },
    });

    return () => {
      st.kill();
      setChromeHidden(false);
    };
  }, [triggerId]);
}
