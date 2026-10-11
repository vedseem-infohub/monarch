'use client';

import React, { useState } from 'react';
import {
  User,
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { FORMAT_CURRENCY } from '@/data/products';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'appointments' | 'orders' | 'profile'>('appointments');
  const [isBooked, setIsBooked] = useState(false);

  const [appointmentForm, setAppointmentForm] = useState({
    name: 'Maharani Radhika Devi',
    email: 'radhika@monarch-client.com',
    phone: '+91 98200 12345',
    boutique: 'The Darbar Hall · Mehrauli, New Delhi',
    date: '2026-11-15',
    time: '14:00',
    ensembleType: 'Bridal Trousseau & Groom Coordination',
    partySize: '3 guests',
  });

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const pastOrders = [
    {
      id: 'MNRCH-2026-8942',
      date: 'October 12, 2026',
      status: 'Master Tailoring in Progress',
      total: 285000,
      item: 'Gulnaar Embroidered Zardozi Lehenga',
      color: 'Royal Crimson',
      size: 'Custom Bespoke',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'MNRCH-2026-7120',
      date: 'September 28, 2026',
      status: 'Delivered via Sovereign Express',
      total: 135000,
      item: 'Badshah Royal Navy Bandhgala',
      color: 'Midnight Navy',
      size: '42 (L)',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-[#240E14] text-monarch-ivory rounded-2xl p-6 sm:p-10 border border-monarch-gold/40 shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-monarch-maroon border-2 border-monarch-gold flex items-center justify-center text-monarch-gold text-2xl font-serif">
              M
            </div>
            <div>
              <span className="text-[10px] font-nav uppercase tracking-[0.3em] text-monarch-gold-light">
                Royal Sovereign Patron
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-medium text-monarch-ivory mt-0.5">
                Maharani Radhika Devi
              </h1>
              <p className="text-xs text-monarch-beige/70 font-sans mt-0.5">
                Member ID: MONARCH-VIP-0042 · Exclusive Bridal Registry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-monarch-burgundy/80 px-4 py-2 rounded-xl border border-monarch-gold/30 text-xs">
            <Sparkles className="w-4 h-4 text-monarch-gold" />
            <div>
              <span className="block text-monarch-gold-light font-nav uppercase text-[10px]">
                Dedicated Stylist
              </span>
              <span className="text-monarch-ivory font-serif">Master Ananya Sen</span>
            </div>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-3 border-b border-monarch-beige pb-4 mb-8">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all ${
              activeTab === 'appointments'
                ? 'bg-monarch-maroon text-monarch-ivory font-semibold shadow'
                : 'bg-white text-monarch-charcoal border border-monarch-beige hover:border-monarch-gold'
            }`}
          >
            VIP Salon Appointment
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'bg-monarch-maroon text-monarch-ivory font-semibold shadow'
                : 'bg-white text-monarch-charcoal border border-monarch-beige hover:border-monarch-gold'
            }`}
          >
            Past Commissions ({pastOrders.length})
          </button>
        </div>

        {/* Tab 1: Book VIP Bridal Salon Appointment */}
        {activeTab === 'appointments' && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-monarch-beige/80 shadow-md max-w-3xl">
            <div className="border-b border-monarch-beige pb-4 mb-6">
              <span className="text-xs font-nav uppercase tracking-[0.25em] text-monarch-maroon font-semibold block mb-1">
                Private Trunk &amp; Fitting Suite
              </span>
              <h3 className="font-serif text-2xl text-monarch-charcoal font-medium">
                Reserve an Exclusive Atelier Appointment
              </h3>
              <p className="text-xs text-monarch-charcoal/70 font-sans mt-1">
                Enjoy champagne service, high-tea, and 1-on-1 bespoke styling with our master couturiers.
              </p>
            </div>

            {isBooked ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto" />
                <h4 className="font-serif text-2xl text-monarch-charcoal font-medium">
                  Appointment Reserved with Honor
                </h4>
                <p className="text-xs text-monarch-charcoal/80 font-sans max-w-md mx-auto">
                  We look forward to welcoming you to <strong>{appointmentForm.boutique}</strong> on{' '}
                  <strong>{appointmentForm.date}</strong> at <strong>{appointmentForm.time}</strong>.
                  A formal invitation has been dispatched to your email.
                </p>
                <button
                  onClick={() => setIsBooked(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-monarch-maroon text-monarch-ivory text-xs font-nav uppercase tracking-wider"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleBook} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={appointmentForm.name}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={appointmentForm.phone}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Select Boutique Flagship
                    </label>
                    <select
                      value={appointmentForm.boutique}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, boutique: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg font-sans"
                    >
                      <option value="The Darbar Hall · Mehrauli, New Delhi">
                        The Darbar Hall · Mehrauli Heritage Corridor, New Delhi
                      </option>
                      <option value="Sea Face Atelier · Worli, Mumbai">
                        Sea Face Atelier · Worli, Mumbai
                      </option>
                      <option value="Mayfair Private Suite · London, UK">
                        Mayfair Private Suite · London, UK
                      </option>
                      <option value="DIFC Royal Salon · Dubai, UAE">
                        DIFC Royal Salon · Dubai, UAE
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={appointmentForm.date}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={appointmentForm.time}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg font-sans"
                    >
                      <option value="11:00 AM">11:00 AM (Morning High Tea)</option>
                      <option value="02:00 PM">02:00 PM (Afternoon Fitting)</option>
                      <option value="05:00 PM">05:00 PM (Sunset Bridal Salon)</option>
                      <option value="07:00 PM">07:00 PM (Evening Private Trunk)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-nav uppercase tracking-wider text-monarch-maroon font-semibold mb-1">
                      Ensemble Interest &amp; Wedding Date
                    </label>
                    <input
                      type="text"
                      value={appointmentForm.ensembleType}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, ensembleType: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-monarch-ivory border border-monarch-beige rounded-lg"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory font-nav text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-md"
                  >
                    <span>Confirm Private Salon Reservation</span>
                    <ArrowRight className="w-4 h-4 text-monarch-gold" />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Past Commissions */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 sm:p-8 rounded-2xl border border-monarch-beige/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-5">
                  <div className="w-20 aspect-[3/4] rounded-lg overflow-hidden bg-monarch-charcoal shrink-0 border border-monarch-beige">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={order.image}
                      alt={order.item}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-nav uppercase tracking-widest text-monarch-gold-dark font-semibold">
                      {order.id} · {order.date}
                    </span>
                    <h4 className="font-serif text-lg text-monarch-charcoal font-medium">
                      {order.item}
                    </h4>
                    <p className="text-xs text-monarch-charcoal/70 font-sans">
                      Color: {order.color} · Size: {order.size}
                    </p>
                    <span className="inline-block mt-2 text-xs font-serif font-bold text-monarch-maroon">
                      {FORMAT_CURRENCY(order.total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-2 border-t md:border-t-0 pt-4 md:pt-0 border-monarch-beige/40">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-monarch-maroon/10 text-monarch-maroon text-xs font-nav font-medium">
                    <Package className="w-3.5 h-3.5" />
                    <span>{order.status}</span>
                  </span>
                  <button className="text-xs font-nav uppercase tracking-wider text-monarch-maroon hover:underline">
                    View Commission Dossier
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
