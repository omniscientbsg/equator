// src/components/three/City.tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color, MeshStandardMaterial } from "three";
import { generateCity } from "@/lib/three/city";
import { BRAND, BUILDING, GROUND } from "@/lib/three/materials";

const CITY = generateCity({ seed: 1337, count: 70, spread: 26, minH: 2, maxH: 16 });
const BASE = CITY.filter((b) => !b.accent);
const ACCENTS = CITY.filter((b) => b.accent);
const dummy = new Object3D();

/** A single emissive accent tower that twinkles over time. */
function AccentTower({ idx, x, z, w, d, h }: { idx: number; x: number; z: number; w: number; d: number; h: number }) {
  const mat = useRef<MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    mat.current.emissiveIntensity = 0.6 + Math.sin(clock.elapsedTime * 1.5 + idx) * 0.4;
  });
  const color = idx % 2 ? BRAND.gold : BRAND.sky;
  return (
    <mesh position={[x, h / 2, z]} scale={[w, h, d]} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.8} toneMapped={false} />
    </mesh>
  );
}

/** Procedural lit city: instanced base buildings + emissive accent towers + ground. */
export default function City() {
  const ref = useRef<InstancedMesh>(null!);

  useLayoutEffect(() => {
    const mesh = ref.current;
    const cA = new Color(BUILDING.base);
    const cB = new Color(BUILDING.baseAlt);
    BASE.forEach((b, i) => {
      dummy.position.set(b.x, b.h / 2, b.z);
      dummy.scale.set(b.w, b.h, b.d);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      mesh.setColorAt(i, i % 2 ? cA : cB);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color={GROUND} roughness={0.9} />
      </mesh>

      <instancedMesh ref={ref} args={[undefined, undefined, BASE.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial roughness={0.7} metalness={0.1} />
      </instancedMesh>

      {ACCENTS.map((b, i) => (
        <AccentTower key={i} idx={i} x={b.x} z={b.z} w={b.w} d={b.d} h={b.h} />
      ))}
    </group>
  );
}
