'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AttentionProduct } from '@/data/worthYourAttention';

interface AttentionAccordionCardProps {
  product: AttentionProduct;
  index: number;
  isActive: boolean;
  onActivate: () => void;
  priority?: boolean;
}

export const AttentionAccordionCard: React.FC<AttentionAccordionCardProps> = ({
  product,
  index,
  isActive,
  onActivate,
  priority = false,
}) => {
  // STRICTLY 2 STATES:
  // State 1: Closed (when not hovered) -> Slender slat, dark part, vertical text
  // State 2: Hovered (when hovered)    -> Expands into full colorful view
  const widthClass = isActive
    ? 'w-[360px] sm:w-[480px] lg:w-[580px] xl:w-[640px] shadow-2xl border-monarch-gold/50 z-20'
    : 'w-[76px] sm:w-[90px] lg:w-[104px] border-black/10 shadow-sm hover:border-black/30 z-10';

  return (
    <div
      onClick={onActivate}
      onMouseEnter={onActivate}
      className={`group relative h-[460px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden cursor-pointer select-none shrink-0 border transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,filter] ${widthClass}`}
    >
      {/* Background Editorial Image: Dark in State 1, Full Color in State 2 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? 'filter-none brightness-100 contrast-[1.02] scale-[1.02]'
            : 'grayscale brightness-[0.45] contrast-125 scale-100'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Radiant Minimal Scrim */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-t from-black/85 via-black/30 to-black/10 opacity-90'
            : 'bg-gradient-to-t from-black/85 via-black/55 to-black/35 opacity-95'
        }`}
      />

      {/* Top Number / Badge */}
      <div className="absolute top-4 inset-x-0 px-4 flex items-center justify-between z-20 pointer-events-none">
        <span
          className={`font-nav text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold transition-colors duration-500 ${
            isActive ? 'text-monarch-gold-light' : 'text-white/60'
          }`}
        >
          0{index + 1}
        </span>

        {isActive && (
          <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-nav uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-monarch-gold-light border border-monarch-gold/30">
            <span>{product.offerBadge || 'SPOTLIGHT'}</span>
          </span>
        )}
      </div>

      {/* ======================================================== */}
      {/* STATE 1: CLOSED (NORMAL / NOT HOVERED) - VERTICAL TEXT   */}
      {/* ======================================================== */}
      <div
        className={`absolute inset-x-0 bottom-6 flex flex-col items-center justify-end z-20 pointer-events-none transition-all duration-500 ${
          !isActive ? 'opacity-100 delay-150' : 'opacity-0'
        }`}
      >
        <div className="writing-vertical-lr rotate-180 text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] font-medium text-white/80 group-hover:text-white transition-colors py-2 drop-shadow-sm">
          <span>{product.verticalText}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* STATE 2: HOVERED (ACTIVE) - FULL COLORFUL EXPANDED VIEW  */}
      {/* ======================================================== */}
      <div
        className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end space-y-2 z-20 transition-all duration-700 ease-out ${
          isActive
            ? 'opacity-100 translate-y-0 delay-150 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-medium">
          {product.spotlightTag}
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-white font-normal leading-tight drop-shadow-md">
          {product.attentionHeadline}
        </h3>

        <p className="text-xs sm:text-sm text-white/80 font-sans line-clamp-1 max-w-md">
          {product.tagline}
        </p>

        <div className="pt-2">
          <Link
            href={product.actionHref}
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-white hover:text-monarch-gold-light font-medium transition-colors group/link w-fit"
          >
            <span className="border-b border-white/60 group-hover/link:border-monarch-gold-light pb-0.5 transition-colors">
              Explore Collection
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};
