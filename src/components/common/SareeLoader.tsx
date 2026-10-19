'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';

interface SareeLoaderProps {
  onComplete?: () => void;
}

export const SareeLoader: React.FC<SareeLoaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainWrapperRef = useRef<HTMLDivElement>(null);
  const clipPathElementRef = useRef<SVGPathElement>(null);
  const edgeStrokeRef = useRef<SVGPathElement>(null);
  const foldsOverlayRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);

  const [isMounted, setIsMounted] = useState<boolean>(true);
  const { pauseScroll, resumeScroll } = useSmoothScroll();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Lock scroll immediately on mount
  useEffect(() => {
    pauseScroll();
    return () => {
      resumeScroll();
    };
  }, [pauseScroll, resumeScroll]);

  // Clean finish: kill animations, restore scroll, unmount from DOM
  const handleFinish = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }
    resumeScroll();
    setIsMounted(false);
    if (onComplete) onComplete();
  }, [resumeScroll, onComplete]);

  // GSAP animation: Organic Silk Drape Wave Curtain with Left-Side Exit & Zero Gaps
  useGSAP(
    () => {
      if (!containerRef.current || !curtainWrapperRef.current) return;

      // Honor prefers-reduced-motion
      if (
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        handleFinish();
        return;
      }

      const wrapper = curtainWrapperRef.current;
      const clipPathEl = clipPathElementRef.current;
      const edgeStroke = edgeStrokeRef.current;
      const folds = foldsOverlayRef.current;
      const shimmer = shimmerRef.current;

      const tl = gsap.timeline({
        onComplete: () => {
          handleFinish();
        },
      });
      timelineRef.current = tl;

      // Initial state: Pure continuous silk covers 100% of viewport edge-to-edge
      gsap.set(wrapper, {
        x: 0,
        y: 0,
        rotateZ: 0,
        willChange: 'transform',
      });

      if (folds) {
        gsap.set(folds, {
          opacity: 0.12,
          backgroundSize: '240px 100%',
        });
      }

      if (shimmer) {
        gsap.set(shimmer, {
          opacity: 0.15,
        });
      }

      // Proxy object for smooth cloth wave simulation
      const clothState = { p: 0, wave: 0 };

      // Helper to compute organic bezier drape path (0..1 normalized coords)
      const computeClothD = (p: number, w: number) => {
        // Base x-position moves from 1.0 (closed) down to 0.11 (narrow gathered column)
        const baseX = 1.0 - 0.89 * p;
        // Fluid billow amplitude (peaks in middle of pull, softens at end)
        const amp = 0.045 * Math.sin(p * Math.PI);

        // Control points with natural fabric drag & ripple
        const xTop = Math.max(0.02, baseX - 0.015 * Math.sin(p * Math.PI));
        const xCp1 = Math.max(0.01, baseX - amp * (1.15 + 0.25 * Math.sin(w)));
        const yCp1 = 0.32 + 0.04 * Math.sin(w);

        const xCp2 = Math.min(1.0, baseX + amp * (0.95 + 0.25 * Math.cos(w)));
        const yCp2 = 0.68 - 0.04 * Math.cos(w);

        const xBottom = Math.max(0.02, baseX + 0.018 * Math.sin(p * Math.PI));

        // Full closed polygon: (0,0) -> (xTop,0) -> Curve through cp1/cp2 to (xBottom,1) -> (0,1) -> (0,0)
        const d = `M 0 0 L ${xTop.toFixed(4)} 0 C ${xCp1.toFixed(4)} ${yCp1.toFixed(4)}, ${xCp2.toFixed(4)} ${yCp2.toFixed(4)}, ${xBottom.toFixed(4)} 1 L 0 1 Z`;
        // Leading edge stroke line for golden zari folded hem
        const strokeD = `M ${xTop.toFixed(4)} 0 C ${xCp1.toFixed(4)} ${yCp1.toFixed(4)}, ${xCp2.toFixed(4)} ${yCp2.toFixed(4)}, ${xBottom.toFixed(4)} 1`;

        return { d, strokeD };
      };

      // 0.0s - 0.35s: Initial pause to appreciate pure Banarasi silk fabric

      // 0.35s - 1.6s: FLUID ORGANIC SILK CURTAIN PULL (RIGHT TO LEFT)
      // The edge billows and ripples like heavy royal silk drawn open by hand
      tl.to(
        clothState,
        {
          p: 1,
          duration: 1.25,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (clipPathEl) {
              const { d, strokeD } = computeClothD(clothState.p, clothState.wave);
              clipPathEl.setAttribute('d', d);
              if (edgeStroke) {
                edgeStroke.setAttribute('d', strokeD);
              }
            }
          },
        },
        0.35
      );

      // Continuous wave oscillation traveling through the cloth during the pull
      tl.to(
        clothState,
        {
          wave: Math.PI * 3,
          duration: 1.25,
          ease: 'sine.inOut',
        },
        0.35
      );

      // Dynamic accordion pleat compression as fabric gathers into tight, rich silk folds
      if (folds) {
        tl.to(
          folds,
          {
            backgroundSize: '34px 100%',
            opacity: 0.88,
            duration: 1.25,
            ease: 'power2.inOut',
          },
          0.35
        );
      }

      // Specular 24k zari lustre shimmer wave moving across the folds
      if (shimmer) {
        tl.to(
          shimmer,
          {
            opacity: 0.8,
            duration: 0.7,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1,
          },
          0.45
        );
      }

      // CONTINUOUS EXIT: LEFT SIDE ONLY (ZERO HOLD)
      // Overlaps at 1.35s while velocity is peak: sweeps smoothly off the LEFT EDGE (y stays 0!)
      tl.to(
        wrapper,
        {
          x: '-125%',
          y: 0,
          duration: 0.55,
          ease: 'power2.in',
        },
        1.35
      );
    },
    { scope: containerRef }
  );

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
      style={{
        background: 'transparent',
      }}
      aria-label="Saree Curtain Reveal"
      role="dialog"
      aria-modal="true"
    >
      {/* SVG Definitions for Dynamic Cloth Clip & Zari Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          {/* Dynamic Cloth Clip Path (objectBoundingBox coordinates 0..1) */}
          <clipPath id="saree-cloth-clip" clipPathUnits="objectBoundingBox">
            <path
              ref={clipPathElementRef}
              d="M 0 0 L 1 0 C 1 0.33, 1 0.67, 1 1 L 0 1 Z"
            />
          </clipPath>

          {/* Golden Zari Hem Sheen Gradient */}
          <linearGradient id="zari-hem-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#C7A15B" stopOpacity="0.8" />
            <stop offset="25%" stopColor="#DFBE7F" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFF2B8" stopOpacity="1" />
            <stop offset="75%" stopColor="#DFBE7F" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9A7737" stopOpacity="0.8" />
          </linearGradient>

          {/* Deep Velvet Shadow Gradient behind the fold edge */}
          <linearGradient id="fold-shadow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" stopOpacity="0" />
            <stop offset="70%" stopColor="rgba(26,10,14,0.6)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="rgba(26,10,14,0.95)" stopOpacity="0.95" />
          </linearGradient>
        </defs>
      </svg>

      {/* ============================================================ */}
      {/* CURTAIN WRAPPER: Draws open from Right to Left               */}
      {/* Exits cleanly on LEFT SIDE ONLY (Zero gaps at top or bottom) */}
      {/* ============================================================ */}
      <div
        ref={curtainWrapperRef}
        className="w-full h-full pointer-events-auto overflow-hidden relative"
        style={{
          filter:
            'drop-shadow(25px 0 45px rgba(0, 0, 0, 0.85)) drop-shadow(8px 0 16px rgba(41, 17, 22, 0.6))',
        }}
      >
        {/* Clipped Saree Fabric Sheet using Organic SVG Wave */}
        <div
          className="w-full h-full relative pointer-events-none"
          style={{
            clipPath: 'url(#saree-cloth-clip)',
          }}
        >
          {/* Authentic Banarasi Silk Saree Pattern Sheet (Never Breaks) */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backgroundImage: "url('/images/saree-pattern.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#5A1725',
            }}
          />

          {/* 3D Dimensional Accordion Silk Pleats (Deepens as drawn) */}
          <div
            ref={foldsOverlayRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, rgba(26,10,14,0.9) 0%, rgba(41,17,22,0.15) 20%, rgba(255,235,175,0.45) 50%, rgba(41,17,22,0.15) 80%, rgba(26,10,14,0.9) 100%)',
              backgroundRepeat: 'repeat-x',
              mixBlendMode: 'multiply',
            }}
          />

          {/* Specular 24K Zari Lustre Reflection Wave */}
          <div
            ref={shimmerRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(90deg, transparent 0%, rgba(255,247,214,0.4) 45%, rgba(255,215,0,0.3) 50%, transparent 100%)',
              backgroundSize: '130px 100%',
              backgroundRepeat: 'repeat-x',
              mixBlendMode: 'overlay',
            }}
          />

          {/* Soft ambient light falloff across the drape */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)',
              mixBlendMode: 'multiply',
            }}
          />
        </div>

        {/* Golden Zari Fold Hem SVG Overlay (Moves with the undulating edge) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Deep fold trough shadow */}
          <path
            ref={edgeStrokeRef}
            d="M 1 0 C 1 0.33, 1 0.67, 1 1"
            fill="none"
            stroke="url(#zari-hem-gradient)"
            strokeWidth="0.0035"
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(-2px 0 3px rgba(0,0,0,0.7))',
            }}
          />
        </svg>
      </div>

      {/* Accessible subtle Skip button */}
      <button
        onClick={handleFinish}
        type="button"
        className="absolute bottom-5 right-5 z-20 px-3 py-1 rounded-full border border-monarch-gold/30 bg-monarch-burgundy-deep/70 backdrop-blur-sm text-[10px] font-sans tracking-widest uppercase text-monarch-gold-light hover:text-white hover:border-monarch-gold transition-opacity duration-200 cursor-pointer pointer-events-auto"
        aria-label="Skip intro"
      >
        Skip
      </button>
    </div>
  );
};
