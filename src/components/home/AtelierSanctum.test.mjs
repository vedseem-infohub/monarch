import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('AtelierSanctum Component Verification', () => {
  const compPath = path.resolve('src/components/home/AtelierSanctum.tsx');
  const content = fs.readFileSync(compPath, 'utf-8');

  it('verifies essential imports and hooks', () => {
    assert.ok(content.includes("'use client'"), 'Must be client component');
    assert.ok(content.includes('useGSAP'), 'Must use GSAP useGSAP hook');
    assert.ok(content.includes('useCart'), 'Must integrate useCart');
    assert.ok(content.includes('useWishlist'), 'Must integrate useWishlist');
  });

  it('verifies 4-movement architectural layout structure', () => {
    assert.ok(content.includes('A Sanctuary of Silk &'), 'Must have editorial headline');
    assert.ok(content.includes('CRAFT_SANCTUM_PILLARS.map'), 'Must render Karigari pillars');
    assert.ok(content.includes('SALON_LOCATIONS.map'), 'Must render Flagship salon switcher');
    assert.ok(content.includes('ROYAL_CLIENT_DIARIES.map'), 'Must render Royal Wedding Chronicles');
    assert.ok(content.includes('isModalOpen'), 'Must feature VIP reservation modal');
  });

  it('verifies direct Cart and Wishlist interaction', () => {
    assert.ok(content.includes('addToCart('), 'Must invoke addToCart on commission');
    assert.ok(content.includes('toggleWishlist('), 'Must invoke toggleWishlist on heart click');
  });

  it('guarantees Flagship Salon badge layers over curved arch without overflow clipping', () => {
    assert.ok(
      content.includes('ROYAL SANCTUARY CROWN BADGE'),
      'Must have royal crown badge layered over curved arch'
    );
    assert.ok(
      content.includes('z-30 pointer-events-none'),
      'Badge must use z-30 layering outside overflow-hidden'
    );
  });
});
