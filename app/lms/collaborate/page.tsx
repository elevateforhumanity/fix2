import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import { RealTimeCollaboration } from '@/components/RealTimeCollaboration';

export const metadata = {
  title: 'Collaboration | LMS',
  description: 'Work together in real-time',
};

export default async function CollaboratePage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/lms/collaborate');
  }

  const currentUser = {
    id: session.user.id,
    name: session.user.email?.split('@')[0] || 'User',
    email: session.user.email || '',
    avatar: '',
    status: 'online' as const,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Real-Time Collaboration</h1>
          <p className="mt-2 text-gray-600">
            Work together with classmates and instructors
          </p>
        </div>
        
        <RealTimeCollaboration 
          roomId="general"
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}
