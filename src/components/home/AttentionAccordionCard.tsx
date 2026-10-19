'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AttentionProduct } from '@/data/worthYourAttention';

interface AttentionAccordionCardProps {
  product: AttentionProduct;
  index: number;
  isActive: boolean;
  isAnyActive: boolean;
  onActivate: () => void;
  onDeactivate?: () => void;
  priority?: boolean;
}

export const AttentionAccordionCard: React.FC<AttentionAccordionCardProps> = ({
  product,
  isActive,
  isAnyActive,
  onActivate,
  onDeactivate,
  priority = false,
}) => {
  // Minimalist width calculations:
  // - When all closed: clean uniform editorial slats
  // - When one hovered: that card expands gracefully, siblings slenderize
  const widthClass = !isAnyActive
    ? 'w-[110px] sm:w-[135px] lg:w-[160px]'
    : isActive
    ? 'w-[340px] sm:w-[460px] lg:w-[560px] xl:w-[600px] shadow-2xl border-white/40 z-20'
    : 'w-[60px] sm:w-[72px] lg:w-[82px] border-white/5 shadow-sm z-10';

  return (
    <div
      onClick={onActivate}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      className={`group relative h-[460px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden cursor-pointer select-none shrink-0 border border-black/10 transition-all duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,filter] ${widthClass}`}
    >
      {/* Background Editorial Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? 'filter-none brightness-100 contrast-[1.02] scale-[1.02]'
            : 'grayscale brightness-[0.5] contrast-120 scale-100'
        }`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Radiant Minimal Scrim */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-90'
            : 'bg-gradient-to-t from-black/85 via-black/50 to-black/30 opacity-90'
        }`}
      />

      {/* ======================================================== */}
      {/* COLLAPSED VIEW: SLEEK VERTICAL TYPOGRAPHY               */}
      {/* ======================================================== */}
      <div
        className={`absolute inset-x-0 bottom-6 flex flex-col items-center justify-end z-20 pointer-events-none transition-all duration-500 ${
          !isActive ? 'opacity-100 delay-150' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="writing-vertical-lr rotate-180 text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] font-medium text-white/80 group-hover:text-white transition-colors py-2 drop-shadow-sm">
          <span>{product.verticalText}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* EXPANDED VIEW: MINIMALIST EDITORIAL HEADLINE & LINK      */}
      {/* ======================================================== */}
      <div
        className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10 flex flex-col justify-end space-y-2 z-20 transition-all duration-700 ease-out ${
          isActive
            ? 'opacity-100 translate-y-0 delay-200 pointer-events-auto'
            : 'opacity-0 translate-y-6 pointer-events-none'
        }`}
      >
        {/* Poetic Title matching screenshot: "Occasionwear, reduced" */}
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-white font-normal leading-tight drop-shadow-md">
          {product.attentionHeadline}
        </h3>

        {/* Minimalist Explore Action */}
        <Link
          href={product.actionHref}
          className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-[0.2em] text-white/90 hover:text-white font-medium pt-2 transition-colors group/link w-fit"
        >
          <span className="border-b border-white/50 group-hover/link:border-white pb-0.5 transition-colors">
            Explore Collection
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};
