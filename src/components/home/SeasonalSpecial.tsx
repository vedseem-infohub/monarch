'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { SEASONAL_PRODUCTS } from '@/data/seasonal';
import { HorizontalProductCard } from './HorizontalProductCard';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SeasonalSpecial: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (trackRef.current) {
        gsap.from(trackRef.current.querySelectorAll('.seasonal-item'), {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 25,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
    },
    { scope: sectionRef }
  );

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-12 bg-[#FAF7F2] text-monarch-charcoal relative overflow-hidden pb-14 border-t border-monarch-gold/15"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: "| Seasonal Special" (Matching Screenshot) */}
        <div className="flex items-center justify-between gap-4 mb-5 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-[#C59B27] font-serif font-light text-2xl sm:text-3xl select-none">
              |
            </span>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[28px] font-normal tracking-tight text-[#1E1714]">
              Seasonal Special
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/collections/all"
              className="hidden sm:inline-flex items-center gap-1 text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:text-monarch-maroon-dark font-medium mr-2"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              onClick={scrollLeft}
              className="p-1.5 rounded-full bg-white hover:bg-monarch-gold text-gray-700 hover:text-white border border-gray-200/80 transition-all shadow-xs active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              className="p-1.5 rounded-full bg-white hover:bg-monarch-gold text-gray-700 hover:text-white border border-gray-200/80 transition-all shadow-xs active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={trackRef}
          className="flex gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1.5"
        >
          {SEASONAL_PRODUCTS.map((product, idx) => (
            <div key={product.id} className="seasonal-item shrink-0">
              <HorizontalProductCard product={product} priority={idx < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
