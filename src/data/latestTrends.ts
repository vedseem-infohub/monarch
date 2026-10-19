import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API & DATABASE INTEGRATION GUIDE: LATEST TRENDS (CARD DECK STUDIO)
 * ============================================================================
 * Endpoint: GET /api/v1/trends/deck
 * Description: Fetches the flagship editorial "Latest Trends" card deck showcase
 *              with interactive card stacking ("taas ke paate") and range navigation.
 *
 * Expected Database Relations (Prisma):
 *   LatestTrendsDeck (id: "latest-trends-2026")
 *     ├── eyebrow: "Explore Collection"
 *     ├── headingPrimary: "LATEST"
 *     ├── headingSecondary: "TRENDS"
 *     ├── ctaText: "Discover Now"
 *     ├── ctaHref: "/collections/all"
 *     ├── storyHeading: "Stories Behind The Drape"
 *     ├── storyDescription: String
 *     ├── rangeHeading: "Explore The Range"
 *     ├── rangeCategories: Json
 *     └── 5 x Product (curated trend deck ensembles)
 * ============================================================================
 */

export type TrendDeckProduct = Product & {
  formattedPrice: string;
  rangeCategory: string;
  rangeCategorySlug: string;
  storyBehindDrape: string;
  actionHref: string;
};

export interface RangeCategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  href: string;
}

export interface LatestTrendsData {
  eyebrow: string;
  headingPrimary: string;
  headingSecondary: string;
  ctaText: string;
  ctaHref: string;
  storyHeading: string;
  storyDescription: string;
  rangeHeading: string;
  rangeCategories: RangeCategoryItem[];
  products: TrendDeckProduct[];
}

export const LATEST_TRENDS_PRODUCTS: TrendDeckProduct[] = [
  {
    id: 'prod-trend-001',
    name: 'Rani Utsav & Emerald Darbar Saree Ensemble',
    slug: 'darbar-pure-katan-silk-banarasi-saree',
    tagline: 'Dual Heirloom Pitloom Silks in Royal Rani & Emerald',
    description:
      'Woven on ancestral wooden pitlooms along the sacred ghats of Varanasi, featuring delicate silver-gilt and 24K gold electroplated kadwa motifs.',
    category: 'designer-sarees',
    categoryName: 'Banarasi Kadwa',
    gender: 'women',
    price: 260000,
    originalPrice: 295000,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'rani', name: 'Rani Pink', hex: '#C2185B', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'emerald', name: 'Courtyard Emerald', hex: '#1C3A27', image: '/images/panoramic/ensemble_utsav.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Katan Silk & Real Gold Kadwa',
    embroidery: 'Hand-Shuttled Ancestral Kadwa Brocade',
    occasion: ['Wedding Reception', 'Festive Darbar', 'Gala Soirée'],
    craftsmanshipStory: 'Over 60 days of uninterrupted weaving on ancestral Varanasi pitlooms.',
    careInstructions: ['Dry Clean Only', 'Roll in Acid-Free Paper'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 58,
    featured: true,
    badge: 'Trending Now',

    // Section Metadata
    sectionMetadata: {
      rangeCategory: 'Banarasi',
      rangeCategorySlug: 'banarasi-silk',
      trendVelocity: '99%',
      storyBehindDrape:
        'Every piece carries a story woven into its silk, whispered by the loom, shaped by the hands that never surrendered.',
      href: '/product/darbar-pure-katan-silk-banarasi-saree',
    },

    // Convenience Aliases
    formattedPrice: formatINR(260000),
    rangeCategory: 'Banarasi',
    rangeCategorySlug: 'banarasi-silk',
    storyBehindDrape:
      'Every piece carries a story woven into its silk, whispered by the loom, shaped by the hands that never surrendered.',
    actionHref: '/product/darbar-pure-katan-silk-banarasi-saree',
  },
  {
    id: 'prod-trend-002',
    name: 'Aarunya Imperial Crimson Velvet Lehenga',
    slug: 'aarunya-velvet-bridal-lehenga',
    tagline: 'Imperial Velvet & Hand-Beaded Zardozi',
    description:
      'Over 420 hours of single-needle bullion gold zari and hand-couching depicting royal palace jaalis and lotus blossoms in majestic crimson velvet.',
    category: 'bridal-lehengas',
    categoryName: 'Bridal Lehengas',
    gender: 'women',
    price: 285000,
    originalPrice: 325000,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [
      { id: 'crimson', name: 'Imperial Crimson', hex: '#8B1828', image: '/images/panoramic/ensemble_aarunya.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Velvet & Katan Silk',
    embroidery: 'Single-Needle Bullion Zardozi & Dabka',
    occasion: ['Bridal Pheras', 'Grand Wedding'],
    craftsmanshipStory: 'Handcrafted over 120 days by fourth-generation Bareilly karchob masters.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    featured: true,
    badge: 'Bridal Couture',

    sectionMetadata: {
      rangeCategory: 'Bridal',
      rangeCategorySlug: 'bridal-lehengas',
      trendVelocity: '96%',
      storyBehindDrape:
        'A ceremonial masterpiece where ancient karchob frames translate royal courtyard poetry into 24K gold bullion needlework.',
      href: '/product/aarunya-velvet-bridal-lehenga',
    },

    formattedPrice: formatINR(285000),
    rangeCategory: 'Bridal',
    rangeCategorySlug: 'bridal-lehengas',
    storyBehindDrape:
      'A ceremonial masterpiece where ancient karchob frames translate royal courtyard poetry into 24K gold bullion needlework.',
    actionHref: '/product/aarunya-velvet-bridal-lehenga',
  },
  {
    id: 'prod-trend-003',
    name: 'Kalyani Temple Korvai Pure Silk',
    slug: 'rukmini-crimson-kanjivaram',
    tagline: 'Auspicious Korvai Interlocking Spire Weave',
    description:
      'Pure mulberry Kanjivaram silk woven with solid 24K electroplated gold zari spires and an auspicious heavy temple pallu preserved from ancient Thanjavur archives.',
    category: 'designer-sarees',
    categoryName: 'Royal Kanjivaram',
    gender: 'women',
    price: 245000,
    originalPrice: 289000,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { id: 'crimson', name: 'Ruby Crimson', hex: '#87162E', image: '/images/panoramic/ensemble_kalyani.jpg' },
      { id: 'gold', name: 'Swarna Gold', hex: '#D4AF37', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Mulberry Kanjivaram Silk',
    embroidery: 'Korvai Interlocking Temple Borders',
    occasion: ['Pheras', 'Wedding Ceremony', 'Grand Reception'],
    craftsmanshipStory: 'Two master weavers working in unison on opposite sides of the pitloom to fuse borders seamlessly.',
    careInstructions: ['Dry Clean Only', 'Roll in Pure Cotton Wrap'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 96,
    featured: true,
    badge: 'Guild Masterpiece',

    sectionMetadata: {
      rangeCategory: 'Kanjivaram',
      rangeCategorySlug: 'kanjivaram-silk',
      trendVelocity: '94%',
      storyBehindDrape:
        'Woven in the temple city of Kanchipuram using solid mulberry silk threads tested for four generations of ceremonial longevity.',
      href: '/product/rukmini-crimson-kanjivaram',
    },

    formattedPrice: formatINR(245000),
    rangeCategory: 'Kanjivaram',
    rangeCategorySlug: 'kanjivaram-silk',
    storyBehindDrape:
      'Woven in the temple city of Kanchipuram using solid mulberry silk threads tested for four generations of ceremonial longevity.',
    actionHref: '/product/rukmini-crimson-kanjivaram',
  },
  {
    id: 'prod-trend-004',
    name: 'Vara Metallic Gossamer Silk Tissue',
    slug: 'mehr-un-nisa-organza-tissue-saree',
    tagline: 'Featherlight Organza Tissue with Mukaish Shimmer',
    description:
      'Fluid, weightless contemporary drape illuminated with micro-scalloped borders, liquid metallic sheen, and delicate hand-hammered silver wire highlights.',
    category: 'festive-wear-women',
    categoryName: 'Couture Organza & Tissue',
    gender: 'women',
    price: 215000,
    originalPrice: 245000,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { id: 'emerald', name: 'Courtyard Emerald', hex: '#1C3A27', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'rose', name: 'Gulabi Rose', hex: '#E5A5B2', image: '/images/panoramic/ensemble_vara.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Gossamer Silk Tissue & French Net',
    embroidery: 'Hand-Hammered Mukaish & Cutdana',
    occasion: ['Sangeet Soiree', 'Cocktail Reception'],
    craftsmanshipStory: 'Ethereal metallic micro-filaments spun into featherweight gossamer silk.',
    careInstructions: ['Dry Clean Only', 'Store in Dark Wrap'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 41,
    featured: true,
    badge: 'Modern Shimmer',

    sectionMetadata: {
      rangeCategory: 'Tissue & Organza',
      rangeCategorySlug: 'organza-tissue',
      trendVelocity: '92%',
      storyBehindDrape:
        'Liquid metallic sheen crafted with micro-scalloped seed pearl borders that catch warm palace chandeliers effortlessly.',
      href: '/product/mehr-un-nisa-organza-tissue-saree',
    },

    formattedPrice: formatINR(215000),
    rangeCategory: 'Tissue & Organza',
    rangeCategorySlug: 'organza-tissue',
    storyBehindDrape:
      'Liquid metallic sheen crafted with micro-scalloped seed pearl borders that catch warm palace chandeliers effortlessly.',
    actionHref: '/product/mehr-un-nisa-organza-tissue-saree',
  },
  {
    id: 'prod-trend-005',
    name: 'Sitara Kalidar Festive Ensemble',
    slug: 'monarch-004',
    tagline: 'Sweeping 32-Kali Anarkali in Royal Mulberry Silk',
    description:
      'Gleaming resham thread couching and delicate gota patti work framing an architectural 32-kali flare that floats effortlessly across royal festive evenings.',
    category: 'festive-wear-women',
    categoryName: 'Festive Anarkalis',
    gender: 'women',
    price: 145000,
    originalPrice: 175000,
    images: ['/images/panoramic/ensemble_prerna.jpg'],
    colors: [
      { id: 'rose', name: 'Courtyard Rose Gold', hex: '#C79D8E', image: '/images/panoramic/ensemble_prerna.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Mulberry Silk & Chanderi Weft',
    embroidery: 'Jaipur Gota Patti & Gold Resham',
    occasion: ['Sangeet Soiree', 'Diwali Gala', 'Celebration'],
    craftsmanshipStory: 'Hand-dyed in royal gemstone shades and finished with pure organza piping.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 39,
    featured: true,
    badge: 'Festive Classic',

    sectionMetadata: {
      rangeCategory: 'Festive',
      rangeCategorySlug: 'festive-wear-women',
      trendVelocity: '95%',
      storyBehindDrape:
        'A kinetic silhouette of 32 hand-cut panels designed to float with architectural majesty in celebrations under starry night skies.',
      href: '/product/monarch-004',
    },

    formattedPrice: formatINR(145000),
    rangeCategory: 'Festive',
    rangeCategorySlug: 'festive-wear-women',
    storyBehindDrape:
      'A kinetic silhouette of 32 hand-cut panels designed to float with architectural majesty in celebrations under starry night skies.',
    actionHref: '/product/monarch-004',
  },
];

export const RANGE_CATEGORIES: RangeCategoryItem[] = [
  { id: 'kanjivaram', name: 'Kanjivaram', slug: 'kanjivaram-silk', count: 18, href: '/collections/kanjivaram-silk' },
  { id: 'banarasi', name: 'Banarasi', slug: 'banarasi-silk', count: 24, href: '/collections/banarasi-silk' },
  { id: 'bridal', name: 'Bridal', slug: 'bridal-lehengas', count: 12, href: '/collections/bridal-lehengas' },
  { id: 'festive', name: 'Festive', slug: 'festive-wear-women', count: 16, href: '/collections/festive-wear-women' },
  { id: 'organza', name: 'Tissue & Organza', slug: 'organza-tissue', count: 14, href: '/collections/organza-tissue' },
];

export const LATEST_TRENDS_DATA: LatestTrendsData = {
  eyebrow: 'Explore Collection',
  headingPrimary: 'LATEST',
  headingSecondary: 'TRENDS',
  ctaText: 'Discover Now',
  ctaHref: '/collections/all',
  storyHeading: 'Stories Behind The Drape',
  storyDescription:
    'Every piece carries a story woven into its silk, whispered by the loom, shaped by the hands that never surrendered.',
  rangeHeading: 'Explore The Range',
  rangeCategories: RANGE_CATEGORIES,
  products: LATEST_TRENDS_PRODUCTS,
};
