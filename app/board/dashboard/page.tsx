import { redirect } from 'next/navigation';

/**
 * BOARD DASHBOARD REDIRECT
 *
 * Board role ELIMINATED (0 users, no active product need).
 * See: docs/roles-and-dashboards.md
 *
 * Redirects to main dashboard router.
 */
export default function BoardDashboardRedirect() {
  redirect('/dashboard');
}
