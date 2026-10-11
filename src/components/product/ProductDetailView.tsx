'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Product3DViewer } from '@/components/three/Product3DViewer';
import { SizeGuideModal } from './SizeGuideModal';
import { ProductCard } from './ProductCard';
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  Star,
  Box,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: Product;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Active view mode: Photography gallery or 3D interactive viewer
  const [viewMode, setViewMode] = useState<'gallery' | '3d'>(
    product.has3D ? '3d' : 'gallery'
  );

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Pincode Delivery Estimator
  const [pincode, setPincode] = useState('');
  const [deliveryResult, setDeliveryResult] = useState<{
    date: string;
    courier: string;
    isEligible: boolean;
  } | null>(null);

  // Accordions open states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    craft: true,
    fabric: false,
    shipping: false,
    heritage: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const inWishlist = isInWishlist(product.id);

  const handleColorChange = (color: { name: string; hex: string; imageIndex?: number }) => {
    setSelectedColor(color.name);
    if (color.imageIndex !== undefined) {
      setActiveImageIdx(color.imageIndex);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push('/checkout');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.trim().length < 5) return;

    // Calculate delivery date based on product.deliveryDays
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + (product.deliveryDays || 10));
    const formattedDate = deliveryDate.toLocaleDateString('en-IN', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });

    setDeliveryResult({
      date: formattedDate,
      courier: 'Royal Insured Express (Blue Dart / DHL Sovereign)',
      isEligible: true,
    });
  };

  // Related products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-charcoal/60 mb-8">
          <Link href="/" className="hover:text-monarch-maroon transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.gender}`}
            className="hover:text-monarch-maroon transition-colors capitalize"
          >
            {product.gender}
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-monarch-maroon transition-colors"
          >
            {product.categoryName}
          </Link>
          <span>/</span>
          <span className="text-monarch-maroon font-semibold">{product.name}</span>
        </nav>

        {/* Main Product Layout: Left Viewport (3D or Image Gallery), Right Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          {/* Left Column: Media Area (Gallery & 3D Viewer) */}
          <div className="lg:col-span-7 space-y-4 lg:sticky lg:top-28">
            {/* View Mode Switcher Pills (3D vs High-Res Editorial Photography) */}
            {product.has3D && (
              <div className="flex items-center justify-between bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-monarch-beige/80 max-w-sm">
                <button
                  onClick={() => setViewMode('3d')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-nav uppercase tracking-wider transition-all ${
                    viewMode === '3d'
                      ? 'bg-monarch-maroon text-monarch-ivory shadow font-medium'
                      : 'text-monarch-charcoal hover:text-monarch-maroon'
                  }`}
                >
                  <Box className="w-4 h-4 text-monarch-gold" />
                  <span>Interactive 3D View</span>
                </button>

                <button
                  onClick={() => setViewMode('gallery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-full text-xs font-nav uppercase tracking-wider transition-all ${
                    viewMode === 'gallery'
                      ? 'bg-monarch-maroon text-monarch-ivory shadow font-medium'
                      : 'text-monarch-charcoal hover:text-monarch-maroon'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 text-monarch-gold" />
                  <span>Editorial Gallery</span>
                </button>
              </div>
            )}

            {/* Media Content Box */}
            {viewMode === '3d' && product.has3D ? (
              <div>
                <Product3DViewer
                  productName={product.name}
                  primaryColor={
                    product.colors.find((c) => c.name === selectedColor)?.hex ||
                    product.model3DConfig?.primaryColor ||
                    '#5A1725'
                  }
                  accentColor={product.model3DConfig?.accentColor || '#C7A15B'}
                />
                <p className="text-[11px] text-monarch-charcoal/60 font-nav uppercase tracking-wider text-center mt-2">
                  Rotate 360° · Scroll to Zoom into Micro-Zari Weave
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Main Selected Image */}
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-monarch-charcoal shadow-xl border border-monarch-beige/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[activeImageIdx] || product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 text-xs font-nav uppercase tracking-wider bg-monarch-burgundy text-monarch-gold-light px-3.5 py-1.5 rounded-full border border-monarch-gold/40 shadow">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {product.images.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-20 sm:w-24 aspect-[3/4] rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                          activeImageIdx === idx
                            ? 'border-monarch-maroon ring-2 ring-monarch-gold scale-105'
                            : 'border-monarch-beige hover:border-monarch-gold opacity-75'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Garment Information & Ordering Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-gold-dark font-semibold">
                  {product.categoryName}
                </span>

                {/* Review Stars */}
                <div className="flex items-center gap-1.5 text-xs text-monarch-charcoal/80">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="font-semibold text-xs font-sans">
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl xl:text-5xl text-monarch-charcoal font-medium leading-tight">
                {product.name}
              </h1>

              <p className="font-serif italic text-base text-monarch-charcoal/80 mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-xl bg-white border border-monarch-beige/70 space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-monarch-maroon">
                  {FORMAT_CURRENCY(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-sans text-sm line-through text-monarch-charcoal/40">
                    {FORMAT_CURRENCY(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-nav uppercase tracking-wider text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>
              <p className="text-[11px] text-monarch-charcoal/60 font-sans">
                Inclusive of all custom handcraft taxes. Complimentary bespoke fitting included.
              </p>
            </div>

            {/* Color Swatch Selection */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-2.5">
                Colorway: <span className="text-monarch-charcoal font-normal">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorChange(color)}
                    className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                      selectedColor === color.name
                        ? 'border-monarch-maroon bg-white shadow-sm ring-1 ring-monarch-maroon'
                        : 'border-monarch-beige bg-white/60 hover:border-monarch-gold'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs font-sans text-monarch-charcoal">
                      {color.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold">
                  Select Size
                </label>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-monarch-maroon hover:text-monarch-gold-dark flex items-center gap-1 font-nav underline"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size &amp; Fit Guide</span>
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2.5 px-3 rounded-lg text-xs font-nav uppercase tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'bg-monarch-maroon text-monarch-ivory border-monarch-maroon font-semibold shadow'
                        : 'bg-white text-monarch-charcoal border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-monarch-beige rounded-full bg-white px-3 py-2">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-monarch-charcoal hover:text-monarch-maroon px-2 text-sm"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 font-nav text-xs font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-monarch-charcoal hover:text-monarch-maroon px-2 text-sm"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Bag */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className="flex-1 py-3.5 px-6 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory border border-monarch-gold/50 font-nav text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-monarch-gold-light" />
                      <span>Added to Royal Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Royal Bag</span>
                    </>
                  )}
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3.5 rounded-full border transition-all ${
                    inWishlist
                      ? 'bg-monarch-maroon text-monarch-gold border-monarch-maroon shadow'
                      : 'bg-white text-monarch-charcoal border-monarch-beige hover:border-monarch-maroon'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-monarch-gold' : ''}`} />
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3.5 px-6 rounded-full bg-monarch-gold hover:bg-monarch-gold-light text-monarch-burgundy font-nav text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Buy Now · Express Checkout</span>
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="bg-white p-5 rounded-2xl border border-monarch-beige/70 space-y-3">
              <div className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold">
                <Truck className="w-4 h-4" />
                <span>Estimate Royal Delivery</span>
              </div>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 110001)"
                  maxLength={6}
                  className="flex-1 px-4 py-2 bg-monarch-ivory text-xs border border-monarch-beige rounded-full font-nav focus:outline-none focus:border-monarch-maroon"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-monarch-charcoal hover:bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider rounded-full transition-colors"
                >
                  Check
                </button>
              </form>

              {deliveryResult && (
                <div className="p-3 bg-monarch-ivory rounded-xl border border-monarch-beige/80 text-xs space-y-1">
                  <p className="font-semibold text-monarch-maroon flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                    Estimated Delivery by {deliveryResult.date}
                  </p>
                  <p className="text-[11px] text-monarch-charcoal/70 font-sans">
                    Via {deliveryResult.courier} with signature on receipt.
                  </p>
                </div>
              )}
            </div>

            {/* Accordions: Craftsmanship, Care, Delivery */}
            <div className="divide-y divide-monarch-beige/60 border-y border-monarch-beige/60">
              {/* Accordion 1: Craftsmanship Details */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('craft')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-monarch-charcoal font-medium"
                >
                  <span>Craftsmanship &amp; Heritage Embroidery</span>
                  <ChevronDown
                    className={`w-4 h-4 text-monarch-gold-dark transition-transform ${
                      openAccordions.craft ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.craft && (
                  <div className="pt-3 text-xs text-monarch-charcoal/80 font-sans space-y-2 leading-relaxed">
                    <p>{product.description}</p>
                    <p>
                      <strong className="text-monarch-charcoal font-medium">Embroidery:</strong>{' '}
                      {product.embroidery}
                    </p>
                    <p>
                      <strong className="text-monarch-charcoal font-medium">Loom Story:</strong>{' '}
                      {product.craftsmanshipStory}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Fabric & Care */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('fabric')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-monarch-charcoal font-medium"
                >
                  <span>Fabric &amp; Garment Care</span>
                  <ChevronDown
                    className={`w-4 h-4 text-monarch-gold-dark transition-transform ${
                      openAccordions.fabric ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.fabric && (
                  <div className="pt-3 text-xs text-monarch-charcoal/80 font-sans space-y-2 leading-relaxed">
                    <p>
                      <strong className="text-monarch-charcoal font-medium">Fabric Composition:</strong>{' '}
                      {product.fabric}
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((instruction, idx) => (
                        <li key={idx}>{instruction}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Delivery & Returns */}
              <div className="py-4">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between text-left font-serif text-lg text-monarch-charcoal font-medium"
                >
                  <span>Insured Shipping &amp; Royal Guarantee</span>
                  <ChevronDown
                    className={`w-4 h-4 text-monarch-gold-dark transition-transform ${
                      openAccordions.shipping ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.shipping && (
                  <div className="pt-3 text-xs text-monarch-charcoal/80 font-sans space-y-2 leading-relaxed">
                    <p>
                      Each order travels in a tamper-sealed, cedarwood-treated luxury presentation box with climate-proof inner casing.
                    </p>
                    <p>
                      Complimentary bespoke alterations are supported at any of our flagship boutiques in Delhi, Mumbai, or through our courier alteration network.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Complete the Royal Look / Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-monarch-gold/30">
            <div className="text-center mb-10 space-y-2">
              <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon font-semibold">
                Curated Ensemble
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
                COMPLETE THE ROYAL LOOK
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        gender={product.gender}
      />
    </div>
  );
};
