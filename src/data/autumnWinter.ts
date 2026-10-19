export interface ArchedCampaignItem {
  id: string;
  title: string;
  subtitle: string;
  saree: string;
  tag: string;
  image: string;
  href: string;
}

export interface AutumnWinterData {
  tag: string;
  headingLine1: string;
  headingLine2: string;
  headingYear: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  campaigns: ArchedCampaignItem[];
}

export const AUTUMN_WINTER_DATA: AutumnWinterData = {
  tag: 'SEASON FORECAST',
  headingLine1: 'Autumn–',
  headingLine2: 'Winter',
  headingYear: '2026',
  description:
    'From ancestral Varanasi pitlooms to royal darbars, a couture forecast celebrating timeless silhouettes, gossamer silk tissues, and heirloom zari wefts.',
  ctaText: 'EXPLORE 2026 FORECAST',
  ctaHref: '/collections/all',
  campaigns: [
    {
      id: 'aw-01',
      title: 'Awadhi Darbar Couture',
      subtitle: 'Pure Katan Silk Kadwa',
      saree: 'Royal Crimson & Sapphire Weave',
      tag: 'Heritage Festive',
      image: '/images/panoramic/ensemble_utsav.jpg',
      href: '/collections/all',
    },
    {
      id: 'aw-02',
      title: 'Courtyard Baithak',
      subtitle: 'Ancestral Paithani Weft',
      saree: 'Certified Pure Silk Mark Guild',
      tag: 'Royal Gathering',
      image: '/images/panoramic/ensemble_vara.jpg',
      href: '/collections/all',
    },
    {
      id: 'aw-03',
      title: 'Kashi Imperial Silk',
      subtitle: '24K Electroplated Gold Zari',
      saree: 'Hand-Stretched 3D Dabka Border',
      tag: 'Couture Heirloom',
      image: '/images/panoramic/ensemble_kalyani.jpg',
      href: '/collections/all',
    },
  ],
};
