"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

interface HorizontalActsProps {
  children: ReactNode;
  /** Below this width (px) acts stack vertically with no pin. Default 768. */
  minWidth?: number;
  className?: string;
}

/**
 * Pins a section and converts vertical scroll into horizontal movement of an
 * inner track, then releases back to vertical. Children are the horizontal
 * "acts" laid out in a flex row. Stacks vertically on mobile / reduced motion.
 */
export default function HorizontalActs({
  children,
  minWidth = 768,
  className,
}: HorizontalActsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const active =
      !prefersReducedMotion() && window.innerWidth >= minWidth;
    setEnabled(active);
    if (!active) return;

    registerScrollTrigger();
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      
      const getScrollAmount = () => {
        // Find the actual right boundary of the last child
        const children = track.children;
        if (!children.length) return 0;
        const lastChild = children[children.length - 1] as HTMLElement;
        
        // Calculate the overflow distance exactly using native offsets (immune to transforms)
        let distance = (lastChild.offsetLeft + lastChild.offsetWidth) - track.offsetWidth + 32; // 32px for trailing padding
        return distance > 0 ? distance : 0;
      };

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: true, // true binds directly to scrollbar (no delay/stuck feeling)
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    // Refresh scrolltrigger after images/fonts might have loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => ctx.revert();
  }, [minWidth]);

  return (
    <div ref={sectionRef} className={className}>
      <div
        ref={trackRef}
        className={
          enabled
            ? "flex flex-nowrap items-stretch"
            : "flex flex-col gap-8"
        }
      >
        {children}
      </div>
    </div>
  );
}
