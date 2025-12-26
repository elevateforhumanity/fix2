import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for anonymous submissions
const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      return NextResponse.json({ error: 'Service not configured' }, { status: 503 });
    }

    const body = await req.json();

    // Validation
    if (!body.organizationName || !body.contactName || !body.contactEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!body.programsInterested || body.programsInterested.length === 0) {
      return NextResponse.json(
        { error: 'Please select at least one program' },
        { status: 400 }
      );
    }

    // Check for duplicate by email
    const { data: existing } = await supabase
      .from('program_holder_applications')
      .select('id, status')
      .eq('contact_email', body.contactEmail.toLowerCase())
      .eq('status', 'pending')
      .single();

    if (existing) {
      return NextResponse.json(
        {
          error:
            'An application with this email is already pending review. Please contact us if you need to update your application.',
        },
        { status: 400 }
      );
    }

    // Insert application
    const { data: application, error: insertError } = await supabase
      .from('program_holder_applications')
      .insert({
        organization_name: body.organizationName,
        organization_type: body.organizationType || 'other',
        contact_name: body.contactName,
        contact_email: body.contactEmail.toLowerCase(),
        contact_phone: body.contactPhone || null,
        address: body.address || null,
        city: body.city || null,
        state: body.state || 'IN',
        zip: body.zip || null,
        programs_interested: body.programsInterested,
        estimated_students: body.estimatedStudents
          ? parseInt(body.estimatedStudents)
          : null,
        how_heard_about_us: body.howHeardAboutUs || null,
        additional_info: body.additionalInfo || null,
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }

    // Confirmation email sent via webhook to applicant
    
    return NextResponse.json({
      success: true,
      applicationId: application.id,
    });
  } catch (error) {
    console.error('Application error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
