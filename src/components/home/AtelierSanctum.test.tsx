import {
  ROYAL_CLIENT_DIARIES,
  CRAFT_SANCTUM_PILLARS,
  SALON_LOCATIONS,
  ATELIER_EXPERIENCES,
} from '@/data/atelier';

describe('AtelierSanctum Component Architecture', () => {
  it('validates royal client diary entries have canonical Product models and verified locations', () => {
    expect(ROYAL_CLIENT_DIARIES.length).toBe(4);
    ROYAL_CLIENT_DIARIES.forEach((diary) => {
      expect(diary.clientName).toBeTruthy();
      expect(diary.weddingLocation).toBeTruthy();
      expect(diary.quote.length).toBeGreaterThan(20);
      expect(typeof diary.ensemble.price).toBe('number');
      expect(diary.ensemble.formattedPrice).toMatch(/^₹/);
    });
  });

  it('validates 3 karigari heritage pillars with authentic metrics', () => {
    expect(CRAFT_SANCTUM_PILLARS.length).toBe(3);
    const slugs = CRAFT_SANCTUM_PILLARS.map((p) => p.slug);
    expect(slugs).toContain('24k-gold-zari');
    expect(slugs).toContain('kashi-pitlooms');
    expect(slugs).toContain('awadhi-zardozi');
  });

  it('validates 4 flagship salon locations and time slots', () => {
    expect(SALON_LOCATIONS.length).toBe(4);
    SALON_LOCATIONS.forEach((salon) => {
      expect(salon.timeSlots.length).toBeGreaterThanOrEqual(3);
      expect(salon.city).toBeTruthy();
    });
  });

  it('validates bespoke atelier experiences', () => {
    expect(ATELIER_EXPERIENCES.length).toBe(4);
  });
});
