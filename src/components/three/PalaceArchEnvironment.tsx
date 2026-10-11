'use client';

import React from 'react';

export const PalaceArchEnvironment: React.FC = () => {
  return (
    <>
      {/* Ambient regal lighting */}
      <ambientLight intensity={0.65} color="#4A1E28" />

      {/* Main warm golden key light */}
      <spotLight
        position={[4, 6, 5]}
        angle={0.45}
        penumbra={0.8}
        intensity={2.8}
        color="#FDE8B3"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0001}
      />

      {/* Rim light from behind emphasizing golden zari embroidery */}
      <spotLight
        position={[-4, 4, -4]}
        angle={0.6}
        penumbra={1}
        intensity={3.2}
        color="#C7A15B"
      />

      {/* Subtle fill light for crimson velvet undertones */}
      <pointLight position={[0, -2, 3]} intensity={1.2} color="#7A2436" />

      {/* Golden top backlight for crowning effect */}
      <directionalLight position={[0, 8, -2]} intensity={1.5} color="#DFBE7F" />
    </>
  );
};
