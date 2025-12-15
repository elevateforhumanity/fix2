export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
// Image asset: /images/success-new/success-14.jpg
import { createServerSupabaseClient } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Portal - My Learning Journey',
  description:
    'Access your courses, grades, assignments, certificates, and track your progress through career training programs.',
  keywords: [
    'student portal',
    'my courses',
    'grades',
    'assignments',
    'certificates',
    'learning progress',
  ],
  manifest: '/manifest-student.json',
  openGraph: {
    title: 'Student Portal | Elevate for Humanity',
    description:
      'Access your courses, grades, assignments, and track your learning progress.',
    images: ['/images/homepage/student-portal.png'],
    type: 'website',
  },
};

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require authentication and student enrollment
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login?redirect=/student/dashboard');
  }

  // Check if user is enrolled student or staff
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, enrollment_status')
    .eq('id', session.user.id)
    .single();

  const allowedRoles = ['student', 'instructor', 'admin', 'staff'];
  const isEnrolled =
    profile?.enrollment_status === 'active' ||
    profile?.enrollment_status === 'enrolled';
  const isStaff = allowedRoles.includes(profile?.role);

  if (!isEnrolled && !isStaff) {
    redirect(
      '/apply?message=You must be enrolled in a program to access student portal'
    );
  }

  return <>{children}</>;
}
