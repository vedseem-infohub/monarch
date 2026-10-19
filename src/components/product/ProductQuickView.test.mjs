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

  await t.test('ProductQuickView implements scroll fix and light luxury color palette', () => {
    const content = fs.readFileSync(QUICKVIEW_FILE, 'utf8');

    // Scroll protection: prevents Lenis from hijacking the background window
    assert.match(content, /data-lenis-prevent/, 'Must declare data-lenis-prevent on drawer container');
    assert.match(content, /overscroll-contain/, 'Must contain overscroll within the drawer');
    assert.match(content, /min-h-0/, 'Must have min-h-0 for flex column scrolling');
    assert.match(content, /pauseScroll/, 'Must pause Lenis window scroll when modal is active');

    // Light luxury color scheme
    assert.match(content, /bg-\[#FAF7F2\]/, 'Drawer panel must use warm light ivory background');
    assert.match(content, /text-monarch-charcoal/, 'Text must be dark/charcoal on light background');
    assert.match(content, /text-monarch-maroon/, 'Price must be royal maroon on light theme');
  });

  await t.test('ProductQuickView implements Flipkart/Amazon style big photo changer and hover zoom', () => {
    const content = fs.readFileSync(QUICKVIEW_FILE, 'utf8');

    // Big Photo navigation arrows (Flipkart/Amazon style)
    assert.match(content, /handlePrevImage/, 'Must implement handlePrevImage');
    assert.match(content, /handleNextImage/, 'Must implement handleNextImage');
    assert.match(content, /ChevronLeft/, 'Must render ChevronLeft navigation button');
    assert.match(content, /ChevronRight/, 'Must render ChevronRight navigation button');

    // Interactive cursor-tracking zoom (Flipkart/Amazon style)
    assert.match(content, /zoomPosition/, 'Must track zoom position');
    assert.match(content, /handleMouseMove/, 'Must track mouse movement for pan/zoom');

    // Clean seamless layout: no divide-y hr dividing the gallery
    assert.ok(!content.includes('divide-y divide-monarch-gold/20'), 'Must remove divide-y hr border under gallery');
  });

  await t.test('ProductQuickView and ProductCard implement click-only selection and increased padding', () => {
    const quickViewContent = fs.readFileSync(QUICKVIEW_FILE, 'utf8');
    const productCardContent = fs.readFileSync(PRODUCTCARD_FILE, 'utf8');

    // QuickView click selection handlers (no onmouse selection)
    assert.match(quickViewContent, /handleThumbnailClick/, 'QuickView must support thumbnail click handler');
    assert.match(quickViewContent, /handleColorClick/, 'QuickView must support color swatch click handler');
    assert.match(quickViewContent, /handleSizeClick/, 'QuickView must support size click handler');
    assert.match(quickViewContent, /onClick=\{\(\) => handleThumbnailClick\(idx\)\}/, 'Thumbnails must change photo on click');
    assert.match(quickViewContent, /onClick=\{\(\) => handleColorClick/, 'Color swatches must change color on click');
    assert.match(quickViewContent, /onClick=\{\(\) => handleSizeClick\(size\)\}/, 'Size buttons must select size on click');
    assert.ok(!quickViewContent.includes('onMouseEnter={() => handleThumbnailHover'), 'Must not use onmouse hover for thumbnail selection');
    assert.ok(!quickViewContent.includes('onMouseEnter={() => handleColorHover'), 'Must not use onmouse hover for color selection');
    assert.ok(!quickViewContent.includes('onMouseEnter={() => handleSizeHover'), 'Must not use onmouse hover for size selection');

    // QuickView padding & ring-offset preventing border hiding
    assert.match(quickViewContent, /ring-offset-2 ring-offset-\[#FAF7F2\]/, 'Active thumbnail and swatch must have ring offset so border is never hidden');
    assert.match(quickViewContent, /py-3\.5 px-4/, 'Thumbnails container must have generous padding to prevent border clipping');

    // ProductCard click selection & hover image
    assert.match(productCardContent, /hoverImg/, 'ProductCard must calculate alternate hover image');
    assert.match(productCardContent, /opacity-0 group-hover:opacity-100/, 'ProductCard must crossfade to alternate image on hover');
    assert.match(productCardContent, /setSelectedColorIdx/, 'ProductCard color swatches must update on click');
    assert.ok(!productCardContent.includes('onMouseEnter={() => setSelectedColorIdx'), 'Must not use onmouse hover for card swatch selection');
  });
});
