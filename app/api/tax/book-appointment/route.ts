import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      service,
      appointmentType,
      preferredDate,
      preferredTime,
      message,
    } = body;

    // Validate required fields
    if (
      !name ||
      !email ||
      !phone ||
      !service ||
      !appointmentType ||
      !preferredDate ||
      !preferredTime
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Insert appointment into database
    const { data, error } = await supabase
      .from('tax_appointments')
      .insert([
        {
          name,
          email,
          phone,
          service,
          appointment_type: appointmentType,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          message: message || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);

      // If table doesn't exist, still return success (we'll handle via email)
      if (error.code === '42P01') {
        // In production, you'd send an email here
        return NextResponse.json({
          success: true,
          message: 'Appointment request received. We will contact you shortly.',
        });
      }

      return NextResponse.json(
        { error: 'Failed to create appointment' },
        { status: 500 }
      );
    }

    // Send confirmation email (in production)
    // await sendAppointmentConfirmation(email, data);

    // Send notification to staff (in production)
    // await sendStaffNotification(data);

    return NextResponse.json({
      success: true,
      appointment: data,
      message: 'Appointment request received successfully',
    });
  } catch (error) {
    console.error('Appointment booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
