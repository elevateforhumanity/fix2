import { Metadata } from 'next';
import { TutorialLibrary } from '@/components/TutorialSystem';
import { requireAuth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Interactive Tutorials | Elevate for Humanity',
  description: 'Learn how to use all platform features with step-by-step interactive tutorials',
};

export default async function TutorialsPage() {
  const user = await requireAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TutorialLibrary 
          userId={user.id} 
          userRole={user.role || 'student'} 
        />
      </div>
    </div>
  );
}
