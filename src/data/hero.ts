/**
 * Monarch Flagship Hero Walkthrough Configuration and Editorial Chapters
 * Complies with AGENTS.md decoupled data standards (Rule 4).
 */

export interface HeroChapter {
  id: string;
  chapterNumber: number;
  label: string;
  rangeStart: number;
  rangeEnd: number;
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
}

export interface HeroConfig {
  totalFrames: number;
  scrollDistanceVh: number;
  framePathPrefix: string;
  initialPosterPath: string;
  pillBadgeText: string;
  chapters: HeroChapter[];
}

export const HERO_CONFIG: HeroConfig = {
  totalFrames: 79,
  scrollDistanceVh: 400,
  framePathPrefix: '/hero-frames/frame_',
  initialPosterPath: '/hero-frames/frame_001.webp',
  pillBadgeText: 'Royal Haute Couture · Festive 2026',
  chapters: [
    {
      id: 'prologue',
      chapterNumber: 0,
      label: 'PROLOGUE',
      rangeStart: 0,
      rangeEnd: 0.22,
      eyebrow: 'Heritage Reimagined',
      title: 'A LEGACY',
      titleHighlight: 'WOVEN IN ELEGANCE',
      description:
        'Step inside the flagship bridal sanctum. Where centuries of hand-spun raw mulberry silks, authentic Kashi zari brocades, and imperial Awadhi tailoring meet digital couture.',
      primaryCta: {
        label: 'EXPLORE THE COLLECTION',
        href: '/collections/all',
      },
      secondaryCta: {
        label: 'DISCOVER OUR CRAFT',
        href: '/our-craft',
      },
    },
    {
      id: 'chapter-1',
      chapterNumber: 1,
      label: 'CHAPTER I',
      rangeStart: 0.22,
      rangeEnd: 0.52,
      eyebrow: 'Chapter I · The Sanctuary',
      title: 'Step Into The Atelier',
      description:
        'The grand doors open to reveal an exclusive archive of royal Indian occasionwear, curating generational bridal couture for the discerning connoisseur.',
    },
    {
      id: 'chapter-2',
      chapterNumber: 2,
      label: 'CHAPTER II',
      rangeStart: 0.52,
      rangeEnd: 0.78,
      eyebrow: 'Chapter II · Imperial Karigari',
      title: 'Woven In Pure Zari & Silk',
      description:
        'Certified 24-karat gold wefts interlaced across hand-loomed mulberry silks. Over 400 continuous artisan hours dedicated to every single masterwork.',
    },
    {
      id: 'chapter-3',
      chapterNumber: 3,
      label: 'CHAPTER III',
      rangeStart: 0.78,
      rangeEnd: 1.0,
      eyebrow: 'Chapter III · The Royal Edit',
      title: 'The Archival Ensembles',
      description:
        'From bespoke crimson velvet bridal lehengas to hand-embroidered raw silk sherwanis, discover the crown jewels of Indian ceremonial couture.',
      primaryCta: {
        label: 'SHOP BRIDAL SUITE',
        href: '/wedding',
      },
      secondaryCta: {
        label: 'VIEW SHERWANIS',
        href: '/men',
      },
    },
  ],
};

/**
 * Generates the full array of frame URLs for the 79-frame boutique sequence
 */
export const HERO_FRAME_PATHS: string[] = Array.from(
  { length: HERO_CONFIG.totalFrames },
  (_, i) => {
    const padded = String(i + 1).padStart(3, '0');
    return `${HERO_CONFIG.framePathPrefix}${padded}.webp`;
  }
);
