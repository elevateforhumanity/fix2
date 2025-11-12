import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect root to LMS dashboard
  redirect('/lms/dashboard');
}
