import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Redirecting to Admin Dashboard...',
};

export default function DirectoryPage() {
  // Redirect to admin dashboard
  redirect('/admin');
}