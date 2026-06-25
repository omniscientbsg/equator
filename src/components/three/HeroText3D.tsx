// src/components/three/HeroText3D.tsx
"use client";

import { Html } from "@react-three/drei";

const WORDS: { text: string; pos: [number, number, number]; cls: string }[] = [
  { text: "Every Space.", pos: [-9, 11, -2], cls: "text-white" },
  { text: "Every System.", pos: [7, 8, -10], cls: "text-equator-silver" },
  { text: "Every Day.", pos: [-4, 6, -20], cls: "text-equator-sky" },
];

/** Headline words placed in 3D space among the city, parallaxing with the camera. */
export default function HeroText3D() {
  return (
    <>
      {WORDS.map((w, i) => (
        <Html key={i} position={w.pos} transform distanceFactor={14} zIndexRange={[0, 0]}>
          <div
            className={`font-display text-6xl whitespace-nowrap select-none drop-shadow-2xl ${w.cls}`}
            style={{ pointerEvents: "none" }}
          >
            {w.text}
          </div>
        </Html>
      ))}
    </>
  );
}
