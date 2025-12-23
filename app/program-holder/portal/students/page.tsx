import { redirect } from 'next/navigation';

// DEPRECATED: This route has been moved to the canonical location
// Redirect to /program-holder/students
export default function PortalStudentsRedirect() {
  redirect('/program-holder/students');
}
