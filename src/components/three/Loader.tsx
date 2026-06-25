"use client";

import { Html } from "@react-three/drei";

/** Centered loading readout shown while scene assets load. */
export default function Loader() {
  return (
    <Html center>
      <div className="font-mono text-xs tracking-widest text-white/80">
        LOADING...
      </div>
    </Html>
  );
}
