import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import AICareerCounseling from '@/components/AICareerCounseling';

export const metadata = {
  title: 'AI Career Counseling | Student Portal',
  description: 'Get personalized career guidance powered by AI',
};

export default async function CareerCounselingPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/career-counseling');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Career Counseling</h1>
          <p className="mt-2 text-gray-600">
            Get personalized career guidance and recommendations
          </p>
        </div>
        
        <AICareerCounseling />
      </div>
    </div>
  );
}
