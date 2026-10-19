'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';
import { ArchedCard } from './ArchedCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AutumnWinter2026: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Scoped GSAP entrance animations matching project guidelines
  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.arched-card');
      if (!cards || cards.length === 0) return;

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'power3.out',
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="autumn-winter-2026"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 bg-[#FAF7F2] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Matching Screenshot 1 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          {/* Left: Season Tag & Display Title */}
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold" />
              <span className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold">
                {AUTUMN_WINTER_DATA.tag}
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-monarch-charcoal leading-[1.08]">
              <span>{AUTUMN_WINTER_DATA.headingLine1}</span>{' '}
              <span className="block sm:inline">
                <span>{AUTUMN_WINTER_DATA.headingLine2}</span>{' '}
                <span className="font-serif italic font-light text-monarch-gold-dark text-[1.06em]">
                  {AUTUMN_WINTER_DATA.headingYear}
                </span>
              </span>
            </h2>
          </div>

          {/* Middle & Right: Editorial Description + Link */}
          <div className="flex flex-col sm:flex-row sm:items-end lg:items-center justify-between lg:justify-end gap-6 max-w-2xl lg:pb-2">
            <p className="text-xs sm:text-sm text-monarch-charcoal/75 font-sans leading-relaxed max-w-md">
              {AUTUMN_WINTER_DATA.description}
            </p>

            <Link
              href={AUTUMN_WINTER_DATA.ctaHref}
              className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-monarch-maroon hover:text-monarch-maroon-dark font-semibold pb-1 border-b border-monarch-maroon/30 hover:border-monarch-maroon transition-all group shrink-0"
            >
              <span>{AUTUMN_WINTER_DATA.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* 3 Arched Cards Grid: Matching Screenshot 1 Cathedral Windows */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8"
        >
          {AUTUMN_WINTER_DATA.campaigns.map((item, index) => (
            <ArchedCard key={item.id} item={item} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
