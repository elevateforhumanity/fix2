import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

/**
 * MAIN DASHBOARD ROUTER
 *
 * Routes authenticated users to their role-specific dashboard.
 * This is the single entry point for /dashboard - all role-specific
 * dashboards live in their own route segments with dedicated layouts.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/dashboard');
  }

  // Get user profile to determine role
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (error || !profile) {
    // Profile not found - redirect to onboarding
    redirect('/onboarding');
  }

  // Redirect based on role
  switch (profile.role) {
    // Admin roles
    case 'admin':
    case 'super_admin':
    case 'org_admin':
      redirect('/admin/dashboard');
      break;

    // Program holder / partner roles
    case 'program_holder':
    case 'partner':
      redirect('/program-holder/dashboard');
      break;

    // Employer role
    case 'employer':
      redirect('/employer/dashboard');
      break;

    // Staff role
    case 'staff':
      redirect('/staff-portal/dashboard');
      break;

    // Instructor role
    case 'instructor':
      redirect('/instructor/dashboard');
      break;

    // Board member and workforce board - no dedicated dashboards
    case 'board_member':
    case 'workforce_board':
      redirect('/unauthorized');
      break;

    // Student role (default)
    case 'student':
    default:
      redirect('/lms/dashboard');
  }
}
