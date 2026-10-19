import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('Header & Modal Menus Glossy Architecture Verification', async (t) => {
  const headerPath = path.resolve(process.cwd(), 'src/components/layout/Header.tsx');
  const megaMenuPath = path.resolve(process.cwd(), 'src/components/layout/MegaMenu.tsx');
  const searchOverlayPath = path.resolve(process.cwd(), 'src/components/layout/SearchOverlay.tsx');

  const headerContent = fs.readFileSync(headerPath, 'utf-8');
  const megaMenuContent = fs.readFileSync(megaMenuPath, 'utf-8');
  const searchOverlayContent = fs.readFileSync(searchOverlayPath, 'utf-8');

  await t.test('verifies Haute Couture Heritage text has enhanced visibility and contrast', () => {
    assert.ok(
      headerContent.includes('Haute Couture Heritage'),
      'Header must contain Haute Couture Heritage brand tagline'
    );
    assert.ok(
      headerContent.includes('text-monarch-gold-light'),
      'Haute Couture Heritage must use luminous text-monarch-gold-light for high visibility'
    );
    assert.ok(
      headerContent.includes('[text-shadow:_0_1px_5px_rgba(0,0,0,0.95)]'),
      'Haute Couture Heritage must feature crisp text-shadow so it is perfectly readable against white blur gradient'
    );
  });

  await t.test('verifies Header uses increased blur, dark gradient, decreasing blur from bottom, and zero border in both starting and scrolled states', () => {
    assert.ok(
      headerContent.includes('const isGlossy = !isScrolled;'),
      'Header must determine isGlossy state from scroll position'
    );
    assert.ok(
      headerContent.includes('from-black/'),
      'Header must use dark gradient for starting state'
    );
    assert.ok(
      headerContent.includes('backdrop-blur-md'),
      'Header must feature frosted blur (backdrop-blur-md)'
    );
    assert.ok(
      headerContent.includes('mask-image:linear-gradient(to_bottom'),
      'Header must decrease blur from bottom via mask-image linear gradient'
    );
    // Ensure header has border-none in both states so no border line shows on scroll
    assert.ok(
      headerContent.includes('border-none text-monarch-ivory py-4'),
      'Starting header must have border-none'
    );
    assert.ok(
      headerContent.includes('border-none shadow-xl'),
      'Scrolled header must have border-none with smooth shadow-xl instead of hard border line'
    );
    // Ensure no border-b is used on the header
    assert.ok(
      !headerContent.includes('border-b border-monarch-gold/30 shadow-lg text-monarch-ivory py-3.5'),
      'Hard border-b must not appear when scrolled'
    );
  });

  await t.test('verifies Header passes isGlossy to MegaMenu and SearchOverlay without borders', () => {
    assert.ok(
      headerContent.includes('<MegaMenu') && headerContent.includes('isGlossy={isGlossy}'),
      'Header must pass isGlossy to MegaMenu'
    );
    assert.ok(
      headerContent.includes('<SearchOverlay') && headerContent.includes('isGlossy={isGlossy}'),
      'Header must pass isGlossy to SearchOverlay'
    );
    assert.ok(
      headerContent.includes('border-none'),
      'Mobile drawer must have no border when isGlossy is true'
    );
  });

  await t.test('verifies MegaMenu uses dark blur gradient with frosted blur and no border in either state', () => {
    assert.ok(
      megaMenuContent.includes('isGlossy?: boolean'),
      'MegaMenuProps must declare optional isGlossy prop'
    );
    assert.ok(
      megaMenuContent.includes('from-black/') && megaMenuContent.includes('border-none'),
      'MegaMenu must use dark blur gradient and no border when isGlossy is true'
    );
    assert.ok(
      megaMenuContent.includes('backdrop-blur-xl'),
      'MegaMenu must feature luxury frosted blur (backdrop-blur-xl) when isGlossy is true'
    );
    assert.ok(
      !megaMenuContent.includes('border-b border-monarch-gold/30 shadow-2xl'),
      'MegaMenu must not show border-b when scrolled'
    );
    assert.ok(
      megaMenuContent.includes('[text-shadow:_0_1px_4px_rgba(0,0,0,0.85)]'),
      'MegaMenu titles must feature text-shadow for high visibility'
    );
  });

  await t.test('verifies Header synchronizes gradient seamlessly when MegaMenu is open', () => {
    assert.ok(
      headerContent.includes('isMenuOpen'),
      'Header must detect isMenuOpen state from activeMenu'
    );
    assert.ok(
      headerContent.includes('from-black/95 via-black/92 to-black/90'),
      'Header must adapt gradient to fuse continuously with MegaMenu when open'
    );
  });

  await t.test('verifies SearchOverlay matches when header is glossy', () => {
    assert.ok(
      searchOverlayContent.includes('isGlossy?: boolean'),
      'SearchOverlayProps must declare optional isGlossy prop'
    );
    assert.ok(
      searchOverlayContent.includes('backdrop-blur-md'),
      'SearchOverlay must feature increased blur (backdrop-blur-md)'
    );
  });
});
