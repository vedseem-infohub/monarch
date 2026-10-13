'use client';

import { useEffect } from 'react';
import { PRODUCTS } from '@/data/products';

const PRIORITY_SECTION_IMAGES = [
  // Section 1: Woven to Be Remembered - Six Craft Moods
  '/images/moods/kanjivaram_silk.jpg',
  '/images/moods/banarasi_brocade.jpg',
  '/images/moods/chanderi_heritage.jpg',
  '/images/moods/paithani_heirloom.jpg',
  '/images/moods/tussar_silk.jpg',
  '/images/moods/pure_organza.jpg',

  // Section 1: Panoramic Ensembles
  '/images/panoramic/ensemble_aarunya.jpg',
  '/images/panoramic/ensemble_kalyani.jpg',
  '/images/panoramic/ensemble_saanjh.jpg',
  '/images/panoramic/ensemble_prerna.jpg',
  '/images/panoramic/ensemble_utsav.jpg',
  '/images/panoramic/ensemble_vara.jpg',
];

export const SectionImagePreloader: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Collect top product images from first 4 catalog items
    const productImages = PRODUCTS.slice(0, 4).map((p) => p.images[0]);
    const allUrls = Array.from(new Set([...PRIORITY_SECTION_IMAGES, ...productImages]));

    const preloadImages = () => {
      allUrls.forEach((url) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
      });
    };

    // Defer preloading until the main thread is idle so initial render is completely unblocked
    if ('requestIdleCallback' in window) {
      (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => preloadImages(),
        { timeout: 1200 }
      );
    } else {
      const timer = setTimeout(preloadImages, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};
