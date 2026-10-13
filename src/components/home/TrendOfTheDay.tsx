'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { ArrowRight, Sparkles, Flame, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Daily trend spotlights paired with genuine products
const TREND_ITEMS = [
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-012') || PRODUCTS[0],
    trendName: 'Moonlight Tissue Organza',
    trendTag: 'Trending Drape',
    highlight: 'Gossamer handloom silk with micro-zardozi jasmine vines',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-003') || PRODUCTS[1],
    trendName: 'Authentic Kadwa Weft',
    trendTag: 'Heritage Revival',
    highlight: 'Pitloom shikargah motifs in hallmarked pure silver zari',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-005') || PRODUCTS[2],
    trendName: 'Kalidar Velvet Flairs',
    trendTag: 'Royal Evening',
    highlight: '32 hand-shaped gota ribbon petals with sheer silk dupatta',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-002') || PRODUCTS[3],
    trendName: 'Imperial Tonal Marodi',
    trendTag: 'Groom Couture',
    highlight: 'Bhagalpur raw silk finished with custom carved brass buttons',
  },
];

export const TrendOfTheDay: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.from(trackRef.current.querySelectorAll('.trend-card'), {
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-20 bg-[#F7F0E5] text-monarch-charcoal relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-monarch-gold/30">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-monarch-maroon/10 border border-monarch-maroon/20 text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold">
              <Flame className="w-3 h-3 text-monarch-maroon" />
              <span>Daily Editorial Highlight</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-monarch-charcoal font-medium">
              Trend of the{' '}
              <span className="font-serif italic font-light text-monarch-gold-dark">
                Day
              </span>
            </h2>
          </div>

          <Link
            href="/collections/all"
            className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors"
          >
            Explore All Trends
          </Link>
        </div>

        {/* 4 Spotlight Horizontal Mini-Cards */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {TREND_ITEMS.map((item) => (
            <div
              key={item.trendName}
              className="trend-card group flex flex-col bg-white rounded-xl overflow-hidden border border-monarch-beige/60 hover:border-monarch-gold transition-all duration-300 shadow-sm hover:shadow-lg p-3"
            >
              <div className="flex gap-3 items-center">
                {/* Square Product Image */}
                <Link
                  href={`/product/${item.product.id}`}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-monarch-ivory"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="absolute top-1 left-1 text-[8px] font-nav uppercase tracking-wider bg-monarch-maroon text-white px-1.5 py-0.5 rounded">
                    HOT
                  </span>
                </Link>

                {/* Info & Price */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] font-nav uppercase tracking-wider text-monarch-gold-dark font-semibold block">
                    {item.trendTag}
                  </span>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="font-serif text-sm text-monarch-charcoal font-medium hover:text-monarch-maroon transition-colors line-clamp-1 block"
                  >
                    {item.trendName}
                  </Link>
                  <p className="text-[11px] font-serif font-bold text-monarch-maroon">
                    {FORMAT_CURRENCY(item.product.price)}
                  </p>
                </div>

                {/* View Button */}
                <Link
                  href={`/product/${item.product.id}`}
                  className="p-2 rounded-full bg-monarch-gold/15 hover:bg-monarch-gold text-monarch-maroon hover:text-white transition-colors shrink-0"
                  title="View Ensemble"
                >
                  <Eye className="w-4 h-4" />
                </Link>
              </div>

              {/* Sub-note */}
              <div className="mt-2.5 pt-2 border-t border-monarch-beige/30 text-[11px] text-monarch-charcoal/70 font-sans line-clamp-1">
                {item.highlight}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
