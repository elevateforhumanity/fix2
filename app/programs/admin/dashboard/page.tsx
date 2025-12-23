import { redirect } from 'next/navigation';

/**
 * LEGACY PROGRAMS ADMIN DASHBOARD REDIRECT
 *
 * This was an alternate admin dashboard route.
 * Redirects to canonical admin dashboard.
 */
export default function LegacyProgramsAdminDashboard() {
  redirect('/admin/dashboard');
}
