import { redirect } from 'next/navigation';

/**
 * DELEGATE DASHBOARD REDIRECT
 *
 * Delegate is not a separate role - it's an admin feature.
 * Redirecting to admin dashboard.
 */
export default function DelegateDashboardRedirect() {
  redirect('/admin/dashboard');
}
