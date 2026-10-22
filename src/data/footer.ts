export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: 'instagram' | 'pinterest' | 'facebook' | 'twitter' | 'youtube';
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    scriptTag: string;
    monogram: string;
    description?: string;
  };
  columns: {
    shop: FooterColumn;
    explore: FooterColumn;
    support: FooterColumn;
  };
  newsletter: {
    eyebrow?: string;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
  legalLinks: FooterLink[];
  socialLinks: FooterSocialLink[];
  copyright: string;
}

export const FOOTER_DATA: FooterData = {
  brand: {
    name: 'DRIFT',
    tagline: 'Handwoven Silks · DRIFT by MONARCH',
    scriptTag: 'Draped for every royal celebration.',
    monogram: 'D',
    description: 'Preserving sacred handloom corridors and imperial Indian weaves across Varanasi, Kanchipuram, and Chanderi.',
  },
  columns: {
    shop: {
      id: 'shop',
      title: 'Shop',
      links: [
        { label: 'New arrivals', href: '/collections/new-arrivals' },
        { label: 'Silk sarees', href: '/collections/sarees' },
        { label: 'Bridal edit', href: '/collections/bridal' },
        { label: 'Best sellers', href: '/collections/best-sellers' },
      ],
    },
    explore: {
      id: 'explore',
      title: 'Explore',
      links: [
        { label: 'Our story', href: '/our-story' },
        { label: 'Craftsmanship', href: '/our-craft' },
        { label: 'Lookbook', href: '/collections/all' },
        { label: 'Stores', href: '/stores' },
      ],
    },
    support: {
      id: 'support',
      title: 'Support',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'Shipping & delivery', href: '/shipping' },
        { label: 'Returns & exchanges', href: '/returns' },
        { label: 'FAQs', href: '/faqs' },
      ],
    },
  },
  newsletter: {
    eyebrow: 'Royal Registry',
    title: 'Stay updated',
    description: 'Subscribe for private trunk shows, rare handwoven drops, and stories from the loom.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
    successMessage: 'Thank you for subscribing to DRIFT. Welcome to our royal registry.',
  },
  heroImage: {
    src: '/images/footer-banner-lake-palace.jpg',
    alt: 'Regal Indian women draped in handwoven silk sarees at a heritage palace courtyard',
  },
  legalLinks: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  socialLinks: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'X', href: 'https://x.com', icon: 'twitter' },
    { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  ],
  copyright: '© 2026 DRIFT by MONARCH. All rights reserved.',
};
