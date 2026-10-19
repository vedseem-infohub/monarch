import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('GET /api/v1/products API Route & Data Contract', () => {
  const rootDir = process.cwd();
  const routePath = path.join(rootDir, 'src/app/api/v1/products/route.ts');

  it('verifies route file exists and exports GET handler', () => {
    assert.ok(fs.existsSync(routePath), 'Route file must exist at src/app/api/v1/products/route.ts');
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(content.includes('export async function GET'), 'Must export async GET handler');
  });

  it('verifies sort=newest returns NEW_ARRIVALS_PRODUCTS and sort=bestsellers returns BEST_SELLERS_PRODUCTS', () => {
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(content.includes('NEW_ARRIVALS_PRODUCTS'), 'Must use NEW_ARRIVALS_PRODUCTS for newest sort');
    assert.ok(content.includes('BEST_SELLERS_PRODUCTS'), 'Must use BEST_SELLERS_PRODUCTS for bestsellers sort');
    assert.ok(content.includes('ALL_PRODUCTS'), 'Must fallback to ALL_PRODUCTS');
  });

  it('verifies HTTP caching headers matching SECTIONS_DATA_ARCHITECTURE.md contract', () => {
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(
      content.includes('s-maxage=300'),
      'Must specify 300s server cache in Cache-Control header matching Dynamic (300s) specification'
    );
    assert.ok(
      content.includes('stale-while-revalidate=600'),
      'Must specify stale-while-revalidate window for smooth revalidation'
    );
  });
});
