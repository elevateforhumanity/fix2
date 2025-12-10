import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { z } from 'zod';
import { checkRateLimit } from '@/lib/rate-limit';
import { logger } from '@/lib/logger';

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
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.entries(fieldErrors)[0];
      const friendlyMessage = firstError 
        ? `${firstError[0]}: ${firstError[1]?.[0] || 'Invalid value'}`
        : 'Please check your form and try again';
      
      return NextResponse.json(
        {
          error: friendlyMessage,
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

    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

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
      // Specific error messages for common database issues
      if (insertError.code === '23505') {
        return NextResponse.json(
          { error: 'An application with this email already exists. Please contact us at 317-314-3757 to update it.' },
          { status: 409 }
        );
      }
      
      if (insertError.code === '23503') {
        return NextResponse.json(
          { error: 'Invalid data provided. Please check your information and try again.' },
          { status: 400 }
        );
      }
      
      logger.error('Application insert error', insertError, { 
        code: insertError.code,
        email: data.email 
      });
      
      return NextResponse.json(
        { error: 'Could not submit application. Please try again or call 317-314-3757.' },
        { status: 500 }
      );
    }

    logger.info('Application submitted successfully', { 
      email: data.email,
      program: data.programInterest 
    });

    return NextResponse.json({ 
      success: true,
      message: 'Application submitted! We\'ll contact you within 1-2 business days.'
    }, { status: 201 });
  } catch (err) {
    logger.error('Application POST error', err instanceof Error ? err : new Error(String(err)));
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or call 317-314-3757.' },
      { status: 500 }
    );
  }
}
