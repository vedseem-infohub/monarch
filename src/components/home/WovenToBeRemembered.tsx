'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

// 3. Wide Panoramic Fashion Image Ensembles - Authentic Indian Heritage
const PANORAMIC_ITEMS = [
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
    title: 'Kalyani Temple Silk',
    tag: 'Authentic Kashi Kadwa',
    craft: 'Ancestral Varanasi Pitloom',
    price: '₹ 2,85,000',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/monarch-001',
  },
  {
    id: 'monarch-005',
    title: 'Saanjh Maroon Banarasi',
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
    id: 'monarch-011',
    title: 'Utsav Courtyard Silk',
    tag: 'Awadhi Karchob Flora',
    craft: 'Hand-Stretched 3D Dabka',
    price: '₹ 2,60,000',
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/monarch-011',
  },
  {
    id: 'monarch-012',
    title: 'Vara Peacock Paithani',
    tag: 'Ancestral Pitloom Weft',
    craft: 'Certified Silk Mark Guild',
    price: '₹ 2,30,000',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-012',
  },
];

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const headingContainerRef = useRef<HTMLDivElement>(null);
  const moodsRailRef = useRef<HTMLDivElement>(null);
  const ribbonMaskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktopLayout, setIsDesktopLayout] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkLayout = () => {
      setIsDesktopLayout(window.innerWidth >= 1024);
    };
    checkLayout();
    window.addEventListener('resize', checkLayout, { passive: true });

    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  // Coordinated GSAP Scroll Animation
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const ribbonMask = ribbonMaskRef.current;
      const heading = headingContainerRef.current;
      const moods = moodsRailRef.current;
      const progress = progressBarRef.current;

      if (!section || !pinWrapper || !track || !ribbonMask) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const isDesktop = window.innerWidth >= 1024;

      if (isDesktop) {
        // Reset scroll position on track
        track.scrollLeft = 0;

        // 1. One-time entrance reveal timeline as section enters viewport
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        });

        if (heading) {
          const words = heading.querySelectorAll('.heading-word');
          entranceTl.from(
            words,
            {
              yPercent: 100,
              opacity: 0,
              duration: 0.8,
              stagger: 0.07,
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
              y: 25,
              opacity: 0,
              scale: 0.95,
              duration: 0.7,
              stagger: 0.05,
              ease: 'power2.out',
            },
            0.1
          );
        }

        entranceTl.from(
          ribbonMask,
          { opacity: 0.8, scale: 0.98, duration: 0.7, ease: 'power2.out' },
          0.15
        );

        // 2. Pinned Scrubbed Timeline for Horizontal Ribbon Translation
        const getTravelDistance = () => {
          const trackWidth = track.scrollWidth;
          const containerWidth = pinWrapper.clientWidth;
          return Math.max(0, trackWidth - containerWidth + 72);
        };

        const travel = getTravelDistance();
        const pinScrollDistance = Math.max(1400, travel * 1.25);

        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinWrapper,
            pin: pinWrapper,
            start: 'top top',
            end: () => `+=${pinScrollDistance}`,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress) {
                progress.style.width = `${Math.round(self.progress * 100)}%`;
              }
              const cardIdx = Math.min(
                PANORAMIC_ITEMS.length - 1,
                Math.floor(self.progress * PANORAMIC_ITEMS.length)
              );
              setActiveIndex(cardIdx);
            },
          },
        });

        // Scrub horizontal translation
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

        // Subtle Cylindrical Depth Perspective across cards during scroll
        const cards = track.querySelectorAll('.panoramic-card');
        cards.forEach((card, idx) => {
          const initialAngle = (idx - 1) * 2;
          scrubTl.fromTo(
            card,
            { rotateY: initialAngle },
            {
              rotateY: -initialAngle,
              ease: 'power1.inOut',
              duration: 1,
            },
            0
          );
        });
      } else {
        // Mobile / Tablet: Smooth unpinned scroll-triggered reveals
        gsap.from(heading?.querySelectorAll('.heading-word') || [], {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          yPercent: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        });

        gsap.from(moods?.querySelectorAll('.mood-thumb') || [], {
          scrollTrigger: {
            trigger: moods,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 25,
          opacity: 0,
          scale: 0.95,
          duration: 0.7,
          stagger: 0.05,
          ease: 'power2.out',
        });

        gsap.from(ribbonMask, {
          scrollTrigger: {
            trigger: ribbonMask,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          scale: 0.97,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      ScrollTrigger.refresh();
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isDesktopLayout]);

  return (
    <>
      <section
        id="woven-to-be-remembered"
        ref={sectionRef}
        className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden"
      >
        {/* Pinned Viewport Container for Scroll Animation */}
        <div
          ref={pinWrapperRef}
          className="w-full flex flex-col justify-between min-h-screen pt-16 lg:pt-[72px] pb-4 relative overflow-hidden bg-[#FAF6F0]"
        >
          {/* 1. Top Luxury Ticker Marquee Ribbon */}
          <div className="w-full bg-[#3F101A] text-monarch-gold-light py-2 overflow-hidden border-y border-monarch-gold/30 shrink-0">
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

          {/* 2. Upper Editorial Content: SIX MOODS & Heading */}
          <div className="w-full shrink-0 pt-2 lg:pt-3">
            {/* SIX MOODS Craft Category Rail */}
            <div ref={moodsRailRef} className="mb-2 lg:mb-3">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-monarch-gold/20 max-w-5xl mx-auto w-full px-4 sm:px-6">
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
              <div className="flex items-center justify-center gap-2.5 sm:gap-4 lg:gap-5 px-4 max-w-5xl mx-auto w-full overflow-x-auto sm:overflow-visible no-scrollbar pb-1">
                {CRAFT_MOODS.map((mood) => (
                  <Link
                    key={mood.title}
                    href={`/collections/${mood.slug}`}
                    className="mood-thumb group flex flex-col items-center text-center w-[78px] sm:w-[92px] lg:w-[104px] shrink-0 transition-transform duration-300 hover:-translate-y-1"
                  >
                    <div className="w-full aspect-[3.2/4.2] rounded-t-full rounded-b-md overflow-hidden bg-monarch-charcoal border border-monarch-gold/35 group-hover:border-monarch-gold shadow-sm group-hover:shadow-md transition-all duration-500 relative">
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
                    <span className="text-[9px] font-nav uppercase tracking-wider text-monarch-gold-dark font-medium mt-0.5">
                      Explore
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Section Editorial Heading: Woven to Be Remembered */}
            <div
              ref={headingContainerRef}
              className="text-center max-w-3xl mx-auto my-4 lg:my-2 space-y-1 px-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 mt-7 rounded-full bg-monarch-maroon/10 border border-monarch-maroon/20 text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold">
                <Sparkles className="w-3 h-3 text-monarch-gold-dark" />
                <span>The Next Chapter · Living Heritage</span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl lg:text-[38px] font-medium tracking-tight text-monarch-charcoal leading-[1.1]">
                <span className="overflow-hidden inline-block align-bottom">
                  <span className="heading-word inline-block font-display">Woven</span>
                </span>{' '}
                <span className="overflow-hidden inline-block align-bottom">
                  <span className="heading-word inline-block font-display">to</span>
                </span>{' '}
                <span className="overflow-hidden inline-block align-bottom">
                  <span className="heading-word inline-block font-display">Be</span>
                </span>{' '}
                <span className="overflow-hidden inline-block align-bottom">
                  <span className="heading-word inline-block font-serif italic text-monarch-gold-dark font-light ml-1.5">
                    Remembered
                  </span>
                </span>
              </h2>

              <p className="text-xs sm:text-[13px] text-monarch-charcoal/70 font-sans leading-relaxed mb-6 max-w-lg mx-auto">
                Treasures of living handloom royalty. Every thread is an ancestral pledge to hand-spun elegance, pure silver-gilt zari, and celebratory silhouettes.
              </p>
            </div>
          </div>

          {/* 3. Wide Panoramic Fashion Image Strip */}
          <div
            ref={ribbonMaskRef}
            className="relative w-full overflow-hidden perspective-1200 transform-style-3d select-none my-auto"
          >
            {/* Top subtle highlight border */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-monarch-gold/30 to-transparent mb-1" />

            {/* Horizontal Track Container */}
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-5 lg:gap-6 items-stretch px-4 sm:px-8 lg:px-12 w-max overflow-x-auto lg:overflow-visible no-scrollbar pb-2 pt-1"
            >
              {PANORAMIC_ITEMS.map((item, index) => {
                const isCurrent = activeIndex === index;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`panoramic-card  shrink-0 w-[240px] sm:w-[270px] lg:w-[295px] h-[300px] sm:h-[330px] lg:h-[350px] group relative rounded-2xl overflow-hidden bg-monarch-charcoal shadow-lg hover:shadow-2xl transition-all duration-500 border ${isCurrent
                      ? 'border-monarch-gold ring-1 ring-monarch-gold/40'
                      : 'border-monarch-gold/30 hover:border-monarch-gold'
                      } flex flex-col justify-end p-4 lg:p-5`}
                  >
                    {/* Background Luxury Fashion Model Photo */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="eager"
                      decoding="async"
                    />

                    {/* Editorial Gradient Scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-[#16070B]/35 to-transparent opacity-95 group-hover:opacity-85 transition-opacity" />

                    {/* Top Badge: Ensemble Index */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-monarch-gold-light bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-monarch-gold/30">
                        0{index + 1} / 0{PANORAMIC_ITEMS.length}
                      </span>
                    </div>

                    {/* Bottom Editorial Content */}
                    <div className="relative z-10 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-block text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-monarch-gold-light border border-monarch-gold/30">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="font-serif text-base sm:text-lg text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1">
                        {item.title}
                      </h3>

                      <p className="text-[11px] font-sans text-monarch-beige/80 line-clamp-1">
                        {item.craft}
                      </p>

                      <div className="pt-1.5 flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white border-t border-monarch-gold/20">
                        <span className="font-serif font-bold text-monarch-gold-light text-sm">
                          {item.price}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-monarch-gold group-hover:text-white transition-colors">
                          <span>View Ensemble</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Curved Architectural Bottom Contour (Upward convex arc matching video) */}
            <div className="w-full relative -mt-3 pointer-events-none z-20">
              <svg
                viewBox="0 0 1440 36"
                preserveAspectRatio="none"
                className="w-full h-5 sm:h-7 lg:h-9 fill-[#FAF6F0]"
              >
                <path d="M0,36 Q720,0 1440,36 L1440,36 L0,36 Z" />
              </svg>
            </div>

            {/* Progress Tracker Bar */}
            <div className="max-w-xs mx-auto px-6 mt-1 hidden lg:flex flex-col items-center gap-1">
              <div className="w-full h-1 bg-monarch-beige/40 rounded-full overflow-hidden border border-monarch-gold/20">
                <div
                  ref={progressBarRef}
                  className="h-full bg-gradient-to-r from-monarch-gold-dark via-monarch-gold to-monarch-gold-light transition-all duration-150 ease-out"
                  style={{
                    width: `${Math.round(((activeIndex + 1) / PANORAMIC_ITEMS.length) * 100)}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between w-full text-[9px] font-nav uppercase tracking-widest text-monarch-charcoal/60">
                <span>Scroll to traverse ribbon</span>
                <span>
                  Ensemble 0{activeIndex + 1} of 0{PANORAMIC_ITEMS.length}
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

    </>
  );
};
