'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { MonarchLoader } from '@/components/common/MonarchLoader';

const HeroScene = dynamic(
  () => import('./HeroScene').then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => (
      <MonarchLoader
        variant="embedded"
        message="Curating Royal Ensemble"
        subtitle="Three.js Couture Experience"
        className="min-h-[550px] lg:min-h-[750px]"
      />
    ),
  }
);

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
