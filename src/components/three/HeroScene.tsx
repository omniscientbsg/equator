"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";
import { buildingFloors } from "@/lib/three/geometry";
import HeroModel from "./HeroModel";
import CameraRig from "./CameraRig";
import Loader from "./Loader";

const FLOORS = buildingFloors({ count: 9, floorHeight: 1.4, taper: 0.06 });

/** Phase 1 hero scene: procedural wireframe tower + blueprint grid + lights. */
export default function HeroScene() {
  return (
    <>
      <CameraRig />

      <color attach="background" args={[BRAND.charcoal]} />
      <fog attach="fog" args={[BRAND.charcoal, 18, 42]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} color={BRAND.sky} />
      <pointLight position={[-6, 6, -4]} intensity={40} color={BRAND.gold} />

      {/* Blueprint grid plane */}
      <gridHelper args={[60, 60, BRAND.blue, BRAND.navy]} position={[0, 0, 0]} />

      {/* Procedural wireframe tower */}
      <group position={[0, 0, -2]}>
        {FLOORS.map((floor, i) => (
          <mesh key={i} position={[0, floor.y + 0.7, 0]} scale={[floor.scale, 1, floor.scale]}>
            <boxGeometry args={[4, 1.3, 4]} />
            <meshStandardMaterial
              color={BRAND.navy}
              wireframe
              emissive={BRAND.sky}
              emissiveIntensity={0.15}
            />
          </mesh>
        ))}
      </group>

      <Suspense fallback={<Loader />}>
        <group position={[5, 0, 1]}>
          <HeroModel />
        </group>
        <Environment preset="city" />
      </Suspense>
    </>
  );
}
