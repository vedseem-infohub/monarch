'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { FORMAT_CURRENCY } from '@/data/products';
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, Tag } from 'lucide-react';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
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

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({
      type: res.success ? 'success' : 'error',
      text: res.message,
    });
    if (res.success) setPromoInput('');
  };

  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#240E14] text-monarch-ivory border-l border-monarch-gold/30 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-monarch-gold/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-wider text-monarch-ivory">Royal Shopping Bag</span>
              <span className="text-xs font-nav px-2 py-0.5 rounded-full bg-monarch-gold/20 text-monarch-gold border border-monarch-gold/30">
                {cart.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-monarch-beige hover:text-monarch-ivory p-1.5 rounded-full border border-monarch-gold/20 hover:border-monarch-gold transition-colors"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-monarch-burgundy/80 px-6 py-3 border-b border-monarch-gold/20 text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-monarch-beige">
                Add <span className="font-semibold text-monarch-gold-light">{FORMAT_CURRENCY(remainingForFreeShipping)}</span> for complimentary royal courier delivery.
              </p>
            ) : (
              <p className="text-monarch-gold-light font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
                Complimentary Worldwide Insured Delivery Unlocked!
              </p>
            )}
            <div className="w-full bg-monarch-charcoal/80 h-1.5 rounded-full mt-2 overflow-hidden border border-monarch-gold/20">
              <div
                className="bg-gradient-to-r from-monarch-gold to-monarch-gold-light h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-monarch-gold/15">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full border border-monarch-gold/30 flex items-center justify-center text-monarch-gold mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-monarch-ivory">Your Royal Bag is Empty</h3>
                <p className="text-xs text-monarch-beige/70 mt-2 max-w-xs font-sans">
                  Immerse yourself in our handcrafted wedding edits and heritage couture.
                </p>
                <Link
                  href="/collections/all"
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-monarch-gold text-monarch-burgundy font-nav text-xs font-semibold uppercase tracking-wider hover:bg-monarch-gold-light transition-all"
                >
                  <span>Explore The Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 rounded-lg overflow-hidden shrink-0 bg-monarch-charcoal border border-monarch-gold/20 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.product.id}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-serif text-sm font-medium text-monarch-ivory hover:text-monarch-gold-light transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-monarch-beige/50 hover:text-red-400 p-0.5 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[11px] text-monarch-beige/80 font-sans">
                        <span>Color: {item.selectedColor}</span>
                        <span>·</span>
                        <span>Size: {item.selectedSize}</span>
                      </div>

                      <p className="font-serif text-sm text-monarch-gold-light font-semibold mt-1">
                        {FORMAT_CURRENCY(item.product.price)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-monarch-gold/30 rounded-full bg-monarch-burgundy/60">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-monarch-gold transition-colors text-monarch-beige"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-nav font-medium text-monarch-ivory">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-monarch-gold transition-colors text-monarch-beige"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif text-xs text-monarch-beige">
                        Total: {FORMAT_CURRENCY(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-monarch-gold/25 bg-[#1F0A11] space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-monarch-gold/60" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Courtesy Promo (e.g. ROYAL10)"
                    className="w-full pl-9 pr-3 py-1.5 bg-monarch-burgundy text-xs uppercase font-nav text-monarch-ivory border border-monarch-gold/30 rounded-full focus:outline-none focus:border-monarch-gold"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-monarch-maroon hover:bg-monarch-maroon-light text-xs font-nav uppercase tracking-wider text-monarch-ivory border border-monarch-gold/40 rounded-full transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p
                  className={`text-[11px] font-sans ${
                    promoMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs bg-monarch-burgundy px-3 py-1.5 rounded-lg border border-monarch-gold/30 text-monarch-gold-light">
                  <span>Code Applied: <strong>{appliedPromo.code}</strong></span>
                  <button
                    onClick={removePromo}
                    className="text-monarch-beige/70 hover:text-red-400 text-[10px] underline"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-monarch-beige">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-monarch-ivory">{FORMAT_CURRENCY(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Privilege Courtesy</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Delivery</span>
                  <span className="font-serif text-monarch-ivory">
                    {shippingCost === 0 ? (
                      <span className="text-monarch-gold-light uppercase text-[10px] font-nav">
                        Complimentary
                      </span>
                    ) : (
                      FORMAT_CURRENCY(shippingCost)
                    )}
                  </span>
                </div>
                <div className="border-t border-monarch-gold/20 pt-2 flex justify-between text-base font-serif text-monarch-ivory font-medium">
                  <span>Grand Total</span>
                  <span className="text-monarch-gold-light">{FORMAT_CURRENCY(totalAmount)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 pt-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-6 rounded-full bg-monarch-gold hover:bg-monarch-gold-light text-monarch-burgundy font-nav text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-monarch-gold/20"
                >
                  <span>Proceed to Royal Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-between">
                  <Link
                    href="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="text-[11px] font-nav uppercase tracking-wider text-monarch-beige/80 hover:text-monarch-ivory underline"
                  >
                    View Bag Details
                  </Link>

                  <div className="flex items-center gap-1 text-[10px] text-monarch-beige/60">
                    <ShieldCheck className="w-3.5 h-3.5 text-monarch-gold" />
                    <span>Insured Heritage Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
