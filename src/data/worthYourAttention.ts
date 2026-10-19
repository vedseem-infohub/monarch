import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: WORTH YOUR ATTENTION
 * ============================================================================
 * Endpoint: GET /api/v1/spotlight/worth-your-attention
 * Description: Fetches curated spotlight editorial accordion cards featuring
 *              limited offers, archive highlights, and couture drops.
 *
 * Expected Database Relations:
 *   SpotlightCollection (id: "worth-your-attention")
 *     └── 6 x Product (with sectionMetadata: verticalText, attentionHeadline, spotlightTag, offerBadge)
 * ============================================================================
 */

export type AttentionProduct = Product & {
  verticalText: string;
  attentionHeadline: string;
  spotlightTag: string;
  offerBadge: string;
  formattedPrice: string;
  actionHref: string;
};

export interface WorthYourAttentionData {
  eyebrow: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  products: AttentionProduct[];
}

export const ATTENTION_PRODUCTS: AttentionProduct[] = [
  {
    id: 'prod-att-001',
    name: 'Aarunya Royal Velvet Lehenga',
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
      { id: 'vermilion', name: 'Royal Vermilion', hex: '#8B1828', image: '/images/panoramic/ensemble_aarunya.jpg' },
      { id: 'swarna', name: 'Imperial Swarna', hex: '#D4AF37', image: '/images/panoramic/ensemble_aarunya.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Velvet & Katan Silk',
    embroidery: 'Hand-Stretched 3D Dabka & Bullion Zardozi',
    occasion: ['Pheras', 'Bridal Wedding', 'Royal Gala'],
    craftsmanshipStory: 'Handcrafted over 120 days by fourth-generation Bareilly karchob masters.',
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
      verticalText: 'CURRENT OFFERS',
      attentionHeadline: 'Occasionwear, reduced',
      spotlightTag: 'ROYAL ARCHIVE · 15% PRIVILEGE',
      offerBadge: 'LIMITED PRIVILEGE',
      href: '/product/aarunya-velvet-bridal-lehenga',
    },

    // Standardized Convenience Aliases
    verticalText: 'CURRENT OFFERS',
    attentionHeadline: 'Occasionwear, reduced',
    spotlightTag: 'ROYAL ARCHIVE · 15% PRIVILEGE',
    offerBadge: 'LIMITED PRIVILEGE',
    formattedPrice: formatINR(285000),
    actionHref: '/product/aarunya-velvet-bridal-lehenga',
  },
  {
    id: 'prod-att-002',
    name: 'Utsav Kashi Kadwa Brocade',
    slug: 'darbar-pure-katan-silk-banarasi-saree',
    tagline: 'Authentic 24K Electroplated Gold Zari Kadwa',
    description:
      'Woven on ancestral wooden pitlooms along the sacred ghats of Varanasi, featuring intricate floral jaal tapestries and regal peacock borders.',
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
    fabric: 'Pure Katan Silk',
    embroidery: 'Handloom Pitloom Zari',
    occasion: ['Wedding Ceremony', 'Festive Darbar'],
    craftsmanshipStory: 'Individually shuttled gold floral motifs requiring 60 days of uninterrupted master weaving.',
    careInstructions: ['Dry Clean Only', 'Roll in Acid-Free Paper'],
    deliveryDays: 4,
    has3D: false,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    featured: true,
    badge: 'Heritage Festive',

    // Section Area Reflection
    sectionMetadata: {
      verticalText: 'HEIRLOOM KADWA',
      attentionHeadline: 'Sacred Kashi Pitloom Weaves',
      spotlightTag: '24K GOLD ZARI · HEIRLOOM',
      offerBadge: 'HERITAGE VAULT',
      href: '/product/darbar-pure-katan-silk-banarasi-saree',
    },

    // Standardized Convenience Aliases
    verticalText: 'HEIRLOOM KADWA',
    attentionHeadline: 'Sacred Kashi Pitloom Weaves',
    spotlightTag: '24K GOLD ZARI · HEIRLOOM',
    offerBadge: 'HERITAGE VAULT',
    formattedPrice: formatINR(260000),
    actionHref: '/product/darbar-pure-katan-silk-banarasi-saree',
  },
  {
    id: 'prod-att-003',
    name: 'Vara Metallic Gossamer Tissue',
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
    badge: 'Modern Couture',

    // Section Area Reflection
    sectionMetadata: {
      verticalText: 'ETHEREAL DRAPES',
      attentionHeadline: 'Fluid Metallic Cocktail Silks',
      spotlightTag: 'WEIGHTLESS SILK TISSUE',
      offerBadge: 'COUTURE DROP',
      href: '/product/mehr-un-nisa-organza-tissue-saree',
    },

    // Standardized Convenience Aliases
    verticalText: 'ETHEREAL DRAPES',
    attentionHeadline: 'Fluid Metallic Cocktail Silks',
    spotlightTag: 'WEIGHTLESS SILK TISSUE',
    offerBadge: 'COUTURE DROP',
    formattedPrice: formatINR(215000),
    actionHref: '/product/mehr-un-nisa-organza-tissue-saree',
  },
  {
    id: 'prod-att-004',
    name: 'Kalyani Temple Korvai Silk',
    slug: 'rukmini-crimson-kanjivaram',
    tagline: 'Heirloom Korvai Interlocking Temple Borders',
    description:
      'Pure mulberry Kanjivaram silk woven with solid 24K electroplated gold zari spires and an auspicious heavy temple pallu preserved from ancient Thanjavur court archives.',
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
    badge: 'Imperial Heirloom',

    // Section Area Reflection
    sectionMetadata: {
      verticalText: 'ROYAL WEDDING',
      attentionHeadline: 'Tanjore Guild Masterworks',
      spotlightTag: 'AUSPICIOUS TEMPLE BORDERS',
      offerBadge: 'BRIDAL SIGNATURE',
      href: '/product/rukmini-crimson-kanjivaram',
    },

    // Standardized Convenience Aliases
    verticalText: 'ROYAL WEDDING',
    attentionHeadline: 'Tanjore Guild Masterworks',
    spotlightTag: 'AUSPICIOUS TEMPLE BORDERS',
    offerBadge: 'BRIDAL SIGNATURE',
    formattedPrice: formatINR(245000),
    actionHref: '/product/rukmini-crimson-kanjivaram',
  },
  {
    id: 'prod-att-005',
    name: 'Padmavati Imperial Crimson Lehenga',
    slug: 'bridal-01',
    tagline: 'Royal Awadhi Trousseau in Crimson Velvet',
    description:
      'A monumental bridal heirloom hand-embroidered with 24K gold bullion, real seed pearls, and uncut stones over five months of dedicated Bareilly karchob artistry.',
    category: 'bridal-lehengas',
    categoryName: 'Bridal Trousseau',
    gender: 'women',
    price: 320000,
    originalPrice: 365000,
    images: ['/images/panoramic/ensemble_aarunya.jpg'],
    colors: [
      { id: 'crimson', name: 'Darbar Crimson', hex: '#7E1325', image: '/images/panoramic/ensemble_aarunya.jpg' },
    ],
    sizes: ['34', '36', '38', '40', '42'],
    fabric: 'Pure Silk Velvet & Katan Silk',
    embroidery: 'Bespoke Imperial Karchob & Marodi',
    occasion: ['Bespoke Wedding', 'Royal Reception'],
    craftsmanshipStory: 'Individual artisan consultation with custom monogrammed waistband and ceremonial veil.',
    careInstructions: ['Dry Clean Only', 'Store in Handcrafted Wooden Chest'],
    deliveryDays: 7,
    has3D: false,
    inStock: true,
    rating: 5.0,
    reviewsCount: 48,
    featured: true,
    badge: 'Bespoke Atelier',

    // Section Area Reflection
    sectionMetadata: {
      verticalText: 'BRIDAL TROUSSEAU',
      attentionHeadline: 'Single-Needle Zardozi Heirlooms',
      spotlightTag: '120-DAY HAND EMBROIDERY',
      offerBadge: 'VAULT ATELIER',
      href: '/product/bridal-01',
    },

    // Standardized Convenience Aliases
    verticalText: 'BRIDAL TROUSSEAU',
    attentionHeadline: 'Single-Needle Zardozi Heirlooms',
    spotlightTag: '120-DAY HAND EMBROIDERY',
    offerBadge: 'VAULT ATELIER',
    formattedPrice: formatINR(320000),
    actionHref: '/product/bridal-01',
  },
  {
    id: 'prod-att-006',
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
    images: ['/images/panoramic/ensemble_utsav.jpg'],
    colors: [
      { id: 'emerald', name: 'Temple Emerald', hex: '#1C3A27', image: '/images/panoramic/ensemble_utsav.jpg' },
      { id: 'rust', name: 'Imperial Rust', hex: '#87321F', image: '/images/panoramic/ensemble_utsav.jpg' },
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

    // Section Area Reflection
    sectionMetadata: {
      verticalText: 'FESTIVE SOIRÉE',
      attentionHeadline: 'Poetic 32-Kali Flares',
      spotlightTag: 'MUKAISH & GOTA PATTI',
      offerBadge: 'FESTIVE PRIVILEGE',
      href: '/product/monarch-004',
    },

    // Standardized Convenience Aliases
    verticalText: 'FESTIVE SOIRÉE',
    attentionHeadline: 'Poetic 32-Kali Flares',
    spotlightTag: 'MUKAISH & GOTA PATTI',
    offerBadge: 'FESTIVE PRIVILEGE',
    formattedPrice: formatINR(145000),
    actionHref: '/product/monarch-004',
  },
];

export const WORTH_YOUR_ATTENTION_DATA: WorthYourAttentionData = {
  eyebrow: 'ROYAL SPOTLIGHT',
  heading: 'Worth your attention',
  description:
    'Curated spotlight portfolios, limited ceremonial drops, and archival heirlooms crafted for royal celebrations.',
  ctaText: 'EXPLORE ALL SPOTLIGHTS',
  ctaHref: '/collections/all',
  products: ATTENTION_PRODUCTS,
};
