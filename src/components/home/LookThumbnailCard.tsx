'use client';

import React from 'react';
import { LookStyleItem } from '@/data/changeLook';

interface LookThumbnailCardProps {
  look: LookStyleItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

export const LookThumbnailCard: React.FC<LookThumbnailCardProps> = ({
  look,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <button
      onClick={onSelect}
      type="button"
      className={`group relative w-18 sm:w-20 lg:w-[88px] h-24 sm:h-28 lg:h-32 rounded-xl overflow-hidden transition-all duration-300 text-left shrink-0 cursor-pointer block ${
        isActive
          ? 'border-2 border-pink-400 ring-2 ring-pink-300/80 shadow-lg scale-105'
          : 'border border-gray-200/80 opacity-70 hover:opacity-100 hover:border-gray-400 hover:scale-102'
      }`}
      aria-label={`Select ${look.name} (Look 0${index + 1})`}
    >
      {/* Thumbnail Saree Model Photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={look.thumbnail}
        alt={look.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 pointer-events-none"
        loading="lazy"
        decoding="async"
      />

      {/* Subtle Bottom Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Active Indicator dot */}
      {isActive && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-400 ring-1 ring-white" />
      )}
    </button>
  );
};
