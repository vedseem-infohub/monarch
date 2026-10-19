import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery — DRIFT by MONARCH',
  description: 'Global insured courier delivery details for handwoven silks and couture.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Shipping &amp; Delivery
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Insured white-glove delivery across 45+ countries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-monarch-gold/30">
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 border border-monarch-gold/20">
            <Truck className="w-6 h-6 text-monarch-maroon mb-2" />
            <h3 className="font-serif font-medium text-sm">Complimentary Transit</h3>
            <p className="text-xs text-monarch-charcoal/70 mt-1">On all domestic orders above ₹25,000</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 border border-monarch-gold/20">
            <Clock className="w-6 h-6 text-monarch-maroon mb-2" />
            <h3 className="font-serif font-medium text-sm">Express Dispatch</h3>
            <p className="text-xs text-monarch-charcoal/70 mt-1">Ready-to-wear ships within 2-4 business days</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/60 border border-monarch-gold/20">
            <ShieldCheck className="w-6 h-6 text-monarch-maroon mb-2" />
            <h3 className="font-serif font-medium text-sm">Insured Delivery</h3>
            <p className="text-xs text-monarch-charcoal/70 mt-1">Full transit insurance on all precious parcels</p>
          </div>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">Domestic Deliveries (India)</h2>
            <p>
              Parcels are transported via Blue Dart Express or DHL with real-time OTP verification at delivery. Typical transit time is 2-4 business days across metro cities.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">International Deliveries</h2>
            <p>
              We deliver globally via DHL Express Luxury Logistics to the United States, United Kingdom, UAE, Singapore, Canada, Australia, and European destinations within 5-8 business days.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
