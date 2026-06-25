// src/components/three/Atmosphere.tsx
"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, BufferGeometry, Float32BufferAttribute, PointLight } from "three";
import { BRAND } from "@/lib/three/materials";

/** Ambient idle life: slow-drifting dust points + a pulsing gold beacon. */
export default function Atmosphere() {
  const pts = useRef<Points>(null!);
  const beacon = useRef<PointLight>(null!);

  const geo = useMemo(() => {
    const g = new BufferGeometry();
    const n = 300;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 1] = Math.random() * 30;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    g.setAttribute("position", new Float32BufferAttribute(arr, 3));
    return g;
  }, []);

  // Manually-created geometry isn't auto-disposed by R3F; release the GPU buffer on unmount.
  useEffect(() => () => geo.dispose(), [geo]);

  useFrame(({ clock }) => {
    if (pts.current) pts.current.rotation.y = clock.elapsedTime * 0.02;
    if (beacon.current) beacon.current.intensity = 40 + Math.sin(clock.elapsedTime * 2) * 20;
  });

  return (
    <group>
      <points ref={pts} geometry={geo}>
        <pointsMaterial size={0.08} color={BRAND.silver} transparent opacity={0.5} sizeAttenuation />
      </points>
      <pointLight ref={beacon} position={[0, 20, -10]} color={BRAND.gold} intensity={40} distance={120} />
    </group>
  );
}
