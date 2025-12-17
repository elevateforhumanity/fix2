import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Student Dashboard | Elevate For Humanity',
  description: 'Track your progress, access courses, and manage your training',
};

// This route has been consolidated into /lms/dashboard
export default function StudentDashboard() {
  redirect('/lms/dashboard');
}
