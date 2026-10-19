'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BridalEnsemble } from '@/data/bridal';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Check, Sparkles } from 'lucide-react';

interface BridalCardProps {
  ensemble: BridalEnsemble;
  isActive: boolean;
  onSelect: () => void;
  priority?: boolean;
}

export const BridalCard: React.FC<BridalCardProps> = ({
  ensemble,
  isActive,
  onSelect,
  priority = false,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(ensemble.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (ensemble.product) {
      const defaultColor = ensemble.product.colors[0]?.name || 'Bridal Edition';
      const defaultSize = ensemble.product.sizes[0] || 'Standard';
      addToCart(ensemble.product, defaultColor, defaultSize, 1);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={onSelect}
      className={`group shrink-0 w-[220px] sm:w-[245px] lg:w-[260px] flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl select-none ${
        isActive
          ? 'bg-[#260E15] ring-2 ring-monarch-gold border border-monarch-gold shadow-2xl scale-[1.02]'
          : 'bg-[#1A0A0E] border border-monarch-gold/30 hover:border-monarch-gold hover:bg-[#200C12]'
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4] overflow-hidden bg-black/40 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ensemble.image}
          alt={ensemble.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 pointer-events-none"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(ensemble.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            inWishlist
              ? 'bg-monarch-maroon text-monarch-gold shadow'
              : 'bg-black/50 hover:bg-black/80 text-white shadow-sm'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-monarch-gold text-monarch-gold' : ''}`} />
        </button>

        {/* Bottom Left Category Tag */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="text-[10px] font-nav uppercase tracking-wider bg-monarch-maroon/90 text-monarch-ivory px-2 py-0.5 rounded border border-monarch-gold/30 backdrop-blur-sm">
            {ensemble.categoryName}
          </span>
        </div>

        {/* Top Left Active Badge */}
        {isActive && (
          <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 bg-black/75 backdrop-blur-md text-monarch-gold-light text-[9px] font-nav uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-monarch-gold/40">
            <Sparkles className="w-2.5 h-2.5 text-monarch-gold animate-pulse" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Body Details (Royal Dark & Gold Styling) */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3 bg-inherit">
        <div>
          <h4 className="font-serif text-sm sm:text-base text-monarch-ivory font-medium group-hover:text-monarch-gold-light transition-colors line-clamp-1">
            {ensemble.name}
          </h4>
          <p className="text-[11px] text-monarch-beige/70 font-sans line-clamp-1 mt-0.5">
            {ensemble.craft || ensemble.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-monarch-gold/20">
          <span className="font-serif text-sm sm:text-base font-bold text-monarch-gold-light">
            {ensemble.formattedPrice}
          </span>

          <div className="flex items-center gap-2">
            <Link
              href={ensemble.href}
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] font-nav uppercase tracking-wider text-monarch-beige/60 hover:text-monarch-gold-light transition-colors"
            >
              Details
            </Link>

            <button
              onClick={handleAddToCart}
              className={`px-3 py-1.5 rounded-full text-[10px] font-nav uppercase tracking-widest font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-sm active:scale-95 ${
                added
                  ? 'bg-emerald-700 text-white'
                  : 'bg-monarch-gold hover:bg-monarch-gold-light text-[#1A0A0E]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3 h-3" />
                  <span>ADDED</span>
                </>
              ) : (
                <span>ADD TO BAG</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
