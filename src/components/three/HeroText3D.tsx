"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { Group } from "three";
import { scrollProgress } from "@/lib/three/scrollStore";
import { beatOpacity } from "@/lib/three/storyText";

/** Headline beats revealed one at a time in clear sky space as the camera flies.
 *  pos placed high/open so they don't overlap the skyline. */
const BEATS: { text: string; pos: [number, number, number]; cls: string; start: number; end: number }[] = [
  { text: "Every Space.", pos: [0, 16, -4], cls: "text-white", start: 0.01, end: 0.07 },
  { text: "Every System.", pos: [0, 14, -14], cls: "text-equator-silver", start: 0.06, end: 0.12 },
  { text: "Every Day.", pos: [0, 12, -26], cls: "text-equator-sky", start: 0.11, end: 0.20 },
];

const FADE = 0.08;

function Beat({ text, pos, cls, start, end }: (typeof BEATS)[number]) {
  const g = useRef<Group>(null!);
  const el = useRef<HTMLDivElement>(null!);
  useFrame(() => {
    const o = beatOpacity(scrollProgress.value, start, end, FADE);
    if (el.current) {
      el.current.style.opacity = String(o);
      el.current.style.transform = `translateY(${(1 - o) * 18}px)`;
    }
    if (g.current) g.current.visible = o > 0.001;
  });
  return (
    <group ref={g} position={pos}>
      <Html transform distanceFactor={16} zIndexRange={[0, 0]}>
        <div
          ref={el}
          aria-hidden="true"
          className={`font-display text-7xl whitespace-nowrap select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] ${cls}`}
          style={{ pointerEvents: "none", opacity: 0, transition: "opacity 0.1s linear" }}
        >
          {text}
        </div>
      </Html>
    </group>
  );
}

export default function HeroText3D() {
  return (
    <>
      {BEATS.map((b, i) => (
        <Beat key={i} {...b} />
      ))}
    </>
  );
}
