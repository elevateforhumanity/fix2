// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimitNew as rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    // Rate limiting: 3 requests per minute per IP
    const identifier = getClientIdentifier(req.headers);
    const rateLimitResult = rateLimit(`applications:${identifier}`, RATE_LIMITS.APPLICATION_FORM);

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

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

    // Send email notifications
    try {
      // Send confirmation email to applicant
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: body.email,
          subject: 'Application Received - Elevate for Humanity',
          html: `
            <h2>Thank you for applying!</h2>
            <p>Hi ${body.firstName},</p>
            <p>We've received your application for our <strong>${body.program}</strong> program.</p>
            <p>An advisor will contact you within 1-2 business days via ${body.preferredContact} to discuss:</p>
            <ul>
              <li>Program details and schedule</li>
              <li>Funding options (WIOA, WRG, JRI, apprenticeships)</li>
              <li>Next steps to get started</li>
            </ul>
            <p>Questions? Call us at <a href="tel:3173143757">317-314-3757</a></p>
            <p>Best regards,<br>Elevate for Humanity Team</p>
          `,
        }),
      });

      // Send notification to staff
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'elevate4humanityedu@gmail.com',
          subject: `New Application: ${body.firstName} ${body.lastName} - ${body.program}`,
          html: `
            <h2>New Application Received</h2>
            <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone}</p>
            <p><strong>Program:</strong> ${body.program}</p>
            <p><strong>Location:</strong> ${body.city}, ${body.zip}</p>
            <p><strong>Preferred Contact:</strong> ${body.preferredContact}</p>
            ${body.hasCaseManager ? `<p><strong>Has Case Manager:</strong> ${body.hasCaseManager}</p>` : ''}
            ${body.caseManagerAgency ? `<p><strong>Agency:</strong> ${body.caseManagerAgency}</p>` : ''}
            ${body.supportNeeds ? `<p><strong>Support Needs:</strong> ${body.supportNeeds}</p>` : ''}
            <p><a href="https://www.elevateforhumanity.org/admin/applications">View in Admin Portal</a></p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Don't fail the application if email fails
    }

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
