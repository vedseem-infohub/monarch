'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants, Transition } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TrendDeckProduct } from '@/data/latestTrends';

interface TrendDeckCardProps {
  product: TrendDeckProduct;
  index: number;
  direction: number;
  onSwipeNext: () => void;
  onSwipePrev: () => void;
}

const SYNCED_TRANSITION: Transition = {
  duration: 0.46,
  ease: [0.16, 1, 0.3, 1],
};

const cardVariants: Variants = {
  enter: (dir: number) => ({
    // Synchronized IN animation: sweeps in from the opposite side in perfect tandem with the OUT card
    zIndex: 20,
    x: dir >= 0 ? 200 : -200,
    y: 8,
    rotate: dir >= 0 ? 8 : -8,
    scale: 0.95,
    opacity: 0,
    transition: SYNCED_TRANSITION,
  }),
  center: {
    zIndex: 20,
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: SYNCED_TRANSITION,
  },
  exit: (dir: number) => ({
    // Synchronized OUT animation: glides away in tandem with identical velocity and duration
    zIndex: 10,
    x: dir >= 0 ? -200 : 200,
    y: -8,
    rotate: dir >= 0 ? -8 : 8,
    scale: 0.95,
    opacity: 0,
    transition: SYNCED_TRANSITION,
  }),
};

export const TrendDeckCard: React.FC<TrendDeckCardProps> = ({
  product,
  index,
  direction,
  onSwipeNext,
  onSwipePrev,
}) => {
  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }
  ) => {
    const swipeThreshold = 50;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      onSwipeNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      onSwipePrev();
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={cardVariants}
      initial="enter"
      animate="center"
      exit="exit"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      whileDrag={{ scale: 0.98 }}
      onDragEnd={handleDragEnd}
      onClick={onSwipeNext}
      className="absolute inset-0 select-none rounded-3xl overflow-hidden shadow-2xl bg-black cursor-grab active:cursor-grabbing hover:shadow-black/35"
    >
      {/* High-Resolution Editorial Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-full h-full object-cover pointer-events-none"
        loading="eager"
        decoding="async"
        draggable={false}
      />

      {/* Subtle vignette scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

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
          <h4 className="font-serif text-lg sm:text-xl text-white font-medium leading-tight drop-shadow-md line-clamp-1">
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
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 ml-2"
          aria-label={`View ${product.name}`}
        >
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};
