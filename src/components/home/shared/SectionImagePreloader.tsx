'use client';

import { useEffect, useRef } from 'react';
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

// ─── Section image batches (index = section order) ────────────────────────────

/** Section 0: Six Moods of Silk — above-fold, always preloaded immediately */
const SECTION_0_IMAGES = [
  '/images/moods/kanjivaram_silk.jpg',
  '/images/moods/banarasi_brocade.jpg',
  '/images/moods/chanderi_heritage.jpg',
  '/images/moods/paithani_heirloom.jpg',
  '/images/moods/tussar_silk.jpg',
  '/images/moods/pure_organza.jpg',
];

/** Section 1: Woven to Be Remembered Panoramic Ensembles — above-fold, always preloaded */
const SECTION_1_IMAGES = [
  '/images/panoramic/ensemble_aarunya.jpg',
  '/images/panoramic/ensemble_kalyani.jpg',
  '/images/panoramic/ensemble_saanjh.jpg',
  '/images/panoramic/ensemble_prerna.jpg',
  '/images/panoramic/ensemble_utsav.jpg',
  '/images/panoramic/ensemble_vara.jpg',
];

/**
 * Curated list of high-priority section images used across homepage cards.
 * Kept for backwards compatibility with other consumers.
 */
const BASE_SECTION_IMAGES = [...SECTION_0_IMAGES, ...SECTION_1_IMAGES];

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

// ─── Lazy batches for sections 2–13 ────────────────────────────────────────

function getLazyBatches(): string[][] {
  const bridal: string[] = [];
  BRIDAL_ENSEMBLES.forEach((b) => { if (b.image) bridal.push(b.image); });

  const newArrivals: string[] = [];
  NEW_ARRIVALS_PRODUCTS.forEach((p) => { if (p.images?.[0]) newArrivals.push(p.images[0]); });

  const bestSellers: string[] = [];
  BEST_SELLERS_PRODUCTS.forEach((p) => { if (p.images?.[0]) bestSellers.push(p.images[0]); });

  const trends: string[] = [];
  AUTUMN_WINTER_DATA.campaigns.forEach((c) => {
    if (c.image) trends.push(c.image);
    if (c.images?.[0]) trends.push(c.images[0]);
  });
  EDITS_FOR_OCCASION_DATA.edits.forEach((e) => { if (e.image) trends.push(e.image); });

  const deep: string[] = [];
  WORTH_YOUR_ATTENTION_DATA.products.forEach((p) => { if (p.images?.[0]) deep.push(p.images[0]); });
  LATEST_TRENDS_DATA.products.forEach((t) => { if (t.images?.[0]) deep.push(t.images[0]); });
  CINEMATIC_STORIES.forEach((s) => {
    if (s.bgImage) deep.push(s.bgImage);
    if (s.cardThumbnail) deep.push(s.cardThumbnail);
  });
  CHANGE_LOOK_PRODUCTS.forEach((l) => { if (l.images?.[0]) deep.push(l.images[0]); });
  CRAFT_SANCTUM_PILLARS.forEach((p) => { if (p.macroImage) deep.push(p.macroImage); });

  return [
    [...newArrivals, ...bestSellers],  // batch 0 → sections 2-3
    bridal,                            // batch 1 → section 4 (BridalCollection)
    trends,                            // batch 2 → sections 5-8 (Trends, AutumnWinter, etc.)
    deep,                              // batch 3 → sections 9-13 (deep scroll)
  ];
}

// Singleton: resolved lazily so data imports stay tree-shakeable
let _lazyBatches: string[][] | null = null;
function getLazyBatchesMemo(): string[][] {
  if (!_lazyBatches) _lazyBatches = getLazyBatches();
  return _lazyBatches;
}

function scheduleIdlePreload(urls: string[], timeout = 1500): void {
  if (typeof window === 'undefined') return;
  const doPreload = () => urls.forEach((url) => preloadAndDecodeImage(url));
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback(doPreload, { timeout });
  } else {
    setTimeout(doPreload, timeout);
  }
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * Central Image Preloader Component — viewport-aware progressive loading.
 *
 * Strategy:
 *  • Phase 1 (mount): immediately preload above-fold images (SixMoods + WovenToBeRemembered)
 *  • Phase 2 (IntersectionObserver): when a sentinel div enters the viewport, trigger
 *    preloading of the NEXT batch ("look-ahead" strategy)
 *  • Phase 3 (requestIdleCallback): non-critical deep-scroll sections load on idle
 *
 * Renders invisible sentinel `<div>` anchors for each section transition point.
 */
export const SectionImagePreloader: React.FC = () => {
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const batchLoaded = useRef<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ── Phase 1: Above-fold images — preload immediately ──────────────────
    Promise.all([...SECTION_0_IMAGES, ...SECTION_1_IMAGES].map(preloadAndDecodeImage)).then(() => {
      ScrollTrigger.refresh();
    });

    // ── Phase 2: IntersectionObserver look-ahead loading ─────────────────
    const batches = getLazyBatchesMemo();

    // When sentinel[i] enters viewport → preload batch[i]
    const observers: IntersectionObserver[] = [];

    sentinelRefs.current.forEach((el, i) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !batchLoaded.current[i]) {
            batchLoaded.current[i] = true;
            const urls = batches[i] ?? [];
            // Sections 0-1 → immediate; sections 2+ → idle
            if (i <= 1) {
              Promise.all(urls.map(preloadAndDecodeImage)).then(() => ScrollTrigger.refresh());
            } else {
              scheduleIdlePreload(urls, 800);
            }
            observer.disconnect();
          }
        },
        {
          // Start preloading when sentinel is 600px below the fold — enough lead time
          rootMargin: '0px 0px 600px 0px',
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    // ── Phase 3: Deep scroll batch (sections 9-13) — schedule on idle ─────
    scheduleIdlePreload(batches[3] ?? [], 2000);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Render invisible sentinel divs between section transitions
  // Positions: after SixMoods (s0→s1), after WovenToBeRemembered (s1→s2),
  //            after NewArrivals+BestSellers (s2-3→s4), after Bridal (s4→s5+)
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => { sentinelRefs.current[i] = el; }}
          aria-hidden="true"
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }}
        />
      ))}
    </>
  );
};
