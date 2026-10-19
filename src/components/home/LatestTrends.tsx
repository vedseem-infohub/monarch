'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { LATEST_TRENDS_DATA } from '@/data/latestTrends';
import { TrendDeckCard } from './TrendDeckCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const LatestTrends: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const products = LATEST_TRENDS_DATA.products;
  const total = products.length;
  const currentProduct = products[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleSelectCategory = (categorySlug: string) => {
    const foundIdx = products.findIndex((p) => p.rangeCategorySlug === categorySlug);
    if (foundIdx !== -1) {
      setActiveIndex(foundIdx);
    }
  };

  useGSAP(
    () => {
      const elements = sectionRef.current?.querySelectorAll('.trends-col');
      if (!elements || elements.length === 0) return;

      const ctx = gsap.fromTo(
        elements,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="latest-trends"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#EEF2F6] text-[#141416] relative overflow-hidden select-none border-t border-monarch-gold/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* ======================================================== */}
          {/* 1. LEFT COLUMN: BOLD TYPOGRAPHY & STORIES               */}
          {/* ======================================================== */}
          <div className="trends-col lg:col-span-4 flex flex-col justify-between h-full space-y-8 sm:space-y-12">
            <div className="space-y-5">
              {/* Top Pill Button */}
              <Link
                href="/collections/all"
                className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/20 text-[11px] font-nav uppercase tracking-[0.22em] text-black/70 hover:border-black hover:text-black transition-colors backdrop-blur-sm"
              >
                {LATEST_TRENDS_DATA.eyebrow}
              </Link>

              {/* Giant Bold Headline Matching Screenshot Exactly */}
              <h2 className="font-sans font-black tracking-[-0.04em] text-[58px] sm:text-[76px] lg:text-[88px] leading-[0.88] text-[#141416] uppercase">
                {LATEST_TRENDS_DATA.headingPrimary}
                <br />
                {LATEST_TRENDS_DATA.headingSecondary}
              </h2>

              {/* Pill CTA Button (Crimson Maroon) */}
              <div className="pt-2">
                <Link
                  href={LATEST_TRENDS_DATA.ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7B1123] hover:bg-[#600C1B] text-white text-[11px] sm:text-xs font-nav uppercase tracking-[0.2em] font-medium shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span>{LATEST_TRENDS_DATA.ctaText}</span>
                </Link>
              </div>
            </div>

            {/* Bottom Story Behind The Drape */}
            <div className="pt-4 border-t border-black/10 max-w-[340px]">
              <h3 className="font-serif text-xl sm:text-2xl text-[#141416] font-normal leading-snug">
                {LATEST_TRENDS_DATA.storyHeading}
              </h3>
              <p className="text-xs sm:text-[13px] text-black/60 font-sans leading-relaxed mt-2">
                {currentProduct.storyBehindDrape || LATEST_TRENDS_DATA.storyDescription}
              </p>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 2. CENTER COLUMN: INTERACTIVE CARD DECK (TAAS KE PAATE)  */}
          {/* ======================================================== */}
          <div className="trends-col lg:col-span-5 flex flex-col items-center justify-center">
            {/* The Deck Container */}
            <div className="relative w-full max-w-[330px] sm:max-w-[380px] lg:max-w-[420px] aspect-[4/5] min-h-[440px] sm:min-h-[500px]">
              {products.map((product, idx) => (
                <TrendDeckCard
                  key={product.id}
                  product={product}
                  index={idx}
                  activeIndex={activeIndex}
                  totalCards={total}
                  onSwipeNext={handleNext}
                  onSwipePrev={handlePrev}
                />
              ))}
            </div>

            {/* Bottom Carousel Navigation Controls */}
            <div className="flex items-center justify-center gap-5 mt-7 sm:mt-9">
              <button
                type="button"
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-nav text-xs uppercase tracking-[0.25em] text-black/60 font-medium select-none">
                0{activeIndex + 1} / 0{total}
              </span>

              <button
                type="button"
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* 3. RIGHT COLUMN: EXPLORE THE RANGE                      */}
          {/* ======================================================== */}
          <div className="trends-col lg:col-span-3 flex flex-col justify-center">
            <h3 className="font-serif text-xl sm:text-2xl text-[#141416] font-normal mb-6">
              {LATEST_TRENDS_DATA.rangeHeading}
            </h3>

            <div className="divide-y divide-black/10 border-t border-b border-black/10">
              {LATEST_TRENDS_DATA.rangeCategories.map((cat) => {
                const isSelected = currentProduct.rangeCategorySlug === cat.slug;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.slug)}
                    className={`w-full py-4 flex items-center justify-between text-left transition-all duration-300 group cursor-pointer ${
                      isSelected
                        ? 'text-[#7B1123] font-medium'
                        : 'text-black/70 hover:text-black'
                    }`}
                  >
                    <span className="font-serif text-base sm:text-lg tracking-wide transition-transform group-hover:translate-x-1 duration-300">
                      {cat.name}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-nav uppercase tracking-widest text-black/40 group-hover:text-black/70 transition-colors">
                        {cat.count} Looks
                      </span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-all duration-300 ${
                          isSelected
                            ? 'opacity-100 translate-x-1 text-[#7B1123]'
                            : 'opacity-30 group-hover:opacity-100 group-hover:translate-x-1'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
