'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { Sparkles, Calendar, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Configurable Seasonal Special campaign items
const SEASONAL_ITEMS = [
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-001') || PRODUCTS[0],
    campaignTitle: 'Crimson Velvet Lehengas',
    seasonTag: 'Winter Wedding Gala',
    details: 'Heavy 420-hour zardozi embroidery with pure gold dabka',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-004') || PRODUCTS[1],
    campaignTitle: 'Midnight Bandhgalas',
    seasonTag: 'Royal Reception',
    details: 'Structured Italian wool-silk with bespoke brass crest buttons',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-007') || PRODUCTS[2],
    campaignTitle: 'Rose Gold Tissue Drapes',
    seasonTag: 'Festive Sangeet',
    details: 'Hand-scalloped zari borders with freshwater pearl droplets',
  },
  {
    product: PRODUCTS.find((p) => p.id === 'monarch-008') || PRODUCTS[3],
    campaignTitle: 'Darbar Benarasi Jackets',
    seasonTag: 'Celebration Edit',
    details: 'Ancestral 1840 Thatheri motifs woven in raised gold threads',
  },
];

export const SeasonalSpecial: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (trackRef.current) {
        gsap.from(trackRef.current.querySelectorAll('.seasonal-card'), {
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

  const handleQuickAdd = (product: typeof PRODUCTS[0]) => {
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 sm:py-18 bg-[#F7F0E5] text-monarch-charcoal relative overflow-hidden pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-monarch-gold/30">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-monarch-gold/20 border border-monarch-gold/40 text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-gold-dark font-medium">
              <Calendar className="w-3 h-3 text-monarch-gold-dark" />
              <span>Festive &amp; Wedding Season 2026</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl text-monarch-charcoal font-medium">
              Seasonal{' '}
              <span className="font-serif italic font-light text-monarch-gold-dark">
                Special
              </span>
            </h2>
          </div>

          <Link
            href="/collections/all"
            className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors"
          >
            Explore Season Vault
          </Link>
        </div>

        {/* 4 Seasonal Cards */}
        <div
          ref={trackRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {SEASONAL_ITEMS.map((item) => (
            <div
              key={item.campaignTitle}
              className="seasonal-card group flex flex-col bg-white rounded-xl overflow-hidden border border-monarch-beige/60 hover:border-monarch-gold transition-all duration-300 shadow-sm hover:shadow-lg p-3"
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
                  />
                  <span className="absolute top-1 left-1 text-[8px] font-nav uppercase tracking-wider bg-monarch-gold text-monarch-burgundy px-1.5 py-0.5 rounded font-semibold">
                    EDITION
                  </span>
                </Link>

                {/* Info & Price */}
                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[9px] font-nav uppercase tracking-wider text-monarch-gold-dark font-semibold block">
                    {item.seasonTag}
                  </span>
                  <Link
                    href={`/product/${item.product.id}`}
                    className="font-serif text-sm text-monarch-charcoal font-medium hover:text-monarch-maroon transition-colors line-clamp-1 block"
                  >
                    {item.campaignTitle}
                  </Link>
                  <p className="text-[11px] font-serif font-bold text-monarch-maroon">
                    {FORMAT_CURRENCY(item.product.price)}
                  </p>
                </div>

                {/* Quick Add Bag Button */}
                <button
                  onClick={() => handleQuickAdd(item.product)}
                  className="p-2 rounded-full bg-monarch-maroon/10 hover:bg-monarch-maroon text-monarch-maroon hover:text-white transition-colors shrink-0"
                  title="Add to Shopping Bag"
                  aria-label="Add to Bag"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-note */}
              <div className="mt-2.5 pt-2 border-t border-monarch-beige/30 text-[11px] text-monarch-charcoal/70 font-sans line-clamp-1">
                {item.details}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
