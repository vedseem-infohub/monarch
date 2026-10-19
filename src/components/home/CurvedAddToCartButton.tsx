'use client';

import React from 'react';

export interface CurvedAddToCartButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * CurvedAddToCartButton
 *
 * Exact organic curved maroon/ruby swoosh button with arched text and
 * circular arrow action badge on the right, matching the reference editorial screenshot.
 */
export const CurvedAddToCartButton: React.FC<CurvedAddToCartButtonProps> = ({
  onClick,
  label = 'ADD TO CART',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`group relative inline-flex items-center justify-center p-0 bg-transparent border-0 outline-none cursor-pointer select-none transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <svg
        viewBox="0 0 320 185"
        className="w-[235px] sm:w-[255px] md:w-[270px] h-auto overflow-visible transition-transform duration-300 group-hover:scale-[1.025] group-hover:-translate-y-0.5"
        style={{
          filter: 'drop-shadow(0 14px 24px rgba(160, 18, 45, 0.45))',
        }}
      >
        <defs>
          {/* Smooth upward arch curve for text path */}
          <path
            id="cart-text-arch"
            d="M 58 144 C 108 94, 172 58, 238 42"
          />

          {/* Deep regal ruby maroon gradient matching reference image */}
          <linearGradient id="exact-maroon-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#58141F" />
            <stop offset="40%" stopColor="#701124" />
            <stop offset="100%" stopColor="#8A162D" />
          </linearGradient>
        </defs>

        {/* Closed organic curved silhouette traced directly from reference */}
        <path
          d="M 41.4 147.6
             C 63.0 99.0, 126.0 43.2, 216.0 16.2
             C 244.8 7.2, 284.4 9.0, 302.4 32.4
             C 313.2 48.6, 298.8 66.6, 273.6 73.8
             C 216.0 93.6, 135.0 133.2, 81.0 169.2
             C 59.4 174.6, 34.2 165.6, 41.4 147.6 Z"
          fill="url(#exact-maroon-grad)"
          className="transition-colors duration-300 group-hover:brightness-110"
        />

        {/* Text curving elegantly along the upward arch */}
        <text
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="17"
          letterSpacing="0.1em"
          className="pointer-events-none select-none uppercase tracking-[0.1em]"
        >
          <textPath href="#cart-text-arch" startOffset="8%" dominantBaseline="central">
            {label}
          </textPath>
        </text>

        {/* Circular white action badge on right end */}
        <circle
          cx="273.6"
          cy="34.2"
          r="23"
          fill="#FFFFFF"
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Clean directional arrow inside the circle */}
        <g
          className="transition-transform duration-300 group-hover:translate-x-1"
          style={{ transformOrigin: '273.6px 34.2px' }}
        >
          <path
            d="M 264.5 34.2 L 282.5 34.2 M 276.5 28.2 L 282.5 34.2 L 276.5 40.2"
            stroke="#1E1714"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
};
