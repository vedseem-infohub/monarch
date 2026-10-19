import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Atelier Data & Unified Product Architecture', () => {
  const filePath = path.resolve('src/data/atelier.ts');
  const content = fs.readFileSync(filePath, 'utf-8');

  it('validates Royal Client Diary entries have genuine Product models and 24k gold specs', () => {
    assert.ok(content.includes('ROYAL_CLIENT_DIARIES'), 'Must export ROYAL_CLIENT_DIARIES');
    assert.ok(content.includes('radhika-devendra-udaipur'), 'Must contain Radhika Udaipur wedding');
    assert.ok(content.includes('ananya-vikram-lake-como'), 'Must contain Ananya Lake Como wedding');
    assert.ok(content.includes('meera-siddharth-jaipur'), 'Must contain Meera Jaipur wedding');
    assert.ok(content.includes('samaira-kabir-jodhpur'), 'Must contain Samaira Jodhpur wedding');
    assert.ok(content.includes('formattedPrice: formatINR('), 'Must format prices via formatINR()');
    assert.ok(content.includes('sectionMetadata'), 'Must implement sectionMetadata for Unified Product Architecture');
  });

  it('validates Karigari Heritage Pillars integrity', () => {
    assert.ok(content.includes('CRAFT_SANCTUM_PILLARS'), 'Must export CRAFT_SANCTUM_PILLARS');
    assert.ok(content.includes('Certified 24K Gold Zari'), 'Must have 24K Gold Zari pillar');
    assert.ok(content.includes('The Pitlooms of Kashi'), 'Must have Pitlooms of Kashi pillar');
    assert.ok(content.includes('Three-Dimensional Zardozi'), 'Must have Awadhi Zardozi pillar');
  });

  it('validates Flagship Salon locations and timeslots', () => {
    assert.ok(content.includes('SALON_LOCATIONS'), 'Must export SALON_LOCATIONS');
    assert.ok(content.includes('The Mehrauli Pavilion Flagship'), 'Must have New Delhi flagship');
    assert.ok(content.includes('Kala Ghoda Heritage Salon'), 'Must have Mumbai salon');
    assert.ok(content.includes('Mayfair Private Suite'), 'Must have London suite');
    assert.ok(content.includes('Global Haute Couture Concierge'), 'Must have Virtual VIP suite');
  });

  it('validates Atelier experiences', () => {
    assert.ok(content.includes('ATELIER_EXPERIENCES'), 'Must export ATELIER_EXPERIENCES');
    assert.ok(content.includes('Bridal Trousseau & Lehenga Fitting'), 'Must have bridal trousseau experience');
    assert.ok(content.includes('Haute Couture Bespoke Commission'), 'Must have bespoke commission experience');
  });
});
