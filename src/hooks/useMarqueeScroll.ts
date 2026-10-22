'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export interface UseMarqueeScrollOptions {
  speed?: number; // pixels per second (default: 40)
  direction?: 'left' | 'right'; // 'left' = right-to-left glide, 'right' = left-to-right glide
  repeatCount?: number; // how many times the set is duplicated (default: 4)
  pauseOnHover?: boolean;
}

/**
 * useMarqueeScroll
 *
 * Provides a high-performance, centered, bi-directional infinite marquee
 * that fully supports manual scrolling (touch swipe on mobile, mouse drag
 * on desktop, trackpad/wheel) alongside automated silky-smooth gliding.
 *
 * Built with @gsap/react useGSAP, gsap.ticker, and passive native listeners.
 */
export function useMarqueeScroll<
  TContainer extends HTMLElement = HTMLDivElement,
  TTrack extends HTMLElement = HTMLDivElement,
>(options: UseMarqueeScrollOptions = {}) {
  const {
    speed = 40,
    direction = 'left',
    repeatCount = 4,
    pauseOnHover = true,
  } = options;

  const containerRef = useRef<TContainer | null>(null);
  const trackRef = useRef<TTrack | null>(null);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      let setWidth = 0;
      let hasInitializedScroll = false;
      let isPointerDown = false;
      let isTouching = false;
      let isHovered = false;
      let startX = 0;
      let startScrollLeft = 0;
      let hasDragged = false;

      // Update single-set width and initialize middle scroll position
      const updateDimensions = () => {
        if (!track || !container) return;
        const totalWidth = track.scrollWidth;
        if (totalWidth > 0 && repeatCount > 0) {
          const newSetWidth = totalWidth / repeatCount;
          setWidth = newSetWidth;

          if (!hasInitializedScroll && setWidth > 0) {
            // Position in the middle set for seamless bi-directional room
            container.scrollLeft = setWidth;
            hasInitializedScroll = true;
          }
        }
      };

      updateDimensions();

      // Observe track resize (e.g. when images finish loading or window resizes)
      let resizeObserver: ResizeObserver | null = null;
      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(() => {
          updateDimensions();
        });
        resizeObserver.observe(track);
      }

      // Respect prefers-reduced-motion
      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        isPausedRef.current = true;
      }

      const scheduleResume = (delay = 1200) => {
        if (prefersReducedMotion) return;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = setTimeout(() => {
          if (!isHovered && !isPointerDown && !isTouching) {
            isPausedRef.current = false;
          }
        }, delay);
      };

      // Ticker callback driven by GSAP
      const onTick = (_time: number, deltaTime: number) => {
        if (!container || setWidth <= 0) return;

        // Keep scroll normalized within bounds even during manual drag/swipe
        if (container.scrollLeft >= setWidth * 2.5) {
          container.scrollLeft -= setWidth;
        } else if (container.scrollLeft <= setWidth * 0.4) {
          container.scrollLeft += setWidth;
        }

        if (isPausedRef.current) return;

        const deltaSec = Math.min(deltaTime / 1000, 0.05);
        const px = speed * deltaSec;

        if (direction === 'left') {
          container.scrollLeft += px;
          if (container.scrollLeft >= setWidth * 2) {
            container.scrollLeft -= setWidth;
          }
        } else {
          container.scrollLeft -= px;
          if (container.scrollLeft <= setWidth) {
            container.scrollLeft += setWidth;
          }
        }
      };

      gsap.ticker.add(onTick);

      // --- Hover Handlers ---
      const onMouseEnter = () => {
        if (!pauseOnHover) return;
        isHovered = true;
        isPausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      };

      const onMouseLeave = () => {
        if (!pauseOnHover) return;
        isHovered = false;
        if (!isPointerDown && !isTouching) {
          scheduleResume(400);
        }
      };

      // --- Native Touch Handlers (Mobile) ---
      const onTouchStart = () => {
        isTouching = true;
        isPausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      };

      const onTouchEnd = () => {
        isTouching = false;
        scheduleResume(1400);
      };

      // --- Pointer Drag Handlers (Desktop Mouse Drag) ---
      const onPointerDown = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        isPointerDown = true;
        startX = e.clientX;
        startScrollLeft = container.scrollLeft;
        hasDragged = false;
        isPausedRef.current = true;
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!isPointerDown) return;
        const dx = e.clientX - startX;
        if (Math.abs(dx) > 4) {
          hasDragged = true;
        }
        container.scrollLeft = startScrollLeft - dx;
      };

      const onPointerUp = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        if (!isPointerDown) return;
        isPointerDown = false;
        scheduleResume(1200);
      };

      // Prevent link click if the user was actively dragging
      const onClickCapture = (e: MouseEvent) => {
        if (hasDragged) {
          e.preventDefault();
          e.stopPropagation();
          hasDragged = false;
        }
      };

      // --- Wheel / Trackpad Scroll Handlers ---
      const onWheel = (e: WheelEvent) => {
        // If there is horizontal wheel motion or user scrolls horizontally
        if (Math.abs(e.deltaX) > 2) {
          isPausedRef.current = true;
          scheduleResume(1000);
        }
      };

      // --- Tab Visibility Change ---
      const onVisibilityChange = () => {
        if (document.hidden) {
          isPausedRef.current = true;
        } else if (!prefersReducedMotion) {
          scheduleResume(500);
        }
      };

      // Attach event listeners
      container.addEventListener('mouseenter', onMouseEnter, { passive: true });
      container.addEventListener('mouseleave', onMouseLeave, { passive: true });
      container.addEventListener('touchstart', onTouchStart, { passive: true });
      container.addEventListener('touchend', onTouchEnd, { passive: true });
      container.addEventListener('touchcancel', onTouchEnd, { passive: true });
      container.addEventListener('pointerdown', onPointerDown);
      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
      container.addEventListener('click', onClickCapture, true);
      container.addEventListener('wheel', onWheel, { passive: true });
      document.addEventListener('visibilitychange', onVisibilityChange);

      return () => {
        gsap.ticker.remove(onTick);
        if (resizeObserver) resizeObserver.disconnect();
        if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('touchend', onTouchEnd);
        container.removeEventListener('touchcancel', onTouchEnd);
        container.removeEventListener('pointerdown', onPointerDown);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointerup', onPointerUp);
        container.removeEventListener('click', onClickCapture, true);
        container.removeEventListener('wheel', onWheel);
        document.removeEventListener('visibilitychange', onVisibilityChange);
      };
    },
    { scope: containerRef, dependencies: [speed, direction, repeatCount, pauseOnHover] }
  );

  return {
    containerRef,
    trackRef,
  };
}
