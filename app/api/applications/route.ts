// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
// @ts-expect-error TS2305: Module '"@/lib/rate-limit"' has no exported member 'RATE_LIMITS'.
// @ts-expect-error TS2305: Module '"@/lib/rate-limit"' has no exported member 'getClientIdentifier'.
// @ts-expect-error TS2305: Module '"@/lib/rate-limit"' has no exported member 'rateLimit'.
import { rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // Rate limiting: TEMPORARILY DISABLED - Re-enable after testing
    // const identifier = getClientIdentifier(req.headers);
    // const rateLimitResult = rateLimit(`applications:${identifier}`, RATE_LIMITS.APPLICATION_FORM);
    // if (!rateLimitResult.ok) {
    //   return NextResponse.json(
    //     { error: 'Too many requests. Please try again in a minute.' },
    //     { status: 429 }
    //   );
    // }

    const body = await req.json();

    // Basic required fields
    const required = [
      'firstName',
      'lastName',
      'phone',
      'email',
      'city',
      'zip',
      'program',
      'preferredContact',
    ];

    for (const field of required) {
      if (!body[field] || String(body[field]).trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const supabase = createAdminClient();

    // Build notes field with all the extra data
    const notes = [
      `City: ${body.city}`,
      `ZIP: ${body.zip}`,
      `Program Interest: ${body.program}`,
      `Preferred Contact: ${body.preferredContact}`,
      body.hasCaseManager ? `Has Case Manager: ${body.hasCaseManager}` : '',
      body.caseManagerAgency
        ? `Case Manager Agency: ${body.caseManagerAgency}`
        : '',
      body.supportNeeds ? `Support Needs: ${body.supportNeeds}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    // Insert into applications table (matching 20251204 migration schema)
    const { data, error } = await supabase
      .from('applications')
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        phone: body.phone,
        email: body.email,
        program_id: body.program, // TEXT field, stores slug/name
        notes: notes,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        {
          error:
            'Failed to save application. Please call 317-314-3757 for immediate assistance.',
        },
        { status: 500 }
      );
    }

    // TODO: Send email notification to staff
    // TODO: Send confirmation email to applicant

    return NextResponse.json({ ok: true, id: data.id }, { status: 200 });
  } catch (err: any) {
    console.error('Application submission error:', err);
    return NextResponse.json(
      {
        error:
          'Unexpected error. Please call 317-314-3757 for immediate assistance.',
      },
      { status: 500 }
    );
  }
}
