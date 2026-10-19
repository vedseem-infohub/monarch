<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project Development Rules & Guidelines

### 1. Lightweight & Fully Functional UI
- **Keep it Light**: Always build lightweight, optimized, and performant UI components to ensure fast load times and smooth rendering.
- **Fully Working**: Ensure all features, interactions, navigation, and controls are completely working and functional without breaking existing flows.

### 2. GSAP Animations with `useGSAP`
- **Hook Requirement**: Whenever using GSAP for animations, always use the `useGSAP` hook from `@gsap/react` (never raw `useEffect` or unscoped GSAP tweens).
- **Proper Scoping & Cleanup**: Always pass the component container reference (`scope`) to `useGSAP` so animations, timelines, and ScrollTriggers are properly scoped and automatically cleaned up during React re-renders and unmounts.
- **SSR-Safe Initial Visibility**: Never set `opacity: 0` in `gsap.from` without guaranteed fallbacks. Elements must render with default `opacity-100` so that if pinned scroll triggers or hydration takes time, content is never invisible to the user.

### 3. Image & Media Handling
- **Do Not Generate New Images**: Do not create, generate, or request new placeholder images.
- **Use Existing Assets**: The project already has more than enough images and media assets in `/public` (`/public/images/panoramic/`, `/public/images/moods/`, etc.) for UI construction.
- **Reference Only**: Treat all frontend mock data and imagery purely as reference/prototyping material, as the backend will provide the full production data.

### 4. Code Organization: Reusable Components & Data Files
- **Reusable Components**: Always create separate, dedicated files for reusable UI components (in `src/components/`) rather than creating monolithic files.
- **Dedicated Data Files**: Always place shared data, mock lists, and reference models into separate files under `src/data/` rather than inlining data objects inside component files.

### 5. Test Files & Verification
- **Always Create Test Files**: Always make dedicated test files (`*.test.tsx`) when implementing or modifying components, hooks, and business logic to ensure everything is working and regressions are prevented.
- **Test File Location**: Place test files directly alongside the file they are testing (co-located, e.g. `ComponentName.test.tsx` next to `ComponentName.tsx`).

---

### 6. MANDATORY AGENT HOOK: Component Reusability & Extraction Check
**Trigger**: *Before and during the creation or refactoring of ANY UI component.*

Every agent working on this repository MUST execute this 4-step checklist:
1. **Audit Existing Library**: Before writing any new JSX markup, search `src/components/` and `src/components/home/` to check if a similar card, button, tag badge, arch frame, image mask, or track already exists.
2. **Extract Common Patterns**:
   - If a visual pattern is used across 2 or more sections (e.g. `ArchedCard`, `HorizontalProductCard`, `LookThumbnailCard`, `SectionHeader`, pill buttons, audio pills), **NEVER inline it**.
   - Extract it immediately into its own dedicated file (e.g. `src/components/home/ArchedCard.tsx`, `src/components/common/PillButton.tsx`).
   - Accept typed props (`interface ComponentProps { ... }`) with configurable labels, actions, images, and styling variants.
3. **Decouple Data into `src/data/`**:
   - Extract all item arrays, labels, tags, prices, and links into a dedicated file under `src/data/<sectionName>.ts`.
   - The UI component must only import the data type and render it via props or imported constant.
4. **Co-locate Unit Tests**:
   - Create `ComponentName.test.tsx` testing dataset structure, prop propagation, and edge cases.

---

### 7. MANDATORY RULE: UNIFIED PRODUCT ARCHITECTURE (AGENT MUST NEVER FORGET)
**CRITICAL**: Every wearable garment, saree, lehenga, or ensemble across EVERY section is a genuine `Product`!

Agents must adhere strictly to these 5 backend developer principles:
1. **Single Source of Truth**: NEVER create ad-hoc, random interfaces (like `ArchedCampaignItem`, `LookStyleItem`, `BridalEnsemble`) with divergent property names (`rawPrice` vs `price`, `title` vs `name`, `saree` vs `fabric`). Every product model across all files MUST implement `Product` from `@/types`.
2. **Prices are Always Numbers**: The database stores price as an integer / decimal (e.g. `price: 18400`). NEVER store formatted strings like `"₹ 18,400"` as the primary price field. Use `formatINR(product.price)` from `@/utils/formatters` for display.
3. **Area-Specific Reflections live in `sectionMetadata`**: Different sections present products differently. These area reflections belong in `product.sectionMetadata`:
   - **Autumn–Winter 2026**: `campaignTag`, `campaignTitle`, `campaignSubtitle`, `curatedSaree`
   - **Change Your Look**: `lookbookName`, `audioTrack: { title, artist }`, `features: string[]`
   - **Bridal & Signatures**: `craftTechnique`, `heritageTag`
   - **Seasonal Drops**: `seasonTag`
   - **Trends**: `trendVelocity`, `badge`
4. **Direct Cart & Wishlist Interaction**: Because every item is a full `Product`, always pass the product directly to `addToCart(product, color, size, qty)` and `toggleWishlist(product.id)`. NEVER construct fake "synthetic" product objects.
5. **Backwards Compatibility**: When augmenting data files, provide convenience aliases (`title = name`, `formattedPrice = formatINR(price)`) so existing components never break.

---

## Backend Database Architecture & Section-Wise Data Guide

This guide defines how the production database is structured and how data is provisioned section-by-section to the frontend.

### 1. Database Technology Stack Recommendation
- **Primary Database**: PostgreSQL (via Supabase, AWS RDS, or Neon)
- **ORM / Schema Layer**: Prisma ORM or Drizzle ORM
- **Media CDN**: AWS S3 + CloudFront (or Cloudinary / Supabase Storage)
- **Headless CMS Alternative**: Strapi / Sanity / Payload CMS

### 2. Core Relational Database Schemas (Prisma / SQL)

```prisma
// Core Product Catalog (Single Canonical Table for all ensembles)
model Product {
  id                 String           @id @default(cuid())
  slug               String           @unique
  name               String
  tagline            String
  description        String           @db.Text
  categorySlug       String
  category           Category         @relation(fields: [categorySlug], references: [slug])
  gender             Gender           @default(WOMEN) // WOMEN | MEN | UNISEX
  price              Decimal          @db.Decimal(10, 2)
  originalPrice      Decimal?         @db.Decimal(10, 2)
  fabric             String
  embroidery         String?
  craftsmanshipStory String?          @db.Text
  careInstructions   String[]
  deliveryDays       Int              @default(3)
  inStock            Boolean          @default(true)
  isFeatured         Boolean          @default(false)
  rating             Decimal          @default(4.9) @db.Decimal(2, 1)
  reviewsCount       Int              @default(0)
  images             String[]         // CloudFront URLs
  variants           ProductVariant[]
  reviews            Review[]
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  // Section Area Relations / Metadata
  sectionMetadata    Json?            // Stores campaignTag, audioTrack, craftTechnique, features
  seasonalSpecial    SeasonalItem?
  trendItem          TrendItem?
  lookbookItem       LookbookItem?
}

// Product Variants (Colors & Sizes)
model ProductVariant {
  id         String   @id @default(cuid())
  productId  String
  product    Product  @relation(fields: [productId], references: [id], onDelete: Cascade)
  colorName  String
  colorHex   String
  size       String   // "34", "36", "38", "40", "42"
  stockCount Int      @default(5)
  image      String?
}

// Categories & Craft Silks
model Category {
  slug        String    @id
  name        String
  gender      Gender
  image       String
  tagline     String
  description String    @db.Text
  itemCount   Int       @default(0)
  products    Product[]
}

// Editorial Campaigns & Section Forecasts (e.g. Autumn-Winter 2026)
model CampaignSection {
  id           String         @id // e.g. "autumn-winter-2026"
  tag          String         // e.g. "SEASON FORECAST"
  headingLine1 String         // "Autumn–"
  headingLine2 String         // "Winter"
  headingYear  String         // "2026"
  description  String         @db.Text
  ctaText      String         // "EXPLORE 2026 FORECAST"
  ctaHref      String
  isActive     Boolean        @default(true)
  products     Product[]      // Curated campaign products
}

// Interactive Studio: Change Your Look
model LookbookStudio {
  id         String         @id // e.g. "studio-2026"
  title      String         // "Change look"
  isActive   Boolean        @default(true)
  looks      Product[]      // Curated studio products with audio & color variants
}

// Occasion Edits & Curated Portals (Edits for Every Occasion)
model OccasionCollection {
  id             String         @id // e.g. "edits-for-every-occasion"
  headingPrimary String         // "EDITS FOR"
  headingScript  String         // "every occasion"
  description    String         @db.Text
  ctaText        String         // "EXPLORE ALL EDITS"
  ctaHref        String
  isActive       Boolean        @default(true)
  products       Product[]      // Curated occasion products (Wedding, Heritage, Drape, Atelier)
}

// Spotlight Accordion: Worth Your Attention
model SpotlightCollection {
  id          String         @id // e.g. "worth-your-attention"
  eyebrow     String         // "ROYAL SPOTLIGHT"
  heading     String         // "Worth your attention"
  description String         @db.Text
  ctaText     String         // "EXPLORE ALL SPOTLIGHTS"
  ctaHref     String
  isActive    Boolean        @default(true)
  products    Product[]      // Curated spotlight products with accordion metadata
}
```

---

### 3. MANDATORY INVENTORY: WHICH DATA TABLES & FILES CONTAIN PRODUCT

**AGENT MUST NEVER FORGET THIS TABLE**:

| # | Section Name | Frontend Data File | DB Table / Model | Model Type | Area Reflection (`sectionMetadata`) |
| :- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Master Catalog** | `src/data/products.ts` | `products` | `Product[]` | Base catalog specs: fabric, embroidery, 3D, ratings. |
| **2** | **Woven to Be Remembered** | `src/data/bridal.ts` | `products` (signatures) | `Product[]` | `craftTechnique`, `heritageTag`, panoramic imagery along top-circle arc. |
| **3** | **The Bridal Collection** | `src/data/bridal.ts` | `products` (bridal) | `Product[]` | `craftTechnique`, royal trousseau details, large hero card auto-cycle. |
| **4** | **Autumn–Winter 2026** | `src/data/autumnWinter.ts` | `products` via `campaigns` | `Product[]` | `campaignTag`, `campaignTitle`, `campaignSubtitle`, `curatedSaree` in cathedral arches. |
| **5** | **Change Your Look** | `src/data/changeLook.ts` | `products` via `lookbook` | `Product[]` | `lookbookName`, `audioTrack: { title, artist }`, `features`, multi-color swatches. |
| **6** | **Edits for Every Occasion** | `src/data/editsForOccasion.ts` | `products` via `occasions` | `Product[]` | `occasionTag`, `occasionTitle`, action links for Wedding, Heritage, Drape, Atelier. |
| **7** | **Trend of the Day** | `src/data/trends.ts` | `products` (trending) | `Product[]` | `badge`, right-to-left gliding marquee track. |
| **8** | **Seasonal Special** | `src/data/seasonal.ts` | `products` (seasonal) | `Product[]` | `seasonTag`, left-to-right reverse marquee track. |
| **9** | **New Arrivals / Best Sellers** | `src/data/products.ts` | `products` (sorted) | `Product[]` | `badge: 'New Arrival' \| 'Bestseller'`. |
| **10**| **Worth Your Attention** | `src/data/worthYourAttention.ts` | `products` via `spotlight` | `Product[]` | `verticalText`, `attentionHeadline`, `spotlightTag`, `offerBadge`. |
| **11**| **Latest Trends** | `src/data/trends.ts` | `products` (featured) | `Product[]` | `badge`, trending engagement score. |

---

### 4. Section-Wise Data Provisioning Map

Every homepage section connects to a dedicated data model and API endpoint:

| # | Section Name | Component File | Dedicated Data File | Backend Endpoint | Key DB Model & Fields |
| :- | :--- | :--- | :--- | :--- | :--- |
| **0** | **Hero Canvas Sequence** | `HeroSection.tsx` | `hero.ts` | `GET /api/v1/hero` | `HeroConfig`: frame count (120), scroll distance (400vh), heading, tagline. |
| **1** | **Six Moods of Silk** | `SixMoodsSection.tsx` | Inlined / `categories.ts` | `GET /api/v1/categories/moods` | `Category`: 6 silk moods (`KANJIVARAM`, `CHANDERI`, `TUSSAR`, `PAITHANI`, `BANARASI`, `ORGANZA`), image, slug. |
| **2** | **Woven to Be Remembered** | `WovenToBeRemembered.tsx` | `bridal.ts` | `GET /api/v1/collections/signatures` | `Product[]`: 6 signature ensembles displayed along the 85px top-circle arc track. |
| **3** | **New Arrivals** | `NewArrivals.tsx` | `products.ts` | `GET /api/v1/products?sort=newest` | `Product[]`: latest released sarees and lehengas. |
| **4** | **Best Sellers** | `BestSellers.tsx` | `products.ts` | `GET /api/v1/products?sort=bestsellers` | `Product[]`: highest sales velocity products. |
| **5** | **The Bridal Collection** | `BridalCollection.tsx` | `bridal.ts` | `GET /api/v1/collections/bridal` | `BridalProduct[]`: bespoke red/crimson/gold heritage pieces. |
| **6** | **Trend of the Day** | `TrendOfTheDay.tsx` | `trends.ts` | `GET /api/v1/trends/daily` | `Product[]`: right-to-left marquee track with hover pause. |
| **7** | **Seasonal Special** | `SeasonalSpecial.tsx` | `seasonal.ts` | `GET /api/v1/collections/seasonal` | `Product[]`: left-to-right reverse marquee with season tags. |
| **8** | **Autumn–Winter 2026** | `AutumnWinter2026.tsx` | `autumnWinter.ts` | `GET /api/v1/campaigns/autumn-winter-2026` | `AutumnWinterData`: 3 cathedral arched cards (`Awadhi Darbar`, `Courtyard Baithak`, `Kashi Imperial`). |
| **9** | **Change Your Look** | `ChangeYourLook.tsx` | `changeLook.ts` | `GET /api/v1/studio/looks` | `LookStyleProduct[]`: interactive center model, sizes, color chips, and audio pill. |
| **10**| **Edits for Every Occasion** | `EditsForEveryOccasion.tsx` | `editsForOccasion.ts` | `GET /api/v1/collections/occasions` | `OccasionCollection`: 4 portals (`The Wedding Edit`, `Heritage Weaves`, `The New Drape`, `Private Atelier`). |
| **11**| **Worth Your Attention** | `WorthYourAttention.tsx` | `worthYourAttention.ts` | `GET /api/v1/spotlight/worth-your-attention` | `SpotlightCollection`: 6 expanding accordion cards with dark-to-colorful hover morph and horizontal scroll track. |
| **12**| **Latest Trends** | `LatestTrends.tsx` | `trends.ts` | `GET /api/v1/trends/latest` | `Product[]`: high-engagement trending pieces. |
| **13**| **Craftsmanship Sanctum** | `CraftsmanshipSection.tsx`| `craftsmanship.ts` | `GET /api/v1/craftsmanship` | `CraftPillar[]`: Kashi pitlooms, Awadhi zardozi, Tilla embroidery, bespoke canvas. |
| **14**| **Royal Client Diary** | `TestimonialCarousel.tsx`| `craftsmanship.ts` | `GET /api/v1/testimonials` | `Testimonial[]`: verified client reviews, wedding locations, quotes. |

---

### 5. Implementation Pattern for Backend Data Fetching

When integrating real backend APIs, use Next.js React Server Components with graceful fallback to local reference data:

```tsx
// src/app/page.tsx
import { AUTUMN_WINTER_DATA, AutumnWinterData } from '@/data/autumnWinter';
import { CHANGE_LOOK_PRODUCTS, LookStyleProduct } from '@/data/changeLook';

async function getAutumnWinterData(): Promise<AutumnWinterData> {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/api/v1/campaigns/autumn-winter-2026`, {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3600 }, // Cache with ISR for 1 hour
    });
    if (!res.ok) throw new Error('API fetch failed');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Backend API unavailable, using fallback mock data:', err);
    return AUTUMN_WINTER_DATA;
  }
}
```
