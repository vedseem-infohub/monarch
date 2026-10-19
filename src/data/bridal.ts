import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: BRIDAL & SIGNATURE ENSEMBLES
 * ============================================================================
 * Endpoint: GET /api/v1/collections/bridal
 * Endpoint: GET /api/v1/collections/signatures
 * Description: Fetches royal bridal heirlooms and top-circle signature ensembles.
 *
 * Expected Database Relations:
 *   Product[] (where category = 'bridal-lehengas' or category = 'designer-sarees')
 *     └── sectionMetadata: craftTechnique, heritageTag, etc.
 * ============================================================================
 */

export type BridalProduct = Product & {
  title: string;
  tag: string;
  craft: string;
  formattedPrice: string;
  image: string;
  href: string;
  product?: Product;
};

// Backwards-compatible alias for existing imports
export type BridalEnsemble = BridalProduct;

export const BRIDAL_PRODUCTS: BridalProduct[] = [
  {
    id: 'monarch-011',
    name: 'Janki Courtyard Silk',
    slug: 'monarch-011',
    tagline: 'Awadhi Karchob Flora with Hand-Stretched 3D Dabka',
    description:
      'A masterpiece bridal ensemble created in pure mulberry silk velvet, hand-embroidered with antique gold metallic bullion and heritage Awadhi floral motifs.',
    category: 'bridal-lehengas',
    categoryName: 'Courtyard Weave',
    gender: 'women',
    price: 260000,
    originalPrice: 295000,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'crimson', name: 'Courtyard Crimson', hex: '#631024', image: '/images/panoramic/ensemble_utsav.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Velvet & Katan',
    embroidery: 'Hand-Stretched 3D Dabka & Awadhi Karchob',
    occasion: ['Bridal Pheras', 'Grand Wedding'],
    craftsmanshipStory: 'Hand-stretched over 120 days across heavy timber karchob frames by Bareilly artisans.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 36,
    featured: true,
    badge: 'Royal Heirloom',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: 'Hand-Stretched 3D Dabka',
      heritageTag: 'Awadhi Karchob Flora',
    },

    // Standardized Convenience Aliases
    title: 'Janki Courtyard Silk',
    tag: 'Awadhi Karchob Flora',
    craft: 'Hand-Stretched 3D Dabka',
    formattedPrice: formatINR(260000),
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/monarch-011',
  },
  {
    id: 'monarch-012',
    name: 'Tara Peacock Paithani',
    slug: 'monarch-012',
    tagline: 'Ancestral Pitloom Weft Certified by Silk Mark Guild',
    description:
      'Pure silk Paithani woven with oblique square borders and an auspicious multi-hued peacock pallu in pure gold zari.',
    category: 'designer-sarees',
    categoryName: 'Heritage Paithani',
    gender: 'women',
    price: 230000,
    originalPrice: 260000,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { id: 'peacock', name: 'Peacock Green & Gold', hex: '#0F4D3C', image: '/images/panoramic/ensemble_vara.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Paithani Silk',
    embroidery: 'Gold Zari Tapestry Pallu',
    occasion: ['Wedding Ceremony', 'Festive Darbar'],
    craftsmanshipStory: 'Woven on ancestral wooden pitlooms without electric power.',
    careInstructions: ['Dry Clean Only', 'Roll in Acid-Free Paper'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 28,
    featured: true,
    badge: 'Silk Mark Certified',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: 'Certified Silk Mark Guild',
      heritageTag: 'Ancestral Pitloom Weft',
    },

    // Standardized Convenience Aliases
    title: 'Tara Peacock Paithani',
    tag: 'Ancestral Pitloom Weft',
    craft: 'Certified Silk Mark Guild',
    formattedPrice: formatINR(230000),
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-012',
  },
  {
    id: 'monarch-001',
    name: 'Rukmini Temple Silk',
    slug: 'monarch-001',
    tagline: 'Authentic Kashi Kadwa Handwoven on Ancestral Pitlooms',
    description:
      'Six yards of sanctified crimson silk adorned with sacred temple spires and individually shuttled gold motifs.',
    category: 'bridal-lehengas',
    categoryName: 'Temple Red Silk',
    gender: 'women',
    price: 285000,
    originalPrice: 320000,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { id: 'temple-red', name: 'Temple Red & Gold', hex: '#7E1325', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Katan Silk',
    embroidery: 'Authentic Kashi Kadwa Weave',
    occasion: ['Pheras', 'Auspicious Rituals'],
    craftsmanshipStory: 'Over 60 days of handloom weaving in Varanasi along the Ganges.',
    careInstructions: ['Dry Clean Only', 'Store in Breathable Muslin'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 42,
    featured: true,
    badge: 'Imperial Masterpiece',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: 'Ancestral Varanasi Pitloom',
      heritageTag: 'Authentic Kashi Kadwa',
    },

    // Standardized Convenience Aliases
    title: 'Rukmini Temple Silk',
    tag: 'Authentic Kashi Kadwa',
    craft: 'Ancestral Varanasi Pitloom',
    formattedPrice: formatINR(285000),
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/monarch-001',
  },
  {
    id: 'monarch-003',
    name: 'Aarunya Emerald Kanjivaram',
    slug: 'monarch-003',
    tagline: 'Pure Zari Weft with 24K Gold Electroplated Zari',
    description:
      'Luminous emerald green silk with majestic Korvai temple borders dipped in hallmarked 24K gold zari.',
    category: 'designer-sarees',
    categoryName: 'Royal Kanjivaram',
    gender: 'women',
    price: 245000,
    originalPrice: 280000,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [
      { id: 'emerald', name: 'Emerald Gold', hex: '#1C3A27', image: '/images/panoramic/ensemble_aarunya.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Kanchipuram Mulberry Silk',
    embroidery: 'Korvai 3-Shuttle Temple Weft',
    occasion: ['Wedding Reception', 'Sangeet'],
    craftsmanshipStory: 'Two master weavers coordinating three shuttles for flawless interlocking edges.',
    careInstructions: ['Dry Clean Only', 'Store in Dark Wrap'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 31,
    featured: true,
    badge: 'Pure Zari Weft',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: '24K Gold Electroplated Zari',
      heritageTag: 'Pure Zari Weft',
    },

    // Standardized Convenience Aliases
    title: 'Aarunya Emerald Kanjivaram',
    tag: 'Pure Zari Weft',
    craft: '24K Gold Electroplated Zari',
    formattedPrice: formatINR(245000),
    image: '/images/panoramic/ensemble_aarunya.jpg',
    href: '/product/monarch-003',
  },
  {
    id: 'monarch-005',
    name: 'Saanjh Mystery Banarasi',
    slug: 'monarch-005',
    tagline: 'Hand-Hammered Mukaish on Pure Micro-Velvet & Gota',
    description:
      'Twilight sapphire silk adorned with hundreds of hand-hammered silver mukaish dots that catch the light like a starlit night sky.',
    category: 'designer-sarees',
    categoryName: 'Awadhi Kadwa',
    gender: 'women',
    price: 215000,
    originalPrice: 245000,
    images: ['/images/panoramic/ensemble_saanjh.jpg'],
    colors: [
      { id: 'sapphire', name: 'Midnight Sapphire', hex: '#111E38', image: '/images/panoramic/ensemble_saanjh.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Micro-Velvet & Katan Silk',
    embroidery: 'Hand-Hammered Mukaish & Gota Patti',
    occasion: ['Sangeet', 'Cocktail Reception'],
    craftsmanshipStory: 'Artisans insert fine silver flattened wire by hand into each woven motif.',
    careInstructions: ['Dry Clean Only', 'Protect Mukaish Dots from Friction'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 27,
    featured: true,
    badge: 'Hand-Hammered Mukaish',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: 'Pure Micro-Velvet & Gota',
      heritageTag: 'Hand-Hammered Mukaish',
    },

    // Standardized Convenience Aliases
    title: 'Saanjh Mystery Banarasi',
    tag: 'Hand-Hammered Mukaish',
    craft: 'Pure Micro-Velvet & Gota',
    formattedPrice: formatINR(215000),
    image: '/images/panoramic/ensemble_saanjh.jpg',
    href: '/product/monarch-005',
  },
  {
    id: 'monarch-007',
    name: 'Prerna Festive Tissue',
    slug: 'monarch-007',
    tagline: 'Metallic Silk Weave with Rose-Gold Gossamer Weft',
    description:
      'A liquid shimmer of rose-gold and champagne silk tissue, weightless to drape yet commanding in its aristocratic radiance.',
    category: 'designer-sarees',
    categoryName: 'Rose Gold Tissue',
    gender: 'women',
    price: 195000,
    originalPrice: 220000,
    images: ['/images/panoramic/ensemble_prerna.jpg'],
    colors: [
      { id: 'rose-gold', name: 'Rose Gold Champagne', hex: '#D2A89B', image: '/images/panoramic/ensemble_prerna.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Tissue',
    embroidery: 'Gossamer Metallic Weft & Resham',
    occasion: ['Haldi', 'Mehendi', 'Festive Soiree'],
    craftsmanshipStory: 'Spun from gossamer micro-filaments of silk intertwined with pure silver-gilt.',
    careInstructions: ['Dry Clean Only', 'Keep away from moisture'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 23,
    featured: true,
    badge: 'Metallic Silk Weave',

    // Section Area Reflection
    sectionMetadata: {
      craftTechnique: 'Rose-Gold Gossamer Weft',
      heritageTag: 'Metallic Silk Weave',
    },

    // Standardized Convenience Aliases
    title: 'Prerna Festive Tissue',
    tag: 'Metallic Silk Weave',
    craft: 'Rose-Gold Gossamer Weft',
    formattedPrice: formatINR(195000),
    image: '/images/panoramic/ensemble_prerna.jpg',
    href: '/product/monarch-007',
  },
];

// Backwards-compatible alias for existing imports
export const BRIDAL_ENSEMBLES = BRIDAL_PRODUCTS;
export const SIGNATURE_ENSEMBLES = BRIDAL_PRODUCTS;
