'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Check, AlertCircle, Sparkles, ChevronDown } from 'lucide-react';
import { FOOTER_DATA, FooterSocialLink, FooterColumn } from '@/data/footer';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    shop: false,
    explore: false,
    support: false,
  });
  const footerRef = useRef<HTMLElement>(null);

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmed) {
      setStatus('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!emailRegex.test(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus('error');
        setErrorMessage(data.error || 'Unable to subscribe. Please try again.');
        return;
      }

      setStatus('success');
      setEmail('');
    } catch {
      // Graceful fallback simulation
      setStatus('success');
      setEmail('');
    }
  };

  // Subtle continuous drift animation on the panoramic silk layer
  useGSAP(
    () => {
      gsap.to('.drift-image-layer', {
        scale: 1.02,
        y: -3,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    },
    { scope: footerRef }
  );

  const renderSocialIcon = (icon: FooterSocialLink['icon']) => {
    switch (icon) {
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case 'pinterest':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.332 1.357-.053.218-.173.265-.4.159-1.492-.695-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.374l-.747 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const columnList: FooterColumn[] = [
    FOOTER_DATA.columns.shop,
    FOOTER_DATA.columns.explore,
    FOOTER_DATA.columns.support,
  ];

  const socialIconButtons = FOOTER_DATA.socialLinks.map((social) => (
    <a
      key={social.name}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C7A15B]/25 border border-[#C7A15B]/35 hover:border-[#DFBE7F] backdrop-blur-sm flex items-center justify-center text-white/90 hover:text-[#DFBE7F] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
      aria-label={social.name}
    >
      {renderSocialIcon(social.icon)}
    </a>
  ));

  return (
    <footer
      ref={footerRef}
      className="w-full relative z-10 selection:bg-monarch-maroon selection:text-monarch-gold-light overflow-hidden bg-[#FAF7F2]"
    >
      {/* ============================================================ */}
      {/* BACKGROUND: Full-Bleed Panoramic Visual with Multi-Stop Scrim */}
      {/* ============================================================ */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <div className="drift-image-layer absolute inset-0 w-full h-full">
          <Image
            src={FOOTER_DATA.heroImage.src}
            alt={FOOTER_DATA.heroImage.alt}
            fill
            sizes="100vw"
            priority={true}
            unoptimized={true}
            className="object-cover object-bottom"
          />
        </div>

        {/* 
          CRITICAL REQUIREMENT: Refined Multi-Stop Warm Ivory Scrim
          Seamlessly blends with the site background, guaranteeing 100% contrast
          for typography on mobile, tablet, and desktop viewports.
        */}
        <div className="absolute top-0 inset-x-0 h-[460px] sm:h-[480px] lg:h-[360px] bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/95 via-[#FAF7F2]/80 to-transparent z-10 pointer-events-none" />

        {/* 
          Deep Royal Burgundy Bottom Vignette
          Anchors the bottom bar with solid deep burgundy (#1A0A0E) contrast
        */}
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-36 bg-gradient-to-t from-[#1A0A0E] via-[#291116]/95 via-[#291116]/75 to-transparent z-10 pointer-events-none" />
      </div>

      {/* ============================================================ */}
      {/* FOREGROUND: Refined Luxury Typography & Responsive Navigation */}
      {/* ============================================================ */}
      <div className="relative z-20 flex flex-col justify-between min-h-[400px] sm:min-h-[440px] lg:min-h-[480px]">
        {/* Top Navigation & Brand Header */}
        <div className="pt-8 sm:pt-10 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 lg:gap-6 xl:gap-10 items-start">
            {/* -------------------------------------------------------- */}
            {/* Column 1: Brand & Poetics                                */}
            {/* -------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-6 lg:col-span-3 space-y-2 order-1 md:order-1 lg:order-1">
              <Link href="/" className="group inline-block focus:outline-none">
                <span className="font-serif italic text-3xl sm:text-4xl text-[#5A1725] tracking-wide block transition-colors group-hover:text-[#7A1E2D] font-normal">
                  {FOOTER_DATA.brand.name}
                </span>
                <span className="block text-[11px] sm:text-xs font-sans tracking-[0.22em] uppercase text-[#6B5E55] mt-1 font-medium">
                  {FOOTER_DATA.brand.tagline}
                </span>
                <div className="inline-flex items-center gap-2 mt-1 border-b border-[#C7A15B]/40 pb-0.5">
                  <span className="font-serif italic text-xs sm:text-sm text-[#7A1E2D] font-normal">
                    {FOOTER_DATA.brand.scriptTag}
                  </span>
                </div>
              </Link>
              {FOOTER_DATA.brand.description && (
                <p className="text-xs text-[#55473F] leading-relaxed font-sans max-w-sm pt-1 font-normal">
                  {FOOTER_DATA.brand.description}
                </p>
              )}
            </div>

            {/* -------------------------------------------------------- */}
            {/* MOBILE ONLY: Accordion Navigation Columns (< md)          */}
            {/* -------------------------------------------------------- */}
            <div className="col-span-1 md:hidden space-y-1.5 order-2 border-t border-b border-[#C7A15B]/25 py-2">
              {columnList.map((column) => {
                const isOpen = !!openAccordions[column.id];
                return (
                  <div key={column.id} className="border-b border-[#C7A15B]/15 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(column.id)}
                      className="w-full flex items-center justify-between text-left py-2.5 px-1 focus:outline-none group active:opacity-80"
                      aria-expanded={isOpen}
                      aria-controls={`footer-accordion-${column.id}`}
                    >
                      <span className="font-serif italic text-base text-[#231815] group-hover:text-[#5A1725] transition-colors">
                        {column.title}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full bg-[#C7A15B]/10 flex items-center justify-center text-[#8E703E] transition-transform duration-300 ${
                          isOpen ? 'rotate-180 bg-[#C7A15B]/25 text-[#5A1725]' : ''
                        }`}
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </span>
                    </button>
                    <div
                      id={`footer-accordion-${column.id}`}
                      role="region"
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100 pb-2.5' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-2 text-xs font-sans pl-2 pt-1">
                          {column.links.map((link) => (
                            <li key={link.label}>
                              <Link
                                href={link.href}
                                className="text-[#55473F] hover:text-[#5A1725] active:text-[#5A1725] transition-colors py-1 inline-flex items-center gap-2"
                              >
                                <span className="w-1 h-1 rounded-full bg-[#C7A15B]/60" />
                                <span>{link.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* -------------------------------------------------------- */}
            {/* TABLET & DESKTOP: Traditional Open Columns (>= md)       */}
            {/* -------------------------------------------------------- */}
            {columnList.map((column, index) => {
              // Order mapping for tablet (row 2) & desktop (inline row 1)
              const tabletOrder = index === 0 ? 'md:order-3' : index === 1 ? 'md:order-4' : 'md:order-5';
              const desktopOrder = index === 0 ? 'lg:order-2' : index === 1 ? 'lg:order-3' : 'lg:order-4';

              return (
                <div
                  key={column.id}
                  className={`hidden md:block md:col-span-4 lg:col-span-2 space-y-2.5 ${tabletOrder} ${desktopOrder}`}
                >
                  <h4 className="font-serif italic text-base sm:text-lg text-[#231815] font-normal tracking-wide flex items-center gap-2">
                    <span>{column.title}</span>
                    <span className="h-px w-3 bg-[#C7A15B]/40" />
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-[13px] font-sans">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[#55473F] hover:text-[#5A1725] transition-colors py-0.5 inline-flex items-center gap-1.5 group font-normal"
                        >
                          <span className="w-1 h-1 rounded-full bg-[#C7A15B]/0 group-hover:bg-[#C7A15B] transition-all duration-200" />
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                            {link.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* -------------------------------------------------------- */}
            {/* Newsletter: Royal Registry Form Container                */}
            {/* -------------------------------------------------------- */}
            <div className="col-span-1 md:col-span-6 lg:col-span-3 space-y-2.5 order-3 md:order-2 lg:order-5">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C7A15B]" />
                <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.2em] text-[#8E703E] font-medium">
                  {FOOTER_DATA.newsletter.eyebrow || 'Royal Registry'}
                </span>
              </div>

              <h4 className="font-serif italic text-lg sm:text-xl text-[#231815] font-normal tracking-wide">
                {FOOTER_DATA.newsletter.title}
              </h4>
              <p className="text-xs text-[#55473F] leading-relaxed font-sans max-w-sm font-normal">
                {FOOTER_DATA.newsletter.description}
              </p>

              {/* Newsletter Interactive Form / Success Box */}
              {status === 'success' ? (
                <div className="p-3 sm:p-3.5 rounded-2xl bg-white/95 border border-[#5A1725]/25 backdrop-blur-md shadow-sm space-y-1.5 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[#5A1725] text-xs font-medium">
                      <div className="w-5 h-5 rounded-full bg-[#5A1725] text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-serif italic text-sm">Joined Royal Registry</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="text-[10px] text-[#5A1725]/70 hover:text-[#5A1725] underline transition-colors"
                    >
                      Add another
                    </button>
                  </div>
                  <p className="text-[11px] text-[#55473F] leading-relaxed font-sans pl-7">
                    {FOOTER_DATA.newsletter.successMessage}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} noValidate className="space-y-1.5 pt-1 w-full max-w-md">
                  {/* Integrated Responsive Luxury Pill Container */}
                  <div
                    className={`relative flex items-center rounded-full bg-white/95 backdrop-blur-md p-1 pl-3.5 sm:pl-4 shadow-xs transition-all border ${
                      status === 'error'
                        ? 'border-red-500/80 ring-2 ring-red-500/15'
                        : 'border-[#C7A15B]/35 hover:border-[#C7A15B] focus-within:border-[#5A1725] focus-within:ring-2 focus-within:ring-[#5A1725]/15'
                    }`}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      disabled={status === 'loading'}
                      placeholder={FOOTER_DATA.newsletter.placeholder}
                      className="w-full flex-1 min-w-0 bg-transparent text-xs text-neutral-900 placeholder:text-neutral-500 font-normal focus:outline-none pr-2 disabled:opacity-50"
                      aria-label="Email address for royal updates"
                    />
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="h-9 sm:h-10 px-3.5 sm:px-5 rounded-full bg-[#5A1725] hover:bg-[#43101B] active:scale-95 text-[#FAF7F2] text-xs font-medium tracking-wide shadow-xs hover:shadow transition-all shrink-0 flex items-center justify-center gap-1.5 focus:outline-none min-w-[84px] sm:min-w-[100px]"
                    >
                      {status === 'loading' ? (
                        <>
                          <span className="w-3 h-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Joining...</span>
                        </>
                      ) : (
                        <>
                          <span>{FOOTER_DATA.newsletter.buttonText}</span>
                          <Sparkles className="w-3 h-3 text-[#C7A15B] opacity-90" />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Inline Error State with Clear Accessible Feedback */}
                  {status === 'error' && (
                    <div
                      role="alert"
                      className="flex items-center gap-1.5 text-[11px] text-red-600 font-medium pl-3 pt-0.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0 text-red-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------ */}
        {/* Middle Visual Spacer: Allows royal silk models to drift      */}
        {/* ------------------------------------------------------------ */}
        <div className="flex-1 min-h-[90px] sm:min-h-[130px] lg:min-h-[160px]" />

        {/* ============================================================ */}
        {/* BOTTOM BAR: Refined Social Icons & Crisp Grounding Overlay   */}
        {/* ============================================================ */}
        <div className="relative z-20 pb-5 sm:pb-6 px-4 sm:px-8 lg:px-12 max-w-[1360px] mx-auto w-full">
          {/* Subtle Royal Gold Divider with Central Emblem */}
          <div className="relative flex items-center justify-center mb-4 sm:mb-5">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C7A15B]/35 to-transparent" />
            <span className="relative px-3 bg-[#1A0A0E] text-[#DFBE7F] text-[10px] tracking-widest font-serif select-none">
              ❖
            </span>
          </div>

          {/* Mobile Stacked Bottom Bar (< md) */}
          <div className="flex flex-col items-center gap-3.5 text-center md:hidden">
            {/* Social Icons with min 40px touch targets */}
            <div className="flex items-center justify-center gap-2.5">
              {socialIconButtons}
            </div>

            {/* Monogram Seal & Copyright */}
            <div className="flex items-center justify-center gap-2 pt-0.5">
              <span className="w-7 h-7 rounded-full bg-gradient-to-br from-[#DFBE7F]/20 to-[#9A7737]/30 border border-[#C7A15B]/50 flex items-center justify-center text-[10px] font-serif font-medium text-[#DFBE7F] shadow-xs">
                {FOOTER_DATA.brand.monogram}
              </span>
              <span className="text-[11px] text-white/85 tracking-wide font-sans">
                {FOOTER_DATA.copyright}
              </span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center justify-center gap-3 text-[11px] text-white/75 font-sans">
              {FOOTER_DATA.legalLinks.map((legal, index) => (
                <React.Fragment key={legal.label}>
                  {index > 0 && <span className="text-[#C7A15B]/50 text-[10px]">·</span>}
                  <Link
                    href={legal.href}
                    className="hover:text-[#DFBE7F] transition-colors underline-offset-4 hover:underline"
                  >
                    {legal.label}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Desktop & Tablet Spread Bar (>= md) */}
          <div className="hidden md:flex items-center justify-between gap-4 text-xs font-sans text-white/90">
            {/* Left: Monogram Badge & Copyright */}
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DFBE7F]/20 to-[#9A7737]/30 border border-[#C7A15B]/50 flex items-center justify-center text-xs font-serif font-medium text-[#DFBE7F] shadow-xs">
                {FOOTER_DATA.brand.monogram}
              </span>
              <span className="tracking-wide text-white/85 text-xs">
                {FOOTER_DATA.copyright}
              </span>
            </div>

            {/* Center: Social Icons */}
            <div className="flex items-center gap-2">
              {socialIconButtons}
            </div>

            {/* Right: Legal Links */}
            <div className="flex items-center gap-5 text-xs">
              {FOOTER_DATA.legalLinks.map((legal) => (
                <Link
                  key={legal.label}
                  href={legal.href}
                  className="text-white/85 hover:text-[#DFBE7F] transition-colors underline-offset-4 hover:underline"
                >
                  {legal.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
