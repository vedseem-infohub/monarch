'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const Craftsmanship3DViewer = dynamic(
  () => import('@/components/three/Craftsmanship3DViewer').then((mod) => mod.Craftsmanship3DViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl bg-monarch-burgundy/80 flex flex-col items-center justify-center border border-monarch-gold/20 text-monarch-gold">
        <div className="w-10 h-10 border-2 border-monarch-gold border-t-transparent rounded-full animate-spin mb-3" />
        <span className="font-serif text-sm tracking-widest uppercase text-monarch-ivory">
          Loading 3D Specimen
        </span>
      </div>
    ),
  }
);

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-[#240E14] text-monarch-ivory relative overflow-hidden">
      {/* Decorative Arch Backdrop Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-monarch-gold/15 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Interactive Canvas */}
          <div className="lg:col-span-7">
            <Craftsmanship3DViewer />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-monarch-maroon border border-monarch-gold/30 text-xs font-nav uppercase tracking-widest text-monarch-gold-light">
              <Sparkles className="w-3.5 h-3.5 text-monarch-gold" />
              <span>Imperial Karigari</span>
            </div>

            <div className="space-y-2">
              <span className="block font-nav text-xs uppercase tracking-[0.3em] text-monarch-gold">
                The Anatomy of Haute Couture
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-monarch-ivory font-medium leading-tight">
                BEAUTY IN <br />
                <span className="italic font-light text-monarch-gold-light">EVERY THREAD</span>
              </h2>
            </div>

            <p className="text-sm text-monarch-beige/90 font-sans leading-relaxed">
              Every MONARCH ensemble is an archival conversation between hand-spun silks and real precious metal wefts. We employ ancient pit-loom techniques and heavy Awadhi karchob embroidery where a single floral jaal demands over 400 continuous artisan hours.
            </p>

            {/* Pillar Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-monarch-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-monarch-ivory font-semibold">
                    Certified Pure Silver &amp; 24K Gold Zari
                  </h4>
                  <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                    Tested and hallmarked precious metal thread that never oxidizes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-monarch-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-monarch-ivory font-semibold">
                    Three-Dimensional Dabka &amp; Nakshi
                  </h4>
                  <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                    Micro-coiled bullion wire hand-couched on velvet for palace relief shadows.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-monarch-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-monarch-ivory font-semibold">
                    Sustainable Pit Looms of Kashi
                  </h4>
                  <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                    Hand-operated wooden looms preserving 600 years of artisan lineage.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/our-craft"
                className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-monarch-gold hover:text-monarch-gold-light transition-colors group"
              >
                <span>Read the Complete Artisan Manifesto</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
