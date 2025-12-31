import { redirect } from 'next/navigation';


// This route has been consolidated into /lms/dashboard
export default function StudentDashboard() {
  redirect('/lms/dashboard');
}
