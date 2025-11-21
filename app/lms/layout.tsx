import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import MobileNav from '@/components/mobile/MobileNav';
import InstallPrompt from '@/components/mobile/InstallPrompt';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export default async function LMSLayout({ children }: { children: React.ReactNode }) {
  // Require authentication and enrollment for all LMS pages
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/lms/dashboard');
  }

  // Check if user is enrolled in a program or is staff
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, enrollment_status')
    .eq('id', session.user.id)
    .single();

  const allowedRoles = ['student', 'instructor', 'admin', 'staff'];
  const isEnrolled = profile?.enrollment_status === 'active' || profile?.enrollment_status === 'enrolled';
  const isStaff = allowedRoles.includes(profile?.role);

  // Only allow access if user is enrolled in a program OR is staff
  if (!isEnrolled && !isStaff) {
    redirect('/apply?message=You must be enrolled in a program to access the LMS');
  }

  return (
    <>
      <MobileNav />
      <InstallPrompt />
      <div className="has-bottom-nav">{children}</div>
    </>
  );
}
