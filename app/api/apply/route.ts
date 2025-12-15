import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { resend, notifyFrom } from '@/lib/email/resend';
import { logAuditEvent, AuditActions } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const supabase = await createClient();

    const { first_name, last_name, email, phone, program_slug } = body;

    if (!email || !program_slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 1️⃣ Create or get auth user
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    const userId = authUser?.user?.id;

    if (!userId) {
      // Error: $1
      throw new Error('User creation failed');
    }

    // 2️⃣ Create student profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert({
        user_id: userId,
        role: 'student',
        first_name,
        last_name,
        email,
        phone,
      });

    if (profileError) {
      // Error: $1
    }

    // 3️⃣ Get program
    const { data: program, error: programError } = await supabase
      .from('programs')
      .select('id')
      .eq('slug', program_slug)
      .single();

    if (!program) {
      // Error: $1
      throw new Error('Program not found');
    }

    // 4️⃣ Check for duplicate enrollment
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('student_id', userId)
      .eq('program_id', program.id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Already enrolled',
        user_id: userId,
      });
    }

    // 5️⃣ Create enrollment (FREE – WIOA – Indiana RAPIDS)
    const { error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        student_id: userId,
        program_id: program.id,
        status: 'active',
        funding_source: 'WIOA',
        tuition_amount: 0,
        paid_amount: 0,
        enrolled_at: new Date().toISOString(),
        state_code: 'IN',
        apprenticeship: true,
        rapids_registered: true,
      });

    if (enrollmentError) {
      // Error: $1
      throw new Error('Enrollment failed');
    }

    // 6️⃣ Assign AI Instructor
    try {
      const { data: ai } = await supabase
        .from('ai_instructors')
        .select('id')
        .eq('specialty', 'Barber Apprenticeship')
        .eq('active', true)
        .single();

      if (ai) {
        await supabase.from('student_ai_assignments').insert({
          student_id: userId,
          instructor_id: ai.id,
          program_slug,
        });
      }
    } catch (aiError) {
      // Error: $1
      // Continue - not critical
    }

    // 6.5️⃣ Create onboarding record
    try {
      await supabase.from('student_onboarding').insert({
        student_id: userId,
      });
    } catch (onboardingError) {
      // Error: $1
      // Continue - not critical
    }

    // 7️⃣ Send orientation email
    try {
      await resend.emails.send({
        from: notifyFrom(),
        to: email,
        subject: 'Welcome to the Barber Apprenticeship – Elevate for Humanity',
        text: `
Welcome ${first_name},

You have been successfully enrolled in the Barber Apprenticeship Program through Elevate for Humanity.

What happens next:
• Your student dashboard is now active
• Your AI Instructor has been assigned
• Your training, tracking, and apprenticeship support are ready

Log in here:
${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard

If you have questions, your AI Instructor is available inside your dashboard.

Welcome to your next level.

— Elevate for Humanity
`,
      });
    } catch (emailError) {
      // Error: $1
      // Continue - not critical
    }

    // 8️⃣ Audit log
    await logAuditEvent({
      action: AuditActions.ENROLLMENT_CREATED,
      resourceType: 'enrollment',
      resourceId: userId,
      metadata: {
        program_slug,
        email,
        funding_source: 'WIOA',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Student enrolled successfully',
      user_id: userId,
      dashboard_url: `${process.env.NEXT_PUBLIC_SITE_URL}/student/dashboard`,
    });
  } catch (err: any) {
    // Error: $1
    return NextResponse.json(
      { error: err.message || 'Enrollment failed' },
      { status: 500 }
    );
  }
}
