import { redirect } from 'next/navigation';

// DEPRECATED: Messaging is not yet implemented
// Redirect to support
export default function PortalMessagesRedirect() {
  redirect('/program-holder/support');
}
