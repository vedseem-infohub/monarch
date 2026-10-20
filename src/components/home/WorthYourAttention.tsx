'use client';

import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SectionHeader } from '@/components/home/shared/SectionHeader';
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
        { opacity: 0.85, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            refreshPriority: 1,
            toggleActions: 'play none none none',
          },
        }
      );

      return () => {
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [] }
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
        {/* Full Section Header with Eyebrow, Title, Description, and Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <SectionHeader
            eyebrow={WORTH_YOUR_ATTENTION_DATA.eyebrow}
            title="Worth Your"
            italicWord="Attention"
            description={WORTH_YOUR_ATTENTION_DATA.description}
            align="left"
            className="mb-0"
          />

          <div className="flex items-center gap-4 shrink-0">
            <Link
              href={WORTH_YOUR_ATTENTION_DATA.ctaHref}
              className="text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors"
            >
              {WORTH_YOUR_ATTENTION_DATA.ctaText}
            </Link>

            {/* Scroll Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                className="w-9 h-9 rounded-full border border-monarch-charcoal/20 hover:border-monarch-charcoal text-monarch-charcoal flex items-center justify-center transition-all hover:bg-black/5 active:scale-95 cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleScroll('right')}
                className="w-9 h-9 rounded-full border border-monarch-charcoal/20 hover:border-monarch-charcoal text-monarch-charcoal flex items-center justify-center transition-all hover:bg-black/5 active:scale-95 cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* X-Direction Scrollable Accordion Track */}
        <div className="relative w-full">
          {/* Subtle Fade Edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20 opacity-80" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20 opacity-80" />

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
                onActivate={() => setHoveredIndex(idx)}
                priority={idx <= 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
