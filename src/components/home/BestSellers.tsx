'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BEST_SELLERS_DATA } from '@/data/bestSellers';
import { ProductCard } from '@/components/product/ProductCard';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BestSellers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Authentically provisioned from dedicated data file per Rule 4
  const bestSellerProducts = BEST_SELLERS_DATA.products;

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
          trackRef.current.querySelectorAll('.bestseller-card'),
          { opacity: 0.85, y: 16, scale: 0.99 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 95%',
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
      className="py-16 sm:py-24 bg-[#FAF5EE] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/30 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-dark font-medium">
              <Award className="w-3.5 h-3.5 text-monarch-gold" />
              <span>{BEST_SELLERS_DATA.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-monarch-charcoal">
              {BEST_SELLERS_DATA.title}{' '}
              <span className="font-serif italic font-light text-monarch-gold-dark">
                {BEST_SELLERS_DATA.italicWord}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-monarch-charcoal/75 font-sans leading-relaxed max-w-xl">
              {BEST_SELLERS_DATA.description}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={BEST_SELLERS_DATA.viewAllHref}
              className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors mr-2"
            >
              Explore Collection
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

        {/* Carousel Track with Bestseller Ranking Indicator & Generous Padding */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth py-5 px-3 sm:px-4"
        >
          {bestSellerProducts.map((product, index) => {
            // Unify ranking badge directly into the Product model to prevent duplicate badges
            const productWithRank = {
              ...product,
              badge: `#${index + 1} Best Seller`,
            };

            return (
              <div
                key={product.id}
                className="bestseller-card shrink-0 w-[270px] sm:w-[300px] lg:w-[325px] relative"
              >
                <ProductCard product={productWithRank} priority={index < 5} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
