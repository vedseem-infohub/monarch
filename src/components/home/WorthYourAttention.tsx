'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WORTH_YOUR_ATTENTION_DATA } from '@/data/worthYourAttention';
import { AttentionAccordionCard } from './AttentionAccordionCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const WorthYourAttention: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Default state is null: when not hovering, all cards remain in the quiet dark closed state
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const cards = scrollContainerRef.current?.querySelectorAll('.group');
      if (!cards || cards.length === 0) return;

      const ctx = gsap.fromTo(
        cards,
        { opacity: 0.4, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      return () => {
        clearTimeout(timer);
        ctx.revert();
      };
    },
    { scope: sectionRef }
  );

  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 320;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="worth-your-attention"
      ref={sectionRef}
      className="py-14 sm:py-20 bg-[#FAF7F2] text-[#1A1A1A] relative overflow-hidden select-none border-t border-monarch-gold/15"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimalist Section Header: Matching Screenshot Exactly */}
        <div className="flex items-center justify-between mb-7 sm:mb-9">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight text-[#1A1A1A] leading-tight">
            {WORTH_YOUR_ATTENTION_DATA.heading}
          </h2>

          {/* Minimalist Scroll Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="w-8 h-8 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="w-8 h-8 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* X-Direction Scrollable Accordion Track */}
        <div className="relative w-full">
          {/* Subtle Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20 opacity-80" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20 opacity-80" />

          {/* Smooth Scroll Container */}
          <div
            ref={scrollContainerRef}
            onMouseLeave={() => setHoveredIndex(null)}
            className="overflow-x-auto scroll-smooth pb-4 pt-1 scrollbar-none flex items-center gap-3 sm:gap-4 w-full"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {WORTH_YOUR_ATTENTION_DATA.products.map((product, idx) => (
              <AttentionAccordionCard
                key={product.id}
                product={product}
                index={idx}
                isActive={hoveredIndex === idx}
                isAnyActive={hoveredIndex !== null}
                onActivate={() => setHoveredIndex(idx)}
                onDeactivate={() => setHoveredIndex(null)}
                priority={idx <= 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
