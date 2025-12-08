import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, city, state, program, background, contactPreference } = body;

    console.log('Application received:', { firstName, lastName, program });

    if (!firstName || !lastName || !phone || !program) {
      console.error('Missing required fields:', { firstName: !!firstName, lastName: !!lastName, phone: !!phone, program: !!program });
      return NextResponse.json(
        { error: 'Required fields missing', details: { firstName: !!firstName, lastName: !!lastName, phone: !!phone, program: !!program } },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const applicationData = {
      first_name: firstName,
      last_name: lastName,
      phone,
      email: email || null,
      program: program,
      notes: `Location: ${city || 'N/A'}, ${state || 'N/A'}\nBackground: ${background || 'N/A'}\nContact Preference: ${Array.isArray(contactPreference) ? contactPreference.join(', ') : 'N/A'}`,
      source: 'marketing_site',
      status: 'submitted',
    };

    console.log('Inserting application:', applicationData);

    const { data: insertedData, error: dbError } = await supabase
      .from('applications')
      .insert(applicationData)
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      // Continue anyway - we'll still send the email
    } else {
      console.log('Application saved successfully:', insertedData);
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
