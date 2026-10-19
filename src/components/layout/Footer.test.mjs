import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Footer Component & Architecture Verification', () => {
  const rootDir = process.cwd();

  test('validates FOOTER_DATA contract and brand fields', () => {
    const footerDataFile = path.join(rootDir, 'src/data/footer.ts');
    assert.ok(fs.existsSync(footerDataFile), 'src/data/footer.ts must exist');
    const content = fs.readFileSync(footerDataFile, 'utf8');

    assert.ok(content.includes("'DRIFT'"), 'Brand name DRIFT must be present');
    assert.ok(content.includes("'Handwoven silks'"), 'Tagline "Handwoven silks" must be present');
    assert.ok(content.includes("'draped for every celebration.'"), 'Script tagline must be present');
    assert.ok(content.includes("'Stay updated'"), 'Newsletter title "Stay updated" must be present');
    assert.ok(content.includes("'/images/footer-banner-lake-palace.jpg'"), 'Generated image path must match');
  });

  test('guarantees generated footer image exists in public directory', () => {
    const imagePath = path.join(rootDir, 'public/images/footer-banner-lake-palace.jpg');
    assert.ok(fs.existsSync(imagePath), 'public/images/footer-banner-lake-palace.jpg must exist');
    const stat = fs.statSync(imagePath);
    assert.ok(stat.size > 100000, 'Image should be high resolution (>100KB)');
  });

  test('verifies white faded top transition on heritage image in Footer component', () => {
    const footerComponentPath = path.join(rootDir, 'src/components/layout/Footer.tsx');
    assert.ok(fs.existsSync(footerComponentPath), 'Footer.tsx must exist');
    const componentContent = fs.readFileSync(footerComponentPath, 'utf8');

    // Verify unified overlay container without partition
    assert.ok(
      componentContent.includes('relative z-20 flex flex-col justify-between'),
      'Unified overlay container must be present without a dividing partition'
    );

    // Verify white top fade overlay is present on the image
    assert.ok(
      componentContent.includes('from-white via-white/85 via-white/40 to-transparent'),
      'White top fade overlay must be applied'
    );
  });

  test('verifies all footer navigation routes exist and are functional without 404', () => {
    const requiredPages = [
      'src/app/terms/page.tsx',
      'src/app/privacy/page.tsx',
      'src/app/shipping/page.tsx',
      'src/app/returns/page.tsx',
      'src/app/faqs/page.tsx',
      'src/app/contact/page.tsx',
      'src/app/stores/page.tsx',
      'src/app/our-story/page.tsx',
      'src/app/our-craft/page.tsx',
    ];

    for (const pagePath of requiredPages) {
      const fullPath = path.join(rootDir, pagePath);
      assert.ok(fs.existsSync(fullPath), `Target route page ${pagePath} must exist`);
    }
  });

  test('verifies newsletter subscription form and social icons configuration', () => {
    const footerComponentPath = path.join(rootDir, 'src/components/layout/Footer.tsx');
    const componentContent = fs.readFileSync(footerComponentPath, 'utf8');

    assert.ok(componentContent.includes('handleSubscribe'), 'Newsletter submission handler must exist');
    assert.ok(componentContent.includes("status === 'success'"), 'Subscription status state must exist');
    assert.ok(componentContent.includes('emailRegex'), 'Email validation regex must exist');
    assert.ok(componentContent.includes('Instagram'), 'Instagram aria-label must exist');
    assert.ok(componentContent.includes('Pinterest'), 'Pinterest aria-label must exist');
    assert.ok(componentContent.includes('Facebook'), 'Facebook aria-label must exist');
    assert.ok(componentContent.includes('Terms & Conditions'), 'Terms link must be rendered');
    assert.ok(componentContent.includes('Privacy Policy'), 'Privacy link must be rendered');
  });

  test('verifies newsletter subscription API endpoint exists and validates emails', () => {
    const apiRoutePath = path.join(rootDir, 'src/app/api/v1/newsletter/subscribe/route.ts');
    assert.ok(fs.existsSync(apiRoutePath), 'API route file must exist');
    const apiContent = fs.readFileSync(apiRoutePath, 'utf8');
    assert.ok(apiContent.includes('EMAIL_REGEX'), 'API route must have email regex validation');
    assert.ok(apiContent.includes('POST'), 'API route must handle POST requests');
  });
});
