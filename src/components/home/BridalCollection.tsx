'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BRIDAL_ENSEMBLES, BridalEnsemble } from '@/data/bridal';
import { BridalCard } from './BridalCard';
import { CurvedDivider } from '@/components/home/shared/CurvedDivider';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BridalCollection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bigImgRef = useRef<HTMLImageElement>(null);
  const bigTextRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const activeEnsemble: BridalEnsemble = BRIDAL_ENSEMBLES[activeIndex] || BRIDAL_ENSEMBLES[0];

  // Automatic silent auto-change of the Big Card every 4 seconds (no play button)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % BRIDAL_ENSEMBLES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Smooth GSAP crossfade on the Big Card whenever activeIndex changes
  useEffect(() => {
    if (bigImgRef.current) {
      gsap.fromTo(
        bigImgRef.current,
        { opacity: 0.35, scale: 1.05 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (bigTextRef.current) {
      gsap.fromTo(
        bigTextRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeIndex]);

  // Scoped GSAP ScrollTrigger entrance animations using useGSAP
  useGSAP(
    () => {
      gsap.fromTo(
        '.bridal-reveal',
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
            toggleActions: 'play none none none',
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0E0507] text-monarch-ivory overflow-hidden"
    >
      {/* Top curved divider transitioning from light ivory to deep dark royal velvet */}
      <CurvedDivider direction="toDark" />

      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Big Interactive Featured Bridal Card (Matches Screenshot) */}
          <div className="bridal-reveal lg:col-span-5 flex flex-col">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full h-full min-h-[480px] sm:min-h-[560px] lg:min-h-[620px] rounded-2xl overflow-hidden border border-monarch-gold/40 shadow-2xl bg-black flex flex-col justify-between p-6 sm:p-8 group"
            >
              {/* Background Model Image with smooth crossfade */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={bigImgRef}
                src={activeEnsemble.image}
                alt={activeEnsemble.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-104 pointer-events-none"
                loading="eager"
                decoding="async"
              />

              {/* Gradient Scrim & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30 pointer-events-none" />

              {/* Top Floating Badge & Category */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-monarch-gold/40 text-[10px] sm:text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold-light">
                  <Sparkles className="w-3.5 h-3.5 text-monarch-gold animate-pulse" />
                  <span>{activeEnsemble.categoryName}</span>
                </div>

                <span className="text-[11px] font-mono text-monarch-gold-light bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-monarch-gold/30">
                  0{activeIndex + 1} / 0{BRIDAL_ENSEMBLES.length}
                </span>
              </div>

              {/* Bottom Featured Content Bar (Matches Screenshot) */}
              <div ref={bigTextRef} className="relative z-10 flex items-end justify-between gap-4 mt-auto">
                <div className="space-y-1.5 max-w-[70%]">
                  <p className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-semibold">
                    {activeEnsemble.craft}
                  </p>

                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-medium text-white line-clamp-1">
                    {activeEnsemble.name}
                  </h3>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="font-serif text-base sm:text-lg font-bold text-monarch-gold-light">
                      {activeEnsemble.formattedPrice}
                    </span>
                    <span className="text-white/40">·</span>
                    <Link
                      href="/wedding"
                      className="font-serif text-sm sm:text-base text-white hover:text-monarch-gold underline underline-offset-4 transition-colors"
                    >
                      View the collection
                    </Link>
                  </div>
                </div>

                {/* White Square Button with Arrow (Matches user screenshot) */}
                <Link
                  href={activeEnsemble.href}
                  className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 bg-white hover:bg-monarch-gold text-black rounded-xl flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 group/btn"
                  title={`View ${activeEnsemble.name}`}
                  aria-label="View ensemble details"
                >
                  <ArrowUpRight className="w-5 h-5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: "The Bridal Collection" Heading & Continuous Marquee */}
          <div className="bridal-reveal lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Header: "The Bridal Collection" */}
            <div className="border-b border-monarch-gold/25 pb-4">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                The Bridal{' '}
                <span className="font-serif italic text-monarch-gold-light font-light ml-1">
                  Collection
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-monarch-beige/80 font-sans mt-1.5 max-w-xl">
                Woven with certified pure silver-gilt zari, genuine Kashi Kadwa brocades, and 24K gold-dipped dabka. Ensembles curated for sacred wedding rituals, grand baithaks, and royal pheras.
              </p>
            </div>

            {/* Continuous Marquee Track (Seamless Loop, Pauses on Hover) */}
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full overflow-hidden select-none py-2"
            >
              {/* Subtle edge fade scrims */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-[#0E0507] to-transparent z-10" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-[#0E0507] to-transparent z-10" />

              <div
                className="flex gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-2"
                style={{ animationDuration: '32s' }}
              >
                {/* Duplicated list for seamless infinite marquee loop */}
                {[...BRIDAL_ENSEMBLES, ...BRIDAL_ENSEMBLES].map((ensemble, idx) => {
                  const realIdx = idx % BRIDAL_ENSEMBLES.length;
                  const isCardActive = activeIndex === realIdx;

                  return (
                    <div key={`${ensemble.id}-${idx}`} className="shrink-0">
                      <BridalCard
                        ensemble={ensemble}
                        isActive={isCardActive}
                        onSelect={() => setActiveIndex(realIdx)}
                        priority={idx < 4}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Section Link */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-monarch-gold/20">
              <p className="text-xs text-monarch-beige/70 font-sans">
                Hover to pause marquee and inspect or click any card to spotlight in the featured window.
              </p>

              <Link
                href="/wedding"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-monarch-maroon to-monarch-burgundy hover:brightness-110 text-white font-nav text-[11px] uppercase tracking-[0.2em] font-semibold border border-monarch-gold/40 transition-all shadow-md group shrink-0"
              >
                <span>EXPLORE COMPLETE BRIDAL VAULT</span>
                <ArrowRight className="w-3.5 h-3.5 text-monarch-gold group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom curved divider transitioning back to light ivory */}
      <CurvedDivider direction="toLight" />
    </section>
  );
};
