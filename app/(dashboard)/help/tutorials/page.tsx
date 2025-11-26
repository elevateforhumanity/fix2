import { Metadata } from 'next';
import { TutorialLibrary } from '@/components/TutorialSystem';
import { requireAuth } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Interactive Tutorials | Elevate for Humanity',
  description: 'Learn how to use all platform features with step-by-step interactive tutorials',
,
  openGraph: {
    images: ["/images/programs-new/program-25.jpg"],
    type: "website",
  }};

export default async function TutorialsPage() {
  const session = await requireAuth();
  const userId = session?.user?.id || '';
  const userRole = (session?.user as any)?.role || 'student';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TutorialLibrary 
          userId={userId} 
          userRole={userRole} 
        />
      </div>
    </div>
  );
}
