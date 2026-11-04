'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

const DEFAULT_FAQS = [
  {
    q: 'How can I verify the authenticity of the zari and silk?',
    a: 'All our heirloom sarees carry an authenticated Silk Mark certificate and a hallmarked karigar guild certificate guaranteeing pure mulberry silk and certified gold/silver zari.',
    category: 'Authenticity & Hallmarks',
  },
  {
    q: 'Can I request bespoke blouse stitching or dupatta tassels?',
    a: 'Yes, our Master Karigar Atelier provides complimentary custom blouse stitching, fall/pico finishing, and latkan tassel ornamentation with your preferred neckline specifications.',
    category: 'Bespoke & Tailoring',
  },
  {
    q: 'How do I care for my royal handwoven silk saree?',
    a: 'We advise dry cleaning exclusively at specialized heritage textile care services. Store your saree wrapped in breathable pure unbleached muslin cotton cloth away from direct sunlight.',
    category: 'Care & Preservation',
  },
  {
    q: 'Can I request custom sizing before placing an order?',
    a: 'Absolutely. We offer dedicated online size guidance, custom blouse tailoring, and white-glove support through our royal patron concierge.',
    category: 'Bespoke & Tailoring',
  },
];

export default function FaqsPage() {
  const [faqs, setFaqs] = useState<{ q: string; a: string; category?: string }[]>(DEFAULT_FAQS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    // 1. Try localStorage if set by admin
    try {
      const stored = localStorage.getItem('cms_faqs');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setFaqs(
            parsed.map((item: any) => ({
              q: item.question || item.q,
              a: item.answer || item.a,
              category: item.category || 'General',
            }))
          );
        }
      }
    } catch {}

    // 2. Try fetching from backend settings API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    fetch(`${apiUrl}/settings`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const remoteFaqs = data?.settings?.faqs || data?.faqs;
        if (Array.isArray(remoteFaqs) && remoteFaqs.length > 0) {
          setFaqs(
            remoteFaqs.map((item: any) => ({
              q: item.question || item.q,
              a: item.answer || item.a,
              category: item.category || 'General',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map((f) => f.category || 'General')))];
  const filtered =
    activeCategory === 'All'
      ? faqs
      : faqs.filter((f) => (f.category || 'General') === activeCategory);

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
            Frequently Asked Questions
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Guidance for your royal silk journey.
          </p>
        </div>

        {/* Category Pills */}
        {categories.length > 2 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-monarch-maroon text-monarch-ivory shadow-xs'
                    : 'bg-white border border-monarch-beige text-monarch-charcoal/70 hover:text-monarch-charcoal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="space-y-4 border-t border-monarch-gold/30 pt-8">
          {filtered.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-white/80 rounded-xl border border-monarch-beige/80 p-5 space-y-2 transition-all shadow-xs"
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex items-center justify-between cursor-pointer gap-4"
                >
                  <h3 className="font-serif text-base sm:text-lg text-monarch-maroon font-medium flex-1">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`w-4 h-4 text-monarch-gold shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm font-sans text-monarch-charcoal/80 leading-relaxed pt-2 border-t border-monarch-beige/40 animate-fadeIn">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
