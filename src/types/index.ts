export interface ColorVariant {
  id?: string;
  name: string;
  hex: string;
  imageIndex?: number;
  image?: string;
}

export interface ProductAudioTrack {
  title: string;
  artist: string;
  src?: string;
}

export interface SectionMetadata {
  // Editorial Campaign (Autumn-Winter 2026 / Cathedral Arches)
  campaignTag?: string;       // e.g. "Heritage Festive", "Royal Gathering", "Couture Heirloom"
  campaignTitle?: string;     // e.g. "Awadhi Darbar Couture"
  campaignSubtitle?: string;  // e.g. "Pure Katan Silk Kadwa"
  curatedSaree?: string;      // e.g. "Royal Crimson & Sapphire Weave"
  // Occasion Edits (Edits for Every Occasion)
  occasionTag?: string;       // e.g. "CURATED WEDDING TROUSSEAU", "TIMELESS HANDLOOMS"
  occasionTitle?: string;     // e.g. "The Wedding Edit", "Heritage Weaves"

  // Interactive Studio (Change Your Look)
  lookbookName?: string;      // e.g. "IVORY ORGANZA BLOOM"
  thumbnail?: string;         // e.g. "/images/panoramic/ensemble_utsav.jpg"
  audioTrack?: ProductAudioTrack;
  features?: string[];

  // Bridal & Signature Heritage (Woven to be Remembered & Bridal Collection)
  craftTechnique?: string;    // e.g. "Hand-Stretched 3D Dabka", "Certified Silk Mark Guild"
  heritageTag?: string;       // e.g. "Awadhi Karchob Flora", "Ancestral Pitloom Weft"

  // Seasonal & Trending Drops
  seasonTag?: string;         // e.g. "Winter Festive 2026"
  trendVelocity?: string;     // e.g. "High Demand"
}

export interface Model3DConfig {
  primaryColor: string;
  accentColor: string;
  pattern: 'zari-brocade' | 'gota-patti' | 'kashmiri-tilla' | 'zardozi';
  meshType: 'sherwani' | 'lehenga' | 'saree' | 'bandhgala';
  metalness?: number;
  roughness?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  categoryName: string;
  gender: 'women' | 'men' | 'unisex';
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  images: string[];
  colors: ColorVariant[];
  sizes: string[];
  fabric: string;
  embroidery: string;
  occasion: string[];
  craftsmanshipStory: string;
  careInstructions: string[];
  deliveryDays: number;
  has3D: boolean;
  model3DConfig?: Model3DConfig;
  badge?: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  featured?: boolean;

  // Unified Backend Area Reflection
  sectionMetadata?: SectionMetadata;
}

export interface CustomMeasurements {
  bust?: string;
  waist?: string;
  hips?: string;
  height?: string;
  notes?: string;
}

export interface CartItem {
  id: string; // unique item composite id: productId-color-size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  customMeasurements?: CustomMeasurements;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  gender: 'women' | 'men' | 'all';
  image: string;
  itemCount: number;
  tagline: string;
  description: string;
}

export interface FilterState {
  gender: string | null;
  category: string | null;
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  occasions: string[];
  fabrics: string[];
  sortBy: 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  description: string;
}

export interface CraftPillar {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  artisanRegion: string;
  technique: string;
}
