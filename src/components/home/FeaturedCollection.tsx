'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  // Select the premier 6-8 royal edit products
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-[#F7F0E5] text-monarch-charcoal relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-monarch-maroon/10 border border-monarch-maroon/20 text-xs font-nav uppercase tracking-widest text-monarch-maroon font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-monarch-gold-dark" />
            <span>Handcrafted Masterpieces</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-monarch-charcoal">
            THE ROYAL EDIT
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-monarch-charcoal/80 font-light">
            &ldquo;Exceptional pieces for moments that become memories.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-monarch-charcoal/70 font-sans max-w-xl mx-auto">
            Each garment represents months of devotion by master karigars across Varanasi, Lucknow, and Jaipur, woven with real gold zari and bespoke tailoring.
          </p>
        </div>

        {/* 8-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory border border-monarch-gold/50 font-nav text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-xl hover:gap-4 group"
          >
            <span>DISCOVER COMPLETE ROYAL VAULT</span>
            <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
