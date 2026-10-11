'use client';

import React, { Suspense, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, X } from 'lucide-react';

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  subtitle: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'zari-weft',
    position: [0.6, 0.4, 0.25],
    title: '24K Gold Zari Weft',
    subtitle: 'Varanasi Master Loom',
    description: 'Flattened pure silver wire electroplated with 24-karat gold, hand-interlaced across the silk warp every 0.2 millimeters.',
  },
  {
    id: 'dabka-relief',
    position: [-0.5, -0.3, 0.3],
    title: 'Imperial Dabka & Nakshi',
    subtitle: 'Awadhi Karchob Technique',
    description: 'Hollow spiral copper-gold wire spring couched onto silk velvet to cast three-dimensional architectural shadows.',
  },
  {
    id: 'mulberry-silk',
    position: [0.1, -0.7, 0.2],
    title: 'Pure Mulberry Silk Warp',
    subtitle: 'Natural Lustre & Tensile Strength',
    description: 'Unbroken raw silk filaments dyed using natural pomegranate rind and lac resin, producing a drape that outlasts generations.',
  },
];

const TextileMedallion: React.FC<{
  activeHotspot: Hotspot | null;
  onSelectHotspot: (h: Hotspot) => void;
}> = ({ activeHotspot, onSelectHotspot }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (!activeHotspot) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Brocade Medallion Plaque */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 64]} />
        <meshStandardMaterial
          color="#5A1725" // Royal Maroon Velvet Base
          roughness={0.55}
          metalness={0.3}
        />
      </mesh>

      {/* Gold Outer Filigree Ring */}
      <mesh position={[0, 0, 0.08]}>
        <torusGeometry args={[1.56, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#DFBE7F"
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* Secondary Inner Gold Lotus Ring */}
      <mesh position={[0, 0, 0.09]}>
        <torusGeometry args={[1.1, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#C7A15B"
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* Raised Embroidered Lotus Petals (Gold & Velvet) */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.65;
        const y = Math.sin(rad) * 0.65;
        return (
          <mesh
            key={i}
            position={[x, y, 0.1]}
            rotation={[0, 0, rad]}
          >
            <coneGeometry args={[0.18, 0.45, 16]} />
            <meshStandardMaterial
              color="#DFBE7F"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        );
      })}

      {/* Center Royal Crest Gem */}
      <mesh position={[0, 0, 0.14]}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial
          color="#164E33" // Royal Emerald Gem
          metalness={0.3}
          roughness={0.15}
        />
      </mesh>

      {/* Surrounding Seed Pearls */}
      {[...Array(16)].map((_, i) => {
        const rad = (i * Math.PI * 2) / 16;
        const x = Math.cos(rad) * 0.35;
        const y = Math.sin(rad) * 0.35;
        return (
          <mesh key={i} position={[x, y, 0.12]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color="#FAF5E8"
              metalness={0.1}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Interactive 3D Hotspot Pins (native Three.js raycasting, eliminates React 19 root unmount conflicts) */}
      {HOTSPOTS.map((hotspot) => {
        const isSelected = activeHotspot?.id === hotspot.id;
        return (
          <group
            key={hotspot.id}
            position={hotspot.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectHotspot(hotspot);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
            }}
          >
            {/* Glowing outer halo */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.12 : 0.085, 16, 16]} />
              <meshBasicMaterial
                color={isSelected ? '#DFBE7F' : '#C7A15B'}
                transparent
                opacity={isSelected ? 0.65 : 0.3}
              />
            </mesh>

            {/* Central bright marker pin */}
            <mesh scale={isSelected ? 1.25 : 1.0}>
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#FFFFFF' : '#DFBE7F'}
                emissive={isSelected ? '#DFBE7F' : '#C7A15B'}
                emissiveIntensity={isSelected ? 1.4 : 0.8}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const CraftsmanshipSceneContent: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C0B0F] via-[#291116] to-[#120508] border border-monarch-gold/25 shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color="#5A1725" />
        <spotLight
          position={[3, 4, 4]}
          intensity={2.6}
          color="#FFE9BD"
          angle={0.5}
          penumbra={0.8}
        />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#DFBE7F" />
        <directionalLight position={[0, 0, 4]} intensity={0.9} color="#FFFFFF" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <TextileMedallion
              activeHotspot={activeHotspot}
              onSelectHotspot={setActiveHotspot}
            />
          </Float>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={5.0}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Top Banner Control */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-monarch-burgundy/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-monarch-gold/30 text-xs text-monarch-gold">
          <Sparkles className="w-3.5 h-3.5 text-monarch-gold-light" />
          <span>Interactive 3D Textile Specimen</span>
        </div>
        <span className="text-xs text-monarch-ivory/60 hidden sm:block">
          Click markers or tabs to inspect
        </span>
      </div>

      {/* Hotspot Selection Pills */}
      <div className="absolute top-14 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-auto">
        {HOTSPOTS.map((hotspot) => {
          const isSelected = activeHotspot?.id === hotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => setActiveHotspot(hotspot)}
              className={`px-3 py-1 rounded-full text-[11px] font-nav uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-monarch-gold text-monarch-burgundy border-monarch-gold font-semibold shadow-md scale-105'
                  : 'bg-monarch-burgundy/85 text-monarch-ivory/80 border-monarch-gold/30 hover:border-monarch-gold/60 backdrop-blur-sm'
              }`}
            >
              {hotspot.title}
            </button>
          );
        })}
      </div>

      {/* Active Hotspot Detail Overlay Card */}
      {activeHotspot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-monarch-burgundy/95 backdrop-blur-md p-5 rounded-xl border border-monarch-gold/40 shadow-2xl text-left z-20 transition-all animate-fadeIn">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-nav text-monarch-gold-light">
                {activeHotspot.subtitle}
              </span>
              <h4 className="text-lg font-serif text-monarch-ivory font-medium">
                {activeHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-monarch-gold/60 hover:text-monarch-gold p-1"
              aria-label="Close detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-monarch-beige leading-relaxed font-sans mt-2">
            {activeHotspot.description}
          </p>
        </div>
      )}
    </div>
  );
};

export const Craftsmanship3DViewer = dynamic(
  () => Promise.resolve(CraftsmanshipSceneContent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl bg-monarch-burgundy flex items-center justify-center border border-monarch-gold/20">
        <div className="w-10 h-10 border-2 border-monarch-gold border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
