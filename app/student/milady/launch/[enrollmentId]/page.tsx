'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, ExternalLink, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function MiladyLaunchPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [courseName, setCourseName] = useState<string>('');

  useEffect(() => {
    const launchCourse = async () => {
      try {
        const response = await fetch('/api/milady/sso', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            enrollmentId: params.enrollmentId,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to launch course');
        }

        setCourseName(data.courseName);

        // Open in new tab
        window.open(data.ssoUrl, '_blank');

        // Redirect back to dashboard after a short delay
        setTimeout(() => {
          router.push('/student/dashboard');
        }, 2000);

      } catch (err) {
        console.error('Launch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to launch course');
        setLoading(false);
      }
    };

    launchCourse();
  }, [params.enrollmentId, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Unable to Launch Course
          </h1>
          <p className="text-slate-600 mb-6">
            {error}
          </p>
          <Link
            href="/student/dashboard"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <Loader2 className="w-8 h-8 text-orange-600 animate-spin" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Launching Course...
        </h1>
        {courseName && (
          <p className="text-lg text-slate-700 mb-4 font-medium">
            {courseName}
          </p>
        )}
        <p className="text-slate-600 mb-6">
          Your Milady RISE course is opening in a new tab
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
          <ExternalLink className="w-4 h-4" />
          <span>Opening Milady Training Platform...</span>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-3">
            If the course doesn't open automatically:
          </p>
          <Link
            href="/student/dashboard"
            className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
