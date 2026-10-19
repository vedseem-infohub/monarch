'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. Top Guarantee Marquee Items
const MARQUEE_ITEMS = [
  'Pure Zari, Tested & Hallmarked',
  'Authentic Handloom Kashi Kadwa',
  'Bespoke Tailoring by Master Artisans',
  'Ancestral Awadhi Embroidery',
  'Worldwide Insured Express Delivery',
  '15-Day Authenticity Guarantee',
  'Complimentary Bridal Styling',
];

// 2. Six Moods of Silk - Authentic Indian Handloom Thumbnails
const CRAFT_MOODS = [
  {
    title: 'Kanjivaram Silk',
    slug: 'designer-sarees',
    colorName: 'Royal Sapphire',
    accentColor: '#1A365D',
    image: '/images/moods/kanjivaram_silk.jpg',
  },
  {
    title: 'Banarasi Brocade',
    slug: 'designer-sarees',
    colorName: 'Imperial Crimson',
    accentColor: '#5A1725',
    image: '/images/moods/banarasi_brocade.jpg',
  },
  {
    title: 'Chanderi Heritage',
    slug: 'festive-wear',
    colorName: 'Haldi Ochre',
    accentColor: '#9A7737',
    image: '/images/moods/chanderi_heritage.jpg',
  },
  {
    title: 'Paithani Heirloom',
    slug: 'designer-sarees',
    colorName: 'Gulabi Ruby',
    accentColor: '#7A2436',
    image: '/images/moods/paithani_heirloom.jpg',
  },
  {
    title: 'Tussar Silk',
    slug: 'festive-wear',
    colorName: 'Forest Emerald',
    accentColor: '#1E3A2F',
    image: '/images/moods/tussar_silk.jpg',
  },
  {
    title: 'Pure Organza',
    slug: 'designer-sarees',
    colorName: 'Rose Champagne',
    accentColor: '#8E703E',
    image: '/images/moods/pure_organza.jpg',
  },
];

// 3. Wide Panoramic Fashion Image Ensembles - Matching User Screenshot exactly
const PANORAMIC_ITEMS = [
  {
    id: 'monarch-011',
    title: 'Janki Courtyard Silk',
    tag: 'Awadhi Karchob Flora',
    craft: 'Hand-Stretched 3D Dabka',
    price: '₹ 2,60,000',
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/monarch-011',
  },
  {
    id: 'monarch-012',
    title: 'Tara Peacock Paithani',
    tag: 'Ancestral Pitloom Weft',
    craft: 'Certified Silk Mark Guild',
    price: '₹ 2,30,000',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-012',
  },
  {
    id: 'monarch-003',
    title: 'Aarunya Emerald Kanjivaram',
    tag: 'Pure Zari Weft',
    craft: '24K Gold Electroplated Zari',
    price: '₹ 2,45,000',
    image: '/images/panoramic/ensemble_aarunya.jpg',
    href: '/product/monarch-003',
  },
  {
    id: 'monarch-001',
    title: 'Rukmini Temple Silk',
    tag: 'Authentic Kashi Kadwa',
    craft: 'Ancestral Varanasi Pitloom',
    price: '₹ 2,85,000',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/monarch-001',
  },
  {
    id: 'monarch-005',
    title: 'Saanjh Mystery Banarasi',
    tag: 'Hand-Hammered Mukaish',
    craft: 'Pure Micro-Velvet & Gota',
    price: '₹ 2,15,000',
    image: '/images/panoramic/ensemble_saanjh.jpg',
    href: '/product/monarch-005',
  },
  {
    id: 'monarch-007',
    title: 'Prerna Festive Tissue',
    tag: 'Metallic Silk Weave',
    craft: 'Rose-Gold Gossamer Weft',
    price: '₹ 1,95,000',
    image: '/images/panoramic/ensemble_prerna.jpg',
    href: '/product/monarch-007',
  },
  {
    id: 'monarch-008',
    title: 'Gulabi Ruby Brocade',
    tag: 'Imperial Shikargah Weft',
    craft: 'Ancestral Varanasi Weft',
    price: '₹ 2,75,000',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-008',
  },
];

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const moodsRailRef = useRef<HTMLDivElement>(null);
  const ribbonMaskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const activeBadgeRef = useRef<HTMLSpanElement>(null);
  const currentActiveIdxRef = useRef<number>(0);

  // useGSAP handles animation lifecycle cleanly without memory leaks
  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLAnchorElement => Boolean(c));
      const progress = progressBarRef.current;
      const heading = headingContainerRef.current;
      const moods = moodsRailRef.current;

      if (!section || !pinWrapper || !track || cards.length === 0) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        track.scrollLeft = 0;

        // 1. Smooth entrance reveal
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        if (heading) {
          const words = heading.querySelectorAll('.heading-word');
          entranceTl.from(
            words,
            {
              yPercent: 80,
              opacity: 0,
              duration: 0.7,
              stagger: 0.05,
              ease: 'power3.out',
            },
            0
          );
        }

        if (moods) {
          const thumbs = moods.querySelectorAll('.mood-thumb');
          entranceTl.from(
            thumbs,
            {
              y: 20,
              opacity: 0,
              scale: 0.95,
              duration: 0.6,
              stagger: 0.04,
              ease: 'power2.out',
            },
            0.1
          );
        }

        // 2. Measure travel and set up pinned scrub with increased scroll pin height
        const getTravelDistance = () => {
          const trackWidth = track.scrollWidth;
          const containerWidth = pinWrapper.clientWidth;
          return Math.max(0, trackWidth - containerWidth + 96);
        };

        const travel = getTravelDistance();
        // Substantially increased scroll pin height for a leisurely, ultra-smooth traversal
        const pinScrollDistance = Math.max(3800, Math.round(travel * 2.8));

        // Precompute card static offsets ONCE in memory to completely eliminate DOM reads during scroll
        const cardCenters = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);

        // GPU quickSetters for instant hardware-accelerated transforms (0 GC, 0 layout reflows)
        const cardSetters = cards.map((card) => ({
          setY: gsap.quickSetter(card, 'y', 'px'),
          setRot: gsap.quickSetter(card, 'rotation', 'deg'),
          setScale: gsap.quickSetter(card, 'scale'),
        }));

        // Dynamic curve computation: cards arch gracefully across the viewport
        const applyCurvature = (progressVal: number) => {
          const currentTrackX = -travel * progressVal;
          const viewportCenter = window.innerWidth / 2;
          const curveSpan = window.innerWidth * 0.54;

          for (let idx = 0; idx < cards.length; idx++) {
            const screenX = cardCenters[idx] + currentTrackX;
            const dist = screenX - viewportCenter;
            const normalized = dist / curveSpan;
            const clamped = Math.max(-1.3, Math.min(1.3, normalized));

            // Upward parabolic arch (center card is highest, sides drop down smoothly)
            const yDrop = Math.pow(Math.abs(clamped), 1.85) * 52;
            // Tangent rotation along the curved contour
            const rot = clamped * 6.8;
            // Subtle perspective scale
            const scale = 1 - Math.pow(Math.abs(clamped), 2) * 0.04;

            const setters = cardSetters[idx];
            if (setters) {
              setters.setY(yDrop);
              setters.setRot(rot);
              setters.setScale(scale);
            }
          }
        };

        // Initialize curve state immediately on mount
        applyCurvature(0);

        // Set initial active card styling
        if (cards[0]) {
          cards[0].classList.add('border-monarch-gold', 'ring-1', 'ring-monarch-gold/50');
          cards[0].classList.remove('border-monarch-gold/30');
        }

        // Main scrubbed pinned timeline
        // scrub: 0.2 provides crisp, responsive 1:1 coupling with Lenis smooth scroll without sluggish double-lag
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            pin: pinWrapper,
            start: 'top top',
            end: () => `+=${pinScrollDistance}`,
            scrub: 0.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) {
                progress.style.width = `${Math.round(self.progress * 100)}%`;
              }

              // Fast math-only active index tracking without React re-renders
              const cardIdx = Math.min(
                cards.length - 1,
                Math.max(0, Math.floor(self.progress * cards.length))
              );

              if (cardIdx !== currentActiveIdxRef.current) {
                currentActiveIdxRef.current = cardIdx;
                if (activeBadgeRef.current) {
                  activeBadgeRef.current.textContent = `Ensemble 0${cardIdx + 1} of 0${cards.length}`;
                }
                cards.forEach((c, i) => {
                  if (i === cardIdx) {
                    c.classList.add('border-monarch-gold', 'ring-1', 'ring-monarch-gold/50');
                    c.classList.remove('border-monarch-gold/30');
                  } else {
                    c.classList.remove('border-monarch-gold', 'ring-1', 'ring-monarch-gold/50');
                    c.classList.add('border-monarch-gold/30');
                  }
                });
              }

              applyCurvature(self.progress);
            },
          },
        });

        // Horizontal track translation
        scrubTl.fromTo(
          track,
          { x: 0 },
          {
            x: () => -getTravelDistance(),
            ease: 'none',
            duration: 1,
          },
          0
        );
      } else {
        // Mobile / Tablet: Smooth unpinned view with a gentle static arc
        cards.forEach((card, idx) => {
          const centerIdx = (cards.length - 1) / 2;
          const diff = (idx - centerIdx) / centerIdx;
          const yDrop = Math.pow(Math.abs(diff), 2) * 16;
          const rot = diff * 2.5;
          gsap.set(card, { y: yDrop, rotation: rot });
        });
      }

      ScrollTrigger.refresh();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="woven-to-be-remembered"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden"
    >
      {/* Pinned Viewport Container for Scroll Animation */}
      <div
        ref={pinWrapperRef}
        className="w-full flex flex-col justify-between min-h-screen pt-12 lg:pt-14 pb-4 relative overflow-hidden bg-[#FAF6F0]"
      >
        {/* 1. Top Luxury Ticker Marquee Ribbon */}
        <div className="w-full bg-[#3F101A] text-monarch-gold-light py-1.5 overflow-hidden border-y border-monarch-gold/30 shrink-0">
          <div className="flex animate-marquee whitespace-nowrap">
            {Array.from({ length: 4 }).map((_, repeatIdx) => (
              <div key={repeatIdx} className="flex items-center gap-8 mx-4">
                {MARQUEE_ITEMS.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6 text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em]">
                    <span>{item}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold shrink-0" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Upper Editorial Content: SIX MOODS & Section Heading */}
        <div className="w-full shrink-0 pt-2 lg:pt-2.5">
          {/* SIX MOODS Craft Category Rail */}
          <div ref={moodsRailRef} className="mb-2">
            <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-monarch-gold/20 max-w-5xl mx-auto w-full px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="font-nav text-xs sm:text-sm uppercase tracking-[0.28em] font-bold text-monarch-charcoal">
                  SIX MOODS.
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-monarch-gold" />
                <span className="hidden sm:inline-block text-[11px] font-nav uppercase tracking-widest text-monarch-maroon font-semibold">
                  Curated Heritage Categories
                </span>
              </div>
              <span className="text-[11px] font-sans text-monarch-charcoal/60 tracking-wide">
                Pure Handloom Silks
              </span>
            </div>

            {/* Compact Royal Arch Thumbnails */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-5 px-4 max-w-5xl mx-auto w-full overflow-x-auto sm:overflow-visible no-scrollbar pb-0.5">
              {CRAFT_MOODS.map((mood) => (
                <Link
                  key={mood.title}
                  href={`/collections/${mood.slug}`}
                  className="mood-thumb group flex flex-col items-center text-center w-[72px] sm:w-[84px] lg:w-[94px] shrink-0 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="w-full aspect-[3.2/3.8] rounded-t-full rounded-b-md overflow-hidden bg-monarch-charcoal border border-monarch-gold/35 group-hover:border-monarch-gold shadow-sm group-hover:shadow-md transition-all duration-500 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mood.image}
                      alt={mood.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>
                  <span className="font-serif text-[11px] sm:text-xs text-monarch-charcoal font-medium mt-1 group-hover:text-monarch-maroon transition-colors line-clamp-1">
                    {mood.title}
                  </span>
                  <span className="text-[9px] font-nav uppercase tracking-wider text-monarch-gold-dark font-medium">
                    Explore
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Section Editorial Heading: THE VAULT SIGNATURES / Woven to Be Remembered */}
          <div
            ref={headingContainerRef}
            className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex items-end justify-between my-1 sm:my-2"
          >
            <div>
              <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold mb-0.5">
                THE VAULT SIGNATURES
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight text-monarch-charcoal leading-none">
                <span className="heading-word inline-block font-display">Woven</span>{' '}
                <span className="heading-word inline-block font-display">to</span>{' '}
                <span className="heading-word inline-block font-display">Be</span>{' '}
                <span className="heading-word inline-block font-serif italic text-monarch-gold-dark font-light ml-1 text-[1.14em]">
                  Remembered
                </span>
              </h2>
            </div>

            <Link
              href="/collections/all"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-widest text-monarch-charcoal/70 hover:text-monarch-maroon transition-colors group pb-0.5 border-b border-monarch-gold/30 hover:border-monarch-maroon"
            >
              <span>Explore All ({PANORAMIC_ITEMS.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 3. Curved Panoramic Fashion Image Strip */}
        <div
          ref={ribbonMaskRef}
          className="relative w-full overflow-hidden select-none my-auto py-2"
        >
          {/* Horizontal Track Container with Curved Cards */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 lg:gap-6 items-end px-6 sm:px-12 lg:px-16 w-max overflow-x-auto lg:overflow-visible no-scrollbar pb-3 pt-2"
          >
            {PANORAMIC_ITEMS.map((item, index) => (
              <Link
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                href={item.href}
                className="panoramic-card shrink-0 w-[240px] sm:w-[270px] lg:w-[295px] h-[385px] sm:h-[420px] lg:h-[450px] group relative rounded-2xl overflow-hidden bg-monarch-charcoal shadow-xl hover:shadow-2xl transition-[box-shadow,border-color] duration-300 border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-4 sm:p-5 will-change-transform transform-gpu select-none"
                style={{
                  transformOrigin: '50% 85%',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {/* Background Luxury Fashion Model Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 pointer-events-none"
                  loading="eager"
                  decoding="async"
                />

                {/* Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-[#16070B]/35 to-transparent opacity-95 group-hover:opacity-85 transition-opacity pointer-events-none" />

                {/* Top Badge: Ensemble Index */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                  <span className="text-[10px] font-mono text-monarch-gold-light bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-monarch-gold/30">
                    0{index + 1} / 0{PANORAMIC_ITEMS.length}
                  </span>
                </div>

                {/* Bottom Editorial Content */}
                <div className="relative z-10 space-y-1.5 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="inline-block text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-monarch-gold-light border border-monarch-gold/30">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-base sm:text-lg lg:text-xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <p className="text-[11px] font-sans text-monarch-beige/80 line-clamp-1">
                    {item.craft}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white border-t border-monarch-gold/20">
                    <span className="font-serif font-bold text-monarch-gold-light text-sm sm:text-base">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-monarch-gold group-hover:text-white transition-colors">
                      <span>View Ensemble</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Progress Tracker Bar */}
          <div className="max-w-xs mx-auto px-6 mt-3 hidden lg:flex flex-col items-center gap-1.5">
            <div className="w-full h-1 bg-monarch-beige/40 rounded-full overflow-hidden border border-monarch-gold/20">
              <div
                ref={progressBarRef}
                className="h-full bg-gradient-to-r from-monarch-gold-dark via-monarch-gold to-monarch-gold-light transition-all duration-75 ease-out"
                style={{ width: '14%' }}
              />
            </div>
            <div className="flex items-center justify-between w-full text-[9px] font-nav uppercase tracking-widest text-monarch-charcoal/60">
              <span>Scroll to traverse vault</span>
              <span ref={activeBadgeRef}>
                Ensemble 01 of 0{PANORAMIC_ITEMS.length}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Bottom Archive Link */}
        <div className="text-center shrink-0 pt-1 pb-1">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-[11px] font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-all group"
          >
            <span>Discover The Complete Royal Archives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
