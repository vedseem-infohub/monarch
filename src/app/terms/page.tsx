import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — DRIFT by MONARCH',
  description: 'Terms and conditions for purchasing royal handwoven silks and bespoke couture at DRIFT.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80 border-t border-monarch-gold/30 pt-8">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">1. Ancestral Craftsmanship &amp; Authenticity</h2>
            <p>
              Every ensemble presented by DRIFT is authentically woven on traditional pit looms and hand-embroidered by certified generational karigars. Because of the handmade nature of pure mulberry silk and silver-gilt zari, subtle textural nuances are celebrations of genuine human touch.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">2. Bespoke Orders &amp; Custom Sizing</h2>
            <p>
              Custom-fitted bridal lehengas, made-to-measure blouses, and bespoke sherwanis enter production upon receipt of confirmed measurements and advance deposit.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">3. Insured Domestic &amp; Global Transit</h2>
            <p>
              All shipments are dispatched via fully insured luxury logistics carriers with discreet tamper-evident royal packaging and dedicated concierge tracking.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
