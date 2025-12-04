import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Course Authoring | Elevate For Humanity',
  description: 'Learn more about Course Authoring inside the Elevate For Humanity workforce ecosystem.',
};

export default async function CourseAuthoringPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Check admin role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin' && profile?.role !== 'super_admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Course Authoring | Elevate For Humanity
          </h1>
          <p className="text-gray-600">
            Learn more about Course Authoring inside the Elevate For Humanity workforce ecosystem.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-900 mb-1">Total Items</h3>
                <p className="text-2xl font-bold text-blue-600">0</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-900 mb-1">Active</h3>
                <p className="text-2xl font-bold text-green-600">0</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-900 mb-1">Pending</h3>
                <p className="text-2xl font-bold text-orange-600">0</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
