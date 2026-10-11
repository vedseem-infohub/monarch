'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ArrowRight, Sparkles, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistProducts, clearWishlist, wishlistCount } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <div className="bg-[#F7F0E5] min-h-screen pt-32 pb-24 text-monarch-charcoal flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-2 border-monarch-gold flex items-center justify-center text-monarch-maroon mx-auto">
            <Heart className="w-10 h-10 text-monarch-gold" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
            Your Wishlist is Empty
          </h1>
          <p className="text-xs sm:text-sm text-monarch-charcoal/70 font-sans leading-relaxed">
            Curate your royal wardrobe by saving exquisite bridal lehengas, banarasi sarees, and bespoke sherwanis as you browse.
          </p>
          <div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory text-xs font-nav uppercase tracking-widest font-semibold transition-all shadow-lg"
            >
              <span>Explore The Collections</span>
              <ArrowRight className="w-4 h-4 text-monarch-gold" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-monarch-gold/30 mb-10 gap-4">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon block mb-1 font-semibold">
              Curated Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-monarch-charcoal font-medium">
              SAVED ROYAL HEIRLOOMS
            </h1>
            <p className="text-xs font-nav text-monarch-charcoal/70 mt-1">
              {wishlistCount} {wishlistCount === 1 ? 'ensemble' : 'ensembles'} reserved in your personal archive
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-charcoal/60 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Saved</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
