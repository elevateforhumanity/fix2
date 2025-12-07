import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SCORMPlayer } from './SCORMPlayer';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.elevateforhumanity.org/student/courses/scorm/[courseId]",
  },
  title: 'Course Player | Elevate For Humanity',
};

export default async function SCORMCoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get course details
  const { data: course } = await supabase
    .from('partner_courses')
    .select('*')
    .eq('id', params.courseId)
    .single();

  if (!course) {
    redirect('/student/courses');
  }

  // Check enrollment
  const { data: enrollment } = await supabase
    .from('partner_enrollments')
    .select('*')
    .eq('user_id', user.id)
    .eq('course_id', params.courseId)
    .single();

  if (!enrollment) {
    redirect('/student/courses');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SCORMPlayer
        courseId={params.courseId}
        courseName={course.course_name}
        scormUrl={course.scorm_launch_url}
        userId={user.id}
        enrollmentId={enrollment.id}
      />
    </div>
  );
}
