import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function PortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const role = profile?.role || 'student';

  switch (role) {
    case 'student':
      redirect('/portal/student/dashboard');
      break;
    case 'staff':
    case 'instructor':
      redirect('/portal/staff/dashboard');
      break;
    case 'parent':
      redirect('/portal/parent/dashboard');
      break;
    case 'employer':
      redirect('/portal/employer/dashboard');
      break;
    case 'admin':
      redirect('/admin');
      break;
    default:
      redirect('/portal/student/dashboard');
  }
}
