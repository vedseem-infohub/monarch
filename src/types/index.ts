export interface ColorVariant {
  name: string;
  hex: string;
  imageIndex?: number;
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
  badge?: 'Bestseller' | 'New Arrival' | 'Heritage Masterpiece' | 'Royal Edit';
  inStock: boolean;
  rating: number;
  reviewsCount: number;
  featured?: boolean;
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
