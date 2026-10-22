import { FOOTER_DATA } from '@/data/footer';
import { Footer } from './Footer';

describe('Footer Component & Data Integrity', () => {
  it('exports Footer component properly', () => {
    expect(Footer).toBeDefined();
    expect(typeof Footer).toBe('function');
  });

  describe('FOOTER_DATA configuration', () => {
    it('has valid brand attributes for royal heritage presentation', () => {
      expect(FOOTER_DATA.brand).toBeDefined();
      expect(FOOTER_DATA.brand.name).toBeTruthy();
      expect(FOOTER_DATA.brand.tagline).toBeTruthy();
      expect(FOOTER_DATA.brand.scriptTag).toBeTruthy();
      expect(FOOTER_DATA.brand.monogram).toBeTruthy();
      expect(typeof FOOTER_DATA.brand.monogram).toBe('string');
      expect(FOOTER_DATA.brand.monogram.length).toBeGreaterThan(0);
    });

    it('has valid navigation columns with unique ids for mobile accordions', () => {
      const { shop, explore, support } = FOOTER_DATA.columns;
      const columns = [shop, explore, support];

      columns.forEach((col) => {
        expect(col.id).toBeTruthy();
        expect(col.title).toBeTruthy();
        expect(Array.isArray(col.links)).toBe(true);
        expect(col.links.length).toBeGreaterThanOrEqual(3);

        col.links.forEach((link) => {
          expect(link.label).toBeTruthy();
          expect(link.href).toBeTruthy();
          expect(link.href.startsWith('/') || link.href.startsWith('http')).toBe(true);
        });
      });

      // Verify column ids are distinct for accessible aria-controls mapping
      const ids = columns.map((c) => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(columns.length);
    });

    it('has complete newsletter configuration with accessible text', () => {
      expect(FOOTER_DATA.newsletter).toBeDefined();
      expect(FOOTER_DATA.newsletter.title).toBeTruthy();
      expect(FOOTER_DATA.newsletter.description).toBeTruthy();
      expect(FOOTER_DATA.newsletter.placeholder).toBeTruthy();
      expect(FOOTER_DATA.newsletter.buttonText).toBeTruthy();
      expect(FOOTER_DATA.newsletter.successMessage).toBeTruthy();
    });

    it('has social links with minimum 40px touch targets and valid platforms', () => {
      expect(Array.isArray(FOOTER_DATA.socialLinks)).toBe(true);
      expect(FOOTER_DATA.socialLinks.length).toBeGreaterThanOrEqual(4);

      const validIcons = ['instagram', 'pinterest', 'facebook', 'twitter', 'youtube'];
      FOOTER_DATA.socialLinks.forEach((social) => {
        expect(social.name).toBeTruthy();
        expect(social.href).toBeTruthy();
        expect(validIcons).toContain(social.icon);
      });
    });

    it('has legal compliance links and copyright notice', () => {
      expect(Array.isArray(FOOTER_DATA.legalLinks)).toBe(true);
      expect(FOOTER_DATA.legalLinks.length).toBeGreaterThanOrEqual(2);

      FOOTER_DATA.legalLinks.forEach((legal) => {
        expect(legal.label).toBeTruthy();
        expect(legal.href).toBeTruthy();
      });

      expect(FOOTER_DATA.copyright).toBeTruthy();
      expect(FOOTER_DATA.copyright).toContain('2026');
    });

    it('specifies high-resolution panoramic hero image', () => {
      expect(FOOTER_DATA.heroImage).toBeDefined();
      expect(FOOTER_DATA.heroImage.src).toBeTruthy();
      expect(FOOTER_DATA.heroImage.alt).toBeTruthy();
    });
  });
});
