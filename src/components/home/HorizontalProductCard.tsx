'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

interface HorizontalProductCardProps {
  product: Product;
  priority?: boolean;
}

export const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  priority = false,
}) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || 'M');
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, defaultColor, selectedSize, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex items-center gap-3 bg-white rounded-xl p-2.5 sm:p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 w-[305px] sm:w-[335px] lg:w-[345px] shrink-0 select-none">
      {/* Left Column: Product Image with Rating Pill */}
      <Link
        href={`/product/${product.id}`}
        className="relative w-[95px] sm:w-[110px] h-[110px] sm:h-[120px] rounded-lg overflow-hidden shrink-0 bg-gray-50 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />

        {/* Rating Pill Badge (Bottom-Left of Image) */}
        <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-white/95 backdrop-blur-sm text-[10px] font-bold text-gray-800 shadow-sm flex items-center gap-0.5 border border-black/5">
          <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </Link>

      {/* Right Column: Title, Subtitle, Size Selector, Price & Add Button */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          {/* Product Name */}
          <Link
            href={`/product/${product.id}`}
            className="font-serif text-xs sm:text-[13px] text-[#1A1A1A] font-semibold hover:text-monarch-maroon transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Subtitle / Category Tagline */}
          <p className="text-[10px] sm:text-[11px] text-gray-500 font-sans line-clamp-1 mt-0.5">
            {product.tagline || product.categoryName}
          </p>

          {/* Size Selector Box Row (S, M, L, XL) */}
          <div className="flex items-center gap-1.5 my-2">
            {['S', 'M', 'L', 'XL'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedSize(size);
                  }}
                  className={`w-6 h-6 rounded text-[10px] font-semibold flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:border-black'
                  }`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Price + Circular Yellow Button */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <span className="font-serif text-sm sm:text-base font-bold text-[#1A1A1A]">
            {FORMAT_CURRENCY(product.price)}
          </span>

          <button
            onClick={handleAddToCart}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm active:scale-90 ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-[#E5A824] hover:bg-[#D49818] text-[#1A1A1A]'
            }`}
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            {added ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
