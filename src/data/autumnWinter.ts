import { Product } from '@/types';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: AUTUMN–WINTER 2026 CAMPAIGN
 * ============================================================================
 * Endpoint: GET /api/v1/campaigns/autumn-winter-2026
 * Description: Fetches seasonal editorial campaign forecast with curated products.
 *
 * Expected Database Relations:
 *   CampaignSection (id: "autumn-winter-2026")
 *     └── 3 x Product (with sectionMetadata: campaignTag, campaignTitle, etc.)
 * ============================================================================
 */

export type ArchedCampaignProduct = Product & {
  title: string;
  subtitle: string;
  saree: string;
  tag: string;
  image: string;
  href: string;
};

// Backwards-compatible alias for existing imports
export type ArchedCampaignItem = ArchedCampaignProduct;

export interface AutumnWinterData {
  tag: string;
  headingLine1: string;
  headingLine2: string;
  headingYear: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  campaigns: ArchedCampaignProduct[];
  products: ArchedCampaignProduct[];
}

const AUTUMN_WINTER_PRODUCTS: ArchedCampaignProduct[] = [
  {
    id: 'prod-aw-001',
    name: 'Awadhi Darbar Couture Saree',
    slug: 'awadhi-darbar-couture',
    tagline: 'Pure Katan Silk Kadwa in Royal Crimson',
    description:
      'Woven on ancestral Kashi pitlooms with electroplated gold zari weft, celebrating the majestic darbars of Awadh with hand-embroidered dabka borders.',
    category: 'designer-sarees',
    categoryName: 'Heritage Silk · Temple Weave',
    gender: 'women',
    price: 260000,
    originalPrice: 295000,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'crimson', name: 'Royal Crimson', hex: '#631024', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'sapphire', name: 'Darbar Sapphire', hex: '#11224D', image: '/images/panoramic/ensemble_utsav.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Katan Silk',
    embroidery: 'Handloom Pitloom Zari & Awadhi Dabka',
    occasion: ['Wedding', 'Festive Soiree', 'Darbar Gala'],
    craftsmanshipStory: 'Handcrafted over 45 days along the Ganges by master fifth-generation weavers.',
    careInstructions: ['Dry Clean Only', 'Store in Mulmul Muslin Bag'],
    deliveryDays: 3,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
    badge: 'Heritage Festive',

    // Section Area Reflection
    sectionMetadata: {
      campaignTag: 'Heritage Festive',
      campaignTitle: 'Awadhi Darbar Couture',
      campaignSubtitle: 'Pure Katan Silk Kadwa',
      curatedSaree: 'Royal Crimson & Sapphire Weave',
    },

    // Standardized Convenience Aliases
    title: 'Awadhi Darbar Couture',
    subtitle: 'Pure Katan Silk Kadwa',
    saree: 'Royal Crimson & Sapphire Weave',
    tag: 'Heritage Festive',
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/awadhi-darbar-couture',
  },
  {
    id: 'prod-aw-002',
    name: 'Courtyard Baithak Paithani',
    slug: 'courtyard-baithak-paithani',
    tagline: 'Ancestral Paithani Weft with Certified Pure Silk Mark Guild',
    description:
      'An ode to royal garden verandas and classical court gatherings, featuring a tapestry of peacocks and blooming lotuses woven in pure silk tissue.',
    category: 'designer-sarees',
    categoryName: 'Ancestral Paithani',
    gender: 'women',
    price: 230000,
    originalPrice: 260000,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [
      { id: 'emerald', name: 'Courtyard Emerald', hex: '#1C3A27', image: '/images/panoramic/ensemble_vara.jpg' },
      { id: 'rani', name: 'Gulabi Rani', hex: '#B82855', image: '/images/panoramic/ensemble_vara.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Paithani Mulberry Silk',
    embroidery: 'Gold Zari Tapestry Weft',
    occasion: ['Royal Gathering', 'Wedding Reception'],
    craftsmanshipStory: 'Certified by the Silk Mark Guild with pure tested silver and gold bullion wefts.',
    careInstructions: ['Dry Clean Only', 'Store in Dark Cotton Wrap'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
    badge: 'Royal Gathering',

    // Section Area Reflection
    sectionMetadata: {
      campaignTag: 'Royal Gathering',
      campaignTitle: 'Courtyard Baithak',
      campaignSubtitle: 'Ancestral Paithani Weft',
      curatedSaree: 'Certified Pure Silk Mark Guild',
    },

    // Standardized Convenience Aliases
    title: 'Courtyard Baithak',
    subtitle: 'Ancestral Paithani Weft',
    saree: 'Certified Pure Silk Mark Guild',
    tag: 'Royal Gathering',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/courtyard-baithak-paithani',
  },
  {
    id: 'prod-aw-003',
    name: 'Kashi Imperial Silk Saree',
    slug: 'kashi-imperial-silk',
    tagline: '24K Electroplated Gold Zari with Hand-Stretched 3D Dabka Border',
    description:
      'The zenith of imperial luxury. Woven with authentic gold-dipped silver threads and hand-framed with raised floral dabka needlecraft from Bareilly ateliers.',
    category: 'designer-sarees',
    categoryName: 'Imperial Brocade',
    gender: 'women',
    price: 285000,
    originalPrice: 320000,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [
      { id: 'imperial-gold', name: 'Imperial Gold & Vermilion', hex: '#8B1828', image: '/images/panoramic/ensemble_kalyani.jpg' },
      { id: 'antique-zari', name: 'Antique Champagne', hex: '#D5BE91', image: '/images/panoramic/ensemble_kalyani.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Kashi Brocade Silk',
    embroidery: '3D Dabka & Bullion Zardozi',
    occasion: ['Pheras', 'Bridal Ceremony', 'Imperial Coronation'],
    craftsmanshipStory: 'Over 60 days of meticulous pitloom craftsmanship in sacred Kashi weaving sanctums.',
    careInstructions: ['Dry Clean Only', 'Roll in Acid-Free Tissue Paper'],
    deliveryDays: 5,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 44,
    featured: true,
    badge: 'Couture Heirloom',

    // Section Area Reflection
    sectionMetadata: {
      campaignTag: 'Couture Heirloom',
      campaignTitle: 'Kashi Imperial Silk',
      campaignSubtitle: '24K Electroplated Gold Zari',
      curatedSaree: 'Hand-Stretched 3D Dabka Border',
    },

    // Standardized Convenience Aliases
    title: 'Kashi Imperial Silk',
    subtitle: '24K Electroplated Gold Zari',
    saree: 'Hand-Stretched 3D Dabka Border',
    tag: 'Couture Heirloom',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/kashi-imperial-silk',
  },
];

export const AUTUMN_WINTER_DATA: AutumnWinterData = {
  tag: 'SEASON FORECAST',
  headingLine1: 'Autumn–',
  headingLine2: 'Winter',
  headingYear: '2026',
  description:
    'From ancestral Varanasi pitlooms to royal darbars, a couture forecast celebrating timeless silhouettes, gossamer silk tissues, and heirloom zari wefts.',
  ctaText: 'EXPLORE 2026 FORECAST',
  ctaHref: '/collections/all',
  campaigns: AUTUMN_WINTER_PRODUCTS,
  products: AUTUMN_WINTER_PRODUCTS,
};
