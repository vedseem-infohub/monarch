'use client';

import React, { useState } from 'react';
import { TESTIMONIALS } from '@/data/craftsmanship';
import { ChevronLeft, ChevronRight, Quote, Sparkles } from 'lucide-react';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 lg:py-28 bg-[#240E14] text-monarch-ivory relative overflow-hidden">
      {/* Decorative Palace Jali Motif */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <div className="w-[600px] h-[800px] border border-monarch-gold rounded-t-full" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-monarch-maroon border border-monarch-gold/30 text-xs font-nav uppercase tracking-widest text-monarch-gold-light">
          <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
          <span>Royal Client Diary</span>
        </div>

        <Quote className="w-12 h-12 text-monarch-gold/40 mx-auto" />

        <div className="min-h-[160px] flex items-center justify-center">
          <blockquote className="font-serif italic text-xl sm:text-3xl text-monarch-ivory leading-relaxed font-light">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
        </div>

        <div className="space-y-1">
          <h4 className="font-serif text-lg text-monarch-gold-light font-medium tracking-wide">
            {current.author}
          </h4>
          <p className="text-xs font-nav uppercase tracking-widest text-monarch-beige/70">
            {current.occasion} · {current.city}
          </p>
          <p className="text-[11px] text-monarch-gold/80 font-sans italic pt-1">
            Ensemble: {current.productName}
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border border-monarch-gold/40 hover:border-monarch-gold bg-monarch-burgundy text-monarch-gold flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentIndex === idx
                    ? 'w-8 bg-monarch-gold'
                    : 'bg-monarch-gold/30 hover:bg-monarch-gold/60'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-full border border-monarch-gold/40 hover:border-monarch-gold bg-monarch-burgundy text-monarch-gold flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[10px] text-monarch-beige/40 font-sans pt-2">
          Curated excerpts from royal wedding commissions. Client identities preserved by couture accord.
        </p>
      </div>
    </section>
  );
};
