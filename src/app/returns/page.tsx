'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

const DEFAULT_POLICY = {
  title: 'Returns & Exchanges',
  subtitle: 'Seamless exchange assistance handled by your personal concierge.',
  exchangeWindowDays: 7,
  exchangeWindowDescription:
    'Non-customized sarees, unstitched suit materials, and prêt wear can be exchanged within 7 days of delivery, provided original tags, hallmark silk seals, and luxury boxes remain untampered.',
  bespokePolicyHeadline: 'Bespoke Bridal Couture Policy',
  bespokePolicyDescription:
    'Due to individual handcrafting and custom sizing, bespoke bridal lehengas and tailored sherwanis are non-refundable. However, we offer complimentary atelier alterations until the fit is impeccable.',
  exchangeStepsHeadline: 'How to Request an Exchange',
  exchangeStepsDescription:
    'Connect with our Royal Concierge via WhatsApp or email. We arrange white-glove doorstep reverse pickup.',
  conciergeWhatsApp: '+91 98765 43210',
  conciergeEmail: 'concierge@drift-silks.com',
  sections: [
    {
      title: 'Complimentary Master Tailoring Alterations',
      content:
        'MONARCH provides complimentary fitting adjustments across all handwoven ensembles at our flagship ateliers in Mumbai, New Delhi, Jaipur, and Bengaluru.',
    },
    {
      title: 'Tamper-Proof Seal Guarantee',
      content:
        'Each saree and lehenga is encased with a serialized 24K gold foil security seal. Exchanges can be processed only if the security seal remains untampered.',
    },
  ],
};

export default function ReturnsPage() {
  const [policy, setPolicy] = useState(DEFAULT_POLICY);

  useEffect(() => {
    // 1. Try localStorage if set by admin
    try {
      const stored = localStorage.getItem('cms_returns_policy');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.title) {
          setPolicy((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}

    // 2. Try fetching from backend settings API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    fetch(`${apiUrl}/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const remotePolicy = data?.settings?.returnsPolicy || data?.returnsPolicy;
        if (remotePolicy && remotePolicy.title) {
          setPolicy((prev) => ({ ...prev, ...remotePolicy }));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline"
          >
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            {policy.title}
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            {policy.subtitle}
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-monarch-charcoal/80 border-t border-monarch-gold/30 pt-8">
          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon font-semibold">
              {policy.exchangeWindowDays}-Day Complimentary Exchange Window
            </h2>
            <p>{policy.exchangeWindowDescription}</p>
          </section>

          <section className="space-y-2">
            <h2 className="font-serif text-xl text-monarch-maroon font-semibold">
              {policy.bespokePolicyHeadline}
            </h2>
            <p>{policy.bespokePolicyDescription}</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-monarch-maroon font-semibold">
              {policy.exchangeStepsHeadline}
            </h2>
            <p>{policy.exchangeStepsDescription}</p>
            <div className="p-4 bg-white rounded-xl border border-monarch-beige flex flex-col sm:flex-row gap-4 text-xs font-sans">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-monarch-maroon shrink-0" />
                <span>
                  <strong>WhatsApp Concierge:</strong>{' '}
                  <span className="text-monarch-maroon font-semibold">{policy.conciergeWhatsApp}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-monarch-maroon shrink-0" />
                <span>
                  <strong>Email:</strong>{' '}
                  <span className="text-monarch-maroon font-semibold">{policy.conciergeEmail}</span>
                </span>
              </div>
            </div>
          </section>

          {policy.sections &&
            policy.sections.map((sec: any, i: number) => (
              <section key={i} className="space-y-2 pt-4 border-t border-monarch-beige/60">
                <h2 className="font-serif text-lg text-monarch-maroon font-semibold">{sec.title}</h2>
                <p className="text-xs text-monarch-charcoal/80 leading-relaxed">{sec.content}</p>
              </section>
            ))}
        </div>
      </div>
    </div>
  );
}
