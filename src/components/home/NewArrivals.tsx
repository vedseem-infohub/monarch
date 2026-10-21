'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { NEW_ARRIVALS_DATA } from '@/data/newArrivals';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeader } from '@/components/home/shared/SectionHeader';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const NewArrivals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Authentically provisioned from dedicated data file per Rule 4
  const newArrivalProducts = NEW_ARRIVALS_DATA.products;

  const updateScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = 330;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // GSAP animation scoped cleanly using useGSAP hook per Rule 2
  useGSAP(
    () => {
      if (trackRef.current) {
        gsap.fromTo(
          trackRef.current.querySelectorAll('.product-rail-card'),
          { opacity: 0.85, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 95%',
              refreshPriority: 1,
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef, dependencies: [] }
  );

  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
    }
    return () => {
      if (track) track.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#F7F0E5] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/30 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-dark font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
              <span>{NEW_ARRIVALS_DATA.eyebrow}</span>
            </div>
            <SectionHeader
              eyebrow=""
              title={NEW_ARRIVALS_DATA.title}
              italicWord={NEW_ARRIVALS_DATA.italicWord}
              description={NEW_ARRIVALS_DATA.description}
              align="left"
              className="mb-0"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={NEW_ARRIVALS_DATA.viewAllHref}
              className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors mr-2"
            >
              View All
            </Link>

            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/90 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-30 transition-all shadow-sm hover:border-monarch-gold"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/90 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-30 transition-all shadow-sm hover:border-monarch-gold"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track with Generous Padding to Prevent Border & Shadow Clipping */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-5 px-3 sm:px-4"
        >
          {newArrivalProducts.map((product, idx) => (
            <div
              key={product.id}
              className="product-rail-card shrink-0 w-[270px] sm:w-[300px] lg:w-[325px]"
            >
              <ProductCard product={product} priority={idx < 5} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
