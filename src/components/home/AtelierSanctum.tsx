'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Heart,
  ShoppingBag,
  X,
  Compass,
  Star,
  Award,
  Layers,
} from 'lucide-react';
import {
  ROYAL_CLIENT_DIARIES,
  CRAFT_SANCTUM_PILLARS,
  SALON_LOCATIONS,
  ATELIER_EXPERIENCES,
  SalonLocation,
  ClientDiaryEntry,
} from '@/data/atelier';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AtelierSanctum: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active state for Salon Location Concierge
  const [activeSalonSlug, setActiveSalonSlug] = useState('new-delhi');

  // Active state for Royal Diary Carousel
  const [activeDiaryIdx, setActiveDiaryIdx] = useState(0);

  // VIP Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedExp, setSelectedExp] = useState(ATELIER_EXPERIENCES[0].id);

  // Form State inside Modal
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDate, setFormDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const currentSalon =
    SALON_LOCATIONS.find((s) => s.slug === activeSalonSlug) || SALON_LOCATIONS[0];
  const currentDiary = ROYAL_CLIENT_DIARIES[activeDiaryIdx];

  const handlePrevDiary = useCallback(() => {
    setActiveDiaryIdx((prev) => (prev === 0 ? ROYAL_CLIENT_DIARIES.length - 1 : prev - 1));
  }, []);

  const handleNextDiary = useCallback(() => {
    setActiveDiaryIdx((prev) => (prev === ROYAL_CLIENT_DIARIES.length - 1 ? 0 : prev + 1));
  }, []);

  // Keyboard navigation for diary
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) {
        if (e.key === 'Escape') setIsModalOpen(false);
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPhone || !formEmail) return;

    setIsSubmitting(true);
    // Simulate real backend API call (POST /api/v1/atelier/book-appointment)
    setTimeout(() => {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      setBookingRef(`MNR-2026-${randomCode}`);
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }, 600);
  };

  const handleCommissionDrape = (diary: ClientDiaryEntry) => {
    addToCart(
      diary.ensemble,
      diary.ensemble.colors[0]?.name || 'Imperial Royal',
      diary.ensemble.sizes[0] || 'Custom Bespoke',
      1
    );
    setToastMessage(`Commission Drape added to Cart: ${diary.ensemble.name}`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // GSAP subtle scroll-triggered entrance animations
  useGSAP(
    () => {
      const heroElements = containerRef.current?.querySelectorAll('.atelier-reveal');
      if (heroElements && heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { y: 24, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="atelier-sanctum"
      className="relative bg-[#FAF8F5] text-[#1C1715] py-24 sm:py-32 lg:py-36 overflow-hidden selection:bg-[#5A1725] selection:text-[#FAF8F5] border-t border-[#C7A15B]/25"
    >
      {/* ============================================================ */}
      {/* 0. AMBIENT LUXURY SILK TEXTURE & RADIAL GLOWS                */}
      {/* ============================================================ */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#C7A15B_0.8px,transparent_0.8px)] [background-size:28px_28px]" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C7A15B]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-10 w-[420px] h-[420px] bg-[#5A1725]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-50 bg-[#1C1715] text-[#FAF8F5] px-6 py-3.5 rounded-full shadow-2xl border border-[#C7A15B]/40 text-xs font-nav uppercase tracking-wider flex items-center gap-3 backdrop-blur-md"
          >
            <CheckCircle2 className="w-4 h-4 text-[#C7A15B]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-24 sm:space-y-32">
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: THE IMPERIAL ATELIER & SANCTUM            */}
        {/* ============================================================ */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          <div className="atelier-reveal inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 border border-[#C7A15B]/35 text-[11px] font-nav uppercase tracking-[0.28em] text-[#5A1725] shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15B]" />
            <span>The Private Atelier &amp; Karigari Guild · Estd. 1886</span>
          </div>

          <h2 className="atelier-reveal font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-normal text-[#1C1715] leading-[1.08] tracking-[-0.02em]">
            A Sanctuary of Silk &amp;{' '}
            <span className="italic font-light text-[#5A1725]">Royal Accords</span>
          </h2>

          <p className="atelier-reveal text-xs sm:text-sm lg:text-base text-[#6B5E55] font-sans leading-relaxed max-w-2xl mx-auto">
            Before an imperial drape touches the bride, it spends over four hundred hours beneath the
            subterranean wooden beams of our Kashi pitlooms, guided by three generations of master
            weavers and hallmarked 24K real gold bullion.
          </p>

          {/* Archival Gold Hairline Divider */}
          <div className="atelier-reveal flex items-center justify-center gap-3 pt-3">
            <span className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#C7A15B]/60" />
            <div className="w-2 h-2 rotate-45 border border-[#C7A15B] bg-[#C7A15B]/30" />
            <span className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#C7A15B]/60" />
          </div>
        </div>

        {/* ============================================================ */}
        {/* 2. THE THREE ARCHIVAL KARIGARI PILLARS (PRECIOUS METALLURGY) */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CRAFT_SANCTUM_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="group relative bg-white/85 backdrop-blur-md rounded-2xl lg:rounded-3xl p-7 sm:p-8 border border-[#C7A15B]/25 hover:border-[#C7A15B] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle gold top glow on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#C7A15B] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="space-y-5">
                {/* Header Row: Roman Numeral & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-serif italic text-lg text-[#C7A15B]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#5A1725] bg-[#5A1725]/5 px-3 py-1 rounded-full border border-[#5A1725]/15 font-medium">
                    {pillar.badge}
                  </span>
                </div>

                {/* Macro Craft Texture Thumbnail */}
                <div className="relative w-full h-36 rounded-xl overflow-hidden border border-black/10 shadow-inner">
                  <Image
                    src={pillar.macroImage}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                    <span className="text-[10px] font-nav uppercase tracking-wider text-white/90">
                      Archival Macro
                    </span>
                    <span className="text-[11px] font-mono text-[#E8D5B5] font-semibold">
                      {pillar.statMetric}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-[#1C1715] font-normal leading-snug group-hover:text-[#5A1725] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#6B5E55] font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>

              {/* Bottom Hallmark Provenance Seal */}
              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#5A1725] font-semibold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#C7A15B]" />
                  {pillar.statLabel}
                </span>
                <span className="text-[#C7A15B] font-mono font-medium">
                  {pillar.statMetric}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 3. THE ARCHITECTURAL FLAGSHIP SALONS & PRIVATE SUITES        */}
        {/* ============================================================ */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl lg:rounded-[44px] p-8 sm:p-12 lg:p-16 border border-[#C7A15B]/25 shadow-2xl relative overflow-hidden">
          {/* Subtle warm corner ambiance glow */}
          <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#C7A15B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-10 relative z-10">
            {/* Salon City Switcher Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#C7A15B] font-semibold block">
                  Select Architectural Destination
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1715] font-normal">
                  Flagship Salons &amp; Fitting Chambers
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex flex-wrap gap-2">
                {SALON_LOCATIONS.map((salon) => (
                  <button
                    key={salon.slug}
                    type="button"
                    onClick={() => setActiveSalonSlug(salon.slug)}
                    className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                      activeSalonSlug === salon.slug
                        ? 'bg-[#5A1725] text-white font-medium shadow-md shadow-[#5A1725]/30 scale-[1.02]'
                        : 'bg-[#FAF8F5] text-black/70 border border-black/10 hover:border-black/30'
                    }`}
                  >
                    <span>{salon.city}</span>
                    {activeSalonSlug === salon.slug && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C7A15B]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Split Architectural Showcase */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* ------------------------------------------------------ */}
              {/* LEFT: CURATOR DETAILS & SUITE RESERVATION CTA          */}
              {/* ------------------------------------------------------ */}
              <div className="lg:col-span-6 space-y-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSalon.slug}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-nav uppercase tracking-[0.25em] text-[#C7A15B] font-medium flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C7A15B]" />
                        {currentSalon.city} · {currentSalon.badge}
                      </span>
                      <h4 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#1C1715] font-normal leading-[1.12]">
                        {currentSalon.name}
                      </h4>
                      {currentSalon.subheading && (
                        <p className="text-xs font-serif italic text-[#5A1725] font-normal tracking-wide">
                          {currentSalon.subheading}
                        </p>
                      )}
                    </div>

                    {/* Master Draper Quote */}
                    <blockquote className="border-l-2 border-[#C7A15B] pl-5 space-y-1.5 py-1">
                      <p className="font-serif italic text-base sm:text-lg text-[#231815] leading-relaxed">
                        &ldquo;{currentSalon.salonQuote}&rdquo;
                      </p>
                      <cite className="text-xs font-nav uppercase tracking-wider text-[#6B5E55] block not-italic">
                        — {currentSalon.curatorName}
                        {currentSalon.curatorRole && (
                          <span className="text-black/40 font-normal">
                            {' '}
                            · {currentSalon.curatorRole}
                          </span>
                        )}
                      </cite>
                    </blockquote>

                    {/* Amenities Checklist */}
                    {currentSalon.amenities && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                        {currentSalon.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 text-xs text-[#2B231F] font-sans"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                            <span>{amenity}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Address & Hotline */}
                    <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-black/5 text-xs text-[#6B5E55] font-sans space-y-1.5">
                      <p className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                        <span>
                          <strong className="text-[#1C1715] font-medium">Address:</strong>{' '}
                          {currentSalon.address}, {currentSalon.country}
                        </span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                        <span>
                          <strong className="text-[#1C1715] font-medium">Concierge Line:</strong>{' '}
                          {currentSalon.phone}
                        </span>
                      </p>
                    </div>

                    {/* Primary Luxury CTA Button */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#5A1725] hover:bg-[#3F101A] text-white text-xs font-nav uppercase tracking-[0.22em] font-medium shadow-xl hover:shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer"
                      >
                        <span>Request Private Suite Viewing</span>
                        <ArrowRight className="w-4 h-4 text-[#E8D5B5]" />
                      </button>

                      <span className="text-[11px] font-sans text-[#6B5E55] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#C7A15B]" />
                        By Appointment Only · {currentSalon.suitesCount || 'Private Suites'}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* ------------------------------------------------------ */}
              {/* RIGHT: THE ROYAL ARCH PALACE FRAME                     */}
              {/* ------------------------------------------------------ */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative w-full max-w-[480px] aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] border-2 border-[#C7A15B]/30 p-2.5 rounded-t-[140px] sm:rounded-t-[180px] rounded-b-3xl shadow-2xl bg-white/50">
                  <div className="relative w-full h-full rounded-t-[130px] sm:rounded-t-[170px] rounded-b-2xl overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSalon.slug}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 w-full h-full"
                      >
                        <Image
                          src={currentSalon.salonImage}
                          alt={currentSalon.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                        {/* Top Floating Glass Badge */}
                        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                          <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                            {currentSalon.city} Sanctuary
                          </span>
                          <span className="text-[10px] font-nav uppercase tracking-[0.2em] text-[#C7A15B] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#C7A15B]/40 font-medium">
                            Suite 01
                          </span>
                        </div>

                        {/* Bottom Arch Caption */}
                        <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                          <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#C7A15B] block font-medium">
                            Haute Couture Fitting Chamber
                          </span>
                          <h5 className="font-serif text-2xl font-normal drop-shadow-md">
                            {currentSalon.name}
                          </h5>
                          <p className="text-xs text-white/80 font-sans line-clamp-1">
                            {currentSalon.address}
                          </p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. THE ROYAL WEDDING CHRONICLES (ARCHIVAL FOLIO SPREAD)      */}
        {/* ============================================================ */}
        <div className="space-y-10">
          {/* Header & Carousel Controller */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-black/10 pb-6">
            <div className="space-y-1.5">
              <span className="text-[11px] font-nav uppercase tracking-[0.26em] text-[#C7A15B] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15B]" />
                Archival Commissions · Verified Royal Diaries
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1C1715] font-normal leading-tight">
                The Royal Wedding Diary
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E55] font-sans">
                Real brides commissioned in authentic 24K real gold zari across Udaipur, Lake Como,
                Jaipur, and Jodhpur.
              </p>
            </div>

            {/* Slider Navigation Buttons & Filmstrip Counter */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="font-mono text-xs uppercase tracking-widest text-black/50 mr-2">
                0{activeDiaryIdx + 1} / 0{ROYAL_CLIENT_DIARIES.length}
              </span>
              <button
                type="button"
                onClick={handlePrevDiary}
                className="w-11 h-11 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95 bg-white/70 shadow-sm"
                aria-label="Previous royal wedding commission"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextDiary}
                className="w-11 h-11 rounded-full border border-black/20 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer active:scale-95 bg-white/70 shadow-sm"
                aria-label="Next royal wedding commission"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bride Filmstrip Tab Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {ROYAL_CLIENT_DIARIES.map((diary, idx) => (
              <button
                key={diary.id}
                type="button"
                onClick={() => setActiveDiaryIdx(idx)}
                className={`p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer flex items-center gap-3 border ${
                  activeDiaryIdx === idx
                    ? 'bg-white border-[#5A1725] shadow-md scale-[1.02]'
                    : 'bg-white/60 border-black/5 hover:border-black/20'
                }`}
              >
                <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-black/10">
                  <Image
                    src={diary.portraitImage}
                    alt={diary.clientName}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-mono text-[#C7A15B] block">
                    0{idx + 1}
                  </span>
                  <h5 className="font-serif text-xs text-[#1C1715] font-medium truncate">
                    {diary.clientName}
                  </h5>
                  <span className="text-[10px] font-sans text-black/50 truncate block">
                    {diary.weddingLocation.split(',')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* The Archival Editorial Folio Spread */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDiary.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center bg-white/95 rounded-3xl lg:rounded-[40px] p-8 sm:p-12 lg:p-14 border border-[#C7A15B]/25 shadow-xl"
            >
              {/* Left Column: Real Bride Portrait with Archival Frame */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/5] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#C7A15B]/30 group">
                  <Image
                    src={currentDiary.portraitImage}
                    alt={currentDiary.clientName}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top Seal Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#FAF8F5] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                      Archival Royal Commission
                    </span>
                  </div>

                  {/* Bottom Caption on Portrait */}
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#C7A15B] block font-medium">
                      {currentDiary.venueType || 'Palace Wedding'}
                    </span>
                    <h4 className="font-serif text-2xl font-normal drop-shadow-md">
                      {currentDiary.clientName}
                    </h4>
                    <span className="text-xs font-sans text-white/80 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C7A15B]" />
                      {currentDiary.weddingLocation} · {currentDiary.weddingDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Poetic Quote & Commissioned Ensemble Pill */}
              <div className="lg:col-span-7 space-y-7">
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#C7A15B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C7A15B]" />
                    ))}
                    <span className="text-xs font-mono ml-2 text-black/60">
                      Verified 5.0 Archival Drape
                    </span>
                  </div>

                  <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#1C1715] leading-relaxed font-normal">
                    &ldquo;{currentDiary.quote}&rdquo;
                  </blockquote>

                  <div className="pt-1">
                    <span className="text-xs font-nav uppercase tracking-[0.2em] text-[#5A1725] font-semibold block">
                      {currentDiary.headline}
                    </span>
                    <span className="text-xs font-sans text-black/50 block">
                      Commissioned for {currentDiary.weddingLocation}
                    </span>
                  </div>
                </div>

                {/* The Commissioned Ensemble Card (Unified Product Architecture) */}
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF8F5] border border-[#C7A15B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-sm">
                  <div className="flex items-center gap-4 min-w-0">
                    {/* Craft Detail Macro Image */}
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-black/10 shadow-sm">
                      <Image
                        src={currentDiary.craftDetailImage || currentDiary.ensemble.images[0]}
                        alt={currentDiary.ensemble.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-nav uppercase tracking-wider text-[#5A1725] bg-[#5A1725]/8 px-2.5 py-0.5 rounded-full font-medium">
                          {currentDiary.ensemble.categoryName}
                        </span>
                        {currentDiary.artisanHours && (
                          <span className="text-[10px] font-sans text-[#C7A15B] font-semibold">
                            {currentDiary.artisanHours}
                          </span>
                        )}
                      </div>

                      <h5 className="font-serif text-base sm:text-lg text-[#1C1715] font-medium truncate">
                        {currentDiary.ensemble.name}
                      </h5>

                      <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm font-sans font-semibold text-[#5A1725]">
                          {currentDiary.ensemble.formattedPrice}
                        </span>
                        <span className="text-[11px] font-sans text-black/50">
                          {currentDiary.zariPurity || 'Hallmarked Real Gold Zari'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Wishlist & Commission Drape */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleWishlist(currentDiary.ensemble.id)}
                      className={`p-3 rounded-full border transition-all cursor-pointer ${
                        isInWishlist(currentDiary.ensemble.id)
                          ? 'bg-[#5A1725] text-white border-[#5A1725]'
                          : 'border-black/20 text-black/60 hover:text-[#5A1725] hover:border-[#5A1725] bg-white'
                      }`}
                      aria-label="Wishlist ensemble"
                    >
                      <Heart className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCommissionDrape(currentDiary)}
                      className="px-6 py-3 rounded-full bg-[#5A1725] hover:bg-[#3F101A] text-white text-xs font-nav uppercase tracking-wider font-medium flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#E8D5B5]" />
                      <span>Commission Drape</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 5. VIP PRIVATE SUITE RESERVATION MODAL (FROSTED GLASS)       */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.95, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-white rounded-3xl lg:rounded-[36px] p-8 sm:p-12 shadow-2xl border border-[#C7A15B]/30 overflow-hidden max-h-[92vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/5 hover:bg-black/10 text-black/60 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingConfirmed ? (
                /* Confirmation Screen */
                <div className="py-8 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#5A1725]/10 text-[#5A1725] border border-[#5A1725]/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-[#C7A15B]" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-nav uppercase tracking-[0.25em] text-[#C7A15B] font-semibold block">
                      Imperial Reservation Confirmed
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1715] font-normal">
                      We Await You in {currentSalon.city}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B5E55] max-w-md mx-auto leading-relaxed">
                      Your booking reference is{' '}
                      <strong className="text-[#1C1715] font-mono font-semibold">{bookingRef}</strong>.
                      A Senior Couture Draper has dispatched your salon itinerary to{' '}
                      <span className="text-[#5A1725] font-medium">{formEmail}</span>.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-black/5 text-left space-y-2 text-xs text-[#6B5E55]">
                    <p className="font-serif text-base text-[#1C1715] font-medium">
                      {currentSalon.name}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                      {currentSalon.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                      {currentSalon.phone}
                    </p>
                    {selectedSlot && (
                      <p className="flex items-center gap-2 text-[#5A1725] font-medium pt-1">
                        <Clock className="w-3.5 h-3.5 text-[#C7A15B] shrink-0" />
                        Reserved Slot: {selectedSlot}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setBookingConfirmed(false);
                      setFormName('');
                      setFormPhone('');
                      setFormEmail('');
                    }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#5A1725] text-white text-xs font-nav uppercase tracking-wider font-medium hover:bg-[#3F101A] transition-colors shadow-lg"
                  >
                    <span>Return to Atelier</span>
                  </button>
                </div>
              ) : (
                /* The Booking Form */
                <form onSubmit={handleSubmitBooking} className="space-y-6">
                  <div className="space-y-2 pr-8">
                    <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#5A1725] font-semibold">
                      Private Salon Concierge
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1715] font-medium leading-tight">
                      Reserve Your Fitting Chamber
                    </h3>
                    <p className="text-xs text-[#6B5E55] font-sans">
                      1-on-1 drape consultation with senior stylists at {currentSalon.name}.
                    </p>
                  </div>

                  {/* Salon Selector */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-nav uppercase tracking-wider text-black/70 font-medium block">
                      Salon Location
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {SALON_LOCATIONS.map((salon) => (
                        <button
                          key={salon.slug}
                          type="button"
                          onClick={() => {
                            setActiveSalonSlug(salon.slug);
                            setSelectedSlot('');
                          }}
                          className={`px-3 py-2.5 rounded-xl text-xs font-nav uppercase tracking-wider text-center transition-all ${
                            activeSalonSlug === salon.slug
                              ? 'bg-[#5A1725] text-white font-semibold shadow-md'
                              : 'bg-[#FAF8F5] text-black/70 border border-black/10 hover:border-black/30'
                          }`}
                        >
                          {salon.city}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Type */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-nav uppercase tracking-wider text-black/70 font-medium block">
                      Experience Type
                    </label>
                    <select
                      value={selectedExp}
                      onChange={(e) => setSelectedExp(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#5A1725]"
                    >
                      {ATELIER_EXPERIENCES.map((exp) => (
                        <option key={exp.id} value={exp.id}>
                          {exp.title} ({exp.recommendedDuration})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Client Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Radhika Singhania"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#5A1725]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 12345"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#5A1725]"
                      />
                    </div>
                  </div>

                  {/* Email & Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="client@luxury.in"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#5A1725]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-nav uppercase tracking-wider text-black/60 block mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#5A1725]"
                      />
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-nav uppercase tracking-wider text-black/60 block">
                      Select Available Time Slot
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {currentSalon.timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-sans transition-all text-left flex items-center justify-between cursor-pointer ${
                            selectedSlot === slot
                              ? 'bg-[#C7A15B] text-white font-medium shadow-sm'
                              : 'bg-[#FAF8F5] text-black/70 border border-black/10 hover:border-black/30'
                          }`}
                        >
                          <span className="truncate">{slot}</span>
                          <Clock className="w-3.5 h-3.5 shrink-0 opacity-70 ml-1" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#5A1725] hover:bg-[#3F101A] disabled:opacity-50 text-white font-nav uppercase tracking-[0.22em] text-xs font-medium flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] cursor-pointer"
                    >
                      <span>
                        {isSubmitting ? 'Reserving Private Chamber...' : 'Confirm Appointment'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#E8D5B5]" />
                    </button>
                    <p className="text-[10px] text-center text-black/40 mt-2 font-sans">
                      Client confidentiality accord strictly preserved.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
