'use client';

import React from 'react';
import Link from 'next/link';
import { CRAFTSMANSHIP_PILLARS } from '@/data/craftsmanship';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#F7F0E5] text-monarch-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-monarch-gold/30 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon block mb-2 font-semibold">
              Ancestral Lineage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-monarch-charcoal font-medium">
              OUR CRAFTSMANSHIP
            </h2>
            <p className="text-xs sm:text-sm text-monarch-charcoal/80 font-sans mt-3">
              We collaborate with master artisan families across India to keep sacred handloom traditions, authentic bullion embroidery, and royal tailoring alive.
            </p>
          </div>

          <Link
            href="/our-craft"
            className="text-xs font-nav uppercase tracking-widest text-monarch-maroon hover:text-monarch-gold-dark flex items-center gap-1.5 font-semibold transition-colors"
          >
            <span>Explore The Craft Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CRAFTSMANSHIP_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group flex flex-col justify-between bg-white rounded-xl overflow-hidden border border-monarch-beige/60 hover:border-monarch-gold transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-monarch-charcoal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-nav uppercase tracking-wider bg-monarch-burgundy/90 text-monarch-gold-light px-2.5 py-1 rounded">
                  {pillar.artisanRegion}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold-dark font-semibold">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-monarch-charcoal font-medium mt-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-monarch-charcoal-light/80 font-sans mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-monarch-beige/30 text-[11px] font-nav text-monarch-maroon font-medium">
                  {pillar.technique}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
