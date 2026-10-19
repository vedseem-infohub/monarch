import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: INTERACTIVE STUDIO (CHANGE YOUR LOOK)
 * ============================================================================
 * Endpoint: GET /api/v1/studio/looks
 * Description: Fetches interactive center model looks with color swatches & audio.
 *
 * Expected Database Relations:
 *   LookbookStudio (id: "studio-2026")
 *     └── 3 x Product (with colors, sizes, and sectionMetadata: audioTrack, features)
 * ============================================================================
 */

export interface LookColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export type LookStyleProduct = Product & {
  rawPrice: number;
  subtitle: string;
  modelImage: string;
  thumbnail: string;
  colorName: string;
  audioTrack: {
    title: string;
    artist: string;
    src?: string;
  };
  features: string[];
  reviewCount: number;
  categoryTag: string;
  formattedPrice: string;
  colors: LookColor[];
};

export type LookStyleItem = LookStyleProduct;

export const CHANGE_LOOK_PRODUCTS: LookStyleProduct[] = [
  {
    id: 'prod-look-001',
    name: 'IVORY ORGANZA BLOOM',
    slug: 'ivory-organza-bloom',
    tagline: 'Organza Tissue Handloom Saree',
    description:
      'Gossamer sheer silk woven with delicate gold foil motifs, featherlight border piping, and a fluid contemporary drape designed for daytime festivities and wedding ceremonies.',
    category: 'designer-sarees',
    categoryName: 'Couture Organza',
    gender: 'women',
    price: 18400,
    originalPrice: 22900,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'ivory', name: 'Ivory Cream', hex: '#F4EFE6', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'blush', name: 'Gulabi Rose', hex: '#E5A5B2', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'crimson', name: 'Darbar Crimson', hex: '#7A162B', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Organza Silk Tissue',
    embroidery: 'Handloom Pitloom Zari',
    occasion: ['Wedding Reception', 'Cocktail Soiree', 'Mehendi'],
    craftsmanshipStory: 'Handwoven in Kashi with fine gossamer gold zari that floats like liquid air.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 48,
    featured: true,
    badge: 'New Drop 2026',

    // Section Area Reflection
    sectionMetadata: {
      lookbookName: 'IVORY ORGANZA BLOOM',
      thumbnail: '/images/panoramic/ensemble_utsav.jpg',
      audioTrack: {
        title: 'RAGA BHAIRAVI',
        artist: 'Sitar & Tanpura by Kashi Guild',
      },
      features: [
        'Pure Mulberry Silk Base',
        'Certified Silk Mark Guild',
        'Complimentary Unstitched Blouse Piece',
        'Hand-rolled and Picoted Edges',
      ],
    },

    // Standardized Convenience Aliases
    rawPrice: 18400,
    formattedPrice: formatINR(18400),
    subtitle: 'Organza Tissue Handloom Saree',
    modelImage: '/images/panoramic/ensemble_utsav.jpg',
    thumbnail: '/images/panoramic/ensemble_utsav.jpg',
    colorName: 'Ivory Cream',
    audioTrack: {
      title: 'RAGA BHAIRAVI',
      artist: 'Sitar & Tanpura by Kashi Guild',
    },
    features: [
      'Pure Mulberry Silk Base',
      'Certified Silk Mark Guild',
      'Complimentary Unstitched Blouse Piece',
      'Hand-rolled and Picoted Edges',
    ],
    reviewCount: 48,
    categoryTag: 'Couture Organza',
  },
  {
    id: 'prod-look-002',
    name: 'GULABI ROSE CHANDERI',
    slug: 'gulabi-rose-chanderi',
    tagline: 'Pure Chanderi Silk Zari Drape',
    description:
      'Woven from pure Chanderi silk with authentic silver-gilt zari booti motifs. Shimmering mukaish details evoke the moonlit garden verandas of Central Indian royal courts.',
    category: 'designer-sarees',
    categoryName: 'Chanderi Heritage',
    gender: 'women',
    price: 16900,
    originalPrice: 20500,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { id: 'rose', name: 'Gulabi Rose', hex: '#E5A5B2', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'mint', name: 'Pista Mint', hex: '#B8D4C0', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'ivory', name: 'Ivory Cream', hex: '#F4EFE6', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Chanderi Silk',
    embroidery: 'Silver-Gilt Zari Booti & Mukaish',
    occasion: ['Haldi', 'Sangeet', 'Festive Celebration'],
    craftsmanshipStory: 'Chanderi pitlooms weave warp and weft with heirloom gossamer lightness.',
    careInstructions: ['Dry Clean Only', 'Store in Dark Cotton Wrap'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 32,
    featured: true,
    badge: 'Festive Classic',

    // Section Area Reflection
    sectionMetadata: {
      lookbookName: 'GULABI ROSE CHANDERI',
      thumbnail: '/images/panoramic/ensemble_vara.jpg',
      audioTrack: {
        title: 'RAGA YAMAN',
        artist: 'Bansuri Flute by Awadh Ensemble',
      },
      features: [
        'Pure Hand-Spun Chanderi Silk',
        'Hallmarked Metallic Zari',
        'Includes Designer Running Blouse',
        'Authentic GI Tag Certified',
      ],
    },

    // Standardized Convenience Aliases
    rawPrice: 16900,
    formattedPrice: formatINR(16900),
    subtitle: 'Pure Chanderi Silk Zari Drape',
    modelImage: '/images/panoramic/ensemble_vara.jpg',
    thumbnail: '/images/panoramic/ensemble_vara.jpg',
    colorName: 'Gulabi Rose',
    audioTrack: {
      title: 'RAGA YAMAN',
      artist: 'Bansuri Flute by Awadh Ensemble',
    },
    features: [
      'Pure Hand-Spun Chanderi Silk',
      'Hallmarked Metallic Zari',
      'Includes Designer Running Blouse',
      'Authentic GI Tag Certified',
    ],
    reviewCount: 32,
    categoryTag: 'Chanderi Heritage',
  },
  {
    id: 'prod-look-003',
    name: 'RUKMINI CRIMSON KANJIVARAM',
    slug: 'rukmini-crimson-kanjivaram',
    tagline: 'Korvai Temple Weave Pure Silk',
    description:
      'Heirloom Kanchipuram silk woven with three-shuttle Korvai interlocking temple spires. Solid 24K electroplated zari borders and a commanding heavy gold pallu.',
    category: 'designer-sarees',
    categoryName: 'Royal Kanjivaram',
    gender: 'women',
    price: 24800,
    originalPrice: 28900,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { id: 'crimson', name: 'Rukmini Crimson', hex: '#6E1326', image: '/images/panoramic/ensemble_kalyani.jpg' },
      { id: 'emerald', name: 'Temple Emerald', hex: '#1C3A27', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'gold', name: 'Swarna Gold', hex: '#D4AF37', image: '/images/panoramic/ensemble_vara.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Mulberry Kanjivaram Silk',
    embroidery: 'Korvai Interlocking Temple Borders',
    occasion: ['Pheras', 'Wedding Ceremony', 'Grand Reception'],
    craftsmanshipStory: 'Two master weavers coordinate three shuttles simultaneously for Korvai edges.',
    careInstructions: ['Dry Clean Only', 'Roll with Zari on Inside'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 56,
    featured: true,
    badge: 'Imperial Heirloom',

    // Section Area Reflection
    sectionMetadata: {
      lookbookName: 'RUKMINI CRIMSON KANJIVARAM',
      thumbnail: '/images/panoramic/ensemble_kalyani.jpg',
      audioTrack: {
        title: 'RAGA HAMSADHWANI',
        artist: 'Nadaswaram & Thavil by Tanjore Guild',
      },
      features: [
        'Authentic Korvai 3-Shuttle Weft',
        'Certified Silk Mark Guarantee',
        'Solid 24K Gold Electroplated Zari',
        'Heavy Auspicious Temple Pallu',
      ],
    },

    // Standardized Convenience Aliases
    rawPrice: 24800,
    formattedPrice: formatINR(24800),
    subtitle: 'Korvai Temple Weave Pure Silk',
    modelImage: '/images/panoramic/ensemble_kalyani.jpg',
    thumbnail: '/images/panoramic/ensemble_kalyani.jpg',
    colorName: 'Rukmini Crimson',
    audioTrack: {
      title: 'RAGA HAMSADHWANI',
      artist: 'Nadaswaram & Thavil by Tanjore Guild',
    },
    features: [
      'Authentic Korvai 3-Shuttle Weft',
      'Certified Silk Mark Guarantee',
      'Solid 24K Gold Electroplated Zari',
      'Heavy Auspicious Temple Pallu',
    ],
    reviewCount: 56,
    categoryTag: 'Royal Kanjivaram',
  },
];

export const CHANGE_LOOK_STYLES = CHANGE_LOOK_PRODUCTS;
