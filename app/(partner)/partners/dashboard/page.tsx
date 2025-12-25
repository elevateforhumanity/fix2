import { redirect } from 'next/navigation';

/**
 * LEGACY PARTNERS DASHBOARD REDIRECT
 *
 * Partner is NOT a role. Partner is an organization classification.
 * See: docs/roles-and-dashboards.md
 *
 * This legacy route redirects to program holder dashboard.
 */
export default function LegacyPartnersDashboard() {
  redirect('/program-holder/dashboard');
}
