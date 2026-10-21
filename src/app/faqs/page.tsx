import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions — DRIFT by MONARCH',
  description: 'Answers regarding silk authenticity, certifications, custom tailoring, and care.',
};

export default function FaqsPage() {
  const faqs = [
    {
      q: 'How can I verify the authenticity of the zari and silk?',
      a: 'All our heirloom sarees carry an authenticated Silk Mark certificate and a hallmarked karigar guild certificate guaranteeing pure mulberry silk and certified gold/silver zari.',
    },
    {
      q: 'Can I request bespoke blouse stitching or dupatta tassels?',
      a: 'Yes, our Master Karigar Atelier provides complimentary custom blouse stitching, fall/pico finishing, and latkan tassel ornamentation with your preferred neckline specifications.',
    },
    {
      q: 'How do I care for my royal handwoven silk saree?',
      a: 'We advise dry cleaning exclusively at specialized heritage textile care services. Store your saree wrapped in breathable pure unbleached muslin cotton cloth away from direct sunlight.',
    },
    {
      q: 'Can I book a private bridal consultation before placing an order?',
      a: 'Absolutely. We offer private virtual video consultations with our senior bridal stylists, as well as in-person appointments at our Mehrauli and Mumbai flagship salons.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Guidance for your royal silk journey.
          </p>
        </div>

        <div className="space-y-6 border-t border-monarch-gold/30 pt-8">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-2 pb-6 border-b border-monarch-gold/20">
              <h3 className="font-serif text-lg text-monarch-maroon font-medium">{faq.q}</h3>
              <p className="text-sm font-sans text-monarch-charcoal/80 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
