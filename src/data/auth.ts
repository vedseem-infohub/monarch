export interface AuthSalonOption {
  id: string;
  name: string;
  city: string;
  location: string;
}

export interface PatronBenefit {
  id: string;
  title: string;
  description: string;
  iconName: 'sparkles' | 'crown' | 'shield' | 'package';
}

export interface AuthQuote {
  quote: string;
  author: string;
  title: string;
}

export const AUTH_SALONS: AuthSalonOption[] = [
  {
    id: 'delhi',
    name: 'The Darbar Hall Flagship',
    city: 'New Delhi',
    location: 'Mehrauli Heritage Corridor',
  },
  {
    id: 'mumbai',
    name: 'The Royal Pavilion Boutique',
    city: 'Mumbai',
    location: 'Colaba Waterfront',
  },
  {
    id: 'bengaluru',
    name: 'The Chanderi Sanctum',
    city: 'Bengaluru',
    location: 'Lavelle & MG Road',
  },
  {
    id: 'hyderabad',
    name: 'The Zari Courtyard',
    city: 'Hyderabad',
    location: 'Banjara Hills Avenue',
  },
  {
    id: 'kolkata',
    name: 'The Imperial Atelier',
    city: 'Kolkata',
    location: 'Park Street Historic Quarter',
  },
];

export const PATRON_BENEFITS: PatronBenefit[] = [
  {
    id: 'loom-access',
    title: 'Sacred Loom First Access',
    description: 'Private 48-hour preview of one-of-a-kind pure 24K zari heirloom weaves before public unveiling.',
    iconName: 'sparkles',
  },
  {
    id: 'bespoke-concierge',
    title: 'Dedicated Royal Couturier',
    description: 'Personal 1-on-1 consultations for bridal trousseaus, heirloom restorations, and blouse customizations.',
    iconName: 'crown',
  },
  {
    id: 'zari-certificate',
    title: 'Hallmarked Zari Vault Dossier',
    description: 'Digital blockchain and physical embossed certificate of authenticity for all silk and metal purity.',
    iconName: 'shield',
  },
  {
    id: 'sovereign-courier',
    title: 'White-Glove Sovereign Dispatch',
    description: 'Insured climate-controlled delivery in handcrafted wooden cedar trousseau trunks.',
    iconName: 'package',
  },
];

export const AUTH_QUOTES: AuthQuote[] = [
  {
    quote: 'In every thread of pure 24k gold zari resides three centuries of royal Indian craftsmanship.',
    author: 'Master Weaver Kashi',
    title: 'Head Artisan, Varanasi Royal Weaving Guild',
  },
  {
    quote: 'To drape MONARCH is to walk in harmony with the sovereign heritage of Awadh, Kashi, and the Deccan.',
    author: 'House of MONARCH',
    title: 'Archival Collection 2026',
  },
];

export const DEMO_PATRON = {
  name: 'Maharani Radhika Devi',
  email: 'radhika@monarch-client.com',
  password: 'MonarchRoyal2026!',
  phone: '+91 98200 12345',
  salonId: 'delhi',
  memberId: 'MONARCH-VIP-0042',
  status: 'Royal Sovereign Patron',
};

