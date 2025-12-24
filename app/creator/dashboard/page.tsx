import { redirect } from 'next/navigation';

/**
 * CREATOR DASHBOARD REDIRECT
 *
 * Creator is not a core role in the current system.
 * Redirecting to main dashboard router.
 */
export default function CreatorDashboardRedirect() {
  redirect('/dashboard');
}
