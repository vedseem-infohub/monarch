'use client';

import React, { useState, useRef } from 'react';
import { CHANGE_LOOK_STYLES, LookStyleItem } from '@/data/changeLook';
import { LookThumbnailCard } from './LookThumbnailCard';
import { CurvedAddToCartButton } from './CurvedAddToCartButton';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Heart,
  Share2,
  ShieldCheck,
  Award,
  Truck,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * ============================================================================
 * COMPONENT: ChangeYourLook (Interactive Studio)
 * ============================================================================
 * Features:
 * - Left column: "Change look" cursive annotation + vertical look thumbnails.
 * - Center: Full-height couture model with fast, silky-smooth left-to-right swift transition.
 * - Right: Complete product studio with rating, title, price, blouse sizes, color chips,
 *          quantity, and iconic curved maroon "ADD TO CART" swoosh button with circular arrow.
 * - NO audio/music player controls.
 *
 * BACKEND API INTEGRATION INSTRUCTIONS:
 * When backend endpoint GET /api/v1/studio/looks is ready:
 * 1. Replace CHANGE_LOOK_STYLES with data fetched from the API.
 * 2. Example fetch hook:
 *
 *    // const [looks, setLooks] = useState<LookStyleItem[]>(CHANGE_LOOK_STYLES);
 *    // useEffect(() => {
 *    //   async function fetchStudioLooks() {
 *    //     try {
 *    //       const res = await fetch('/api/v1/studio/looks');
 *    //       const json = await res.json();
 *    //       if (json?.data) setLooks(json.data);
 *    //     } catch (err) {
 *    //       console.error('Failed to load studio looks:', err);
 *    //     }
 *    //   }
 *    //   fetchStudioLooks();
 *    // }, []);
 * ============================================================================
 */

export const ChangeYourLook: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const modelImgRef = useRef<HTMLImageElement>(null);

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(1); // default rosé color
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const currentLook: LookStyleItem = CHANGE_LOOK_STYLES[activeLookIndex] || CHANGE_LOOK_STYLES[0];
  const activeColor =
    currentLook?.colors?.[selectedColorIdx] ||
    currentLook?.colors?.[0] || {
      id: 'rose',
      name: 'Rosé',
      hex: '#E79DA2',
      image: currentLook?.modelImage || '/images/panoramic/ensemble_vara.jpg',
    };
  const displayImage = activeColor.image || currentLook.modelImage;
  const inWishlist = isInWishlist(currentLook.id);

  // Cycle looks via left / right chevron buttons
  const handlePrevLook = () => {
    setActiveLookIndex((prev) => (prev === 0 ? CHANGE_LOOK_STYLES.length - 1 : prev - 1));
    setSelectedColorIdx(0);
  };

  const handleNextLook = () => {
    setActiveLookIndex((prev) => (prev + 1) % CHANGE_LOOK_STYLES.length);
    setSelectedColorIdx(0);
  };

  // Fast, silky-smooth left-to-right image swift animation + text glide
  useGSAP(
    () => {
      // 1. Center image swifts left-to-right quickly and crisply
      if (modelImgRef.current) {
        gsap.fromTo(
          modelImgRef.current,
          { x: -42, opacity: 0.35, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out', clearProps: 'transform' }
        );
      }

      // 2. Text details on the right smoothly glide and fade in
      gsap.fromTo(
        '.look-text-reveal',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.035, ease: 'power2.out' }
      );
    },
    { dependencies: [activeLookIndex, selectedColorIdx], scope: sectionRef }
  );

  // Add to cart handler
  const handleAddToCart = () => {
    const syntheticProduct: Product = {
      id: `${currentLook.id}-${activeColor.id}`,
      name: currentLook.name,
      slug: currentLook.id,
      tagline: currentLook.subtitle,
      description: currentLook.description,
      category: 'designer-sarees',
      categoryName: 'Couture Net & Tissue',
      gender: 'women',
      price: currentLook.rawPrice,
      originalPrice: currentLook.rawPrice + 4300,
      images: [displayImage],
      colors: currentLook.colors.map((c) => ({
        name: c.name,
        hex: c.hex,
      })),
      sizes: currentLook.sizes,
      fabric: currentLook.subtitle,
      embroidery: 'Handloom Pitloom Zari',
      occasion: ['Wedding', 'Festive Soiree'],
      craftsmanshipStory: currentLook.description,
      careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
      deliveryDays: 3,
      has3D: false,
      inStock: true,
      rating: currentLook.rating,
      reviewsCount: currentLook.reviewCount,
    };

    addToCart(syntheticProduct, activeColor.name, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2400);
  };

  return (
    <section
      id="change-your-look"
      ref={sectionRef}
      className="py-12 sm:py-20 bg-[#FAF7F2] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ======================================================== */}
          {/* COLUMN 1: LEFT THUMBNAILS & "Change look" ANNOTATION     */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-3">
            {/* Handwritten "Change look" script + decorative curved arrow (Matches screenshot) */}
            <div className="relative pl-1 select-none">
              <span className="font-serif italic text-2xl sm:text-3xl text-monarch-charcoal tracking-wide font-normal">
                Change look
              </span>
              {/* Whimsical curved arrow sketch pointing down to looks */}
              <svg
                className="w-9 h-6 text-monarch-charcoal/70 ml-6 -mt-1"
                viewBox="0 0 45 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M 6 4 C 18 2, 28 8, 30 20 M 30 20 L 25 15 M 30 20 L 35 15" />
              </svg>
            </div>

            {/* Vertical thumbnails list */}
            <div className="flex lg:flex-col gap-3 sm:gap-3.5 overflow-x-auto no-scrollbar w-full py-1">
              {CHANGE_LOOK_STYLES.map((look, idx) => (
                <LookThumbnailCard
                  key={look.id}
                  look={look}
                  index={idx}
                  isActive={activeLookIndex === idx}
                  onSelect={() => {
                    setActiveLookIndex(idx);
                    setSelectedColorIdx(idx === 0 ? 1 : 0);
                  }}
                />
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: CENTER FASHION MODEL SPOTLIGHT                 */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 relative w-full h-[520px] sm:h-[600px] lg:h-[660px] rounded-3xl overflow-hidden bg-white border border-gray-200/80 shadow-2xl flex items-center justify-center">
            {/* Main Model Couture Saree Image with Swift Animation */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={modelImgRef}
              src={displayImage}
              alt={currentLook.name}
              className="w-full h-full object-cover select-none will-change-transform"
              decoding="async"
            />

            {/* Subtle Vignette Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10 pointer-events-none" />

            {/* Previous Look Chevron Arrow (Left) */}
            <button
              onClick={handlePrevLook}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-monarch-charcoal shadow-md flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer"
              aria-label="Previous look"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Look Chevron Arrow (Right) */}
            <button
              onClick={handleNextLook}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 hover:bg-white text-monarch-charcoal shadow-md flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10 cursor-pointer"
              aria-label="Next look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom-Left Script Text: "New Drop 2026" (Matches screenshot) */}
            <div className="absolute bottom-6 left-6 z-10 select-none pointer-events-none">
              <span className="font-serif italic text-white/95 text-xl sm:text-2xl drop-shadow-md">
                New Drop 2026
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: RIGHT PRODUCT DETAILS & ADD TO CART            */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pl-3">
            {/* Category / Breadcrumb & Rating */}
            <div className="look-text-reveal flex items-center justify-between gap-3 text-xs">
              <span className="text-[10px] font-nav uppercase tracking-[0.22em] font-semibold text-gray-500">
                Shop All Sarees &gt; Designer Sarees
              </span>

              <div className="flex items-center gap-1.5 text-monarch-gold">
                <span className="tracking-widest text-sm">★★★★★</span>
                <span className="font-semibold text-monarch-charcoal text-[11px]">
                  {currentLook.rating}
                </span>
                <span className="text-gray-400 text-[10px]">
                  ({currentLook.reviewCount} Reviews)
                </span>
              </div>
            </div>

            {/* Display Title & Price (Matches Screenshot) */}
            <div className="look-text-reveal space-y-1.5">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-[#1E1714] leading-[1.1] uppercase">
                {currentLook.name}
              </h2>
              <div className="flex items-baseline gap-2.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1714]">
                  {currentLook.formattedPrice}
                </span>
                <span className="text-xs text-gray-400 font-sans">
                  (MRP incl. of all taxes)
                </span>
              </div>
            </div>

            {/* Editorial Features Line */}
            <div className="look-text-reveal flex items-center gap-4 text-xs text-gray-600 pt-1 border-t border-gray-200/80 flex-wrap">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-monarch-gold-dark" />
                <span>Pure Silk Mark</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-monarch-gold-dark" />
                <span>Handloom Zari</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-monarch-gold-dark" />
                <span>Ready to Ship</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-monarch-gold-dark" />
                <span>Custom Blouse</span>
              </div>
            </div>

            {/* Select Blouse Size (Matches Screenshot) */}
            <div className="look-text-reveal pt-1 border-t border-gray-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-nav uppercase tracking-wider text-gray-700 font-semibold">
                  SELECT BLOUSE SIZE:
                </span>
                <button
                  type="button"
                  className="text-[11px] text-monarch-maroon hover:underline cursor-pointer bg-transparent border-0 p-0"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex items-center gap-2">
                {currentLook.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                      selectedSize === size
                        ? 'border-2 border-black bg-white text-black shadow-xs font-bold'
                        : 'border border-gray-200 bg-white hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Select Colour Swatches (Matches Screenshot) */}
            <div className="look-text-reveal pt-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-nav uppercase tracking-wider text-gray-700 font-semibold">
                  SELECT COLOUR:
                </span>
                <span className="text-xs font-serif font-semibold text-monarch-charcoal uppercase tracking-wider">
                  {activeColor.name}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {currentLook.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-9 h-9 rounded-md transition-all cursor-pointer flex items-center justify-center ${
                      selectedColorIdx === idx
                        ? 'ring-2 ring-black ring-offset-2 scale-105 shadow-sm'
                        : 'border border-gray-300 hover:scale-102'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                    aria-label={`Select ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Quantity + Signature Curved Swoosh ADD TO CART Button (Exact Screenshot Match) */}
            <div className="look-text-reveal pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                {/* Quantity Counter */}
                <div className="flex items-center rounded-full bg-white border border-gray-200 px-3 py-1.5 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="font-mono text-xs font-semibold px-3 min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-6 h-6 rounded-full hover:bg-gray-100 text-gray-800 flex items-center justify-center font-bold text-sm cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Signature Curved Ruby Swoosh ADD TO CART Button with Circular Arrow */}
                <CurvedAddToCartButton onClick={handleAddToCart} />
              </div>

              {/* Action Badges Row (Below Button, Matches Screenshot) */}
              <div className="flex items-center gap-8 justify-end max-w-[400px] pr-4 text-gray-600">
                <button
                  type="button"
                  onClick={() => toggleWishlist(currentLook.id)}
                  className="flex flex-col items-center gap-1 text-[9px] font-nav uppercase tracking-wider hover:text-black transition-colors cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Save to Wishlist"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-monarch-maroon text-monarch-maroon' : 'text-gray-600'}`} />
                  <span>Wishlist</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.share) {
                      navigator.share({
                        title: currentLook.name,
                        text: currentLook.description,
                        url: window.location.href,
                      }).catch(() => {});
                    }
                  }}
                  className="flex flex-col items-center gap-1 text-[9px] font-nav uppercase tracking-wider hover:text-black transition-colors cursor-pointer bg-transparent border-0 p-0"
                  aria-label="Share Ensemble"
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span>Share</span>
                </button>

                <div className="flex flex-col items-center gap-1 text-[9px] font-nav uppercase tracking-wider text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Authentic</span>
                </div>
              </div>
            </div>

            {/* Added to Cart Feedback Toast */}
            {addedNotice && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs animate-fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>{currentLook.name}</strong> ({activeColor.name}, Size {selectedSize}) added to your bag.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
