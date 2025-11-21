import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import AutoProgramGenerator from '@/components/admin/AutoProgramGenerator';

export const metadata = {
  title: 'Program Generator | Admin',
  description: 'AI-powered program creation and curriculum design',
};

export default async function ProgramGeneratorPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/program-generator');
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
          <h1 className="text-3xl font-bold text-gray-900">AI Program Generator</h1>
          <p className="mt-2 text-gray-600">
            Generate complete training programs with AI assistance
          </p>
        </div>
        
        <AutoProgramGenerator />
      </div>
    </div>
  );
}
