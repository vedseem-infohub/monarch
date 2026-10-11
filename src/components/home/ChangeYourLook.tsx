'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ArrowRight, Sparkles, Check, ShoppingBag, Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 4 Interactive Looks for the studio
const LOOKBOOK_STYLES = [
  {
    id: 'look-1',
    product: PRODUCTS.find((p) => p.id === 'monarch-001') || PRODUCTS[0],
    lookTitle: 'Gulnaar Royal Crimson',
    craftTag: 'Bridal Grandeur',
    modelImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Deep crimson velvet with 420 hours of royal dabka work',
  },
  {
    id: 'look-2',
    product: PRODUCTS.find((p) => p.id === 'monarch-005') || PRODUCTS[2],
    lookTitle: 'Rose Net Embroidered',
    craftTag: 'Festive Romance',
    modelImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Kalidar flared silhouettes adorned with handcrafted gota patti',
  },
  {
    id: 'look-3',
    product: PRODUCTS.find((p) => p.id === 'monarch-003') || PRODUCTS[1],
    lookTitle: 'Noor Emerald Katan',
    craftTag: 'Kashi Heirloom',
    modelImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Certified pure silver-gilt zari with authentic kadwa shikargah',
  },
  {
    id: 'look-4',
    product: PRODUCTS.find((p) => p.id === 'monarch-007') || PRODUCTS[3],
    lookTitle: 'Ranisa Rose Gold Tissue',
    craftTag: 'Ethereal Glamour',
    modelImage: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop',
    subtitle: 'Metallic silk tissue with scalloped pearl and cutdana borders',
  },
];

// Top 3 arch campaigns
const TOP_ARCH_CAMPAIGNS = [
  {
    title: 'The Wedding Edit',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    href: '/wedding',
  },
  {
    title: 'Heritage Weaves',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop',
    href: '/collections/designer-sarees',
  },
  {
    title: 'The New Drapes',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=600&auto=format&fit=crop',
    href: '/collections/all',
  },
];

export const ChangeYourLook: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const studioRef = useRef<HTMLDivElement>(null);
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const currentLook = LOOKBOOK_STYLES[activeLookIndex];
  const currentProduct = currentLook.product;
  const inWishlist = isInWishlist(currentProduct.id);

  const handleAddToCart = () => {
    const color = currentProduct.colors[selectedColorIdx]?.name || 'Standard';
    addToCart(currentProduct, color, selectedSize, 1);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (studioRef.current) {
        gsap.from(studioRef.current.querySelectorAll('.studio-reveal'), {
          scrollTrigger: {
            trigger: studioRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 sm:py-24 bg-[#FAF5EE] text-monarch-charcoal relative overflow-hidden border-t border-monarch-gold/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Top 3 Arched Campaign Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TOP_ARCH_CAMPAIGNS.map((camp) => (
            <Link
              key={camp.title}
              href={camp.href}
              className="group relative rounded-2xl overflow-hidden aspect-[16/10] bg-monarch-charcoal border border-monarch-gold/30 shadow-md hover:shadow-xl transition-all duration-500"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={camp.image}
                alt={camp.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <span className="font-serif text-lg font-medium">{camp.title}</span>
                <span className="text-[10px] font-nav uppercase tracking-wider bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/30">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 2. Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-[11px] font-nav uppercase tracking-[0.3em] text-monarch-maroon font-semibold block">
            Interactive Wardrobe Studio
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-monarch-charcoal">
            Change Your{' '}
            <span className="font-serif italic font-light text-monarch-gold-dark">
              Look
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-monarch-charcoal/70 font-sans leading-relaxed">
            Switch between royal palettes, explore bespoke draping styling, and personalize your couture ensemble in real time.
          </p>
        </div>

        {/* 3. 3-Column Interactive Studio */}
        <div
          ref={studioRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center bg-white rounded-3xl p-6 sm:p-10 border border-monarch-beige/70 shadow-xl"
        >
          {/* Column A: Left Thumbnail Strip */}
          <div className="studio-reveal lg:col-span-2 flex lg:flex-col gap-3 overflow-x-auto no-scrollbar justify-start">
            <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-charcoal/60 hidden lg:block mb-1">
              Select Look:
            </span>
            {LOOKBOOK_STYLES.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setSelectedColorIdx(0);
                }}
                className={`group relative rounded-xl overflow-hidden shrink-0 w-20 h-28 lg:w-full lg:h-32 border-2 transition-all duration-300 text-left ${
                  activeLookIndex === idx
                    ? 'border-monarch-maroon shadow-md scale-102 ring-2 ring-monarch-gold/50'
                    : 'border-monarch-beige/50 opacity-70 hover:opacity-100 hover:border-monarch-gold'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={look.modelImage}
                  alt={look.lookTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1.5 inset-x-1.5 text-[9px] font-nav uppercase tracking-wider text-white line-clamp-1">
                  Look {idx + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Column B: Center Fashion Model Spotlight Image */}
          <div className="studio-reveal lg:col-span-5 relative rounded-2xl overflow-hidden aspect-[3/4.5] bg-monarch-ivory border border-monarch-gold/30 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentLook.modelImage}
              src={currentLook.modelImage}
              alt={currentLook.lookTitle}
              className="w-full h-full object-cover animate-fade-in transition-all duration-700"
              loading="lazy"
            />

            {/* Floating Lookbook Pill */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-monarch-gold/40 text-[10px] font-nav uppercase tracking-widest text-monarch-gold-light">
              <Sparkles className="w-3 h-3 text-monarch-gold" />
              <span>{currentLook.craftTag}</span>
            </div>

            {/* Wishlist Heart */}
            <button
              onClick={() => toggleWishlist(currentProduct.id)}
              className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                inWishlist
                  ? 'bg-monarch-maroon text-monarch-gold shadow'
                  : 'bg-white/80 hover:bg-white text-monarch-charcoal shadow-sm'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-monarch-gold' : ''}`} />
            </button>

            {/* Subtle Audio / Look cue badge */}
            <div className="absolute bottom-4 inset-x-4 bg-black/70 backdrop-blur-md rounded-xl p-2.5 flex items-center justify-between text-white text-[11px] font-nav border border-monarch-gold/25">
              <span>{currentLook.lookTitle}</span>
              <span className="text-monarch-gold-light uppercase text-[9px] tracking-wider">
                Festive Edit 2026
              </span>
            </div>
          </div>

          {/* Column C: Right Live Outfit Specifications & Purchase Controls */}
          <div className="studio-reveal lg:col-span-5 space-y-6">
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold block mb-1">
                {currentProduct.categoryName}
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-monarch-charcoal font-medium">
                {currentProduct.name}
              </h3>
              <p className="font-sans text-xs text-monarch-charcoal/70 mt-2 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Price & Rating */}
            <div className="flex items-baseline gap-4 py-2 border-y border-monarch-beige/40">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-monarch-maroon">
                {FORMAT_CURRENCY(currentProduct.price)}
              </span>
              {currentProduct.originalPrice && (
                <span className="font-sans text-sm text-monarch-charcoal/40 line-through">
                  {FORMAT_CURRENCY(currentProduct.originalPrice)}
                </span>
              )}
              <div className="ml-auto flex items-center gap-1 text-xs text-monarch-charcoal/80">
                <span className="text-monarch-gold-dark font-bold">★ {currentProduct.rating}</span>
                <span className="text-[10px] text-monarch-charcoal/50">
                  ({currentProduct.reviewsCount} reviews)
                </span>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <span className="text-xs font-nav uppercase tracking-wider text-monarch-charcoal font-semibold block mb-2">
                Select Shade: {currentProduct.colors[selectedColorIdx]?.name}
              </span>
              <div className="flex items-center gap-2">
                {currentProduct.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${
                      selectedColorIdx === idx
                        ? 'ring-2 ring-monarch-gold scale-110 border-white'
                        : 'border-black/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <span className="text-xs font-nav uppercase tracking-wider text-monarch-charcoal font-semibold block mb-2">
                Select Size:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProduct.sizes.slice(0, 5).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-nav uppercase tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'bg-monarch-maroon text-white border-monarch-maroon font-semibold shadow-sm'
                        : 'bg-white text-monarch-charcoal border-monarch-beige hover:border-monarch-maroon'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add To Cart Button */}
            <div className="pt-2 space-y-2">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory border border-monarch-gold/50 font-nav text-xs uppercase tracking-[0.25em] font-semibold flex items-center justify-center gap-3 transition-all duration-300 shadow-xl hover:shadow-monarch-gold/20 group"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-monarch-gold" />
                    <span>ADDED TO BAG SUCCESSFULLY</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-monarch-gold group-hover:scale-110 transition-transform" />
                    <span>ADD TO CART · {FORMAT_CURRENCY(currentProduct.price)}</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center">
                <Link
                  href={`/product/${currentProduct.id}`}
                  className="text-[11px] font-nav uppercase tracking-wider text-monarch-charcoal/70 hover:text-monarch-maroon underline transition-colors"
                >
                  View full bespoke craftsmanship story &amp; 3D view
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
