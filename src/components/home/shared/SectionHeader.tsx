'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  theme?: 'light' | 'dark';
  align?: 'center' | 'left' | 'split';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  italicWord,
  description,
  ctaText,
  ctaHref,
  theme = 'light',
  align = 'center',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const textColor = isDark ? 'text-monarch-ivory' : 'text-monarch-charcoal';
  const eyebrowBg = isDark
    ? 'bg-monarch-gold/15 text-monarch-gold-light border-monarch-gold/30'
    : 'bg-monarch-maroon/10 text-monarch-maroon border-monarch-maroon/20';
  const descColor = isDark ? 'text-monarch-beige/80' : 'text-monarch-charcoal/75';
  const ctaColor = isDark
    ? 'text-monarch-gold-light hover:text-white border-monarch-gold/40 hover:border-monarch-gold'
    : 'text-monarch-maroon hover:text-monarch-maroon-dark border-monarch-maroon/30 hover:border-monarch-maroon';

  if (align === 'split') {
    return (
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b ${isDark ? 'border-monarch-gold/20' : 'border-monarch-gold/30'} ${className}`}>
        <div className="max-w-2xl space-y-2">
          {eyebrow && (
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-nav uppercase tracking-[0.25em] font-medium ${eyebrowBg}`}>
              <Sparkles className="w-3 h-3 text-monarch-gold" />
              <span>{eyebrow}</span>
            </div>
          )}
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${textColor}`}>
            {title}{' '}
            {italicWord && (
              <span className="font-serif italic font-light text-monarch-gold-light">
                {italicWord}
              </span>
            )}
          </h2>
          {description && (
            <p className={`text-xs sm:text-sm font-sans leading-relaxed max-w-xl ${descColor}`}>
              {description}
            </p>
          )}
        </div>

        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 group ${ctaColor}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1.5 transition-transform" />
          </Link>
        )}
      </div>
    );
  }

  const isLeft = align === 'left';

  return (
    <div
      className={`max-w-3xl space-y-3 ${
        isLeft ? 'text-left' : 'text-center mx-auto'
      } ${className}`}
    >
      {eyebrow && (
        <div
          className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-[11px] font-nav uppercase tracking-[0.25em] font-medium ${eyebrowBg}`}
        >
          <Sparkles className="w-3 h-3 text-monarch-gold" />
          <span>{eyebrow}</span>
        </div>
      )}

      <h2
        className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight ${textColor}`}
      >
        {title}{' '}
        {italicWord && (
          <span className="font-serif italic font-light text-monarch-gold-light">
            {italicWord}
          </span>
        )}
      </h2>

      {description && (
        <p
          className={`text-xs sm:text-sm font-sans leading-relaxed ${
            isLeft ? 'max-w-xl' : 'max-w-xl mx-auto'
          } ${descColor}`}
        >
          {description}
        </p>
      )}

      {ctaText && ctaHref && (
        <div className={`pt-2 ${isLeft ? '' : 'flex justify-center'}`}>
          <Link
            href={ctaHref}
            className={`inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] font-semibold pb-1 border-b transition-all duration-300 group ${ctaColor}`}
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      )}
    </div>
  );
};
