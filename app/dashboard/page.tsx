import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Dashboard | Elevate For Humanity',
  description: 'Your personalized dashboard',
};

// Main dashboard router - redirects to appropriate dashboard based on user role
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/dashboard');
  }

  // Get user profile to determine role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  // Redirect based on role
  switch (profile?.role) {
    case 'admin':
    case 'super_admin':
    case 'org_admin':
      redirect('/admin/dashboard');
      break;
    case 'instructor':
      redirect('/instructor/dashboard');
      break;
    case 'staff':
      redirect('/staff-portal/dashboard');
      break;
    case 'student':
    default:
      redirect('/lms/dashboard');
  }
}
