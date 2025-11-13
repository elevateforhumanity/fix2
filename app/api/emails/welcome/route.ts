import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { sendEmail, emailTemplates } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { enrollmentId } = body;

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    // Fetch enrollment details
    const { data: enrollment } = await supabase
      .from('enrollments')
      .select(`
        id,
        student_id,
        courses (
          title
        ),
        profiles!enrollments_student_id_fkey (
          full_name,
          email
        )
      `)
      .eq('id', enrollmentId)
      .single();

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    const studentName = enrollment.profiles.full_name || enrollment.profiles.email.split('@')[0];
    const courseName = enrollment.courses.title;
    const loginUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/lms/dashboard`;

    const html = emailTemplates.welcome(studentName, courseName, loginUrl);

    await sendEmail({
      to: enrollment.profiles.email,
      subject: `Welcome to ${courseName} - Elevate for Humanity`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
