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
      className={`group relative w-20 sm:w-24 lg:w-28 aspect-[3/4.2] rounded-xl overflow-hidden border-2 transition-all duration-300 text-left shrink-0 cursor-pointer ${
        isActive
          ? 'border-monarch-maroon shadow-lg scale-105 ring-2 ring-monarch-gold/60'
          : 'border-monarch-beige/60 opacity-70 hover:opacity-100 hover:border-monarch-gold hover:scale-102'
      }`}
      aria-label={`Select ${look.name}`}
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

      {/* Scrim Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

      {/* Active Selection Indicator */}
      {isActive && (
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-monarch-gold ring-2 ring-black" />
      )}

      {/* Bottom Look Label */}
      <div className="absolute bottom-1.5 inset-x-2 pointer-events-none">
        <span className="text-[9px] font-nav uppercase tracking-widest text-monarch-gold-light block font-semibold">
          Look 0{index + 1}
        </span>
        <span className="text-[10px] font-serif text-white line-clamp-1">
          {look.colorName}
        </span>
      </div>
    </button>
  );
};
