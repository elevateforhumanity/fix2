import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import AdaptiveLearning from '@/components/AdaptiveLearning';

export const metadata = {
  title: 'Adaptive Learning | LMS',
  description: 'Personalized learning paths powered by AI',
};

export default async function AdaptiveLearningPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/lms/adaptive');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Adaptive Learning</h1>
          <p className="mt-2 text-gray-600">
            AI-powered personalized learning experiences
          </p>
        </div>
        
        <AdaptiveLearning />
      </div>
    </div>
  );
}
