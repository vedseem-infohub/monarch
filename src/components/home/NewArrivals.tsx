'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { NEW_ARRIVALS_DATA } from '@/data/newArrivals';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Inline Marquee Product Card
   Portrait-style card matching the screenshot:
   - Tall image (3:4.2)
   - Rounded corners
   - Badge top-left (NEW)
   - Wishlist button top-right
   - Hover: dark bottom overlay + Add to Cart
   - Below image: name, price
───────────────────────────────────────────── */
const MarqueeCard: React.FC<{ product: Product; priority?: boolean }> = ({ product, priority = false }) => {
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
    <div className="group flex-shrink-0 w-[220px] sm:w-[240px] lg:w-[260px] select-none">
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
            sizes="(max-width: 640px) 220px, (max-width: 1024px) 240px, 260px"
          />

          {/* Hover: minimal dark scrim at bottom only */}
          <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

          {/* Add to Cart — slides up on hover */}
          <div className="absolute inset-x-0 bottom-0 px-3 pb-4 flex items-end translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-350 ease-out">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white/95 hover:bg-white text-[#1A1A1A] text-[11px] font-nav uppercase tracking-[0.18em] font-semibold transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>
          </div>
        </Link>

        {/* NEW badge — top left */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-monarch-maroon text-[9px] font-nav uppercase tracking-[0.2em] text-white font-semibold shadow-sm">
            {product.badge === 'New Arrival' ? 'NEW' : product.badge}
          </div>
        )}

        {/* Wishlist — top right */}
        <button
          onClick={handleWishlist}
          className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all shadow-sm active:scale-90"
          aria-label="Toggle wishlist"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${inWishlist ? 'fill-red-500 text-red-500' : 'text-[#1A1A1A]'}`}
          />
        </button>

        {/* Rating pill — bottom left of image (visible always, hidden on hover) */}
        <div className="absolute bottom-2.5 left-2.5 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/95 text-[10px] font-bold text-[#1A1A1A] shadow-sm group-hover:opacity-0 transition-opacity duration-200">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </div>
      </div>

      {/* Below image: name, tagline, price */}
      <div className="mt-3 px-0.5 space-y-0.5">
        <Link href={`/product/${product.id}`}>
          <p className="font-serif text-[15px] sm:text-[16px] text-monarch-charcoal font-semibold line-clamp-1 hover:text-monarch-maroon transition-colors leading-snug">
            {product.name}
          </p>
        </Link>
        {(product.tagline || product.categoryName) && (
          <p className="font-sans text-[11px] text-gray-400 line-clamp-1 leading-snug">
            {product.tagline || product.categoryName}
          </p>
        )}
        <div className="flex items-center gap-2 pt-1">
          <span className="font-sans text-[15px] sm:text-base font-bold text-monarch-gold-dark tracking-tight">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-[11px] text-gray-400 line-through font-sans">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   Main Section — Left-to-Right marquee (→)
───────────────────────────────────────────── */
export const NewArrivals: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<gsap.core.Tween | null>(null);

  const products = NEW_ARRIVALS_DATA.products;
  // Duplicate for seamless infinite marquee
  const doubled = [...products, ...products];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      // Half the track = one full set of products (the other half is the duplicate)
      const totalWidth = track.scrollWidth / 2;

      // Start at 0, animate to -totalWidth, then instantly reset → seamless loop
      // New Arrivals scrolls LEFT (→ forward / left direction)
      animRef.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -totalWidth,
          duration: totalWidth / 55, // ~55px per second = slow elegant drift
          ease: 'none',
          repeat: -1,
        }
      );

      // Pause on hover
      const container = sectionRef.current;
      const pause = () => animRef.current?.pause();
      const resume = () => animRef.current?.resume();

      if (container) {
        container.addEventListener('mouseenter', pause);
        container.addEventListener('mouseleave', resume);
      }

      return () => {
        if (animRef.current) {
          animRef.current.kill();
          animRef.current = null;
        }
        if (container) {
          container.removeEventListener('mouseenter', pause);
          container.removeEventListener('mouseleave', resume);
        }
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-20 bg-[#F7F0E5] text-monarch-charcoal relative border-t border-monarch-gold/20 overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-dark mb-2">
              {NEW_ARRIVALS_DATA.eyebrow}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-monarch-charcoal leading-tight">
              {NEW_ARRIVALS_DATA.title}{' '}
              <em className="font-light italic text-monarch-gold-dark not-italic" style={{ fontStyle: 'italic' }}>
                {NEW_ARRIVALS_DATA.italicWord}
              </em>
            </h2>
          </div>
          <Link
            href={NEW_ARRIVALS_DATA.viewAllHref}
            className="text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon hover:text-monarch-charcoal border-b border-monarch-maroon/40 pb-0.5 transition-colors shrink-0 mb-1"
          >
            View All Arrivals
          </Link>
        </div>
      </div>

      {/* Marquee track — overflow hidden on the section level */}
      <div className="w-full overflow-hidden">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-[#F7F0E5] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-[#F7F0E5] to-transparent z-10" />

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 will-change-transform py-4 px-2"
          style={{ width: 'max-content' }}
        >
          {doubled.map((product, idx) => (
            <MarqueeCard
              key={`na-${product.id}-${idx}`}
              product={product}
              priority={idx < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
