import { redirect } from 'next/navigation';
import { createServerClient } from '@/lib/auth';
import StudentEngagementAnalytics from '@/components/StudentEngagementAnalytics';

export const metadata = {
  title: 'Student Engagement Analytics | Admin',
  description: 'Monitor student engagement and participation metrics',
};

export default async function EngagementAnalyticsPage() {
  const supabase = createServerClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/admin/analytics/engagement');
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
          <h1 className="text-3xl font-bold text-gray-900">Student Engagement Analytics</h1>
          <p className="mt-2 text-gray-600">
            Monitor student engagement, participation, and activity metrics
          </p>
        </div>
        
        <StudentEngagementAnalytics />
      </div>
    </div>
  );
}
