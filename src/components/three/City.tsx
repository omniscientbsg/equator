"use client";

import { useLayoutEffect, useRef } from "react";
import { InstancedMesh, Object3D, Color } from "three";
import { Grid } from "@react-three/drei";

const dummy = new Object3D();
const NUM_BUILDINGS = 600; // A massive sprawling metropolis

// Generate random buildings on a grid
const BUILDINGS = Array.from({ length: NUM_BUILDINGS }).map((_, i) => {
  const row = Math.floor(i / 25);
  const col = i % 25;
  // Spread out a massive grid, centered around 0,0
  const x = (col - 12.5) * 12 + (Math.random() - 0.5) * 4;
  const z = (row - 12.5) * 12 + (Math.random() - 0.5) * 4;
  
  // Create a canyon effect (taller near center)
  const distFromCenter = Math.sqrt(x*x + z*z);
  const maxH = Math.max(10, 80 - distFromCenter * 0.8);
  const h = 5 + Math.random() * maxH;
  
  const w = 3 + Math.random() * 4;
  const d = 3 + Math.random() * 4;
  
  return { x, z, w, h, d };
}).filter(b => {
  // Clear a massive 60x60 plaza in the center for our HeroBuilding
  const distFromCenter = Math.sqrt(b.x*b.x + b.z*b.z);
  return distFromCenter > 30;
});

export default function City() {
  const ref = useRef<InstancedMesh>(null!);

  useLayoutEffect(() => {
    const mesh = ref.current;
    const c1 = new Color("#1e293b"); // dark slate
    const c2 = new Color("#0f172a"); // darker slate
    const c3 = new Color("#020617"); // near black
    
    BUILDINGS.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      // Mix dark glass colors
      mesh.setColorAt(i, i % 3 === 0 ? c1 : i % 2 === 0 ? c2 : c3);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group>
      {/* Endless dark reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Corporate blueprint grid overlaid on the floor */}
      <Grid 
        infiniteGrid 
        fadeDistance={400} 
        sectionColor="#38bdf8" 
        cellColor="#0284c7" 
        sectionSize={20} 
        cellSize={4} 
        position={[0, 0, 0]}
        sectionThickness={1.5}
        cellThickness={0.5}
      />

      {/* The towering monoliths */}
      <instancedMesh ref={ref} args={[undefined, undefined, BUILDINGS.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        {/* Premium polished architectural material */}
        <meshPhysicalMaterial 
          roughness={0.3} 
          metalness={0.7} 
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </instancedMesh>
    </group>
  );
}
