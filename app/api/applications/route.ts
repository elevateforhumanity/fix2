import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';

const applicationSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().min(7).max(20),
  email: z.string().email(),
  city: z.string().min(1).max(100),
  zipCode: z.string().min(3).max(15),
  programInterest: z.string().min(1).max(200),
  notes: z.string().max(1000).optional(),
  contactPreference: z.enum(['phone', 'text', 'email']),
  captchaAnswer: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown';

    // Rate limit: 10 applications per IP per hour
    const rate = await checkRateLimit({
      key: `apply:${ip}`,
      limit: 10,
      windowSeconds: 60 * 60,
    });

    if (!rate.ok) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = applicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Anti-spam: 6 + 7 = 13
    if (data.captchaAnswer.trim() !== '13') {
      return NextResponse.json(
        { error: 'Verification failed. Please answer the question correctly.' },
        { status: 400 }
      );
    }

    const supabase = createRouteHandlerClient({ cookies });

    const { error: insertError } = await supabase
      .from('applications')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        zip_code: data.zipCode,
        program_interest: data.programInterest,
        notes: data.notes ?? null,
        contact_preference: data.contactPreference,
        source: 'website_quick_application',
        source_ip: ip,
      });

    if (insertError) {
      console.error('Application insert error', insertError);
      return NextResponse.json(
        { error: 'Could not submit application. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err) {
    console.error('Application POST error', err);
    return NextResponse.json(
      { error: 'Unexpected error. Please try again.' },
      { status: 500 }
    );
  }
}
