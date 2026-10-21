'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';
import { WORTH_YOUR_ATTENTION_DATA } from '@/data/worthYourAttention';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';
import { LATEST_TRENDS_DATA } from '@/data/latestTrends';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';
import { CHANGE_LOOK_PRODUCTS } from '@/data/changeLook';
import { CRAFT_SANCTUM_PILLARS } from '@/data/atelier';
import { NEW_ARRIVALS_PRODUCTS } from '@/data/newArrivals';
import { BEST_SELLERS_PRODUCTS } from '@/data/bestSellers';
import { PRODUCTS } from '@/data/products';

/**
 * Curated list of high-priority section images used across homepage cards
 */
const BASE_SECTION_IMAGES = [
  // Section 1: Six Moods of Silk
  '/images/moods/kanjivaram_silk.jpg',
  '/images/moods/banarasi_brocade.jpg',
  '/images/moods/chanderi_heritage.jpg',
  '/images/moods/paithani_heirloom.jpg',
  '/images/moods/tussar_silk.jpg',
  '/images/moods/pure_organza.jpg',

  // Section 2: Woven to Be Remembered Panoramic Ensembles
  '/images/panoramic/ensemble_aarunya.jpg',
  '/images/panoramic/ensemble_kalyani.jpg',
  '/images/panoramic/ensemble_saanjh.jpg',
  '/images/panoramic/ensemble_prerna.jpg',
  '/images/panoramic/ensemble_utsav.jpg',
  '/images/panoramic/ensemble_vara.jpg',
];

/**
 * Aggregates all card image URLs across sections to guarantee instant,
 * un-faded rendering when scroll triggers activate.
 */
export function getAllSectionImageUrls(): string[] {
  const urls: string[] = [...BASE_SECTION_IMAGES];

  // Autumn-Winter Cathedral Arch Cards
  AUTUMN_WINTER_DATA.campaigns.forEach((c) => {
    if (c.image) urls.push(c.image);
    if (c.images?.[0]) urls.push(c.images[0]);
  });

  // Edits for Every Occasion Portals
  EDITS_FOR_OCCASION_DATA.edits.forEach((e) => {
    if (e.image) urls.push(e.image);
  });

  // Worth Your Attention Accordion Spotlight Cards
  WORTH_YOUR_ATTENTION_DATA.products.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // The Bridal Collection Ensembles
  BRIDAL_ENSEMBLES.forEach((b) => {
    if (b.image) urls.push(b.image);
  });

  // Latest Trends Deck Cards
  LATEST_TRENDS_DATA.products.forEach((t) => {
    if (t.images?.[0]) urls.push(t.images[0]);
  });

  // Cinematic Stories (Background and Card Thumbs)
  CINEMATIC_STORIES.forEach((s) => {
    if (s.bgImage) urls.push(s.bgImage);
    if (s.cardThumbnail) urls.push(s.cardThumbnail);
  });

  // Change Your Look Center Models & Looks
  CHANGE_LOOK_PRODUCTS.forEach((l) => {
    if (l.images?.[0]) urls.push(l.images[0]);
  });

  // Atelier Karigari Pillars
  CRAFT_SANCTUM_PILLARS.forEach((p) => {
    if (p.macroImage) urls.push(p.macroImage);
  });

  // New Arrivals (Section 3)
  NEW_ARRIVALS_PRODUCTS.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // Best Sellers (Section 4)
  BEST_SELLERS_PRODUCTS.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // Catalog Products Fallback
  PRODUCTS.slice(0, 8).forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  return Array.from(new Set(urls.filter(Boolean)));
}

/**
 * In-memory image cache so decoded bitmaps stay resident in GPU memory
 */
const imageMemoryCache = new Set<string>();

/**
 * Proactively preloads and decodes an image so it renders immediately with zero white fade
 */
export function preloadAndDecodeImage(url: string): Promise<void> {
  if (typeof window === 'undefined' || !url || imageMemoryCache.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;

    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => {
          imageMemoryCache.add(url);
          resolve();
        })
        .catch(() => {
          // If decode fails or gets aborted, mark as cached once loaded
          img.onload = () => {
            imageMemoryCache.add(url);
            resolve();
          };
          img.onerror = () => resolve();
        });
    } else {
      (img as HTMLImageElement).onload = () => {
        imageMemoryCache.add(url);
        resolve();
      };
      (img as HTMLImageElement).onerror = () => resolve();
    }
  });
}

/**
 * Central Image Preloader Component:
 * Runs immediately on mount to download and GPU-decode all section card assets.
 * When the user scrolls down, all cards render instantly with zero delay and no white flash.
 */
export const SectionImagePreloader: React.FC = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urls = getAllSectionImageUrls();

    // Priority 1: Decode the next 8 immediately visible section cards in parallel
    const immediateBatch = urls.slice(0, 8);
    Promise.all(immediateBatch.map((url) => preloadAndDecodeImage(url))).then(() => {
      ScrollTrigger.refresh();
    });

    // Priority 2: Decode all remaining section cards incrementally
    const remainingUrls = urls.slice(8);
    const preloadRemaining = () => {
      Promise.all(remainingUrls.map((url) => preloadAndDecodeImage(url))).then(() => {
        ScrollTrigger.refresh();
      });
    };

    if ('requestIdleCallback' in window) {
      const handle = (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => preloadRemaining(),
        { timeout: 800 }
      );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(preloadRemaining, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  return null;
};
