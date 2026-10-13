'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CurvedDivider } from '@/components/home/shared/CurvedDivider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Signature Trend Chapters
const TREND_STORIES = [
  {
    id: 'trend-1',
    title: 'Temple Steps',
    tagline: 'SACRED ARCHITECTURE & KADWA BROCADES',
    description: 'Inspired by ancient riverfront ghats and temple pavilions. Intricate lotus motifs hand-shuttled with certified pure gold zari.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop',
    href: '/collections/designer-sarees',
  },
  {
    id: 'trend-2',
    title: 'Courtyard Air',
    tagline: 'LIGHT-SCATTERING SHEER SILK TISSUE',
    description: 'Capturing the golden haze of palace courtyards. Hand-hammered mukaish specks and scalloped pearls that catch every candle flare.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=70&w=700&auto=format&fit=crop',
    href: '/collections/all',
  },
  {
    id: 'trend-3',
    title: 'Darbar Baithak',
    tagline: 'IMPERIAL VELVETS & HEAVY ZARDOZI',
    description: 'The ceremonial gravitas of royal courts. 32-panel flared kalidars finished with 24K gold-dipped dabka work.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=70&w=700&auto=format&fit=crop',
    href: '/collections/bridal-lehengas',
  },
  {
    id: 'trend-4',
    title: 'Royal Baithak',
    tagline: 'SAVILE ROW CUTS & AWADHI MARODI',
    description: 'Structured raw silk bandhgalas and achkans adorned with bespoke cast brass crest buttons.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=70&w=700&auto=format&fit=crop',
    href: '/men',
  },
];

export const LatestTrends: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);

  const activeStory = TREND_STORIES[activeStoryIdx];

  useEffect(() => {
    // Preload trend chapter images for instant interactive switching
    TREND_STORIES.forEach((story) => {
      const img = new Image();
      img.src = story.image;
    });

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.trends-reveal'), {
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#1F0A11] text-monarch-ivory overflow-hidden"
    >
      {/* Top curved divider transitioning from light ivory to deep burgundy */}
      <CurvedDivider direction="toDark" />

      <div
        ref={contentRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Bold Typography & Editorial Manifesto */}
          <div className="trends-reveal lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/35 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-medium">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
              <span>Editorial Lookbook</span>
            </div>

            <div>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-monarch-ivory leading-[1.05]">
                LATEST <br />
                <span className="font-serif italic font-light text-monarch-gold-light">
                  TRENDS
                </span>
              </h2>

              <p className="font-nav text-xs uppercase tracking-[0.25em] text-monarch-gold mt-4 font-semibold">
                Stories Behind The Drapes
              </p>

              <p className="font-sans text-xs sm:text-sm text-monarch-beige/80 mt-3 leading-relaxed">
                Discover the four aesthetic pillars shaping this year&rsquo;s celebratory wardrobe: from sacred temple brocades to ethereal rose gold tissue veils.
              </p>
            </div>

            {/* Pill CTA Button */}
            <div className="pt-2">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-monarch-maroon to-monarch-maroon-light hover:brightness-110 text-monarch-ivory border border-monarch-gold/60 font-nav text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl group"
              >
                <span>DISCOVER COMPLETE TRENDS</span>
                <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Trend Theater & Backdrop Showcase */}
          <div className="trends-reveal lg:col-span-7 space-y-6">
            {/* Main Featured Editorial Image Frame */}
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] border border-monarch-gold/40 shadow-2xl bg-black/60 group">
              {/* Background Campaign Image with Crossfade */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeStory.image}
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                decoding="async"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F0A11] via-[#1F0A11]/30 to-transparent" />

              {/* In-Frame Story Headline */}
              <div className="absolute bottom-6 inset-x-6 sm:inset-x-8 space-y-2">
                <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-monarch-gold/30">
                  {activeStory.tagline}
                </span>

                <h3 className="font-serif text-2xl sm:text-4xl text-monarch-ivory font-medium">
                  {activeStory.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-monarch-beige/85 max-w-lg line-clamp-2">
                  {activeStory.description}
                </p>
              </div>
            </div>

            {/* Horizontal Mini-Card Navigation Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TREND_STORIES.map((story, idx) => {
                const isActive = activeStoryIdx === idx;

                return (
                  <button
                    key={story.id}
                    onClick={() => setActiveStoryIdx(idx)}
                    className={`group relative rounded-xl overflow-hidden p-2 text-left border transition-all duration-300 ${
                      isActive
                        ? 'bg-monarch-maroon/80 border-monarch-gold shadow-lg scale-102 ring-1 ring-monarch-gold'
                        : 'bg-black/40 border-monarch-gold/25 hover:border-monarch-gold/60 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <span className="font-serif text-xs sm:text-sm text-monarch-ivory font-medium block truncate">
                      {story.title}
                    </span>
                    <span className="text-[9px] font-nav uppercase tracking-wider text-monarch-gold-light/80 block mt-0.5">
                      Chapter 0{idx + 1}
                    </span>
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
