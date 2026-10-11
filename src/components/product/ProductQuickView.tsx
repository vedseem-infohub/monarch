'use client';

import React, { useState } from 'react';
import { Product } from '@/types';
import { FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { X, Heart, ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState(
    product ? product.colors[0]?.name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    product ? product.sizes[0] : ''
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedColor || product.colors[0]?.name, selectedSize || product.sizes[0]);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-[#240E14] text-monarch-ivory rounded-2xl max-w-4xl w-full overflow-hidden border border-monarch-gold/40 shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-monarch-beige hover:text-monarch-ivory p-2 rounded-full bg-monarch-burgundy/80 border border-monarch-gold/30 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Gallery Images */}
        <div className="relative aspect-[3/4] md:aspect-auto md:h-full bg-monarch-charcoal flex flex-col justify-between">
          {/* Main Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />

          {/* Thumbnail indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-12 h-16 rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx ? 'border-monarch-gold scale-105' : 'border-monarch-gold/30 opacity-70'
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {product.badge && (
            <span className="absolute top-4 left-4 text-xs font-nav uppercase tracking-wider bg-monarch-burgundy/90 text-monarch-gold-light px-3 py-1 rounded-full border border-monarch-gold/40">
              {product.badge}
            </span>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-nav uppercase tracking-widest text-monarch-gold">
                {product.categoryName}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-monarch-ivory font-medium mt-1">
                {product.name}
              </h3>
              <p className="text-xs text-monarch-beige/80 font-sans mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-2xl font-bold text-monarch-gold-light">
                {FORMAT_CURRENCY(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm font-sans line-through text-monarch-beige/50">
                  {FORMAT_CURRENCY(product.originalPrice)}
                </span>
              )}
              {product.discountPercent && (
                <span className="text-xs font-nav text-green-400 font-medium">
                  ({product.discountPercent}% off)
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-beige mb-2">
                Color: <span className="text-monarch-ivory font-semibold">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      if (color.imageIndex !== undefined) setActiveImageIndex(color.imageIndex);
                    }}
                    className={`w-7 h-7 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'ring-2 ring-monarch-gold scale-110 border-white'
                        : 'border-monarch-gold/40 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-nav uppercase tracking-wider text-monarch-beige">
                  Select Size
                </label>
                <Link
                  href={`/product/${product.id}#size-guide`}
                  onClick={onClose}
                  className="text-[11px] text-monarch-gold hover:underline font-nav"
                >
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 text-xs font-nav rounded-lg border transition-all ${
                      selectedSize === size
                        ? 'bg-monarch-gold text-monarch-burgundy font-semibold border-monarch-gold'
                        : 'bg-monarch-burgundy/70 text-monarch-beige border-monarch-gold/30 hover:border-monarch-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Specification */}
            <div className="text-xs bg-monarch-burgundy/60 p-3 rounded-lg border border-monarch-gold/20 space-y-1">
              <p>
                <span className="text-monarch-gold font-medium">Fabric:</span>{' '}
                <span className="text-monarch-beige">{product.fabric}</span>
              </p>
              <p>
                <span className="text-monarch-gold font-medium">Embroidery:</span>{' '}
                <span className="text-monarch-beige">{product.embroidery}</span>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2 border-t border-monarch-gold/20">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className="flex-1 py-3.5 px-6 rounded-full bg-monarch-gold hover:bg-monarch-gold-light text-monarch-burgundy font-nav text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4 text-monarch-burgundy" />
                    <span>Added to Royal Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Royal Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-full border transition-colors ${
                  inWishlist
                    ? 'bg-monarch-maroon text-monarch-gold border-monarch-gold'
                    : 'bg-monarch-burgundy text-monarch-beige border-monarch-gold/30 hover:text-monarch-gold'
                }`}
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-monarch-gold' : ''}`} />
              </button>
            </div>

            <Link
              href={`/product/${product.id}`}
              onClick={onClose}
              className="block text-center text-xs font-nav uppercase tracking-wider text-monarch-gold hover:text-monarch-gold-light hover:underline pt-1"
            >
              View Complete Couture Details &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
