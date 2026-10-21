'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

/*
 * ============================================================================
 * COMPONENT: HorizontalProductCard
 * ============================================================================
 * Matches the reference layout with:
 * - Left: Aspect image with floating rating pill
 * - Right: Title, subtitle, interactive size buttons, price & circular gold action button
 *
 * Backend integration:
 * Receives standard backend Product entity. When user clicks the circular gold
 * button, the active selected size is passed directly to the Cart service/context.
 * ============================================================================
 */

interface HorizontalProductCardProps {
  product: Product;
  priority?: boolean;
}

export const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  priority = false,
}) => {
  const { addToCart } = useCart();
  // Default to 'M' size as shown in user reference screenshot
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || 'M');
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Call CartContext addToCart with user-selected size
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, defaultColor, selectedSize, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex items-center gap-3.5 sm:gap-4 bg-white rounded-2xl p-3.5 sm:p-4 border border-gray-200/70 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-all duration-300 w-[340px] sm:w-[370px] lg:w-[390px] shrink-0 select-none">
      {/* Left Column: Product Image with Floating Rating Pill */}
      <Link
        href={`/product/${product.id}`}
        className="relative w-[115px] sm:w-[130px] h-[130px] sm:h-[145px] rounded-xl overflow-hidden shrink-0 bg-gray-50 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          loading="lazy"
          sizes="(max-width: 640px) 115px, 130px"
          decoding="async"
        />

        {/* Rating Pill Badge (Bottom-Left of Image as in Screenshot) */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-bold text-gray-900 shadow-sm flex items-center gap-1 border border-black/5">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </Link>

      {/* Right Column: Title, Subtitle, Size Selector, Price & Add Button */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          {/* Product Name */}
          <Link
            href={`/product/${product.id}`}
            className="font-serif text-sm sm:text-[15px] text-[#1A1A1A] font-semibold group-hover:text-monarch-maroon transition-colors line-clamp-1 block leading-tight"
          >
            {product.name}
          </Link>

          {/* Subtitle / Category Tagline */}
          <p className="text-[11px] sm:text-xs text-gray-500 font-sans line-clamp-1 mt-1">
            {product.tagline || product.categoryName}
          </p>

          {/* Size Selector Box Row (S, M, L, XL - interactive with active dark state) */}
          <div className="flex items-center gap-1.5 my-2.5">
            {['S', 'M', 'L', 'XL'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-md text-[11px] font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-sm ring-1 ring-black scale-102'
                      : 'bg-[#F8F8F8] text-[#444444] border border-gray-200/90 hover:border-black hover:text-black'
                  }`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Price + Circular Yellow Button (Exact Match to Screenshot) */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="font-serif text-base sm:text-lg font-bold text-[#1A1A1A]">
            {FORMAT_CURRENCY(product.price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-90 cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E5A824] hover:bg-[#D49818] text-[#1A1A1A]'
            }`}
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            {added ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
