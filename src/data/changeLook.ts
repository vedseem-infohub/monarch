import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: INTERACTIVE STUDIO (CHANGE YOUR LOOK)
 * ============================================================================
 * Endpoint: GET /api/v1/studio/looks
 * Description: Fetches interactive center model looks with color swatches & metadata.
 *
 * Expected Database Relations:
 *   LookbookStudio (id: "studio-2026")
 *     └── 3 x Product (with colors, sizes, and sectionMetadata: audioTrack, features)
 *
 * BACKEND DEVELOPER INTEGRATION STEPS:
 * 1. The database table `products` maps directly to `LookStyleProduct`.
 * 2. `price` is always numeric (e.g. 21600). Use `formatINR(price)` for display.
 * 3. Color swatches map to `ProductVariant` rows or JSON `colors`.
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
    name: 'ROSÉ NET EMBROIDERED',
    slug: 'rose-net-embroidered',
    tagline: 'Delicate Embroidered Net Silk Saree',
    description:
      'Gossamer rose sheer net saree woven with delicate silver and gold threadwork, finished with scalloped hand-cut zardozi borders for ethereal celebratory radiance.',
    category: 'designer-sarees',
    categoryName: 'Couture Net & Tissue',
    gender: 'women',
    price: 21600,
    originalPrice: 25900,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { id: 'cream', name: 'Cream Ivory', hex: '#F6EFE9', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'rose', name: 'Rosé', hex: '#E79DA2', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'red', name: 'Ruby Crimson', hex: '#87162E', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    fabric: 'Pure Silk Net & French Tissue',
    embroidery: 'Hand-Cut Scallop Zardozi & Mukaish Work',
    occasion: ['Reception', 'Cocktail Soiree', 'Sangeet Night'],
    craftsmanshipStory: 'Master artisans hand-needle fine silver resham into gossamer net over 180 hours.',
    careInstructions: ['Dry Clean Only', 'Store Flat in Muslin Envelope'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.7,
    reviewsCount: 128,
    featured: true,
    badge: 'New Drop 2026',

    // Section Area Reflection
    sectionMetadata: {
      lookbookName: 'ROSÉ NET EMBROIDERED',
      thumbnail: '/images/panoramic/ensemble_vara.jpg',
      audioTrack: {
        title: 'RAGA BHAIRAVI',
        artist: 'Sitar & Tanpura by Kashi Guild',
      },
      features: [
        'Pure Mulberry Silk Net Base',
        'Certified Silk Mark Guild',
        'Scalloped Zardozi Hand Borders',
        'Complimentary Designer Blouse',
      ],
    },

    // Standardized Convenience Aliases
    rawPrice: 21600,
    formattedPrice: formatINR(21600),
    subtitle: 'Delicate Embroidered Net Silk Saree',
    modelImage: '/images/panoramic/ensemble_vara.jpg',
    thumbnail: '/images/panoramic/ensemble_vara.jpg',
    colorName: 'Rosé',
    audioTrack: {
      title: 'RAGA BHAIRAVI',
      artist: 'Sitar & Tanpura by Kashi Guild',
    },
    features: [
      'Pure Mulberry Silk Net Base',
      'Certified Silk Mark Guild',
      'Scalloped Zardozi Hand Borders',
      'Complimentary Designer Blouse',
    ],
    reviewCount: 128,
    categoryTag: 'Couture Net & Tissue',
  },
  {
    id: 'prod-look-002',
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
      { id: 'crimson', name: 'Ruby Crimson', hex: '#87162E', image: '/images/panoramic/ensemble_kalyani.jpg' },
      { id: 'rose', name: 'Rosé', hex: '#E79DA2', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'cream', name: 'Cream Ivory', hex: '#F6EFE9', image: '/images/panoramic/ensemble_utsav.jpg' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    fabric: 'Pure Mulberry Kanjivaram Silk',
    embroidery: 'Korvai Interlocking Temple Borders',
    occasion: ['Pheras', 'Wedding Ceremony', 'Grand Reception'],
    craftsmanshipStory: 'Two master weavers coordinate three shuttles simultaneously for Korvai edges.',
    careInstructions: ['Dry Clean Only', 'Roll with Zari on Inside'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 96,
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
    colorName: 'Ruby Crimson',
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
    reviewCount: 96,
    categoryTag: 'Royal Kanjivaram',
  },
  {
    id: 'prod-look-003',
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
      { id: 'cream', name: 'Cream Ivory', hex: '#F6EFE9', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'rose', name: 'Rosé', hex: '#E79DA2', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'crimson', name: 'Darbar Crimson', hex: '#87162E', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    fabric: 'Pure Organza Silk Tissue',
    embroidery: 'Handloom Pitloom Zari',
    occasion: ['Haldi', 'Sangeet', 'Festive Celebration'],
    craftsmanshipStory: 'Handwoven in Kashi with fine gossamer gold zari that floats like liquid air.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 74,
    featured: true,
    badge: 'Festive Classic',

    // Section Area Reflection
    sectionMetadata: {
      lookbookName: 'IVORY ORGANZA BLOOM',
      thumbnail: '/images/panoramic/ensemble_utsav.jpg',
      audioTrack: {
        title: 'RAGA YAMAN',
        artist: 'Bansuri Flute by Awadh Ensemble',
      },
      features: [
        'Pure Hand-Spun Tissue Silk',
        'Hallmarked Metallic Zari',
        'Includes Designer Running Blouse',
        'Authentic GI Tag Certified',
      ],
    },

    // Standardized Convenience Aliases
    rawPrice: 18400,
    formattedPrice: formatINR(18400),
    subtitle: 'Organza Tissue Handloom Saree',
    modelImage: '/images/panoramic/ensemble_utsav.jpg',
    thumbnail: '/images/panoramic/ensemble_utsav.jpg',
    colorName: 'Cream Ivory',
    audioTrack: {
      title: 'RAGA YAMAN',
      artist: 'Bansuri Flute by Awadh Ensemble',
    },
    features: [
      'Pure Hand-Spun Tissue Silk',
      'Hallmarked Metallic Zari',
      'Includes Designer Running Blouse',
      'Authentic GI Tag Certified',
    ],
    reviewCount: 74,
    categoryTag: 'Couture Organza',
  },
];

export const CHANGE_LOOK_STYLES = CHANGE_LOOK_PRODUCTS;
