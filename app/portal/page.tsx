import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function PortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  // Get user role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'student';

  // Redirect based on role
  switch (role) {
    case 'student':
      redirect('/portal/student/dashboard');
    case 'staff':
    case 'instructor':
      redirect('/portal/staff/dashboard');
    case 'parent':
      redirect('/portal/parent/dashboard');
    case 'employer':
      redirect('/portal/employer/dashboard');
    case 'admin':
      redirect('/admin');
    default:
      redirect('/portal/student/dashboard');
  }
}
