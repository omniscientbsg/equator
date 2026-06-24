"use client";

import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { prefersReducedMotion, registerScrollTrigger } from "@/lib/motion";

interface PinnedActProps {
  children: ReactNode;
  /** How far (in viewport heights) the section stays pinned while content animates. */
  pinDuration?: number;
  /** Called with scroll progress 0..1 while pinned (for driving child animations). */
  onProgress?: (progress: number) => void;
  className?: string;
  /** Disable pinning below this viewport width (px). Default 768 (mobile). */
  minWidth?: number;
}

export default function PinnedAct({
  children,
  pinDuration = 1,
  onProgress,
  className,
  minWidth = 768,
}: PinnedActProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (window.innerWidth < minWidth) return;
    registerScrollTrigger();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top top",
        end: `+=${pinDuration * 100}%`,
        pin: true,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => onProgress?.(self.progress),
      });
    }, ref);

    return () => ctx.revert();
  }, [pinDuration, onProgress, minWidth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
