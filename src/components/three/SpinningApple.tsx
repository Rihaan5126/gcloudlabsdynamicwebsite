"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

function AppleModel() {
  const groupRef = useRef<Group>(null);
  const prefersReducedMotion = useMemo(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  useFrame((_, delta) => {
    if (prefersReducedMotion || !groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh scale={[1, 0.92, 1]}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial color="#e63946" roughness={0.25} metalness={0.05} />
      </mesh>
      {/* Top dimple */}
      <mesh position={[0, 0.86, 0]} scale={[0.35, 0.18, 0.35]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#c62f39" roughness={0.35} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0.15]}>
        <cylinderGeometry args={[0.045, 0.06, 0.4, 8]} />
        <meshStandardMaterial color="#5b3a29" roughness={0.8} />
      </mesh>
      {/* Leaf */}
      <mesh position={[0.2, 1.05, 0.05]} rotation={[0.4, 0.5, 1]} scale={[1, 0.15, 0.45]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#4c9a4a" roughness={0.4} />
      </mesh>
    </group>
  );
}

export function SpinningApple() {
  return (
    <div className="h-full w-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 3, 2]} intensity={1.4} />
        <pointLight position={[-2, -1, -2]} intensity={0.5} color="#22d3ee" />
        <AppleModel />
      </Canvas>
    </div>
  );
}
