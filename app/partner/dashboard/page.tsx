import { redirect } from 'next/navigation';

/**
 * PARTNER DASHBOARD REDIRECT
 *
 * Partner is NOT a role. Partner is an organization classification.
 * See: docs/roles-and-dashboards.md
 *
 * This route redirects to program holder dashboard.
 */
export default function PartnerDashboard() {
  redirect('/program-holder/dashboard');
}
