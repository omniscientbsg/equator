// src/components/three/HeroScene.tsx
"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BRAND } from "@/lib/three/materials";
import City from "./City";
import Atmosphere from "./Atmosphere";
import HeroText3D from "./HeroText3D";
import HeroModel from "./HeroModel";
import CameraRig from "./CameraRig";
import Loader from "./Loader";

/** Phase 1.5 hero scene: lit procedural city + atmosphere + in-world text + bloom. */
export default function HeroScene() {
  return (
    <>
      <CameraRig />

      <color attach="background" args={[BRAND.charcoal]} />
      <fog attach="fog" args={[BRAND.charcoal, 20, 70]} />

      <ambientLight intensity={0.25} />
      <hemisphereLight args={[BRAND.sky, BRAND.charcoal, 0.4]} />
      <directionalLight
        position={[18, 30, 12]}
        intensity={1.3}
        color={BRAND.silver}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-camera-far={120}
      />

      <City />
      <Atmosphere />
      <HeroText3D />

      <Suspense fallback={<Loader />}>
        <group position={[10, 0, -6]}>
          <HeroModel />
        </group>
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom mipmapBlur intensity={0.6} luminanceThreshold={0.6} luminanceSmoothing={0.2} />
      </EffectComposer>
    </>
  );
}
