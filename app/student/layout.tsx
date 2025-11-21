import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  // Require authentication and student enrollment
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
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
  const isEnrolled = profile?.enrollment_status === 'active' || profile?.enrollment_status === 'enrolled';
  const isStaff = allowedRoles.includes(profile?.role);

  if (!isEnrolled && !isStaff) {
    redirect('/apply?message=You must be enrolled in a program to access student portal');
  }

  return <>{children}</>;
}
