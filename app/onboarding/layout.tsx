import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function OnboardingLayout({ children }: { children: React.ReactNode }) {
  // Require authentication and enrollment for onboarding
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/onboarding');
  }

  // Check if user is enrolled or staff
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, enrollment_status')
    .eq('id', session.user.id)
    .single();

  const allowedRoles = ['student', 'instructor', 'admin', 'staff'];
  const isEnrolled = profile?.enrollment_status === 'active' || profile?.enrollment_status === 'enrolled';
  const isStaff = allowedRoles.includes(profile?.role);

  // Only enrolled students and staff can access onboarding
  if (!isEnrolled && !isStaff) {
    redirect('/apply?message=Complete your application to access onboarding');
  }

  return <>{children}</>;
}
