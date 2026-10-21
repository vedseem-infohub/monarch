import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: EDITS FOR EVERY OCCASION
 * ============================================================================
 * Endpoint: GET /api/v1/collections/occasions
 * Description: Fetches curated editorial occasion portals (The Wedding Edit,
 *              Heritage Weaves, The New Drape, Private Atelier).
 *
 * Expected Database Relations:
 *   OccasionCollection (id: "edits-for-every-occasion")
 *     └── 4 x Product (each with sectionMetadata: occasionTag, occasionTitle)
 * ============================================================================
 */

export type OccasionEditProduct = Product & {
  occasionTitle: string;
  occasionTag: string;
  actionText: string;
  actionHref: string;
  image: string;
  formattedPrice: string;
};

export interface EditsForOccasionData {
  headingPrimary: string;
  headingScript: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  edits: OccasionEditProduct[];
  products: OccasionEditProduct[];
}

const OCCASION_EDITS: OccasionEditProduct[] = [
  {
    id: 'prod-edit-wedding',
    name: 'The Wedding Edit',
    slug: 'the-wedding-edit',
    tagline: 'Curated Wedding Trousseau for Royal Ceremonies',
    description:
      'A majestic bridal portfolio curated for Mehendi, Sangeet, Pheras, and Reception, crafted with pure gold zari and ancestral Awadhi zardozi.',
    category: 'bridal-lehengas',
    categoryName: 'Bridal Trousseau',
    gender: 'women',
    price: 285000,
    originalPrice: 320000,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [
      { id: 'vermilion', name: 'Royal Vermilion', hex: '#8B1828', image: '/images/panoramic/ensemble_aarunya.jpg' },
      { id: 'gold', name: 'Imperial Swarna', hex: '#D4AF37', image: '/images/panoramic/ensemble_aarunya.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Velvet & Katan Silk',
    embroidery: 'Hand-Stretched 3D Dabka & Bullion Zardozi',
    occasion: ['Pheras', 'Bridal Wedding', 'Reception'],
    craftsmanshipStory: 'Over 120 days of single-needle hand-couching by Bareilly karchob masters.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    featured: true,
    badge: 'Curated Trousseau',

    // Section Area Reflection
    sectionMetadata: {
      occasionTag: 'CURATED WEDDING TROUSSEAU',
      occasionTitle: 'The Wedding Edit',
    },

    // Standardized Convenience Aliases
    occasionTitle: 'The Wedding Edit',
    occasionTag: 'CURATED WEDDING TROUSSEAU',
    actionText: 'EXPLORE NOW',
    actionHref: '/collections/all?occasion=wedding',
    image: '/images/panoramic/ensemble_aarunya.jpg',
    formattedPrice: formatINR(285000),
  },
  {
    id: 'prod-edit-heritage',
    name: 'Heritage Weaves',
    slug: 'heritage-weaves',
    tagline: 'Timeless Handloom Wefts from Ancestral Pitlooms',
    description:
      'Centuries of Indian weaving heritage woven on non-electric wooden pitlooms, featuring sacred Kashi Kadwa and royal Paithani peacock tapestries.',
    category: 'designer-sarees',
    categoryName: 'Ancestral Handloom',
    gender: 'women',
    price: 260000,
    originalPrice: 295000,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'crimson', name: 'Royal Crimson', hex: '#631024', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'sapphire', name: 'Darbar Sapphire', hex: '#11224D', image: '/images/panoramic/ensemble_utsav.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Katan Silk & Paithani Weft',
    embroidery: 'Authentic 24K Electroplated Gold Zari',
    occasion: ['Royal Gathering', 'Festive Darbar'],
    craftsmanshipStory: 'Individually shuttled gold floral motifs woven over 60 days in Varanasi.',
    careInstructions: ['Dry Clean Only', 'Roll in Acid-Free Paper'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    featured: true,
    badge: 'Handloom Masterpiece',

    // Section Area Reflection
    sectionMetadata: {
      occasionTag: 'TIMELESS HANDLOOMS',
      occasionTitle: 'Heritage Weaves',
    },

    // Standardized Convenience Aliases
    occasionTitle: 'Heritage Weaves',
    occasionTag: 'TIMELESS HANDLOOMS',
    actionText: 'EXPLORE NOW',
    actionHref: '/collections/all?category=designer-sarees',
    image: '/images/panoramic/ensemble_utsav.jpg',
    formattedPrice: formatINR(260000),
  },
  {
    id: 'prod-edit-new-drape',
    name: 'The New Drape',
    slug: 'the-new-drape',
    tagline: 'Contemporary Silhouettes & Gossamer Silk Tissues',
    description:
      'Fluid, weightless sarees reimagined with featherlight organza tissues, shimmering mukaish highlights, and modern cocktail architecture.',
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
    badge: 'Modern Couture',

    // Section Area Reflection
    sectionMetadata: {
      occasionTag: 'CONTEMPORARY SILHOUETTES',
      occasionTitle: 'The New Drape',
    },

    // Standardized Convenience Aliases
    occasionTitle: 'The New Drape',
    occasionTag: 'CONTEMPORARY SILHOUETTES',
    actionText: 'EXPLORE NOW',
    actionHref: '/collections/all?category=festive-wear-women',
    image: '/images/panoramic/ensemble_vara.jpg',
    formattedPrice: formatINR(215000),
  },
  {
    id: 'prod-edit-atelier',
    name: 'Private Atelier',
    slug: 'private-atelier',
    tagline: 'Bespoke Royal Couture Crafted for Connoisseurs',
    description:
      'One-of-a-kind royal heirlooms customized to your precise measurements, featuring 18 bespoke basting steps and full floating horsehair canvas.',
    category: 'bridal-lehengas',
    categoryName: 'Private Atelier Bespoke',
    gender: 'women',
    price: 320000,
    originalPrice: 365000,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { id: 'darbar-gold', name: 'Darbar Antique Gold', hex: '#C59B27', image: '/images/panoramic/ensemble_kalyani.jpg' },
      { id: 'crimson', name: 'Temple Crimson', hex: '#7E1325', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Hand-Spun Mulberry Silk & Velvet',
    embroidery: 'Bespoke Imperial Karchob & Marodi',
    occasion: ['Bespoke Wedding', 'Coronation Gala'],
    craftsmanshipStory: 'Each ensemble is tailored exclusively with personal artisan consultation and monogrammed crest.',
    careInstructions: ['Dry Clean Only', 'Store in Handcrafted Wooden Chest'],
    deliveryDays: 7,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 38,
    featured: true,
    badge: 'Bespoke Atelier',

    // Section Area Reflection
    sectionMetadata: {
      occasionTag: 'BESPOKE ROYAL COUTURE',
      occasionTitle: 'Private Atelier',
    },

    // Standardized Convenience Aliases
    occasionTitle: 'Private Atelier',
    occasionTag: 'BESPOKE ROYAL COUTURE',
    actionText: 'EXPLORE NOW',
    actionHref: '/collections/all?category=bridal-lehengas',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    formattedPrice: formatINR(320000),
  },
];

export const EDITS_FOR_OCCASION_DATA: EditsForOccasionData = {
  headingPrimary: 'EDITS FOR',
  headingScript: 'every occasion',
  description: 'Curated luxury edits tailored for wedding trousseaus, ancestral ceremonies, and evening galas.',
  ctaText: 'EXPLORE ALL EDITS',
  ctaHref: '/collections/all',
  edits: OCCASION_EDITS,
  products: OCCASION_EDITS,
};
