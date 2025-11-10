import { useEffect, useState } from 'react';

interface LoadingShimmerProps {
  variant?: 'card' | 'list' | 'text' | 'full';
  count?: number;
  timeout?: number;
  fallback?: React.ReactNode;
}

/**
 * Loading shimmer that automatically times out to prevent infinite loading states
 * After timeout, shows fallback or empty state
 */
export default function LoadingShimmer({ 
  variant = 'card', 
  count = 3,
  timeout = 5000,
  fallback
}: LoadingShimmerProps) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  if (timedOut) {
    return fallback ? <>{fallback}</> : (
      <div className="text-center py-8 text-slate-500">
        <p>Taking longer than expected...</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-amber-600 hover:text-amber-700 underline text-sm"
        >
          Refresh page
        </button>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-amber-600 border-r-transparent"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded w-full"></div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="h-12 w-12 bg-slate-200 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: card variant
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="mt-4 h-10 bg-slate-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}

/**
 * Usage example:
 * 
 * const [loading, setLoading] = useState(true);
 * const [data, setData] = useState(null);
 * 
 * useEffect(() => {
 *   fetchData()
 *     .then(setData)
 *     .catch(console.error)
 *     .finally(() => setLoading(false));
 * }, []);
 * 
 * if (loading) {
 *   return <LoadingShimmer 
 *     variant="card" 
 *     count={6} 
 *     timeout={5000}
 *     fallback={<EmptyState title="Loading failed" onAction={() => window.location.reload()} />}
 *   />;
 * }
 * 
 * if (!data) return <EmptyState />;
 * 
 * return <DataDisplay data={data} />;
 */
