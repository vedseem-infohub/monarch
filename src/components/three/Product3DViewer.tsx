'use client';

import React, { Suspense, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, Eye, Sparkles } from 'lucide-react';
import { RoyalMannequin } from './RoyalMannequin';
import { PalaceArchEnvironment } from './PalaceArchEnvironment';

interface Product3DViewerProps {
  primaryColor?: string;
  accentColor?: string;
  productName: string;
}

const ProductSceneContent: React.FC<Product3DViewerProps> = ({
  primaryColor = '#5A1725',
  accentColor = '#C7A15B',
  productName,
}) => {
  const controlsRef = useRef<any>(null);
  const [activeAngle, setActiveAngle] = useState<'front' | 'side' | 'back' | 'detail'>('front');

  const setCameraAngle = (angle: 'front' | 'side' | 'back' | 'detail') => {
    setActiveAngle(angle);
    if (!controlsRef.current) return;

    if (angle === 'front') {
      controlsRef.current.reset();
      controlsRef.current.setAzimuthalAngle(0);
      controlsRef.current.setPolarAngle(Math.PI / 2.1);
    } else if (angle === 'side') {
      controlsRef.current.setAzimuthalAngle(Math.PI / 2);
      controlsRef.current.setPolarAngle(Math.PI / 2.1);
    } else if (angle === 'back') {
      controlsRef.current.setAzimuthalAngle(Math.PI);
      controlsRef.current.setPolarAngle(Math.PI / 2.1);
    } else if (angle === 'detail') {
      controlsRef.current.setAzimuthalAngle(0.3);
      controlsRef.current.setPolarAngle(Math.PI / 2.3);
      controlsRef.current.target.set(0, 1.0, 0);
    }
  };

  const handleReset = () => {
    setCameraAngle('front');
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.reset();
    }
  };

  return (
    <div className="relative w-full h-[520px] md:h-[620px] rounded-2xl overflow-hidden bg-gradient-to-b from-[#1E090E] via-[#291116] to-[#15060A] border border-monarch-gold/30 shadow-2xl cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.4, 4.4], fov: 42 }}
        shadows={{ type: THREE.PCFShadowMap }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <PalaceArchEnvironment />
          <RoyalMannequin
            primaryColor={primaryColor}
            accentColor={accentColor}
            autoRotate={false}
            scale={1.05}
          />
          <OrbitControls
            ref={controlsRef}
            enablePan={false}
            enableZoom={true}
            minDistance={2.6}
            maxDistance={5.5}
            minPolarAngle={Math.PI / 3.4}
            maxPolarAngle={Math.PI / 1.9}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Top Bar with Status and Title */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-monarch-burgundy/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-monarch-gold/30 text-xs text-monarch-gold flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-monarch-gold-light" />
          <span className="font-nav tracking-wide">360° Royal Atelier Viewer</span>
        </div>
        <button
          onClick={handleReset}
          className="pointer-events-auto bg-monarch-burgundy/85 hover:bg-monarch-maroon/90 text-monarch-gold hover:text-monarch-ivory px-3 py-1.5 rounded-full border border-monarch-gold/30 text-xs flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Camera</span>
        </button>
      </div>

      {/* Angle Presets Bottom Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-monarch-burgundy/90 backdrop-blur-md p-1.5 rounded-full border border-monarch-gold/35 shadow-xl z-10">
        <button
          onClick={() => setCameraAngle('front')}
          className={`px-3 py-1 rounded-full text-xs font-nav transition-all ${
            activeAngle === 'front'
              ? 'bg-monarch-gold text-monarch-burgundy font-medium shadow'
              : 'text-monarch-beige hover:text-monarch-gold'
          }`}
        >
          Front
        </button>
        <button
          onClick={() => setCameraAngle('side')}
          className={`px-3 py-1 rounded-full text-xs font-nav transition-all ${
            activeAngle === 'side'
              ? 'bg-monarch-gold text-monarch-burgundy font-medium shadow'
              : 'text-monarch-beige hover:text-monarch-gold'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setCameraAngle('back')}
          className={`px-3 py-1 rounded-full text-xs font-nav transition-all ${
            activeAngle === 'back'
              ? 'bg-monarch-gold text-monarch-burgundy font-medium shadow'
              : 'text-monarch-beige hover:text-monarch-gold'
          }`}
        >
          Back
        </button>
        <button
          onClick={() => setCameraAngle('detail')}
          className={`px-3 py-1 rounded-full text-xs font-nav transition-all ${
            activeAngle === 'detail'
              ? 'bg-monarch-gold text-monarch-burgundy font-medium shadow'
              : 'text-monarch-beige hover:text-monarch-gold'
          }`}
        >
          Embroidery Detail
        </button>
      </div>
    </div>
  );
};

export const Product3DViewer = dynamic(
  () => Promise.resolve(ProductSceneContent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] md:h-[620px] rounded-2xl bg-monarch-burgundy flex items-center justify-center border border-monarch-gold/20">
        <div className="w-10 h-10 border-2 border-monarch-gold border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
