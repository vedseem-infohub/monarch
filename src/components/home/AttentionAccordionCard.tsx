'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AttentionProduct } from '@/data/worthYourAttention';

export interface AttentionAccordionCardProps {
  product: AttentionProduct;
  index: number;
  isActive: boolean;
  onActivate?: () => void;
  onToggle?: (el?: HTMLDivElement | null) => void;
  onMouseEnter?: () => void;
  priority?: boolean;
}

export const AttentionAccordionCard: React.FC<AttentionAccordionCardProps> = ({
  product,
  index,
  isActive,
  onActivate,
  onToggle,
  onMouseEnter,
  priority = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // STRICTLY 2 STATES:
  // State 1: Inactive (compact dark card) -> 130-140px on mobile, 180px tablet, 220px desktop, 240px xl
  // State 2: Active (expanded)            -> 290-320px on mobile, 380px tablet, 460px desktop, 500px xl
  const widthClass = isActive
    ? 'w-[290px] xs:w-[320px] sm:w-[380px] lg:w-[460px] xl:w-[500px] shadow-2xl border-monarch-gold/50 z-20'
    : 'w-[130px] xs:w-[140px] sm:w-[180px] lg:w-[220px] xl:w-[240px] border-black/10 shadow-sm hover:border-black/30 z-10';

  const triggerToggle = () => {
    if (onToggle) {
      onToggle(cardRef.current);
    } else if (onActivate) {
      onActivate();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    touchStartRef.current = null;
    // If finger moved > 12px, user was swiping/scrolling horizontally, so don't toggle
    if (dx > 12 || dy > 12) return;
    triggerToggle();
  };

  const handleClick = () => {
    triggerToggle();
  };

  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    } else if (onActivate) {
      onActivate();
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={handleMouseEnter}
      className={`group relative h-[440px] xs:h-[460px] sm:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden cursor-pointer select-none shrink-0 border bg-[#180A0E] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[width,filter] ${widthClass}`}
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
        loading="eager"
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
      {/* STATE 2: HOVERED / ACTIVE - FULL COLORFUL EXPANDED VIEW  */}
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

        <p className="text-xs sm:text-sm text-white/80 font-sans line-clamp-2 max-w-md">
          {product.tagline}
        </p>

        <div className="pt-2">
          <Link
            href={product.actionHref}
            onClick={(e) => e.stopPropagation()}
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
