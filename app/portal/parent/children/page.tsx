import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'My Children | Elevate For Humanity',
  description: 'Manage your children\'s learning accounts',
};

export default async function ChildrenPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Children</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Children's profiles and progress will appear here.</p>
        </div>
      </div>
    </div>
  );
}
