import { useEffect, useState } from 'react';

interface ShimmerBlockProps {
  className?: string;
}

export function ShimmerBlock({ className = '' }: ShimmerBlockProps) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/80 dark:bg-slate-700/40 ${className}`}
    />
  );
}

interface ShimmerGridProps {
  items?: number;
  columns?: string;
}

export function ShimmerGrid({ items = 6, columns = 'md:grid-cols-3' }: ShimmerGridProps) {
  return (
    <div className={`grid ${columns} gap-6`}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
          <ShimmerBlock className="h-5 w-40" />
          <ShimmerBlock className="mt-3 h-4 w-3/4" />
          <ShimmerBlock className="mt-2 h-4 w-5/6" />
          <ShimmerBlock className="mt-6 h-9 w-28" />
        </div>
      ))}
    </div>
  );
}

interface UseTimedShimmerProps {
  minMs?: number;
  maxMs?: number;
  loading: boolean;
}

/**
 * Hook: keep shimmer for a minimum duration and auto-timeout (prevents flicker and infinite loading)
 */
export function useTimedShimmer({ minMs = 300, maxMs = 3000, loading }: UseTimedShimmerProps): boolean {
  const [show, setShow] = useState(loading);

  useEffect(() => {
    if (!loading) {
      // Ensure shimmer shows at least minMs before hiding (prevents flicker)
      const timer = setTimeout(() => setShow(false), minMs);
      return () => clearTimeout(timer);
    } else {
      setShow(true);
      // Hard stop at maxMs to prevent infinite loading
      const killTimer = setTimeout(() => setShow(false), maxMs);
      return () => clearTimeout(killTimer);
    }
  }, [loading, minMs, maxMs]);

  return show;
}

/**
 * Usage examples:
 * 
 * // Grid shimmer for card layouts
 * if (showShimmer) return <ShimmerGrid items={6} columns="md:grid-cols-3" />;
 * 
 * // Inline shimmer for small elements
 * {loading ? <ShimmerBlock className="h-4 w-24" /> : <span>{value}</span>}
 * 
 * // With timed hook
 * const showShimmer = useTimedShimmer({ loading, minMs: 300, maxMs: 3000 });
 */
