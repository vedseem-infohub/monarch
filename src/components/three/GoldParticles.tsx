'use client';

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GoldParticlesProps {
  count?: number;
}

export const GoldParticles: React.FC<GoldParticlesProps> = ({ count = 120 }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const scl = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Deterministic particle distribution around the royal mannequin
      const seed1 = Math.abs(Math.sin(i * 12.9898));
      const seed2 = Math.abs(Math.cos(i * 78.233));
      const seed3 = Math.abs(Math.sin(i * 45.164));
      const seed4 = Math.abs(Math.cos(i * 91.521));

      const angle = seed1 * Math.PI * 2;
      const radius = 1.2 + seed2 * 2.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (seed3 - 0.4) * 4.5;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      scl[i] = seed4 * 0.04 + 0.015;
    }

    return [pos, scl];
  }, [count]);

  const elapsedTimeRef = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    elapsedTimeRef.current += delta;
    pointsRef.current.rotation.y += delta * 0.05;
    
    // Gentle bobbing motion without accessing deprecated THREE.Clock
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = elapsedTimeRef.current;
    for (let i = 0; i < count; i++) {
      const idx = i * 3 + 1;
      positions[idx] += Math.sin(time + i) * 0.001;
      if (positions[idx] > 3) positions[idx] = -1.5;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#DFBE7F"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
