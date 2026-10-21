'use client';

import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  // Prevent mobile address-bar resize jumps & optimize ScrollTrigger responsiveness
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });
}

interface SmoothScrollContextType {
  lenis: Lenis | null;
  pauseScroll: () => void;
  resumeScroll: () => void;
  refreshScroll: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  pauseScroll: () => {},
  resumeScroll: () => {},
  refreshScroll: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Programmatic refresh of Lenis and ScrollTrigger coordinates
  const refreshScroll = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (lenisRef.current) {
      lenisRef.current.resize();
    }
    ScrollTrigger.refresh();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Drive Lenis updates through GSAP ticker for frame-perfect animation alignment
    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    // Smooth out micro frame spikes in Safari WebKit without desyncing Lenis
    gsap.ticker.lagSmoothing(500, 33);

    // 1. Initial calibration once Lenis is operational
    const initTimer = setTimeout(() => {
      lenis.resize();
      ScrollTrigger.refresh();
    }, 150);

    // 2. Font loading synchronization: when web fonts load, layout metrics settle
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        lenis.resize();
        ScrollTrigger.refresh();
      });
    }

    // 3. Complete window load event synchronization
    const handleLoad = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // 4. ResizeObserver on document body to catch layout shifts from late images without thrashing
    let resizeTimer: NodeJS.Timeout | null = null;
    let lastHeight = document.documentElement.scrollHeight;

    const ro = new ResizeObserver(() => {
      const currentHeight = document.documentElement.scrollHeight;
      // Only refresh if height significantly shifted (e.g. image loads), ignoring micro sub-pixel shifts
      if (Math.abs(currentHeight - lastHeight) > 16) {
        lastHeight = currentHeight;
        if (resizeTimer) clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 120);
      }
    });

    if (document.body) {
      ro.observe(document.body);
    }

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      clearTimeout(initTimer);
      window.removeEventListener('load', handleLoad);
      ro.disconnect();
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lock scroll via Lenis API without modifying document.body.style.overflow
  // This prevents layout shifts, scrollbar flickering, and viewport size jumps (increase/decrease)
  const pauseScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.stop();
    }
  }, []);

  const resumeScroll = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.start();
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance, pauseScroll, resumeScroll, refreshScroll }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
