import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { LearningBarrierAnalyzer } from '@/components/admin/LearningBarrierAnalyzer';

export const metadata = {
  title: 'Learning Barrier Analyzer | Admin',
  description: 'Identify and address student learning barriers',
};

export default async function BarriersPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/barriers');
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
          <h1 className="text-3xl font-bold text-gray-900">Learning Barrier Analyzer</h1>
          <p className="mt-2 text-gray-600">
            Identify and address barriers to student success
          </p>
        </div>
        
        <LearningBarrierAnalyzer />
      </div>
    </div>
  );
}
