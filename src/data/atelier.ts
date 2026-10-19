import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

export interface ClientDiaryEntry {
  id: string;
  slug: string;
  clientName: string;
  weddingLocation: string;
  weddingDate: string;
  headline: string;
  quote: string;
  rating: number;
  portraitImage: string;
  ensemble: Product & { formattedPrice: string };
}

export interface CraftSanctumPillar {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  statMetric: string;
  statLabel: string;
  macroImage: string;
  badge: string;
}

export interface SalonLocation {
  slug: string;
  city: string;
  name: string;
  address: string;
  country: string;
  phone: string;
  email: string;
  timeSlots: string[];
  badge?: string;
}

export interface AtelierExperience {
  id: string;
  title: string;
  tagline: string;
  recommendedDuration: string;
}

// =========================================================================
// 1. CRAFTSMANSHIP SANCTUM PILLARS (AUTHENTICITY & PRECIOUS METALS)
// =========================================================================
export const CRAFT_SANCTUM_PILLARS: CraftSanctumPillar[] = [
  {
    id: 'pillar-gold-zari',
    slug: '24k-gold-zari',
    title: 'Certified 24K Gold Zari',
    subtitle: 'Hallmarked Precious Metal Wefts',
    description:
      'Pure silver bullion electroplated with 24-karat gold, hand-spun around silk threads that never oxidize or lose their imperial luster across generations.',
    statMetric: '100%',
    statLabel: 'Hallmarked Real Gold & Silver',
    macroImage: '/images/moods/banarasi_brocade.jpg',
    badge: 'Precious Metallurgy',
  },
  {
    id: 'pillar-kashi-looms',
    slug: 'kashi-pitlooms',
    title: 'The Pitlooms of Kashi',
    subtitle: '600-Year Ancient Weaving Lineage',
    description:
      'Subterranean wooden pit looms anchored in holy Ganges soil, where climate and ambient humidity preserve the delicate tension of pure mulberry silk.',
    statMetric: '400+',
    statLabel: 'Continuous Artisan Hours Per Drape',
    macroImage: '/images/moods/chanderi_heritage.jpg',
    badge: 'Archival Provenance',
  },
  {
    id: 'pillar-awadhi-zardozi',
    slug: 'awadhi-zardozi',
    title: 'Three-Dimensional Zardozi',
    subtitle: 'Palace Karchob Needlework',
    description:
      'Raised metallic bullion wire hand-couched with micro pota pearls, dabka coils, and nakshi leaves creating three-dimensional regal relief shadows.',
    statMetric: '60+',
    statLabel: 'Artisans In Royal Atelier Guild',
    macroImage: '/images/moods/paithani_heirloom.jpg',
    badge: 'Haute Relief',
  },
];

// =========================================================================
// 2. VERIFIED ROYAL CLIENT DIARIES (BRIDAL SOCIAL PROOF & PRODUCT RELATIONS)
// =========================================================================
export const ROYAL_CLIENT_DIARIES: ClientDiaryEntry[] = [
  {
    id: 'diary-01',
    slug: 'radhika-devendra-udaipur',
    clientName: 'Radhika & Devendra',
    weddingLocation: 'The City Palace, Udaipur',
    weddingDate: 'February 2026',
    headline: 'Poetry Woven in Silver and Moonlight',
    quote:
      'Standing under the palace arches in 24k gold woven Banarasi felt like wearing centuries of royal heritage. The drape was effortless poetry, capturing the starlight on Lake Pichola.',
    rating: 5.0,
    portraitImage: '/images/panoramic/ensemble_vara.jpg',
    ensemble: {
      id: 'p-diary-01',
      name: 'Gulnaar Imperial Zardozi Lehenga',
      slug: 'gulnaar-imperial-zardozi-lehenga',
      tagline: 'Crimson Velvet & Hand-Couched 24K Real Gold Zari',
      description: 'An archival lehenga crafted in pure royal velvet with 420 hours of authentic dabka and pota pearl relief.',
      category: 'bridal-lehengas',
      categoryName: 'Bridal Lehengas',
      gender: 'women',
      price: 285000,
      formattedPrice: formatINR(285000),
      images: ['/images/panoramic/ensemble_vara.jpg'],
      colors: [{ name: 'Royal Crimson', hex: '#5A1725', imageIndex: 0 }],
      sizes: ['Custom Bespoke'],
      fabric: 'Royal Micro-Velvet & Tissue Organza',
      embroidery: 'Handcrafted Zardozi & 24K Gold Dabka',
      occasion: ['Bridal', 'Royal Wedding'],
      careInstructions: ['Dry Clean Only by specialist'],
      craftsmanshipStory: 'Hand-stretched on royal karchob frames over 420 artisan hours.',
      has3D: false,
      deliveryDays: 21,
      inStock: true,
      rating: 5.0,
      reviewsCount: 42,
      sectionMetadata: {
        craftTechnique: 'Awadhi Karchob & 24K Zari',
        heritageTag: 'Royal Commission',
      },
    },
  },
  {
    id: 'diary-02',
    slug: 'ananya-vikram-lake-como',
    clientName: 'Ananya & Vikram',
    weddingLocation: 'Villa Balbiano, Lake Como',
    weddingDate: 'June 2026',
    headline: 'An Italian Sunset in Kashi Brocade',
    quote:
      'We wanted a bridal ensemble that held the grandeur of our Indian heritage yet felt light and luminous against Lake Como. The bespoke tissue drape moved with the evening breeze.',
    rating: 5.0,
    portraitImage: '/images/panoramic/ensemble_kalyani.jpg',
    ensemble: {
      id: 'p-diary-02',
      name: 'Noor-e-Kashi Metallic Tissue Saree',
      slug: 'noor-e-kashi-metallic-tissue-saree',
      tagline: 'Liquid Gold Mulberry Tissue with Minakari Lotus Weft',
      description: 'Handwoven in the ancient river ateliers of Varanasi using gossamer-light metallic tissue threads.',
      category: 'banarasi-sarees',
      categoryName: 'Banarasi Sarees',
      gender: 'women',
      price: 195000,
      formattedPrice: formatINR(195000),
      images: ['/images/panoramic/ensemble_kalyani.jpg'],
      colors: [{ name: 'Liquid Champagne', hex: '#E6D7B8', imageIndex: 0 }],
      sizes: ['Standard 5.5m + Blouse'],
      fabric: 'Pure Handloom Metallic Silk Tissue',
      embroidery: 'Varanasi Minakari Resham Border',
      occasion: ['Wedding Reception', 'Sangeet'],
      careInstructions: ['Preserve in cotton muslin'],
      craftsmanshipStory: 'Woven on subterranean wooden pit looms along the sacred Ganges riverbanks.',
      has3D: false,
      deliveryDays: 14,
      inStock: true,
      rating: 4.98,
      reviewsCount: 36,
      sectionMetadata: {
        craftTechnique: 'Kashi Pitloom Weave',
        heritageTag: 'Trousseau Heirloom',
      },
    },
  },
  {
    id: 'diary-03',
    slug: 'meera-siddharth-jaipur',
    clientName: 'Meera & Siddharth',
    weddingLocation: 'Rambagh Palace, Jaipur',
    weddingDate: 'December 2025',
    headline: 'The Grandeur of Rajputana Splendor',
    quote:
      'The MONARCH atelier team flew down to Jaipur for the final fitting. The attention to the drape symmetry and the weight distribution of the real silver zari was incomparable.',
    rating: 5.0,
    portraitImage: '/images/panoramic/ensemble_utsav.jpg',
    ensemble: {
      id: 'p-diary-03',
      name: 'Rajputana Kesari Vermilion Ensemble',
      slug: 'rajputana-kesari-vermilion-ensemble',
      tagline: 'Heavy Gota Patti on Hand-Dyed Bandhani Silk',
      description: 'A royal bridal ensemble celebrating Rajput court craftsmanship with genuine beaten silver gota wire.',
      category: 'bridal-lehengas',
      categoryName: 'Bridal Lehengas',
      gender: 'women',
      price: 340000,
      formattedPrice: formatINR(340000),
      images: ['/images/panoramic/ensemble_utsav.jpg'],
      colors: [{ name: 'Imperial Vermilion', hex: '#B22222', imageIndex: 0 }],
      sizes: ['Custom Bespoke'],
      fabric: 'Bandhani Georgette & Raw Silk',
      embroidery: 'Authentic Beaten Silver Gota Patti',
      occasion: ['Pheras', 'Royal Wedding'],
      careInstructions: ['Preserve in archival cedar chest'],
      craftsmanshipStory: 'Hand-dyed in authentic Marwari bandhej and hand-edged with silver wire.',
      has3D: false,
      deliveryDays: 28,
      inStock: true,
      rating: 5.0,
      reviewsCount: 29,
      sectionMetadata: {
        craftTechnique: 'Jaipur Gota Needlework',
        heritageTag: 'Flagship Commission',
      },
    },
  },
  {
    id: 'diary-04',
    slug: 'samaira-kabir-jodhpur',
    clientName: 'Samaira & Kabir',
    weddingLocation: 'Umaid Bhawan Palace, Jodhpur',
    weddingDate: 'January 2026',
    headline: 'Starlight Embroidered Upon Ivory Silk',
    quote:
      'Our guests were mesmerized by the subtle iridescence of the ivory organza. It was regal without being ostentatious — the pure hallmark of heirloom luxury.',
    rating: 5.0,
    portraitImage: '/images/panoramic/ensemble_aarunya.jpg',
    ensemble: {
      id: 'p-diary-04',
      name: 'Chandramukhi Pearl Organza Saree',
      slug: 'chandramukhi-pearl-organza-saree',
      tagline: 'Hand-Sheared Sheer Silk with Seed Pearl Borders',
      description: 'A diaphanous ivory organza draped with micro pearl seed work and delicate French knot accents.',
      category: 'organza-sarees',
      categoryName: 'Organza Sarees',
      gender: 'women',
      price: 165000,
      formattedPrice: formatINR(165000),
      images: ['/images/panoramic/ensemble_aarunya.jpg'],
      colors: [{ name: 'Moonlit Pearl Ivory', hex: '#FDFBF7', imageIndex: 0 }],
      sizes: ['Standard 5.5m + Blouse'],
      fabric: 'Pure Mulberry Organza',
      embroidery: 'Basra Seed Pearls & Silver Wire',
      occasion: ['Cocktail', 'Royal Reception'],
      careInstructions: ['Store rolled, never folded'],
      craftsmanshipStory: 'Gossamer handloom organza with micro seed pearl hand-embroidery.',
      has3D: false,
      deliveryDays: 14,
      inStock: true,
      rating: 4.95,
      reviewsCount: 24,
      sectionMetadata: {
        craftTechnique: 'Seed Pearl Couching',
        heritageTag: 'Contemporary Haute',
      },
    },
  },
];

// =========================================================================
// 3. FLAGSHIP SALONS & PRIVATE SUITE LOCATIONS
// =========================================================================
export const SALON_LOCATIONS: SalonLocation[] = [
  {
    slug: 'new-delhi',
    city: 'New Delhi',
    name: 'The Mehrauli Pavilion Flagship',
    address: 'Ambawatta One, Kalka Das Marg, Mehrauli',
    country: 'India',
    phone: '+91 11 4982 7700',
    email: 'delhi.atelier@monarch-couture.com',
    badge: 'Global Flagship',
    timeSlots: ['11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:30 PM - 06:30 PM', '07:00 PM - 09:00 PM'],
  },
  {
    slug: 'mumbai',
    city: 'Mumbai',
    name: 'Kala Ghoda Heritage Salon',
    address: 'Forbes Street, Ropewalk Lane, Fort',
    country: 'India',
    phone: '+91 22 6128 4400',
    email: 'mumbai.atelier@monarch-couture.com',
    badge: 'Artisan Suite',
    timeSlots: ['11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM', '04:30 PM - 06:30 PM'],
  },
  {
    slug: 'london',
    city: 'London',
    name: 'Mayfair Private Suite',
    address: 'Mount Street, Mayfair, London W1K 2RN',
    country: 'United Kingdom',
    phone: '+44 20 7946 0880',
    email: 'london.atelier@monarch-couture.com',
    badge: 'International Suite',
    timeSlots: ['10:30 AM - 12:30 PM', '01:30 PM - 03:30 PM', '04:00 PM - 06:00 PM'],
  },
  {
    slug: 'virtual',
    city: 'Virtual VIP',
    name: 'Global Haute Couture Concierge',
    address: 'High-Definition 1-on-1 Digital Salon Studio',
    country: 'Worldwide',
    phone: '+91 800 666 2724',
    email: 'vip.concierge@monarch-couture.com',
    badge: 'Global Digital',
    timeSlots: ['12:00 PM - 01:30 PM IST', '04:00 PM - 05:30 PM IST', '08:00 PM - 09:30 PM IST'],
  },
];

// =========================================================================
// 4. ATELIER EXPERIENCES
// =========================================================================
export const ATELIER_EXPERIENCES: AtelierExperience[] = [
  {
    id: 'bridal-trousseau',
    title: 'Bridal Trousseau & Lehenga Fitting',
    tagline: 'Private fitting room, champagne service, and custom drape consultation with a senior stylist.',
    recommendedDuration: '120 Mins',
  },
  {
    id: 'bespoke-couture',
    title: 'Haute Couture Bespoke Commission',
    tagline: 'Direct collaboration with master karigars to handcraft one-of-a-kind royal wedding heirlooms.',
    recommendedDuration: '90 Mins',
  },
  {
    id: 'heritage-sarees',
    title: 'Archival Sari Vault Selection',
    tagline: 'Private viewing of hallmarked 24k gold zari Banarasi, Paithani, and Kanjivaram specimens.',
    recommendedDuration: '60 Mins',
  },
  {
    id: 'virtual-vip',
    title: 'Virtual 1-on-1 Couture Styling',
    tagline: 'Ultra-high-definition video drape analysis, fabric swatch mailer, and international delivery planning.',
    recommendedDuration: '45 Mins',
  },
];
