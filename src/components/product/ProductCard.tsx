'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { FORMAT_CURRENCY } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Heart, Eye, ShoppingBag, Sparkles, Box } from 'lucide-react';
import { ProductQuickView } from './ProductQuickView';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const inWishlist = isInWishlist(product.id);

  // Active image based on hover and color selection
  const primaryImg = product.images[selectedColorIdx] || product.images[0];
  const secondaryImg = product.images[1] || primaryImg;
  const currentImg = isHovered ? secondaryImg : primaryImg;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-xl overflow-hidden border border-monarch-beige/40 hover:border-monarch-gold transition-all duration-500 shadow-sm hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image Frame */}
        <Link
          href={`/product/${product.id}`}
          className="relative aspect-[3/4] overflow-hidden bg-monarch-ivory block"
        >
          {/* Main Image with Smooth Swap */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImg}
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="text-[10px] font-nav uppercase tracking-wider bg-monarch-burgundy text-monarch-gold-light px-2.5 py-1 rounded-full border border-monarch-gold/40 shadow-sm">
                {product.badge}
              </span>
            )}
            {product.has3D && (
              <span className="text-[10px] font-nav uppercase tracking-wider bg-monarch-maroon/90 text-monarch-ivory px-2 py-0.5 rounded-full border border-monarch-gold/30 shadow-sm flex items-center gap-1">
                <Box className="w-3 h-3 text-monarch-gold" />
                <span>3D View</span>
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              inWishlist
                ? 'bg-monarch-maroon text-monarch-gold shadow'
                : 'bg-white/80 hover:bg-white text-monarch-charcoal hover:text-monarch-maroon shadow-sm'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-monarch-gold' : ''}`} />
          </button>

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              className="flex-1 py-2.5 px-3 rounded-lg bg-monarch-burgundy/95 hover:bg-monarch-maroon text-monarch-ivory border border-monarch-gold/50 text-[11px] font-nav uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-lg"
            >
              <Eye className="w-3.5 h-3.5 text-monarch-gold" />
              <span>Quick View</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="p-2.5 rounded-lg bg-monarch-gold hover:bg-monarch-gold-light text-monarch-burgundy border border-monarch-gold/80 transition-colors shadow-lg"
              title="Quick Add to Bag"
              aria-label="Quick Add to Bag"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </Link>

        {/* Product Details */}
        <div className="p-4 flex-1 flex flex-col justify-between bg-white">
          <div>
            {/* Category Name */}
            <p className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold-dark mb-1 font-semibold">
              {product.categoryName}
            </p>

            {/* Product Title */}
            <Link
              href={`/product/${product.id}`}
              className="font-serif text-base sm:text-lg text-monarch-charcoal font-medium hover:text-monarch-maroon transition-colors line-clamp-1"
            >
              {product.name}
            </Link>

            {/* Fabric Tagline */}
            <p className="text-xs text-monarch-charcoal-light/70 font-sans mt-0.5 line-clamp-1">
              {product.fabric}
            </p>
          </div>

          <div className="mt-3 pt-3 border-t border-monarch-beige/25 flex items-center justify-between">
            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-base sm:text-lg font-bold text-monarch-maroon">
                  {FORMAT_CURRENCY(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-monarch-charcoal/40 line-through font-sans">
                    {FORMAT_CURRENCY(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="flex items-center gap-1.5">
              {product.colors.slice(0, 3).map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIdx(color.imageIndex ?? idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColorIdx === (color.imageIndex ?? idx)
                      ? 'ring-1 ring-monarch-gold scale-125 border-white'
                      : 'border-black/20 hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[10px] text-monarch-charcoal/50 font-nav">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={isQuickViewOpen ? product : null}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
};
