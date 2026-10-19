'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { OccasionEditProduct } from '@/data/editsForOccasion';

interface EditorialOccasionCardProps {
  edit: OccasionEditProduct;
  priority?: boolean;
}

export const EditorialOccasionCard: React.FC<EditorialOccasionCardProps> = ({
  edit,
  priority = false,
}) => {
  return (
    <Link
      href={edit.actionHref}
      style={{ aspectRatio: '3 / 4.1' }}
      className="editorial-occasion-card group relative block w-full h-[460px] sm:h-[500px] lg:h-[540px] min-h-[440px] rounded-2xl overflow-hidden bg-[#1E1714] border border-monarch-gold/30 hover:border-monarch-gold transition-all duration-500 shadow-xl hover:shadow-[0_20px_45px_rgba(212,175,55,0.22)] select-none will-change-transform opacity-100"
    >
      {/* High-Resolution Luxury Editorial Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={edit.image}
        alt={edit.occasionTitle}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Radiant Editorial Scrim (Preserves clarity while keeping typography crystal clear) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-500 group-hover:opacity-85 pointer-events-none" />

      {/* Top Subtle Ambient Vignette */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom Content Overlay: Matching Screenshot */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end space-y-1.5 pointer-events-none z-10">
        {/* Occasion Sub-Tag */}
        <span className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.22em] text-monarch-gold-light font-semibold opacity-95 block drop-shadow-xs">
          {edit.occasionTag}
        </span>

        {/* Display Title */}
        <h3 className="font-serif text-2xl sm:text-[26px] lg:text-[28px] font-normal text-white group-hover:text-monarch-gold-light transition-colors leading-tight drop-shadow-sm">
          {edit.occasionTitle}
        </h3>

        {/* Action Link with Animated Arrow */}
        <div className="pt-2 flex items-center gap-2 text-[11px] font-nav uppercase tracking-[0.2em] text-white/90 group-hover:text-monarch-gold font-semibold transition-colors">
          <span>{edit.actionText}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
        </div>
      </div>
    </Link>
  );
};
