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
  const delay = DELAY_66_INDICES.has(frameNum) ? '0.066s' : '0.033s';
  return `/optimized/frame_${padded}_delay-${delay}.jpg`;
});

export interface ScrollImageSequenceProps {
  /** Optional custom frame paths (defaults to the 156 frames in /public) */
  framePaths?: string[];
  /**
   * Height of the outer scroll container (e.g. '400vh', '600vh').
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

  // Loaded frames cache (ImageBitmap where supported for off-thread GPU decoding)
  const framesCacheRef = useRef<(ImageBitmap | HTMLImageElement | null)[]>([]);
  const lastRenderedIndexRef = useRef<number>(-1);

  // LERP damping state
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const isDampingActiveRef = useRef<boolean>(false);
  const dampingRafIdRef = useRef<number | null>(null);

  // Debounce resize timer
  const resizeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Component state
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [activeFrameIndex, setActiveFrameIndex] = useState<number>(0);

  /**
   * Finds nearest loaded frame
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
   * Draws a specific frame onto the canvas
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
      ctx.imageSmoothingQuality = 'high';

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const imgWidth = 'naturalWidth' in frame ? frame.naturalWidth : frame.width;
      const imgHeight = 'naturalHeight' in frame ? frame.naturalHeight : frame.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const imgAspect = imgWidth / imgHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let renderWidth = 0;
      let renderHeight = 0;

      if (fit === 'cover') {
        if (canvasAspect > imgAspect) {
          renderWidth = canvasWidth;
          renderHeight = canvasWidth / imgAspect;
        } else {
          renderHeight = canvasHeight;
          renderWidth = canvasHeight * imgAspect;
        }
      } else {
        if (canvasAspect > imgAspect) {
          renderHeight = canvasHeight;
          renderWidth = canvasHeight * imgAspect;
        } else {
          renderWidth = canvasWidth;
          renderHeight = canvasWidth / imgAspect;
        }
      }

      const offsetX = (canvasWidth - renderWidth) / 2;
      const offsetY = (canvasHeight - renderHeight) / 2;

      ctx.drawImage(frame, offsetX, offsetY, renderWidth, renderHeight);
    },
    [fit, getNearestLoadedFrame]
  );

  /**
   * Updates canvas internal buffer resolution to match screen pixels and devicePixelRatio
   */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const newW = Math.round(displayWidth * dpr);
    const newH = Math.round(displayHeight * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;

      if (lastRenderedIndexRef.current >= 0) {
        drawFrame(lastRenderedIndexRef.current);
      }
    }
  }, [drawFrame]);

  /**
   * Debounced resize
   */
  const handleDebouncedResize = useCallback(() => {
    if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    resizeTimerRef.current = setTimeout(resizeCanvas, 150);
  }, [resizeCanvas]);

  /**
   * LERP damping ticker
   */
  const tickDamping = useCallback(() => {
    const target = targetFrameRef.current;
    const current = currentFrameRef.current;
    const total = framePaths.length;
    const diff = target - current;

    if (Math.abs(diff) > 0.002) {
      currentFrameRef.current += diff * 0.16;
      const rounded = Math.min(total - 1, Math.max(0, Math.round(currentFrameRef.current)));

      if (rounded !== lastRenderedIndexRef.current) {
        lastRenderedIndexRef.current = rounded;
        drawFrame(rounded);
        setActiveFrameIndex(rounded);
      }

      isDampingActiveRef.current = true;
      dampingRafIdRef.current = requestAnimationFrame(tickDamping);
    } else {
      currentFrameRef.current = target;
      const finalIdx = Math.min(total - 1, Math.max(0, Math.round(target)));
      if (finalIdx !== lastRenderedIndexRef.current) {
        lastRenderedIndexRef.current = finalIdx;
        drawFrame(finalIdx);
        setActiveFrameIndex(finalIdx);
      }
      isDampingActiveRef.current = false;
      dampingRafIdRef.current = null;
    }
  }, [drawFrame, framePaths.length]);

  const triggerDamping = useCallback(() => {
    if (!isDampingActiveRef.current) {
      isDampingActiveRef.current = true;
      dampingRafIdRef.current = requestAnimationFrame(tickDamping);
    }
  }, [tickDamping]);

  /**
   * Map scroll position to target frame
   */
  const updateFrameFromScroll = useCallback(() => {
    if (isReducedMotion) return;

    const container = containerRef.current;
    const totalFrames = framePaths.length;
    if (!container || totalFrames === 0) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollableDistance = rect.height - windowHeight;
    if (scrollableDistance <= 0) return;

    const scrolledDistance = -rect.top;
    const rawProgress = scrolledDistance / scrollableDistance;
    const progress = Math.min(1, Math.max(0, rawProgress));

    targetFrameRef.current = progress * (totalFrames - 1);
    triggerDamping();
  }, [isReducedMotion, framePaths.length, triggerDamping]);

  /**
   * Progressive Staged Preloader with ImageBitmap support
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsReducedMotion(prefersReduced);

    const total = framePaths.length;
    framesCacheRef.current = new Array(total).fill(null);

    let isCancelled = false;

    const loadSingleFrame = async (url: string, index: number) => {
      try {
        if ('createImageBitmap' in window && typeof fetch !== 'undefined') {
          const res = await fetch(url);
          const blob = await res.blob();
          const bitmap = await createImageBitmap(blob);
          if (isCancelled) {
            bitmap.close();
            return null;
          }
          framesCacheRef.current[index] = bitmap;
          return bitmap;
        } else {
          return new Promise((resolve) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
              if (isCancelled) return resolve(null);
              framesCacheRef.current[index] = img;
              resolve(img);
            };
            img.onerror = () => resolve(null);
          });
        }
      } catch {
        return null;
      }
    };

    // Load first frame immediately
    loadSingleFrame(framePaths[0], 0).then((first) => {
      if (isCancelled || !first) return;
      setIsLoaded(true);
      lastRenderedIndexRef.current = 0;
      resizeCanvas();
      drawFrame(0);

      if (prefersReduced || total <= 1) return;

      // Initial 10-frame priority burst
      const initialBatchSize = Math.min(10, total);
      const initialPromises: Promise<unknown>[] = [];
      for (let i = 1; i < initialBatchSize; i++) {
        initialPromises.push(loadSingleFrame(framePaths[i], i));
      }

      Promise.all(initialPromises).then(() => {
        if (isCancelled || initialBatchSize >= total) return;

        // Background stream remaining frames on idle
        const startBackground = () => {
          if (isCancelled) return;
          const CONCURRENCY = 3;
          let currentIdx = initialBatchSize;
          let loaded = initialBatchSize;

          const loadNext = () => {
            if (isCancelled || currentIdx >= total) return;
            const idx = currentIdx++;
            loadSingleFrame(framePaths[idx], idx).then(() => {
              if (isCancelled) return;
              loaded++;
              setLoadingProgress(Math.round((loaded / total) * 100));
              loadNext();
            });
          };

          for (let c = 0; c < CONCURRENCY; c++) loadNext();
        };

        if ('requestIdleCallback' in window) {
          (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
            startBackground,
            { timeout: 700 }
          );
        } else {
          setTimeout(startBackground, 300);
        }
      });
    });

    return () => {
      isCancelled = true;
      framesCacheRef.current.forEach((item) => {
        if (item && 'close' in item) {
          try {
            item.close();
          } catch {
            // ignore
          }
        }
      });
      framesCacheRef.current = [];
    };
  }, [framePaths, drawFrame, resizeCanvas]);

  /**
   * Listeners
   */
  useEffect(() => {
    if (!isLoaded) return;

    resizeCanvas();
    updateFrameFromScroll();

    window.addEventListener('scroll', updateFrameFromScroll, { passive: true });
    window.addEventListener('resize', handleDebouncedResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateFrameFromScroll);
      window.removeEventListener('resize', handleDebouncedResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      if (dampingRafIdRef.current) cancelAnimationFrame(dampingRafIdRef.current);
    };
  }, [isLoaded, handleDebouncedResize, resizeCanvas, updateFrameFromScroll]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-[#1A0A0E]"
      style={{ height: isReducedMotion ? '100vh' : containerHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform">
        <canvas
          ref={canvasRef}
          className="w-full h-full block object-center will-change-transform"
          aria-label="Interactive Luxury Frame Sequence"
        />

        {/* Ambient Loader placeholder */}
        {!isLoaded && (
          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#1A0A0E] text-white">
            <div className="w-12 h-12 mb-4 rounded-full border border-monarch-gold/40 flex items-center justify-center relative">
              <div className="w-3.5 h-3.5 bg-monarch-gold rounded-full animate-ping" />
            </div>
            <p className="font-nav text-xs uppercase tracking-[0.3em] text-monarch-gold">
              {loadingTitle}
            </p>
          </div>
        )}

        {/* Subtle Background Progress */}
        {loadingProgress > 0 && loadingProgress < 100 && (
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-[2px] z-30 bg-black/30">
            <div
              className="h-full bg-monarch-gold transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        )}

        {/* Cinematic Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(16,4,8,0.7)_80%,rgba(10,2,5,0.92)_100%)] z-10" />

        {/* Contextual HUD */}
        {showCaptions && !isReducedMotion && isLoaded && (
          <div className="pointer-events-none absolute bottom-8 left-8 right-8 z-20 flex items-center justify-between text-xs text-monarch-beige/70">
            <span className="font-mono text-[10px] tracking-wider text-monarch-gold/90">
              FRAME {activeFrameIndex + 1} / {framePaths.length}
            </span>
            <span className="font-nav text-[9px] uppercase tracking-[0.25em] text-monarch-gold/80">
              MONARCH ATELIER CINEMATIC SEQUENCE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
