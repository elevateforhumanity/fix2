import { redirect } from 'next/navigation';

export const metadata = {
  alternates: {
    canonical: 'https://www.elevateforhumanity.org/staff-portal/dashboard',
  },
  title: 'Staff Dashboard | Elevate For Humanity',
  description: 'Manage students, courses, and administrative tasks',
};

// This route has been consolidated into /staff-portal/dashboard
export default function DashboardPage() {
  redirect('/staff-portal/dashboard');
}
