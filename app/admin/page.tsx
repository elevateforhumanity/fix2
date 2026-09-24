import { redirect } from 'next/navigation';

/** Canonical admin entrypoint. */
export default function AdminPage() {
  redirect('/admin/dashboard');
}
