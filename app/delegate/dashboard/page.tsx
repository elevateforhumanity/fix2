import { redirect } from 'next/navigation';

/**
 * DELEGATE DASHBOARD REDIRECT
 *
 * Delegate is not a separate role.
 * Redirecting to main dashboard router.
 */
export default function DelegateDashboardRedirect() {
  redirect('/dashboard');
}
