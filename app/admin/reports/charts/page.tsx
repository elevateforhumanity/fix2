import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { ExcelChartGenerator } from '@/components/admin/ExcelChartGenerator';

export const metadata = {
  title: 'Chart Generator | Admin',
  description: 'Generate charts and export to Excel',
};

export default async function ChartsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/reports/charts');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!['admin', 'staff'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Chart Generator</h1>
          <p className="mt-2 text-gray-600">
            Create and export charts to Excel
          </p>
        </div>
        
        <ExcelChartGenerator />
      </div>
    </div>
  );
}
