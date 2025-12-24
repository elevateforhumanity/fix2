import { redirect } from 'next/navigation';

/**
 * PORTAL PARENT DASHBOARD REDIRECT
 *
 * Legacy portal route structure.
 * Parent role removed from schema - no parent dashboard exists.
 * Redirects to unauthorized page.
 */
export default function PortalParentDashboard() {
  redirect('/unauthorized');
}
