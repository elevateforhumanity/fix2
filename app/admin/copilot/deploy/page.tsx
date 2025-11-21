import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import CopilotDeployment from '@/components/admin/CopilotDeployment';

export const metadata = {
  title: 'Copilot Deployment | Admin',
  description: 'Deploy and manage AI copilot instances',
};

export default async function CopilotDeployPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/copilot/deploy');
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
          <h1 className="text-3xl font-bold text-gray-900">Copilot Deployment</h1>
          <p className="mt-2 text-gray-600">
            Deploy and configure AI copilot instances
          </p>
        </div>
        
        <CopilotDeployment />
      </div>
    </div>
  );
}
