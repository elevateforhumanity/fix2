import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/auth';
import PeerReviewSystem from '@/components/PeerReviewSystem';

export const metadata = {
  title: 'Peer Review | LMS',
  description: 'Review and provide feedback on peer work',
};

export default async function PeerReviewPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    redirect('/login?redirect=/lms/peer-review');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Peer Review</h1>
          <p className="mt-2 text-gray-600">
            Review assignments and provide constructive feedback
          </p>
        </div>
        
        <PeerReviewSystem />
      </div>
    </div>
  );
}
