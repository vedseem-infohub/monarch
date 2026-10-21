'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import { HERO_CONFIG, HERO_FRAME_PATHS } from '@/data/hero';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Access global Lenis smooth scroll instance
  const { lenis } = useSmoothScroll();

  // Loaded frames cache (ImageBitmap where supported or HTMLImageElement)
  const framesCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);

  // HUD DOM refs for direct, zero-react-overhead updates during scroll
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const activeChapterLabelRef = useRef<HTMLSpanElement>(null);

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

  // Environment and preference states
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
   * Draws a specific frame to the canvas preserving cover aspect ratio with 100% clean, crisp pixels.
   * Renders strictly a single frame at globalAlpha = 1.0 to guarantee zero ghosting and zero blur when stopped.
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
      if (canvasWidth === 0 || canvasHeight === 0) return;

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

      ctx.globalAlpha = 1.0;
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
   * Preload 79 frames with off-thread ImageBitmap decoding and immediate starting frame
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isCancelled = false;
    framesCacheRef.current = new Array(HERO_CONFIG.totalFrames).fill(null);

    const loadSingleFrame = async (
      index: number,
      priority: 'high' | 'auto' = 'auto'
    ): Promise<void> => {
      if (isCancelled || framesCacheRef.current[index]) return;

      const url = HERO_FRAME_PATHS[index];

      // Try off-thread ImageBitmap decoding if available for zero UI thread jank
      if ('createImageBitmap' in window) {
        try {
          const res = await fetch(url, { priority });
          if (!res.ok) throw new Error('Fetch failed');
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          if (!isCancelled) {
            framesCacheRef.current[index] = bitmap;
            if (index === 0) {
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

      // 2. Preload remaining frames concurrently without artificial delays
      let nextIndex = 1;
      const concurrency = 6;

      const worker = async () => {
        while (nextIndex < HERO_CONFIG.totalFrames && !isCancelled) {
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
   * Core scroll handler synchronized with Lenis and GSAP ScrollTrigger.
   * Directly paints pure, 100% sharp frames driven by GSAP's smooth scrub interpolation.
   * Guarantees zero ghosting, zero blur when stopped, and fluid 60fps movie-like playback.
   */
  const updateHeroProgress = useCallback(
    (progress: number) => {
      const clampedProgress = Math.max(0, Math.min(1, progress));

      // 1. Calculate Target Frame Index (0 to 78)
      const targetIndex = Math.min(
        HERO_CONFIG.totalFrames - 1,
        Math.max(0, Math.round(clampedProgress * (HERO_CONFIG.totalFrames - 1)))
      );

      // 2. Direct Canvas Render on Frame Change (Crisp Single Frame - Zero Ghosting, Zero Blur)
      if (targetIndex !== lastRenderedIndexRef.current) {
        drawFrame(targetIndex);
      }

      // 3. Direct DOM Updates for Zero-Lag HUD
      const pct = Math.round(clampedProgress * 100);
      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${pct}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      // Display 1-based frame counter (1 / 79 FRAMES)
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = `${targetIndex + 1} / ${HERO_CONFIG.totalFrames} FRAMES`;
      }

      // Active Chapter Label
      if (activeChapterLabelRef.current) {
        if (clampedProgress < 0.22) {
          activeChapterLabelRef.current.textContent = 'PROLOGUE';
        } else if (clampedProgress < 0.52) {
          activeChapterLabelRef.current.textContent = 'CHAPTER I';
        } else if (clampedProgress < 0.78) {
          activeChapterLabelRef.current.textContent = 'CHAPTER II';
        } else {
          activeChapterLabelRef.current.textContent = 'CHAPTER III';
        }
      }

      // 4. Discrete Phase Updates for Chapter Narrative
      let nextPhase = 0;
      if (clampedProgress >= 0.78) {
        nextPhase = 3;
      } else if (clampedProgress >= 0.52) {
        nextPhase = 2;
      } else if (clampedProgress >= 0.22) {
        nextPhase = 1;
      }

      if (currentPhaseRef.current !== nextPhase) {
        currentPhaseRef.current = nextPhase;
        setActivePhase(nextPhase);
      }
    },
    [drawFrame]
  );

  /**
   * Lenis-driven ScrollTrigger integration using useGSAP per Rule 2.
   * scrub: 0.08 eliminates rubber-band delay while perfectly synchronizing with Lenis smooth momentum.
   */
  useGSAP(
    () => {
      if (typeof window === 'undefined' || isReducedMotion) return;
      const container = containerRef.current;
      if (!container) return;

      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.08,
        anticipatePin: 0,
        refreshPriority: 10, // Priority 10: Top of document spans 0 to 400vh; refresh first
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateHeroProgress(self.progress);
        },
      });

      // Initialize on mount
      updateHeroProgress(0);

      // Force recalculation to align with Lenis bounds
      const refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      return () => {
        clearTimeout(refreshTimer);
        st.kill();
      };
    },
    { scope: containerRef, dependencies: [isReducedMotion, lenis, updateHeroProgress] }
  );

  /**
   * Smoothly scrolls to a specific chapter or advances down using Lenis
   */
  const scrollToChapter = useCallback(
    (chapterIndex: number) => {
      const container = containerRef.current;
      if (!container) return;

      const chapter = HERO_CONFIG.chapters[chapterIndex];
      const progressTarget = chapter ? chapter.rangeStart : 0;

      const rect = container.getBoundingClientRect();
      const maxScroll = container.offsetHeight - window.innerHeight;
      const targetY = window.scrollY + rect.top + progressTarget * maxScroll;

      if (lenis) {
        lenis.scrollTo(targetY, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    },
    [lenis]
  );

  const handleAdvance = useCallback(() => {
    const nextPhase = (activePhase + 1) % HERO_CONFIG.chapters.length;
    scrollToChapter(nextPhase === 0 ? 1 : nextPhase);
  }, [activePhase, scrollToChapter]);

  /**
   * Cursor Micro-Parallax on Editorial Content (Desktop only)
   */
  useEffect(() => {
    if (typeof window === 'undefined' || isReducedMotion || isMobileDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 14;
      const ny = (e.clientY / window.innerHeight - 0.5) * 10;
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
      id="hero-section"
      className="relative w-full bg-[#1A0A0E] text-monarch-ivory"
      style={{ height: isReducedMotion ? '100vh' : `${HERO_CONFIG.scrollDistanceVh}vh` }}
    >
      {/* 100vh Sticky Viewport Stage with Hardware Acceleration */}
      <div
        ref={stickyStageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform"
      >
        {/* =========================================================================
            LAYER 0: STARTING FRAME (Frame 001 - Pure, Clean First Paint)
            Renders immediately on HTML paint with zero overlays and zero black screen.
            ========================================================================= */}
        <img
          src={HERO_CONFIG.initialPosterPath}
          alt="Monarch Flagship Atelier Starting Frame"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />

        {/* =========================================================================
            LAYER 1: CLEAN CANVAS SEQUENCE (79 FRAMES - ZERO OVERLAYS)
            Pure, crystal-clear frames with no tint, no scrims, and no blurring.
            ========================================================================= */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block object-center will-change-transform"
          aria-label="Monarch royal flagship boutique walkthrough animation"
        />

        {/* Top Gold Progress Bar */}
        {!isReducedMotion && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 transition-opacity duration-1000 bg-black/20">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-monarch-gold-dark to-monarch-gold transition-all duration-150"
              style={{ width: '0%' }}
            />
          </div>
        )}

        {/* =========================================================================
            LAYER 2: EDITORIAL CONTENT & HUD (PURE CLEAN FRAMES - ZERO OVERLAYS)
            Typography uses crisp ambient text-shadow for high-contrast legibility.
            ========================================================================= */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between pt-24 sm:pt-26 lg:pt-28 px-6 sm:px-12 lg:px-16 pb-6 sm:pb-8 lg:pb-10">
          {/* Top Row: Pill Badge and Walkthrough HUD */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/75 border border-monarch-gold/40 text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold-light shadow-2xl">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold animate-pulse" />
              <span>{HERO_CONFIG.pillBadgeText}</span>
            </div>

            {!isReducedMotion && (
              <div className="flex items-center gap-2">
                {/* Active Chapter Label with interactive Lenis scroll navigation */}
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="hidden md:inline-flex items-center px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black border border-monarch-gold/40 hover:border-monarch-gold text-[10px] font-mono text-monarch-gold tracking-widest uppercase transition-all shadow-2xl cursor-pointer"
                  title="Click to advance to next chapter via Lenis"
                >
                  <span ref={activeChapterLabelRef}>PROLOGUE</span>
                </button>

                {/* Walkthrough Counter with interactive Lenis scroll navigation */}
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black border border-monarch-gold/40 hover:border-monarch-gold text-xs font-mono text-monarch-beige transition-all shadow-2xl cursor-pointer"
                  title="Walkthrough progress - Click to advance"
                >
                  <span className="text-[10px] uppercase tracking-wider text-monarch-gold">
                    Walkthrough
                  </span>
                  <span ref={percentTextRef} className="font-medium text-monarch-gold-light">
                    0%
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Central Editorial Narrative Area with Desktop Micro-Parallax */}
          <div
            ref={textContainerRef}
            className="max-w-2xl my-auto relative min-h-[320px] flex items-center will-change-transform pointer-events-none"
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
                <span className="block font-nav text-xs sm:text-sm tracking-[0.35em] uppercase text-monarch-gold font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[0].eyebrow}
                </span>

                <h1 className="font-serif text-4xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-white leading-[1.05] [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[0].title} <br />
                  <span className="font-serif italic font-light text-monarch-gold-light [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95)]">
                    {HERO_CONFIG.chapters[0].titleHighlight}
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-monarch-ivory max-w-xl font-sans leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[0].description}
                </p>

                {/* Primary Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Link
                    href={HERO_CONFIG.chapters[0].primaryCta!.href}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/60 font-nav text-xs font-medium uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl hover:shadow-monarch-gold/30 group pointer-events-auto"
                  >
                    <span>{HERO_CONFIG.chapters[0].primaryCta!.label}</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={HERO_CONFIG.chapters[0].secondaryCta!.href}
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/75 hover:bg-black text-monarch-gold hover:text-monarch-ivory border border-monarch-gold/60 font-nav text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all duration-300 pointer-events-auto shadow-2xl"
                  >
                    <span>{HERO_CONFIG.chapters[0].secondaryCta!.label}</span>
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
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[1].eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[1].title}
                </h2>
                <p className="text-sm sm:text-base text-monarch-ivory max-w-lg leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[1].description}
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
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[2].eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[2].title}
                </h2>
                <p className="text-sm sm:text-base text-monarch-ivory max-w-lg leading-relaxed [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[2].description}
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
                <span className="block font-nav text-xs tracking-[0.3em] uppercase text-monarch-gold mb-2 font-mono [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  {HERO_CONFIG.chapters[3].eyebrow}
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight mb-3 [text-shadow:_0_2px_4px_rgba(0,0,0,0.95),_0_6px_24px_rgba(0,0,0,0.95),_0_0_40px_rgba(0,0,0,0.8)]">
                  {HERO_CONFIG.chapters[3].title}
                </h2>
                <p className="text-sm sm:text-base text-monarch-ivory max-w-lg leading-relaxed mb-5 [text-shadow:_0_2px_8px_rgba(0,0,0,0.95),_0_4px_16px_rgba(0,0,0,0.9)]">
                  {HERO_CONFIG.chapters[3].description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={HERO_CONFIG.chapters[3].primaryCta!.href}
                    className="px-6 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/60 font-nav text-xs uppercase tracking-[0.2em] flex items-center gap-2 transition-all shadow-2xl hover:shadow-monarch-gold/30 pointer-events-auto"
                  >
                    <span>{HERO_CONFIG.chapters[3].primaryCta!.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
                  </Link>

                  <Link
                    href={HERO_CONFIG.chapters[3].secondaryCta!.href}
                    className="px-6 py-3 rounded-full bg-black/75 hover:bg-black text-monarch-gold hover:text-monarch-ivory border border-monarch-gold/60 font-nav text-xs uppercase tracking-[0.2em] flex items-center transition-all pointer-events-auto shadow-2xl"
                  >
                    <span>{HERO_CONFIG.chapters[3].secondaryCta!.label}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Footer HUD Cue with Interactive Lenis Advance Button */}
          <div className="flex items-center justify-between text-xs text-monarch-beige/70 pt-4 pointer-events-auto">
            <span
              ref={frameCounterRef}
              className="px-3 py-1.5 rounded-full bg-black/75 border border-monarch-gold/40 font-nav uppercase tracking-widest text-[10px] text-monarch-gold shadow-2xl font-mono"
            >
              1 / {HERO_CONFIG.totalFrames} FRAMES
            </span>

            {!isReducedMotion && (
              <button
                type="button"
                onClick={handleAdvance}
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 hover:bg-black border border-monarch-gold/40 hover:border-monarch-gold text-monarch-gold text-[10px] font-nav uppercase tracking-[0.25em] transition-all shadow-2xl cursor-pointer"
                title="Advance walkthrough with Lenis"
              >
                <span>SCROLL DOWN TO ADVANCE</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce text-monarch-gold group-hover:translate-y-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>

        {/* Accessibility badge for Reduced Motion Mode */}
        {isReducedMotion && (
          <div className="absolute bottom-8 left-8 z-30 px-4 py-2 rounded-full bg-black/75 border border-monarch-gold/40 text-xs text-monarch-gold-light">
            Static view (prefers-reduced-motion active)
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
