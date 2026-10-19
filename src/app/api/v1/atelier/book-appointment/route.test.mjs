import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('POST /api/v1/atelier/book-appointment API Route & Backend Contract', () => {
  const rootDir = process.cwd();
  const routePath = path.join(rootDir, 'src/app/api/v1/atelier/book-appointment/route.ts');

  it('verifies route file exists and exports POST handler', () => {
    assert.ok(fs.existsSync(routePath), 'Route file must exist at src/app/api/v1/atelier/book-appointment/route.ts');
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(content.includes('export async function POST'), 'Must export async POST handler');
  });

  it('verifies strict validation for client inputs (Name, Email, Phone)', () => {
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(content.includes('EMAIL_REGEX'), 'Must validate email format with regex');
    assert.ok(content.includes('PHONE_REGEX'), 'Must validate concierge phone format');
    assert.ok(content.includes('clientName'), 'Must validate client name');
    assert.ok(content.includes('status: 400'), 'Must return 400 on missing required fields');
    assert.ok(content.includes('status: 422'), 'Must return 422 on invalid format');
  });

  it('verifies generation of imperial booking reference and salon response payload', () => {
    const content = fs.readFileSync(routePath, 'utf8');
    assert.ok(content.includes('MNR-2026-'), 'Must generate MNR-2026-XXXX booking reference');
    assert.ok(content.includes('matchedSalon'), 'Must resolve matched salon from SALON_LOCATIONS');
    assert.ok(content.includes('matchedExperience'), 'Must resolve matched experience from ATELIER_EXPERIENCES');
    assert.ok(content.includes('status: 200'), 'Must return 200 OK on successful booking');
  });
});
