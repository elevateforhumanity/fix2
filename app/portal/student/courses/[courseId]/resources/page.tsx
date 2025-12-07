import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Resources | Elevate For Humanity',
  description: 'Discover more about Resources inside the Elevate For Humanity workforce ecosystem.',
};

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resources | Elevate For Humanity
          </h1>
          <p className="text-gray-600">
            Discover more about Resources inside the Elevate For Humanity workforce ecosystem.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Progress</p>
                    <p className="text-2xl font-bold text-gray-900">0%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-lg font-semibold text-green-600">0 / 0</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="text-center py-8 text-gray-500">
                <p>No recent activity</p>
                <Link 
                  href="/student/courses" 
                  className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
                >
                  Browse Courses →
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <nav className="space-y-2">
                <Link href="/student/dashboard" className="block p-2 hover:bg-gray-50 rounded">
                  Dashboard
                </Link>
                <Link href="/student/courses" className="block p-2 hover:bg-gray-50 rounded">
                  My Courses
                </Link>
                <Link href="/student/progress" className="block p-2 hover:bg-gray-50 rounded">
                  Progress
                </Link>
                <Link href="/student/certificates" className="block p-2 hover:bg-gray-50 rounded">
                  Certificates
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
