'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

// The 2026 Signatures - Matching Screenshot 2 Curved Arc
const SIGNATURE_ENSEMBLES = [
  {
    id: 'monarch-011',
    title: 'Janki Courtyard Silk',
    tag: 'Awadhi Karchob Flora',
    price: '₹ 2,60,000',
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/monarch-011',
    arcY: 22,
    arcRot: -3.5,
  },
  {
    id: 'monarch-012',
    title: 'Tara Peacock Paithani',
    tag: 'Ancestral Pitloom Weft',
    price: '₹ 2,30,000',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-012',
    arcY: 9,
    arcRot: -1.8,
  },
  {
    id: 'monarch-003',
    title: 'Aarunya Emerald Kanjivaram',
    tag: 'Pure Zari Weft',
    price: '₹ 2,45,000',
    image: '/images/panoramic/ensemble_aarunya.jpg',
    href: '/product/monarch-003',
    arcY: 0,
    arcRot: -0.5,
  },
  {
    id: 'monarch-001',
    title: 'Rukmini Temple Silk',
    tag: 'Authentic Kashi Kadwa',
    price: '₹ 2,85,000',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/monarch-001',
    arcY: 0,
    arcRot: 0.5,
  },
  {
    id: 'monarch-005',
    title: 'Saanjh Mystery Banarasi',
    tag: 'Hand-Hammered Mukaish',
    price: '₹ 2,15,000',
    image: '/images/panoramic/ensemble_saanjh.jpg',
    href: '/product/monarch-005',
    arcY: 9,
    arcRot: 1.8,
  },
  {
    id: 'monarch-007',
    title: 'Prerna Festive Tissue',
    tag: 'Metallic Silk Weave',
    price: '₹ 1,95,000',
    image: '/images/panoramic/ensemble_prerna.jpg',
    href: '/product/monarch-007',
    arcY: 22,
    arcRot: 3.5,
  },
];

export const WovenToBeRemembered: React.FC = () => {
  return (
    <section
      id="woven-to-be-remembered"
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden pt-12 sm:pt-16 pb-16 sm:pb-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row: THE 2026 SIGNATURES / Woven to Be Remembered */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold mb-1">
              THE 2026 SIGNATURES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[42px] font-normal tracking-tight text-monarch-charcoal leading-none">
              <span>Woven</span> <span>to</span> <span>Be</span>{' '}
              <span className="font-serif italic text-monarch-gold-dark font-light ml-1">
                Remembered
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-monarch-charcoal/60">
              Curated 01 / 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold" />
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-widest text-monarch-maroon hover:text-monarch-maroon-dark transition-colors font-semibold group"
            >
              <span>Explore All (06)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 6 Curved Panoramic Cards (Matching Screenshot 2 Arc Ribbon) */}
        <div className="w-full overflow-x-auto lg:overflow-visible no-scrollbar pb-6 pt-3">
          <div className="flex lg:grid lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-3.5 xl:gap-4 items-end min-w-max lg:min-w-0 px-2 lg:px-0">
            {SIGNATURE_ENSEMBLES.map((item, index) => (
              <Link
                key={item.id}
                href={item.href}
                className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-monarch-charcoal shadow-lg hover:shadow-2xl transition-all duration-500 border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end w-[220px] sm:w-[240px] lg:w-auto aspect-[3/4.6] shrink-0"
                style={{
                  transform: `translateY(${item.arcY}px) rotate(${item.arcRot}deg)`,
                  transformOrigin: '50% 90%',
                }}
              >
                {/* Model Photo from existing images */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                  decoding="async"
                />

                {/* Dark Gradient Scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />

                {/* Top Index Pill */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="text-[9px] font-mono text-monarch-gold-light bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-monarch-gold/30">
                    0{index + 1}
                  </span>
                </div>

                {/* Bottom Text Content (Matching Screenshot 2) */}
                <div className="relative z-10 p-3 sm:p-3.5 space-y-1">
                  <span className="inline-block text-[8px] sm:text-[9px] font-nav uppercase tracking-[0.18em] text-monarch-gold-light/90">
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-xs sm:text-[13px] lg:text-[14px] text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="pt-1 flex items-center justify-between text-[10px] sm:text-[11px] font-nav uppercase tracking-wider text-monarch-beige/90 border-t border-monarch-gold/20">
                    <span className="font-serif font-bold text-monarch-gold-light">
                      {item.price}
                    </span>
                    <span className="text-[9px] text-monarch-gold group-hover:text-white transition-colors">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Archive Link */}
        <div className="text-center pt-8">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.22em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
            <span>Discover The Complete Royal Archives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
