import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Student Application',
  description: 'Apply for workforce training and career development programs.',
};

/**
 * STUDENT APPLICATION
 *
 * Redirects to existing full application form.
 * This maintains backward compatibility while providing clean routing.
 */
export default function StudentApplicationPage() {
  // Redirect to existing full application
  // TODO: Replace with dedicated student application form
  redirect('/apply/full');
}
