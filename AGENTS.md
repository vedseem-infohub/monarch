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

## Backend Database Architecture & Section-Wise Data Guide

This guide defines how the production database is structured and how data is provisioned section-by-section to the frontend.

### 1. Database Technology Stack Recommendation
- **Primary Database**: PostgreSQL (via Supabase, AWS RDS, or Neon)
- **ORM / Schema Layer**: Prisma ORM or Drizzle ORM
- **Media CDN**: AWS S3 + CloudFront (or Cloudinary / Supabase Storage)
- **Headless CMS Alternative**: Strapi / Sanity / Payload CMS

### 2. Core Relational Database Schemas (Prisma / SQL)

```prisma
// Core Product Catalog
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

  // Section Relations
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
  cards        CampaignCard[]
}

model CampaignCard {
  id         String          @id @default(cuid())
  campaignId String
  campaign   CampaignSection @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  title      String
  subtitle   String
  saree      String
  tag        String
  image      String
  href       String
  orderIndex Int             @default(0)
}

// Interactive Studio: Change Your Look
model LookbookStudio {
  id         String         @id // e.g. "studio-2026"
  title      String         // "Change look"
  isActive   Boolean        @default(true)
  looks      LookbookItem[]
}

model LookbookItem {
  id          String         @id @default(cuid())
  studioId    String
  studio      LookbookStudio @relation(fields: [studioId], references: [id], onDelete: Cascade)
  productId   String?        @unique
  product     Product?       @relation(fields: [productId], references: [id])
  name        String         // "IVORY ORGANZA BLOOM"
  subtitle    String
  price       Decimal        @db.Decimal(10, 2)
  modelImage  String
  thumbnail   String
  colorName   String
  sizes       String[]       // ["34", "36", "38", "40", "42"]
  audioTitle  String         // "RAGA BHAIRAVI"
  audioArtist String         // "Sitar & Tanpura by Kashi Guild"
  audioSrc    String?
  features    String[]
  colors      Json           // [{ id, name, hex, image }]
  orderIndex  Int            @default(0)
}
```

---

### 3. Section-Wise Data Provisioning Map

Every homepage section connects to a dedicated data model and API endpoint:

| # | Section Name | Component File | Dedicated Data File | Backend Endpoint | Key DB Model & Fields |
| :- | :--- | :--- | :--- | :--- | :--- |
| **0** | **Hero Canvas Sequence** | `HeroSection.tsx` | `hero.ts` | `GET /api/v1/hero` | `HeroConfig`: frame count (120), scroll distance (400vh), heading, tagline. |
| **1** | **Six Moods of Silk** | `SixMoodsSection.tsx` | Inlined / `categories.ts` | `GET /api/v1/categories/moods` | `Category`: 6 silk moods (`KANJIVARAM`, `CHANDERI`, `TUSSAR`, `PAITHANI`, `BANARASI`, `ORGANZA`), image, slug. |
| **2** | **Woven to Be Remembered** | `WovenToBeRemembered.tsx` | `bridal.ts` | `GET /api/v1/collections/signatures` | `Product[]`: 6 signature ensembles displayed along the 85px top-circle arc track. |
| **3** | **New Arrivals** | `NewArrivals.tsx` | `products.ts` | `GET /api/v1/products?sort=newest` | `Product[]`: latest released sarees and lehengas. |
| **4** | **Best Sellers** | `BestSellers.tsx` | `products.ts` | `GET /api/v1/products?sort=bestsellers` | `Product[]`: highest sales velocity products. |
| **5** | **The Bridal Collection** | `BridalCollection.tsx` | `bridal.ts` | `GET /api/v1/collections/bridal` | `BridalEnsemble[]`: bespoke red/crimson/gold heritage pieces. |
| **6** | **Trend of the Day** | `TrendOfTheDay.tsx` | `trends.ts` | `GET /api/v1/trends/daily` | `TrendItem[]`: right-to-left marquee track with hover pause. |
| **7** | **Seasonal Special** | `SeasonalSpecial.tsx` | `seasonal.ts` | `GET /api/v1/collections/seasonal` | `SeasonalItem[]`: left-to-right reverse marquee with season tags. |
| **8** | **Autumn–Winter 2026** | `AutumnWinter2026.tsx` | `autumnWinter.ts` | `GET /api/v1/campaigns/autumn-winter-2026` | `CampaignSection`: 3 cathedral arched cards (`Awadhi Darbar`, `Courtyard Baithak`, `Kashi Imperial`). |
| **9** | **Change Your Look** | `ChangeYourLook.tsx` | `changeLook.ts` | `GET /api/v1/studio/looks` | `LookbookItem[]`: interactive center model, sizes, color chips, and audio pill. |
| **10**| **Worth Your Attention** | `WorthYourAttention.tsx` | `products.ts` | `GET /api/v1/products/featured` | `Product[]`: editorial highlighted luxury picks. |
| **11**| **Latest Trends** | `LatestTrends.tsx` | `trends.ts` | `GET /api/v1/trends/latest` | `Product[]`: high-engagement trending pieces. |
| **12**| **Craftsmanship Sanctum** | `CraftsmanshipSection.tsx`| `craftsmanship.ts` | `GET /api/v1/craftsmanship` | `CraftPillar[]`: Kashi pitlooms, Awadhi zardozi, Tilla embroidery, bespoke canvas. |
| **13**| **Royal Client Diary** | `TestimonialCarousel.tsx`| `craftsmanship.ts` | `GET /api/v1/testimonials` | `Testimonial[]`: verified client reviews, wedding locations, quotes. |

---

### 4. Implementation Pattern for Backend Data Fetching

When integrating real backend APIs, use Next.js React Server Components with graceful fallback to local reference data:

```tsx
// src/app/page.tsx
import { AUTUMN_WINTER_DATA, AutumnWinterData } from '@/data/autumnWinter';
import { CHANGE_LOOK_STYLES, LookStyleItem } from '@/data/changeLook';

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
