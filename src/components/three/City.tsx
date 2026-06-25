"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color, MeshStandardMaterial, Texture } from "three";
import { generateCity } from "@/lib/three/city";
import { BRAND, BUILDING, GROUND } from "@/lib/three/materials";
import { makeWindowTexture, makeGroundTexture } from "./textures";

const CITY = generateCity({ seed: 1337, count: 80, spread: 30, minH: 2, maxH: 18 });
const BASE = CITY.filter((b) => !b.accent);
const ACCENTS = CITY.filter((b) => b.accent);
const dummy = new Object3D();

/** Emissive accent tower that twinkles. */
function AccentTower({ idx, x, z, w, d, h }: { idx: number; x: number; z: number; w: number; d: number; h: number }) {
  const mat = useRef<MeshStandardMaterial>(null!);
  useFrame(({ clock }) => {
    mat.current.emissiveIntensity = 0.7 + Math.sin(clock.elapsedTime * 1.5 + idx) * 0.4;
  });
  const color = idx % 2 ? BRAND.gold : BRAND.sky;
  return (
    <mesh position={[x, h / 2, z]} scale={[w, h, d]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={0.9} toneMapped={false} />
    </mesh>
  );
}

/** Detailed procedural landmark: tiered tower + crown + spire, with lit windows. */
function Landmark({ tex }: { tex: Texture }) {
  return (
    <group position={[0, 0, -6]}>
      <mesh position={[0, 11, 0]} castShadow receiveShadow>
        <boxGeometry args={[6, 22, 6]} />
        <meshStandardMaterial color={BUILDING.base} map={tex} emissiveMap={tex} emissive={"#ffffff"} emissiveIntensity={0.9} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 25, 0]} castShadow>
        <boxGeometry args={[4, 8, 4]} />
        <meshStandardMaterial color={BUILDING.baseAlt} map={tex} emissiveMap={tex} emissive={"#ffffff"} emissiveIntensity={0.9} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 31, 0]} castShadow>
        <boxGeometry args={[2.2, 5, 2.2]} />
        <meshStandardMaterial color={BRAND.silver} roughness={0.3} metalness={0.6} />
      </mesh>
      <mesh position={[0, 35.5, 0]}>
        <cylinderGeometry args={[0.08, 0.25, 4, 8]} />
        <meshStandardMaterial color={BRAND.gold} emissive={BRAND.gold} emissiveIntensity={1.4} toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Procedural lit city: windowed instanced buildings + rooftops + landmark + textured ground. */
export default function City() {
  const ref = useRef<InstancedMesh>(null!);
  const roofRef = useRef<InstancedMesh>(null!);
  const windowTex = useMemo(() => makeWindowTexture(), []);
  const groundTex = useMemo(() => makeGroundTexture(), []);

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

    // rooftop detail box on the taller buildings; hide the rest far below
    const roof = roofRef.current;
    BASE.forEach((b, i) => {
      const tall = b.h > 9;
      dummy.position.set(b.x, tall ? b.h + 0.6 : -1000, b.z);
      dummy.scale.set(tall ? 0.5 : 0.0001, tall ? 1.4 : 0.0001, tall ? 0.5 : 0.0001);
      dummy.updateMatrix();
      roof.setMatrixAt(i, dummy.matrix);
    });
    roof.instanceMatrix.needsUpdate = true;
  }, []);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshStandardMaterial color={GROUND} map={groundTex} roughness={0.85} metalness={0.1} />
      </mesh>

      <instancedMesh ref={ref} args={[undefined, undefined, BASE.length]} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial map={windowTex} emissiveMap={windowTex} emissive={"#ffffff"} emissiveIntensity={0.8} roughness={0.6} metalness={0.15} />
      </instancedMesh>

      <instancedMesh ref={roofRef} args={[undefined, undefined, BASE.length]} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={BUILDING.baseAlt} roughness={0.7} />
      </instancedMesh>

      <Landmark tex={windowTex} />

      {ACCENTS.map((b, i) => (
        <AccentTower key={i} idx={i} x={b.x} z={b.z} w={b.w} d={b.d} h={b.h} />
      ))}
    </group>
  );
}
