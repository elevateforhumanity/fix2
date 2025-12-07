import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { HSICoursePlayer } from './HSICoursePlayer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/courses/hsi/[courseType]/learn",
  },
  title: 'HSI Course | Elevate For Humanity',
};

export default async function HSICourseLearningPage({
  params,
}: {
  params: { courseType: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get HSI course details
  const { data: course } = await supabase
    .from('partner_courses')
    .select('*')
    .eq('course_code', `HSI-${params.courseType.toUpperCase()}`)
    .single();

  if (!course) {
    redirect('/courses/hsi');
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('partner_enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', course.id)
    .single();

  if (!enrollment) {
    redirect(`/courses/hsi/${params.courseType}/enroll`);
  }

  // HSI enrollment URL (from Geoff Albrecht)
  const hsiEnrollmentUrl = course.course_url || `https://otis.osmanager4.com/#/nts/openenrollment/${params.courseType}`;

  return (
    <HSICoursePlayer
      courseId={course.id}
      courseName={course.course_name}
      hsiUrl={hsiEnrollmentUrl}
      userId={user.id}
      enrollmentId={enrollment.id}
    />
  );
}
