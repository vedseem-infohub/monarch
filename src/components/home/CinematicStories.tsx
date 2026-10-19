'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { CINEMATIC_STORIES, CinematicStoryProduct } from '@/data/cinematicStories';
import { StoryFloatingCard } from './StoryFloatingCard';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  Heart,
  ArrowRight,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ============================================================================
 * COMPONENT: CinematicStories (Pinned Full-Screen Storyboard)
 * ============================================================================
 * Features:
 * - GSAP ScrollTrigger pinning: Locks the section at top of viewport so the visitor
 *   stops to view the immersive full-screen cinematic stories.
 * - Scroll scrub: Smoothly steps through the 4 stories as the user scrolls.
 * - Slow left-to-right cross-fade: New image glides in from left, old image exits to right.
 * - Two-phase floating preview cards (compact docked vs. expanded active).
 * - Direct card selection, chevron navigation, keyboard arrows, and Add to Cart.
 * - Direct Wishlist integration (useWishlist toggle & status).
 * - Slide-over Ensemble Exploration Drawer with craftsmanship specs & product link.
 * ============================================================================
 */

export const CinematicStories: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const isManualNavRef = useRef(false);

  // [pageIndex, direction]: 1 = forward (left-to-right), -1 = backward
  const [[page, direction], setPage] = useState([0, 1]);
  const [addedToast, setAddedToast] = useState(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);
  const [isExploreOpen, setIsExploreOpen] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const activeIndex = page;
  const activeStory: CinematicStoryProduct =
    CINEMATIC_STORIES[activeIndex] || CINEMATIC_STORIES[0];

  const isWished = isInWishlist(activeStory.id);

  useEffect(() => {
    activeIndexRef.current = page;
  }, [page]);

  const paginate = useCallback(
    (newDirection: number) => {
      isManualNavRef.current = true;
      const nextIdx =
        (page + newDirection + CINEMATIC_STORIES.length) % CINEMATIC_STORIES.length;
      setPage([nextIdx, newDirection]);
      setTimeout(() => {
        isManualNavRef.current = false;
      }, 800);
    },
    [page]
  );

  const handlePrev = useCallback(() => paginate(-1), [paginate]);
  const handleNext = useCallback(() => paginate(1), [paginate]);

  const selectStory = (idx: number) => {
    if (idx === page) return;
    isManualNavRef.current = true;
    const dir = idx > page ? 1 : -1;
    setPage([idx, dir]);
    setTimeout(() => {
      isManualNavRef.current = false;
    }, 800);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  const handleAddToCart = () => {
    addToCart(activeStory, activeStory.colors[0]?.name || 'Standard', 'M', 1);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2400);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(activeStory.id);
    const willBeWished = !isWished;
    setWishlistToast(
      willBeWished
        ? `${activeStory.name} saved to wishlist.`
        : `${activeStory.name} removed from wishlist.`
    );
    setTimeout(() => setWishlistToast(null), 2400);
  };

  // ==========================================================================
  // GSAP SCROLLTRIGGER PIN: Section stops at top so visitor pauses & views
  // ==========================================================================
  useGSAP(
    () => {
      if (typeof window === 'undefined') return;
      const pinWrapper = pinWrapperRef.current;
      if (!pinWrapper) return;

      const totalStories = CINEMATIC_STORIES.length;
      const scrollDistance = window.innerWidth < 768 ? 1200 : 1800;

      const st = ScrollTrigger.create({
        trigger: pinWrapper,
        pin: true,
        start: 'top top',
        end: `+=${scrollDistance}`,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (isManualNavRef.current) return;
          // Progress is 0..1 over the pinned scroll duration
          const rawIndex = Math.min(
            totalStories - 1,
            Math.floor(self.progress * totalStories)
          );
          if (rawIndex !== activeIndexRef.current) {
            const dir = rawIndex > activeIndexRef.current ? 1 : -1;
            activeIndexRef.current = rawIndex;
            setPage([rawIndex, dir]);
          }
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: sectionRef }
  );

  // Cinematic slow left-to-right slide variants with old image exit
  const imageVariants: Variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '-35%' : '35%',
      opacity: 0,
      scale: 1.05,
    }),
    center: {
      x: '0%',
      opacity: 1,
      scale: 1.0,
      transition: {
        x: { duration: 1.25, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 1.15, ease: [0.16, 1, 0.3, 1] as const },
        scale: { duration: 1.45, ease: [0.16, 1, 0.3, 1] as const },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '35%' : '-35%',
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { duration: 1.25, ease: [0.16, 1, 0.3, 1] as const },
        opacity: { duration: 1.0, ease: 'easeOut' },
        scale: { duration: 1.25, ease: 'easeOut' },
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      id="cinematic-stories"
      className="relative w-full bg-black text-white select-none"
    >
      {/* ============================================================ */}
      {/* PINNED FULL-SCREEN VIEWPORT CONTAINER (STOPS AT TOP)         */}
      {/* ============================================================ */}
      <div
        ref={pinWrapperRef}
        className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-[92px] sm:pt-[100px] lg:pt-[108px] pb-6 sm:pb-8 px-6 sm:px-10 lg:px-16"
      >
      {/* ============================================================ */}
      {/* FULL-SCREEN CINEMATIC BACKDROP: SLOW LEFT-TO-RIGHT WITH EXIT */}
      {/* ============================================================ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            key={activeStory.id}
            src={activeStory.bgImage}
            alt={activeStory.name}
            custom={direction}
            variants={imageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          />
        </AnimatePresence>

        {/* Minimalist Atmospheric Scrim: Soft & Airy, not gloomy */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* TOP HEADER: MINIMALIST, CLEAN & FLOATING                     */}
      {/* ============================================================ */}
      <div className="relative z-10 flex items-center justify-between gap-4 pt-2">
        {/* Subtle Category Label */}
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
          MOMENTS IN SILK
        </span>

        {/* Centered Editorial Pill (Matching Screenshot Top Center "DAILY") */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-white/90 font-medium">
            {activeStory.storyCategoryTag}
          </span>
        </div>

        {/* Minimal Story Counter & Clean Arrow Navigation */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-widest text-monarch-gold-light">
            0{activeIndex + 1} <span className="text-white/35">/ 0{CINEMATIC_STORIES.length}</span>
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              className="w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="w-7 h-7 rounded-full text-white/70 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* MIDDLE ROW: EDITORIAL TITLE (LEFT) & ADD TO CART (RIGHT)     */}
      {/* ============================================================ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end my-auto py-6">
        {/* LEFT COLUMN: Pure Monumental Typography (Minimalist, No Clutter) */}
        <div className="lg:col-span-7 flex flex-col justify-end space-y-2">
          {/* Monumental Stacked Serif Headline (Matches Screenshot "First Light") */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={activeStory.id + '-title'}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white leading-[0.92] tracking-tight drop-shadow-lg"
            >
              <span className="block">{activeStory.storyTitleLine1}</span>
              <span className="block italic text-white/95">{activeStory.storyTitleLine2}</span>
            </motion.h2>
          </AnimatePresence>

          {/* Subtitle / Vault Tag Directly Below (Matches Screenshot) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStory.id + '-subtitle'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="pt-1"
            >
              <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/80 font-medium">
                {activeStory.storySubtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT COLUMN: Price, Wishlist, Add to Cart & Explore */}
        <div className="lg:col-span-5 flex flex-col lg:items-end justify-end space-y-3">
          <div className="flex items-center lg:flex-col lg:items-end gap-3 sm:gap-4">
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-white drop-shadow-md">
              {activeStory.formattedPrice}
            </span>

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Minimalist ADD TO CART Pill */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-white text-[11px] font-mono uppercase tracking-[0.2em] font-semibold shadow-xl transition-all hover:scale-105 active:scale-95 border border-white/15 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>ADD TO CART</span>
              </button>

              {/* WISHLIST Toggle Button */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                  isWished
                    ? 'bg-monarch-maroon text-monarch-gold-light border-monarch-gold/60 shadow-lg'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
                }`}
                aria-label={isWished ? 'Remove from Wishlist' : 'Add to Wishlist'}
                title={isWished ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isWished ? 'fill-current text-monarch-gold-light scale-110' : 'text-white'
                  }`}
                />
              </button>

              {/* EXPLORE ENSEMBLE Button */}
              <button
                type="button"
                onClick={() => setIsExploreOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-mono uppercase tracking-[0.18em] font-medium backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Toast Notifications */}
          <div className="space-y-1.5 flex flex-col lg:items-end">
            {addedToast && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-200 text-xs backdrop-blur-md">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  <strong>{activeStory.name}</strong> added to cart.
                </span>
              </div>
            )}
            {wishlistToast && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-monarch-maroon/95 border border-monarch-gold/40 text-monarch-gold-light text-xs backdrop-blur-md">
                <Heart className="w-3.5 h-3.5 fill-current text-monarch-gold-light" />
                <span>{wishlistToast}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* BOTTOM ROW: FLOATING TWO-PHASE PREVIEW CARDS DOCK            */}
      {/* ============================================================ */}
      <div className="relative z-10 pt-2 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        {/* Left Story Progress (Matches Screenshot Bottom Left) */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs tracking-wider text-monarch-gold-light font-bold">
            0{activeIndex + 1}
          </span>
          <div className="w-12 h-px bg-white/25 overflow-hidden">
            <motion.div
              className="h-full bg-monarch-gold-light"
              animate={{ width: `${((activeIndex + 1) / CINEMATIC_STORIES.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        {/* Floating Cards & Credit Column */}
        <div className="flex flex-col items-end gap-2">
          {/* Floating Cards Horizontal Strip */}
          <div className="flex items-end gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1 max-w-full">
            {CINEMATIC_STORIES.map((story, idx) => (
              <StoryFloatingCard
                key={story.id}
                story={story}
                index={idx}
                isActive={activeIndex === idx}
                onSelect={() => selectStory(idx)}
              />
            ))}
          </div>

          {/* Bottom Right Credit (Matches Screenshot Bottom Right) */}
          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40 text-right pr-1">
            PROD. 2026/04 · HEIRLOOM KASHI PITLOOM SILK CO.
          </div>
        </div>
      </div>
      </div>

      {/* ============================================================ */}
      {/* SLIDE-OVER ENSEMBLE EXPLORATION DRAWER                       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isExploreOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop Scrim */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsExploreOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
            />

            {/* Slide-Over Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-w-md h-full bg-[#181313] text-white border-l border-white/15 shadow-[0_0_50px_rgba(0,0,0,0.85)] overflow-y-auto flex flex-col p-6 sm:p-8 z-10 select-text"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-monarch-gold-light font-semibold">
                  {activeStory.storyCategoryTag} · MOMENTS IN SILK
                </span>
                <button
                  type="button"
                  onClick={() => setIsExploreOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Ensemble Hero Image */}
              <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden mt-6 border border-white/10 shadow-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeStory.bgImage}
                  alt={activeStory.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-monarch-gold-light uppercase tracking-wider">
                  {activeStory.storySubtitle}
                </div>
              </div>

              {/* Title, Tagline & Price */}
              <div className="mt-5 space-y-1">
                <h3 className="font-serif text-2xl font-normal text-white">
                  {activeStory.name}
                </h3>
                <p className="font-sans text-xs text-white/60">
                  {activeStory.tagline}
                </p>
                <div className="pt-2">
                  <span className="font-serif text-2xl font-bold text-white">
                    {activeStory.formattedPrice}
                  </span>
                  <span className="text-[11px] text-white/50 ml-2 font-sans">
                    (MRP incl. all taxes)
                  </span>
                </div>
              </div>

              {/* Story Narrative */}
              <p className="mt-4 text-xs font-sans text-white/80 leading-relaxed border-t border-white/10 pt-4">
                {activeStory.description}
              </p>

              {/* Craftsmanship Specifications Grid */}
              <div className="mt-5 grid grid-cols-1 gap-3 bg-white/5 p-4 rounded-xl border border-white/10 text-xs font-sans">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-monarch-gold-light shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
                      Fabric & Weave
                    </span>
                    <span className="text-white/95">{activeStory.fabric}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-monarch-gold-light shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
                      Authentic Embroidery
                    </span>
                    <span className="text-white/95">{activeStory.embroidery}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-monarch-gold-light shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block">
                      Craftsmanship Heritage
                    </span>
                    <span className="text-white/90 text-[11px] leading-relaxed">
                      {activeStory.craftsmanshipStory}
                    </span>
                  </div>
                </div>
              </div>

              {/* Occasions */}
              <div className="mt-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 block mb-1.5">
                  Recommended For
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStory.occasion.map((occ) => (
                    <span
                      key={occ}
                      className="px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] font-sans text-white/80 border border-white/10"
                    >
                      {occ}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons in Drawer */}
              <div className="mt-auto pt-6 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart();
                      setIsExploreOpen(false);
                    }}
                    className="flex-1 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-white text-xs font-mono uppercase tracking-[0.2em] font-semibold transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleWishlist}
                    className={`w-11 h-11 rounded-full flex items-center justify-center border transition-all ${
                      isWished
                        ? 'bg-monarch-maroon text-monarch-gold-light border-monarch-gold/60'
                        : 'bg-white/10 text-white border-white/20'
                    }`}
                    aria-label="Wishlist toggle"
                  >
                    <Heart className={`w-4 h-4 ${isWished ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${activeStory.slug || activeStory.id}`}
                  className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-xs font-mono uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 border border-white/20"
                >
                  <span>VIEW FULL PRODUCT DETAILS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
