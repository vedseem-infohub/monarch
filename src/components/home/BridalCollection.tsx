'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { CurvedDivider } from '@/components/home/shared/CurvedDivider';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BridalCollection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const campaignImgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Curated bridal wear from PRODUCTS (e.g. bridal lehengas, royal sarees)
  const bridalItems = PRODUCTS.filter(
    (p) => p.category === 'bridal-lehengas' || p.category === 'designer-sarees'
  ).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Large campaign image parallax & clip-path reveal
      if (campaignImgRef.current) {
        gsap.fromTo(
          campaignImgRef.current.querySelector('img'),
          { scale: 1.12, y: -20 },
          {
            scale: 1,
            y: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: campaignImgRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Stagger text and product cards
      if (contentRef.current) {
        gsap.from(contentRef.current.querySelectorAll('.bridal-reveal'), {
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
      className="relative w-full bg-[#291116] text-monarch-ivory overflow-hidden"
    >
      {/* Top curved divider transitioning from light ivory to deep burgundy */}
      <CurvedDivider direction="toDark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Full-Height Cinematic Bridal Campaign Hero */}
          <div
            ref={campaignImgRef}
            className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4.5] sm:aspect-[4/5] lg:aspect-[3/4.6] border border-monarch-gold/40 shadow-2xl group"
          >
            {/* Background Bridal Model Photo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop"
              alt="Monarch Royal Bridal Couture"
              className="w-full h-full object-cover transition-transform duration-1000 ease-out"
              loading="eager"
              decoding="async"
            />

            {/* Gradient Scrim & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E] via-transparent to-[#1A0A0E]/40" />

            {/* Floating Gold Crest Overlay */}
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-monarch-gold/40 text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold-light">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold animate-pulse" />
              <span>Imperial Bridal Sanctum</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-6 inset-x-6 space-y-2">
              <p className="font-serif italic text-lg sm:text-xl text-monarch-gold-light">
                &ldquo;Where eternal vows meet four hundred hours of Awadhi karigari.&rdquo;
              </p>
              <Link
                href="/wedding"
                className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-widest text-monarch-ivory hover:text-monarch-gold transition-colors"
              >
                <span>Read Bespoke Bridal Diary</span>
                <ArrowRight className="w-3.5 h-3.5 text-monarch-gold" />
              </Link>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Curated Bridal Product Cards */}
          <div ref={contentRef} className="lg:col-span-7 space-y-8">
            <div className="bridal-reveal space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/30 text-[11px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-medium">
                <Sparkles className="w-3 h-3 text-monarch-gold" />
                <span>The Bridal Sanctum</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-monarch-ivory">
                The Bridal{' '}
                <span className="font-serif italic font-light text-monarch-gold-light">
                  Collection
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-monarch-beige/85 font-sans leading-relaxed max-w-xl">
                Woven with certified pure silver-gilt zari, genuine Kashi Kadwa brocades, and 24K gold-dipped dabka. Ensembles curated for sacred wedding rituals, grand baithaks, and royal pheras.
              </p>
            </div>

            {/* Curated Bridal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {bridalItems.map((item, idx) => {
                const inWishlist = isInWishlist(item.id);

                return (
                  <div
                    key={item.id}
                    className="bridal-reveal group flex flex-col bg-[#1A0A0E] rounded-xl overflow-hidden border border-monarch-gold/30 hover:border-monarch-gold transition-all duration-500 shadow-xl"
                  >
                    <Link
                      href={`/product/${item.id}`}
                      className="relative aspect-[3/4] overflow-hidden block bg-black/40"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                        loading={idx < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(item.id);
                        }}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
                          inWishlist
                            ? 'bg-monarch-maroon text-monarch-gold shadow'
                            : 'bg-black/50 hover:bg-black/80 text-white shadow-sm'
                        }`}
                        aria-label="Toggle Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-monarch-gold text-monarch-gold' : ''}`} />
                      </button>

                      <div className="absolute bottom-2 left-2">
                        <span className="text-[10px] font-nav uppercase tracking-wider bg-monarch-maroon/90 text-monarch-ivory px-2 py-0.5 rounded border border-monarch-gold/30">
                          {item.categoryName}
                        </span>
                      </div>
                    </Link>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-[#1A0A0E]">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-serif text-base text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[11px] text-monarch-beige/70 font-sans line-clamp-1 mt-0.5">
                          {item.fabric}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-monarch-gold/20">
                        <span className="font-serif text-base font-bold text-monarch-gold-light">
                          {FORMAT_CURRENCY(item.price)}
                        </span>

                        <Link
                          href={`/product/${item.id}`}
                          className="px-3.5 py-1.5 rounded-full bg-monarch-gold hover:bg-monarch-gold-light text-[#1A0A0E] text-[10px] font-nav uppercase tracking-widest font-semibold transition-all"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Section CTA */}
            <div className="bridal-reveal pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/wedding"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-monarch-gold-dark via-monarch-gold to-monarch-gold-light text-[#1A0A0E] font-nav text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-xl group"
              >
                <span>EXPLORE THE COMPLETE BRIDAL VAULT</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
