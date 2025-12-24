import { redirect } from 'next/navigation';

/**
 * BOARD DASHBOARD REDIRECT
 *
 * Board members don't have a dedicated dashboard yet.
 * Redirecting to main dashboard router.
 */
export default function BoardDashboardRedirect() {
  redirect('/dashboard');
}
