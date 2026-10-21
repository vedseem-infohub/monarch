import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — DRIFT by MONARCH',
  description: 'How DRIFT safeguards your personal details and royal bridal registries.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Privacy Policy
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Last Updated: January 2026
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80 border-t border-monarch-gold/30 pt-8">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">1. Information We Collect</h2>
            <p>
              We collect contact information, shipping destinations, fitting measurements, and correspondence details exclusively to fulfill orders, arrange atelier consultations, and deliver bespoke bridal garments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">2. Confidentiality Guarantee</h2>
            <p>
              DRIFT never sells or rents client data. All payment details are processed through encrypted Level-1 PCI DSS compliant gateways.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
