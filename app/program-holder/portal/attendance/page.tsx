import { redirect } from 'next/navigation';

// DEPRECATED: Attendance tracking is not yet implemented
// Redirect to dashboard
export default function PortalAttendanceRedirect() {
  redirect('/program-holder/dashboard');
}
