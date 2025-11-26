import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { AutoFlowCharts } from '@/components/admin/AutoFlowCharts';

export const metadata = {
  title: 'Workflow Automation | Admin',
  description: 'Automated workflow generation and management',
};

export default async function WorkflowsPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/workflows');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  if (!['admin'].includes(profile?.role)) {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Workflow Automation</h1>
          <p className="mt-2 text-gray-600">
            Create and manage automated workflows
          </p>
        </div>
        
        <AutoFlowCharts />
      </div>
    </div>
  );
}
