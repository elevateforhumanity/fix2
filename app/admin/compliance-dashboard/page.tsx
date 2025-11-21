import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import WIOAComplianceDashboard from '@/components/admin/WIOAComplianceDashboard';

export const metadata = {
  title: 'WIOA Compliance Dashboard | Admin',
  description: 'Comprehensive WIOA, WRG, JRI, and DOL compliance monitoring',
};

export default async function WIOACompliancePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/compliance-dashboard');
  }

  // Check if user is admin/staff
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!['admin', 'staff'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  return <WIOAComplianceDashboard />;
}
