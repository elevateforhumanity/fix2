import { permanentRedirect } from 'next/navigation';

export default function StaffPortalRedirect() {
  permanentRedirect('/admin');
}
