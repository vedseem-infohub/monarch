'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';

const TOTAL_FRAMES = 79;

/**
 * Array of paths to the 79 optimized webp frames
 */
const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const padded = String(i + 1).padStart(3, '0');
  return `/hero-frames/frame_${padded}.webp`;
});

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Loaded frames cache (ImageBitmap where supported or HTMLImageElement)
  const framesCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);

  // HUD DOM refs for direct, zero-react-overhead updates during scroll
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const activeChapterLabelRef = useRef<HTMLSpanElement>(null);

  // LERP damping state
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Mouse micro-parallax state (Desktop only)
  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseCurrentRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mouseRafIdRef = useRef<number | null>(null);

  // Discrete phase state for 4 chapters:
  // 0: Prologue (0% - 22%)
  // 1: Chapter I (22% - 52%)
  // 2: Chapter II (52% - 78%)
  // 3: Chapter III (78% - 100%)
  const [activePhase, setActivePhase] = useState<number>(0);
  const currentPhaseRef = useRef<number>(0);

  // Component state
  const [isFirstFrameReady, setIsFirstFrameReady] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isMobileDevice, setIsMobileDevice] = useState<boolean>(false);

  // Detect environment & motion preferences
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const updateMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    updateMobile();

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    motionQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('resize', updateMobile, { passive: true });

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', updateMobile);
    };
  }, []);

  /**
   * Finds the nearest loaded frame to guarantee zero flicker if scrolling ahead of preload
   */
  const getNearestLoadedFrame = useCallback(
    (targetIndex: number): ImageBitmap | HTMLImageElement | null => {
      const frames = framesCacheRef.current;
      if (frames.length === 0) return null;

      if (frames[targetIndex]) return frames[targetIndex];

      for (let i = targetIndex - 1; i >= 0; i--) {
        if (frames[i]) return frames[i];
      }
      for (let i = targetIndex + 1; i < frames.length; i++) {
        if (frames[i]) return frames[i];
      }
      return null;
    },
    []
  );

  /**
   * Draws a specific frame to the canvas preserving cover aspect ratio
   */
  const drawFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const frame = getNearestLoadedFrame(index);
      if (!frame) return;

      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
      const imgHeight = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;

      // Fullscreen cover algorithm
      if (canvasAspect > imgAspect) {
        renderWidth = canvasWidth;
        renderHeight = canvasWidth / imgAspect;
      } else {
        renderHeight = canvasHeight;
        renderWidth = canvasHeight * imgAspect;
      }

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.drawImage(frame, offsetX, offsetY, renderWidth, renderHeight);
      lastRenderedIndexRef.current = index;
    },
    [getNearestLoadedFrame]
  );

  /**
   * Resizes canvas to match device pixel ratio for crystal clear rendering
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newW = Math.round(displayWidth * dpr);
    const newH = Math.round(displayHeight * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
    }

    if (lastRenderedIndexRef.current >= 0) {
      drawFrame(lastRenderedIndexRef.current);
    }
  }, [drawFrame]);

  /**
   * Preload 79 frames with off-thread ImageBitmap decoding and immediate first frame
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isCancelled = false;
    framesCacheRef.current = new Array(TOTAL_FRAMES).fill(null);

    const loadSingleFrame = async (
      index: number,
      priority: 'high' | 'auto' = 'auto'
    ): Promise<void> => {
      if (isCancelled || framesCacheRef.current[index]) return;

      const url = FRAME_PATHS[index];

      // Try off-thread ImageBitmap decoding if available for 0 jank
      if ('createImageBitmap' in window) {
        try {
          const res = await fetch(url, { priority });
          if (!res.ok) throw new Error('Fetch failed');
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          if (!isCancelled) {
            framesCacheRef.current[index] = bitmap;
            if (index === 0) {
              setIsFirstFrameReady(true);
              resizeCanvas();
              drawFrame(0);
            }
          }
          return;
        } catch {
          // Fall back to standard Image decoding
        }
      }

      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          if (!isCancelled) {
            framesCacheRef.current[index] = img;
            if (index === 0) {
              setIsFirstFrameReady(true);
              resizeCanvas();
              drawFrame(0);
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    // 1. Instantly load first frame
    loadSingleFrame(0, 'high').then(() => {
      if (isCancelled) return;

      // 2. Preload remaining frames in concurrent batches of 8
      let nextIndex = 1;
      const concurrency = 8;

      const worker = async () => {
        while (nextIndex < TOTAL_FRAMES && !isCancelled) {
          const idx = nextIndex++;
          await loadSingleFrame(idx, 'auto');
        }
      };

      for (let i = 0; i < concurrency; i++) {
        worker();
      }
    });

    return () => {
      isCancelled = true;
    };
  }, [resizeCanvas, drawFrame]);

  /**
   * Window resize handler
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [resizeCanvas]);

  /**
   * Silky LERP Animation Loop:
   * Smoothly interpolates towards targetFrame and paints only when frame changes
   */
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion) return;

    const tick = () => {
      const target = targetFrameRef.current;
      const current = currentFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        // 0.2 factor gives silky deceleration perfectly matched to Lenis smooth scroll
        currentFrameRef.current += diff * 0.2;
      } else {
        currentFrameRef.current = target;
      }

      const clampedIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(currentFrameRef.current))
      );

      if (clampedIndex !== lastRenderedIndexRef.current) {
        drawFrame(clampedIndex);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isReducedMotion, drawFrame]);

  /**
   * Scroll listener synchronized with Lenis and window scroll
   */
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / maxScroll));

      // 1. Update Target Frame Index (0 to 78)
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

      // 2. Direct DOM Updates for Zero-Lag HUD
      const pct = Math.round(progress * 100);
      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${pct}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Display 1-based frame counter (1 / 79 FRAMES)
      const displayFrame = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = `${displayFrame} / ${TOTAL_FRAMES} FRAMES`;
      }

      // Active Chapter Label
      if (activeChapterLabelRef.current) {
        if (progress < 0.22) {
          activeChapterLabelRef.current.textContent = 'PROLOGUE';
        } else if (progress < 0.52) {
          activeChapterLabelRef.current.textContent = 'CHAPTER I';
        } else if (progress < 0.78) {
          activeChapterLabelRef.current.textContent = 'CHAPTER II';
        } else {
          activeChapterLabelRef.current.textContent = 'CHAPTER III';
        }
      }

      // 3. Discrete Phase Updates for Chapter Narrative
      let nextPhase = 0;
      if (progress >= 0.78) {
        nextPhase = 3;
      } else if (progress >= 0.52) {
        nextPhase = 2;
      } else if (progress >= 0.22) {
        nextPhase = 1;
      }

      if (currentPhaseRef.current !== nextPhase) {
        currentPhaseRef.current = nextPhase;
        setActivePhase(nextPhase);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReducedMotion]);

  /**
   * Cursor Micro-Parallax on Editorial Content (Desktop only)
   */
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion || isMobileDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 16;
      const ny = (e.clientY / window.innerHeight - 0.5) * 12;
      mouseTargetRef.current = { x: nx, y: ny };

      if (!mouseRafIdRef.current) {
        const tick = () => {
          const target = mouseTargetRef.current;
          const current = mouseCurrentRef.current;

          current.x += (target.x - current.x) * 0.08;
          current.y += (target.y - current.y) * 0.08;

          if (textContainerRef.current) {
            textContainerRef.current.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;
          }

          if (Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05) {
            mouseRafIdRef.current = requestAnimationFrame(tick);
          } else {
            mouseRafIdRef.current = null;
          }
        };
        mouseRafIdRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mouseRafIdRef.current) cancelAnimationFrame(mouseRafIdRef.current);
    };
  }, [isReducedMotion, isMobileDevice]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#1A0A0E] text-monarch-ivory"
      style={{ height: isReducedMotion ? '100vh' : '400vh' }}
    >
      {/* 100vh Sticky Viewport Stage with Hardware Acceleration */}
      <div
        ref={stickyStageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform"
      >
        {/* =========================================================================
            LAYER 0: HIGH-PERFORMANCE 2D CANVAS SCROLL IMAGE SEQUENCE (79 FRAMES)
            ========================================================================= */}
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-center will-change-transform"
          aria-label="Monarch royal flagship boutique walkthrough animation"
        />

        {/* Ambient Loader / First Frame Placeholder */}
        {!isFirstFrameReady && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#1A0A0E] text-center transition-opacity duration-700">
            <div className="w-12 h-12 mb-4 rounded-full border border-monarch-gold/40 flex items-center justify-center relative">
              <div className="w-3.5 h-3.5 bg-monarch-gold rounded-full animate-ping" />
            </div>
            <p className="font-nav text-xs uppercase tracking-[0.35em] text-monarch-gold">
              MONARCH ATELIER
            </p>
          </div>
        )}

        {/* =========================================================================
            LAYER 1: TOP GOLD PROGRESS BAR (Identical to monarch-beta-two.vercel.app)
            ========================================================================= */}
        {!isReducedMotion && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-1000 bg-black/20">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-monarch-gold-dark to-monarch-gold transition-all duration-300"
              style={{ width: '0%' }}
            />
          </div>
        )}

        {/* =========================================================================
            LAYER 2: CINEMATIC VIGNETTE & DIRECTIONAL SCRIMS
            ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1A0A0E]/85 via-transparent to-[#1A0A0E]/60 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#1A0A0E]/60 via-transparent to-[#1A0A0E]/60 z-10" />

        {/* Peripheral radial shading for royal boutique atmosphere */}
        <div
          className="pointer-events-none absolute inset-0 z-11 opacity-70"
          style={{
            background:
              'radial-gradient(circle at center, transparent 38%, rgba(26, 10, 14, 0.6) 80%, rgba(20, 6, 10, 0.95) 100%)',
          }}
        />

        {/* =========================================================================
            LAYER 3: HUD & EDITORIAL OVERLAYS (Identical to monarch-beta-two.vercel.app)
            ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-26 lg:pt-28 px-6 sm:px-12 lg:px-16 pb-6 sm:pb-8 lg:pb-10">
          {/* Top Row: Pill Badge and Walkthrough HUD */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-monarch-gold/30 text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold-light shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold animate-pulse" />
              <span>Royal Haute Couture · Festive 2026</span>
            </div>

            {!isReducedMotion && (
              <div className="flex items-center gap-2">
                {/* Active Chapter Label */}
                <div className="hidden md:inline-flex items-center px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-monarch-gold/20 text-[10px] font-mono text-monarch-gold tracking-widest uppercase">
                  <span ref={activeChapterLabelRef}>PROLOGUE</span>
                </div>

                {/* Walkthrough Counter */}
                <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-monarch-gold/20 text-xs font-mono text-monarch-beige/80">
                  <span className="text-[10px] uppercase tracking-wider text-monarch-gold">
                    Walkthrough
                  </span>
                  <span ref={percentTextRef} className="font-medium text-monarch-gold-light">
                    0%
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Central Editorial Narrative Area with Desktop Micro-Parallax */}
          <div
            ref={textContainerRef}
            className="max-w-3xl my-auto relative min-h-[320px] flex items-center will-change-transform"
          >
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
                  Step inside the flagship bridal sanctum. Where centuries of hand-spun raw mulberry
                  silks, authentic Kashi zari brocades, and imperial Awadhi tailoring meet digital
                  couture.
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
                  The grand doors open to reveal an exclusive archive of royal Indian occasionwear,
                  curating generational bridal couture for the discerning connoisseur.
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
                  Certified 24-karat gold wefts interlaced across hand-loomed mulberry silks. Over 400
                  continuous artisan hours dedicated to every single masterwork.
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
                  From bespoke crimson velvet bridal lehengas to hand-embroidered raw silk sherwanis,
                  discover the crown jewels of Indian ceremonial couture.
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

          {/* Bottom Footer HUD Cue (Identical to monarch-beta-two.vercel.app) */}
          <div className="flex items-center justify-between text-xs text-monarch-beige/70 pt-4 pointer-events-auto">
            <span
              ref={frameCounterRef}
              className="font-nav uppercase tracking-widest text-[10px] text-monarch-gold/80"
            >
              1 / {TOTAL_FRAMES} FRAMES
            </span>

            {!isReducedMotion && (
              <div className="flex items-center gap-2 text-monarch-gold/80 text-[10px] font-nav uppercase tracking-[0.25em]">
                <span>SCROLL DOWN TO ADVANCE</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-monarch-gold" />
              </div>
            )}
          </div>
        </div>

        {/* Accessibility badge for Reduced Motion Mode */}
        {isReducedMotion && (
          <div className="absolute bottom-8 left-8 z-30 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-monarch-gold/30 text-xs text-monarch-gold-light">
            Static view (prefers-reduced-motion active)
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
