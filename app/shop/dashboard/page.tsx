import { redirect } from 'next/navigation';

/**
 * SHOP DASHBOARD REDIRECT
 *
 * Shop is not a core role in the current system.
 * Redirecting to main dashboard router.
 */
export default function ShopDashboardRedirect() {
  redirect('/dashboard');
}
