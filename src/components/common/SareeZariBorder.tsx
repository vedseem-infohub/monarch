'use client';

import React from 'react';

interface SareeZariBorderProps {
  orientation?: 'vertical' | 'horizontal';
  className?: string;
  hasFringe?: boolean;
}

/**
 * Authentic 24K Gold Zari Border (Patti / Kinari) with traditional Banarasi
 * floral lattice (Jaal), scrolling acanthus vines, and hanging metallic bullion tassels (Jhalar).
 */
export const SareeZariBorder: React.FC<SareeZariBorderProps> = ({
  orientation = 'vertical',
  className = '',
  hasFringe = true,
}) => {
  return (
    <div
      className={`relative select-none pointer-events-none flex ${
        orientation === 'vertical' ? 'flex-row h-full w-12 md:w-16' : 'flex-col w-full h-12 md:h-16'
      } ${className}`}
    >
      {/* Outer Fine Gold Thread Accent */}
      <div
        className={`${
          orientation === 'vertical' ? 'w-0.5 h-full' : 'h-0.5 w-full'
        } bg-gradient-to-b from-[#9A7737] via-[#DFBE7F] to-[#9A7737] shadow-[0_0_8px_rgba(223,190,127,0.6)]`}
      />

      {/* Main Embroidered Zari Strip with Geometric Brocade Weave */}
      <div
        className={`relative flex-1 overflow-hidden ${
          orientation === 'vertical' ? 'h-full' : 'w-full'
        } bg-gradient-to-r from-[#8E703E] via-[#C7A15B] to-[#DFBE7F] shadow-lg`}
        style={{
          boxShadow: 'inset 0 0 10px rgba(41, 17, 22, 0.4)',
        }}
      >
        {/* SVG Detailed Brocade Ornamentation */}
        <svg
          className="w-full h-full opacity-90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="zari-jaal"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              {/* Diamond lattice */}
              <path
                d="M 12 0 L 24 12 L 12 24 L 0 12 Z"
                fill="none"
                stroke="#5A1725"
                strokeWidth="0.75"
                strokeOpacity="0.45"
              />
              {/* Inner 4-petal gold rosette */}
              <circle cx="12" cy="12" r="2.2" fill="#FDF5E6" fillOpacity="0.8" />
              <circle cx="12" cy="12" r="1.2" fill="#9A7737" />
              <path
                d="M 12 8 Q 14 10 12 12 Q 10 10 12 8 Z M 12 16 Q 14 14 12 12 Q 10 14 12 16 Z M 8 12 Q 10 14 12 12 Q 10 10 8 12 Z M 16 12 Q 14 14 12 12 Q 14 10 16 12 Z"
                fill="#FCF9F4"
                fillOpacity="0.6"
              />
            </pattern>
            {/* Shimmer light bar across zari */}
            <linearGradient id="zari-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#9A7737" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#DFBE7F" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFF7D6" stopOpacity="1" />
              <stop offset="70%" stopColor="#DFBE7F" stopOpacity="1" />
              <stop offset="100%" stopColor="#8E703E" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#zari-jaal)" />
          <rect width="100%" height="100%" fill="url(#zari-sheen)" style={{ mixBlendMode: 'overlay' }} opacity="0.6" />
        </svg>
      </div>

      {/* Hanging Bullion Fringe (Zari Jhalar / Tassels) */}
      {hasFringe && (
        <div
          className={`${
            orientation === 'vertical' ? 'w-3 h-full flex flex-col justify-around' : 'h-3 w-full flex flex-row justify-around'
          } overflow-hidden`}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`${
                orientation === 'vertical'
                  ? 'h-2 w-full my-1 border-r-2 border-b border-[#DFBE7F]'
                  : 'w-2 h-full mx-1 border-b-2 border-r border-[#DFBE7F]'
              } bg-gradient-to-tr from-[#9A7737] to-[#DFBE7F] opacity-80`}
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
