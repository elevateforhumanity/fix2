import { redirect } from 'next/navigation';

/**
 * PARTNER DASHBOARD REDIRECT
 *
 * Partner and Program Holder are the same role in this system.
 * This route redirects to the canonical program holder dashboard.
 */
export default function PartnerDashboard() {
  redirect('/program-holder/dashboard');
}
