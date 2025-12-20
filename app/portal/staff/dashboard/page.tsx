import { redirect } from 'next/navigation';


// This route has been consolidated into /staff-portal/dashboard
export default function DashboardPage() {
  redirect('/staff-portal/dashboard');
}
