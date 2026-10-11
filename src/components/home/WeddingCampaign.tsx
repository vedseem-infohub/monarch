'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const WeddingCampaign: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#1B080C] text-monarch-ivory relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-gold block font-semibold">
            The Wedding Edit 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-monarch-ivory">
            FOR THE MOMENTS <br className="hidden sm:inline" />
            <span className="italic font-light text-monarch-gold-light">THAT LAST FOREVER</span>
          </h2>
          <p className="text-xs sm:text-sm text-monarch-beige/80 font-sans max-w-xl mx-auto mt-2">
            Discover statement pieces crafted for celebrations, sacred ceremonies, and unforgettable beginnings. Custom coordinated bridal and groom ensembles.
          </p>
        </div>

        {/* Cinematic Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bridal Card */}
          <div className="group relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 border border-monarch-gold/30 shadow-2xl">
            {/* Background Editorial Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-108"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop')`,
              }}
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B080C] via-[#1B080C]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
                The Royal Bride
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-monarch-ivory font-medium">
                Bridal Lehengas &amp; Heirloom Sarees
              </h3>
              <p className="text-xs text-monarch-beige/80 max-w-md font-sans">
                Crimson micro-velvets, hand-pleated raw silks, and pure silver-gilt zari veils created to be passed down through generations.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/bridal-lehengas"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/50 text-xs font-nav uppercase tracking-widest transition-all"
                >
                  <span>Shop Bridal</span>
                  <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
                </Link>
              </div>
            </div>
          </div>

          {/* Groom Card */}
          <div className="group relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 border border-monarch-gold/30 shadow-2xl">
            {/* Background Editorial Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-108"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=70&w=700&auto=format&fit=crop')`,
              }}
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B080C] via-[#1B080C]/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
                The Imperial Groom
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-monarch-ivory font-medium">
                Raw Silk Sherwanis &amp; Achkans
              </h3>
              <p className="text-xs text-monarch-beige/80 max-w-md font-sans">
                Full canvas floating construction in ivory mulberry silk with subtle tone-on-tone marodi and hand-cast Jaipur brass crest buttons.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/sherwanis"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-monarch-ivory border border-monarch-gold/50 text-xs font-nav uppercase tracking-widest transition-all"
                >
                  <span>Shop Groom</span>
                  <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
