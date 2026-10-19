'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { TREND_PRODUCTS } from '@/data/trends';
import { HorizontalProductCard } from './HorizontalProductCard';
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
 * - Marquee Track: Glides smoothly from RIGHT to LEFT (.animate-marquee)
 * - Auto-pauses on hover so cards can be inspected and added to bag
 *
 * BACKEND API INTEGRATION INSTRUCTIONS:
 * When the backend API is ready:
 * 1. Replace TREND_PRODUCTS with data fetched from your backend endpoint (e.g. GET /api/trends/daily)
 * 2. Example with React Query / SWR / useEffect:
 *
 *    // const [trendProducts, setTrendProducts] = useState<Product[]>(TREND_PRODUCTS);
 *    // useEffect(() => {
 *    //   async function loadTrends() {
 *    //     try {
 *    //       const res = await fetch('/api/trends/daily');
 *    //       const json = await res.json();
 *    //       if (json?.data) setTrendProducts(json.data);
 *    //     } catch (err) {
 *    //       console.error('Failed to load trends from backend:', err);
 *    //     }
 *    //   }
 *    //   loadTrends();
 *    // }, []);
 * ============================================================================
 */

export const TrendOfTheDay: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

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
        {/* Section Header: "| Trend of the Day" (Matching Screenshot) */}
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

      {/* Marquee Track: Glides smoothly from Right to Left (Direction 1) */}
      <div className="relative w-full overflow-hidden select-none py-1">
        {/* Edge Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10" />

        <div
          className="flex gap-4 sm:gap-5 w-max animate-marquee hover:[animation-play-state:paused] py-2 px-2"
          style={{
            animation: 'marquee 35s linear infinite normal',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {/* Seamless infinite loop: duplicate items */}
          {[...TREND_PRODUCTS, ...TREND_PRODUCTS].map((product, idx) => (
            <div key={`trend-${product.id}-${idx}`} className="shrink-0">
              <HorizontalProductCard product={product} priority={idx < 4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
