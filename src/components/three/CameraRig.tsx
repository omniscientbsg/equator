"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { cameraAt } from "@/lib/three/cameraPath";
import { scrollProgress } from "@/lib/three/scrollStore";

const _target = new Vector3();

/** Drives the camera along the keyframe path from scroll progress each frame. */
export default function CameraRig() {
  const camera = useThree((s) => s.camera);

  useFrame(() => {
    const { position, target } = cameraAt(scrollProgress.value);
    // Smooth toward target transform for a filmic feel.
    camera.position.lerp(new Vector3(position[0], position[1], position[2]), 0.1);
    _target.set(target[0], target[1], target[2]);
    camera.lookAt(_target);
  });

  return null;
}
