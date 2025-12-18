import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { rateLimitNew as rateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rateLimit';

export async function POST(req: Request) {
  try {
    // Rate limiting
    const identifier = getClientIdentifier(req.headers);
    const rateLimitResult = rateLimit(`inquiries:${identifier}`, RATE_LIMITS.APPLICATION_FORM);

    if (!rateLimitResult.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Parse name into first and last
    const nameParts = body.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // Store as a simple application
    const { data, error } = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: body.email,
        phone: body.phone || null,
        program_id: body.program || 'general-inquiry',
        notes: body.message || 'Quick inquiry form submission',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save inquiry' },
        { status: 500 }
      );
    }

    // Send email notifications
    try {
      // Confirmation to applicant
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: body.email,
          subject: 'Inquiry Received - Elevate for Humanity',
          html: `
            <h2>Thank you for your inquiry!</h2>
            <p>Hi ${firstName},</p>
            <p>We've received your inquiry and an advisor will contact you within 1-2 business days.</p>
            ${body.program ? `<p>You expressed interest in: <strong>${body.program}</strong></p>` : ''}
            <p>Questions? Call us at <a href="tel:3173143757">317-314-3757</a></p>
            <p>Best regards,<br>Elevate for Humanity Team</p>
          `,
        }),
      });

      // Notification to staff
      await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.elevateforhumanity.org'}/api/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: 'elevate4humanityedu@gmail.com',
          subject: `New Inquiry: ${body.name}${body.program ? ` - ${body.program}` : ''}`,
          html: `
            <h2>New Inquiry Received</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
            ${body.program ? `<p><strong>Program Interest:</strong> ${body.program}</p>` : ''}
            ${body.message ? `<p><strong>Message:</strong><br>${body.message}</p>` : ''}
            <p><a href="https://www.elevateforhumanity.org/admin/applications">View in Admin Portal</a></p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Email notification error:', emailError);
      // Don't fail the inquiry if email fails
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 200 });
  } catch (err: any) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json(
      { error: 'Unexpected error processing inquiry' },
      { status: 500 }
    );
  }
}
