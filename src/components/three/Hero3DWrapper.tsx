'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <HeroFallbackLoading />,
  }
);

const HeroFallbackLoading: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[550px] lg:min-h-[750px] flex flex-col items-center justify-center bg-monarch-burgundy text-monarch-gold overflow-hidden">
      {/* Decorative Palace Arch Silhouette */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <div className="w-[340px] h-[520px] border-2 border-monarch-gold rounded-t-full" />
      </div>

      {/* Royal Crest Pulse */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full border border-monarch-gold/40 flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-2 border-monarch-gold border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="font-serif text-lg tracking-widest text-monarch-ivory uppercase">
          Curating Royal Ensemble
        </p>
        <span className="text-xs text-monarch-gold/70 tracking-wider mt-1 font-nav uppercase">
          Three.js Couture Experience
        </span>
      </div>
    </div>
  );
};

export const Hero3DWrapper: React.FC<{
  primaryColor?: string;
  accentColor?: string;
}> = (props) => {
  return (
    <div className="w-full h-full relative">
      <HeroScene {...props} />
    </div>
  );
};
