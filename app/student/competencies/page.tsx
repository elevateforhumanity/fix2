import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import CompetencyTracking from '@/components/CompetencyTracking';

export const metadata = {
  title: 'Competency Tracking | Student Portal',
  description: 'Track your skill development and competency progress',
};

export default async function CompetenciesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/competencies');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Competency Tracking</h1>
          <p className="mt-2 text-gray-600">
            Monitor your skill development and competency mastery
          </p>
        </div>
        
        <CompetencyTracking />
      </div>
    </div>
  );
}
