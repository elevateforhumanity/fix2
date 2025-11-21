import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth';
import InstructorPerformanceDashboard from '@/components/InstructorPerformanceDashboard';

export const metadata = {
  title: 'Instructor Performance Dashboard | Admin',
  description: 'Monitor instructor performance and effectiveness metrics',
};

export default async function InstructorPerformancePage() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/instructors/performance');
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
          <h1 className="text-3xl font-bold text-gray-900">Instructor Performance Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Monitor instructor effectiveness and performance metrics
          </p>
        </div>
        
        <InstructorPerformanceDashboard />
      </div>
    </div>
  );
}
