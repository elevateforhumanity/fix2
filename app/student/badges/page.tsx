import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import MicroCredentialsBadges from '@/components/MicroCredentialsBadges';

export const metadata = {
  title: 'My Badges & Credentials | Student Portal',
  description: 'View and share your earned micro-credentials and digital badges',
};

export default async function BadgesPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/student/badges');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Badges & Credentials</h1>
          <p className="mt-2 text-gray-600">
            View, download, and share your earned micro-credentials and digital badges
          </p>
        </div>
        
        <MicroCredentialsBadges />
      </div>
    </div>
  );
}
