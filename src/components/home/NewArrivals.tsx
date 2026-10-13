'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeader } from '@/components/home/shared/SectionHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const NewArrivals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter or sort for genuine new arrivals:
  // Products with 'New Arrival' badge or latest in the catalog
  const newArrivalProducts = [
    ...PRODUCTS.filter((p) => p.badge === 'New Arrival'),
    ...PRODUCTS.filter((p) => p.badge !== 'New Arrival'),
  ].slice(0, 8);

  const updateScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = 320;
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.from(trackRef.current.querySelectorAll('.product-rail-card'), {
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }
    }, containerRef);

    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', updateScrollState, { passive: true });
      updateScrollState();
    }

    return () => {
      ctx.revert();
      if (track) track.removeEventListener('scroll', updateScrollState);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="py-16 sm:py-24 bg-[#F7F0E5] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="The Fresh Palette"
            title="New"
            italicWord="Arrivals"
            description="Contemporary royal silhouettes woven with heirloom sensibilities for the upcoming festive calendar."
            align="left"
            className="mb-0"
          />

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/collections/all"
              className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors mr-2"
            >
              View All
            </Link>

            <button
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/90 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/90 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Carousel Track */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {newArrivalProducts.map((product, idx) => (
            <div
              key={product.id}
              className="product-rail-card shrink-0 w-[260px] sm:w-[290px] lg:w-[310px]"
            >
              <ProductCard product={product} priority={idx < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
