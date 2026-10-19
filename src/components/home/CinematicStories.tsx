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
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Check,
  Heart,
  ArrowRight,
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
  const stRef = useRef<ScrollTrigger | null>(null);

  const { lenis } = useSmoothScroll();

  // [pageIndex, direction]: 1 = forward (left-to-right), -1 = backward
  const [[page, direction], setPage] = useState([0, 1]);
  const [addedToast, setAddedToast] = useState(false);
  const [wishlistToast, setWishlistToast] = useState<string | null>(null);

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
      activeIndexRef.current = nextIdx;
      setPage([nextIdx, newDirection]);

      if (stRef.current) {
        const st = stRef.current;
        const totalStories = CINEMATIC_STORIES.length;
        const scrollDistance = window.innerWidth < 768 ? 1200 : 1800;
        const targetScroll = st.start + (nextIdx / Math.max(1, totalStories - 1)) * scrollDistance;
        if (lenis) {
          lenis.scrollTo(targetScroll, { duration: 0.5 });
        } else {
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      }

      setTimeout(() => {
        isManualNavRef.current = false;
      }, 700);
    },
    [page, lenis]
  );

  const handlePrev = useCallback(() => paginate(-1), [paginate]);
  const handleNext = useCallback(() => paginate(1), [paginate]);

  const selectStory = (idx: number) => {
    if (idx === activeIndexRef.current) return;
    isManualNavRef.current = true;
    const dir = idx > activeIndexRef.current ? 1 : -1;
    activeIndexRef.current = idx;
    setPage([idx, dir]);

    if (stRef.current) {
      const st = stRef.current;
      const totalStories = CINEMATIC_STORIES.length;
      const scrollDistance = window.innerWidth < 768 ? 1200 : 1800;
      const targetScroll = st.start + (idx / Math.max(1, totalStories - 1)) * scrollDistance;
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 0.5 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      }
    }

    setTimeout(() => {
      isManualNavRef.current = false;
    }, 700);
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
  // Mounts strictly once with dependencies: [] to prevent destructive pin kills
  // and scroll position shifting during state updates.
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

      stRef.current = st;

      return () => {
        st.kill();
        stRef.current = null;
      };
    },
    { scope: sectionRef, dependencies: [] }
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

              {/* EXPLORE ENSEMBLE: Direct Link to Full Product Detailing */}
              <Link
                href={`/product/${activeStory.slug || activeStory.id}`}
                className="group inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black text-[10px] font-mono uppercase tracking-[0.18em] font-medium backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
                title={`View full detailing for ${activeStory.name}`}
              >
                <span>EXPLORE</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </Link>
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
    </section>
  );
};
