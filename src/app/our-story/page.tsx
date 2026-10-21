import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Our Story — DRIFT by MONARCH',
  description: 'The story of DRIFT: Preserving rare handwoven silks and Indian imperial craft heritage.',
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <span className="block text-xs font-nav uppercase tracking-[0.3em] text-monarch-gold mt-4">
            The Origin &amp; Vision
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-2">
            The Poetics of the Drape
          </h1>
          <p className="font-serif italic text-base sm:text-lg text-monarch-maroon-light/90 mt-2">
            &ldquo;Handwoven silks draped for every celebration.&rdquo;
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80 border-t border-monarch-gold/30 pt-8">
          <p>
            DRIFT emerged from an unwavering devotion to the sacred textile corridors of India. Across the ancient ghats of Varanasi, the historic courtyards of Kanchipuram, and the regal looms of Chanderi, master karigars spend months shaping threads of pure mulberry silk and electroplated silver-gold zari into living heirlooms.
          </p>
          <p>
            When a saree takes flight, moving with royal ease and effortless grace, that is the essence of DRIFT. Not merely a garment, but a celebration of culture, memory, and generational mastery designed to be cherished across lifetimes.
          </p>
          <div className="pt-6">
            <Link
              href="/our-craft"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon text-white font-medium text-xs tracking-wider uppercase hover:bg-monarch-maroon-dark transition-colors"
            >
              Explore Our Karigars &amp; Weaving Looms &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
