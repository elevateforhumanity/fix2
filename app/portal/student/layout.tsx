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

  // Check if user has profile (all authenticated users should have access)
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // Allow all authenticated users with profiles to access student portal
  // They can browse programs and enroll from within the portal
  if (!profile) {
    redirect('/login?message=Profile not found. Please contact support.');
  }

  return <>{children}</>;
}
