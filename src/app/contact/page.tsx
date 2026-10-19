'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-monarch-charcoal pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link href="/" className="text-xs uppercase tracking-widest text-monarch-gold font-nav hover:underline">
            &larr; Return to Sanctuary
          </Link>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-monarch-maroon mt-4">
            Contact Royal Concierge
          </h1>
          <p className="text-xs font-sans text-monarch-charcoal/60 mt-2">
            We are honored to assist with private inquiries, bridal curation, and order tracking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-monarch-gold/30 text-sm">
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-monarch-maroon font-serif font-medium">
              <Phone className="w-4 h-4" /> Concierge Hotline
            </span>
            <p className="text-xs text-monarch-charcoal/70">+91 (0) 11 4892 0000</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-monarch-maroon font-serif font-medium">
              <Mail className="w-4 h-4" /> Email Inquiries
            </span>
            <p className="text-xs text-monarch-charcoal/70">concierge@drift-silks.com</p>
          </div>
          <div className="space-y-1">
            <span className="flex items-center gap-2 text-monarch-maroon font-serif font-medium">
              <MapPin className="w-4 h-4" /> Flagship Salon
            </span>
            <p className="text-xs text-monarch-charcoal/70">The Darbar Hall, Mehrauli, New Delhi</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-white border border-monarch-gold/40 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-monarch-maroon text-white flex items-center justify-center mx-auto">
              <Check className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-monarch-maroon">Message Received with Honor</h3>
            <p className="text-xs text-monarch-charcoal/70 max-w-md mx-auto">
              Your message has been assigned to a senior bridal advisor. We will reach back out within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 sm:p-8 rounded-2xl border border-monarch-gold/30 shadow-sm">
            <div>
              <label className="block text-xs uppercase tracking-wider text-monarch-charcoal/70 mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-monarch-gold/40 text-sm focus:outline-none focus:border-monarch-maroon"
                placeholder="Maharani Gayatri"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-monarch-charcoal/70 mb-1">Your Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-monarch-gold/40 text-sm focus:outline-none focus:border-monarch-maroon"
                placeholder="royalty@example.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-monarch-charcoal/70 mb-1">Your Inquiry</label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-monarch-gold/40 text-sm focus:outline-none focus:border-monarch-maroon"
                placeholder="How may our weavers and stylists assist you?"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-monarch-maroon text-white font-medium text-xs tracking-wider uppercase hover:bg-monarch-maroon-dark transition-colors"
            >
              <span>Transmit Message</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
