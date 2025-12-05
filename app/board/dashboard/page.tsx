import { Metadata } from 'next';
import RoleDashboard from '@/components/dashboards/RoleDashboard';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Workforce Board Dashboard | Elevate For Humanity',
  description: 'Monitor workforce development metrics and program outcomes',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/login');
  }

  return <RoleDashboard role="board" userName={user.email?.split('@')[0]} />;
}
