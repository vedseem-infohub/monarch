'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RoyalMannequinProps {
  primaryColor?: string;
  accentColor?: string;
  autoRotate?: boolean;
  scale?: number;
}

export const RoyalMannequin: React.FC<RoyalMannequinProps> = ({
  primaryColor = '#5A1725', // Royal Maroon
  accentColor = '#C7A15B',  // Antique Gold
  autoRotate = true,
  scale = 1.0,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const headDressRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      // Gentle, restrained royal rotation
      groupRef.current.rotation.y += delta * 0.18;
    }

    // Subtle breathing motion
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = -1.2 + Math.sin(time * 1.2) * 0.025;
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]} scale={scale}>
      {/* --- PEDESTAL BASE --- */}
      {/* Lower octagonal/circular tiered base */}
      <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.1, 1.2, 0.16, 32]} />
        <meshStandardMaterial
          color="#291116"
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>

      {/* Gold rim on base */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[1.05, 1.05, 0.05, 32]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Tiered upper pedestal */}
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.85, 0.95, 0.15, 32]} />
        <meshStandardMaterial
          color="#3F101A"
          roughness={0.5}
          metalness={0.3}
        />
      </mesh>

      {/* Central brass column */}
      <mesh position={[0, 0.75, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.085, 0.8, 24]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Brass turned ornamental ring on pole */}
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.11, 0.03, 16, 32]} />
        <meshStandardMaterial
          color="#DFBE7F"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>

      {/* --- MANNEQUIN LOWER BODY / COAT FLARE --- */}
      {/* Flared royal skirt/coat base */}
      <mesh position={[0, 1.35, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.72, 0.75, 32, 1, false]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.65}
          metalness={0.25}
        />
      </mesh>

      {/* Gold zari border trim along the lower hem */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.73, 0.73, 0.08, 32, 1, true]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.88}
          roughness={0.25}
        />
      </mesh>

      {/* Secondary micro gold wire trim */}
      <mesh position={[0, 1.08, 0]}>
        <torusGeometry args={[0.71, 0.015, 12, 32]} />
        <meshStandardMaterial
          color="#DFBE7F"
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* --- WAIST & KAMARBANDH (ROYAL SASH) --- */}
      <mesh position={[0, 1.74, 0]}>
        <cylinderGeometry args={[0.39, 0.43, 0.12, 32]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      {/* Royal Belt Buckle / Jewel Medallion */}
      <mesh position={[0, 1.74, 0.41]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.03, 16]} />
        <meshStandardMaterial
          color="#DFBE7F"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      {/* Central emerald stone in belt buckle */}
      <mesh position={[0, 1.74, 0.43]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color="#164E33"
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* --- TORSO & CHEST (ANGRAKHA / SHERWANI CUT) --- */}
      <mesh position={[0, 2.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.39, 0.65, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.6}
          metalness={0.25}
        />
      </mesh>

      {/* Diagonal Royal Angrakha Gold Zari Flap */}
      <mesh position={[0.08, 2.15, 0.4]}>
        <boxGeometry args={[0.34, 0.58, 0.04]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.85}
          roughness={0.28}
        />
      </mesh>

      {/* Shoulders & Upper Chest */}
      <mesh position={[0, 2.48, 0]} castShadow>
        <cylinderGeometry args={[0.44, 0.48, 0.16, 32]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.6}
          metalness={0.25}
        />
      </mesh>

      {/* Left Shoulder Epaulette */}
      <mesh position={[-0.48, 2.45, 0]} rotation={[0, 0, -0.2]}>
        <capsuleGeometry args={[0.12, 0.22, 8, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.65}
          metalness={0.25}
        />
      </mesh>
      {/* Left Gold Cuff Trim */}
      <mesh position={[-0.51, 2.38, 0]}>
        <torusGeometry args={[0.14, 0.02, 12, 24]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Right Shoulder Epaulette */}
      <mesh position={[0.48, 2.45, 0]} rotation={[0, 0, 0.2]}>
        <capsuleGeometry args={[0.12, 0.22, 8, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          roughness={0.65}
          metalness={0.25}
        />
      </mesh>
      {/* Right Gold Cuff Trim */}
      <mesh position={[0.51, 2.38, 0]}>
        <torusGeometry args={[0.14, 0.02, 12, 24]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* High Mandarin Collar */}
      <mesh position={[0, 2.62, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.24, 0.16, 24, 1, false]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>

      {/* Inner Neck Wood/Velvet Form */}
      <mesh position={[0, 2.76, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.16, 24]} />
        <meshStandardMaterial
          color="#36302B"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Turned Brass Finial Top (Royal Dressmaker Crown) */}
      <mesh position={[0, 2.92, 0]}>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial
          color="#DFBE7F"
          metalness={0.95}
          roughness={0.1}
        />
      </mesh>
      <mesh position={[0, 3.03, 0]}>
        <coneGeometry args={[0.04, 0.12, 16]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.95}
          roughness={0.15}
        />
      </mesh>

      {/* --- ROYAL JEWELRY / HAAR (PEARL & EMERALD NECKLACE) --- */}
      {/* Upper pearl strand curve */}
      <mesh position={[0, 2.44, 0.42]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.26, 0.022, 12, 32, Math.PI]} />
        <meshStandardMaterial
          color="#FAF5E8"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Lower longer pearl strand */}
      <mesh position={[0, 2.32, 0.44]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.32, 0.025, 12, 32, Math.PI]} />
        <meshStandardMaterial
          color="#FAF5E8"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Royal Pendant hanging in center */}
      <mesh position={[0, 2.18, 0.46]}>
        <octahedronGeometry args={[0.065]} />
        <meshStandardMaterial
          color="#164E33" // Royal Emerald
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>

      {/* Royal Brooch / Crest on left chest */}
      <group position={[-0.22, 2.36, 0.43]} rotation={[0, 0.25, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.015, 8]} />
          <meshStandardMaterial
            color="#DFBE7F"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Gold Buttons down center */}
      {[2.28, 2.12, 1.96].map((yPos, i) => (
        <mesh key={i} position={[0, yPos, 0.42]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <meshStandardMaterial
            color="#DFBE7F"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
