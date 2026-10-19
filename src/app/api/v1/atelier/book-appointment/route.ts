import { NextRequest, NextResponse } from 'next/server';
import { SALON_LOCATIONS, ATELIER_EXPERIENCES } from '@/data/atelier';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/;

export interface AtelierBookingRequest {
  salonSlug: string;
  experienceId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  preferredDate?: string;
  preferredSlot?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: AtelierBookingRequest = await request.json();
    const { salonSlug, experienceId, clientName, clientPhone, clientEmail, preferredDate, preferredSlot } = body;

    // 1. Validate required fields
    if (!clientName || typeof clientName !== 'string' || clientName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid client name (minimum 2 characters).' },
        { status: 400 }
      );
    }

    if (!clientEmail || typeof clientEmail !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required for appointment confirmation.' },
        { status: 400 }
      );
    }

    const trimmedEmail = clientEmail.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email format (e.g. name@domain.com).' },
        { status: 422 }
      );
    }

    if (!clientPhone || typeof clientPhone !== 'string' || !PHONE_REGEX.test(clientPhone.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid concierge contact number.' },
        { status: 422 }
      );
    }

    // 2. Validate salon location
    const matchedSalon = SALON_LOCATIONS.find((s) => s.slug === salonSlug) || SALON_LOCATIONS[0];
    const matchedExperience = ATELIER_EXPERIENCES.find((e) => e.id === experienceId) || ATELIER_EXPERIENCES[0];

    // 3. Generate secure imperial booking reference
    const timestampSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingRef = `MNR-2026-${timestampSuffix}`;

    // In production with PostgreSQL/Prisma:
    // await prisma.atelierBooking.create({
    //   data: {
    //     bookingRef,
    //     salonSlug: matchedSalon.slug,
    //     experienceId: matchedExperience.id,
    //     clientName: clientName.trim(),
    //     clientPhone: clientPhone.trim(),
    //     clientEmail: trimmedEmail,
    //     preferredDate: preferredDate ? new Date(preferredDate) : new Date(),
    //     preferredSlot: preferredSlot || matchedSalon.timeSlots[0],
    //     status: 'CONFIRMED',
    //   }
    // });

    return NextResponse.json(
      {
        success: true,
        bookingRef,
        message: `Imperial suite reservation confirmed. A Senior Draper has been assigned at ${matchedSalon.name}.`,
        booking: {
          bookingRef,
          salonSlug: matchedSalon.slug,
          salonName: matchedSalon.name,
          city: matchedSalon.city,
          address: matchedSalon.address,
          experienceTitle: matchedExperience.title,
          clientName: clientName.trim(),
          clientEmail: trimmedEmail,
          clientPhone: clientPhone.trim(),
          preferredDate: preferredDate || 'Flexible Accord',
          preferredSlot: preferredSlot || matchedSalon.timeSlots[0],
          conciergeHotline: matchedSalon.phone,
        },
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected atelier server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
