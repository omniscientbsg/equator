"use client";

import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BRAND } from "@/lib/three/materials";
import City from "./City";
import HeroBuilding from "./HeroBuilding";
import Atmosphere from "./Atmosphere";
import HeroText3D from "./HeroText3D";
import CameraRig from "./CameraRig";
import Loader from "./Loader";

/** Phase 1.5 hero scene: lit procedural city + atmosphere + in-world text + bloom. */
export default function HeroScene() {
  return (
    <>
      <CameraRig />

      {/* Solid dark background to fix the white sky issue */}
      <color attach="background" args={["#020617"]} />

      {/* Deep midnight fog to hide the edges of the massive city grid */}
      <fog attach="fog" args={["#020617", 50, 300]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight args={[BRAND.sky, BRAND.charcoal, 0.6]} />
      
      {/* Main sun light, widened for better shadow coverage */}
      <directionalLight
        position={[20, 40, 20]}
        intensity={1.8}
        color={BRAND.silver}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-60}
        shadow-camera-right={60}
        shadow-camera-top={60}
        shadow-camera-bottom={-60}
        shadow-camera-far={150}
        shadow-bias={-0.0001}
      />

      <City />
      <HeroBuilding />
      <Atmosphere />
      <HeroText3D />

      <Suspense fallback={<Loader />}>
        {/* Removed the preset HDRI so we don't reflect real-world clouds and buildings. 
            The scene will now be purely lit by our cinematic directional and hemisphere lights. */}
      </Suspense>

      <EffectComposer disableNormalPass>
        {/* Enhanced Bloom for windows and beacon */}
        <Bloom mipmapBlur intensity={1.2} luminanceThreshold={0.4} luminanceSmoothing={0.3} />
        {/* Cinematic film grain */}
        <Noise opacity={0.035} />
        {/* Darkened edges */}
        <Vignette eskil={false} offset={0.1} darkness={0.9} />
      </EffectComposer>
    </>
  );
}
