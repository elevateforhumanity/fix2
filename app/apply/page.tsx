import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Apply Now | Elevate for Humanity',
  description: 'Apply for free workforce training programs.',
};

export default function ApplyPage() {
  // Redirect to enrollment page which has the actual application form
  redirect('/enroll');
}
