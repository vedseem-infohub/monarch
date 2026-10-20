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
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

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
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    // Responsive circle radius and rotation tuning
    const radius = isMobile
      ? Math.max(750, width * 2.0)
      : isTablet
        ? Math.max(1400, width * 1.8)
        : Math.max(2000, width * 1.7);

    const tiltFactor = isMobile ? 0.65 : isTablet ? 0.75 : 0.85;
    const maxRot = isMobile ? 12.0 : isTablet ? 13.5 : 14.5;

    const viewportCenter = width / 2;
    const trackLeft = track.getBoundingClientRect().left;

    cards.forEach((card) => {
      // Deterministic linear center of each card on screen
      const cardBaseX = trackLeft + card.offsetLeft + card.offsetWidth / 2;
      const dist = cardBaseX - viewportCenter;

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

  // Smooth programmatic step to card index via ScrollTrigger scroll position
  const scrollToCard = useCallback((targetIndex: number) => {
    const idx = Math.max(0, Math.min(targetIndex, SIGNATURE_ENSEMBLES.length - 1));
    const st = ScrollTrigger.getById('woven-scroll');
    if (st) {
      const progress = idx / (SIGNATURE_ENSEMBLES.length - 1);
      const targetY = st.start + progress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  // Ensure curvature is recalculated on window resize
  useEffect(() => {
    const handleResize = () => {
      applyCurvature();
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [applyCurvature]);

  // Unified GSAP ScrollTrigger scrolling animation across Mobile, Tablet, and Desktop
  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
      if (!section || !pinWrapper || !track || cards.length === 0) return;

      const width = window.innerWidth;
      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      // Exact track positions so Card 0 is centered at start (zenith) and Card N-1 is centered at end
      const firstCard = cards[0];
      const lastCard = cards[cards.length - 1];
      const initialTrackX = width / 2 - (firstCard.offsetLeft + firstCard.offsetWidth / 2);
      const finalTrackX = width / 2 - (lastCard.offsetLeft + lastCard.offsetWidth / 2);
      const travelDistance = Math.abs(initialTrackX - finalTrackX);

      // Scroll distance scaled for responsive device travel
      const scrollDistance = isMobile
        ? Math.max(1000, Math.round(travelDistance * 1.15))
        : isTablet
          ? Math.max(1300, Math.round(travelDistance * 1.25))
          : Math.max(1600, Math.round(travelDistance * 1.35));

      // Strictly position track at Card 0 initially
      gsap.set(track, { x: initialTrackX });
      applyCurvature();

      // ScrollTrigger pins section while page scroll drives horizontal circular walkthrough
      const scrollTween = gsap.fromTo(
        track,
        { x: initialTrackX },
        {
          x: finalTrackX,
          ease: 'none',
          scrollTrigger: {
            id: 'woven-scroll',
            trigger: section,
            pin: pinWrapper,
            anticipatePin: 0, // Eliminate premature pinning jump
            start: 'top top',
            end: () => '+=' + scrollDistance,
            scrub: 0.5,
            invalidateOnRefresh: true,
            pinSpacing: true,
            onUpdate: (self) => {
              applyCurvature();
              // Synchronize active index ONLY when index changes (avoids 60fps React re-render thrashing)
              const cardCount = SIGNATURE_ENSEMBLES.length;
              const currentIdx = Math.min(
                cardCount - 1,
                Math.max(0, Math.round(self.progress * (cardCount - 1)))
              );
              if (currentIdx !== activeIndexRef.current) {
                activeIndexRef.current = currentIdx;
                setActiveIndex(currentIdx);
              }
            },
            onRefresh: () => {
              applyCurvature();
            },
          },
        }
      );

      return () => {
        scrollTween.kill();
        track.style.transform = '';
      };
    },
    { scope: sectionRef, dependencies: [applyCurvature] }
  );

  return (
    <section
      id="woven-to-be-remembered"
      ref={sectionRef}
      className="relative w-full bg-[#FAF6F0] text-monarch-charcoal overflow-hidden"
    >
      {/* Viewport Container: Pinned during scrolling animation with header clearance */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-20 lg:pt-14 pb-4 sm:pb-6 lg:pb-8 relative bg-[#FAF6F0]"
      >
        {/* Header Row: THE VAULT SIGNATURES / Woven to Be Remembered */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 shrink-0">
          <div>
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-monarch-charcoal/70 font-semibold mb-1">
              THE VAULT SIGNATURES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[40px] font-normal tracking-tight text-monarch-charcoal leading-none">
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

        {/* Circular Panoramic Strip: Pinned horizontal scrolling walkthrough with arched jharokha card silhouette on mobile */}
        <div className="relative w-full select-none my-auto pt-2 pb-12 sm:pb-16 lg:pb-18 overflow-hidden">
          {/* Horizontal Track Container */}
          <div
            ref={trackRef}
            className="flex gap-3 sm:gap-4 lg:gap-3.5 items-start w-max will-change-transform"
          >
            {SIGNATURE_ENSEMBLES.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="relative z-10 shrink-0 w-[205px] xs:w-[220px] sm:w-[260px] lg:w-[290px] h-[340px] xs:h-[360px] sm:h-[410px] lg:h-[455px] will-change-transform transform-gpu select-none hover:z-50"
                style={{
                  transformOrigin: '50% 50%',
                }}
              >
                <Link
                  href={item.href}
                  className="panoramic-card group relative w-full h-full rounded-t-[75px] xs:rounded-t-[85px] sm:rounded-t-[110px] lg:rounded-2xl rounded-b-2xl overflow-hidden bg-monarch-charcoal shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.025] border border-monarch-gold/30 hover:border-monarch-gold flex flex-col justify-end p-4 sm:p-5 cursor-pointer block ring-0 hover:ring-1 hover:ring-monarch-gold/60"
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

                  {/* Arched Crown Top Ambient Glow */}
                  <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-monarch-gold/25 via-monarch-gold/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

                  {/* Editorial Gradient Scrim - softens subtly on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16070B] via-[#16070B]/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                  {/* Top Badge: Ensemble Index centered on mobile arch, top-left on desktop */}
                  <div className="absolute top-3.5 left-1/2 -translate-x-1/2 sm:left-4 sm:translate-x-0 z-10 flex items-center gap-1.5 pointer-events-none">
                    <span className="text-[10px] font-mono text-monarch-gold-light bg-black/60 group-hover:bg-monarch-maroon/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                      0{index + 1} / 0{SIGNATURE_ENSEMBLES.length}
                    </span>
                  </div>

                  {/* Bottom Editorial Content */}
                  <div className="relative z-10 space-y-1 sm:space-y-1.5 pointer-events-none">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] xs:text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 group-hover:bg-monarch-gold/20 backdrop-blur-md px-2 py-0.5 rounded-full text-monarch-gold-light border border-monarch-gold/30 group-hover:border-monarch-gold transition-colors duration-300">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors duration-300 line-clamp-1 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-[10px] xs:text-[11px] sm:text-xs font-sans text-monarch-beige/80 group-hover:text-monarch-beige transition-colors duration-300 line-clamp-1">
                      {item.craft}
                    </p>

                    <div className="pt-1.5 flex items-center justify-between text-[11px] xs:text-xs font-nav uppercase tracking-wider text-monarch-beige/90 group-hover:text-white border-t border-monarch-gold/20 group-hover:border-monarch-gold/50 transition-colors duration-300">
                      <span className="font-serif font-bold text-monarch-gold-light text-xs xs:text-sm sm:text-base group-hover:text-white transition-colors">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs text-monarch-gold group-hover:text-monarch-gold-light transition-colors font-semibold">
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Interactive Step Indicators & Complete Archives Link */}
        <div className="shrink-0 flex flex-col items-center gap-2 px-4">
          {/* Active Ensemble Step Indicator */}
          <div className="flex items-center justify-between w-full max-w-[340px]">
            <button
              type="button"
              onClick={() => scrollToCard(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous signature ensemble"
              className="w-8 h-8 rounded-full border border-monarch-gold/40 bg-monarch-charcoal/5 flex items-center justify-center text-monarch-charcoal hover:bg-monarch-gold/20 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4 text-monarch-charcoal" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-monarch-charcoal/70 font-semibold">
                0{activeIndex + 1}
              </span>
              <div className="flex items-center gap-1.5 px-1.5">
                {SIGNATURE_ENSEMBLES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to ensemble 0${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
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

            <button
              type="button"
              onClick={() => scrollToCard(activeIndex + 1)}
              disabled={activeIndex === SIGNATURE_ENSEMBLES.length - 1}
              aria-label="Next signature ensemble"
              className="w-8 h-8 rounded-full border border-monarch-gold/40 bg-monarch-charcoal/5 flex items-center justify-center text-monarch-charcoal hover:bg-monarch-gold/20 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
            >
              <ChevronRight className="w-4 h-4 text-monarch-charcoal" />
            </button>
          </div>

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
