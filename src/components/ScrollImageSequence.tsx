'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * List of frame indices with 0.066s delay in their filename.
 * All other frames have delay-0.033s.jpg.
 */
const DELAY_66_INDICES = new Set([8, 93, 111, 140, 154]);

/**
 * Generate the complete sequence of 156 image paths from /public.
 */
const DEFAULT_FRAME_PATHS: string[] = Array.from({ length: 156 }, (_, i) => {
  const frameNum = i + 1;
  const padded = String(frameNum).padStart(3, '0');
  return `/optimized/frame_${padded}.webp`;
});

export interface ScrollImageSequenceProps {
  /** Optional custom frame paths (defaults to the 156 frames in /public) */
  framePaths?: string[];
  /**
   * Height of the outer scroll container (e.g. '400vh', '600vh').
   * This directly controls the duration and speed of the scroll animation.
   * Default: '400vh'
   */
  containerHeight?: string;
  /**
   * How the image fits within the canvas:
   * - 'cover': Fills the entire screen seamlessly, cropping symmetrically (Apple style).
   * - 'contain': Entire frame is visible with letterboxing if needed.
   * Default: 'cover'
   */
  fit?: 'cover' | 'contain';
  /** Optional title shown in the luxury loading indicator */
  loadingTitle?: string;
  /** Show subtle Apple-style contextual caption overlays */
  showCaptions?: boolean;
}

export default function ScrollImageSequence({
  framePaths = DEFAULT_FRAME_PATHS,
  containerHeight = '400vh',
  fit = 'cover',
  loadingTitle = 'Monarch Atelier Experience',
  showCaptions = true,
}: ScrollImageSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Loaded images stored in a ref to avoid expensive React re-renders during 60/120fps scrolling
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Keep track of the last drawn frame index to prevent duplicate canvas repaints
  const lastRenderedIndexRef = useRef<number>(-1);
  // requestAnimationFrame ID ref to batch draw calls to the screen refresh rate
  const rafIdRef = useRef<number | null>(null);

  // Component state
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

  /**
   * Draws a specific image frame onto the canvas.
   * Handles high DPI (Retina displays) and preserves aspect ratio via cover/contain.
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      const images = imagesRef.current;
      if (!canvas || images.length === 0) return;

      const img = images[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;

      // Calculate dimensions while preserving aspect ratio
      if (fit === 'cover') {
        if (canvasAspect > imgAspect) {
          // Canvas is wider than image
          renderWidth = canvasWidth;
          renderHeight = canvasWidth / imgAspect;
        } else {
          // Canvas is taller than image
          renderHeight = canvasHeight;
          renderWidth = canvasHeight * imgAspect;
        }
      } else {
        // 'contain'
        if (canvasAspect > imgAspect) {
          renderHeight = canvasHeight;
          renderWidth = canvasHeight * imgAspect;
        } else {
          renderWidth = canvasWidth;
          renderHeight = canvasWidth / imgAspect;
        }
      }

      // Center the image inside the canvas
      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
    },
    [fit]
  );

  /**
   * Updates canvas internal buffer resolution to match screen pixels and devicePixelRatio.
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use window dimensions for full-screen display
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for optimal GPU performance
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    // Only update buffer if size actually changed
    if (
      canvas.width !== Math.round(displayWidth * dpr) ||
      canvas.height !== Math.round(displayHeight * dpr)
    ) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);

      // Force redraw current frame after resize
      if (lastRenderedIndexRef.current >= 0) {
        drawFrame(lastRenderedIndexRef.current);
      }
    }
  }, [drawFrame]);

  /**
   * Calculates the target frame index based on the container's scroll position.
   *
   * =========================================================================
   * SCROLL-TO-FRAME MAPPING EXPLANATION & TUNING:
   * -------------------------------------------------------------------------
   * 1. rect.top is the distance from the top of the viewport to the container.
   * 2. When container top reaches viewport top (rect.top <= 0), animation starts.
   * 3. The container has height (e.g. 400vh). The canvas stays sticky inside it.
   * 4. Total scrollable travel distance = container.offsetHeight - window.innerHeight.
   * 5. Scrolled distance = -rect.top.
   * 6. progress = clamp(scrolledDistance / totalScrollableDistance, 0, 1).
   * 7. targetIndex = Math.floor(progress * totalFrames).
   *
   * HOW TO ADJUST ANIMATION SPEED:
   * - To SLOW DOWN: Increase `containerHeight` prop (e.g. from '400vh' to '600vh').
   *   More scroll distance means more wheel turns are needed to step through frames.
   * - To SPEED UP: Decrease `containerHeight` prop (e.g. from '400vh' to '250vh').
   * =========================================================================
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

    // Distance the user has scrolled into this container
    const scrolledDistance = -rect.top;

    // Normalized progress strictly clamped between 0.0 and 1.0
    const rawProgress = scrolledDistance / scrollableDistance;
    const progress = Math.min(1, Math.max(0, rawProgress));

    // Map [0, 1] progress to integer frame index [0, totalFrames - 1]
    const targetIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * totalFrames))
    );

    // ONLY REPAINT WHEN THE FRAME INDEX ACTUALLY CHANGES
    if (targetIndex !== lastRenderedIndexRef.current) {
      lastRenderedIndexRef.current = targetIndex;
      drawFrame(targetIndex);
      setActiveFrameIndex(targetIndex);
    }
  }, [isReducedMotion, drawFrame]);

  /**
   * Scroll event handler: Never redraws directly!
   * Debounces / batches calls using requestAnimationFrame to match display refresh rate.
   */
  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return; // rAF already scheduled

    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      updateFrameFromScroll();
    });
  }, [updateFrameFromScroll]);

  /**
   * PRELOADING LIFECYCLE:
   * - Checks prefers-reduced-motion: loads ONLY 1 static frame if active.
   * - Mobile optimization: if viewport < 768px, loads every second frame (50% memory/bandwidth).
   * - Preloads all target frames into HTMLImageElement instances.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check for prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = reducedMotionQuery.matches;
    setIsReducedMotion(prefersReduced);

    // Mobile check: viewport under 768px loads every 2nd frame
    const isMobile = window.innerWidth < 768;

    let targetUrls: string[];

    if (prefersReduced) {
      // Reduced motion: Load ONLY the first frame
      targetUrls = [framePaths[0]];
    } else if (isMobile) {
      // Mobile: Load every second frame (halves bandwidth & RAM usage)
      targetUrls = framePaths.filter((_, idx) => idx % 2 === 0);
    } else {
      // Desktop: Load all frames
      targetUrls = framePaths;
    }

    const totalToLoad = targetUrls.length;
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = new Array(totalToLoad);

    // Preload all frames asynchronously
    targetUrls.forEach((url, index) => {
      const img = new Image();
      img.src = url;

      const onImageLoaded = () => {
        loadedImages[index] = img;
        loadedCount += 1;
        setLoadingProgress(Math.round((loadedCount / totalToLoad) * 100));

        if (loadedCount === totalToLoad) {
          imagesRef.current = loadedImages;
          setIsLoaded(true);
        }
      };

      img.onload = onImageLoaded;
      img.onerror = () => {
        // Fallback gracefully if any single image encounters a network hitch
        console.warn(`[ScrollImageSequence] Failed to load frame: ${url}`);
        onImageLoaded();
      };
    });

    return () => {
      // Clean up references
      imagesRef.current = [];
    };
  }, [framePaths]);

  /**
   * Once images are loaded, initialize canvas dimensions and render the initial frame.
   */
  useEffect(() => {
    if (!isLoaded || imagesRef.current.length === 0) return;

    resizeCanvas();

    // Draw the initial frame (frame 0, or current scroll frame)
    if (isReducedMotion) {
      lastRenderedIndexRef.current = 0;
      drawFrame(0);
    } else {
      updateFrameFromScroll();
    }

    // Attach listeners
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
  }, [isLoaded, isReducedMotion, handleScroll, resizeCanvas, drawFrame, updateFrameFromScroll]);

  // Contextual captions that fade in at specific scroll milestones
  const progressRatio = imagesRef.current.length > 0 
    ? activeFrameIndex / (imagesRef.current.length - 1) 
    : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#1A0A0E] text-monarch-ivory"
      style={{ height: isReducedMotion ? '100vh' : containerHeight }}
    >
      {/* Sticky full-screen viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* HTML5 Canvas where frames are rendered */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-center"
          aria-label="Interactive scroll-driven luxury showroom walkthrough"
        />

        {/* Loading State Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#1A0A0E] px-6 text-center transition-opacity duration-700">
            {/* Monarch Brand Motif */}
            <div className="w-12 h-12 mb-6 rounded-full border border-monarch-gold/40 flex items-center justify-center">
              <div className="w-3 h-3 bg-monarch-gold rounded-full animate-ping" />
            </div>

            <p className="font-nav text-xs uppercase tracking-[0.3em] text-monarch-gold mb-2">
              {loadingTitle}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-monarch-ivory mb-6 font-light">
              Crafting The Experience
            </h3>

            {/* Progress Bar */}
            <div className="w-64 max-w-full h-1 bg-monarch-maroon-dark rounded-full overflow-hidden mb-3 border border-monarch-gold/20">
              <div
                className="h-full bg-gradient-to-r from-monarch-gold-dark via-monarch-gold to-monarch-gold-light transition-all duration-200 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-monarch-beige/70">
              <span>{loadingProgress}%</span>
              <span>·</span>
              <span>
                {Math.round((loadingProgress / 100) * framePaths.length)} / {framePaths.length} frames
              </span>
            </div>
          </div>
        )}

        {/* Ambient Vignette & Luxury Gradient Overlays */}
        {isLoaded && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0A0E]/80 via-transparent to-[#1A0A0E]/50" />
            <div className="pointer-events-none absolute inset-0 bg-radial-gradient" />
          </>
        )}

        {/* Apple-Style Text Overlays that smoothly transition as the user scrolls */}
        {isLoaded && showCaptions && !isReducedMotion && (
          <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-12 lg:p-16">
            {/* Top Bar Indicator */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-monarch-gold/30 text-[11px] font-nav uppercase tracking-[0.2em] text-monarch-gold-light">
                <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold animate-pulse" />
                <span>Monarch Flagship Haute Couture</span>
              </div>

              {/* Progress counter pill */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-monarch-gold/20 text-[11px] font-mono text-monarch-beige/80">
                <span>SCROLL TO EXPLORE</span>
                <span className="text-monarch-gold font-semibold">
                  {Math.round(progressRatio * 100)}%
                </span>
              </div>
            </div>

            {/* Dynamic Captions Based on Sequence Phase */}
            <div className="max-w-2xl">
              {/* Phase 1: 0% - 30% */}
              <div
                className={`transition-all duration-700 transform ${
                  progressRatio >= 0 && progressRatio < 0.35
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2">
                  Chapter I · The Threshold
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  Step Inside The Sanctuary
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 font-sans max-w-lg leading-relaxed">
                  Welcome to the flagship bridal salon. Where heritage weaving traditions meet royal bespoke couture.
                </p>
              </div>

              {/* Phase 2: 35% - 70% */}
              <div
                className={`transition-all duration-700 transform ${
                  progressRatio >= 0.35 && progressRatio < 0.75
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2">
                  Chapter II · The Vault
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  Woven In Gold & Silk
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 font-sans max-w-lg leading-relaxed">
                  Real zari brocades and hand-loomed mulberry silks, tailored over hundreds of hours by master karigars.
                </p>
              </div>

              {/* Phase 3: 75% - 100% */}
              <div
                className={`transition-all duration-700 transform ${
                  progressRatio >= 0.75
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none absolute'
                }`}
              >
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2">
                  Chapter III · The Climax
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-monarch-ivory tracking-tight mb-3">
                  The Royal Collection
                </h2>
                <p className="text-sm sm:text-base text-monarch-beige/90 font-sans max-w-lg leading-relaxed">
                  Every thread tells an eternal saga of Indian royalty, grace, and unmatched artisanal grandeur.
                </p>
              </div>
            </div>

            {/* Bottom Scroll Prompt */}
            <div className="flex items-center justify-between text-xs text-monarch-beige/60 pt-4">
              <span className="font-nav uppercase tracking-widest text-[10px]">
                {activeFrameIndex + 1} / {imagesRef.current.length} FRAMES
              </span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold/60" />
                <span className="tracking-wider">SCROLL DOWN TO ADVANCE</span>
              </div>
            </div>
          </div>
        )}

        {/* Reduced motion static notice */}
        {isReducedMotion && (
          <div className="absolute bottom-8 left-8 z-20 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-monarch-gold/30 text-xs text-monarch-gold-light">
            Static frame displayed (prefers-reduced-motion active)
          </div>
        )}
      </div>
    </div>
  );
}
