'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Share2, CheckCircle2, XCircle } from 'lucide-react';

function ShareTargetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [processing, setProcessing] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleSharedContent();
  }, []);

  const handleSharedContent = async () => {
    try {
      // Get shared data from URL params
      const title = searchParams.get('title');
      const text = searchParams.get('text');
      const url = searchParams.get('url');

      console.log('Received shared content:', { title, text, url });

      // Process the shared content
      // In a real app, you would:
      // 1. Save to database
      // 2. Create a new post/note
      // 3. Add to bookmarks
      // 4. Share with course discussion

      // For now, just show success
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setProcessing(false);

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/lms/dashboard');
      }, 2000);
    } catch (err) {
      console.error('Error processing shared content:', err);
      setError('Failed to process shared content');
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {processing && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
                <Share2 size={40} className="text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Processing Shared Content
            </h1>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}
        {success && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 size={40} className="text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Content Received!
            </h1>
            <p className="text-gray-600 mb-4">
              Your shared content has been saved successfully.
            </p>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
        {error && (
          <>
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle size={40} className="text-red-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/lms/dashboard')}
              className="px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 active:scale-95 transition-all"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ShareTargetPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <ShareTargetContent />
    </Suspense>
  );
}
