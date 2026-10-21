import { Product } from '@/types';

/*
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: SEASONAL SPECIAL
 * ============================================================================
 * Endpoint: GET /api/collections/seasonal
 * Description: Fetches limited seasonal, wedding, and festive campaign drops.
 *
 * Expected Request:
 *   GET /api/collections/seasonal?season=winter-wedding-2026&status=active
 *   Headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': 'Bearer <token>' (if applicable)
 *   }
 *
 * Expected Backend Response JSON Schema:
 *   {
 *     "success": true,
 *     "timestamp": "2026-10-19T10:00:00Z",
 *     "season": "Winter Festive & Wedding 2026",
 *     "count": 5,
 *     "data": [
 *       {
 *         "id": "seasonal-001",
 *         "name": "Rukmini Temple Silk",
 *         "slug": "rukmini-temple-silk",
 *         "tagline": "Heritage Silk · Temple Weave",
 *         "description": "...",
 *         "category": "designer-sarees",
 *         "categoryName": "Heritage Silk · Temple Weave",
 *         "price": 16400,
 *         "originalPrice": 19500,
 *         "images": ["/images/..."],
 *         "colors": [{ "name": "Deep Crimson", "hex": "#5A1725" }],
 *         "sizes": ["S", "M", "L", "XL"],
 *         "rating": 4.9,
 *         "reviewsCount": 36,
 *         "inStock": true
 *       }
 *     ]
 *   }
 *
 * Sample Next.js / React Server Component Fetch Implementation:
 *
 * export async function getSeasonalSpecialsFromBackend(): Promise<Product[]> {
 *   try {
 *     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.monarch.luxury';
 *     const res = await fetch(`${apiUrl}/api/collections/seasonal`, {
 *       headers: { 'Accept': 'application/json' },
 *       next: { revalidate: 3600 } // Cache for 1 hour with ISR
 *     });
 *     if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
 *     const json = await res.json();
 *     return json.data;
 *   } catch (error) {
 *     console.warn('Backend API unavailable, using fallback mock data:', error);
 *     return SEASONAL_PRODUCTS;
 *   }
 * }
 * ============================================================================
 */

export const SEASONAL_PRODUCTS: Product[] = [
  {
    id: 'seasonal-001',
    name: 'Rukmini Temple Silk',
    slug: 'rukmini-temple-silk',
    tagline: 'Heritage Silk · Temple Weave',
    description: 'Ancient temple motifs shuttled in fine 24K gold zari on pure mulberry silk.',
    category: 'designer-sarees',
    categoryName: 'Heritage Silk · Temple Weave',
    gender: 'women',
    price: 16400,
    originalPrice: 19500,
    discountPercent: 15,
    images: ['/images/panoramic/ensemble_kalyani.jpg'],
    colors: [{ name: 'Deep Crimson', hex: '#5A1725' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Mulberry Silk with Tested Zari',
    embroidery: 'Authentic Pitloom Temple Borders',
    occasion: ['Rituals', 'Festive', 'Pheras'],
    craftsmanshipStory: 'Woven with four hundred hours of traditional weaver discipline.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 5,
    has3D: false,
    badge: 'Bestseller',
    inStock: true,
    rating: 4.9,
    reviewsCount: 36,
    featured: true,
  },
  {
    id: 'seasonal-002',
    name: 'Meera Courtyard Silk',
    slug: 'meera-courtyard-silk',
    tagline: 'Courtyard Silk · Dabka',
    description: 'Awadhi karchob embroidery on rich mustard and sunset orange silk velvet.',
    category: 'bridal-lehengas',
    categoryName: 'Courtyard Silk · Dabka',
    gender: 'women',
    price: 19400,
    originalPrice: 23000,
    discountPercent: 15,
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [{ name: 'Ochre Gold', hex: '#C7A15B' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Silk Brocade with Velvet Trims',
    embroidery: 'Hand-stretched 3D Dabka and Marodi',
    occasion: ['Haldi', 'Sangeet', 'Wedding'],
    craftsmanshipStory: 'Framed on wooden karchob tables by third-generation karigars.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 6,
    has3D: false,
    badge: 'Royal Edit',
    inStock: true,
    rating: 4.8,
    reviewsCount: 28,
    featured: true,
  },
  {
    id: 'seasonal-003',
    name: 'Kaveri Crimson Saree',
    slug: 'kaveri-crimson-saree',
    tagline: 'Pure Raw Silk · Festive',
    description: 'Vibrant crimson drape highlighted with intricate silver zari floral jaals.',
    category: 'designer-sarees',
    categoryName: 'Pure Raw Silk · Festive',
    gender: 'women',
    price: 22200,
    originalPrice: 26000,
    discountPercent: 14,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [{ name: 'Royal Crimson', hex: '#87321F' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Raw Mulberry Silk',
    embroidery: 'Silver Gilt Floral Kadwa Weave',
    occasion: ['Festive', 'Wedding Reception'],
    craftsmanshipStory: 'Certified Silk Mark guild handloom with natural organic dyes.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 5,
    has3D: false,
    badge: 'New Arrival',
    inStock: true,
    rating: 4.9,
    reviewsCount: 44,
    featured: true,
  },
  {
    id: 'seasonal-004',
    name: 'Tara Paithani Heirloom',
    slug: 'tara-paithani-heirloom',
    tagline: 'Ancestral Weft · Paithani',
    description: 'Iconic peacock pallu motifs woven with pure gold zari on lustrous bottle green silk.',
    category: 'designer-sarees',
    categoryName: 'Ancestral Weft · Paithani',
    gender: 'women',
    price: 25600,
    originalPrice: 29500,
    discountPercent: 13,
    images: ['/images/moods/paithani_heirloom.jpg'],
    colors: [{ name: 'Bottle Green', hex: '#144237' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Handwoven Paithani Silk',
    embroidery: 'Oblique Tapestry Weaving with Real Zari',
    occasion: ['Gala', 'Festive Soirée'],
    craftsmanshipStory: 'Preserves traditional 200-year-old royal Maratha loom practices.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 7,
    has3D: false,
    badge: 'Heritage Masterpiece',
    inStock: true,
    rating: 4.8,
    reviewsCount: 19,
    featured: true,
  },
  {
    id: 'seasonal-005',
    name: 'Noor Brocade Saree',
    slug: 'noor-brocade-saree',
    tagline: 'Chanderi Heritage · Zari',
    description: 'Lightweight gossamer Chanderi silk sheer with delicate hand-woven boota motifs.',
    category: 'designer-sarees',
    categoryName: 'Chanderi Heritage · Zari',
    gender: 'women',
    price: 27500,
    originalPrice: 31000,
    discountPercent: 11,
    images: ['/images/moods/chanderi_heritage.jpg'],
    colors: [{ name: 'Ivory Gold', hex: '#F7F0E5' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Fine Cotton Silk Chanderi',
    embroidery: 'Hand-woven Eknalis Bootas',
    occasion: ['Daytime Soirée', 'Festive'],
    craftsmanshipStory: 'Spun with ultra-fine silk threads creating delicate semi-sheer luster.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 5,
    has3D: false,
    badge: 'Royal Edit',
    inStock: true,
    rating: 4.7,
    reviewsCount: 15,
    featured: false,
  },
];
