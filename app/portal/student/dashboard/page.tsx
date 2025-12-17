import { redirect } from 'next/navigation';

export const metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/lms/dashboard',
  },
  title: 'Student Dashboard | Elevate For Humanity',
  description: 'Your personalized learning dashboard',
};

// This route has been consolidated into /lms/dashboard
export default function StudentDashboard() {
  redirect('/lms/dashboard');
}
