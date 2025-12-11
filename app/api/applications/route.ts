// app/api/applications/route.ts
import { NextResponse } from 'next/server';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL env var');
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY env var');
}

export async function POST(req: Request) {
  try {
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

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      // Still let the front-end succeed to avoid blocking users,
      // but log for you to fix env vars.
      console.error('Supabase env vars not set. Application not saved.');
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    // Insert into Supabase via REST
    const res = await fetch(`${SUPABASE_URL}/rest/v1/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        first_name: body.firstName,
        last_name: body.lastName,
        phone: body.phone,
        email: body.email,
        city: body.city,
        zip: body.zip,
        program: body.program,
        has_case_manager: body.hasCaseManager,
        case_manager_agency: body.caseManagerAgency,
        support_needs: body.supportNeeds,
        preferred_contact: body.preferredContact,
        source: 'website_quick_apply',
        created_at: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Supabase insert error:', errText);
      // Still avoid showing technical trash to the user
      return NextResponse.json(
        { error: 'Failed to save application' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Error in /api/applications:', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
