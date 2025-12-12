import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Discussion Forums | Elevate for Humanity',
  description: 'Connect with peers, ask questions, and share knowledge in our student community forums.',
};

export default function ForumsPage() {
  // Redirect to LMS forums
  redirect('/lms/forums');
}
