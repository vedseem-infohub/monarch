'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FORMAT_CURRENCY } from '@/data/products';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Sparkles,
  Gift,
  ArrowLeft,
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingCost,
    totalAmount,
    freeShippingThreshold,
    appliedPromo,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [giftBoxOption, setGiftBoxOption] = useState(true);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;
    const res = applyPromo(promoCode);
    setPromoFeedback({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) setPromoCode('');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F0E5] min-h-screen pt-32 pb-24 text-monarch-charcoal flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-2 border-monarch-gold flex items-center justify-center text-monarch-maroon mx-auto">
            <Sparkles className="w-10 h-10" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
            Your Royal Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-monarch-charcoal/70 font-sans leading-relaxed">
            You have not yet reserved any handcrafted ensembles in your royal bag. Explore our bridal vaults and bespoke sherwanis.
          </p>
          <div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory text-xs font-nav uppercase tracking-widest font-semibold transition-all shadow-lg"
            >
              <span>Explore Archival Collections</span>
              <ArrowRight className="w-4 h-4 text-monarch-gold" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-monarch-gold/30 mb-8">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon block mb-1 font-semibold">
              The Royal Chamber
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-monarch-charcoal font-medium">
              YOUR SHOPPING BAG
            </h1>
          </div>
          <Link
            href="/collections/all"
            className="text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:underline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Free Shipping Alert Bar */}
        <div className="bg-white p-4 rounded-xl border border-monarch-beige/80 mb-8 shadow-sm">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-nav text-monarch-charcoal">
              {remainingForFreeShipping > 0 ? (
                <>
                  Add <strong className="text-monarch-maroon">{FORMAT_CURRENCY(remainingForFreeShipping)}</strong> more for complimentary royal insured courier delivery.
                </>
              ) : (
                <span className="text-monarch-maroon font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-monarch-gold-dark" />
                  Complimentary Worldwide Insured Delivery Unlocked!
                </span>
              )}
            </span>
            <span className="font-nav text-monarch-charcoal/60">{progressPercent}%</span>
          </div>
          <div className="w-full bg-monarch-beige/40 h-2 rounded-full overflow-hidden">
            <div
              className="bg-monarch-maroon h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 2-Column Bag Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Items List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-2xl border border-monarch-beige/80 overflow-hidden shadow-sm divide-y divide-monarch-beige/40">
              {cart.map((item) => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-start">
                  {/* Thumbnail */}
                  <Link
                    href={`/product/${item.product.id}`}
                    className="w-28 sm:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-monarch-charcoal shrink-0 border border-monarch-beige/80 block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold-dark font-semibold">
                            {item.product.categoryName}
                          </span>
                          <Link
                            href={`/product/${item.product.id}`}
                            className="font-serif text-xl text-monarch-charcoal hover:text-monarch-maroon font-medium block mt-0.5"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-monarch-charcoal/40 hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Variant Specs */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-sans text-monarch-charcoal/80">
                        <span className="bg-monarch-ivory px-2.5 py-1 rounded border border-monarch-beige/60">
                          Color: <strong>{item.selectedColor}</strong>
                        </span>
                        <span className="bg-monarch-ivory px-2.5 py-1 rounded border border-monarch-beige/60">
                          Size: <strong>{item.selectedSize}</strong>
                        </span>
                      </div>

                      <p className="text-xs text-monarch-charcoal/60 font-sans mt-2">
                        Fabric: {item.product.fabric}
                      </p>
                    </div>

                    {/* Bottom row: Quantity and Total */}
                    <div className="flex items-center justify-between pt-4 border-t border-monarch-beige/40">
                      <div className="flex items-center border border-monarch-beige rounded-full bg-monarch-ivory px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="text-monarch-charcoal hover:text-monarch-maroon px-2 text-sm"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-nav font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="text-monarch-charcoal hover:text-monarch-maroon px-2 text-sm"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-xl font-bold text-monarch-maroon">
                          {FORMAT_CURRENCY(item.product.price * item.quantity)}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[11px] text-monarch-charcoal/50 block font-sans">
                            ({FORMAT_CURRENCY(item.product.price)} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Complimentary Luxury Presentation Gift Box Option */}
            <div className="bg-white p-6 rounded-2xl border border-monarch-beige/80 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-monarch-ivory border border-monarch-gold flex items-center justify-center text-monarch-gold-dark">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-monarch-charcoal font-medium">
                    Complimentary Royal Keepsake Presentation Box
                  </h4>
                  <p className="text-xs text-monarch-charcoal/70 font-sans">
                    Hand-crafted cedarwood-lined rigid keepsake box with golden seal and satin ribbon.
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftBoxOption}
                onChange={(e) => setGiftBoxOption(e.target.checked)}
                className="w-5 h-5 accent-monarch-maroon rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Right: Order Summary Card */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-monarch-beige/80 shadow-md space-y-6">
              <h3 className="font-serif text-2xl text-monarch-charcoal font-medium border-b border-monarch-beige/60 pb-4">
                Order Summary
              </h3>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-monarch-charcoal/40" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Promo Code (ROYAL10)"
                      className="w-full pl-9 pr-3 py-2 text-xs font-nav uppercase bg-monarch-ivory border border-monarch-beige rounded-full focus:outline-none focus:border-monarch-maroon"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-monarch-charcoal hover:bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider rounded-full transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {promoFeedback && (
                  <p
                    className={`text-xs ${
                      promoFeedback.type === 'success' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {promoFeedback.text}
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-green-50 p-2.5 rounded-lg border border-green-200 text-green-800">
                    <span>
                      Privilege Applied: <strong>{appliedPromo.code}</strong>
                    </span>
                    <button
                      onClick={removePromo}
                      className="text-red-600 hover:underline font-nav text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </form>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-xs text-monarch-charcoal/80 font-sans border-t border-monarch-beige/40 pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-serif text-sm font-semibold text-monarch-charcoal">
                    {FORMAT_CURRENCY(subtotal)}
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Royal Privilege Discount</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Insured Courier Delivery</span>
                  <span className="font-serif text-sm font-semibold text-monarch-charcoal">
                    {shippingCost === 0 ? (
                      <span className="text-green-700 font-nav uppercase text-[10px]">
                        Complimentary
                      </span>
                    ) : (
                      FORMAT_CURRENCY(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Royal Presentation Packaging</span>
                  <span className="text-green-700 font-nav uppercase text-[10px]">
                    Complimentary
                  </span>
                </div>

                <div className="border-t-2 border-monarch-beige/60 pt-3 flex justify-between items-baseline text-lg font-serif font-bold text-monarch-maroon">
                  <span>Total Due</span>
                  <span className="text-2xl">{FORMAT_CURRENCY(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  className="w-full py-4 px-6 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory border border-monarch-gold/60 font-nav text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-2xl"
                >
                  <span>Proceed to Royal Checkout</span>
                  <ArrowRight className="w-4 h-4 text-monarch-gold" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[11px] text-monarch-charcoal/60 font-sans text-center">
                  <ShieldCheck className="w-4 h-4 text-monarch-gold-dark shrink-0" />
                  <span>Insured Transit Guarantee &amp; Discreet Courier</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
