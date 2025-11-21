import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import ContentLibrary from '@/components/ContentLibrary';

export const metadata = {
  title: 'Content Library | LMS',
  description: 'Browse and manage learning content',
};

export default async function LibraryPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/lms/library');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Content Library</h1>
          <p className="mt-2 text-gray-600">
            Browse courses, videos, documents, and learning resources
          </p>
        </div>
        
        <ContentLibrary />
      </div>
    </div>
  );
}
