'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { BEST_SELLERS_DATA } from '@/data/bestSellers';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { useMarqueeScroll } from '@/hooks/useMarqueeScroll';
import { Heart, ShoppingBag, Star, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Inline Bestseller Marquee Card
   Portrait style with rank badge (#1, #2…)
   - Mobile: compact responsive sizing (w-[155px] xs:w-[175px] sm:w-[220px] lg:w-[260px])
   - Desktop hover: dark scrim + Add to Cart button (hidden on mobile to prevent white overlay haze)
───────────────────────────────────────────── */
const BestSellerCard: React.FC<{ product: Product; rank: number; priority?: boolean }> = ({
  product,
  rank,
  priority = false,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0]?.name || 'Standard', product.sizes[0] || 'M', 1);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group flex-shrink-0 w-[155px] xs:w-[175px] sm:w-[220px] lg:w-[260px] select-none">
      {/* Image Container */}
      <div className="relative aspect-[3/4.2] rounded-xl overflow-hidden bg-[#EDE5D8] shadow-sm group-hover:shadow-lg transition-shadow duration-400">
        <Link href={`/product/${product.id}`} className="block w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            sizes="(max-width: 640px) 175px, (max-width: 1024px) 220px, 260px"
          />

          {/* Desktop Hover Only: minimal dark scrim at bottom (hidden on mobile) */}
          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

          {/* Desktop Hover Only: Add to Cart button (hidden on mobile to prevent sticky white overlay) */}
          <div className="hidden sm:flex absolute inset-x-0 bottom-0 px-3 pb-3.5 items-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/95 hover:bg-white text-[#1A1A1A] text-[10px] lg:text-[11px] font-nav uppercase tracking-[0.16em] font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </Link>

        {/* Rank badge — top left */}
        <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 rounded-full bg-[#C7A15B] text-[8px] sm:text-[9px] font-nav uppercase tracking-[0.15em] text-[#1A0A00] font-bold shadow-sm">
          <Award className="w-2.5 h-2.5" />
          #{rank}
        </div>

        {/* Wishlist — top right */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-90 cursor-pointer"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-[#1A1A1A]'}`}
          />
        </button>

        {/* Rating pill — bottom left */}
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 z-10 flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 rounded-full bg-white/95 text-[9px] sm:text-[10px] font-bold text-[#1A1A1A] shadow-sm sm:group-hover:opacity-0 transition-opacity duration-200">
          <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Below image: name, tagline, price */}
      <div className="mt-2 sm:mt-3 px-0.5 space-y-0.5">
        <Link href={`/product/${product.id}`} className="block">
          <p className="font-serif text-xs sm:text-[15px] sm:text-[16px] text-monarch-charcoal font-semibold line-clamp-1 hover:text-monarch-maroon transition-colors leading-snug">
            {product.name}
          </p>
        </Link>
        {(product.tagline || product.categoryName) && (
          <p className="font-sans text-[10px] sm:text-[11px] text-gray-400 line-clamp-1 leading-snug">
            {product.tagline || product.categoryName}
          </p>
        )}
        <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
          <span className="font-sans text-xs xs:text-[13px] sm:text-[15px] sm:text-base font-bold text-monarch-gold-dark tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[9px] sm:text-[11px] text-gray-400 line-through font-sans">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Section — Right-to-Left marquee (←)
   Interactive with touch swipe, desktop drag & auto-glide
───────────────────────────────────────────── */
export const BestSellers: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Marquee scroll hook providing smooth reverse glide + manual touch/drag/wheel scrolling
  const { containerRef, trackRef } = useMarqueeScroll<HTMLDivElement, HTMLDivElement>({
    speed: 38,
    direction: 'right',
    repeatCount: 4,
    pauseOnHover: true,
  });

  const products = BEST_SELLERS_DATA.products;
  // Duplicate 4 times for seamless continuous bi-directional loop
  const quadrupled = [...products, ...products, ...products, ...products];

  return (
    <section
      ref={sectionRef}
      className="py-10 sm:py-16 lg:py-20 bg-[#FAF5EE] text-monarch-charcoal relative border-t border-monarch-gold/20 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-dark mb-1.5 sm:mb-2">
              {BEST_SELLERS_DATA.eyebrow}
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-medium text-monarch-charcoal leading-tight">
              {BEST_SELLERS_DATA.title}{' '}
              <em className="font-light text-monarch-gold-dark" style={{ fontStyle: 'italic' }}>
                {BEST_SELLERS_DATA.italicWord}
              </em>
            </h2>
          </div>
          <Link
            href={BEST_SELLERS_DATA.viewAllHref}
            className="text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon hover:text-monarch-charcoal border-b border-monarch-maroon/40 pb-0.5 transition-colors shrink-0 mb-1"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Marquee track container: Centered & Interactive */}
      <div className="relative w-full overflow-hidden select-none py-1">
        {/* Edge fades — hidden on mobile to avoid white haze, visible on sm+ */}
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-[#FAF5EE] to-transparent z-10" />
        <div className="hidden sm:block pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-[#FAF5EE] to-transparent z-10" />

        <div
          ref={containerRef}
          className="w-full overflow-x-auto no-scrollbar scrollbar-none touch-pan-x cursor-grab active:cursor-grabbing select-none py-1"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-3 xs:gap-3.5 sm:gap-5 w-max py-2 px-3 sm:px-6"
          >
            {quadrupled.map((product, idx) => (
              <div key={`bs-${product.id}-${idx}`} className="shrink-0 flex items-center">
                <BestSellerCard
                  product={product}
                  rank={(idx % products.length) + 1}
                  priority={idx < 4}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
