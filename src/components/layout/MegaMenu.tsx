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
      className={`absolute top-full left-0 right-0 shadow-2xl z-40 animate-fadeIn transition-colors duration-500 border-none ${
        isGlossy
          ? 'bg-gradient-to-b from-white/30 via-white/15 to-transparent backdrop-blur-md shadow-[0_25px_50px_rgba(0,0,0,0.3)]'
          : 'bg-[#240E14]/98 backdrop-blur-xl shadow-2xl'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        {activeMenu === 'women' && (
          <div>
            <div className={`flex items-center justify-between pb-4 mb-6 ${isGlossy ? 'border-none' : 'border-b border-monarch-gold/20'}`}>
              <div>
                <h3 className="font-serif text-2xl text-monarch-ivory">Women&rsquo;s Royal Haute Couture</h3>
                <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold/75 mt-1">
                  Bridal Lehengas, Handwoven Banarasi Sarees &amp; Regal Kalidars
                </p>
              </div>
              <Link
                href="/collections/women"
                onClick={onClose}
                className="text-xs font-nav uppercase tracking-wider text-monarch-gold hover:text-monarch-gold-light flex items-center gap-1.5 transition-colors"
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
                  className={`group block rounded-lg overflow-hidden transition-all ${
                    isGlossy
                      ? 'border-none bg-black/40 hover:bg-black/60 backdrop-blur-sm'
                      : 'border border-monarch-gold/20 hover:border-monarch-gold bg-monarch-burgundy'
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-monarch-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-nav uppercase tracking-wider text-monarch-gold-light">
                      {cat.itemCount} Designs
                    </span>
                  </div>
                  <div className={`p-2.5 transition-colors ${isGlossy ? 'bg-black/50 backdrop-blur-sm' : 'bg-monarch-burgundy'}`}>
                    <h4 className="font-serif text-sm text-monarch-ivory group-hover:text-monarch-gold-light transition-colors line-clamp-1">
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
                <h3 className="font-serif text-2xl text-monarch-ivory">Men&rsquo;s Imperial Wardrobe</h3>
                <p className="text-xs font-nav uppercase tracking-widest text-monarch-gold/75 mt-1">
                  Bespoke Sherwanis, Heritage Bandhgalas &amp; Brocade Jackets
                </p>
              </div>
              <Link
                href="/collections/men"
                onClick={onClose}
                className="text-xs font-nav uppercase tracking-wider text-monarch-gold hover:text-monarch-gold-light flex items-center gap-1.5 transition-colors"
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
                  className={`group block rounded-lg overflow-hidden transition-all ${
                    isGlossy
                      ? 'border-none bg-black/40 hover:bg-black/60 backdrop-blur-sm'
                      : 'border border-monarch-gold/20 hover:border-monarch-gold bg-monarch-burgundy'
                  }`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-monarch-charcoal">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-nav uppercase tracking-wider text-monarch-gold-light">
                      {cat.itemCount} Designs
                    </span>
                  </div>
                  <div className={`p-2.5 transition-colors ${isGlossy ? 'bg-black/50 backdrop-blur-sm' : 'bg-monarch-burgundy'}`}>
                    <h4 className="font-serif text-sm text-monarch-ivory group-hover:text-monarch-gold-light transition-colors line-clamp-1">
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
              className={`group relative rounded-xl overflow-hidden p-8 flex flex-col justify-end min-h-[280px] transition-all ${
                isGlossy ? 'border-none bg-black/40 backdrop-blur-sm shadow-xl' : 'border border-monarch-gold/30 bg-monarch-burgundy-deep'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=700&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  The Bridal Suite
                </span>
                <h4 className="font-serif text-3xl text-monarch-ivory group-hover:text-monarch-gold-light transition-colors">
                  Bridal Lehengas &amp; Heirlooms
                </h4>
                <p className="text-xs text-monarch-beige mt-2 line-clamp-2">
                  Mastercrafted in crimson micro-velvets, 24k gold dabka, and real zari weaves for the royal bride.
                </p>
                <span className="inline-flex items-center gap-2 mt-4 text-xs font-nav uppercase tracking-wider text-monarch-gold">
                  Explore Bridal Vault <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>

            <Link
              href="/collections/sherwanis"
              onClick={onClose}
              className={`group relative rounded-xl overflow-hidden p-8 flex flex-col justify-end min-h-[280px] transition-all ${
                isGlossy ? 'border-none bg-black/40 backdrop-blur-sm shadow-xl' : 'border border-monarch-gold/30 bg-monarch-burgundy-deep'
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=70&w=700&auto=format&fit=crop')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold-light flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  The Royal Groom
                </span>
                <h4 className="font-serif text-3xl text-monarch-ivory group-hover:text-monarch-gold-light transition-colors">
                  Imperial Sherwanis &amp; Achkans
                </h4>
                <p className="text-xs text-monarch-beige mt-2 line-clamp-2">
                  Hand-spun mulberry raw silk with tonal marodi threadwork and Jaipur-cast antique brass buttons.
                </p>
                <span className="inline-flex items-center gap-2 mt-4 text-xs font-nav uppercase tracking-wider text-monarch-gold">
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
