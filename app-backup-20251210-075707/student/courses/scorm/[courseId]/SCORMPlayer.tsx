'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, ArrowLeft } from 'lucide-react';

interface SCORMPlayerProps {
  courseId: string;
  courseName: string;
  scormUrl: string;
  userId: string;
  enrollmentId: string;
}

export function SCORMPlayer({
  courseId,
  courseName,
  scormUrl,
  userId,
  enrollmentId,
}: SCORMPlayerProps) {
  const router = useRouter();
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Listen for SCORM completion messages
    const handleMessage = async (event: MessageEvent) => {
      if (event.data.type === 'scorm_complete') {
        setCompleted(true);
        
        // Save completion to database
        await fetch('/api/courses/complete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId,
            userId,
            enrollmentId,
            completionData: event.data,
          }),
        });
      }

      if (event.data.type === 'scorm_progress') {
        setProgress(event.data.progress || 0);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [courseId, userId, enrollmentId]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push('/student/courses')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-lg font-semibold text-gray-900">{courseName}</h1>
          </div>
          
          {progress > 0 && !completed && (
            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-600">Progress:</div>
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-sm font-semibold text-gray-900">{progress}%</div>
            </div>
          )}
        </div>
      </div>

      {/* SCORM Content */}
      <div className="flex-1 relative">
        <iframe
          src={scormUrl}
          className="w-full h-full border-0"
          allow="fullscreen; camera; microphone"
          title={courseName}
        />
      </div>

      {/* Completion Banner */}
      {completed && (
        <div className="bg-green-600 text-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6" />
              <div>
                <div className="font-semibold">Course Complete!</div>
                <div className="text-sm text-green-100">
                  Your certificate will be generated shortly
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push('/student/courses')}
              className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
