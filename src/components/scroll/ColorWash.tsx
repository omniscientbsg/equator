"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
import { mixHex } from "@/lib/scroll-math";

/** Brand color stops the wash travels through, top→bottom of the page. */
const STOPS = ["#1A1A2E", "#1B2B5E", "#E8EDF5", "#1B2B5E", "#2547A1"];

function colorAt(progress: number): string {
  const p = Math.min(Math.max(progress, 0), 1) * (STOPS.length - 1);
  const i = Math.floor(p);
  if (i >= STOPS.length - 1) return STOPS[STOPS.length - 1];
  return mixHex(STOPS[i], STOPS[i + 1], p - i);
}

export default function ColorWash({ children }: { children: ReactNode }) {
  const washRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    registerScrollTrigger();

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (washRef.current) {
          washRef.current.style.backgroundColor = colorAt(self.progress);
        }
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <>
      {/* Subtle fixed tint behind everything (content sits above, opaque). */}
      <div
        ref={washRef}
        aria-hidden
        className="fixed inset-0 -z-10 opacity-30 transition-none pointer-events-none"
        style={{ backgroundColor: STOPS[0] }}
      />
      {children}
    </>
  );
}
