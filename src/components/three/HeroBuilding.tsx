"use client";

import { Edges } from "@react-three/drei";
import { BRAND } from "@/lib/three/materials";

/**
 * A highly detailed, X-Ray "Digital Twin" skyscraper.
 * Built with transparent glass and glowing wireframe edges.
 */
export default function HeroBuilding() {
  const floors = 15;
  const floorHeight = 6;
  const width = 30;
  const depth = 30;
  
  const totalHeight = floors * floorHeight;

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Glass Shell */}
      <mesh position={[0, totalHeight / 2, 0]}>
        <boxGeometry args={[width, totalHeight, depth]} />
        <meshPhysicalMaterial 
          color="#020617" 
          transparent 
          opacity={0.15} 
          roughness={0.05} 
          metalness={1} 
          depthWrite={false}
          side={2} // THREE.DoubleSide so we see inside
        />
        <Edges scale={1.0} threshold={15} color="#38bdf8" />
      </mesh>

      {/* Floor Slabs */}
      {Array.from({ length: floors + 1 }).map((_, i) => {
        const isGround = i === 0;
        const isReception = i === 1;
        const isOffice = i === 10;
        
        // Highlight story-relevant floors with different colored glowing edges
        const edgeColor = isGround ? "#38bdf8" : isReception ? "#818cf8" : isOffice ? "#34d399" : "#1e40af";

        return (
          <mesh key={i} position={[0, i * floorHeight, 0]}>
            <boxGeometry args={[width - 0.5, 0.5, depth - 0.5]} />
            <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.5} />
            <Edges scale={1.0} threshold={15} color={edgeColor} />
            
            {/* If it's a special floor, add some abstract "furniture" blocks */}
            {(isGround || isReception || isOffice) && (
              <group position={[0, 0.25, 0]}>
                {/* Reception desk / Gate */}
                <mesh position={[0, 1, 8]}>
                  <boxGeometry args={[6, 2, 2]} />
                  <meshStandardMaterial color="#1e293b" />
                  <Edges color={edgeColor} />
                </mesh>
                {/* Plants / Decor */}
                <mesh position={[-6, 1.5, 8]}>
                  <cylinderGeometry args={[1, 1, 3]} />
                  <meshStandardMaterial color="#1e293b" />
                  <Edges color={edgeColor} />
                </mesh>
              </group>
            )}
          </mesh>
        );
      })}

      {/* Central Elevator Core */}
      <mesh position={[0, totalHeight / 2, 0]}>
        <boxGeometry args={[6, totalHeight, 6]} />
        <meshStandardMaterial color="#020617" roughness={0.8} metalness={0.2} />
        <Edges scale={1.0} threshold={15} color="#475569" />
      </mesh>
    </group>
  );
}
