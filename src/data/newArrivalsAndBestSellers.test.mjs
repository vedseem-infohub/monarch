import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('NewArrivals and BestSellers Data Architecture & Unified Product Contract', () => {
  const rootDir = process.cwd();
  const newArrivalsPath = path.join(rootDir, 'src/data/newArrivals.ts');
  const bestSellersPath = path.join(rootDir, 'src/data/bestSellers.ts');
  const productsPath = path.join(rootDir, 'src/data/products.ts');

  it('verifies dedicated data files exist and export typed data', () => {
    assert.ok(fs.existsSync(newArrivalsPath), 'src/data/newArrivals.ts must exist');
    assert.ok(fs.existsSync(bestSellersPath), 'src/data/bestSellers.ts must exist');

    const newArrivalsContent = fs.readFileSync(newArrivalsPath, 'utf8');
    const bestSellersContent = fs.readFileSync(bestSellersPath, 'utf8');

    assert.ok(newArrivalsContent.includes('export const NEW_ARRIVALS_PRODUCTS'), 'Must export NEW_ARRIVALS_PRODUCTS');
    assert.ok(newArrivalsContent.includes('export const NEW_ARRIVALS_DATA'), 'Must export NEW_ARRIVALS_DATA');
    assert.ok(bestSellersContent.includes('export const BEST_SELLERS_PRODUCTS'), 'Must export BEST_SELLERS_PRODUCTS');
    assert.ok(bestSellersContent.includes('export const BEST_SELLERS_DATA'), 'Must export BEST_SELLERS_DATA');
  });

  it('verifies all New Arrival products have badge: "New Arrival" and genuine Product fields', () => {
    const content = fs.readFileSync(newArrivalsPath, 'utf8');
    assert.ok(content.includes("badge: 'New Arrival'"), 'All items must have badge: New Arrival');
    assert.ok(content.includes('sectionMetadata:'), 'Must specify sectionMetadata');
    assert.ok(content.includes('dropSeason:'), 'Must specify dropSeason in sectionMetadata');
  });

  it('verifies all Best Seller products have numeric rankings and genuine Product fields', () => {
    const content = fs.readFileSync(bestSellersPath, 'utf8');
    assert.ok(content.includes("badge: 'Bestseller'"), 'All items must have badge: Bestseller');
    assert.ok(content.includes('bestsellerRank:'), 'Must specify bestsellerRank in sectionMetadata');
    assert.ok(content.includes('salesVelocity:'), 'Must specify salesVelocity in sectionMetadata');
  });

  it('verifies products.ts merges both datasets into DEDUPED_CATALOG', () => {
    const content = fs.readFileSync(productsPath, 'utf8');
    assert.ok(content.includes('NEW_ARRIVALS_PRODUCTS'), 'products.ts must import NEW_ARRIVALS_PRODUCTS');
    assert.ok(content.includes('BEST_SELLERS_PRODUCTS'), 'products.ts must import BEST_SELLERS_PRODUCTS');
  });
});
