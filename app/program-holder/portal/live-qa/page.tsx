import { redirect } from 'next/navigation';

// DEPRECATED: Live Q&A is not yet implemented
// Redirect to support
export default function PortalLiveQARedirect() {
  redirect('/program-holder/support');
}
