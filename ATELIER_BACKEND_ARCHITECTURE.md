# Backend Architecture Specification: The Private Atelier & Royal Craft Sanctum

This specification defines the production database schema, API design, validation rules, and integration pipelines for **The Private Atelier & Royal Craft Sanctum** (Section 13 on the MONARCH flagship experience).

---

## 1. Executive Summary & Domain Modeling

The Private Atelier section is the highest-converting touchpoint on the MONARCH platform. For an Indian luxury couture house selling ensembles priced from ₹1,50,000 to ₹10,00,000+, online checkouts are complemented by high-touch private salon consultations.

This domain manages three primary entities:
1. **Atelier Booking (`AtelierBooking`)**: High-intent bridal trousseau and bespoke haute couture appointment leads routed directly to salon concierges.
2. **Royal Client Diary (`ClientDiaryEntry`)**: Verified high-society wedding commissions providing authentic social proof, directly linked to catalog `Product` models.
3. **Karigari Sanctum Pillars (`CraftSanctumPillar`)**: Hallmarked craftsmanship credentials (24K gold zari, pitloom provenance, 400+ hour hand-embroidery metrics).

---

## 2. Relational Database Schema (Prisma ORM / PostgreSQL)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

// =========================================================================
// 1. VIP SALON & PRIVATE ATELIER APPOINTMENTS
// =========================================================================
model AtelierBooking {
  id                 String              @id @default(cuid())
  bookingReference   String              @unique // Format: "MNR-YYYYMM-XXXX" (e.g. MNR-202610-8492)
  clientName         String              @db.VarChar(120)
  email              String              @db.VarChar(255)
  phone              String              @db.VarChar(30)
  locationSlug       String              // Foreign key to SalonLocation
  salonLocation      SalonLocation       @relation(fields: [locationSlug], references: [slug])
  experienceType     AtelierExperience   @default(BRIDAL_TROUSSEAU)
  preferredDate      DateTime            @db.Date
  preferredTimeSlot  String              @db.VarChar(50) // "11:00 AM - 01:00 PM"
  weddingDate        DateTime?           @db.Date
  budgetTier         BudgetTier?         @default(ROYAL_HERITAGE)
  notes              String?             @db.Text
  
  // Relations to Curated Products from Catalog (Rule 7: Unified Product Architecture)
  interestedProducts Product[]           @relation("BookingInterestedProducts")

  status             BookingStatus       @default(PENDING)
  assignedStylistId  String?
  assignedStylist    StylistProfile?     @relation(fields: [assignedStylistId], references: [id])
  
  // Audit & CRM synchronization tracking
  crmLeadId          String?             @unique // External Salesforce / Chatverce / HubSpot Lead ID
  sourceUtm          Json?               // { source, medium, campaign, referer }
  ipAddress          String?             @db.VarChar(45)
  userAgent          String?             @db.Text
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  @@index([email, phone])
  @@index([status, preferredDate])
  @@index([locationSlug, preferredDate])
}

enum AtelierExperience {
  BRIDAL_TROUSSEAU         // Full bridal trousseau & lehenga fittings
  HAUTE_COUTURE_BESPOKE    // Custom silhouette commissioning & embroidery selection
  HERITAGE_SARIS_CURATION  // 24K real gold zari Banarasi & Kanjivaram heirlooms
  VIRTUAL_VIP_STYLING      // 1-on-1 global video consultation with senior draper
}

enum BudgetTier {
  IMPERIAL_SIGNATURE  // ₹1,50,000 - ₹3,50,000
  ROYAL_HERITAGE      // ₹3,50,000 - ₹7,50,000
  BESPOKE_MONARCH     // ₹7,50,000+
}

enum BookingStatus {
  PENDING             // Awaiting concierge validation
  CONFIRMED           // Confirmed by salon manager with calendar invite
  RESCHEDULED         // Shifted to alternative date/slot
  IN_SALON_VISIT      // Client physically present at salon
  COMPLETED           // Consultation concluded / order commissioned
  CANCELLED           // Cancelled by client or salon
  NO_SHOW             // Client did not attend
}

// =========================================================================
// 2. FLAGSHIP SALONS & PRIVATE SUITES
// =========================================================================
model SalonLocation {
  slug               String              @id // "new-delhi-mehrauli", "mumbai-kala-ghoda", "london-mayfair"
  city               String              @db.VarChar(80)
  name               String              @db.VarChar(120) // e.g. "The Mehrauli Pavilion Flagship"
  address            String              @db.Text
  country            String              @db.VarChar(80)
  phone              String              @db.VarChar(40)
  email              String              @db.VarChar(120)
  googleMapsUrl      String?
  availableDays      Int[]               // [1, 2, 3, 4, 5, 6] (Monday to Saturday)
  timeSlots          String[]            // ["11:00 AM - 01:00 PM", "02:00 PM - 04:00 PM", "04:30 PM - 06:30 PM"]
  maxSimultaneous    Int                 @default(2) // Max concurrent private suites
  isActive           Boolean             @default(true)
  bookings           AtelierBooking[]
  stylists           StylistProfile[]
}

// =========================================================================
// 3. MASTER STYLISTS & DRAPERS
// =========================================================================
model StylistProfile {
  id                 String              @id @default(cuid())
  name               String              @db.VarChar(120)
  title              String              @db.VarChar(120) // e.g. "Senior Couture Draper & Historian"
  bio                String?             @db.Text
  salonLocationSlug  String
  salonLocation      SalonLocation       @relation(fields: [salonLocationSlug], references: [slug])
  avatarUrl          String
  isActive           Boolean             @default(true)
  assignedBookings   AtelierBooking[]
}

// =========================================================================
// 4. ROYAL CLIENT WEDDING DIARIES (VERIFIED SOCIAL PROOF)
// =========================================================================
model ClientDiaryEntry {
  id                 String              @id @default(cuid())
  slug               String              @unique // "radhika-devendra-udaipur"
  clientName         String              @db.VarChar(120) // e.g. "Radhika & Devendra"
  weddingLocation    String              @db.VarChar(150) // e.g. "The City Palace, Udaipur"
  weddingDate        DateTime            @db.Date
  headline           String              @db.VarChar(200) // e.g. "Poetry Woven in Silver and Moonlight"
  quote              String              @db.Text
  rating             Decimal             @default(5.0) @db.Decimal(2, 1)

  // Direct Relation to Canonical Product Catalog (Mandatory Rule 7)
  ensembleId         String
  ensemble           Product             @relation(fields: [ensembleId], references: [id])
  
  portraitImage      String              // High-res bride portrait
  venueImage         String?             // Architectural palace backdrop
  galleryImages      String[]            // CloudFront CDN URLs
  isFeatured         Boolean             @default(true)
  displayOrder       Int                 @default(0)
  createdAt          DateTime            @default(now())
  updatedAt          DateTime            @updatedAt

  @@index([isFeatured, displayOrder])
}

// =========================================================================
// 5. KARIGARI HERITAGE PILLARS
// =========================================================================
model CraftSanctumPillar {
  id                 String              @id @default(cuid())
  slug               String              @unique // "24k-gold-zari", "kashi-pitlooms", "awadhi-zardozi"
  title              String              @db.VarChar(120)
  subtitle           String              @db.VarChar(150)
  description        String              @db.Text
  statMetric         String              @db.VarChar(60) // "100% Hallmarked 24K Gold"
  statLabel          String              @db.VarChar(80) // "Certified Precious Metal Wefts"
  iconName           String              @db.VarChar(50)
  macroImage         String              // Macro weave inspection photo
  displayOrder       Int                 @default(0)
  isActive           Boolean             @default(true)
}
```

---

## 3. REST API Specification

### 3.1. Book an Appointment
- **Endpoint**: `POST /api/v1/atelier/book-appointment`
- **Rate Limit**: 5 requests per IP per 10 minutes (prevents bot spam)
- **Idempotency Key**: Supported via `Idempotency-Key` HTTP header

#### Request Payload:
```json
{
  "clientName": "Maharani Gayatri Devi",
  "email": "gayatri.devi@palace-mail.in",
  "phone": "+91 98200 12345",
  "locationSlug": "new-delhi-mehrauli",
  "experienceType": "BRIDAL_TROUSSEAU",
  "preferredDate": "2026-11-15",
  "preferredTimeSlot": "03:00 PM - 05:00 PM",
  "weddingDate": "2027-02-18",
  "budgetTier": "ROYAL_HERITAGE",
  "notes": "Looking for real gold zari red lehenga similar to the Gulnaar collection.",
  "interestedProductIds": ["monarch-001", "p-aw26-1"]
}
```

#### Response (201 Created):
```json
{
  "success": true,
  "data": {
    "bookingReference": "MNR-202611-8492",
    "status": "PENDING",
    "clientName": "Maharani Gayatri Devi",
    "salon": {
      "city": "New Delhi",
      "name": "The Mehrauli Pavilion Flagship",
      "address": "Ambawatta One, Kalka Das Marg, Mehrauli, New Delhi 110030"
    },
    "appointment": {
      "date": "2026-11-15",
      "timeSlot": "03:00 PM - 05:00 PM",
      "experience": "Bridal Trousseau Consultation"
    },
    "message": "Your private salon suite request has been received. Our Master Draper Concierge will contact you within 4 hours to finalize your itinerary."
  }
}
```

---

### 3.2. Get Verified Client Diaries
- **Endpoint**: `GET /api/v1/atelier/client-diary`
- **Cache Policy**: `s-maxage=3600, stale-while-revalidate=86400` (Fast CDN delivery)

#### Response (200 OK):
```json
{
  "success": true,
  "count": 4,
  "data": [
    {
      "id": "cd-001",
      "slug": "radhika-devendra-udaipur",
      "clientName": "Radhika & Devendra",
      "weddingLocation": "The City Palace, Udaipur",
      "weddingDate": "2026-02-14",
      "quote": "Standing under the palace arches in 24k gold woven Banarasi felt like wearing centuries of royal heritage. The drape was effortless poetry.",
      "portraitImage": "/images/panoramic/ensemble_vara.jpg",
      "ensemble": {
        "id": "monarch-001",
        "name": "Gulnaar Embroidered Zardozi Lehenga",
        "slug": "gulnaar-embroidered-zardozi-lehenga",
        "price": 285000,
        "formattedPrice": "₹ 2,85,000",
        "fabric": "Micro-Velvet & Tissue Organza",
        "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=70&w=600&auto=format&fit=crop"
      }
    }
  ]
}
```

---

## 4. CRM & Notification Pipeline Architecture

```
[ Frontend: AtelierSanctum.tsx ]
              │ (POST /api/v1/atelier/book-appointment)
              ▼
    [ Next.js API Route ]
              │ 1. Validate payload via Zod Schema
              │ 2. Check salon slot capacity
              ▼
    [ PostgreSQL Database via Prisma ]
              │ 3. Atomic Transaction (Write AtelierBooking record)
              ▼
    [ Background Job / Webhook Worker ]
     ├── WhatsApp Cloud API -> Sends instant royal concierge confirmation to client
     ├── SendGrid / AWS SES -> Sends calendar invite (.ics) with salon directions
     └── CRM Integration Webhook -> Pushes lead to Salesforce / Chatverce VIP pipeline
```

---

## 5. Security, Rate Limiting & Validation

1. **Zod Validation**:
   - Phone format: E.164 compliant international regex (`^\+?[1-9]\d{1,14}$`).
   - Email format: Strict RFC 5322 validation.
   - Date constraint: `preferredDate >= today + 24 hours` (prevents same-day unserviceable walk-ins).
2. **Anti-Bot Defense**:
   - Cloudflare Turnstile / Honeypot hidden fields to catch automated form fillers.
   - Upstash Redis token-bucket rate limiter: 5 requests per IP per 10 minutes.
3. **Data Privacy**:
   - Client phone numbers and wedding dates are masked in non-admin logs.
   - PII is encrypted at rest in PostgreSQL via pgcrypto AES-256.
