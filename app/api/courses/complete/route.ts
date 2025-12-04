import { createClient } from '@/lib/supabase/server';
import { generateId, generateShortId } from '@/lib/utils/id-generator';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { courseId, userId, enrollmentId, completionData } = await req.json();
    
    const supabase = await createClient();

    // Update enrollment status
    const { error: updateError } = await supabase
      .from('partner_enrollments')
      .update({
        status: 'completed',
        completion_date: new Date().toISOString(),
        completion_data: completionData,
      })
      .eq('id', enrollmentId);

    if (updateError) throw updateError;

    // Create certificate record
    const certificateNumber = `EFH-${generateShortId()}-${courseId.substring(0, 8)}`;
    
    const { error: certError } = await supabase
      .from('module_certificates')
      .insert({
        user_id: userId,
        module_id: courseId,
        certificate_number: certificateNumber,
        certificate_name: completionData.courseName || 'Course Completion',
        issued_by: 'Elevate For Humanity',
        issued_date: new Date().toISOString().split('T')[0],
        is_partner_cert: true,
      });

    if (certError) throw certError;

    // Send completion email
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/emails/course-completion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        courseId,
        certificateNumber,
      }),
    });

    return NextResponse.json({ 
      success: true, 
      certificateNumber 
    });
  } catch (error: any) {
    console.error('Course completion error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to record completion' },
      { status: 500 }
    );
  }
}
