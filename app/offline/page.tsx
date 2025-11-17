'use client';

import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <WifiOff className="mx-auto text-gray-400" size={80} />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">You&apos;re Offline</h1>
        
        <p className="text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Some features may not be available until you&apos;re back online.
        </p>

        <div className="space-y-4">
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
          
          <p className="text-sm text-gray-500">
            Your progress is saved locally and will sync when you&apos;re back online.
          </p>
        </div>
      </div>
    </div>
  );
}
