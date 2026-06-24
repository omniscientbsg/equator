"use client";

import { Component, ReactNode } from "react";
import { useGLTF } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";

const MODEL_URL = "/models/hero-placeholder.glb"; // SWAP POINT: drop a CC0 .glb here

function GltfModel() {
  // Draco-enabled load; throws (caught by boundary) if the file is missing.
  const { scene } = useGLTF(MODEL_URL, true);
  return <primitive object={scene} position={[0, 0, 0]} scale={1} />;
}

/** Procedural stand-in used when no .glb is present. */
function ProceduralModel() {
  return (
    <mesh position={[0, 1, 0]} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={BRAND.blue} metalness={0.3} roughness={0.4} />
    </mesh>
  );
}

class ModelBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/** Hybrid hero model slot: real .glb if present, else procedural stand-in. */
export default function HeroModel() {
  return (
    <ModelBoundary fallback={<ProceduralModel />}>
      <GltfModel />
    </ModelBoundary>
  );
}
