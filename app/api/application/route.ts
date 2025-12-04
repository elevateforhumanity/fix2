import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, city, state, program, background, contactPreference } = body;

    if (!firstName || !lastName || !phone || !program) {
      return NextResponse.json(
        { error: 'Required fields missing' },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error: dbError } = await supabase
      .from('applications')
      .insert({
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        city,
        state,
        program_interest: program,
        background_notes: background,
        contact_preferences: contactPreference,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // Send email notification
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'Elevate For Humanity <noreply@elevateforhumanity.org>',
          to: 'elevate4humanityedu@gmail.com',
          subject: `New Application from ${firstName} ${lastName}`,
          html: `
            <h2>New Application Received</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email || 'Not provided'}</p>
            <p><strong>Location:</strong> ${city || ''}, ${state || ''}</p>
            <p><strong>Program Interest:</strong> ${program}</p>
            <p><strong>Preferred Contact:</strong> ${Array.isArray(contactPreference) ? contactPreference.join(', ') : 'Not specified'}</p>
            <p><strong>Background/Notes:</strong></p>
            <p>${background || 'None provided'}</p>
          `,
        }),
      });
    } catch (emailError) {
      console.error('Email error:', emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
