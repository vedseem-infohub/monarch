'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Crown, Shield, Package, Check } from 'lucide-react';
import { PATRON_BENEFITS, AUTH_QUOTES } from '@/data/auth';

export interface AuthVisualBannerProps {
  mode: 'login' | 'signup';
}

export const AuthVisualBanner: React.FC<AuthVisualBannerProps> = ({ mode }) => {
  const quote = mode === 'login' ? AUTH_QUOTES[0] : AUTH_QUOTES[1];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'crown':
        return <Crown className="w-4 h-4 text-monarch-gold" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-monarch-gold" />;
      case 'package':
        return <Package className="w-4 h-4 text-monarch-gold" />;
      default:
        return <Sparkles className="w-4 h-4 text-monarch-gold" />;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] lg:min-h-[720px] rounded-3xl overflow-hidden border border-monarch-gold/40 shadow-2xl flex flex-col justify-between p-8 sm:p-12 text-monarch-ivory">
      {/* Background Image: using existing /images/panoramic/ensemble_aarunya.jpg */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/panoramic/ensemble_aarunya.jpg"
          alt="Royal Indian couture bridal silhouette in pure gold handloom silk"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          className="object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Multi-Stop Scrim for 100% contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0A0E] via-[#291116]/85 to-[#1A0A0E]/70" />
        <div className="absolute inset-0 bg-[#240E14]/30 mix-blend-multiply" />
      </div>

      {/* Top Header: Monogram & House Tag */}
      <div className="relative z-10 flex items-center justify-between border-b border-monarch-gold/25 pb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-monarch-maroon/90 border border-monarch-gold flex items-center justify-center text-monarch-gold font-serif text-xl font-bold shadow-md">
            M
          </div>
          <div>
            <span className="block text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light font-medium">
              House of MONARCH
            </span>
            <span className="font-serif text-sm tracking-wide text-monarch-ivory font-light">
              Imperial Silk Sanctum
            </span>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-gold/15 border border-monarch-gold/30 text-[10px] font-nav uppercase tracking-widest text-monarch-gold">
          <Sparkles className="w-3 h-3" />
          <span>Privy Patronage</span>
        </span>
      </div>

      {/* Middle Content: Quote with Arch Filigree Accent */}
      <div className="relative z-10 my-auto py-8">
        <div className="inline-block p-1 rounded-full bg-monarch-gold/20 mb-4">
          <div className="px-3 py-1 rounded-full bg-monarch-maroon/80 border border-monarch-gold/40 text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light">
            {mode === 'login' ? 'Patron Welcome' : 'Royal Charter 2026'}
          </div>
        </div>

        <blockquote className="space-y-4">
          <p className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-snug sm:leading-tight text-monarch-ivory font-normal italic">
            &ldquo;{quote.quote}&rdquo;
          </p>
          <footer className="text-xs font-sans text-monarch-beige">
            <cite className="font-nav uppercase tracking-wider text-monarch-gold not-italic font-medium block">
              {quote.author}
            </cite>
            <span className="text-[11px] text-monarch-beige/70">{quote.title}</span>
          </footer>
        </blockquote>
      </div>

      {/* Bottom Content: Sovereign Patron Privileges List */}
      <div className="relative z-10 border-t border-monarch-gold/25 pt-6 space-y-3">
        <span className="block text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-gold-light font-semibold">
          Sovereign Privileges
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PATRON_BENEFITS.slice(0, 4).map((benefit) => (
            <div
              key={benefit.id}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/40 border border-monarch-gold/20 backdrop-blur-sm"
            >
              <div className="p-1 rounded-md bg-monarch-maroon/80 shrink-0 mt-0.5">
                {renderIcon(benefit.iconName)}
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-serif font-medium text-monarch-ivory block leading-tight">
                  {benefit.title}
                </span>
                <span className="text-[10px] font-sans text-monarch-beige/70 block leading-tight line-clamp-1">
                  {benefit.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

