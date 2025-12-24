import { redirect } from 'next/navigation';

/**
 * PROGRAM HOLDER APPLICATION REDIRECT
 *
 * Redirects to existing program holder application form.
 * Maintains clean /apply/* routing structure.
 */
export default function ProgramHolderApplicationRedirect() {
  redirect('/program-holder/apply');
}
