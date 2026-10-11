'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { FORMAT_CURRENCY } from '@/data/products';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lock,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, shippingCost, totalAmount, clearCart } = useCart();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: 'Maharani Radhika Devi',
    email: 'radhika@monarch-client.com',
    phone: '+91 98200 12345',
    address: 'Suite 402, Royal Residency, Worli Sea Face',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400018',
    country: 'India',
    occasionDate: '2026-11-20',
    specialBespokeNotes: 'Need blouse sleeve length extended to 11 inches with gota border.',
    courierOption: 'express',
    paymentMethod: 'upi',
    upiId: 'radhika@oksbi',
    cardNumber: '•••• •••• •••• 8842',
    cardExpiry: '08/29',
    cardCvc: '•••',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate random luxury order reference: e.g. MNRCH-2026-4921
    const orderId = `MNRCH-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    setTimeout(() => {
      clearCart();
      router.push(`/order-success/${orderId}`);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="bg-[#F7F0E5] min-h-screen pt-32 pb-24 text-monarch-charcoal flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <h1 className="font-serif text-3xl text-monarch-charcoal">No Items to Checkout</h1>
          <p className="text-xs text-monarch-charcoal/70">
            Your shopping bag is currently empty. Please add an ensemble before checking out.
          </p>
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider"
          >
            <span>Browse Collections</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Demo Mode Notice Badge */}
        <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-xl text-xs mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Bespoke Checkout Demonstration:</strong> No real funds will be charged. Payment &amp; address simulations are validated securely.
            </span>
          </div>
          <span className="font-nav uppercase text-[10px] tracking-wider bg-amber-200/80 px-2 py-0.5 rounded font-semibold">
            Demo Mode Active
          </span>
        </div>

        {/* Header & Step Tracker */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-monarch-gold/30 mb-8 gap-4">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon block font-semibold">
              Secure Royal Registry
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
              ROYAL ATELIER CHECKOUT
            </h1>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider">
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 1 ? 'bg-monarch-maroon text-monarch-ivory font-semibold' : 'bg-white text-monarch-charcoal border border-monarch-beige'
              }`}
            >
              1. Delivery
            </span>
            <span className="text-monarch-charcoal/40">&rarr;</span>
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 2 ? 'bg-monarch-maroon text-monarch-ivory font-semibold' : 'bg-white text-monarch-charcoal border border-monarch-beige'
              }`}
            >
              2. Bespoke Notes
            </span>
            <span className="text-monarch-charcoal/40">&rarr;</span>
            <span
              className={`px-3 py-1.5 rounded-full ${
                step === 3 ? 'bg-monarch-maroon text-monarch-ivory font-semibold' : 'bg-white text-monarch-charcoal border border-monarch-beige'
              }`}
            >
              3. Payment
            </span>
          </div>
        </div>

        {/* 2-Column Checkout Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Multi-Step Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-monarch-beige/80 shadow-md">
            {/* Step 1: Shipping Address & Contact */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-monarch-charcoal border-b border-monarch-beige/40 pb-3">
                  1. Recipient Contact &amp; Palace Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Phone (for VIP Courier coordination)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Email Address (for order tracking)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Street Address &amp; Suite / Villa
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      State / Region
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Pincode / Postal Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                    >
                      <option value="India">India</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Canada">Canada</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory font-nav text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Continue to Bespoke Notes</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Bespoke Tailoring Measurements & Occasion Date */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-monarch-charcoal border-b border-monarch-beige/40 pb-3">
                  2. Bespoke Tailoring &amp; Occasion Timeline
                </h3>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                    Occasion / Wedding Date (Allows us to prioritize handwork)
                  </label>
                  <input
                    type="date"
                    name="occasionDate"
                    value={formData.occasionDate}
                    onChange={handleInputChange}
                    className="w-full sm:w-1/2 px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                    Bespoke Tailoring Instructions &amp; Height / Sleeve Notes
                  </label>
                  <textarea
                    rows={4}
                    name="specialBespokeNotes"
                    value={formData.specialBespokeNotes}
                    onChange={handleInputChange}
                    placeholder="Provide measurements (Bust, Waist, Hips, Height in heels) or special requests for master karigar."
                    className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-sans"
                  />
                  <p className="text-[11px] text-monarch-charcoal/60 mt-1 font-sans">
                    Our head master draper will verify your notes and connect via video call if additional fittings are required.
                  </p>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 rounded-full border border-monarch-beige text-xs font-nav uppercase tracking-wider hover:bg-monarch-ivory"
                  >
                    Back to Address
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory font-nav text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-md"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method Simulator */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="space-y-6 animate-fadeIn">
                <h3 className="font-serif text-xl font-medium text-monarch-charcoal border-b border-monarch-beige/40 pb-3 flex items-center justify-between">
                  <span>3. Secure Payment Gateway Simulation</span>
                  <Lock className="w-4 h-4 text-monarch-gold-dark" />
                </h3>

                {/* Method selector radio pills */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'upi' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'upi'
                        ? 'border-monarch-maroon bg-monarch-maroon/5 ring-2 ring-monarch-maroon'
                        : 'border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    <QrCode className="w-6 h-6 text-monarch-maroon mb-2" />
                    <span className="font-serif text-sm font-semibold text-monarch-charcoal">
                      Instant UPI
                    </span>
                    <span className="text-[10px] text-monarch-charcoal/60 font-sans mt-0.5">
                      GPay, PhonePe, Paytm
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'card'
                        ? 'border-monarch-maroon bg-monarch-maroon/5 ring-2 ring-monarch-maroon'
                        : 'border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    <CreditCard className="w-6 h-6 text-monarch-maroon mb-2" />
                    <span className="font-serif text-sm font-semibold text-monarch-charcoal">
                      Cards
                    </span>
                    <span className="text-[10px] text-monarch-charcoal/60 font-sans mt-0.5">
                      Visa, Mastercard, Amex
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'netbanking' }))}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      formData.paymentMethod === 'netbanking'
                        ? 'border-monarch-maroon bg-monarch-maroon/5 ring-2 ring-monarch-maroon'
                        : 'border-monarch-beige hover:border-monarch-gold'
                    }`}
                  >
                    <Building className="w-6 h-6 text-monarch-maroon mb-2" />
                    <span className="font-serif text-sm font-semibold text-monarch-charcoal">
                      Royal Wire
                    </span>
                    <span className="text-[10px] text-monarch-charcoal/60 font-sans mt-0.5">
                      NetBanking / Concierge Wire
                    </span>
                  </button>
                </div>

                {/* Sub-form based on selection */}
                {formData.paymentMethod === 'upi' && (
                  <div className="bg-monarch-ivory p-4 rounded-xl border border-monarch-beige/80 space-y-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold">
                      UPI Virtual ID
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={formData.upiId}
                      onChange={handleInputChange}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full px-4 py-2.5 text-xs bg-white border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon"
                    />
                    <p className="text-[10px] text-monarch-charcoal/60 font-sans">
                      A payment request will be sent to your UPI application upon placing order.
                    </p>
                  </div>
                )}

                {formData.paymentMethod === 'card' && (
                  <div className="bg-monarch-ivory p-4 rounded-xl border border-monarch-beige/80 space-y-3">
                    <div>
                      <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 text-xs bg-white border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                          Expiry
                        </label>
                        <input
                          type="text"
                          name="cardExpiry"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-xs bg-white border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                          CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 text-xs bg-white border border-monarch-beige rounded-lg focus:outline-none focus:border-monarch-maroon font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'netbanking' && (
                  <div className="bg-monarch-ivory p-4 rounded-xl border border-monarch-beige/80 space-y-2 text-xs">
                    <p className="font-semibold text-monarch-maroon">
                      Private Client Bank Wire Coordination
                    </p>
                    <p className="text-[11px] text-monarch-charcoal/70">
                      Our boutique concierge will contact you with HDFC / Standard Chartered RTGS transfer coordinates for bespoke settlement.
                    </p>
                  </div>
                )}

                {/* Final Button */}
                <div className="pt-4 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 rounded-full border border-monarch-beige text-xs font-nav uppercase tracking-wider hover:bg-monarch-ivory"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="px-10 py-4 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory font-nav text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all shadow-xl hover:shadow-2xl disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-monarch-gold border-t-transparent rounded-full animate-spin" />
                        <span>Securing Royal Order...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-monarch-gold" />
                        <span>Authorize Order ({FORMAT_CURRENCY(totalAmount)})</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Itemized Summary & Trust Badges */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-32">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-monarch-beige/80 shadow-md space-y-6">
              <h3 className="font-serif text-xl font-medium text-monarch-charcoal border-b border-monarch-beige/60 pb-3 flex items-center justify-between">
                <span>Ensembles Reserved ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                <Link href="/cart" className="text-xs font-nav text-monarch-maroon underline font-normal">
                  Edit Bag
                </Link>
              </h3>

              {/* Items summary */}
              <div className="divide-y divide-monarch-beige/40 max-h-72 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex gap-3">
                    <div className="w-14 h-18 rounded-lg overflow-hidden bg-monarch-charcoal shrink-0 border border-monarch-beige">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between text-xs">
                      <div>
                        <h4 className="font-serif font-medium text-monarch-charcoal line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-[11px] text-monarch-charcoal/60 mt-0.5">
                          {item.selectedColor} · {item.selectedSize} (Qty: {item.quantity})
                        </p>
                      </div>
                      <span className="font-serif font-semibold text-monarch-maroon">
                        {FORMAT_CURRENCY(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 border-t border-monarch-beige/40 pt-4 text-xs font-sans text-monarch-charcoal/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-monarch-charcoal font-semibold">
                    {FORMAT_CURRENCY(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Privilege Courtesy</span>
                    <span>-{FORMAT_CURRENCY(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Transit</span>
                  <span className="font-serif text-monarch-charcoal font-semibold">
                    {shippingCost === 0 ? 'Complimentary' : FORMAT_CURRENCY(shippingCost)}
                  </span>
                </div>
                <div className="border-t-2 border-monarch-beige/60 pt-3 flex justify-between items-baseline font-serif font-bold text-monarch-maroon text-lg">
                  <span>Total Amount</span>
                  <span className="text-2xl">{FORMAT_CURRENCY(totalAmount)}</span>
                </div>
              </div>

              {/* Assurance Callout */}
              <div className="bg-monarch-ivory p-3.5 rounded-xl border border-monarch-beige/80 flex items-center gap-2.5 text-xs text-monarch-charcoal/80">
                <ShieldCheck className="w-4 h-4 text-monarch-gold-dark shrink-0" />
                <span>Complimentary Master Tailoring &amp; Alterations Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
