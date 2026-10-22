'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { TREND_PRODUCTS } from '@/data/trends';
import { HorizontalProductCard } from './HorizontalProductCard';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/*
 * ============================================================================
 * SECTION: TrendOfTheDay
 * ============================================================================
 * Features:
 * - Header: "| Trend of the Day" with gold vertical bar accent
 * - Centered Marquee Track: Glides smoothly from RIGHT to LEFT
 * - Supports manual horizontal touch swipe on mobile & mouse drag on desktop
 * - Auto-pauses on hover, touch, drag, and scroll so cards can be freely inspected
 * - Mobile responsive cards with zero white overlay obstruction
 * ============================================================================
 */

export const TrendOfTheDay: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Marquee scroll hook providing smooth automated glide + manual touch/drag/wheel scrolling
  const { containerRef, trackRef } = useMarqueeScroll<HTMLDivElement, HTMLDivElement>({
    speed: 38,
    direction: 'left',
    repeatCount: 4,
    pauseOnHover: true,
  });

  // Duplicate 4 times for seamless continuous bi-directional loop
  const quadrupled = [
    ...TREND_PRODUCTS,
    ...TREND_PRODUCTS,
    ...TREND_PRODUCTS,
    ...TREND_PRODUCTS,
  ];

  useGSAP(
    () => {
      gsap.fromTo(
        '.trend-header-reveal',
        { opacity: 0.85, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            refreshPriority: 1,
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-7 sm:py-9 bg-[#FAF7F2] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/15"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: "| Trend of the Day" */}
        <div className="trend-header-reveal flex items-center justify-between gap-4 mb-4 pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[#C59B27] font-serif font-light text-2xl sm:text-3xl select-none leading-none">
              |
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[27px] font-normal tracking-tight text-[#1E1714]">
              Trend of the Day
            </h2>
          </div>

          <Link
            href="/collections/all"
            className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:text-monarch-maroon-dark font-medium transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Marquee Track: Centered, Interactive & Silky Smooth */}
      <div className="relative w-full overflow-hidden select-none py-1">
        {/* Edge Gradient Masks — hidden on mobile to prevent white overlay haze, visible on sm+ */}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

        <div
          ref={containerRef}
          className="w-full overflow-x-auto no-scrollbar scrollbar-none touch-pan-x cursor-grab active:cursor-grabbing select-none py-1"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-3 xs:gap-3.5 sm:gap-5 w-max py-2 px-3 sm:px-6"
          >
            {quadrupled.map((product, idx) => (
              <div key={`trend-${product.id}-${idx}`} className="shrink-0 flex items-center">
                <HorizontalProductCard product={product} priority={idx < 4} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
