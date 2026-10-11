'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#1C0A0E] text-monarch-beige border-t border-monarch-gold/30">
      {/* Royal Guarantees Bar */}
      <div className="border-b border-monarch-gold/20 py-8 bg-[#240E14]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-monarch-gold/30 flex items-center justify-center text-monarch-gold shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-monarch-ivory font-medium">Authentic Indian Heirlooms</h5>
              <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                Certified pure silver &amp; gold zari weaves
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-monarch-gold/30 flex items-center justify-center text-monarch-gold shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-monarch-ivory font-medium">Insured Worldwide Courier</h5>
              <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                Complimentary on orders above ₹50,000
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-monarch-gold/30 flex items-center justify-center text-monarch-gold shrink-0">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-monarch-ivory font-medium">Bespoke Couture Fitting</h5>
              <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                Custom sizing tailored by master karigars
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border border-monarch-gold/30 flex items-center justify-center text-monarch-gold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h5 className="font-serif text-sm text-monarch-ivory font-medium">Concierge Assistance</h5>
              <p className="text-[11px] text-monarch-beige/70 font-sans mt-0.5">
                Styling consultation for bridal parties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Newsletter & Link Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Newsletter Section */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[11px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light">
              Royal Correspondence
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-monarch-ivory leading-tight font-medium">
              LET ROYALTY FIND YOU
            </h3>
            <p className="text-xs text-monarch-beige/80 max-w-md font-sans leading-relaxed">
              Be the first to discover new bridal collections, festive edits, and invitations to private trunk shows across Mumbai, Delhi, London, and New York.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 p-3 bg-monarch-burgundy/60 border border-monarch-gold/40 rounded-full text-monarch-gold-light text-xs font-nav">
                <Check className="w-4 h-4 text-monarch-gold" />
                <span>You have been added to the Royal Registry. Welcome to MONARCH.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2 max-w-md">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="w-full pl-5 pr-12 py-3 rounded-full bg-monarch-burgundy/70 border border-monarch-gold/40 text-xs text-monarch-ivory placeholder:text-monarch-beige/40 focus:outline-none focus:border-monarch-gold transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-monarch-gold hover:bg-monarch-gold-light text-monarch-burgundy flex items-center justify-center transition-colors"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[10px] text-monarch-beige/50 font-sans">
                  By subscribing, you agree to our Privacy Policy and consent to receive curated fashion updates.
                </p>
              </form>
            )}
          </div>

          {/* Nav Links Column 1: Collections */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-monarch-ivory font-medium border-b border-monarch-gold/20 pb-2">
              Collections
            </h5>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/collections/bridal-lehengas" className="hover:text-monarch-gold transition-colors">
                  Bridal Lehengas
                </Link>
              </li>
              <li>
                <Link href="/collections/designer-sarees" className="hover:text-monarch-gold transition-colors">
                  Banarasi Sarees
                </Link>
              </li>
              <li>
                <Link href="/collections/sherwanis" className="hover:text-monarch-gold transition-colors">
                  Royal Sherwanis
                </Link>
              </li>
              <li>
                <Link href="/collections/bandhgalas" className="hover:text-monarch-gold transition-colors">
                  Imperial Bandhgalas
                </Link>
              </li>
              <li>
                <Link href="/collections/anarkalis" className="hover:text-monarch-gold transition-colors">
                  Kalidar Anarkalis
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding-edit" className="hover:text-monarch-gold transition-colors">
                  The Wedding Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 2: The House */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-monarch-ivory font-medium border-b border-monarch-gold/20 pb-2">
              The House
            </h5>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link href="/our-craft" className="hover:text-monarch-gold transition-colors">
                  Our Craft &amp; Weavers
                </Link>
              </li>
              <li>
                <Link href="/our-craft#zardozi" className="hover:text-monarch-gold transition-colors">
                  Awadhi Zardozi
                </Link>
              </li>
              <li>
                <Link href="/our-craft#heritage" className="hover:text-monarch-gold transition-colors">
                  Banarasi Pit Looms
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-monarch-gold transition-colors">
                  VIP Bridal Salon
                </Link>
              </li>
              <li>
                <Link href="/account" className="hover:text-monarch-gold transition-colors">
                  Royal Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Nav Links Column 3: Client Care */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="font-serif text-sm tracking-wider uppercase text-monarch-ivory font-medium border-b border-monarch-gold/20 pb-2">
              Client Care &amp; Ateliers
            </h5>
            <ul className="space-y-2 text-xs font-sans">
              <li className="text-monarch-beige/80">
                Flagship: The Darbar Hall, Mehrauli Heritage Corridor, New Delhi
              </li>
              <li className="text-monarch-beige/80">
                Concierge: <span className="text-monarch-gold-light">+91 (0) 11 4892 0000</span>
              </li>
              <li className="text-monarch-beige/80">
                Private Inquiries: <span className="text-monarch-gold-light">concierge@monarch-couture.in</span>
              </li>
              <li className="pt-2">
                <Link href="/account" className="text-monarch-gold hover:underline">
                  Schedule Private Atelier Appointment &rarr;
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Payment Badges */}
      <div className="border-t border-monarch-gold/20 py-6 bg-[#16060A]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-monarch-beige/60 font-sans">
          <p>
            &copy; {new Date().getFullYear()} MONARCH Luxury Heritage Fashion House. All Rights Reserved. &ldquo;A Legacy Woven in Elegance.&rdquo;
          </p>
          <div className="flex items-center space-x-6 text-monarch-beige/80">
            <span>Terms of Royalty</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
