import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';

export default async function ForumPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from('forum_categories')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        <Link
          href="/forum/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Thread
        </Link>
      </div>

      <div className="space-y-4">
        {categories && categories.length > 0 ? (
          categories.map((category: unknown) => (
            <Link
              key={category.id}
              href={`/forum/${category.id}`}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold mb-2">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                {category.thread_count || 0} threads
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No forum categories yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
