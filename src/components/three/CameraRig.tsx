// src/components/three/CameraRig.tsx
"use client";

import { useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { cameraAt } from "@/lib/three/cameraPath";
import { scrollProgress } from "@/lib/three/scrollStore";
import { pointer } from "@/lib/three/pointerStore";
import { parallaxOffset } from "@/lib/three/pointer";

const _pos = new Vector3();
const _target = new Vector3();

/** Drives the camera from scroll progress + cursor parallax + idle bob + roll. */
export default function CameraRig() {
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame(({ clock }) => {
    const { position, target, roll } = cameraAt(scrollProgress.value);
    const [px, py] = parallaxOffset(pointer.x, pointer.y, 2.2);
    const bob = Math.sin(clock.elapsedTime * 0.6) * 0.25;
    _pos.set(position[0] + px, position[1] + py + bob, position[2]);
    camera.position.lerp(_pos, 0.06);
    _target.set(target[0], target[1], target[2]);
    camera.lookAt(_target);
    camera.rotation.z = roll;
  });

  return null;
}
