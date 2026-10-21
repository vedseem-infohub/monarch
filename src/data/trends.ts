import { Product } from '@/types';

/*
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: TREND OF THE DAY
 * ============================================================================
 * Endpoint: GET /api/trends/daily
 * Description: Fetches curated high-velocity trending ensembles for the day.
 *
 * Expected Request:
 *   GET /api/trends/daily?limit=10&status=active
 *   Headers: {
 *     'Content-Type': 'application/json',
 *     'Authorization': 'Bearer <token>' (if applicable)
 *   }
 *
 * Expected Backend Response JSON Schema:
 *   {
 *     "success": true,
 *     "timestamp": "2026-10-19T10:00:00Z",
 *     "count": 5,
 *     "data": [
 *       {
 *         "id": "trend-001",
 *         "name": "Aarunya Emerald Kanjivaram",
 *         "slug": "aarunya-emerald-kanjivaram",
 *         "tagline": "Pure Silk · Kanjivaram Weave",
 *         "description": "...",
 *         "category": "designer-sarees",
 *         "categoryName": "Pure Silk · Kanjivaram",
 *         "price": 18900,
 *         "originalPrice": 22500,
 *         "images": ["/images/..."],
 *         "colors": [{ "name": "Emerald Gold", "hex": "#1C3A27" }],
 *         "sizes": ["S", "M", "L", "XL"],
 *         "rating": 4.8,
 *         "reviewsCount": 42,
 *         "inStock": true
 *       }
 *     ]
 *   }
 *
 * Sample Next.js / React Server Component Fetch Implementation:
 *
 * export async function getDailyTrendsFromBackend(): Promise<Product[]> {
 *   try {
 *     const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.monarch.luxury';
 *     const res = await fetch(`${apiUrl}/api/trends/daily`, {
 *       headers: { 'Accept': 'application/json' },
 *       next: { revalidate: 3600 } // Cache for 1 hour with ISR
 *     });
 *     if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
 *     const json = await res.json();
 *     return json.data;
 *   } catch (error) {
 *     console.warn('Backend API unavailable, using fallback mock data:', error);
 *     return TREND_PRODUCTS;
 *   }
 * }
 * ============================================================================
 */

export const TREND_PRODUCTS: Product[] = [
  {
    id: 'trend-001',
    name: 'Aarunya Emerald Kanjivaram',
    slug: 'aarunya-emerald-kanjivaram',
    tagline: 'Pure Silk · Kanjivaram Weave',
    description: 'Ancestral temple borders woven with certified silver-gilt zari on lustrous emerald silk.',
    category: 'designer-sarees',
    categoryName: 'Pure Silk · Kanjivaram',
    gender: 'women',
    price: 18900,
    originalPrice: 22500,
    discountPercent: 16,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [{ name: 'Emerald Gold', hex: '#1C3A27' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Mulberry Kanjivaram Silk',
    embroidery: 'Authentic Temple Korvai Zari Weave',
    occasion: ['Wedding', 'Festive'],
    craftsmanshipStory: 'Hand-loomed in Kanchipuram using ancient three-shuttle interlocking technique.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 5,
    has3D: false,
    badge: 'Royal Edit',
    inStock: true,
    rating: 4.8,
    reviewsCount: 42,
    featured: true,
  },
  {
    id: 'trend-002',
    name: 'Saanjh Maroon Banarasi',
    slug: 'saanjh-maroon-banarasi',
    tagline: 'Banarasi Silk · Zari Weft',
    description: 'Deep royal maroon silk brocade accented with hand-beaten mukaish and kadwa flora.',
    category: 'designer-sarees',
    categoryName: 'Banarasi Silk · Zari',
    gender: 'women',
    price: 26500,
    originalPrice: 29900,
    discountPercent: 11,
    images: ['/images/panoramic/ensemble_saanjh.jpg'],
    colors: [{ name: 'Royal Maroon', hex: '#5A1725' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Katan Silk with Micro Velvet Accents',
    embroidery: 'Hand-hammered Mukaish Wire and Gota',
    occasion: ['Royal Evening', 'Reception'],
    craftsmanshipStory: 'Master artisans in Varanasi hand-shuttled this drape over 30 days.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 6,
    has3D: false,
    badge: 'Bestseller',
    inStock: true,
    rating: 4.9,
    reviewsCount: 38,
    featured: true,
  },
  {
    id: 'trend-003',
    name: 'Prerna Wedding Saree',
    slug: 'prerna-wedding-saree',
    tagline: 'Festive Tissue · Rose Gold',
    description: 'Gossamer metallic silk tissue adorned with micro-scalloped pearl borders.',
    category: 'designer-sarees',
    categoryName: 'Festive Tissue · Rose Gold',
    gender: 'women',
    price: 24800,
    originalPrice: 28000,
    discountPercent: 11,
    images: ['/images/panoramic/ensemble_prerna.jpg'],
    colors: [{ name: 'Rose Gold', hex: '#C79D8E' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Silk Metallic Tissue',
    embroidery: 'Cutdana and Freshwater Pearl Scallops',
    occasion: ['Wedding', 'Sangeet'],
    craftsmanshipStory: 'Rose gold metallic ribbons interwoven with fine silk filament.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 5,
    has3D: false,
    badge: 'New Arrival',
    inStock: true,
    rating: 4.8,
    reviewsCount: 29,
    featured: true,
  },
  {
    id: 'trend-004',
    name: 'Gulabi Ruby Brocade',
    slug: 'gulabi-ruby-brocade',
    tagline: 'Imperial Kadwa · Pitloom',
    description: 'Imperial shikargah motifs rendered in certified pure gold and silver-gilt zari thread.',
    category: 'designer-sarees',
    categoryName: 'Imperial Kadwa · Pitloom',
    gender: 'women',
    price: 28000,
    originalPrice: 32000,
    discountPercent: 12,
    images: ['/images/panoramic/ensemble_vara.jpg'],
    colors: [{ name: 'Ruby Crimson', hex: '#87321F' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: '100% Pure Certified Banarasi Silk',
    embroidery: 'Kashi Kadwa Gold Zari',
    occasion: ['Wedding Gala', 'Pheras'],
    craftsmanshipStory: 'Woven on ancestral pitlooms along the sacred ghats of Varanasi.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 7,
    has3D: false,
    badge: 'Heritage Masterpiece',
    inStock: true,
    rating: 4.9,
    reviewsCount: 51,
    featured: true,
  },
  {
    id: 'trend-005',
    name: 'Mastani Emerald Gharara',
    slug: 'mastani-emerald-gharara',
    tagline: 'Awadhi Silk · Handcrafted',
    description: 'Flared Awadhi silhouette with antique ruched gota and hand-flattened mukaish dots.',
    category: 'festive-wear',
    categoryName: 'Awadhi Silk · Handcrafted',
    gender: 'women',
    price: 21900,
    originalPrice: 25000,
    discountPercent: 12,
    images: ['/images/moods/kanjivaram_silk.jpg'],
    colors: [{ name: 'Emerald', hex: '#1C3A27' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Pure Silk Brocade with Chiffon Dupatta',
    embroidery: 'Ruched Gota and Mukaish Dots',
    occasion: ['Sangeet', 'Festive'],
    craftsmanshipStory: 'Historical Awadh tailoring with handcrafted flare architecture.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 6,
    has3D: false,
    badge: 'Royal Edit',
    inStock: true,
    rating: 4.7,
    reviewsCount: 23,
    featured: false,
  },
];
