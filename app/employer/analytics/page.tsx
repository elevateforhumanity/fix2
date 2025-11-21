import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import EmployerWorkforceAnalytics from '@/components/EmployerWorkforceAnalytics';

export const metadata = {
  title: 'Workforce Analytics | Employer Portal',
  description: 'Analytics and insights for employer partners',
};

export default async function EmployerAnalyticsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/employer/analytics');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!['employer', 'admin', 'staff'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workforce Analytics</h1>
          <p className="mt-2 text-gray-600">
            Analytics and insights for your workforce development initiatives
          </p>
        </div>
        
        <EmployerWorkforceAnalytics />
      </div>
    </div>
  );
}
