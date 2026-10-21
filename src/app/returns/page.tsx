import React from 'react';
import Link from 'next/link';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Returns & Exchanges — DRIFT by MONARCH',
  description: 'Exchange policies and satisfaction guarantee for royal handwoven silks.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Returns &amp; Exchanges
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Seamless exchange assistance handled by your personal concierge.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80 border-t border-monarch-gold/30 pt-8">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">7-Day Complimentary Exchange Window</h2>
            <p>
              Non-customized sarees, unstitched suit materials, and prêt wear can be exchanged within 7 days of delivery, provided original tags, hallmark silk seals, and luxury boxes remain untampered.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">Bespoke Bridal Couture Policy</h2>
            <p>
              Due to individual handcrafting and custom sizing, bespoke bridal lehengas and tailored sherwanis are non-refundable. However, we offer complimentary atelier alterations until the fit is impeccable.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon">How to Request an Exchange</h2>
            <p>
              Connect with our Royal Concierge via WhatsApp at <span className="font-medium text-monarch-maroon">+91 98765 43210</span> or write to <span className="font-medium text-monarch-maroon">concierge@drift-silks.com</span>. We arrange white-glove doorstep reverse pickup.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
