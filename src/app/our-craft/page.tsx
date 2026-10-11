import React from 'react';
import Link from 'next/link';
import { CRAFTSMANSHIP_PILLARS } from '@/data/craftsmanship';
import { Craftsmanship3DViewer } from '@/components/three/Craftsmanship3DViewer';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Craft & Heritage — MONARCH Haute Couture',
  description:
    'Discover the sacred weaving corridors of Varanasi, 24k gold zari, and Awadhi karchob embroiderers behind MONARCH royal Indian ethnic wear.',
};

export default function OurCraftPage() {
  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-28 pb-24">
      {/* Editorial Hero Banner */}
      <section className="bg-[#240E14] text-monarch-ivory py-20 lg:py-28 relative overflow-hidden border-b border-monarch-gold/30">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[750px] h-[950px] border border-monarch-gold rounded-t-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <span className="text-xs font-nav uppercase tracking-[0.35em] text-monarch-gold-light block font-semibold">
            The Living Archives
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-monarch-ivory leading-tight">
            CENTURIES OF KARIGARI, <br />
            <span className="italic font-light text-monarch-gold-light">WOVEN FOR ETERNITY</span>
          </h1>

          <p className="text-sm sm:text-base text-monarch-beige/90 font-sans max-w-2xl mx-auto leading-relaxed">
            At MONARCH, we do not simply design garments; we safeguard an unbroken lineage of Indian imperial artisans. From the rhythmic clatter of wooden pit looms in Varanasi to the quiet precision of needle-draped Kashmiri tilla.
          </p>
        </div>
      </section>

      {/* Interactive 3D Textile Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold">
            Interactive Atelier Specimen
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
            ANATOMY OF A ROYAL THREAD
          </h2>
          <p className="text-xs text-monarch-charcoal/70 font-sans">
            Rotate the 3D medallion and click on interactive markers to inspect certified gold zari wefts, hand-beaded dabka relief, and mulberry silk warps.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Craftsmanship3DViewer />
        </div>
      </section>

      {/* The 4 Ancestral Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={pillar.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-monarch-gold/30">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-monarch-burgundy/90 text-monarch-gold-light text-xs font-nav uppercase tracking-wider px-3 py-1 rounded-full border border-monarch-gold/40">
                    {pillar.artisanRegion}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold">
                  {pillar.subtitle}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-monarch-charcoal font-medium">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-monarch-charcoal/80 font-sans leading-relaxed">
                  {pillar.description}
                </p>

                <div className="p-4 bg-white rounded-xl border border-monarch-beige flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-monarch-gold-dark shrink-0" />
                  <div>
                    <h5 className="font-nav text-xs uppercase tracking-wider text-monarch-charcoal font-semibold">
                      Master Technique
                    </h5>
                    <p className="text-xs text-monarch-charcoal/70 font-sans mt-0.5">
                      {pillar.technique}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center bg-[#240E14] text-monarch-ivory p-12 rounded-3xl border border-monarch-gold/40 shadow-2xl space-y-6">
        <Sparkles className="w-8 h-8 text-monarch-gold mx-auto" />
        <h3 className="font-serif text-3xl sm:text-4xl font-medium text-monarch-ivory">
          COMMISSION YOUR BESPOKE HEIRLOOM
        </h3>
        <p className="text-xs sm:text-sm text-monarch-beige/80 max-w-lg mx-auto font-sans leading-relaxed">
          Book a private styling consultation at our flagship ateliers or schedule a digital trunk consultation with our master drapers.
        </p>
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-monarch-gold text-monarch-burgundy text-xs font-nav uppercase tracking-widest font-semibold hover:bg-monarch-gold-light transition-all shadow-lg"
          >
            <span>Book Private VIP Appointment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
