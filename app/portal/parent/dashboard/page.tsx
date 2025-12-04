import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Parent Dashboard | Elevate For Humanity',
  description: 'Monitor your children\'s learning progress',
};

export default async function ParentDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/portal/parent/children" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">My Children</h2>
            <p className="text-gray-600">View and manage your children's profiles</p>
          </Link>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Progress Reports</h2>
            <p className="text-gray-600">Track learning progress and achievements</p>
          </div>
        </div>
      </div>
    </div>
  );
}
