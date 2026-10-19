'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
 * an animated inset white circular action token containing the directional arrow.
 * Includes silky-smooth idle nudge, hover expansion, and tactile click rebound using scoped useGSAP.
 */
export const CurvedAddToCartButton: React.FC<CurvedAddToCartButtonProps> = ({
  onClick,
  label = 'ADD TO CART',
  disabled = false,
  className = '',
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tokenGroupRef = useRef<SVGGElement>(null);
  const arrowPathRef = useRef<SVGPathElement>(null);

  // Scoped GSAP idle micro-nudge animation
  useGSAP(
    () => {
      if (!arrowPathRef.current || !tokenGroupRef.current) return;

      const idleTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2.4 });
      idleTimeline
        .to(tokenGroupRef.current, { x: 2, duration: 0.28, ease: 'power2.out' }, '+=0.2')
        .to(arrowPathRef.current, { x: 2.5, duration: 0.28, ease: 'power2.out' }, '<')
        .to(tokenGroupRef.current, { x: 0, duration: 0.35, ease: 'power2.inOut' })
        .to(arrowPathRef.current, { x: 0, duration: 0.35, ease: 'power2.inOut' }, '<');
    },
    { scope: buttonRef }
  );

  // Smooth hover expansion & forward glide
  const handleMouseEnter = () => {
    if (!tokenGroupRef.current || !arrowPathRef.current) return;
    gsap.to(tokenGroupRef.current, {
      scale: 1.08,
      x: 3.5,
      duration: 0.3,
      ease: 'back.out(1.7)',
    });
    gsap.to(arrowPathRef.current, {
      x: 3,
      duration: 0.26,
      ease: 'power2.out',
    });
  };

  // Return to resting position on leave
  const handleMouseLeave = () => {
    if (!tokenGroupRef.current || !arrowPathRef.current) return;
    gsap.to(tokenGroupRef.current, {
      scale: 1,
      x: 0,
      duration: 0.28,
      ease: 'power2.out',
    });
    gsap.to(arrowPathRef.current, {
      x: 0,
      duration: 0.24,
      ease: 'power2.out',
    });
  };

  // Tactile click rebound
  const handleClick = () => {
    if (disabled) return;
    if (tokenGroupRef.current) {
      gsap.fromTo(
        tokenGroupRef.current,
        { scale: 0.9 },
        { scale: 1.06, duration: 0.32, ease: 'elastic.out(1.2, 0.4)' }
      );
    }
    onClick();
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      aria-label={label}
      className={`group relative inline-flex items-center justify-center p-0 bg-transparent border-0 outline-none cursor-pointer select-none transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <svg
        viewBox="0 0 326 185"
        className="w-[235px] sm:w-[255px] md:w-[270px] h-auto overflow-visible transition-transform duration-300 group-hover:scale-[1.02] group-hover:-translate-y-0.5"
        style={{
          filter: 'drop-shadow(0 14px 24px rgba(160, 18, 45, 0.45))',
        }}
      >
        <defs>
          {/* Smooth upward arch curve for text path */}
          <path
            id="cart-text-arch"
            d="M 58 142 C 106 94, 168 56, 230 42"
          />

          {/* Deep regal ruby maroon gradient matching reference screenshot */}
          <linearGradient id="exact-maroon-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#58141F" />
            <stop offset="40%" stopColor="#701124" />
            <stop offset="100%" stopColor="#8A162D" />
          </linearGradient>
        </defs>

        {/* Closed organic curved silhouette with generous cushion enclosing the white token */}
        <path
          d="M 42 146
             C 64 98, 126 44, 216 18
             C 246 10, 276 10, 298 20
             C 314 28, 316 48, 304 62
             C 292 74, 270 78, 246 84
             C 188 98, 128 136, 78 172
             C 56 178, 34 168, 42 146 Z"
          fill="url(#exact-maroon-grad)"
          className="transition-colors duration-300 group-hover:brightness-110"
        />

        {/* Text curving elegantly along the upward arch */}
        <text
          fill="#FFFFFF"
          fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="16.5"
          letterSpacing="0.1em"
          className="pointer-events-none select-none uppercase tracking-[0.1em]"
        >
          <textPath href="#cart-text-arch" startOffset="8%" dominantBaseline="central">
            {label}
          </textPath>
        </text>

        {/* Animated White Action Token: Circle + Arrow unified as ONE single part with GSAP animation */}
        <g
          ref={tokenGroupRef}
          style={{ transformOrigin: '268px 38px' }}
        >
          {/* White disc badge - 100% nested inside the maroon body */}
          <circle
            cx="268"
            cy="38"
            r="19"
            fill="#FFFFFF"
            className="shadow-sm"
          />

          {/* Directional arrow inside the white disc with animation ref */}
          <path
            ref={arrowPathRef}
            d="M 259 38 L 277 38 M 271 32 L 277 38 L 271 44"
            stroke="#1E1714"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </button>
  );
};
