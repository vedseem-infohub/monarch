'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useQuickView } from '@/context/QuickViewContext';
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
  // 1. Give patron instant visual checkmark feedback.
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
    <div className="flex flex-col md:grid md:grid-cols-12 h-full w-full overflow-hidden">
      {/* =========================================================================
          LEFT COLUMN: FULL-HEIGHT EDITORIAL MODEL & GARMENT SHOWCASE
      ========================================================================= */}
      <div className="relative md:col-span-6 lg:col-span-7 h-[45vh] md:h-full bg-[#12030A] flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-monarch-gold/25">
        {/* Main Model Viewport */}
        <div className="relative flex-1 w-full h-full overflow-hidden bg-[#100309] group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Subtle Royal Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#12030A]/85 via-transparent to-black/30 pointer-events-none" />

          {/* Top Left Couture Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
            {product.badge && (
              <span className="text-[10px] font-nav uppercase tracking-[0.22em] font-bold bg-[#2A0B15]/95 text-monarch-gold-light px-3.5 py-1.5 rounded-full border border-monarch-gold/50 shadow-xl backdrop-blur-md flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-monarch-gold" />
                <span>{product.badge}</span>
              </span>
            )}
            {product.has3D && (
              <span className="text-[10px] font-nav uppercase tracking-wider bg-monarch-maroon/90 text-monarch-ivory px-3 py-1 rounded-full border border-monarch-gold/40 shadow-md flex items-center gap-1.5 backdrop-blur-md">
                <Box className="w-3.5 h-3.5 text-monarch-gold" />
                <span>Interactive 3D View</span>
              </span>
            )}
          </div>

          {/* Mobile-only Close Button (Pinned Top Right) */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 z-20 text-monarch-beige hover:text-monarch-ivory p-2.5 rounded-full bg-[#2B0E17]/90 border border-monarch-gold/40 backdrop-blur-md transition-all"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Subtle Bottom Watermark on Model Image */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 text-[10px] font-nav uppercase tracking-[0.2em] text-monarch-gold/80 bg-black/50 px-3 py-1 rounded-full backdrop-blur-md border border-monarch-gold/20">
            <Sparkles className="w-3 h-3 text-monarch-gold" />
            <span>Master Artisan Handloom · 24K Gold Zari</span>
          </div>
        </div>

        {/* Thumbnail Selector Strip (Multi-Angle Gallery) */}
        {product.images.length > 1 && (
          <div className="p-3 md:p-4 bg-[#18050E]/95 border-t border-monarch-gold/20 shrink-0">
            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar">
              <span className="hidden lg:inline text-[9px] font-nav uppercase tracking-[0.2em] text-monarch-gold/70 mr-1 shrink-0">
                Angles:
              </span>
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative shrink-0 w-12 h-16 sm:w-14 sm:h-18 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-monarch-gold scale-105 shadow-lg ring-2 ring-monarch-gold/50'
                      : 'border-monarch-gold/20 opacity-60 hover:opacity-100 hover:border-monarch-gold/50'
                  }`}
                  aria-label={`View angle ${idx + 1}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          RIGHT COLUMN: ROYAL COUTURE SPECIFICATIONS & ORDER SUITE
      ========================================================================= */}
      <div className="md:col-span-6 lg:col-span-5 h-[55vh] md:h-full flex flex-col justify-between bg-[#1E0A12] text-monarch-ivory">
        {/* Desktop Header */}
        <div className="p-5 sm:p-6 border-b border-monarch-gold/25 flex items-center justify-between bg-[#17060E] shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-monarch-gold/15 text-monarch-gold border border-monarch-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.28em] text-monarch-gold font-semibold block">
                MONARCH ROYAL ATELIER
              </span>
              <p className="font-serif text-sm text-monarch-beige/80 line-clamp-1">
                {product.categoryName} · Haute Couture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="hidden md:flex text-monarch-beige hover:text-monarch-ivory p-2 rounded-full border border-monarch-gold/30 hover:border-monarch-gold bg-[#2B0E17] transition-all hover:scale-105 shadow-sm"
            aria-label="Close preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Information Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 lg:p-7 space-y-6 divide-y divide-monarch-gold/15 no-scrollbar">
          {/* Section 1: Title, Category, Rating & Price */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-nav uppercase tracking-[0.22em] text-monarch-gold font-semibold">
                  {product.categoryName}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-monarch-ivory font-medium mt-1 tracking-tight leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-monarch-beige/75 font-sans mt-1.5 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Star Rating Badge */}
              <div className="shrink-0 flex items-center gap-1.5 bg-[#2B0E17] px-3 py-1.5 rounded-full border border-monarch-gold/30 text-xs shadow-sm">
                <Star className="w-3.5 h-3.5 fill-monarch-gold text-monarch-gold" />
                <span className="font-semibold text-monarch-gold-light">{product.rating || 4.9}</span>
                <span className="text-monarch-beige/50 text-[10px]">({product.reviewsCount || 48})</span>
              </div>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-monarch-gold-light tracking-tight">
                {formatINR(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-sans line-through text-monarch-beige/45">
                  {formatINR(product.originalPrice)}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-[11px] font-nav uppercase tracking-wider text-emerald-400 bg-emerald-950/70 border border-emerald-500/35 px-2.5 py-0.5 rounded-full font-semibold">
                  {product.discountPercent}% Privilege Off
                </span>
              )}
            </div>
          </div>

          {/* Section 2: Heritage Color Shades */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-nav uppercase tracking-wider text-monarch-beige">
                Heritage Shade: <strong className="text-monarch-ivory">{selectedColor}</strong>
              </span>
              <span className="text-[11px] text-monarch-gold/80 font-sans">
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
                      ? 'ring-2 ring-monarch-gold scale-110 border-white shadow-xl'
                      : 'border-monarch-gold/40 hover:scale-105 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.name && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Silhouette Sizing & Measurement Index */}
          <div className="pt-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-nav uppercase tracking-wider text-monarch-beige">
                Select Silhouette Size
              </span>
              <button
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className="text-[11px] text-monarch-gold hover:text-monarch-gold-light font-nav flex items-center gap-1.5 underline underline-offset-2 transition-colors"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>{showSizeGuide ? 'Hide Measurements' : 'Royal Size Guide'}</span>
              </button>
            </div>

            {/* Interactive Size Guide Table */}
            {showSizeGuide && (
              <div className="p-3.5 rounded-xl bg-[#280D16] border border-monarch-gold/30 text-xs text-monarch-beige space-y-2 animate-fadeIn">
                <p className="font-semibold text-monarch-gold-light font-serif text-sm">
                  Monarch Royal Sizing Index (Inches):
                </p>
                <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-nav uppercase tracking-wider py-1 border-y border-monarch-gold/20 text-monarch-gold">
                  <span>Size</span>
                  <span>Bust</span>
                  <span>Waist</span>
                  <span>Hip</span>
                </div>
                <div className="space-y-1 text-[11px] font-sans">
                  <div className="grid grid-cols-4 gap-2 text-center text-monarch-ivory">
                    <span className="font-semibold">36 (S)</span>
                    <span>34-35&quot;</span>
                    <span>28&quot;</span>
                    <span>38&quot;</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-monarch-ivory">
                    <span className="font-semibold">38 (M)</span>
                    <span>36-37&quot;</span>
                    <span>30&quot;</span>
                    <span>40&quot;</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-monarch-ivory">
                    <span className="font-semibold">40 (L)</span>
                    <span>38-39&quot;</span>
                    <span>32&quot;</span>
                    <span>42&quot;</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-monarch-ivory">
                    <span className="font-semibold">42 (XL)</span>
                    <span>40-41&quot;</span>
                    <span>34&quot;</span>
                    <span>44&quot;</span>
                  </div>
                </div>
                <p className="text-[10px] text-monarch-gold/80 italic pt-1 border-t border-monarch-gold/15">
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
                  className={`py-2.5 px-3 text-xs font-nav rounded-lg border transition-all ${
                    selectedSize === size
                      ? 'bg-monarch-gold text-monarch-burgundy font-bold border-monarch-gold shadow-md scale-102'
                      : 'bg-[#290E17] text-monarch-beige border-monarch-gold/30 hover:border-monarch-gold hover:text-monarch-ivory'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Master Karigari & Weave Specifications */}
          <div className="pt-5 space-y-3">
            <div className="p-4 rounded-xl bg-[#260C15] border border-monarch-gold/25 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-monarch-gold font-medium">Fabric Weave:</span>
                <span className="text-monarch-ivory font-serif font-medium">{product.fabric}</span>
              </div>
              {product.embroidery && (
                <div className="flex items-center justify-between">
                  <span className="text-monarch-gold font-medium">Craft Technique:</span>
                  <span className="text-monarch-beige">{product.embroidery}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-monarch-gold font-medium">Estimated Delivery:</span>
                <span className="text-monarch-beige flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-monarch-gold" />
                  <span>{product.deliveryDays || 3}-5 Business Days (Insured)</span>
                </span>
              </div>
            </div>

            {/* Triple Royal Authenticity Seals */}
            <div className="space-y-1.5 px-1 text-[11px] text-monarch-beige/85">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-monarch-gold shrink-0" />
                <span>100% Certified Silk Mark Guild · 24K Pure Gold Zari</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-monarch-gold shrink-0" />
                <span>Complimentary 7-Day Royal Concierge Exchange</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-5 sm:p-6 border-t border-monarch-gold/25 bg-[#17060B] shrink-0 space-y-3">
          <div className="flex items-center gap-3">
            {/* Main Add to Royal Bag Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-monarch-gold via-[#E5C178] to-monarch-gold hover:brightness-110 text-monarch-burgundy font-nav text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl disabled:opacity-80"
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
              className={`p-3.5 rounded-full border transition-all ${
                inWishlist
                  ? 'bg-monarch-maroon text-monarch-gold border-monarch-gold shadow-md'
                  : 'bg-[#290E17] text-monarch-beige border-monarch-gold/30 hover:text-monarch-gold hover:border-monarch-gold'
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
            className="flex items-center justify-center gap-1.5 text-xs font-nav uppercase tracking-widest text-monarch-gold hover:text-monarch-gold-light hover:underline pt-1 transition-colors"
          >
            <span>View Complete Couture Portfolio &amp; Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product: propProduct,
  onClose: propOnClose,
}) => {
  const { quickViewProduct, closeQuickView } = useQuickView();

  // Support both controlled props and global QuickViewContext
  const activeProduct = propProduct !== undefined ? propProduct : quickViewProduct;
  const handleClose = propOnClose !== undefined ? propOnClose : closeQuickView;

  return (
    <AnimatePresence>
      {activeProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Full-width / Expansive 2-Column Couture Side Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="relative z-10 w-full sm:w-[94vw] md:w-[88vw] lg:w-[82vw] xl:w-[78vw] max-w-6xl bg-[#1E0A12] text-monarch-ivory border-l border-monarch-gold/35 shadow-[0_0_80px_rgba(0,0,0,0.92)] flex flex-col h-full overflow-hidden"
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
