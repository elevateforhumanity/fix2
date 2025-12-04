import { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Award, TrendingUp, Target, BookOpen, Users, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Video | Student Portal',
};

export default async function VideoPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, programs(name)')
    .eq('user_id', user.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Video</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <Award className="text-blue-600 mb-3" size={32} />
            <p className="text-2xl font-bold">{enrollments?.length || 0}</p>
            <p className="text-sm text-gray-600">Total Items</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <TrendingUp className="text-green-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Active</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Target className="text-purple-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <Star className="text-orange-600 mb-3" size={32} />
            <p className="text-2xl font-bold">0%</p>
            <p className="text-sm text-gray-600">Progress</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Overview</h2>
          </div>
          <div className="p-6">
            {enrollments && enrollments.length > 0 ? (
              <div className="space-y-4">
                {enrollments.map((item: any) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.programs?.name || 'Item'}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No items yet</h3>
                <p className="text-gray-600 mb-4">Get started with Video</p>
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
