'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import {
  X,
  Heart,
  ShoppingBag,
  Check,
  Sparkles,
  Star,
  ShieldCheck,
  Ruler,
  ArrowRight,
  Box,
  Truck,
  RotateCcw,
  Award,
} from 'lucide-react';

interface ProductQuickViewProps {
  product?: Product | null;
  onClose?: () => void;
}

interface QuickViewContentProps {
  product: Product;
  onClose: () => void;
}

const QuickViewContent: React.FC<QuickViewContentProps> = ({ product, onClose }) => {
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes[0] || 'M'
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdding, setIsAdding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const inWishlist = isInWishlist(product.id);

  // Orchestrated "Add to Cart" with coordinated In/Out animation:
  // 1. Instant checkmark feedback on button.
  // 2. Animate Quick View drawer OUT (exit slide-out).
  // 3. Simultaneously animate Cart Drawer IN (enter slide-in).
  const handleAddToCart = () => {
    if (isAdding) return;
    setIsAdding(true);

    const colorToUse = selectedColor || product.colors[0]?.name || 'Standard';
    const sizeToUse = selectedSize || product.sizes[0] || 'M';

    // Add item to cart without auto-opening immediately (openCart: false)
    addToCart(product, colorToUse, sizeToUse, 1, undefined, false);

    // Sequence the handoff: Quick View slides out, then Cart Drawer slides in
    setTimeout(() => {
      onClose();

      setTimeout(() => {
        setIsCartOpen(true);
        setIsAdding(false);
      }, 220);
    }, 280);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-[#FAF7F2] text-monarch-charcoal">
      {/* =========================================================================
          FIXED TOP HEADER (LIGHT THEME)
      ========================================================================= */}
      <div className="p-4 sm:p-5 border-b border-monarch-gold/25 flex items-center justify-between bg-[#F4ECE1] shrink-0">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-full bg-monarch-gold/20 text-[#8C682A] border border-monarch-gold/35">
            <Sparkles className="w-3.5 h-3.5 text-[#8C682A]" />
          </span>
          <div>
            <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#8C682A] font-bold block">
              Couture Quick View
            </span>
            <p className="font-serif text-sm text-monarch-charcoal font-medium line-clamp-1">
              {product.categoryName} · {product.name}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="text-monarch-charcoal hover:text-monarch-maroon p-2 rounded-full border border-monarch-gold/35 hover:border-monarch-gold bg-white transition-all hover:scale-105 shadow-sm"
          aria-label="Close preview"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* =========================================================================
          SCROLLABLE BODY: MEDIUM IMAGE ON TOP OF INFO (INDEPENDENT SCROLL)
          - data-lenis-prevent="true": Prevents smooth scroll from hijacking the page
          - min-h-0 + overflow-y-auto: Guarantees internal scrollability in flex column
          - overscroll-contain: Prevents scroll chaining to the background document
      ========================================================================= */}
      <div
        data-lenis-prevent="true"
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-6 divide-y divide-monarch-gold/20 no-scrollbar touch-pan-y"
      >
        {/* MEDIUM IMAGE SHOWCASE (ON TOP OF INFO) */}
        <div className="space-y-3">
          <div className="relative w-full max-w-[310px] sm:max-w-[330px] mx-auto aspect-[3/3.8] rounded-2xl overflow-hidden border border-monarch-gold/30 bg-[#F0E6D8] shadow-lg group">
            {/* Medium Model Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
              {product.badge && (
                <span className="text-[9px] font-nav uppercase tracking-[0.2em] font-bold bg-monarch-burgundy/95 text-monarch-gold-light px-2.5 py-1 rounded-full border border-monarch-gold/40 shadow-md backdrop-blur-md flex items-center gap-1">
                  <Award className="w-3 h-3 text-monarch-gold" />
                  <span>{product.badge}</span>
                </span>
              )}
              {product.has3D && (
                <span className="text-[9px] font-nav uppercase tracking-wider bg-white/90 text-monarch-charcoal px-2 py-0.5 rounded-full border border-monarch-gold/30 shadow-md flex items-center gap-1 backdrop-blur-md font-medium">
                  <Box className="w-3 h-3 text-monarch-gold" />
                  <span>Interactive 3D</span>
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Strip (Multi-Angle Gallery) */}
          {product.images.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto pt-1 no-scrollbar">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-11 h-14 sm:w-12 sm:h-15 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-monarch-gold scale-105 shadow-md ring-2 ring-monarch-gold/40'
                      : 'border-monarch-gold/25 opacity-70 hover:opacity-100 hover:border-monarch-gold/60'
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* INFO 1: TITLE, CATEGORY, RATING & PRICE */}
        <div className="pt-5 space-y-2.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.25em] text-[#8C682A] font-bold">
                {product.categoryName}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-monarch-charcoal font-medium mt-1 tracking-tight leading-snug">
                {product.name}
              </h2>
              <p className="text-xs text-monarch-charcoal/70 font-sans mt-1 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Star Rating Badge */}
            <div className="shrink-0 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full border border-monarch-gold/30 text-xs shadow-sm">
              <Star className="w-3.5 h-3.5 fill-monarch-gold text-monarch-gold" />
              <span className="font-bold text-monarch-charcoal">{product.rating || 4.9}</span>
              <span className="text-monarch-charcoal/50 text-[10px]">({product.reviewsCount || 48})</span>
            </div>
          </div>

          {/* Price Display */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="font-serif text-2xl sm:text-3xl font-bold text-monarch-maroon tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-sans line-through text-monarch-charcoal/40">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.discountPercent && (
              <span className="text-[11px] font-nav uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-300/80 px-2.5 py-0.5 rounded-full font-bold">
                {product.discountPercent}% Privilege Off
              </span>
            )}
          </div>
        </div>

        {/* INFO 2: HERITAGE COLOR SELECTION */}
        <div className="pt-5 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-nav uppercase tracking-wider text-monarch-charcoal/80 font-medium">
              Heritage Shade: <strong className="text-monarch-charcoal">{selectedColor}</strong>
            </span>
            <span className="text-[11px] text-[#8C682A] font-sans font-medium">
              {product.colors.length} Curated Silks
            </span>
          </div>

          <div className="flex items-center gap-3">
            {product.colors.map((color, idx) => (
              <button
                key={color.name}
                onClick={() => {
                  setSelectedColor(color.name);
                  if (color.imageIndex !== undefined) {
                    setActiveImageIndex(color.imageIndex);
                  } else if (idx < product.images.length) {
                    setActiveImageIndex(idx);
                  }
                }}
                className={`relative w-8 h-8 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-monarch-gold ring-offset-2 ring-offset-[#FAF7F2] scale-110 border-white shadow-lg'
                    : 'border-black/20 hover:scale-105 opacity-85 hover:opacity-100'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold drop-shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* INFO 3: SILHOUETTE SIZE & MEASUREMENT GUIDE */}
        <div className="pt-5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-nav uppercase tracking-wider text-monarch-charcoal/80 font-medium">
              Select Silhouette Size
            </span>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="text-[11px] text-[#8C682A] hover:text-monarch-maroon font-nav flex items-center gap-1.5 underline underline-offset-2 transition-colors font-semibold"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>{showSizeGuide ? 'Hide Measurements' : 'Royal Size Guide'}</span>
            </button>
          </div>

          {/* Interactive Royal Size Guide */}
          {showSizeGuide && (
            <div className="p-3.5 rounded-xl bg-[#F4ECE1] border border-monarch-gold/30 text-xs text-monarch-charcoal space-y-2 animate-fadeIn shadow-inner">
              <p className="font-semibold text-monarch-maroon font-serif text-sm">
                Monarch Royal Sizing Index (Inches):
              </p>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-nav uppercase tracking-wider py-1 border-y border-monarch-gold/25 text-[#8C682A] font-bold">
                <span>Size</span>
                <span>Bust</span>
                <span>Waist</span>
                <span>Hip</span>
              </div>
              <div className="space-y-1 text-[11px] font-sans">
                <div className="grid grid-cols-4 gap-2 text-center text-monarch-charcoal">
                  <span className="font-semibold">36 (S)</span>
                  <span>34-35&quot;</span>
                  <span>28&quot;</span>
                  <span>38&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-monarch-charcoal">
                  <span className="font-semibold">38 (M)</span>
                  <span>36-37&quot;</span>
                  <span>30&quot;</span>
                  <span>40&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-monarch-charcoal">
                  <span className="font-semibold">40 (L)</span>
                  <span>38-39&quot;</span>
                  <span>32&quot;</span>
                  <span>42&quot;</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center text-monarch-charcoal">
                  <span className="font-semibold">42 (XL)</span>
                  <span>40-41&quot;</span>
                  <span>34&quot;</span>
                  <span>44&quot;</span>
                </div>
              </div>
              <p className="text-[10px] text-monarch-charcoal/70 italic pt-1 border-t border-monarch-gold/20">
                Bespoke bridal &amp; imperial custom sizing is also available upon salon appointment.
              </p>
            </div>
          )}

          {/* Size Buttons */}
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2 px-3 text-xs font-nav rounded-lg border transition-all ${
                  selectedSize === size
                    ? 'bg-monarch-burgundy text-monarch-gold-light font-bold border-monarch-burgundy shadow-sm scale-102'
                    : 'bg-white text-monarch-charcoal border-monarch-gold/30 hover:border-monarch-gold hover:bg-[#F9F4EC]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* INFO 4: FABRIC WEAVE & SPECIFICATIONS */}
        <div className="pt-5 space-y-3">
          <div className="p-3.5 rounded-xl bg-[#F4ECE1] border border-monarch-gold/25 space-y-2 text-xs shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#8C682A] font-semibold">Fabric Weave:</span>
              <span className="text-monarch-charcoal font-serif font-medium">{product.fabric}</span>
            </div>
            {product.embroidery && (
              <div className="flex items-center justify-between">
                <span className="text-[#8C682A] font-semibold">Craft Technique:</span>
                <span className="text-monarch-charcoal">{product.embroidery}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[#8C682A] font-semibold">Estimated Delivery:</span>
              <span className="text-monarch-charcoal flex items-center gap-1.5 font-medium">
                <Truck className="w-3.5 h-3.5 text-monarch-maroon" />
                <span>{product.deliveryDays || 3}-5 Business Days (Insured)</span>
              </span>
            </div>
          </div>

          {/* Authenticity Seals */}
          <div className="space-y-1.5 px-1 text-[11px] text-monarch-charcoal/80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C682A] shrink-0" />
              <span>100% Certified Silk Mark Guild · 24K Pure Gold Zari</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#8C682A] shrink-0" />
              <span>Complimentary 7-Day Royal Concierge Exchange</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STICKY BOTTOM ACTION FOOTER (LIGHT THEME)
      ========================================================================= */}
      <div className="p-4 sm:p-5 border-t border-monarch-gold/25 bg-[#F4ECE1] shrink-0 space-y-2.5">
        <div className="flex items-center gap-3">
          {/* Main Add to Royal Bag Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-monarch-gold via-[#E5C178] to-monarch-gold hover:brightness-105 text-monarch-burgundy font-nav text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-80 active:scale-98"
          >
            {isAdding ? (
              <>
                <Check className="w-4 h-4 text-monarch-burgundy" />
                <span>Added to Royal Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Royal Bag · {formatINR(product.price)}</span>
              </>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-3.5 rounded-full border transition-all shadow-sm ${
              inWishlist
                ? 'bg-monarch-maroon text-monarch-gold border-monarch-maroon'
                : 'bg-white text-monarch-charcoal border-monarch-gold/35 hover:text-monarch-maroon hover:border-monarch-gold'
            }`}
            aria-label="Toggle wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-monarch-gold' : ''}`} />
          </button>
        </div>

        {/* View Complete Details Link */}
        <Link
          href={`/product/${product.id}`}
          onClick={onClose}
          className="flex items-center justify-center gap-1.5 text-xs font-nav uppercase tracking-widest text-[#8C682A] hover:text-monarch-maroon hover:underline pt-0.5 transition-colors font-bold"
        >
          <span>View Complete Couture Portfolio &amp; Story</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product: propProduct,
  onClose: propOnClose,
}) => {
  const { quickViewProduct, closeQuickView } = useQuickView();
  const { pauseScroll, resumeScroll } = useSmoothScroll();

  // Support both controlled props and global QuickViewContext
  const activeProduct = propProduct !== undefined ? propProduct : quickViewProduct;
  const handleClose = propOnClose !== undefined ? propOnClose : closeQuickView;

  // Lock background window scroll and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (activeProduct) {
      pauseScroll();
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
        resumeScroll();
      };
    }
  }, [activeProduct, pauseScroll, resumeScroll]);

  return (
    <AnimatePresence>
      {activeProduct && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 overflow-hidden flex justify-end"
        >
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Clean Scrollable Light-Themed Side Drawer */}
          <motion.div
            data-lenis-prevent="true"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full max-w-md sm:max-w-lg bg-[#FAF7F2] text-monarch-charcoal border-l border-monarch-gold/30 shadow-[0_0_60px_rgba(0,0,0,0.35)] flex flex-col h-full max-h-screen overflow-hidden overscroll-contain"
          >
            <QuickViewContent
              key={activeProduct.id}
              product={activeProduct}
              onClose={handleClose}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
