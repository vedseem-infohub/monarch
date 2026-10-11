'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { PalaceArchEnvironment } from './PalaceArchEnvironment';
import { RoyalMannequin } from './RoyalMannequin';
import { GoldParticles } from './GoldParticles';

// Mouse parallax camera controller
const CameraParallax: React.FC = () => {
  const targetVec = useRef(new THREE.Vector3(0, 0.4, 4.6));

  useFrame(({ pointer, camera }) => {
    // Subtle pointer parallax tilt
    const targetX = pointer.x * 0.4;
    const targetY = 0.4 + pointer.y * 0.25;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.lookAt(0, 0.3, 0);
  });

  return null;
};

interface HeroSceneProps {
  primaryColor?: string;
  accentColor?: string;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  primaryColor = '#5A1725',
  accentColor = '#C7A15B',
}) => {
  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[750px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.4, 4.6], fov: 42 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PalaceArchEnvironment />
          <GoldParticles count={140} />

          <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
            <RoyalMannequin
              primaryColor={primaryColor}
              accentColor={accentColor}
              autoRotate={true}
              scale={1.05}
            />
          </Float>

          <CameraParallax />

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={3.2}
            maxDistance={6.0}
            minPolarAngle={Math.PI / 3.2}
            maxPolarAngle={Math.PI / 1.9}
            dampingFactor={0.06}
            rotateSpeed={0.65}
          />
        </Suspense>
      </Canvas>

      {/* Subtle interaction cue indicator */}
      <div className="absolute bottom-6 right-6 pointer-events-none hidden md:flex items-center gap-2 text-xs text-monarch-gold/80 bg-monarch-burgundy/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-monarch-gold/30">
        <span className="w-2 h-2 rounded-full bg-monarch-gold animate-ping" />
        <span>Drag to rotate · 360° Couture View</span>
      </div>
    </div>
  );
};
