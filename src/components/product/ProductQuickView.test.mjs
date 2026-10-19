import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const QUICKVIEW_FILE = path.resolve('src/components/product/ProductQuickView.tsx');
const PRODUCTCARD_FILE = path.resolve('src/components/product/ProductCard.tsx');
const CARTDRAWER_FILE = path.resolve('src/components/layout/CartDrawer.tsx');
const QUICKVIEW_CONTEXT_FILE = path.resolve('src/context/QuickViewContext.tsx');

test('ProductQuickView Side Drawer & Motion Architecture Verification', async (t) => {
  await t.test('ProductQuickView file exists and uses Framer Motion drawer', () => {
    assert.ok(fs.existsSync(QUICKVIEW_FILE), 'ProductQuickView.tsx must exist');
    const content = fs.readFileSync(QUICKVIEW_FILE, 'utf8');

    // Drawer right slide-in positioning (anchored to right edge)
    assert.ok(content.includes('justify-end') || content.includes('right-0'), 'Must be right-anchored side drawer');
    assert.match(content, /AnimatePresence/, 'Must use AnimatePresence for exit animations');
    assert.match(content, /initial=\{\{\s*x:\s*'100%'\s*\}\}/, 'Must slide in from right (x: 100%)');
    assert.match(content, /exit=\{\{\s*x:\s*'100%'\s*\}\}/, 'Must slide out to right (exit x: 100%)');
  });

  await t.test('ProductQuickView coordinates smooth Add to Cart animation into Cart Drawer', () => {
    const content = fs.readFileSync(QUICKVIEW_FILE, 'utf8');

    // Add to cart with handoff
    assert.match(content, /handleAddToCart/, 'Must implement handleAddToCart');
    assert.match(content, /addToCart\(/, 'Must invoke addToCart from CartContext');
    assert.match(content, /setIsCartOpen\(true\)/, 'Must open Cart Drawer upon adding');
    assert.ok(content.includes('onClose()') || content.includes('handleClose()'), 'Must trigger Quick View exit transition');
  });

  await t.test('CartDrawer uses AnimatePresence with slide-in and slide-out motion', () => {
    assert.ok(fs.existsSync(CARTDRAWER_FILE), 'CartDrawer.tsx must exist');
    const content = fs.readFileSync(CARTDRAWER_FILE, 'utf8');

    assert.match(content, /AnimatePresence/, 'CartDrawer must use AnimatePresence');
    assert.match(content, /initial=\{\{\s*x:\s*'100%'\s*\}\}/, 'CartDrawer must slide in from right');
    assert.match(content, /exit=\{\{\s*x:\s*'100%'\s*\}\}/, 'CartDrawer must slide out on exit');
  });

  await t.test('ProductCard integrates luxury styling and QuickViewContext hook', () => {
    assert.ok(fs.existsSync(PRODUCTCARD_FILE), 'ProductCard.tsx must exist');
    const content = fs.readFileSync(PRODUCTCARD_FILE, 'utf8');

    assert.match(content, /useQuickView/, 'ProductCard must use useQuickView hook');
    assert.match(content, /openQuickView/, 'ProductCard must call openQuickView');
    assert.match(content, /formatINR/, 'ProductCard must use formatINR for standard pricing');
    assert.match(content, /opacity-0 group-hover:opacity-100/, 'ProductCard must crossfade or overlay on hover');
  });

  await t.test('QuickViewContext exists and provides global open/close state', () => {
    assert.ok(fs.existsSync(QUICKVIEW_CONTEXT_FILE), 'QuickViewContext.tsx must exist');
    const content = fs.readFileSync(QUICKVIEW_CONTEXT_FILE, 'utf8');

    assert.match(content, /QuickViewProvider/, 'QuickViewContext must export QuickViewProvider');
    assert.match(content, /useQuickView/, 'QuickViewContext must export useQuickView');
    assert.match(content, /openQuickView/, 'Must support openQuickView');
    assert.match(content, /closeQuickView/, 'Must support closeQuickView');
  });
});
