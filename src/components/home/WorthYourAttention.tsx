'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/home/shared/SectionHeader';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Occasion campaign preview cards
const OCCASION_EDITS = [
  {
    title: 'The Wedding Edit',
    subtitle: 'Bridal Lehengas & Sherwanis',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    href: '/wedding',
  },
  {
    title: 'Heritage Weaves',
    subtitle: 'Authentic Banarasi & Kanjivaram',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    href: '/collections/designer-sarees',
  },
  {
    title: 'The New Drapes',
    subtitle: 'Tissue & Silk Organza',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
    href: '/collections/all',
  },
  {
    title: 'Private Atelier',
    subtitle: 'Bespoke Imperial Couture',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    href: '/our-craft',
  },
];

// 5 Interactive Accordion Cards
const ACCORDION_DISCOVERIES = [
  {
    id: 'disc-1',
    eyebrow: 'ROYAL ARCHIVE',
    title: 'THE KASHI VAULT',
    headline: 'HEIRLOOM KADWA',
    description: 'Ancient shikargah animal jaals rendered in certified pure silver-gilt zari thread.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=70&w=700&auto=format&fit=crop',
    href: '/collections/designer-sarees',
  },
  {
    id: 'disc-2',
    eyebrow: 'FESTIVE PRIVILEGE',
    title: 'SEASONAL SALE',
    headline: 'FESTIVE SOIRÉE',
    description: 'Up to 15% royal welcome privilege on handcrafted festive silks and kalidars.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop',
    href: '/collections/all',
  },
  {
    id: 'disc-3',
    eyebrow: 'IMPERIAL REGALIA',
    title: 'ROYAL SHERWANIS',
    headline: 'SAVILE ROW CUTS',
    description: 'Bhagalpur raw silk ensembles paired with Jaipur-carved gold buttons.',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=70&w=700&auto=format&fit=crop',
    href: '/men',
  },
  {
    id: 'disc-4',
    eyebrow: 'POETIC DRAPES',
    title: 'ETHEREAL TISSUE',
    headline: 'ROSE GOLD VEILS',
    description: 'Micro-scalloped pearl borders with gossamer transparency and metallic shine.',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=70&w=700&auto=format&fit=crop',
    href: '/women',
  },
  {
    id: 'disc-5',
    eyebrow: 'ANCESTRAL ATELIER',
    title: 'MUKAISH & GOTA',
    headline: 'AWADHI FLUIDITY',
    description: 'Hand-beaten metallic wires couched on vibrant jewel-tone pure silks.',
    image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=70&w=700&auto=format&fit=crop',
    href: '/our-craft',
  },
];

export const WorthYourAttention: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const editsRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [activeAccordion, setActiveAccordion] = useState(1); // default expand the 2nd one

  useEffect(() => {
    // Preload accordion imagery so panel transitions are instantaneous
    ACCORDION_DISCOVERIES.forEach((panel) => {
      const img = new Image();
      img.src = panel.image;
    });

    const ctx = gsap.context(() => {
      if (editsRef.current) {
        gsap.from(editsRef.current.querySelectorAll('.edit-card'), {
          scrollTrigger: {
            trigger: editsRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        });
      }

      if (accordionRef.current) {
        gsap.from(accordionRef.current.querySelectorAll('.accordion-panel'), {
          scrollTrigger: {
            trigger: accordionRef.current,
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#F7F0E5] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Edits For Every Occasion Rail */}
        <div ref={editsRef} className="mb-20">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-monarch-gold/30">
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold block mb-1">
                Occasion Wardrobe
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-monarch-charcoal font-medium">
                EDITS FOR EVERY CELEBRATION
              </h3>
            </div>
            <Link
              href="/collections/all"
              className="text-xs font-nav uppercase tracking-widest text-monarch-maroon font-semibold hover:text-monarch-maroon-dark pb-0.5 border-b border-monarch-maroon/30 transition-colors"
            >
              View All Edits
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {OCCASION_EDITS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="edit-card group flex flex-col bg-white rounded-xl overflow-hidden border border-monarch-beige/60 hover:border-monarch-gold shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-monarch-charcoal">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[11px] font-nav uppercase tracking-wider text-monarch-gold-light bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded border border-monarch-gold/30">
                    {item.title}
                  </span>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <span className="text-xs text-monarch-charcoal/70 font-sans">
                    {item.subtitle}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 2. Section Header: Worth Your Attention */}
        <SectionHeader
          eyebrow="Curated Discovery"
          title="Worth Your"
          italicWord="Attention"
          description="A multi-dimensional magazine lookbook featuring designer picks, limited festive drops, and archival heirlooms."
          align="center"
          className="mb-12"
        />

        {/* 3. Interactive Accordion Discovery Panels */}
        <div
          ref={accordionRef}
          className="flex flex-col lg:flex-row gap-3 sm:gap-4 h-auto lg:h-[480px] w-full"
        >
          {ACCORDION_DISCOVERIES.map((panel, index) => {
            const isActive = activeAccordion === index;

            return (
              <div
                key={panel.id}
                onMouseEnter={() => setActiveAccordion(index)}
                onClick={() => setActiveAccordion(index)}
                className={`accordion-panel relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out border border-monarch-gold/30 shadow-lg ${
                  isActive
                    ? 'lg:flex-[3.5] h-[340px] lg:h-full shadow-2xl border-monarch-gold'
                    : 'lg:flex-[1] h-[100px] lg:h-full opacity-80 hover:opacity-100'
                }`}
              >
                {/* Background Editorial Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={panel.image}
                  alt={panel.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out"
                  loading={index <= 1 ? 'eager' : 'lazy'}
                  decoding="async"
                />

                {/* Scrim Overlay */}
                <div
                  className={`absolute inset-0 transition-colors duration-500 ${
                    isActive
                      ? 'bg-gradient-to-t from-[#1A0A0E]/90 via-[#1A0A0E]/40 to-transparent'
                      : 'bg-[#1A0A0E]/75'
                  }`}
                />

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full p-5 sm:p-7 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-nav uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-monarch-gold-light border border-monarch-gold/30">
                      {panel.eyebrow}
                    </span>

                    {!isActive && (
                      <span className="hidden lg:block text-xs font-serif font-medium text-white/80 writing-vertical-lr rotate-180 tracking-widest mt-6">
                        {panel.title}
                      </span>
                    )}
                  </div>

                  {/* Expanded Active Panel Information */}
                  {isActive ? (
                    <div className="space-y-3 animate-fade-in">
                      <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-semibold block">
                        {panel.title}
                      </span>

                      <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium tracking-tight">
                        {panel.headline}
                      </h3>

                      <p className="text-xs text-monarch-beige/85 font-sans max-w-md line-clamp-2">
                        {panel.description}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={panel.href}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-light text-white text-xs font-nav uppercase tracking-[0.2em] font-semibold border border-monarch-gold/50 transition-all shadow-md group"
                        >
                          <span>Explore Archival Piece</span>
                          <ArrowRight className="w-3.5 h-3.5 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="lg:hidden flex items-center justify-between text-white">
                      <span className="font-serif text-lg font-medium">{panel.title}</span>
                      <ArrowRight className="w-4 h-4 text-monarch-gold" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
