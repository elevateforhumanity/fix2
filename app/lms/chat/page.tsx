'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LMSChatPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the AI tutor
    router.push('/aitutor');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brandPrimary mx-auto mb-4" />
        <p className="text-slate-600">Redirecting to AI Tutor...</p>
      </div>
    </div>
  );
}
