import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Badges | Elevate For Humanity',
  description: 'Learn more about Badges inside the Elevate For Humanity workforce ecosystem.',
};

export default async function Page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Badges | Elevate For Humanity</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-4">Content</h2>
                <p className="text-gray-600">Welcome, {profile?.full_name || 'Student'}</p>
              </div>
            </div>
            <div>
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  <Link href="/student/dashboard" className="block p-2 hover:bg-gray-50 rounded">Dashboard</Link>
                  <Link href="/student/courses" className="block p-2 hover:bg-gray-50 rounded">Courses</Link>
                  <Link href="/student/assignments" className="block p-2 hover:bg-gray-50 rounded">Assignments</Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}