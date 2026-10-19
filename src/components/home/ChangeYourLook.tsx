'use client';

import React, { useState, useRef } from 'react';
import { CHANGE_LOOK_STYLES, LookStyleItem } from '@/data/changeLook';
import { LookThumbnailCard } from './LookThumbnailCard';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ChangeYourLook: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const modelImgRef = useRef<HTMLImageElement>(null);

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState('36');
  const [quantity, setQuantity] = useState(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const { addToCart } = useCart();

  const currentLook: LookStyleItem = CHANGE_LOOK_STYLES[activeLookIndex] || CHANGE_LOOK_STYLES[0];
  const activeColor = currentLook.colors[selectedColorIdx] || currentLook.colors[0];
  const displayImage = activeColor.image || currentLook.modelImage;

  // Cycle looks via left / right arrows
  const handlePrevLook = () => {
    setActiveLookIndex((prev) => (prev === 0 ? CHANGE_LOOK_STYLES.length - 1 : prev - 1));
    setSelectedColorIdx(0);
  };

  const handleNextLook = () => {
    setActiveLookIndex((prev) => (prev + 1) % CHANGE_LOOK_STYLES.length);
    setSelectedColorIdx(0);
  };

  // Crossfade model image on look/color change
  useGSAP(
    () => {
      if (modelImgRef.current) {
        gsap.fromTo(
          modelImgRef.current,
          { opacity: 0.4, scale: 1.04 },
          { opacity: 1, scale: 1, duration: 0.55, ease: 'power2.out' }
        );
      }
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
      categoryName: 'Couture Organza',
      gender: 'women',
      price: currentLook.rawPrice,
      originalPrice: currentLook.rawPrice + 4500,
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
      rating: 4.9,
      reviewsCount: currentLook.reviewCount,
    };

    addToCart(syntheticProduct, activeColor.name, selectedSize, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2600);
  };

  return (
    <section
      id="change-your-look"
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#FAF7F2] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ======================================================== */}
          {/* COLUMN 1: LEFT THUMBNAILS & "Change look" SCRIPT (Col 2) */}
          {/* ======================================================== */}
          <div className="lg:col-span-2 flex flex-col items-start space-y-4">
            {/* Handwritten "Change look" script + decorative curved arrow */}
            <div className="relative pl-1 pb-1">
              <span className="font-serif italic text-2xl sm:text-3xl text-monarch-charcoal tracking-wide font-normal select-none">
                Change look
              </span>
              {/* Whimsical curved arrow sketch pointing down */}
              <svg
                className="w-10 h-7 text-monarch-charcoal/70 ml-6 -mt-1"
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
            <div className="flex lg:flex-col gap-3.5 sm:gap-4 overflow-x-auto no-scrollbar w-full py-1">
              {CHANGE_LOOK_STYLES.map((look, idx) => (
                <LookThumbnailCard
                  key={look.id}
                  look={look}
                  index={idx}
                  isActive={activeLookIndex === idx}
                  onSelect={() => {
                    setActiveLookIndex(idx);
                    setSelectedColorIdx(0);
                  }}
                />
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 2: CENTER FASHION MODEL SPOTLIGHT (Col 5)         */}
          {/* ======================================================== */}
          <div
            style={{ aspectRatio: '3 / 4.4' }}
            className="lg:col-span-5 relative w-full h-[520px] sm:h-[580px] lg:h-[640px] min-h-[480px] rounded-3xl overflow-hidden bg-monarch-ivory border border-monarch-gold/30 shadow-2xl flex items-center justify-center"
          >
            {/* Main Couture Model Saree Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={modelImgRef}
              src={displayImage}
              alt={currentLook.name}
              className="w-full h-full object-cover select-none"
              decoding="async"
            />

            {/* Subtle Vignette Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/15 pointer-events-none" />

            {/* Previous Look Chevron Arrow */}
            <button
              onClick={handlePrevLook}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-monarch-charcoal shadow-md flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10"
              aria-label="Previous look"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Next Look Chevron Arrow */}
            <button
              onClick={handleNextLook}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/70 hover:bg-white text-monarch-charcoal shadow-md flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110 active:scale-95 z-10"
              aria-label="Next look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Bottom-Left Script Text: "New Drop 2026" */}
            <div className="absolute bottom-6 left-6 z-10 select-none pointer-events-none">
              <span className="font-serif italic text-white/90 text-lg sm:text-xl drop-shadow-md">
                New Drop 2026
              </span>
            </div>

            {/* Floating Audio Player Pill at Bottom Center: Matching Screenshot 2 */}
            <div className="absolute bottom-5 inset-x-8 sm:inset-x-12 z-10 flex items-center justify-between gap-3 px-3.5 py-2 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white shadow-xl">
              <button
                type="button"
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className="w-7 h-7 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-white flex items-center justify-center transition-transform hover:scale-110 shrink-0 shadow-sm"
                aria-label={isPlayingAudio ? 'Pause music' : 'Play royal music'}
              >
                {isPlayingAudio ? (
                  <Pause className="w-3.5 h-3.5 fill-white text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono uppercase tracking-wider text-monarch-gold-light truncate">
                  {currentLook.audioTrack.title}
                </p>
                <p className="text-[9px] text-white/60 font-sans truncate">
                  {currentLook.audioTrack.artist}
                </p>
              </div>

              {/* Soundwaves indicator */}
              <div className="flex items-center gap-0.5 shrink-0 px-1">
                <span className={`w-0.5 rounded-full bg-monarch-gold ${isPlayingAudio ? 'h-3 animate-pulse' : 'h-1.5'}`} />
                <span className={`w-0.5 rounded-full bg-monarch-gold ${isPlayingAudio ? 'h-4 animate-pulse delay-75' : 'h-2'}`} />
                <span className={`w-0.5 rounded-full bg-monarch-gold ${isPlayingAudio ? 'h-2.5 animate-pulse delay-150' : 'h-1'}`} />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* COLUMN 3: RIGHT PRODUCT DETAILS & ADD TO CART (Col 5)    */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 lg:pl-4">
            {/* Rating & Category Line */}
            <div className="flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-monarch-gold">
                <span className="tracking-widest text-sm">★★★★★</span>
                <span className="font-semibold text-monarch-charcoal text-[11px]">
                  {currentLook.rating}
                </span>
                <span className="text-monarch-charcoal/50 text-[10px]">
                  ({currentLook.reviewCount})
                </span>
              </div>

              <span className="text-[10px] font-nav uppercase tracking-[0.2em] font-semibold text-monarch-maroon bg-monarch-maroon/10 px-2.5 py-0.5 rounded-full border border-monarch-maroon/20">
                {currentLook.categoryTag}
              </span>
            </div>

            {/* Display Title & Price */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-normal tracking-tight text-monarch-charcoal leading-tight">
                {currentLook.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-1.5">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-monarch-gold-dark">
                  {currentLook.price}
                </span>
                <span className="text-xs text-monarch-charcoal/60 font-sans">
                  (MRP incl. of all taxes)
                </span>
              </div>
            </div>

            {/* Editorial Description */}
            <p className="text-xs sm:text-sm text-monarch-charcoal/75 font-sans leading-relaxed">
              {currentLook.description}
            </p>

            {/* Key Features Badges */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-monarch-gold/15">
              {currentLook.features.map((feat) => (
                <div key={feat} className="flex items-center gap-1.5 text-[11px] text-monarch-charcoal/80 font-sans">
                  <Check className="w-3.5 h-3.5 text-monarch-gold shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>

            {/* Blouse Size Selector: Matching Screenshot 2 */}
            <div className="pt-2 border-t border-monarch-gold/15">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-nav uppercase tracking-wider text-monarch-charcoal/70 font-semibold">
                  SELECT BLOUSE SIZE:
                </span>
                <span className="text-[10px] text-monarch-maroon hover:underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex items-center gap-2">
                {currentLook.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-xs font-mono font-medium transition-all ${
                      selectedSize === size
                        ? 'bg-monarch-charcoal text-white shadow-md ring-2 ring-monarch-gold'
                        : 'bg-white hover:bg-monarch-beige/40 text-monarch-charcoal border border-monarch-beige'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Selector: Matching Screenshot 2 */}
            <div className="pt-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-nav uppercase tracking-wider text-monarch-charcoal/70 font-semibold">
                  SELECT COLOUR:
                </span>
                <span className="text-xs font-serif font-medium text-monarch-charcoal">
                  {activeColor.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {currentLook.colors.map((color, idx) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`group relative flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                      selectedColorIdx === idx
                        ? 'border-monarch-maroon bg-white shadow-sm ring-2 ring-monarch-gold/50'
                        : 'border-transparent hover:bg-white/60'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-lg border border-black/20 shadow-xs"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[11px] font-sans text-monarch-charcoal pr-1 hidden sm:inline">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Signature Curved Maroon "ADD TO CART" Pill Button: Matching Screenshot 2 */}
            <div className="flex items-center gap-3 pt-3">
              {/* Quantity Counter */}
              <div className="flex items-center rounded-full bg-white border border-monarch-beige px-3 py-2 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-6 h-6 rounded-full hover:bg-monarch-beige/40 text-monarch-charcoal flex items-center justify-center font-bold text-sm"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="font-mono text-xs font-semibold px-3 min-w-[24px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-6 h-6 rounded-full hover:bg-monarch-beige/40 text-monarch-charcoal flex items-center justify-center font-bold text-sm"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Signature Maroon Pill ADD TO CART Button with Round Arrow Icon */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 relative flex items-center justify-between pl-7 pr-3 py-3 rounded-full bg-gradient-to-r from-[#7D1128] via-[#8C162E] to-[#A31D36] text-white shadow-xl hover:shadow-[0_15px_35px_rgba(125,17,40,0.4)] transition-all duration-300 hover:brightness-110 active:scale-[0.99] group overflow-hidden"
              >
                <span className="font-nav text-xs uppercase tracking-[0.22em] font-semibold">
                  ADD TO CART
                </span>

                <span className="w-8 h-8 rounded-full bg-white text-monarch-maroon flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 text-monarch-maroon" />
                </span>
              </button>
            </div>

            {/* Added to Cart Feedback Toast */}
            {addedNotice && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-monarch-gold/20 border border-monarch-gold/50 text-monarch-charcoal text-xs animate-fade-in">
                <Sparkles className="w-4 h-4 text-monarch-gold-dark shrink-0" />
                <span>
                  <strong>{currentLook.name}</strong> ({activeColor.name}, Size {selectedSize}) added to your royal vault.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
