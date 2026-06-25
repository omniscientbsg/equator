// src/components/three/Atmosphere.tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointLight } from "three";
import { Sparkles } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";

/** Ambient cinematic life: organic floating dust and a pulsing gold beacon. */
export default function Atmosphere() {
  const beacon = useRef<PointLight>(null!);

  useFrame(({ clock }) => {
    if (beacon.current) {
      beacon.current.intensity = 40 + Math.sin(clock.elapsedTime * 2) * 20;
    }
  });

  return (
    <group>
      {/* Cinematic floating dust matching the Bruno Simon / Awwwards aesthetic */}
      <Sparkles
        count={250}
        scale={[80, 30, 80]}
        size={4}
        speed={0.4}
        opacity={0.3}
        color={BRAND.silver}
        noise={1.5}
      />
      <pointLight 
        ref={beacon} 
        position={[0, 20, -10]} 
        color={BRAND.gold} 
        intensity={40} 
        distance={120} 
      />
    </group>
  );
}
