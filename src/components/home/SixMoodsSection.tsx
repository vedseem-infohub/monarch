'use client';

import React from 'react';
import Link from 'next/link';

// Top Guarantee Marquee Items
const MARQUEE_ITEMS = [
  'Pure Zari, Tested & Hallmarked',
  'Authentic Handloom Kashi Kadwa',
  'Bespoke Tailoring by Master Artisans',
  'Ancestral Awadhi Embroidery',
  'Worldwide Insured Express Delivery',
  '15-Day Authenticity Guarantee',
  'Complimentary Bridal Styling',
];

// Six Moods of Silk - Authentic Handloom Categories (Matching Screenshot 1)
const SIX_MOODS = [
  {
    title: 'KANJIVARAM SILK',
    subtitle: 'Royal Temple Weave',
    slug: 'designer-sarees',
    image: '/images/moods/kanjivaram_silk.jpg',
  },
  {
    title: 'CHANDERI HERITAGE',
    subtitle: 'Gossamer Gold Weft',
    slug: 'festive-wear',
    image: '/images/moods/chanderi_heritage.jpg',
  },
  {
    title: 'TUSSAR SILK',
    subtitle: 'Forest Raw Mulberry',
    slug: 'festive-wear',
    image: '/images/moods/tussar_silk.jpg',
  },
  {
    title: 'PAITHANI HEIRLOOM',
    subtitle: 'Ancestral Peacock Pallu',
    slug: 'designer-sarees',
    image: '/images/moods/paithani_heirloom.jpg',
  },
  {
    title: 'BANARASI BROCADE',
    subtitle: 'Kashi Kadwa Gold Zari',
    slug: 'designer-sarees',
    image: '/images/moods/banarasi_brocade.jpg',
  },
  {
    title: 'PURE ORGANZA',
    subtitle: 'Ethereal Zari Sheer',
    slug: 'designer-sarees',
    image: '/images/moods/pure_organza.jpg',
  },
];

export const SixMoodsSection: React.FC = () => {
  return (
    <section id="six-moods" className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden">
      {/* 1. Top Luxury Marquee Ticker Ribbon */}
      <div className="w-full bg-[#3F101A] text-monarch-gold-light py-2 overflow-hidden border-y border-monarch-gold/30 shrink-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, repeatIdx) => (
            <div key={repeatIdx} className="flex items-center gap-8 mx-4">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em]"
                >
                  <span>{item}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Content: SIX MOODS Header & 6 Arch-Topped Cards (Matching Screenshot 1) */}
      <div className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-monarch-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.06em] text-monarch-charcoal">
                  SIX MOODS.
                </h2>
                <span className="font-serif italic text-monarch-gold-dark text-lg sm:text-xl font-light">
                  Six Shades of You
                </span>
              </div>
              <p className="text-xs sm:text-sm text-monarch-charcoal/70 mt-1.5 max-w-xl font-sans leading-relaxed">
                Six authentic Indian handloom silk traditions, each celebrating an irreplaceable mood of festive grandeur.
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-nav uppercase tracking-widest text-monarch-gold-dark font-medium">
              <span>Authentic Handloom Archives</span>
              <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold" />
            </div>
          </div>

          {/* 6 Large Architectural Arch Cards (rounded-t-full) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
            {SIX_MOODS.map((mood) => (
              <Link
                key={mood.title}
                href={`/collections/${mood.slug}`}
                className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Arch-topped Card */}
                <div className="w-full aspect-[3/4.6] rounded-t-full rounded-b-xl overflow-hidden bg-monarch-charcoal border border-monarch-gold/40 group-hover:border-monarch-gold shadow-md group-hover:shadow-xl transition-all duration-500 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="eager"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                </div>

                {/* Card Title & Subtitle */}
                <h3 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-monarch-charcoal mt-3 group-hover:text-monarch-maroon transition-colors line-clamp-1">
                  {mood.title}
                </h3>
                <span className="text-[10px] text-monarch-gold-dark/90 font-serif italic mt-0.5">
                  {mood.subtitle}
                </span>
                <span className="w-0 group-hover:w-6 h-0.5 bg-monarch-gold transition-all duration-300 mt-1 rounded-full" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
