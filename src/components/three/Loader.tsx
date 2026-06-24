"use client";

import { Html, useProgress } from "@react-three/drei";

/** Centered loading readout shown while scene assets load. */
export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="font-mono text-xs tracking-widest text-white/80">
        LOADING {Math.round(progress)}%
      </div>
    </Html>
  );
}
