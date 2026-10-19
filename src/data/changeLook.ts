export interface LookColorOption {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface LookStyleItem {
  id: string;
  name: string;
  price: string;
  rawPrice: number;
  rating: string;
  reviewCount: number;
  categoryTag: string;
  subtitle: string;
  description: string;
  modelImage: string;
  thumbnail: string;
  colorName: string;
  colorHex: string;
  sizes: string[];
  colors: LookColorOption[];
  features: string[];
  audioTrack: {
    title: string;
    artist: string;
  };
}

export const CHANGE_LOOK_STYLES: LookStyleItem[] = [
  {
    id: 'look-ivory-organza',
    name: 'IVORY ORGANZA BLOOM',
    price: '₹ 18,400',
    rawPrice: 18400,
    rating: '4.9',
    reviewCount: 128,
    categoryTag: 'NEW ARRIVAL • COUTURE',
    subtitle: 'Pure Sheer Tissue Organza Saree',
    description:
      'Handcrafted with gossamer silk organza, delicate gold mukaish sprinkling, and scalloped hand-cut resham floral borders. Designed for modern royal evenings and intimate soirees.',
    modelImage: '/images/moods/pure_organza.jpg',
    thumbnail: '/images/moods/pure_organza.jpg',
    colorName: 'Ivory',
    colorHex: '#EFE9DF',
    sizes: ['34', '36', '38', '40', '42'],
    colors: [
      { id: 'ivory', name: 'Ivory', hex: '#EFE9DF', image: '/images/moods/pure_organza.jpg' },
      { id: 'rose', name: 'Blush Rose', hex: '#E2A9A9', image: '/images/moods/chanderi_heritage.jpg' },
      { id: 'crimson', name: 'Ruby Crimson', hex: '#8F1D2C', image: '/images/moods/kanjivaram_silk.jpg' },
    ],
    features: ['100% Silk Mark Certified', 'Handloom Pitloom Weave', 'Bespoke Blouse Tailoring', 'Insured Worldwide Express'],
    audioTrack: {
      title: 'Courtyard Raag Yaman',
      artist: 'Sitar & Tanpura Echoes',
    },
  },
  {
    id: 'look-rose-chanderi',
    name: 'GULABI ROSE CHANDERI',
    price: '₹ 21,500',
    rawPrice: 21500,
    rating: '4.8',
    reviewCount: 96,
    categoryTag: 'FESTIVE HEIRLOOM',
    subtitle: 'Gossamer Gold Weft Chanderi Silk',
    description:
      'Gossamer handloom Chanderi tissue in romantic blush pink, woven with certified gold electroplated zari and finished with delicate gota-patti scalloping.',
    modelImage: '/images/moods/chanderi_heritage.jpg',
    thumbnail: '/images/moods/chanderi_heritage.jpg',
    colorName: 'Blush Rose',
    colorHex: '#E2A9A9',
    sizes: ['34', '36', '38', '40', '42'],
    colors: [
      { id: 'ivory', name: 'Ivory', hex: '#EFE9DF', image: '/images/moods/pure_organza.jpg' },
      { id: 'rose', name: 'Blush Rose', hex: '#E2A9A9', image: '/images/moods/chanderi_heritage.jpg' },
      { id: 'crimson', name: 'Ruby Crimson', hex: '#8F1D2C', image: '/images/moods/kanjivaram_silk.jpg' },
    ],
    features: ['Authentic Chanderi GI Tag', 'Tested Silver Zari', 'Custom Fit Blouse Option', 'Doorstep Authenticity Guarantee'],
    audioTrack: {
      title: 'Noor-E-Awadh',
      artist: 'Classical Santoor Serenade',
    },
  },
  {
    id: 'look-crimson-kanjivaram',
    name: 'RUKMINI CRIMSON KANJIVARAM',
    price: '₹ 28,000',
    rawPrice: 28000,
    rating: '5.0',
    reviewCount: 144,
    categoryTag: 'BRIDAL MAJESTY',
    subtitle: 'Ancestral Temple Kadwa Silk',
    description:
      'Imperial crimson Kanjivaram silk saree with authentic ancestral pitloom temple borders, korvai interlocking weave, and dense 24K gold-dipped zari pallu.',
    modelImage: '/images/moods/kanjivaram_silk.jpg',
    thumbnail: '/images/moods/kanjivaram_silk.jpg',
    colorName: 'Ruby Crimson',
    colorHex: '#8F1D2C',
    sizes: ['34', '36', '38', '40', '42'],
    colors: [
      { id: 'ivory', name: 'Ivory', hex: '#EFE9DF', image: '/images/moods/pure_organza.jpg' },
      { id: 'rose', name: 'Blush Rose', hex: '#E2A9A9', image: '/images/moods/chanderi_heritage.jpg' },
      { id: 'crimson', name: 'Ruby Crimson', hex: '#8F1D2C', image: '/images/moods/kanjivaram_silk.jpg' },
    ],
    features: ['Certified Pure Silk Guild', '24K Gold Electroplated Zari', 'Ancestral Korvai Weaving', 'Signature Red Bridal Keepsake'],
    audioTrack: {
      title: 'Kashi Mangalam',
      artist: 'Shehnai & Temple Bell Hymns',
    },
  },
];
