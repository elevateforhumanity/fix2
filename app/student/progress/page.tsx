import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { CourseCompletionTracking } from '@/components/CourseCompletionTracking';

export const metadata = {
  title: 'My Progress | Student Portal',
  description: 'Track your course completion and achievements',
,
  openGraph: {
    images: ["/images/team-new/team-6.jpg"],
    type: "website",
  }};

export default async function ProgressPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/progress');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Progress</h1>
          <p className="mt-2 text-gray-600">
            Track your learning journey and achievements
          </p>
        </div>
        
        <CourseCompletionTracking />
      </div>
    </div>
  );
}
