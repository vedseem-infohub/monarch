import { Product } from '@/types';
import { PRODUCTS } from './products';

export interface BridalEnsemble {
  id: string;
  name: string;
  tagline: string;
  category: string;
  categoryName: string;
  craft: string;
  price: number;
  formattedPrice: string;
  image: string;
  href: string;
  product?: Product;
}

export const BRIDAL_ENSEMBLES: BridalEnsemble[] = [
  {
    id: 'monarch-011',
    name: 'Janki Courtyard Silk',
    tagline: 'Awadhi Karchob Flora',
    category: 'bridal-lehengas',
    categoryName: 'Courtyard Weave',
    craft: 'Hand-Stretched 3D Dabka',
    price: 260000,
    formattedPrice: '₹ 2,60,000',
    image: '/images/panoramic/ensemble_utsav.jpg',
    href: '/product/monarch-001',
    product: PRODUCTS.find((p) => p.id === 'monarch-001'),
  },
  {
    id: 'monarch-012',
    name: 'Tara Peacock Paithani',
    tagline: 'Ancestral Pitloom Weft',
    category: 'designer-sarees',
    categoryName: 'Heritage Paithani',
    craft: 'Certified Silk Mark Guild',
    price: 230000,
    formattedPrice: '₹ 2,30,000',
    image: '/images/panoramic/ensemble_vara.jpg',
    href: '/product/monarch-003',
    product: PRODUCTS.find((p) => p.id === 'monarch-003'),
  },
  {
    id: 'monarch-001',
    name: 'Rukmini Temple Silk',
    tagline: 'Authentic Kashi Kadwa',
    category: 'bridal-lehengas',
    categoryName: 'Temple Red Silk',
    craft: 'Ancestral Varanasi Pitloom',
    price: 285000,
    formattedPrice: '₹ 2,85,000',
    image: '/images/panoramic/ensemble_kalyani.jpg',
    href: '/product/monarch-001',
    product: PRODUCTS.find((p) => p.id === 'monarch-001'),
  },
  {
    id: 'monarch-003',
    name: 'Aarunya Emerald Kanjivaram',
    tagline: 'Pure Zari Weft',
    category: 'designer-sarees',
    categoryName: 'Royal Kanjivaram',
    craft: '24K Gold Electroplated Zari',
    price: 245000,
    formattedPrice: '₹ 2,45,000',
    image: '/images/panoramic/ensemble_aarunya.jpg',
    href: '/product/monarch-003',
    product: PRODUCTS.find((p) => p.id === 'monarch-003'),
  },
  {
    id: 'monarch-005',
    name: 'Saanjh Mystery Banarasi',
    tagline: 'Hand-Hammered Mukaish',
    category: 'anarkalis',
    categoryName: 'Awadhi Kadwa',
    craft: 'Pure Micro-Velvet & Gota',
    price: 215000,
    formattedPrice: '₹ 2,15,000',
    image: '/images/panoramic/ensemble_saanjh.jpg',
    href: '/product/monarch-005',
    product: PRODUCTS.find((p) => p.id === 'monarch-005'),
  },
  {
    id: 'monarch-007',
    name: 'Prerna Festive Tissue',
    tagline: 'Metallic Silk Weave',
    category: 'designer-sarees',
    categoryName: 'Rose Gold Tissue',
    craft: 'Rose-Gold Gossamer Weft',
    price: 195000,
    formattedPrice: '₹ 1,95,000',
    image: '/images/panoramic/ensemble_prerna.jpg',
    href: '/product/monarch-007',
    product: PRODUCTS.find((p) => p.id === 'monarch-007'),
  },
];
