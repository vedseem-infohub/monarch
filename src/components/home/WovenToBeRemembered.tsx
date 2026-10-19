'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Wide Panoramic Fashion Image Ensembles - Matching User Screenshot 2
const SIGNATURE_ENSEMBLES = [
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
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Dynamic viewport-centered curved arc animation with start: 'top 10%'
  useGSAP(
    () => {
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLAnchorElement => Boolean(c));
      if (!pinWrapper || !track || cards.length === 0) return;

      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      // Pronounced parabolic arch: center of viewport is elevated at 0, sides drop by 85px and tilt
      const applyCurvature = () => {
        const viewportCenter = window.innerWidth / 2;
        const curveSpan = window.innerWidth * 0.48;

        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const dist = cardCenter - viewportCenter;
          const norm = Math.max(-1.4, Math.min(1.4, dist / curveSpan));

          // Pronounced upward arc: center card is highest (y=0), sides drop down by 85px
          const y = Math.pow(Math.abs(norm), 1.8) * 85;
          // Tangent rotation along the curved contour (up to 8.5deg)
          const rot = norm * 8.5;
          // Subtle perspective depth
          const scale = 1 - Math.pow(Math.abs(norm), 2) * 0.035;

          card.style.transform = `translate3d(0, ${y}px, 0) rotate(${rot}deg) scale(${scale})`;
        });
      };

      // Measure exact travel distance so the last card finishes with a minimal 20px gap from right edge
      const getTravel = () => {
        const containerWidth = pinWrapper.clientWidth;
        const lastCard = cards[cards.length - 1];
        if (!lastCard) return track.scrollWidth - containerWidth;
        const minimalGap = 20;
        return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - (containerWidth - minimalGap));
      };

      // Set initial curve state on mount
      applyCurvature();

      // Clean GSAP ScrollTrigger with start: 'top 10%'
      gsap.to(track, {
        x: () => -getTravel(),
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapper,
          pin: true,
          start: 'top 10%',
          end: '+=2500',
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: () => {
            applyCurvature();
          },
          onRefresh: () => {
            applyCurvature();
          },
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="woven-to-be-remembered"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden pt-4 pb-10"
    >
      {/* Pinned Viewport Container (start: top 10%) */}
      <div
        ref={pinWrapperRef}
        className="w-full flex flex-col justify-between py-2 relative overflow-hidden bg-[#FAF6F0]"
      >
        {/* Header Row: THE VAULT SIGNATURES / Woven to Be Remembered */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 sm:mb-6">
          <div>
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold mb-1">
              THE VAULT SIGNATURES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[42px] font-normal tracking-tight text-monarch-charcoal leading-none">
              <span>Woven</span> <span>to</span> <span>Be</span>{' '}
              <span className="font-serif italic text-monarch-gold-dark font-light ml-1 text-[1.12em]">
                Remembered
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-monarch-charcoal/60">
              Curated 01 / 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-monarch-gold" />
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-widest text-monarch-maroon hover:text-monarch-maroon-dark transition-colors font-semibold group pb-0.5 border-b border-monarch-gold/30 hover:border-monarch-maroon"
            >
              <span>Explore All ({SIGNATURE_ENSEMBLES.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Curved Panoramic Fashion Image Strip with Minimal Gap (gap-1 sm:gap-1.5) */}
        <div className="relative w-full overflow-hidden select-none my-auto py-3">
          {/* Horizontal Track Container */}
          <div
            ref={trackRef}
            className="flex gap-1 sm:gap-1.5 lg:gap-1.5 items-end pl-4 sm:pl-8 lg:pl-12 pr-4 sm:pr-6 lg:pr-8 w-max no-scrollbar pb-4 pt-2"
          >
            {SIGNATURE_ENSEMBLES.map((item, index) => (
              <Link
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                href={item.href}
                className="panoramic-card shrink-0 w-[235px] sm:w-[265px] lg:w-[285px] h-[390px] sm:h-[425px] lg:h-[455px] group relative rounded-2xl overflow-hidden bg-monarch-charcoal shadow-xl hover:shadow-2xl transition-[box-shadow,border-color] duration-300 border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-4 sm:p-5 will-change-transform transform-gpu select-none"
                style={{
                  transformOrigin: '50% 90%',
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
                    0{index + 1} / 0{SIGNATURE_ENSEMBLES.length}
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
        </div>

        {/* Bottom Archive Link */}
        <div className="text-center shrink-0 pt-4 pb-2">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-[11px] font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
            <span>Discover The Complete Royal Archives</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
