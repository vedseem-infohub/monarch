import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: CINEMATIC EDITORIAL STORIES (FIRST LIGHT)
 * ============================================================================
 * Endpoint: GET /api/v1/stories/cinematic
 * Description: Fetches full-screen cinematic daily stories with background imagery,
 *              editorial title, audio/craft metadata, and floating preview cards.
 *
 * Expected Database Relations:
 *   StoryCollection (id: "cinematic-stories-2026")
 *     └── 4 x Product (with sectionMetadata: storyTitle, storySubtitle, storyTagline, bgImage)
 *
 * BACKEND DEVELOPER INTEGRATION STEPS:
 * 1. The database table `products` maps directly to `CinematicStoryProduct`.
 * 2. `price` is always numeric (e.g. 19800). Use `formatINR(price)` for display.
 * 3. `bgImage` points to high-resolution CloudFront / S3 CDN assets.
 * ============================================================================
 */

export type CinematicStoryProduct = Product & {
  storyTitleLine1: string;
  storyTitleLine2: string;
  storyCategoryTag: string;
  storySubtitle: string;
  storyDescription: string;
  bgImage: string;
  cardThumbnail: string;
  badgeLabel?: string;
  formattedPrice: string;
};

export const CINEMATIC_STORIES: CinematicStoryProduct[] = [
  {
    id: 'story-first-light-001',
    name: 'SWARNA FIRST LIGHT UTSAV SAREE',
    slug: 'swarna-first-light-utsav-saree',
    tagline: 'Morning Sunshine Handloom Silk Tissue',
    description:
      'Woven to capture the sacred golden radiance of first morning light breaking over Kashi ghats. Ethereal fluid drape adorned with auspicious kalash and sun-disc zari bootis.',
    category: 'designer-sarees',
    categoryName: 'Celebration Silk',
    gender: 'women',
    price: 19800,
    originalPrice: 24500,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { name: 'Swarna Gold', hex: '#D4AF37' },
      { name: 'Kashi Cream', hex: '#F7F0E5' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Mulberry Katan Tissue Silk',
    embroidery: 'Authentic Pitloom Gold Zari Booti',
    occasion: ['Morning Pheras', 'Haldi Ceremony', 'Royal Puja'],
    craftsmanshipStory: 'Master weavers spend 160 hours threading molten gold electroplated zari across warp silk.',
    careInstructions: ['Dry Clean Only', 'Store wrapped in pure mulmul'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 78,
    featured: true,

    // Editorial Story Presentation Metadata
    storyTitleLine1: 'First',
    storyTitleLine2: 'Light',
    storyCategoryTag: 'DAILY',
    storySubtitle: 'THE CELEBRATION VAULT',
    storyDescription:
      'Morning radiance woven in pure gossamer tissue silk, evoking auspicious dawn ceremonies with subtle hand-twisted gold resham.',
    bgImage: '/images/panoramic/ensemble_utsav.jpg',
    cardThumbnail: '/images/panoramic/ensemble_utsav.jpg',
    badgeLabel: '01 / 04',
    formattedPrice: formatINR(19800),

    sectionMetadata: {
      campaignTag: 'MORNING RADIANCE',
      campaignTitle: 'First Light',
      campaignSubtitle: 'The Celebration Vault',
    },
  },
  {
    id: 'story-twilight-soiree-002',
    name: 'KALYANI CRIMSON IMPERIAL KORVAI',
    slug: 'kalyani-crimson-imperial-korvai',
    tagline: 'Heritage Korvai 3-Shuttle Crimson Silk',
    description:
      'Heirloom Kanchipuram silk interlocking temple spires along the borders. Heavy auspicious pallu woven with 24K electroplated gold zari for stately wedding soirees.',
    category: 'bridal-wear',
    categoryName: 'Royal Kanjivaram',
    gender: 'women',
    price: 26400,
    originalPrice: 31800,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { name: 'Rukmini Crimson', hex: '#7A162B' },
      { name: 'Temple Gold', hex: '#C5A262' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Handloom Mulberry Silk',
    embroidery: 'Korvai Interlocking Temple Border',
    occasion: ['Grand Reception', 'Pheras', 'Royal Wedding'],
    craftsmanshipStory: 'Coordinated simultaneously by two master artisans on opposing shuttles.',
    careInstructions: ['Dry Clean Only', 'Roll with Zari facing inside'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 112,
    featured: true,

    storyTitleLine1: 'Twilight',
    storyTitleLine2: 'Soirée',
    storyCategoryTag: 'HERITAGE',
    storySubtitle: 'TEMPLE THREE-SHUTTLE WEFT',
    storyDescription:
      'Commanding crimson temple silk with solid 24K electroplated gold borders, designed for majestic evening celebrations.',
    bgImage: '/images/panoramic/ensemble_kalyani.jpg',
    cardThumbnail: '/images/panoramic/ensemble_kalyani.jpg',
    badgeLabel: '02 / 04',
    formattedPrice: formatINR(26400),

    sectionMetadata: {
      campaignTag: 'TEMPLE MAJESTY',
      campaignTitle: 'Twilight Soirée',
      campaignSubtitle: 'Temple Three-Shuttle Weft',
    },
  },
  {
    id: 'story-gulabi-baithak-003',
    name: 'VARA ROSÉ MUKAISH CHANDERI',
    slug: 'vara-rose-mukaish-chanderi',
    tagline: 'Pure Chanderi Silk with Silver Mukaish',
    description:
      'Delicate gulabi rose Chanderi silk adorned with handcrafted silver-gilt mukaish dots that catch the light like shimmering starlight on palace courtyard marble.',
    category: 'designer-sarees',
    categoryName: 'Chanderi Heritage',
    gender: 'women',
    price: 21600,
    originalPrice: 25900,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { name: 'Gulabi Rosé', hex: '#E79DA2' },
      { name: 'Champagne Silver', hex: '#E2E2D8' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Hand-Spun Chanderi Silk',
    embroidery: 'Silver-Gilt Mukaish Needlework',
    occasion: ['Sangeet Soiree', 'Cocktail Evening', 'Mehendi'],
    craftsmanshipStory: 'Hand-hammered silver wire pierced by needle directly through fine gossamer silk.',
    careInstructions: ['Dry Clean Only', 'Store flat in muslin envelope'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 64,
    featured: true,

    storyTitleLine1: 'Gulabi',
    storyTitleLine2: 'Baithak',
    storyCategoryTag: 'ROMANCE',
    storySubtitle: 'SILVER-GILT MUKAISH BOOTI',
    storyDescription:
      'Featherlight rose silk embellished with antique mukaish stars, echoing candlelit verandas and musical soirees.',
    bgImage: '/images/panoramic/ensemble_vara.jpg',
    cardThumbnail: '/images/panoramic/ensemble_vara.jpg',
    badgeLabel: '03 / 04',
    formattedPrice: formatINR(21600),

    sectionMetadata: {
      campaignTag: 'ROMANTIC ATELIER',
      campaignTitle: 'Gulabi Baithak',
      campaignSubtitle: 'Silver-Gilt Mukaish Booti',
    },
  },
  {
    id: 'story-midnight-darbar-004',
    name: 'AARUNYA MIDNIGHT IMPERIAL LEHENGA',
    slug: 'aarunya-midnight-imperial-lehenga',
    tagline: 'Deep Midnight Velvet & Zardozi Couture',
    description:
      'Commanding royal velvet ensemble intricately embroidered with real silver-gilt and metallic dabka flora, inspired by Awadhi royal archways.',
    category: 'bridal-wear',
    categoryName: 'Imperial Velvet',
    gender: 'women',
    price: 34500,
    originalPrice: 42000,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [
      { name: 'Imperial Velvet', hex: '#3E101A' },
      { name: 'Antique Zari', hex: '#C7A15B' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Micro-Velvet & Mulberry Silk Inner',
    embroidery: 'Awadhi Karchob & Real Metallic Dabka',
    occasion: ['Royal Wedding', 'Bespoke Trousseau', 'Grand Reception'],
    craftsmanshipStory: 'Hand-stretched over wooden karchob frames for over 220 hours of single-needle zardozi.',
    careInstructions: ['Dry Clean Only', 'Store in Mulberry Silk Garment Bag'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 92,
    featured: true,

    storyTitleLine1: 'Midnight',
    storyTitleLine2: 'Darbar',
    storyCategoryTag: 'ROYAL ARCHIVE',
    storySubtitle: 'AWADHI KARCHOB HERITAGE',
    storyDescription:
      'Sumptuous imperial velvet hand-stitched with dabka and zardozi crests, designed for timeless matrimonial grandeur.',
    bgImage: '/images/panoramic/ensemble_aarunya.jpg',
    cardThumbnail: '/images/panoramic/ensemble_aarunya.jpg',
    badgeLabel: '04 / 04',
    formattedPrice: formatINR(34500),

    sectionMetadata: {
      campaignTag: 'IMPERIAL ARCHIVE',
      campaignTitle: 'Midnight Darbar',
      campaignSubtitle: 'Awadhi Karchob Heritage',
    },
  },
];
