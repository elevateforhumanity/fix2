import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { AdaptiveLearningPath } from '@/components/AdaptiveLearningPath';

export const metadata = {
  title: 'My Learning Path | Student Portal',
  description: 'Your personalized learning journey',
};

export default async function LearningPathPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/learning-path');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Learning Path</h1>
          <p className="mt-2 text-gray-600">
            Your personalized roadmap to success
          </p>
        </div>
        
        <AdaptiveLearningPath />
      </div>
    </div>
  );
}
