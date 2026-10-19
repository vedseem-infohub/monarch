'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TrendDeckProduct } from '@/data/latestTrends';

interface TrendDeckCardProps {
  product: TrendDeckProduct;
  index: number;
  activeIndex: number;
  totalCards: number;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
}

export const TrendDeckCard: React.FC<TrendDeckCardProps> = ({
  product,
  index,
  activeIndex,
  totalCards,
  onSwipeNext,
  onSwipePrev,
}) => {
  // Calculate relative offset in the circular stack: 0 is front card, 1 is behind, etc.
  const offset = (index - activeIndex + totalCards) % totalCards;
  const isTop = offset === 0;

  // Drag physics for top card
  const x = useMotionValue(0);
  const dragRotate = useTransform(x, [-200, 200], [-14, 14]);

  // Stack geometry ("taas ke paate" playing card deck)
  // - Top card: scale 1, y 0, rotate 0
  // - Card 2: scale 0.94, y 16px, slight counter-clockwise tilt (-2.8deg)
  // - Card 3: scale 0.88, y 32px, slight clockwise tilt (+2.8deg)
  // - Cards further back: hidden smoothly behind
  let targetScale = 1;
  let targetY = 0;
  let targetRotate = 0;
  let targetOpacity = 1;
  let zIndex = 20 - offset;

  if (offset === 0) {
    targetScale = 1;
    targetY = 0;
    targetRotate = 0;
    targetOpacity = 1;
  } else if (offset === 1) {
    targetScale = 0.94;
    targetY = 16;
    targetRotate = -2.8;
    targetOpacity = 0.9;
  } else if (offset === 2) {
    targetScale = 0.88;
    targetY = 32;
    targetRotate = 2.8;
    targetOpacity = 0.72;
  } else {
    targetScale = 0.82;
    targetY = 44;
    targetRotate = 0;
    targetOpacity = 0;
  }

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const swipeThreshold = 60;
    const velocityThreshold = 250;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipePrev();
    }
  };

  return (
    <motion.div
      style={{
        zIndex,
        x: isTop ? x : 0,
        rotate: isTop ? dragRotate : targetRotate,
      }}
      animate={{
        scale: targetScale,
        y: targetY,
        opacity: targetOpacity,
        rotate: isTop ? 0 : targetRotate,
      }}
      transition={{
        type: 'spring',
        stiffness: 280,
        damping: 24,
        mass: 0.8,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={isTop ? handleDragEnd : undefined}
      onClick={isTop ? onSwipeNext : undefined}
      className={`absolute inset-0 select-none rounded-3xl overflow-hidden shadow-2xl bg-black ${
        isTop ? 'cursor-grab active:cursor-grabbing hover:shadow-black/35' : 'pointer-events-none'
      }`}
    >
      {/* High-Resolution Editorial Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover pointer-events-none"
        loading={index <= 1 ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />

      {/* Subtle vignette scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Top Pill Tag on Card */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10 pointer-events-none">
        <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-white/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
          {product.rangeCategory}
        </span>
        <span className="text-[11px] font-nav uppercase tracking-[0.2em] text-monarch-gold-light font-semibold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full border border-monarch-gold/30">
          0{index + 1}
        </span>
      </div>

      {/* Bottom Info & Link on Active Card */}
      <div className="absolute bottom-5 inset-x-5 flex items-end justify-between z-10">
        <div className="space-y-1 pointer-events-none">
          <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-monarch-gold-light font-medium block">
            {product.badge}
          </span>
          <h4 className="font-serif text-lg sm:text-xl text-white font-medium leading-tight drop-shadow-md">
            {product.name}
          </h4>
          <span className="text-xs font-sans text-white/70 block">
            {product.formattedPrice}
          </span>
        </div>

        {/* View Product Direct Link */}
        <Link
          href={product.actionHref}
          onClick={(e) => e.stopPropagation()}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0"
          aria-label={`View ${product.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
