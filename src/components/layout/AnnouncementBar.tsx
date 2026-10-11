'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-monarch-burgundy-deep via-monarch-burgundy to-monarch-burgundy-deep text-monarch-ivory border-b border-monarch-gold/25 text-xs py-2 px-4 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 hidden md:block" />

        {/* <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-monarch-gold-light shrink-0 animate-pulse" />
          <p className="tracking-widest uppercase font-nav text-[11px] text-monarch-beige">
            An ode to Indian craftsmanship ·{' '}
            <span className="text-monarch-gold-light font-medium">
              Discover the Festive 2026 Collection
            </span>{' '}
            ·{' '}
            <Link
              href="/collections/wedding-edit"
              className="underline underline-offset-2 hover:text-monarch-ivory transition-colors"
            >
              Complimentary Worldwide Insured Delivery
            </Link>
          </p>
        </div> */}

        <button
          onClick={() => setIsVisible(false)}
          className="text-monarch-beige/70 hover:text-monarch-ivory p-0.5 rounded transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
