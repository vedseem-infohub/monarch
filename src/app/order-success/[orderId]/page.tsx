'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Truck,
  CreditCard,
  Banknote,
  ExternalLink,
  MapPin,
} from 'lucide-react';
import { api } from '@/services/api';
import { FORMAT_CURRENCY } from '@/data/products';

function OrderSuccessContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const orderId = (params?.orderId as string) || 'MNRCH-2026-9812';

  const queryPaymentId = searchParams.get('paymentId');
  const queryMethod = searchParams.get('method');
  const queryWaybill = searchParams.get('waybill');

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Launch celebratory gold and maroon confetti
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#C7A15B', '#DFBE7F', '#5A1725', '#F7F0E5'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#C7A15B', '#DFBE7F', '#5A1725', '#F7F0E5'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Fetch order details from backend
    if (orderId) {
      api.orders
        .getById(orderId)
        .then((data) => {
          if (data) setOrder(data);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 4);
  const formattedDelivery = estimatedDelivery.toLocaleDateString('en-IN', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const paymentMethod = order?.paymentMethod || queryMethod || 'razorpay';
  const paymentId = order?.razorpayPaymentId || queryPaymentId;
  const waybill = order?.waybill || order?.trackingNumber || queryWaybill;
  const isPaid = order?.paymentStatus === 'Paid' || paymentMethod === 'razorpay' || !!paymentId;

  return (
    <div className="bg-[#F7F0E5] text-monarch-charcoal min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Main Royal Receipt Card */}
        <div className="bg-white rounded-2xl border border-monarch-gold/50 shadow-2xl p-6 sm:p-12 space-y-8 relative overflow-hidden">
          {/* Top Decorative Gold Foil Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-monarch-gold via-monarch-gold-light to-monarch-gold" />

          {/* Crest & Congratulations */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-monarch-maroon border-2 border-monarch-gold flex items-center justify-center text-monarch-gold mx-auto shadow-md">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-nav uppercase tracking-[0.3em] text-monarch-maroon font-semibold block">
              Official Order Confirmed
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl text-monarch-charcoal font-medium">
              A LEGACY RESERVED FOR YOU
            </h1>

            <p className="text-xs sm:text-sm text-monarch-charcoal/70 font-sans max-w-lg mx-auto leading-relaxed">
              We have officially registered your royal commission. Your ensemble is placed in master tailoring, prepared for climate-controlled Delhivery Express dispatch.
            </p>
          </div>

          {/* Reference Numbers Banner */}
          <div className="bg-monarch-ivory p-6 rounded-xl border border-monarch-beige grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-nav">
            <div>
              <span className="text-monarch-charcoal/60 uppercase tracking-wider block text-[10px]">
                Commission Order Reference
              </span>
              <span className="font-serif text-lg font-bold text-monarch-maroon block mt-0.5">
                {orderId}
              </span>
            </div>

            <div>
              <span className="text-monarch-charcoal/60 uppercase tracking-wider block text-[10px]">
                Estimated Royal Delivery
              </span>
              <span className="font-serif text-base font-semibold text-monarch-charcoal block mt-0.5">
                {formattedDelivery}
              </span>
            </div>
          </div>

          {/* Payment & Logistics Verified Status Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Payment Badge */}
            <div className="p-4 rounded-xl border bg-[#FAF7F2] border-monarch-beige flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                {paymentMethod === 'cod' ? (
                  <Banknote className="w-5 h-5 text-amber-800" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-bold block">
                  Payment Verification
                </span>
                <p className="font-serif text-sm font-semibold text-monarch-charcoal mt-0.5 truncate">
                  {paymentMethod === 'cod'
                    ? 'Pay on Delivery (Concierge COD)'
                    : 'Authorized via Razorpay Gateway'}
                </p>
                <p className="text-[11px] text-monarch-charcoal/60 font-mono mt-0.5 truncate">
                  {paymentId ? `Ref: ${paymentId}` : isPaid ? 'Status: Paid' : 'Status: Handover Settlement'}
                </p>
              </div>
            </div>

            {/* Delhivery Courier Badge */}
            <div className="p-4 rounded-xl border bg-[#FAF7F2] border-monarch-beige flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-nav uppercase tracking-wider text-monarch-maroon font-bold block">
                  Logistics Carrier
                </span>
                <p className="font-serif text-sm font-semibold text-monarch-charcoal mt-0.5">
                  Delhivery Express Logistics
                </p>
                {waybill ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-mono text-monarch-maroon font-bold">
                      AWB: {waybill}
                    </span>
                    <a
                      href={`https://www.delhivery.com/track/package/${waybill}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-nav text-monarch-maroon underline inline-flex items-center gap-0.5 hover:text-monarch-gold"
                    >
                      <span>Track</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                ) : (
                  <p className="text-[11px] text-monarch-charcoal/60 font-sans mt-0.5">
                    Waybill manifesting in progress
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Itemized Order & Delivery Fee Breakdown */}
          {order && (
            <div className="bg-[#FAF7F2] p-5 rounded-xl border border-monarch-beige/80 space-y-3 text-xs">
              <h4 className="font-serif text-sm font-semibold text-monarch-charcoal border-b border-monarch-beige/60 pb-2">
                Settlement Statement
              </h4>
              <div className="space-y-1.5 text-monarch-charcoal/80">
                <div className="flex justify-between">
                  <span>Ensemble Subtotal</span>
                  <span className="font-serif font-medium">{FORMAT_CURRENCY(order.subtotal || order.total)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Privilege Courtesy</span>
                    <span>-{FORMAT_CURRENCY(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-monarch-charcoal">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-monarch-maroon" />
                    <strong>Delhivery Express Delivery Fee:</strong>
                  </span>
                  <span className="font-serif font-bold">
                    {order.shippingFee === 0 || !order.shippingFee ? (
                      <span className="text-emerald-700 font-semibold">Complimentary</span>
                    ) : (
                      FORMAT_CURRENCY(order.shippingFee)
                    )}
                  </span>
                </div>
                <div className="border-t border-monarch-beige/80 pt-2 flex justify-between items-baseline font-serif font-bold text-monarch-maroon text-base">
                  <span>Total Settled</span>
                  <span>{FORMAT_CURRENCY(order.total)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps for Bespoke Couture */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg font-medium text-monarch-charcoal border-b border-monarch-beige pb-2">
              What to Expect Next
            </h3>

            <div className="space-y-3 text-xs font-sans text-monarch-charcoal/80">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-monarch-charcoal">Master Tailoring Verification:</strong>{' '}
                  Within 24 hours, our head atelier manager will review your bespoke notes and confirm measurement parameters.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-monarch-maroon shrink-0 mt-0.5" />
                <div>
                  <strong className="text-monarch-charcoal">Delhivery Insured Dispatch:</strong>{' '}
                  Your ensemble will be steamed, hand-packed in our cedarwood presentation box, and tracked via Delhivery Express under sovereign transit insurance.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-monarch-gold-dark shrink-0 mt-0.5" />
                <div>
                  <strong className="text-monarch-charcoal">Complimentary Alteration Concierge:</strong>{' '}
                  If any fit adjustment is needed before your grand occasion, our boutique network is at your disposal.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-monarch-beige flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-monarch-beige hover:border-monarch-maroon text-xs font-nav uppercase tracking-wider text-monarch-charcoal transition-colors"
            >
              <Printer className="w-4 h-4 text-monarch-maroon" />
              <span>Print Official Receipt</span>
            </button>

            <Link
              href="/collections/all"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-monarch-maroon hover:bg-monarch-maroon-dark text-monarch-ivory text-xs font-nav uppercase tracking-widest font-semibold transition-all shadow-md"
            >
              <span>Explore More Ensembles</span>
              <ArrowRight className="w-4 h-4 text-monarch-gold" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F7F0E5] min-h-screen pt-32 pb-24 text-center font-serif text-monarch-charcoal">
          Loading Royal Receipt...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
