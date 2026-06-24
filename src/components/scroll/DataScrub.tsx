"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";
import { interpolate, formatStatValue } from "@/lib/scroll-math";

interface DataScrubProps {
  from?: number;
  to: number;
  decimals?: number;
  className?: string;
}

/**
 * Renders a number that counts from `from`→`to` tied to scroll position
 * (control-room readout feel). Falls back to the final value statically
 * when reduced motion is requested.
 */
export default function DataScrub({
  from = 0,
  to,
  decimals = 0,
  className,
}: DataScrubProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = formatStatValue(to, decimals);
      return;
    }

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "top 35%",
        scrub: true,
        onUpdate: (self) => {
          el.textContent = formatStatValue(
            interpolate(self.progress, from, to),
            decimals
          );
        },
      });
    });

    return () => ctx.revert();
  }, [from, to, decimals]);

  return (
    <span ref={ref} className={className}>
      {formatStatValue(from, decimals)}
    </span>
  );
}
