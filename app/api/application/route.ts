import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    console.log('=== APPLICATION API CALLED ===');
    const body = await request.json();
    const { firstName, lastName, phone, email, city, state, program, background, contactPreference } = body;

    console.log('Application received:', { firstName, lastName, program, email, phone });

    if (!firstName || !lastName || !phone || !program) {
      console.error('Missing required fields:', { firstName: !!firstName, lastName: !!lastName, phone: !!phone, program: !!program });
      return NextResponse.json(
        { error: 'Required fields missing', details: { firstName: !!firstName, lastName: !!lastName, phone: !!phone, program: !!program } },
        { status: 400 }
      );
    }

    let supabase;
    try {
      supabase = await createClient();
    } catch (supabaseError) {
      console.error('Supabase client creation failed:', supabaseError);
      // Continue without database - we'll still send email
    }

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

    // Try to save to database with timeout
    let dbSuccess = false;
    if (supabase) {
      try {
        const dbPromise = supabase
          .from('applications')
          .insert(applicationData)
          .select();

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Database timeout')), 5000)
        );

        const { data: insertedData, error: dbError } = await Promise.race([
          dbPromise,
          timeoutPromise
        ]) as any;

        if (dbError) {
          console.error('Database error:', dbError);
        } else {
          console.log('Application saved successfully:', insertedData);
          dbSuccess = true;
        }
      } catch (dbError: any) {
        console.error('Database operation failed:', dbError.message);
        // Continue anyway - we'll still send the email
      }
    } else {
      console.log('Skipping database save - Supabase not available');
    }

    // Send email notification (non-blocking with timeout)
    const sendEmail = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const emailResponse = await fetch('https://api.resend.com/emails', {
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
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        
        if (!emailResponse.ok) {
          console.error('Email API error:', await emailResponse.text());
        } else {
          console.log('Email sent successfully');
        }
      } catch (emailError: any) {
        if (emailError.name === 'AbortError') {
          console.error('Email timeout - continuing anyway');
        } else {
          console.error('Email error:', emailError);
        }
      }
    };

    // Send email in background, don't wait for it
    sendEmail().catch(console.error);

    // Return success immediately
    return NextResponse.json({ 
      success: true,
      message: 'Application received! We will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Error processing application:', error);
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    );
  }
}
