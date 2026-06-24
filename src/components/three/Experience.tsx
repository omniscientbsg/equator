"use client";

import { Canvas } from "@react-three/fiber";
import HeroScene from "./HeroScene";

/** Fixed full-screen R3F canvas behind page content. Dynamic-imported (ssr:false). */
export default function Experience() {
  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 8, 18], fov: 50 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <HeroScene />
      </Canvas>
    </div>
  );
}
