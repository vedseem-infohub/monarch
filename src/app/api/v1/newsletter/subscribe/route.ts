import { NextRequest, NextResponse } from 'next/server';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address format.' },
        { status: 422 }
      );
    }

    // In production, persist into PostgreSQL / Prisma / Newsletter Provider (Klaviyo / Mailchimp)
    // e.g.: await prisma.newsletterSubscriber.upsert({ where: { email: trimmedEmail }, ... })

    return NextResponse.json(
      {
        success: true,
        message: 'Welcome to the Royal Registry. You will receive private bridal trunk previews.',
        email: trimmedEmail,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
