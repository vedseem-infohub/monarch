import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const NEW_ARRIVALS_FILE = path.resolve('src/components/home/NewArrivals.tsx');
const BEST_SELLERS_FILE = path.resolve('src/components/home/BestSellers.tsx');

test('NewArrivals and BestSellers Architecture & GSAP Verification', async (t) => {
  await t.test('NewArrivals complies with Rule 2 using useGSAP and ProductCard', () => {
    assert.ok(fs.existsSync(NEW_ARRIVALS_FILE), 'NewArrivals.tsx must exist');
    const content = fs.readFileSync(NEW_ARRIVALS_FILE, 'utf8');

    assert.match(content, /useGSAP/, 'NewArrivals must use useGSAP hook');
    assert.match(content, /scope:\s*containerRef/, 'NewArrivals must scope useGSAP to containerRef');
    assert.match(content, /ProductCard/, 'NewArrivals must render ProductCard');
    assert.match(content, /handleScroll/, 'NewArrivals must support manual scroll navigation');
    assert.match(content, /NEW_ARRIVALS_DATA/, 'NewArrivals must import from dedicated newArrivals data file');
  });

  await t.test('BestSellers complies with Rule 2 using useGSAP and dynamic ranking badges', () => {
    assert.ok(fs.existsSync(BEST_SELLERS_FILE), 'BestSellers.tsx must exist');
    const content = fs.readFileSync(BEST_SELLERS_FILE, 'utf8');

    assert.match(content, /useGSAP/, 'BestSellers must use useGSAP hook');
    assert.match(content, /scope:\s*containerRef/, 'BestSellers must scope useGSAP to containerRef');
    assert.match(content, /ProductCard/, 'BestSellers must render ProductCard');
    assert.match(content, /#\$\{index \+ 1\} Best Seller/, 'BestSellers must dynamically assign ranking badge');
    assert.match(content, /handleScroll/, 'BestSellers must support manual scroll navigation');
    assert.match(content, /BEST_SELLERS_DATA/, 'BestSellers must import from dedicated bestSellers data file');
  });
});
