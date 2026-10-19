'use client';

import React from 'react';
import Link from 'next/link';
import { WOMEN_CATEGORIES, MEN_CATEGORIES } from '@/data/categories';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MegaMenuProps {
  activeMenu: 'women' | 'men' | 'wedding' | null;
  onClose: () => void;
  isGlossy?: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ activeMenu, onClose, isGlossy = false }) => {
  if (!activeMenu) return null;

  return (
    <div
      onMouseLeave={onClose}
      className={`absolute top-full left-0 right-0 z-40 animate-fadeIn transition-colors duration-500 border-none ${
        isGlossy
          ? 'bg-gradient-to-b from-black/90 via-black/88 to-black/85 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.7)]'
          : 'bg-[#240E14]/98 backdrop-blur-xl shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {activeMenu === 'women' && (
          <div>
            <div className={`flex items-center justify-between pb-4 mb-6 ${isGlossy ? 'border-none' : 'border-b border-monarch-gold/20'}`}>
              <div>
                <h3 className="font-serif text-2xl text-monarch-ivory font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.85)]">
                  Women&rsquo;s Royal Haute Couture
                </h3>
                <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold-light/90 mt-1 [text-shadow:_0_1px_3px_rgba(0,0,0,0.75)]">
                  Bridal Lehengas, Handwoven Banarasi Sarees &amp; Regal Kalidars
                </p>
              </div>
              <Link
                href="/collections/women"
                onClick={onClose}
                className="text-xs font-nav uppercase tracking-wider text-monarch-gold-light hover:text-white flex items-center gap-1.5 transition-colors font-medium [text-shadow:_0_1px_3px_rgba(0,0,0,0.75)]"
              >
                <span>View Full Women&rsquo;s Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {WOMEN_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  onClick={onClose}
                  className={`group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    isGlossy
                      ? 'border border-white/10 hover:border-monarch-gold/60 bg-black/50 hover:bg-black/70 backdrop-blur-md shadow-lg'
                      : 'border border-monarch-gold/20 hover:border-monarch-gold bg-monarch-burgundy shadow-lg'
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-monarch-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-nav uppercase tracking-wider text-monarch-gold-light font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)]">
                      {cat.itemCount} Designs
                    </span>
                  </div>
                  <div className={`p-2.5 transition-colors ${isGlossy ? 'bg-black/60 backdrop-blur-sm' : 'bg-monarch-burgundy'}`}>
                    <h4 className="font-serif text-sm text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1 [text-shadow:_0_1px_3px_rgba(0,0,0,0.85)]">
                      {cat.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeMenu === 'men' && (
          <div>
            <div className={`flex items-center justify-between pb-4 mb-6 ${isGlossy ? 'border-none' : 'border-b border-monarch-gold/20'}`}>
              <div>
                <h3 className="font-serif text-2xl text-monarch-ivory font-medium [text-shadow:_0_1px_4px_rgba(0,0,0,0.85)]">
                  Men&rsquo;s Imperial Wardrobe
                </h3>
                <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold-light/90 mt-1 [text-shadow:_0_1px_3px_rgba(0,0,0,0.75)]">
                  Bespoke Sherwanis, Heritage Bandhgalas &amp; Brocade Jackets
                </p>
              </div>
              <Link
                href="/collections/men"
                onClick={onClose}
                className="text-xs font-nav uppercase tracking-wider text-monarch-gold-light hover:text-white flex items-center gap-1.5 transition-colors font-medium [text-shadow:_0_1px_3px_rgba(0,0,0,0.75)]"
              >
                <span>View Full Men&rsquo;s Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
              {MEN_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/collections/${cat.slug}`}
                  onClick={onClose}
                  className={`group block rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    isGlossy
                      ? 'border border-white/10 hover:border-monarch-gold/60 bg-black/50 hover:bg-black/70 backdrop-blur-md shadow-lg'
                      : 'border border-monarch-gold/20 hover:border-monarch-gold bg-monarch-burgundy shadow-lg'
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-monarch-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-nav uppercase tracking-wider text-monarch-gold-light font-medium bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded [text-shadow:_0_1px_3px_rgba(0,0,0,0.9)]">
                      {cat.itemCount} Designs
                    </span>
                  </div>
                  <div className={`p-2.5 transition-colors ${isGlossy ? 'bg-black/60 backdrop-blur-sm' : 'bg-monarch-burgundy'}`}>
                    <h4 className="font-serif text-sm text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1 [text-shadow:_0_1px_3px_rgba(0,0,0,0.85)]">
                      {cat.name}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {activeMenu === 'wedding' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              href="/collections/bridal-lehengas"
              onClick={onClose}
              className={`group relative rounded-xl overflow-hidden p-8 flex flex-col justify-end min-h-[280px] transition-all duration-300 hover:-translate-y-1 ${
                isGlossy
                  ? 'border border-white/10 hover:border-monarch-gold/60 bg-black/50 backdrop-blur-md shadow-2xl'
                  : 'border border-monarch-gold/30 bg-monarch-burgundy-deep shadow-2xl'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
              <div className="relative z-10">
                <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light font-medium flex items-center gap-1.5 mb-2 [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
                  The Bridal Suite
                </span>
                <h4 className="font-serif text-3xl text-monarch-ivory group-hover:text-monarch-gold-light transition-colors font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  Bridal Lehengas &amp; Heirlooms
                </h4>
                <p className="text-xs text-monarch-ivory/85 mt-2 line-clamp-2 leading-relaxed [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  Mastercrafted in crimson micro-velvets, 24k gold dabka, and real zari weaves for the royal bride.
                </p>
                <span className="inline-flex items-center gap-2 mt-4 text-xs font-nav uppercase tracking-wider text-monarch-gold-light font-medium group-hover:text-white transition-colors [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  Explore Bridal Vault <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link
              href="/collections/sherwanis"
              onClick={onClose}
              className={`group relative rounded-xl overflow-hidden p-8 flex flex-col justify-end min-h-[280px] transition-all duration-300 hover:-translate-y-1 ${
                isGlossy
                  ? 'border border-white/10 hover:border-monarch-gold/60 bg-black/50 backdrop-blur-md shadow-2xl'
                  : 'border border-monarch-gold/30 bg-monarch-burgundy-deep shadow-2xl'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=70&w=700&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
              <div className="relative z-10">
                <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light font-medium flex items-center gap-1.5 mb-2 [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
                  The Royal Groom
                </span>
                <h4 className="font-serif text-3xl text-monarch-ivory group-hover:text-monarch-gold-light transition-colors font-medium [text-shadow:_0_2px_8px_rgba(0,0,0,0.95)]">
                  Imperial Sherwanis &amp; Achkans
                </h4>
                <p className="text-xs text-monarch-ivory/85 mt-2 line-clamp-2 leading-relaxed [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  Hand-spun mulberry raw silk with tonal marodi threadwork and Jaipur-cast antique brass buttons.
                </p>
                <span className="inline-flex items-center gap-2 mt-4 text-xs font-nav uppercase tracking-wider text-monarch-gold-light font-medium group-hover:text-white transition-colors [text-shadow:_0_1px_4px_rgba(0,0,0,0.9)]">
                  Explore Groom Collection <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
