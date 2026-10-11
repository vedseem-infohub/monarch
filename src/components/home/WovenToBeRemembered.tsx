'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Six Moods Category Rail
const CRAFT_MOODS = [
  {
    title: 'Kanjivaram Silk',
    slug: 'designer-sarees',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Banarasi Brocade',
    slug: 'designer-sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Chanderi Heritage',
    slug: 'festive-wear',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Paithani Heirloom',
    slug: 'designer-sarees',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Tussar Silk',
    slug: 'festive-wear',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
  },
  {
    title: 'Pure Organza',
    slug: 'designer-sarees',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop',
  },
];

// Panoramic Cards for the 3D curved ribbon
const PANORAMIC_ITEMS = [
  {
    id: 'monarch-003',
    title: 'Aarunya Emerald Kanjivaram',
    tag: 'Pure Zari Weft',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-003',
  },
  {
    id: 'monarch-001',
    title: 'Kalyani Temple Silk',
    tag: 'Authentic Kashi Kadwa',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-001',
  },
  {
    id: 'monarch-005',
    title: 'Saanjh Maroon Banarasi',
    tag: 'Hand-Hammered Mukaish',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-005',
  },
  {
    id: 'monarch-007',
    title: 'Prerna Festive Tissue',
    tag: 'Metallic Silk Weave',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-007',
  },
  {
    id: 'monarch-011',
    title: 'Utsav Courtyard Silk',
    tag: 'Awadhi Karchob Flora',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-011',
  },
  {
    id: 'monarch-012',
    title: 'Vara Peacock Paithani',
    tag: 'Ancestral Pitloom Weft',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=70&w=600&auto=format&fit=crop',
    href: '/product/monarch-012',
  },
];

const MARQUEE_ITEMS = [
  'Pure Zari, Tested & Hallmarked',
  'Authentic Handloom Kashi Kadwa',
  'Bespoke Tailoring by Master Artisans',
  'Ancestral Awadhi Embroidery',
  'Worldwide Insured Express Delivery',
  'Complimentary Styling Consultation',
];

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const moodsRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Heading masked text entrance
      if (headingRef.current) {
        gsap.from(headingRef.current.querySelectorAll('.reveal-text'), {
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
        });
      }

      // 2. Moods thumbnails stagger entrance
      if (moodsRef.current) {
        gsap.from(moodsRef.current.querySelectorAll('.mood-thumb'), {
          scrollTrigger: {
            trigger: moodsRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 25,
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.06,
          ease: 'power2.out',
        });
      }

      // 3. Carousel cards entrance
      if (carouselContainerRef.current) {
        gsap.from(carouselContainerRef.current.querySelectorAll('.cylinder-card'), {
          scrollTrigger: {
            trigger: carouselContainerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      // Refresh ScrollTrigger calculations after initial mount
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (!carouselContainerRef.current) return;
    const maxScroll = carouselContainerRef.current.scrollWidth - carouselContainerRef.current.clientWidth;
    const nextLeft = Math.min(maxScroll, carouselContainerRef.current.scrollLeft + 340);
    carouselContainerRef.current.scrollTo({ left: nextLeft, behavior: 'smooth' });
    setScrollIndex((prev) => Math.min(PANORAMIC_ITEMS.length - 1, prev + 1));
  };

  const handlePrev = () => {
    if (!carouselContainerRef.current) return;
    const nextLeft = Math.max(0, carouselContainerRef.current.scrollLeft - 340);
    carouselContainerRef.current.scrollTo({ left: nextLeft, behavior: 'smooth' });
    setScrollIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F7F0E5] text-monarch-charcoal pt-0 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* 1. Top Luxury Ticker Marquee */}
      <div className="w-full bg-[#3F101A] text-monarch-gold-light py-2.5 overflow-hidden border-y border-monarch-gold/30">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, repeatIdx) => (
            <div key={repeatIdx} className="flex items-center gap-8 mx-4">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={idx} className="flex items-center gap-6 text-[11px] font-nav uppercase tracking-[0.25em]">
                  <span>{item}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
        {/* 2. Six Moods Craft Rail */}
        <div ref={moodsRef} className="mb-14">
          <div className="flex items-center justify-between mb-5 pb-2 border-b border-monarch-gold/25">
            <span className="font-nav text-xs uppercase tracking-[0.3em] font-semibold text-monarch-maroon">
              Six Moods of Silk
            </span>
            <span className="text-[11px] font-sans text-monarch-charcoal/60">
              Curated Heritage Categories
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4">
            {CRAFT_MOODS.map((mood) => (
              <Link
                key={mood.title}
                href={`/collections/${mood.slug}`}
                className="mood-thumb group flex flex-col items-center text-center p-2 rounded-xl hover:bg-white/60 transition-all duration-300"
              >
                {/* Royal Arch Frame */}
                <div className="w-full aspect-[4/5] rounded-t-full overflow-hidden bg-monarch-charcoal border border-monarch-gold/35 group-hover:border-monarch-gold shadow-sm group-hover:shadow-md transition-all duration-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mood.image}
                    alt={mood.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
                <span className="font-serif text-xs sm:text-sm text-monarch-charcoal font-medium mt-2.5 group-hover:text-monarch-maroon transition-colors line-clamp-1">
                  {mood.title}
                </span>
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-gold-dark mt-0.5">
                  Explore
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Section Editorial Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="reveal-text inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-monarch-maroon/10 border border-monarch-maroon/20 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold">
            <Sparkles className="w-3 h-3 text-monarch-gold-dark" />
            <span>The Heritage Chronicle</span>
          </div>

          <h2 className="reveal-text font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-monarch-charcoal">
            Woven to Be{' '}
            <span className="font-serif italic font-light text-monarch-gold-dark">
              Remembered
            </span>
          </h2>

          <p className="reveal-text text-xs sm:text-sm text-monarch-charcoal/75 font-sans leading-relaxed max-w-xl mx-auto">
            Treasures of living handloom royalty. Every thread is an ancestral pledge to hand-spun elegance, pure silver-gilt zari, and timeless celebratory silhouettes.
          </p>
        </div>

        {/* 4. 3D Cylindrical Panoramic Ribbon Container */}
        <div className="relative">
          {/* Controls */}
          <div className="hidden sm:flex items-center justify-end gap-2 mb-4">
            <button
              onClick={handlePrev}
              disabled={scrollIndex === 0}
              aria-label="Previous card"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/80 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-40 transition-all shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={scrollIndex >= PANORAMIC_ITEMS.length - 1}
              aria-label="Next card"
              className="p-2.5 rounded-full border border-monarch-gold/40 bg-white/80 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon disabled:opacity-40 transition-all shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Perspective 3D Scroll Track */}
          <div
            ref={carouselContainerRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-8 px-2 perspective-1200 transform-style-3d cursor-grab active:cursor-grabbing"
          >
            {PANORAMIC_ITEMS.map((item, index) => {
              // Gentle 3D cylindrical arc effect
              const offsetFromCenter = index - 2.5;
              const rotateYAngle = offsetFromCenter * 3; // slight curved perspective

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className="cylinder-card shrink-0 w-[260px] sm:w-[300px] lg:w-[330px] group relative rounded-2xl overflow-hidden bg-monarch-charcoal shadow-lg hover:shadow-2xl transition-all duration-500 border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-5 aspect-[3/4.6]"
                  style={{
                    transform: `rotateY(${rotateYAngle}deg)`,
                  }}
                >
                  {/* Background Image with Hover Scale */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    loading="lazy"
                  />

                  {/* Editorial Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E] via-[#1A0A0E]/30 to-transparent opacity-90 group-hover:opacity-80 transition-opacity" />

                  {/* Card Editorial Info */}
                  <div className="relative z-10 space-y-2">
                    <span className="inline-block text-[10px] font-nav uppercase tracking-[0.2em] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-monarch-gold-light border border-monarch-gold/30">
                      {item.tag}
                    </span>

                    <h3 className="font-serif text-lg sm:text-xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1">
                      {item.title}
                    </h3>

                    <div className="pt-2 flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white">
                      <span>View Ensemble</span>
                      <ArrowRight className="w-3.5 h-3.5 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Editorial Caption */}
        <div className="text-center mt-6">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-1 border-b border-monarch-maroon/30 transition-all group"
          >
            <span>Discover The Complete Archives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
