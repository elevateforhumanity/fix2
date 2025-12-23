import { redirect } from 'next/navigation';

/**
 * PORTAL PARENT DASHBOARD REDIRECT
 *
 * Legacy portal route structure.
 * Redirects to canonical parent portal dashboard.
 */
export default function PortalParentDashboard() {
  redirect('/parent-portal/dashboard');
}
