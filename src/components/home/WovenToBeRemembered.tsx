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

import { SIGNATURE_ENSEMBLES } from '@/data/bridal';

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Dynamic viewport-centered curved arc animation with start: 'top 10%'
  useGSAP(
    () => {
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
      if (!pinWrapper || !track || cards.length === 0) return;

      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

      // Pure circular arc geometry: cards follow the exact top rim of a giant concentric circle
      const applyCurvature = () => {
        const viewportCenter = window.innerWidth / 2;
        const trackLeft = track.getBoundingClientRect().left;
        // Radius of the circle: ~2.1x viewport width gives a true, majestic top-circle arc
        const radius = Math.max(2600, window.innerWidth * 2.1);

        cards.forEach((card) => {
          // Untransformed linear horizontal center of the card
          const cardBaseX = trackLeft + card.offsetLeft + card.offsetWidth / 2;
          const dist = cardBaseX - viewportCenter;

          // Central angle theta along the circular circumference
          const theta = dist / radius;

          // Pure circle parametric math:
          // 1. Horizontal arc correction so spacing along the arc remains perfectly uniform
          const deltaX = radius * Math.sin(theta) - dist;
          // 2. Vertical circular drop from zenith: y = R * (1 - cos(theta))
          const y = radius * (1 - Math.cos(theta));
          // 3. Tangent rotation angle along the top rim: rotZ = theta in degrees
          const rotZ = theta * (180 / Math.PI);

          card.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotZ.toFixed(2)}deg)`;
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
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20"
    >
      {/* Pinned Viewport Container (start: top 10%) */}
      <div
        ref={pinWrapperRef}
        className="w-full flex flex-col justify-center py-6 sm:py-8 lg:py-10 relative bg-[#FAF6F0]"
      >
        {/* Header Row: THE VAULT SIGNATURES / Woven to Be Remembered */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8 lg:mb-10">
          <div>
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold mb-1.5">
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

        {/* Curved Panoramic Fashion Image Strip with Minimal Gap */}
        <div className="relative w-full select-none my-auto pt-4 pb-6 sm:pt-6 sm:pb-8 lg:pt-6 lg:pb-8">
          {/* Horizontal Track Container: items-start ensures dropped cards have ample room below */}
          <div
            ref={trackRef}
            className="flex gap-2.5 sm:gap-3 lg:gap-3.5 items-start pl-4 sm:pl-8 lg:pl-12 pr-4 sm:pr-6 lg:pr-8 w-max no-scrollbar"
          >
            {SIGNATURE_ENSEMBLES.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative z-10 shrink-0 w-[240px] sm:w-[270px] lg:w-[290px] h-[395px] sm:h-[425px] lg:h-[455px] will-change-transform transform-gpu select-none hover:z-50"
                style={{
                  transformOrigin: '50% 50%',
                }}
              >
                <Link
                  href={item.href}
                  className="panoramic-card group relative w-full h-full rounded-xl overflow-hidden bg-monarch-charcoal shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 ease-out hover:-translate-y-3.5 hover:scale-[1.025] border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-4 sm:p-5 cursor-pointer block ring-0 hover:ring-1 hover:ring-monarch-gold/60"
                >
                  {/* Background Luxury Fashion Model Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 pointer-events-none"
                    loading="eager"
                    decoding="async"
                  />

                  {/* Editorial Gradient Scrim - softens subtly on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-[#16070B]/35 to-transparent opacity-95 group-hover:opacity-80 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badge: Ensemble Index */}
                  <div className="absolute top-3 left-3 z-10 flex items-center gap-2 pointer-events-none">
                    <span className="text-[10px] font-mono text-monarch-gold-light bg-black/60 group-hover:bg-monarch-maroon/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                      0{index + 1} / 0{SIGNATURE_ENSEMBLES.length}
                    </span>
                  </div>

                  {/* Bottom Editorial Content */}
                  <div className="relative z-10 space-y-1 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="inline-block text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 group-hover:bg-monarch-gold/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-monarch-gold-light border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-base sm:text-lg lg:text-xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-[11px] font-sans text-monarch-beige/80 group-hover:text-monarch-beige transition-colors duration-300 line-clamp-1">
                      {item.craft}
                    </p>

                    <div className="pt-1.5 flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white border-t border-monarch-gold/20 group-hover:border-monarch-gold/50 transition-colors duration-300">
                      <span className="font-serif font-bold text-monarch-gold-light text-sm sm:text-base group-hover:text-white transition-colors">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-monarch-gold group-hover:text-monarch-gold-light transition-colors font-medium">
                        <span>View Ensemble</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Archive Link */}
        <div className="text-center shrink-0 pt-1 pb-1">
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

