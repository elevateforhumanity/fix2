import { permanentRedirect } from 'next/navigation';

export default function StudentPortalRedirect() {
  permanentRedirect('/student/dashboard');
}
