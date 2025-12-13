import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { getSsoLaunchUrl } from '@/lib/partners/milady';

type Params = Promise<{ enrollmentId: string }>;

export default async function MiladyLaunchPage({ params }: { params: Params }) {
  const { enrollmentId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?next=/student/dashboard');
  }

  // Get enrollment details
  const { data: enrollment } = await supabase
    .from('partner_lms_enrollments')
    .select(
      '*, course:partner_lms_courses(*), provider:partner_lms_providers(*)'
    )
    .eq('id', enrollmentId)
    .eq('student_id', user.id)
    .single();

  if (!enrollment) {
    redirect('/student/dashboard');
  }

  // Update last accessed timestamp
  await supabase
    .from('partner_lms_enrollments')
    .update({ last_accessed_at: new Date().toISOString() })
    .eq('id', enrollmentId);

  // Generate SSO URL
  try {
    const ssoUrl = await getSsoLaunchUrl(
      enrollment.external_student_id,
      enrollment.external_course_id,
      enrollment.provider.api_key
    );

    // Redirect to Milady course
    redirect(ssoUrl);
  } catch (error) {
    console.error('SSO launch error:', error);

    // Fallback to direct course URL
    const courseUrl =
      enrollment.course.enrollment_url || 'https://www.miladytraining.com';
    redirect(courseUrl);
  }
}
