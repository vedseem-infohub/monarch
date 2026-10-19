'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Phone,
  Heart,
  ShoppingBag,
} from 'lucide-react';
import {
  ROYAL_CLIENT_DIARIES,
  CRAFT_SANCTUM_PILLARS,
  SALON_LOCATIONS,
  ATELIER_EXPERIENCES,
  ClientDiaryEntry,
  SalonLocation,
} from '@/data/atelier';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

gsap.registerPlugin(ScrollTrigger);

export const AtelierSanctum: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Active state for Royal Diary Carousel
  const [activeDiaryIdx, setActiveDiaryIdx] = useState(0);

  // Active state for Salon Location Concierge
  const [activeSalonSlug, setActiveSalonSlug] = useState('new-delhi');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedExp, setSelectedExp] = useState(ATELIER_EXPERIENCES[0].id);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formDate, setFormDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const currentDiary = ROYAL_CLIENT_DIARIES[activeDiaryIdx];
  const currentSalon =
    SALON_LOCATIONS.find((s) => s.slug === activeSalonSlug) || SALON_LOCATIONS[0];

  const handlePrevDiary = () => {
    setActiveDiaryIdx((prev) => (prev === 0 ? ROYAL_CLIENT_DIARIES.length - 1 : prev - 1));
  };

  const handleNextDiary = () => {
    setActiveDiaryIdx((prev) => (prev === ROYAL_CLIENT_DIARIES.length - 1 ? 0 : prev + 1));
  };

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

  // GSAP subtle scroll-triggered entrance
  useGSAP(
    () => {
      gsap.from('.atelier-header-item', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.karigari-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.karigari-grid',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="atelier-sanctum"
      className="relative bg-[#FBF9F6] text-[#1C1715] py-24 sm:py-32 overflow-hidden selection:bg-[#7B1123] selection:text-[#FBF9F6]"
    >
      {/* Subtle Background Geometric Lattice Scrim */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#7B1123_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-[1360px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10 space-y-20 lg:space-y-28">
        {/* ============================================================ */}
        {/* 1. SECTION HEADER: ROYAL ATELIER & SANCTUM                   */}
        {/* ============================================================ */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="atelier-header-item inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C7A15B]/30 text-[11px] font-nav uppercase tracking-[0.25em] text-[#7B1123] shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C7A15B]" />
            <span>The Private Atelier &amp; Karigari Guild</span>
          </div>

          <h2 className="atelier-header-item font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#1C1715] leading-[1.08] tracking-[-0.02em]">
            A Legacy Commissioned in{' '}
            <span className="italic font-light text-[#7B1123]">Pure Gold</span>
          </h2>

          <p className="atelier-header-item text-xs sm:text-sm text-[#6B5E55] font-sans leading-relaxed max-w-2xl mx-auto">
            From the subterranean pitlooms of Varanasi to private couture suites in Mehrauli,
            Kala Ghoda, and Mayfair — experience bespoke Indian bridal commissions crafted without compromise.
          </p>
        </div>

        {/* ============================================================ */}
        {/* 2. THE THREE KARIGARI PILLARS (HALLMARKED CRAFT STANDARDS)   */}
        {/* ============================================================ */}
        <div className="karigari-grid grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CRAFT_SANCTUM_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="karigari-card group relative bg-white rounded-3xl p-7 lg:p-8 border border-black/[0.06] hover:border-[#C7A15B]/50 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle gold glow on card hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7A15B]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-[#7B1123] bg-[#7B1123]/5 px-3 py-1 rounded-full font-medium border border-[#7B1123]/10">
                    {pillar.badge}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#C7A15B]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#1C1715] font-medium leading-snug">
                    {pillar.title}
                  </h3>
                  <span className="text-xs font-nav uppercase tracking-[0.18em] text-[#C7A15B] block font-medium">
                    {pillar.subtitle}
                  </span>
                </div>

                <p className="text-xs text-[#6B5E55] font-sans leading-relaxed line-clamp-3">
                  {pillar.description}
                </p>
              </div>

              {/* Metric & Macro Thumbnail Strip */}
              <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between relative z-10">
                <div>
                  <span className="font-serif text-3xl text-[#1C1715] font-light block leading-none">
                    {pillar.statMetric}
                  </span>
                  <span className="text-[10px] font-sans text-[#6B5E55] uppercase tracking-wider block mt-1">
                    {pillar.statLabel}
                  </span>
                </div>

                <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#C7A15B]/30 shrink-0 relative shadow-inner">
                  <Image
                    src={pillar.macroImage}
                    alt={pillar.title}
                    fill
                    sizes="48px"
                    className="object-cover group-hover:scale-115 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 3. TWO-COLUMN VIP SUITE: ROYAL DIARY & SALON CONCIERGE       */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* ======================================================== */}
          {/* LEFT COLUMN: ROYAL CLIENT DIARY (REAL BRIDAL COMMISSIONS) */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-10 border border-black/[0.06] shadow-md relative overflow-hidden flex flex-col justify-between min-h-[580px]">
            {/* Scrim corner light */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-[#7B1123]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header Bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#C7A15B] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C7A15B]" />
                  Verified Royal Commission
                </span>
                <span className="font-nav text-xs uppercase tracking-widest text-black/40">
                  0{activeDiaryIdx + 1} / 0{ROYAL_CLIENT_DIARIES.length}
                </span>
              </div>

              {/* Animated Diary Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDiary.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Cathedral Arch Bride Portrait */}
                  <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-lg border border-black/5">
                    <Image
                      src={currentDiary.portraitImage}
                      alt={currentDiary.clientName}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                    {/* Venue & Date Tag on Portrait */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <h4 className="font-serif text-lg sm:text-xl font-medium drop-shadow-md">
                          {currentDiary.clientName}
                        </h4>
                        <span className="text-xs font-sans text-white/80 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C7A15B]" />
                          {currentDiary.weddingLocation} · {currentDiary.weddingDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Poetic Quote */}
                  <blockquote className="font-serif italic text-lg sm:text-xl text-[#231815] leading-relaxed font-normal">
                    &ldquo;{currentDiary.quote}&rdquo;
                  </blockquote>

                  {/* Featured Product Pill (Unified Product Architecture) */}
                  <div className="p-3.5 rounded-2xl bg-[#FBF9F6] border border-black/5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-14 rounded-lg overflow-hidden relative shrink-0 border border-black/10">
                        <Image
                          src={currentDiary.ensemble.images[0]}
                          alt={currentDiary.ensemble.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-nav uppercase tracking-wider text-[#C7A15B] font-medium block">
                          Commissioned Ensemble
                        </span>
                        <h5 className="font-serif text-sm text-[#1C1715] font-medium truncate">
                          {currentDiary.ensemble.name}
                        </h5>
                        <span className="text-xs font-sans font-semibold text-[#7B1123] block">
                          {currentDiary.ensemble.formattedPrice}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(currentDiary.ensemble.id)}
                        className={`p-2 rounded-full border transition-colors ${
                          isInWishlist(currentDiary.ensemble.id)
                            ? 'bg-[#7B1123] text-white border-[#7B1123]'
                            : 'border-black/15 text-black/60 hover:text-[#7B1123] hover:border-[#7B1123]'
                        }`}
                        aria-label="Wishlist ensemble"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          addToCart(
                            currentDiary.ensemble,
                            currentDiary.ensemble.colors[0].name,
                            currentDiary.ensemble.sizes[0],
                            1
                          )
                        }
                        className="px-3 py-1.5 rounded-full bg-[#7B1123] hover:bg-[#600C1B] text-white text-[11px] font-nav uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Commission</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-black/5 relative z-10 mt-6">
              <div className="flex gap-1.5">
                {ROYAL_CLIENT_DIARIES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveDiaryIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeDiaryIdx === idx ? 'w-6 bg-[#7B1123]' : 'w-2 bg-black/15 hover:bg-black/30'
                    }`}
                    aria-label={`View client diary slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevDiary}
                  className="w-9 h-9 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Previous client diary"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextDiary}
                  className="w-9 h-9 rounded-full border border-black/15 hover:border-black text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Next client diary"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: PRIVATE SALON & ATELIER BOOKING CONCIERGE  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-7 sm:p-10 border border-black/[0.06] shadow-md relative overflow-hidden flex flex-col justify-between min-h-[580px]">
            {/* Scrim gold corner */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A15B]/10 rounded-full blur-3xl pointer-events-none" />

            {bookingConfirmed ? (
              /* Success Confirmation Card */
              <div className="my-auto py-8 text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#7B1123]/10 text-[#7B1123] border border-[#7B1123]/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-nav uppercase tracking-[0.25em] text-[#C7A15B] font-semibold block">
                    Imperial Consultation Confirmed
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1715] font-medium">
                    We Await You in {currentSalon.city}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B5E55] max-w-md mx-auto leading-relaxed">
                    Your appointment reference is{' '}
                    <strong className="text-[#1C1715] font-semibold">{bookingRef}</strong>. Our
                    Senior Couture Concierge has sent calendar directions to{' '}
                    <span className="text-[#7B1123] font-medium">{formEmail}</span>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF9F6] border border-black/5 max-w-sm mx-auto text-left space-y-1.5 text-xs text-[#6B5E55]">
                  <p className="font-serif text-sm text-[#1C1715] font-medium">
                    {currentSalon.name}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#C7A15B] shrink-0" />
                    {currentSalon.address}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-[#C7A15B] shrink-0" />
                    {currentSalon.phone}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setBookingConfirmed(false);
                    setFormName('');
                    setFormPhone('');
                    setFormEmail('');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-black/20 text-xs font-nav uppercase tracking-wider text-black/80 hover:border-black transition-colors"
                >
                  <span>Book Another Consultation</span>
                </button>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmitBooking} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#7B1123] font-semibold">
                      VIP Salon Concierge
                    </span>
                    <span className="text-[10px] font-nav uppercase tracking-wider text-[#C7A15B] bg-[#C7A15B]/10 px-2.5 py-0.5 rounded-full">
                      By Appointment Only
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1715] font-medium leading-tight">
                    Reserve Your Private Suite
                  </h3>
                  <p className="text-xs text-[#6B5E55] font-sans">
                    Complimentary 1-on-1 styling with master drapers and champagne hospitality.
                  </p>
                </div>

                {/* Salon Location Pills */}
                <div className="space-y-2">
                  <label className="text-[11px] font-nav uppercase tracking-wider text-black/70 font-medium block">
                    Select Flagship Salon
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
                        className={`px-3 py-2 rounded-xl text-xs font-nav uppercase tracking-wider transition-all text-center ${
                          activeSalonSlug === salon.slug
                            ? 'bg-[#7B1123] text-white font-semibold shadow-sm'
                            : 'bg-[#FBF9F6] text-black/70 border border-black/10 hover:border-black/30'
                        }`}
                      >
                        {salon.city}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Type */}
                <div className="space-y-2">
                  <label className="text-[11px] font-nav uppercase tracking-wider text-black/70 font-medium block">
                    Consultation Type
                  </label>
                  <select
                    value={selectedExp}
                    onChange={(e) => setSelectedExp(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FBF9F6] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#7B1123]"
                  >
                    {ATELIER_EXPERIENCES.map((exp) => (
                      <option key={exp.id} value={exp.id}>
                        {exp.title} ({exp.recommendedDuration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Client Contact Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F6] border border-black/10 text-xs font-sans text-[#1C1715] placeholder:text-black/30 focus:outline-none focus:border-[#7B1123]"
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F6] border border-black/10 text-xs font-sans text-[#1C1715] placeholder:text-black/30 focus:outline-none focus:border-[#7B1123]"
                    />
                  </div>
                </div>

                {/* Email & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F6] border border-black/10 text-xs font-sans text-[#1C1715] placeholder:text-black/30 focus:outline-none focus:border-[#7B1123]"
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
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FBF9F6] border border-black/10 text-xs font-sans text-[#1C1715] focus:outline-none focus:border-[#7B1123]"
                    />
                  </div>
                </div>

                {/* Available Time Slots */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-nav uppercase tracking-wider text-black/60 block">
                    Available Private Slots
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {currentSalon.timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-sans transition-all text-left flex items-center justify-between ${
                          selectedSlot === slot
                            ? 'bg-[#C7A15B] text-white font-medium shadow-sm'
                            : 'bg-[#FBF9F6] text-black/70 border border-black/10 hover:border-black/30'
                        }`}
                      >
                        <span className="truncate">{slot}</span>
                        <Clock className="w-3 h-3 shrink-0 opacity-70 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-full bg-[#7B1123] hover:bg-[#600C1B] disabled:opacity-50 text-white font-nav uppercase tracking-[0.2em] text-xs font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
                  >
                    <span>{isSubmitting ? 'Reserving Suite...' : 'Request Private Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-black/40 mt-2 font-sans">
                    Guaranteed private fitting suite. Client confidentiality strictly preserved.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
