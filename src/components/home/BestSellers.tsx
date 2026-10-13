'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeader } from '@/components/home/shared/SectionHeader';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BestSellers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Authentically rank bestsellers based on review rating, review count, and bestseller badge
  const bestSellerProducts = [...PRODUCTS]
    .sort((a, b) => {
      const aScore = (a.badge === 'Bestseller' ? 100 : 0) + (a.rating || 0) * 10 + (a.reviewsCount || 0);
      const bScore = (b.badge === 'Bestseller' ? 100 : 0) + (b.rating || 0) * 10 + (b.reviewsCount || 0);
      return bScore - aScore;
    })
    .slice(0, 8);

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.from(trackRef.current.querySelectorAll('.bestseller-card'), {
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          scale: 0.95,
          y: 35,
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
      className="py-16 sm:py-24 bg-[#FAF5EE] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/30 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-dark font-medium">
              <Award className="w-3.5 h-3.5 text-monarch-gold" />
              <span>Patron Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-monarch-charcoal">
              Best{' '}
              <span className="font-serif italic font-light text-monarch-gold-dark">
                Sellers
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-monarch-charcoal/75 font-sans leading-relaxed max-w-xl">
              Our most celebrated creations, adorned with 24K pure gold-dipped dabka, Kashi zari, and certified silks.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/collections/all"
              className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors mr-2"
            >
              Explore Collection
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

        {/* Carousel Track with Bestseller Ranking Indicator */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-1"
        >
          {bestSellerProducts.map((product, index) => (
            <div
              key={product.id}
              className="bestseller-card shrink-0 w-[270px] sm:w-[300px] lg:w-[325px] relative"
            >
              {/* Ranking Pill Tag */}
              <div className="absolute top-2 left-2 z-20 pointer-events-none">
                <span className="text-[10px] font-mono font-bold bg-[#3F101A] text-monarch-gold-light border border-monarch-gold/40 px-2 py-0.5 rounded shadow-sm">
                  #{index + 1} Best Seller
                </span>
              </div>
              <ProductCard product={product} priority={index < 3} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
