'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ArchedCampaignItem } from '@/data/autumnWinter';

interface ArchedCardProps {
  item: ArchedCampaignItem;
  priority?: boolean;
}

export const ArchedCard: React.FC<ArchedCardProps> = ({ item, priority = false }) => {
  return (
    <Link
      href={item.href}
      className="arched-card group relative block w-full aspect-[3/4.5] sm:aspect-[3/4.6] rounded-t-[140px] sm:rounded-t-[180px] lg:rounded-t-[210px] rounded-b-2xl overflow-hidden bg-monarch-charcoal border border-monarch-gold/30 hover:border-monarch-gold transition-all duration-500 shadow-xl hover:shadow-[0_24px_50px_rgba(212,175,55,0.25)] select-none will-change-transform"
    >
      {/* High-Resolution Luxury Photoshoot Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />

      {/* Editorial Luxury Gradient Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#140609]/95 via-[#140609]/25 to-transparent transition-opacity duration-500 group-hover:opacity-85 pointer-events-none" />

      {/* Top Heritage Arch Highlight Halo */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-monarch-gold/15 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col justify-end space-y-2 pointer-events-none z-10">
        <div className="flex items-center justify-between">
          <span className="inline-block text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full text-monarch-gold-light border border-monarch-gold/30">
            {item.tag}
          </span>

          <span className="w-7 h-7 rounded-full bg-black/50 group-hover:bg-monarch-gold/90 backdrop-blur-md flex items-center justify-center text-monarch-gold group-hover:text-[#140609] border border-monarch-gold/30 transition-all duration-300 transform group-hover:scale-110">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <h3 className="font-serif text-lg sm:text-xl lg:text-2xl text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1 leading-snug">
          {item.title}
        </h3>

        <p className="text-[11px] font-sans text-monarch-beige/80 line-clamp-1">
          {item.subtitle}
        </p>

        <div className="pt-1.5 flex items-center justify-between text-[11px] font-nav uppercase tracking-wider text-monarch-beige/70 group-hover:text-white border-t border-monarch-gold/20 transition-colors">
          <span>{item.saree}</span>
          <span className="text-monarch-gold group-hover:underline">Explore</span>
        </div>
      </div>
    </Link>
  );
};
