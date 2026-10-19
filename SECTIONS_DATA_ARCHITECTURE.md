# MONARCH Flagship Experience: Section-Wise Data Architecture & Product Inventory

This authoritative specification documents the complete **Product Inventory**, **Data Provisioning Map**, and **Section Architecture Tables** across the entire MONARCH luxury flagship platform, with dedicated specifications for **New Arrivals (Section 3)**, **Best Sellers (Section 4)**, and **The Private Atelier & Royal Craft Sanctum (Section 14)**.

---

## 1. Mandatory Product Inventory: Every Section Contains Genuine `Product`

Every wearable garment, saree, lehenga, or ensemble across EVERY section implements the canonical `Product` interface from `@/types`. Formatted prices use `formatINR(product.price)` while `product.price` is always stored as a numerical decimal.

| # | Section Name | Frontend Component | Frontend Data File | DB Model / Table | Model Type | Area Reflection (`sectionMetadata`) |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | **Flagship Hero Walkthrough** | [`HeroSection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/HeroSection.tsx) | `src/data/hero.ts` | `HeroConfig` | `HeroConfig` | 79 frames, clean frame overlays with direct text-shadow. |
| **1** | **Six Moods of Silk** | [`SixMoodsSection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/SixMoodsSection.tsx) | `src/data/categories.ts` | `Category` | `Category[]` | 6 silk mood categories (`KANJIVARAM`, `CHANDERI`, `PAITHANI`, etc.). |
| **2** | **Woven to Be Remembered** | [`WovenToBeRemembered.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WovenToBeRemembered.tsx) | `src/data/bridal.ts` | `Product` (signatures) | `Product[]` | `craftTechnique`, `heritageTag`, panoramic imagery displayed along top-circle arc. |
| **3** | **New Arrivals (Top Arrivals)** | [`NewArrivals.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/NewArrivals.tsx) | `src/data/newArrivals.ts` | `Product` (new arrivals) | `Product[]` | `badge: 'New Arrival'`, `dropSeason: 'Autumn-Winter 2026'`, `arrivalVelocity: 'Trending High'`. |
| **4** | **Best Sellers (Patron Favorites)** | [`BestSellers.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BestSellers.tsx) | `src/data/bestSellers.ts` | `Product` (best sellers) | `Product[]` | `badge: 'Bestseller'`, numerical ranking badges (`#01`–`#08`), `bestsellerRank: 1..8`, `salesVelocity: 'Peak Velocity'`. |
| **5** | **The Bridal Collection** | [`BridalCollection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BridalCollection.tsx) | `src/data/bridal.ts` | `Product` (bridal) | `Product[]` | `craftTechnique`, royal wedding trousseau details, marquee cards & hero spotlight. |
| **6** | **Trend of the Day** | [`TrendOfTheDay.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/TrendOfTheDay.tsx) | `src/data/trends.ts` | `Product` (trending) | `Product[]` | `badge`, right-to-left gliding marquee track with rating pills and instant add-to-cart. |
| **7** | **Seasonal Special** | [`SeasonalSpecial.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/SeasonalSpecial.tsx) | `src/data/seasonal.ts` | `Product` (seasonal) | `Product[]` | `seasonTag`, left-to-right reverse marquee track with seasonal curation badges. |
| **8** | **Autumn–Winter 2026** | [`AutumnWinter2026.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AutumnWinter2026.tsx) | `src/data/autumnWinter.ts` | `Product` via `CampaignSection` | `Product[]` | `campaignTag`, `campaignTitle`, `campaignSubtitle`, `curatedSaree` in cathedral arches. |
| **9** | **Change Your Look** | [`ChangeYourLook.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/ChangeYourLook.tsx) | `src/data/changeLook.ts` | `Product` via `LookbookStudio` | `Product[]` | `lookbookName`, `audioTrack: { title, artist }`, `features`, multi-color swatches. |
| **10**| **Edits for Every Occasion** | [`EditsForEveryOccasion.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/EditsForEveryOccasion.tsx) | `src/data/editsForOccasion.ts` | `Product` via `OccasionCollection` | `Product[]` | `occasionTag`, `occasionTitle`, action links for Wedding, Heritage, Drape, Atelier. |
| **11**| **Worth Your Attention** | [`WorthYourAttention.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WorthYourAttention.tsx) | `src/data/worthYourAttention.ts` | `Product` via `SpotlightCollection` | `Product[]` | `verticalText`, `attentionHeadline`, `spotlightTag`, 2-state accordion width morph. |
| **12**| **Cinematic Stories** | [`CinematicStories.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/CinematicStories.tsx) | `src/data/cinematicStories.ts` | `Product` via `CinematicStory` | `Product[]` | `storyTitleLine1`, `storyTitleLine2`, `storySubtitle`, `bgImage`, 2-phase dock cards. |
| **13**| **Latest Trends** | [`LatestTrends.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/LatestTrends.tsx) | `src/data/latestTrends.ts` | `Product` via `LatestTrendsDeck` | `Product[]` | `trendVelocity`, `badge`, `storyBehindDrape`, card deck swipe physics. |
| **14**| **The Private Atelier** | [`AtelierSanctum.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AtelierSanctum.tsx) | `src/data/atelier.ts` | `ClientDiaryEntry` & `AtelierBooking` | `ClientDiaryEntry[]` | Verified royal commissions with full `Product` relations, 24K gold zari hallmarked pillars. |

---

## 2. Section-Wise Data Provisioning & API Routing Map

| # | Section Name | Component File | Data File | Backend Endpoint | HTTP Method | Caching & Invalidation | Key DB Models & Tables |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0** | **Hero Canvas Sequence** | [`HeroSection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/HeroSection.tsx) | `src/data/hero.ts` | `/api/v1/hero` | `GET` | ISR (3600s) | `HeroConfig`: 79 frames, scroll distance 320vh, chapter headings. |
| **1** | **Six Moods of Silk** | [`SixMoodsSection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/SixMoodsSection.tsx) | `src/data/categories.ts` | `/api/v1/categories/moods` | `GET` | Static (24h) | `Category`: 6 silk moods (`KANJIVARAM`, `CHANDERI`, `PAITHANI`, etc.). |
| **2** | **Woven to Be Remembered** | [`WovenToBeRemembered.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WovenToBeRemembered.tsx) | `src/data/bridal.ts` | `/api/v1/collections/signatures` | `GET` | ISR (1800s) | `Product[]`: 6 signature ensembles along top-circle arc track. |
| **3** | **New Arrivals (Top Arrivals)**| [`NewArrivals.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/NewArrivals.tsx) | `src/data/newArrivals.ts` | `/api/v1/products?sort=newest` | `GET` | Dynamic (300s) | `Product[]`: 8 authentic newly dropped sarees, lehengas, and sherwanis. |
| **4** | **Best Sellers (Patron Favorites)**| [`BestSellers.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BestSellers.tsx) | `src/data/bestSellers.ts` | `/api/v1/products?sort=bestsellers` | `GET` | Dynamic (300s) | `Product[]`: 8 top-converting ensembles ranked `#01` to `#08`. |
| **5** | **The Bridal Collection** | [`BridalCollection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BridalCollection.tsx) | `src/data/bridal.ts` | `/api/v1/collections/bridal` | `GET` | ISR (3600s) | `BridalProduct[]`: curated royal pheras & wedding trousseau pieces. |
| **6** | **Trend of the Day** | [`TrendOfTheDay.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/TrendOfTheDay.tsx) | `src/data/trends.ts` | `/api/v1/trends/daily` | `GET` | Dynamic (3600s) | `Product[]`: right-to-left marquee track with ratings & size chips. |
| **7** | **Seasonal Special** | [`SeasonalSpecial.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/SeasonalSpecial.tsx) | `src/data/seasonal.ts` | `/api/v1/collections/seasonal` | `GET` | ISR (3600s) | `Product[]`: left-to-right reverse marquee with season tags. |
| **8** | **Autumn–Winter 2026** | [`AutumnWinter2026.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AutumnWinter2026.tsx) | `src/data/autumnWinter.ts` | `/api/v1/campaigns/autumn-winter-2026` | `GET` | ISR (3600s) | `CampaignSection`: 3 cathedral arched cards (`Awadhi Darbar`, etc.). |
| **9** | **Change Your Look** | [`ChangeYourLook.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/ChangeYourLook.tsx) | `src/data/changeLook.ts` | `/api/v1/studio/looks` | `GET` | ISR (3600s) | `LookbookStudio`: center models, color chips, and audio pill. |
| **10**| **Edits for Every Occasion** | [`EditsForEveryOccasion.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/EditsForEveryOccasion.tsx) | `src/data/editsForOccasion.ts` | `/api/v1/collections/occasions` | `GET` | ISR (3600s) | `OccasionCollection`: 4 portals (Wedding, Heritage, Drape, Atelier). |
| **11**| **Worth Your Attention** | [`WorthYourAttention.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WorthYourAttention.tsx) | `src/data/worthYourAttention.ts` | `/api/v1/spotlight/worth-your-attention` | `GET` | ISR (3600s) | `SpotlightCollection`: 6 accordion cards with 2-state dark-to-color morph. |
| **12**| **Cinematic Stories** | [`CinematicStories.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/CinematicStories.tsx) | `src/data/cinematicStories.ts` | `/api/v1/stories/cinematic` | `GET` | ISR (3600s) | `CinematicStory[]`: 4 moments in silk with pinned two-phase preview dock. |
| **13**| **Latest Trends** | [`LatestTrends.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/LatestTrends.tsx) | `src/data/latestTrends.ts` | `/api/v1/trends/deck` | `GET` | ISR (3600s) | `LatestTrendsDeck`: 3-column deck studio with swipe physics. |
| **14**| **The Private Atelier** | [`AtelierSanctum.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AtelierSanctum.tsx) | `src/data/atelier.ts` | `/api/v1/atelier/client-diary`<br/>`/api/v1/atelier/book-appointment` | `GET`<br/>`POST` | SWR (3600s)<br/>No-Cache (Transactional) | `ClientDiaryEntry[]`, `CraftSanctumPillar[]`, `SalonLocation[]`, `AtelierBooking`. |

---

## 3. Deep Dive: New Arrivals / Top Arrivals (Section 3)

- **Frontend Component**: [`src/components/home/NewArrivals.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/NewArrivals.tsx)
- **Dedicated Data File**: [`src/data/newArrivals.ts`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/data/newArrivals.ts)
- **Backend API**: `GET /api/v1/products?sort=newest`

### 3.1. New Arrivals Curated Catalog Specification

| Product ID | Ensembles Name | Category | Gender | Price (INR) | Primary Fabric | Embroidery & Craft Technique | Rating | Drop Velocity |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `monarch-na-001` | **Meher Velvet Kalidar Anarkali Set** | Anarkalis | Women | ₹ 1,75,000 | Silk Velvet & Organza | Handcrafted Jaipur Gota Patti & Dori Work | 4.92 ★ | Trending High |
| `monarch-na-002` | **Mastani Emerald Silk Gharara Set** | Festive Wear | Women | ₹ 1,25,000 | Silk Brocade & Chiffon | Awadhi Ruched Gota & Hammered Mukaish Specks | 4.93 ★ | Trending High |
| `monarch-na-003` | **Zohra Chanderi Zari Tissue Kurta Set** | Kurta Sets | Women | ₹ 88,000 | Chanderi Tissue Silk | Kashmiri Gold & Silver Tilla Needlework | 4.89 ★ | Trending High |
| `monarch-na-004` | **Chandni Hand-Embroidered Organza Saree** | Designer Sarees | Women | ₹ 1,10,000 | Pure Silk Organza | Hand Needle Zardozi & Resham Jasmine Blooms | 4.91 ★ | Trending High |
| `monarch-na-005` | **Riyasat Pista Green Raw Silk Sherwani** | Sherwanis | Men | ₹ 1,85,000 | Mulberry Raw Silk | Tonal Awadh Marodi Resham & Antique Brass Buttons | 4.95 ★ | Trending High |
| `monarch-na-006` | **Surya Rekha Kanjivaram Gold Tissue Saree** | Designer Sarees | Women | ₹ 1,65,000 | Mulberry Silk & Gold Weft | Authentic Korvai Handloom Weave Technique | 4.97 ★ | Trending High |
| `monarch-na-007` | **Nawabzada Midnight Velvet Bandhgala** | Bandhgalas | Men | ₹ 1,42,000 | Pure Silk Velvet | Hand-sewn Pick Stitching & Bullion Crest | 4.88 ★ | Trending High |
| `monarch-na-008` | **Gulrukh Rose Quartz Silk Lehenga** | Bridal Lehengas | Women | ₹ 2,65,000 | Mulberry Raw Silk | Seed Pearls, Cutdana, and Gilded Dabka | 4.96 ★ | Trending High |

---

## 4. Deep Dive: Best Sellers / Patron Favorites (Section 4)

- **Frontend Component**: [`src/components/home/BestSellers.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BestSellers.tsx)
- **Dedicated Data File**: [`src/data/bestSellers.ts`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/data/bestSellers.ts)
- **Backend API**: `GET /api/v1/products?sort=bestsellers`

### 4.1. Best Sellers Ranked Catalog Specification

| Rank | Product ID | Ensembles Name | Category | Price (INR) | Verified Rating | Review Count | Sales Velocity | Key Craft Feature |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **#01** | `monarch-bs-001` | **Gulnaar Embroidered Zardozi Lehenga** | Bridal Lehengas | ₹ 2,85,000 | 4.95 ★ | 38 reviews | Peak Velocity | 420 hrs hand-beaded dabka, pota pearls, and pure antique gold zari on deep crimson velvet. |
| **#02** | `monarch-bs-002` | **Sheesh Mahal Raw Silk Sherwani** | Sherwanis | ₹ 1,95,000 | 4.98 ★ | 42 reviews | Peak Velocity | Hand-spun Bhagalpur raw silk with tonal marodi threadwork and Jaipur-cast antique brass buttons. |
| **#03** | `monarch-bs-003` | **Varanasi Kashi Kadwa Brocade Saree** | Designer Sarees | ₹ 1,48,000 | 4.96 ★ | 54 reviews | Peak Velocity | Certified pure Katan silk with raised 24K real gold kadwa wefts without floating reverse threads. |
| **#04** | `monarch-bs-004` | **Badshah Royal Navy Bandhgala** | Bandhgalas | ₹ 1,35,000 | 4.89 ★ | 51 reviews | Peak Velocity | Superfine Merino wool-silk blend with mandarin collar piping and hand-engraved brass crest buttons. |
| **#05** | `monarch-bs-005` | **Ranisa Rose Gold Tissue Saree** | Designer Sarees | ₹ 1,68,000 | 4.96 ★ | 22 reviews | High Velocity | Handwoven tissue catching candlelight with subtle rose-gold brilliance, finished in scalloped pearls. |
| **#06** | `monarch-bs-006` | **Mumtaz Ivory & Gold Bridal Lehenga** | Bridal Lehengas | ₹ 3,10,000 | 5.00 ★ | 28 reviews | High Velocity | Handcrafted in warm ivory raw silk with champagne resham threadwork and gossamer veil dupatta. |
| **#07** | `monarch-bs-007` | **Darbar Hand-Brocade Nehru Jacket** | Nehru Jackets | ₹ 54,000 | 4.87 ★ | 45 reviews | High Velocity | 100% Benarasi silk brocade with raised gold motifs across a deep burgundy field. |
| **#08** | `monarch-bs-008` | **Jodhpur Ochre Gold Achkan** | Sherwanis | ₹ 1,55,000 | 4.88 ★ | 32 reviews | High Velocity | Heavyweight textured matka silk with subtle antique gold corded braiding on cuffs and collar band. |

---

## 5. Deep Dive: The Private Atelier & Royal Craft Sanctum (Section 14)

### 5.1. The 4 Movements Architecture Table

[`AtelierSanctum.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AtelierSanctum.tsx) is organized into four symphonic movements:

| Movement # | Sub-Section Title | Visual Layout Pattern | Aspect Ratio | Key Elements & Badges | Backend Data Entity |
| :- | :--- | :--- | :--- | :--- | :--- |
| **1** | **A Sanctuary of Silk & Royal Accords** | 3-Card Karigari Pillar Grid | `16 / 10` Macro Ratio | Top circular step numbers (`01`, `02`, `03`), certified gold zari hallmarks, artisan hours, gold hover shimmer. | `CraftSanctumPillar[]` (`CRAFT_SANCTUM_PILLARS`) |
| **2** | **Flagship Salons & Fitting Chambers** | Two-Column Split (Left: Salon Switcher, Right: Cathedral Arch Palace Frame) | Left: Auto-flex<br/>Right: `4 / 5` Arch Frame | **Crown Medallion Badge** positioned on `z-30` outside `overflow-hidden` so it floats gracefully OVER the curved arch; Keystone ornament (`✦`). | `SalonLocation[]` (`SALON_LOCATIONS`) |
| **3** | **The Royal Wedding Diary** | 12-Column Archival Folio Spread | Left: `4 / 5` Portrait<br/>Right: 64px macro craft | Real bride portrait, verified 5.0 star rating, poetic quote, commissioned `Product` card with direct Add to Cart and Wishlist. | `ClientDiaryEntry[]` (`ROYAL_CLIENT_DIARIES`) |
| **4** | **Private VIP Suite Concierge Modal** | Centered Modal Dialog with Backdrop Scrim | Adaptive Responsive Form | City selector, date picker, time-slot selection, budget tier, name, email, phone with strict E.164 regex validation. | `AtelierBooking` (POST payload) |

---

### 5.2. Movement 1: Craft Sanctum Pillars Specifications

| Pillar ID | Title | Craft Code | Provenance | Artisan Hours | Macro Image Ratio | Gold Hallmark Spec |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `p-zari` | **24K Real Gold Zari Hallmarked Wefts** | `KASHI-CAD-24K` | Kashi Royal Gharana | 480+ Handloom Hours | `aspect-[16/10]` | 98.5% pure silver thread electroplated in 24K pure gold leaf. Certified BIS hallmarked. |
| `p-pitloom` | **Heritage Pitloom Provenance** | `PAITHANI-PV-1700` | Paithan, Maharashtra | 320+ Artisan Hours | `aspect-[16/10]` | Interlocking weft tapestry weave without floating threads on reverse. |
| `p-dabka` | **Bespoke Zardozi & Dabka Needlework** | `AWADH-ZD-1850` | Awadh Imperial Karkhana | 600+ Needle Hours | `aspect-[16/10]` | Hand-twisted metallic dabka springs, semi-precious pearls, and French wire embroidery. |

---

### 5.3. Movement 2: Flagship Salon Locations & Crown Badge Positioning

| City | Slug | Flagship Salon Name | Address | Suites Count | Crown Badge Text | Badge Layering |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **New Delhi** | `new-delhi` | **The Mehrauli Pavilion Flagship** | Ambawatta One, Kalka Das Marg, Mehrauli, New Delhi 110030 | 4 Private VIP Suites | `New Delhi Sanctuary · 4 Private VIP Suites` | `z-30`, direct child of palace frame, floats OVER curved arch. |
| **Mumbai** | `mumbai` | **The Kala Ghoda Heritage Mansion** | Forbes Street, Kala Ghoda, Fort, Mumbai 400001 | 3 Couture Suites | `Mumbai Sanctuary · 3 Couture Suites` | `z-30`, direct child of palace frame, floats OVER curved arch. |
| **Hyderabad** | `hyderabad` | **The Jubilee Hills Royal Vault** | Road No. 36, Jubilee Hills, Hyderabad 500033 | 3 Heritage Suites | `Hyderabad Sanctuary · 3 Heritage Suites` | `z-30`, direct child of palace frame, floats OVER curved arch. |
| **Kolkata** | `kolkata` | **The Alipore Colonial Chambers** | Queens Park, Ballygunge / Alipore, Kolkata 700019 | 2 Private Chambers | `Kolkata Sanctuary · 2 Private Chambers` | `z-30`, direct child of palace frame, floats OVER curved arch. |
| **Bengaluru** | `bengaluru` | **The Lavelle Court Atelier** | Lavelle Road, Shanthala Nagar, Ashok Nagar, Bengaluru 560001 | 2 Private Suites | `Bengaluru Sanctuary · 2 Private Suites` | `z-30`, direct child of palace frame, floats OVER curved arch. |

---

### 5.4. Movement 3: Royal Wedding Diary Commissions

| Diary ID | Client Names | Wedding Location & Venue | Wedding Date | Commissioned Product Name | Canonical Product ID | Price (INR) | Verified Rating |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `diary-01` | **Radhika & Devendra** | The City Palace, Udaipur | February 2026 | **Gulnaar Embroidered Zardozi Lehenga** | `monarch-001` | ₹ 2,85,000 | 5.0 ★ |
| `diary-02` | **Aanaya & Kabir** | Villa del Balbianello, Lake Como | November 2025 | **Varanasi Kashi Kadwa Brocade Saree** | `monarch-004` | ₹ 1,48,000 | 5.0 ★ |
| `diary-03` | **Meera & Siddharth** | Rambagh Palace, Jaipur | January 2026 | **Noor-e-Awadh Tissue Tissue Organza Saree** | `monarch-007` | ₹ 1,22,000 | 5.0 ★ |
| `diary-04` | **Isha & Vikram** | Umaid Bhawan Palace, Jodhpur | December 2025 | **Padmavati Shikargah Royal Red Bridal Saree** | `monarch-bridal-1`| ₹ 3,45,000 | 5.0 ★ |

---

### 5.5. Movement 4: VIP Appointment Booking API Contract

- **Endpoint**: `POST /api/v1/atelier/book-appointment`
- **Controller File**: [`src/app/api/v1/atelier/book-appointment/route.ts`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/app/api/v1/atelier/book-appointment/route.ts)
- **Status Code**: `201 Created`

| Field Name | Type | Validation Rule | Example Value | Description |
| :--- | :--- | :--- | :--- | :--- |
| `clientName` | `string` | Required, min 2 chars | `"Maharani Gayatri Devi"` | Full name of the client or bride. |
| `email` | `string` | Required, RFC 5322 regex | `"gayatri.devi@palace.in"` | Client email for calendar invite (.ics). |
| `phone` | `string` | Required, E.164 regex | `"+91 98100 12345"` | Phone for WhatsApp concierge confirmation. |
| `locationSlug` | `string` | Required, matches `SalonLocation` | `"new-delhi"` | Target salon flagship suite. |
| `experienceType`| `string` | Required enum | `"BRIDAL_TROUSSEAU"` | Trousseau, Haute Couture, or Saris. |
| `preferredDate` | `string` | Required, ISO date (`YYYY-MM-DD`) | `"2026-11-15"` | Appointment date (min 24h in advance). |
| `preferredTimeSlot`| `string`| Required slot | `"03:00 PM - 05:00 PM"` | 2-hour dedicated suite fitting window. |
| `weddingDate` | `string` | Optional ISO date | `"2027-02-18"` | Projected wedding date for timeline planning. |
| `budgetTier` | `string` | Optional enum | `"ROYAL_HERITAGE"` | Imperial (₹1.5L-3.5L), Royal (₹3.5L-7.5L), Bespoke (₹7.5L+). |
| `notes` | `string` | Optional text | `"Real gold zari lehenga request."` | Custom styling notes or entourage size. |
| `interestedProductIds`| `string[]`| Optional ID array | `["monarch-001", "p-aw26-1"]` | Pinned catalog products from wishlist/cart. |

---

## 6. Central Image Preloader Inventory ([`SectionImagePreloader.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/shared/SectionImagePreloader.tsx))

To guarantee that cards never display white faded flashes or late loading pops when scrolling past the hero sequence, the central preloader proactively caches and GPU-decodes (`img.decode()`) all section images:

| Category / Section | Total Images | Image File Paths / URLs | Preload Method |
| :--- | :--- | :--- | :--- |
| **Six Moods of Silk** | 6 | `/images/moods/kanjivaram_silk.jpg`, `banarasi_brocade.jpg`, `chanderi_heritage.jpg`, `paithani_heirloom.jpg`, `tussar_silk.jpg`, `pure_organza.jpg` | GPU `img.decode()` on mount |
| **Woven to Be Remembered** | 6 | `/images/panoramic/ensemble_aarunya.jpg`, `ensemble_kalyani.jpg`, `ensemble_saanjh.jpg`, `ensemble_prerna.jpg`, `ensemble_utsav.jpg`, `ensemble_vara.jpg` | GPU `img.decode()` on mount |
| **New Arrivals (Section 3)** | 8 | 8 luxury ensemble card URLs from dedicated `src/data/newArrivals.ts` | GPU `img.decode()` on mount |
| **Best Sellers (Section 4)** | 8 | 8 patron-favorite ensemble card URLs from dedicated `src/data/bestSellers.ts` | GPU `img.decode()` on mount |
| **Autumn–Winter 2026** | 3 | `/images/panoramic/ensemble_aarunya.jpg`, `ensemble_utsav.jpg`, `ensemble_vara.jpg` | GPU `img.decode()` on mount |
| **Edits for Every Occasion** | 4 | 4 high-res editorial shoot URLs from Unsplash CDN | GPU `img.decode()` on mount |
| **Worth Your Attention** | 6 | 6 spotlight ensemble portrait URLs from Unsplash CDN | GPU `img.decode()` on mount |
| **The Bridal Collection** | 4 | 4 bridal trousseau & lehenga URLs from Unsplash CDN | GPU `img.decode()` on mount |
| **Latest Trends Deck** | 4 | 4 trend deck ensemble URLs from Unsplash CDN | GPU `img.decode()` on mount |
| **Cinematic Stories** | 4 | 4 full-screen 4K background images + 4 floating thumbnail cards | GPU `img.decode()` on mount |
| **Atelier Karigari Pillars** | 3 | 3 macro craftsmanship shoot URLs (Zari, Pitloom, Zardozi) | GPU `img.decode()` on mount |

---

## 7. SSR-Safe ScrollTrigger Opacity & Timing Matrix

| Component File | Initial Opacity | Initial Y Offset | Start Trigger Position | Duration / Stagger | Pin Configuration |
| :--- | :--- | :--- | :--- | :--- | :--- |
| [`WorthYourAttention.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WorthYourAttention.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (Horizontal Scroll Track) |
| [`AutumnWinter2026.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AutumnWinter2026.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.08s` | None (3 Cathedral Arches Grid) |
| [`EditsForEveryOccasion.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/EditsForEveryOccasion.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (4 Portals Grid) |
| [`LatestTrends.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/LatestTrends.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (Card Deck Stack) |
| [`BridalCollection.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BridalCollection.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (Infinite Marquee) |
| [`NewArrivals.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/NewArrivals.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (Product Rail Track) |
| [`BestSellers.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/BestSellers.tsx) | `0.85` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (Product Rail Track) |
| [`TrendOfTheDay.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/TrendOfTheDay.tsx) | `0.85` | `12px` | `top 95%` | `0.5s` / None | None (Continuous Marquee) |
| [`SeasonalSpecial.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/SeasonalSpecial.tsx) | `0.85` | `12px` | `top 95%` | `0.5s` / None | None (Continuous Marquee) |
| [`AtelierSanctum.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/AtelierSanctum.tsx) | `0.88` | `16px` | `top 95%` | `0.5s` / `0.05s` | None (4 Movements Stack) |
| [`CinematicStories.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/CinematicStories.tsx) | `1.0` (direct) | `0px` | `top top` | `end: +=1800` | `pin: true`, `anticipatePin: 1`, `dependencies: []` |
| [`WovenToBeRemembered.tsx`](file:///Users/anuragkanaujiya/Desktop/Projects/monarch/src/components/home/WovenToBeRemembered.tsx) | `1.0` (direct) | `0px` | `top 10%` | `end: +=2500` | `pin: true`, `anticipatePin: 1`, `dependencies: []` |
