import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Atelier Salons & Flagships — DRIFT by MONARCH',
  description: 'Experience private bespoke bridal appointments across New Delhi, Mumbai, and London.',
};

export default function StoresPage() {
  const salons = [
    {
      city: 'New Delhi',
      title: 'The Darbar Hall Flagship',
      address: 'Heritage Corridor, Kalka Das Marg, Mehrauli, New Delhi 110030',
      phone: '+91 (0) 11 4892 0000',
      hours: 'Mon - Sun: 11:00 AM – 8:00 PM',
    },
    {
      city: 'Mumbai',
      title: 'Kala Ghoda Atelier',
      address: 'Heritage Suite 4B, Ropewalk Lane, Fort, Kala Ghoda, Mumbai 400001',
      phone: '+91 (0) 22 6890 1200',
      hours: 'Tue - Sun: 11:00 AM – 7:30 PM',
    },
    {
      city: 'London',
      title: 'Mayfair Private Suite',
      address: '14 Berkeley Street, Mayfair, London W1J 8DX, United Kingdom',
      phone: '+44 20 7946 0920',
      hours: 'By Private Appointment Exclusively',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Atelier Salons &amp; Flagships
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            Step into our sanctuaries of handwoven silk, champagne consultations, and bespoke draping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-monarch-gold/30">
          {salons.map((salon, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white border border-monarch-gold/30 shadow-sm space-y-4">
              <div>
                <span className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold font-semibold">
                  {salon.city}
                </span>
                <h3 className="font-serif text-lg font-medium text-monarch-maroon mt-1">
                  {salon.title}
                </h3>
              </div>

              <div className="space-y-2 text-xs text-monarch-charcoal/80 font-sans leading-relaxed">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-monarch-maroon shrink-0 mt-0.5" />
                  <span>{salon.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-monarch-maroon shrink-0" />
                  <span>{salon.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-monarch-maroon shrink-0" />
                  <span>{salon.hours}</span>
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:text-monarch-gold transition-colors pt-2 border-t border-monarch-gold/20 w-full"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Appointment</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
