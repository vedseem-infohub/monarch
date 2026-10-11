# MONARCH — Premium 3D Indian Ethnic Wear E-Commerce Website

> **“A Legacy Woven in Elegance.”**

**MONARCH** is a luxury Indian ethnic wear fashion house combining royal Indian heritage, traditional craftsmanship, intricate zari embroidery, luxurious textiles, and contemporary 3D digital experiences.

---

## 1. Visual Design System

### Royal Heritage Palette
- **Royal Maroon:** `#5A1725` (Primary accents, important call-to-actions, luxury badges)
- **Deep Burgundy:** `#291116` (Hero atmospheric backgrounds, drawer panels, night vaults)
- **Antique Gold:** `#C7A15B` (Metallic highlights, jewelry ornaments, filigree borders)
- **Antique Gold Light:** `#DFBE7F` (Shimmer effects, active tabs, illuminated trims)
- **Warm Ivory:** `#F7F0E5` (Editorial background surfaces, clean catalog canvases)
- **Sand Beige:** `#D9C8B0` (Card borders, dividers, subtle accents)
- **Charcoal:** `#211D1A` (Primary body typography and high-contrast structural text)

### Typography Hierarchy
- **Headings & Display:** Cormorant Garamond & Playfair Display (via `next/font/google`)
- **Body & Editorial:** Inter & DM Sans
- **Navigation & Badges:** Poppins (understated uppercase, letter-spaced)

---

## 2. Interactive 3D Experiences

Powered by **Three.js**, **@react-three/fiber**, and **@react-three/drei** with dynamic SSR-safe client wrappers (`ssr: false`):

1. **Hero 3D Showcase (`HeroScene.tsx`, `RoyalMannequin.tsx`):**
   - Architectural palace archway backdrop with warm key light, back rim light, and ambient burgundy fill.
   - Sculpted royal couture mannequin in crimson velvet and antique gold zari brocade, kamarbandh sash with emerald buckle, dual-strand pearl necklace (*haar*), and royal crest brooch.
   - Atmospheric floating gold particles (`GoldParticles.tsx`).
   - Smooth drag-to-rotate OrbitControls with damping and pointer parallax response.
   - Interactive colorway switcher dynamically updating 3D velvet shader colors in real time.

2. **3D Craftsmanship Specimen ("BEAUTY IN EVERY THREAD"):**
   - Interactive 3D woven medallion showcasing intricate lotus relief petals, 24k gold zari filigree, and royal emerald core.
   - Clickable 3D hotspot pins detailing *24K Gold Zari Weft*, *Imperial Dabka & Nakshi*, and *Pure Mulberry Silk Warp*.

3. **360° Garment Viewer on Product Detail Page (`Product3DViewer.tsx`):**
   - 360-degree rotation, zoom, camera reset, angle presets (Front, Profile, Back, Embroidery Detail).
   - Seamless toggle between High-Res Editorial Photography and Interactive 3D Canvas.

---

## 3. Architecture & Features

### Navigation & Header
- Configurable, dismissible **Royal Announcement Bar**.
- **Transparent-to-Burgundy Sticky Header** with transition on scroll.
- **Rich MegaMenu** with visual category cards for Women, Men, and Wedding Edit.
- **Full-Screen Instant Search Overlay** with query autocomplete and live product results.
- **Slide-Over Royal Shopping Bag Drawer** with quantity controls and free shipping progress meter.

### Product Collections & Filtering
- Dedicated routes: `/collections`, `/collections/[category]`, `/women`, `/men`, `/wedding`.
- Multi-faceted interactive filters:
  - Gender (Women / Men)
  - Category selector
  - Real-time Price slider (₹50,000 – ₹3,50,000)
  - Size pills (XS, S, M, L, XL, Custom Bespoke)
  - Color swatches
  - Occasion tags (Bridal, Wedding, Sangeet, Reception, Festive, Royal Gala)
- Sorting: Featured Royal Edit, Newest Arrivals, Price Low-to-High, Price High-to-Low, Highest Rated.
- Layout switcher (3-column vs 4-column).

### Product Detail Page (`/product/[id]`)
- Multi-angle gallery with thumbnail strip.
- Interactive 3D Garment inspection tab.
- Color swatches linked to gallery views.
- Size selector with bespoke custom sizing option.
- **Royal Atelier Size Guide modal** with imperial and metric dimensions.
- **Pincode Delivery Estimator** calculating realistic courier dates across India and worldwide.
- Add to Bag, instant Buy Now, Wishlist toggle.
- Expandable accordions for Craftsmanship, Fabric & Care, Delivery & Returns.
- Curated "Complete the Royal Look" recommendations.

### Cart & Multi-Step Checkout Flow
- Persistent cart state in `localStorage`.
- Courtesy promo code engine (`ROYAL10`, `MONARCH15`, `WEDDING2026`).
- Multi-step checkout simulator:
  1. Recipient contact & palace address
  2. Bespoke measurements & wedding occasion date
  3. Insured courier speed
  4. Payment simulation (Instant UPI, Cards, Royal Concierge Wire)
- Order success screen with celebratory confetti (`canvas-confetti`), unique commission ID, and printable receipt.

### VIP Concierge & Heritage Pages
- `/our-craft`: Deep-dive into Banarasi pit-loom weaving, Awadhi zardozi, and Kashmiri tilla.
- `/account`: VIP Bridal Salon appointment booking form and past orders list.
- `/wishlist`: Dedicated gallery for saved luxury ensembles.

---

## 4. Getting Started Locally

### Prerequisites
- Node.js 18+ or 20+ (Verified on Node v22)
- npm 9+ or 10+

### Installation
```bash
# Clone the repository
cd monarch

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Adding Authentic GLB/GLTF Garment Models

To display custom 3D scans or CAD garments created in Clo3D, Marvelous Designer, or Blender:

1. Export your model in `.glb` format (compressed with Draco or Meshopt for optimal web performance).
2. Place the `.glb` file in `public/models/` (e.g. `public/models/royal-sherwani.glb`).
3. Load the model using `@react-three/drei`'s `useGLTF`:

```tsx
import { useGLTF } from '@react-three/drei';

export function GarmentModel({ url = '/models/royal-sherwani.glb' }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.2} position={[0, -1, 0]} />;
}

useGLTF.preload('/models/royal-sherwani.glb');
```

4. Set `has3D: true` and specify the model path in `src/data/products.ts`.

---

## 6. Commerce Backend Integration

The application uses clean decoupled service layers and context providers:

- **Shopify Storefront API:**
  Replace `src/data/products.ts` queries with GraphQL calls to the Shopify Storefront API using `@shopify/storefront-api-client`.
- **MedusaJS:**
  Connect `src/context/CartContext.tsx` to Medusa's `@medusajs/medusa-js` client for headless inventory, region-based pricing, and tax calculation.
- **Payment Gateways:**
  Initialize Razorpay Checkout (`Razorpay.js`) or Stripe Elements inside `src/app/checkout/page.tsx` using `NEXT_PUBLIC_RAZORPAY_KEY_ID` or `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

---

## 7. Production Build & Deployment

Build the optimized production bundle:
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
npx vercel
```
Or link the repository to Vercel / Netlify / AWS Amplify for automatic CI/CD deployments.
