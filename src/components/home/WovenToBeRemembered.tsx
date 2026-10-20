'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

import { SIGNATURE_ENSEMBLES } from '@/data/bridal';

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);

  /**
   * Responsive circular arc geometry: ACTIVE ACROSS ALL SCREENS (Mobile, Tablet & Desktop).
   * Cards follow the circumference of a giant concentric circle:
   * - Center card sits at the zenith (top of the arch, y = 0, rotZ = 0deg)
   * - Side cards curve downward along the circular rim (y = R * (1 - cos(theta)))
   * - Tangent angles (rotZ) dynamically rotate cards to follow the crest
   */
  const applyCurvature = useCallback(() => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!track || cards.length === 0) return;

    const width = window.innerWidth;
    const isDesktop = width >= 1024;
    const isTablet = width >= 640 && width < 1024;

    // Responsive circle radius and rotation tuning
    const radius = isDesktop
      ? Math.max(2000, width * 1.7)
      : isTablet
        ? Math.max(1200, width * 1.6)
        : Math.max(650, width * 1.5);

    const tiltFactor = isDesktop ? 0.85 : isTablet ? 0.70 : 0.55;
    const maxRot = isDesktop ? 14.5 : isTablet ? 13.0 : 12.0;

    const viewportCenter = width / 2;

    cards.forEach((card) => {
      // Calculate true visual screen-space horizontal center of the card
      const cardRect = card.getBoundingClientRect();
      const cardCenterOnScreen = cardRect.left + cardRect.width / 2;
      const dist = cardCenterOnScreen - viewportCenter;

      // Central angle theta along the circular circumference
      const theta = dist / radius;

      // Parametric circle equations:
      // 1. Horizontal arc correction for uniform circular spacing
      const deltaX = radius * Math.sin(theta) - dist;
      // 2. Vertical circular drop from zenith: y = R * (1 - cos(theta))
      const y = radius * (1 - Math.cos(theta));
      // 3. Tangent rotation angle along the top rim
      const rawRot = theta * (180 / Math.PI) * tiltFactor;
      const rotZ = Math.max(-maxRot, Math.min(maxRot, rawRot));

      card.style.transform = `translate3d(${deltaX.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rotZ.toFixed(2)}deg)`;
    });
  }, []);

  // Update active index and circular curvature on horizontal scroll (mobile / tablet gestures)
  const handleScroll = useCallback(() => {
    applyCurvature();

    const container = scrollContainerRef.current;
    if (!container || (typeof window !== 'undefined' && window.innerWidth >= 1024)) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveMobileIndex(closestIndex);
  }, [applyCurvature]);

  const scrollToIndex = useCallback((index: number) => {
    const targetIdx = Math.max(0, Math.min(index, SIGNATURE_ENSEMBLES.length - 1));
    const container = scrollContainerRef.current;
    const card = cardRefs.current[targetIdx];
    if (!container || !card) return;

    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const targetScrollLeft = cardCenter - container.clientWidth / 2;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth',
    });
    setActiveMobileIndex(targetIdx);
  }, []);

  // Ensure curvature is initialized on mount and updated on window resize
  useEffect(() => {
    applyCurvature();
    const handleResize = () => {
      applyCurvature();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [applyCurvature]);

  // Desktop pinned horizontal walkthrough with ScrollTrigger + useGSAP
  useGSAP(
    () => {
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
      if (!pinWrapper || !track || cards.length === 0) return;

      const mm = gsap.matchMedia();

      // Desktop (>= 1024px): ScrollTrigger pins the section and scrubs the track
      mm.add('(min-width: 1024px)', () => {
        const getTravel = () => {
          const containerWidth = pinWrapper.clientWidth;
          const lastCard = cards[cards.length - 1];
          if (!lastCard) return track.scrollWidth - containerWidth;
          const minimalGap = 32;
          return Math.max(0, lastCard.offsetLeft + lastCard.offsetWidth - (containerWidth - minimalGap));
        };

        // Initialize curvature
        applyCurvature();

        // Smooth desktop pinned horizontal scroll
        const scrollTween = gsap.to(track, {
          x: () => -getTravel(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinWrapper,
            pin: true,
            anticipatePin: 1,
            start: 'top top',
            end: () => '+=' + Math.max(1200, Math.round(getTravel() * 1.35)),
            scrub: 0.8,
            invalidateOnRefresh: true,
            pinSpacing: true,
            onUpdate: () => {
              applyCurvature();
            },
            onRefresh: () => {
              applyCurvature();
            },
          },
        });

        return () => {
          scrollTween.kill();
          track.style.transform = '';
        };
      });

      // Mobile / tablet (< 1024px): curvature is active during horizontal swipe/scroll
      mm.add('(max-width: 1023px)', () => {
        applyCurvature();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [applyCurvature] }
  );

  return (
    <section
      id="woven-to-be-remembered"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden pt-6 pb-14 sm:pt-8 sm:pb-18 lg:pt-10 lg:pb-24"
    >
      {/* Viewport Container (pinned on desktop with start: 'top top') */}
      <div
        ref={pinWrapperRef}
        className="w-full flex flex-col justify-center py-4 sm:py-6 lg:py-8 relative bg-[#FAF6F0]"
      >
        {/* Header Row: THE VAULT SIGNATURES / Woven to Be Remembered */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-3 sm:mb-6 lg:mb-8">
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

        {/* Scrollable Panoramic Strip: circular arc active on mobile (swipe) and desktop (scrub) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="relative w-full select-none my-auto pt-4 pb-16 sm:pt-6 sm:pb-20 lg:pt-6 lg:pb-24 overflow-x-auto lg:overflow-visible no-scrollbar snap-x snap-mandatory lg:snap-none scroll-smooth touch-pan-x"
        >
          {/* Horizontal Track Container */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-5 lg:gap-3.5 items-start px-[9vw] sm:px-8 lg:pl-12 lg:pr-8 w-max lg:no-scrollbar"
          >
            {SIGNATURE_ENSEMBLES.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative z-10 shrink-0 w-[82vw] max-w-[340px] sm:w-[320px] lg:w-[290px] h-[460px] sm:h-[480px] lg:h-[455px] snap-center lg:snap-align-none will-change-transform transform-gpu select-none hover:z-50"
                style={{
                  transformOrigin: '50% 50%',
                }}
              >
                <Link
                  href={item.href}
                  className="panoramic-card group relative w-full h-full rounded-2xl overflow-hidden bg-monarch-charcoal shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 ease-out hover:-translate-y-3.5 hover:scale-[1.025] border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-5 sm:p-6 lg:p-5 cursor-pointer block ring-0 hover:ring-1 hover:ring-monarch-gold/60"
                >
                  {/* Background Luxury Fashion Model Photo */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 pointer-events-none"
                    loading="eager"
                    decoding="async"
                  />

                  {/* Editorial Gradient Scrim - softens subtly on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-[#16070B]/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badge: Ensemble Index & Craft Tag */}
                  <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] sm:text-[11px] font-mono text-monarch-gold-light bg-black/60 group-hover:bg-monarch-maroon/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                      0{index + 1} / 0{SIGNATURE_ENSEMBLES.length}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-nav uppercase tracking-[0.2em] bg-black/60 group-hover:bg-monarch-gold/20 backdrop-blur-md px-2.5 py-1 rounded-full text-monarch-gold-light border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                      {item.tag}
                    </span>
                  </div>

                  {/* Bottom Editorial Content */}
                  <div className="relative z-10 space-y-1.5 pointer-events-none">
                    <h3 className="font-serif text-lg sm:text-xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors duration-300 line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-[13px] font-sans text-monarch-beige/80 group-hover:text-monarch-beige transition-colors duration-300 line-clamp-1">
                      {item.craft}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white border-t border-monarch-gold/20 group-hover:border-monarch-gold/50 transition-colors duration-300">
                      <span className="font-serif font-bold text-monarch-gold-light text-base sm:text-lg group-hover:text-white transition-colors">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-1.5 text-xs text-monarch-gold group-hover:text-monarch-gold-light transition-colors font-semibold">
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

        {/* Mobile Interactive Controls: Chevrons + Pagination Dots */}
        <div className="flex lg:hidden flex-col items-center gap-2.5 -mt-8 mb-4 px-4 relative z-20">
          <div className="flex items-center justify-between w-full max-w-[340px]">
            {/* Left Chevron */}
            <button
              type="button"
              onClick={() => scrollToIndex(activeMobileIndex - 1)}
              disabled={activeMobileIndex === 0}
              aria-label="Previous signature ensemble"
              className="w-9 h-9 rounded-full border border-monarch-gold/40 bg-[#FAF6F0]/90 backdrop-blur-md flex items-center justify-center text-monarch-charcoal hover:bg-monarch-gold/20 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-monarch-charcoal" />
            </button>

            {/* Center Pagination Indicators */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-monarch-charcoal/70 font-semibold">
                0{activeMobileIndex + 1}
              </span>
              <div className="flex items-center gap-1.5 px-1.5">
                {SIGNATURE_ENSEMBLES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToIndex(idx)}
                    aria-label={`Go to ensemble 0${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeMobileIndex === idx
                        ? 'w-6 bg-monarch-maroon'
                        : 'w-1.5 bg-monarch-gold/40 hover:bg-monarch-gold'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono tracking-widest text-monarch-charcoal/50">
                0{SIGNATURE_ENSEMBLES.length}
              </span>
            </div>

            {/* Right Chevron */}
            <button
              type="button"
              onClick={() => scrollToIndex(activeMobileIndex + 1)}
              disabled={activeMobileIndex === SIGNATURE_ENSEMBLES.length - 1}
              aria-label="Next signature ensemble"
              className="w-9 h-9 rounded-full border border-monarch-gold/40 bg-[#FAF6F0]/90 backdrop-blur-md flex items-center justify-center text-monarch-charcoal hover:bg-monarch-gold/20 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-monarch-charcoal" />
            </button>
          </div>

          <div className="text-[10px] font-nav uppercase tracking-[0.2em] text-monarch-charcoal/50">
            Swipe or tap to explore vault signatures
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
