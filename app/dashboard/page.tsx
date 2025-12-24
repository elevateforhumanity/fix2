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
  // Only routes roles that have actual users in the database
  // See: docs/database-proof-RESULTS.md for verification
  switch (profile.role) {
    case 'admin':
      redirect('/admin/dashboard');

    case 'staff':
      redirect('/staff-portal/dashboard');

    case 'instructor':
      redirect('/instructor/dashboard');

    case 'student':
    default:
      // Default to student dashboard for any unknown roles
      redirect('/lms/dashboard');
  }
}
