'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

/**
 * List of frame indices with 0.066s delay in their filename.
 * All other frames in /public have delay-0.033s.jpg.
 */
const DELAY_66_INDICES = new Set([8, 93, 111, 140, 154]);

function getFrameUrl(frameNum: number): string {
  const padded = String(frameNum).padStart(3, '0');
  return `/optimized/frame_${padded}.webp`;
}

function getFallbackJpgUrl(frameNum: number): string {
  const padded = String(frameNum).padStart(3, '0');
  const delay = DELAY_66_INDICES.has(frameNum) ? '0.066s' : '0.033s';
  return `/frame_${padded}_delay-${delay}.jpg`;
}

/**
 * Build sampled frames list:
 * - Desktop: step 3 (53 frames @ ~20KB each = ~1.05 MB total payload)
 * - Mobile: step 4 (40 frames @ ~20KB each = ~800 KB total payload)
 * Extremely fast loading, zero network lag.
 */
function buildSampledFrameUrls(isMobile: boolean, prefersReducedMotion: boolean): string[] {
  if (prefersReducedMotion) {
    return [getFrameUrl(1)];
  }

  const step = isMobile ? 4 : 3;
  const urls: string[] = [];

  for (let i = 1; i <= 156; i += step) {
    urls.push(getFrameUrl(i));
  }

  // Ensure last frame 156 is always present
  if (urls[urls.length - 1] !== getFrameUrl(156)) {
    urls.push(getFrameUrl(156));
  }

  return urls;
}

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images kept in ref to prevent expensive React re-renders during scrolling
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  // Only repaint when frame index actually changes
  const lastRenderedIndexRef = useRef<number>(-1);
  // requestAnimationFrame handle for batching render calls
  const rafIdRef = useRef<number | null>(null);

  // Direct DOM refs for live counters to avoid React state re-rendering on every scroll event
  const walkthroughPercentRef = useRef<HTMLSpanElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const backgroundProgressRef = useRef<HTMLDivElement>(null);
  const backgroundIndicatorRef = useRef<HTMLDivElement>(null);

  // Discrete phase state (0: Hero, 1: Chapter I, 2: Chapter II, 3: Chapter III)
  // Only triggers 4 React state updates across the entire 400vh scroll!
  const [activePhase, setActivePhase] = useState<number>(0);
  const currentPhaseRef = useRef<number>(0);

  // UI state
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);

  /**
   * Finds the closest already-loaded frame to avoid any render stuttering
   */
  const getNearestLoadedImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const images = imagesRef.current;
    if (images.length === 0) return null;

    if (images[targetIndex] && images[targetIndex]!.complete) {
      return images[targetIndex];
    }

    // Look backward for nearest loaded frame
    for (let i = targetIndex - 1; i >= 0; i--) {
      if (images[i] && images[i]!.complete) {
        return images[i];
      }
    }

    // Look forward if no prior frame is loaded
    for (let i = targetIndex + 1; i < images.length; i++) {
      if (images[i] && images[i]!.complete) {
        return images[i];
      }
    }

    return null;
  }, []);

  /**
   * Draws a specific frame to the canvas preserving aspect ratio (centered cover)
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const img = getNearestLoadedImage(index);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium'; // Fast and crisp on high-DPI displays

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;

      // Fullscreen 'cover' algorithm: fills canvas completely without distortion
      if (canvasAspect > imgAspect) {
        renderWidth = canvasWidth;
        renderHeight = canvasWidth / imgAspect;
      } else {
        renderHeight = canvasHeight;
        renderWidth = canvasHeight * imgAspect;
      }

      // Center image inside canvas
      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    },
    [getNearestLoadedImage]
  );

  /**
   * Updates canvas internal buffer resolution to match screen pixels and devicePixelRatio.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for GPU efficiency
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newWidth = Math.round(displayWidth * dpr);
    const newHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== newWidth || canvas.height !== newHeight) {
      canvas.width = newWidth;
      canvas.height = newHeight;

      if (lastRenderedIndexRef.current >= 0) {
        drawFrame(lastRenderedIndexRef.current);
      }
    }
  }, [drawFrame]);

  /**
   * High-performance scroll mapping:
   * - Computes progress and target frame index.
   * - Updates live counters via DOM refs (ZERO React re-renders!).
   * - Only updates React state when changing between the 4 major chapters.
   */
  const updateFrameFromScroll = useCallback(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    const totalFrames = imagesRef.current.length;
    if (!container || totalFrames === 0) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Total scroll travel available while canvas is pinned
    const scrollableDistance = rect.height - windowHeight;
    if (scrollableDistance <= 0) return;

    // Distance the user has scrolled into this hero section
    const scrolledDistance = -rect.top;

    // Normalized progress clamped between 0.0 and 1.0
    const rawProgress = scrolledDistance / scrollableDistance;
    const progress = Math.min(1, Math.max(0, rawProgress));

    // Determine discrete chapter phase
    let phase = 0;
    if (progress >= 0.78) {
      phase = 3;
    } else if (progress >= 0.52) {
      phase = 2;
    } else if (progress >= 0.22) {
      phase = 1;
    } else {
      phase = 0;
    }

    // Only trigger React state update when chapter changes
    if (phase !== currentPhaseRef.current) {
      currentPhaseRef.current = phase;
      setActivePhase(phase);
    }

    // Update real-time DOM elements directly without triggering React re-renders
    if (walkthroughPercentRef.current) {
      walkthroughPercentRef.current.textContent = `${Math.round(progress * 100)}%`;
    }

    // Map [0, 1] progress to integer frame index [0, totalFrames - 1]
    const targetIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * totalFrames))
    );

    if (frameCounterRef.current) {
      frameCounterRef.current.textContent = `${targetIndex + 1} / ${totalFrames} FRAMES`;
    }

    // ONLY REPAINT WHEN THE FRAME INDEX ACTUALLY CHANGES
    if (targetIndex !== lastRenderedIndexRef.current) {
      lastRenderedIndexRef.current = targetIndex;
      drawFrame(targetIndex);
    }
  }, [isReducedMotion, drawFrame]);

  /**
   * Scroll event handler: debounced via requestAnimationFrame
   */
  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateFrameFromScroll();
    });
  }, [updateFrameFromScroll]);

  /**
   * PROGRESSIVE STAGED PRELOADER:
   * 1. Loads Frame 0 immediately -> Hero is rendered and interactive in < 150ms!
   * 2. Background queue streams remaining sampled frames (4 concurrent at a time)
   *    so the network socket pool is never clogged.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReduced);

    const isMobile = window.innerWidth < 768;
    const targetUrls = buildSampledFrameUrls(isMobile, prefersReduced);
    const totalFrames = targetUrls.length;

    imagesRef.current = new Array(totalFrames).fill(null);

    let isCancelled = false;

    // STEP 1: Load First Frame Immediately
    const firstImg = new Image();
    firstImg.src = targetUrls[0];
    firstImg.onload = () => {
      if (isCancelled) return;
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);

      // Render first frame immediately
      lastRenderedIndexRef.current = 0;
      resizeCanvas();
      drawFrame(0);

      // If reduced motion, stop here (1 frame only)
      if (prefersReduced || totalFrames <= 1) return;

      // STEP 2: Concurrency-controlled background loader (10 concurrent at a time)
      // With ~20KB WebP files, 10 concurrent streams loads the whole sequence in < 1 second!
      const CONCURRENCY = 10;
      let currentIndex = 1;
      let loadedTotal = 1;

      const loadNext = () => {
        if (isCancelled || currentIndex >= totalFrames) return;

        const idx = currentIndex++;
        const img = new Image();
        img.src = targetUrls[idx];

        const onFinish = () => {
          if (isCancelled) return;
          imagesRef.current[idx] = img;
          loadedTotal++;

          // Update subtle background indicator in DOM
          const pct = Math.round((loadedTotal / totalFrames) * 100);
          if (backgroundProgressRef.current) {
            backgroundProgressRef.current.style.width = `${pct}%`;
          }
          if (pct >= 100 && backgroundIndicatorRef.current) {
            backgroundIndicatorRef.current.style.opacity = '0';
          }

          loadNext();
        };

        img.onload = onFinish;
        img.onerror = () => {
          // If webp fails for any reason, fallback to original jpg
          const fallback = new Image();
          const frameNum = idx * 3 + 1; // estimate original frame number
          fallback.src = getFallbackJpgUrl(Math.min(156, frameNum));
          fallback.onload = () => {
            img.src = fallback.src;
            onFinish();
          };
          fallback.onerror = onFinish;
        };
      };

      for (let c = 0; c < CONCURRENCY; c++) {
        loadNext();
      }
    };

    return () => {
      isCancelled = true;
      imagesRef.current = [];
    };
  }, [resizeCanvas, drawFrame]);

  /**
   * Listeners and initial paint once first frame is ready
   */
  useEffect(() => {
    if (!isFirstFrameLoaded) return;

    resizeCanvas();
    updateFrameFromScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isFirstFrameLoaded, handleScroll, resizeCanvas, updateFrameFromScroll]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#1A0A0E] text-monarch-ivory"
      style={{ height: isReducedMotion ? '100vh' : '400vh' }}
    >
      {/* Sticky full-screen hero viewport with hardware acceleration */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform">
        {/* Render canvas where frames are drawn via 2D context */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-center"
          aria-label="Monarch royal flagship boutique walkthrough animation"
        />

        {/* Lightweight Initial Ambient Placeholder (fades away in ~100ms) */}
        {!isFirstFrameLoaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#1A0A0E] text-center">
            <div className="w-12 h-12 mb-4 rounded-full border border-monarch-gold/40 flex items-center justify-center relative">
              <div className="w-3.5 h-3.5 bg-monarch-gold rounded-full animate-ping" />
            </div>
            <p className="font-nav text-xs uppercase tracking-[0.35em] text-monarch-gold">
              MONARCH ATELIER
            </p>
          </div>
        )}

        {/* Subtle Background Preload Progress Bar (non-blocking) */}
        <div
          ref={backgroundIndicatorRef}
          className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-1000 bg-black/20"
        >
          <div
            ref={backgroundProgressRef}
            className="h-full bg-gradient-to-r from-monarch-gold-dark to-monarch-gold transition-all duration-300"
            style={{ width: '5%' }}
          />
        </div>

        {/* Cinematic Vignette & Royal Lighting Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0A0E]/85 via-transparent to-[#1A0A0E]/60" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A0A0E]/60 via-transparent to-[#1A0A0E]/60" />

        {/* =========================================================================
            DYNAMIC HERO EDITORIAL OVERLAYS
            -------------------------------------------------------------------------
            State updates only on major chapter transitions (Phase 0, 1, 2, 3)
           ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
          {/* Top Navigation Cue / Brand Tag */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-monarch-gold/30 text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold-light">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold animate-pulse" />
              <span>Royal Haute Couture · Festive 2026</span>
            </div>

            {!isReducedMotion && (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-monarch-gold/20 text-xs font-mono text-monarch-beige/80">
                <span className="text-[10px] uppercase tracking-wider text-monarch-gold">Walkthrough</span>
                <span ref={walkthroughPercentRef}>0%</span>
              </div>
            )}
          </div>

          {/* Central Content Container */}
          <div className="max-w-3xl my-auto">
            {/* PHASE 0: Initial Hero Presentation (0% - 22% Scroll) */}
            <div
              className={`transition-all duration-700 transform ${
                activePhase === 0 || isReducedMotion
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-8 pointer-events-none absolute'
              }`}
            >
              <div className="space-y-4">
                <span className="block font-nav text-xs sm:text-sm tracking-[0.35em] uppercase text-monarch-gold">
                  Heritage Reimagined
                </span>

                <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-monarch-ivory leading-[1.05]">
                  A LEGACY <br />
                  <span className="font-serif italic font-light text-monarch-gold-light">
                    WOVEN IN
                  </span>{' '}
                  ELEGANCE
                </h1>

                <p className="text-sm sm:text-base text-monarch-beige/90 max-w-xl font-sans leading-relaxed">
                  Step inside the flagship bridal sanctum. Where centuries of hand-spun raw mulberry silks, authentic Kashi zari brocades, and imperial Awadhi tailoring meet digital couture.
                </p>

                {/* Primary Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Link
                    href="/collections/all"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/60 font-nav text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-monarch-gold/20 group pointer-events-auto"
                  >
                    <span>EXPLORE THE COLLECTION</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/our-craft"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/40 hover:bg-monarch-gold/15 text-monarch-gold hover:text-monarch-ivory border border-monarch-gold/40 font-nav text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 backdrop-blur-md pointer-events-auto"
                  >
                    <span>DISCOVER OUR CRAFT</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* PHASE 1: Chapter I - The Sanctuary Threshold (22% - 52% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 1
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono">
                  Chapter I · The Sanctuary
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  Step Into The Atelier
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 max-w-lg leading-relaxed">
                  The grand doors open to reveal an exclusive archive of royal Indian occasionwear, curating generational bridal couture for the discerning connoisseur.
                </p>
              </div>
            )}

            {/* PHASE 2: Chapter II - Imperial Karigari (52% - 78% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 2
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono">
                  Chapter II · Imperial Karigari
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  Woven In Pure Zari &amp; Silk
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 max-w-lg leading-relaxed">
                  Certified 24-karat gold wefts interlaced across hand-loomed mulberry silks. Over 400 continuous artisan hours dedicated to every single masterwork.
                </p>
              </div>
            )}

            {/* PHASE 3: Chapter III - The Royal Edit (78% - 100% Scroll) */}
            {!isReducedMotion && (
              <div
                className={`transition-all duration-700 transform ${
                  activePhase === 3
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-6 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono">
                  Chapter III · The Royal Edit
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  The Archival Ensembles
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 max-w-lg leading-relaxed mb-5">
                  From bespoke crimson velvet bridal lehengas to hand-embroidered raw silk sherwanis, discover the crown jewels of Indian ceremonial couture.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/wedding"
                    className="px-6 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/60 font-nav text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-lg pointer-events-auto"
                  >
                    <span>SHOP BRIDAL SUITE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
                  </Link>

                  <Link
                    href="/men"
                    className="px-6 py-3 rounded-full bg-black/40 hover:bg-monarch-gold/15 text-monarch-gold hover:text-monarch-ivory border border-monarch-gold/40 font-nav text-xs uppercase tracking-[0.2em] flex items-center transition-all backdrop-blur-md pointer-events-auto"
                  >
                    <span>VIEW SHERWANIS</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer Cue */}
          <div className="flex items-center justify-between text-xs text-monarch-beige/70 pt-4 pointer-events-auto">
            <span
              ref={frameCounterRef}
              className="font-nav uppercase tracking-widest text-[10px] text-monarch-gold/80"
            >
              1 / {isReducedMotion ? 1 : 79} FRAMES
            </span>

            {!isReducedMotion && (
              <div className="flex items-center gap-2 text-monarch-gold/80 text-[10px] font-nav uppercase tracking-[0.25em]">
                <span>SCROLL DOWN TO ADVANCE</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-monarch-gold" />
              </div>
            )}
          </div>
        </div>

        {/* Accessibility badge when reduced motion is on */}
        {isReducedMotion && (
          <div className="absolute bottom-8 left-8 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-monarch-gold/30 text-xs text-monarch-gold-light">
            Static view (prefers-reduced-motion active)
          </div>
        )}
      </div>
    </section>
  );
};
