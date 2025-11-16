import { useState, useEffect, useCallback, useRef } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Safe async hook that prevents infinite loading states
 * Always resolves to a final state (success, error, or empty)
 * Fixed: Uses ref for cancellation to prevent race conditions
 */
export function useSafeAsync<T>(
  asyncFn: () => Promise<T>,
  deps: React.DependencyList = [],
  defaultValue: T | null = null
): AsyncState<T> & { retry: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: defaultValue,
    loading: true,
    error: null,
  });

  // Use ref to track cancellation - prevents race condition
  const cancelledRef = useRef(false);

  const execute = useCallback(async () => {
    cancelledRef.current = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFn();
      if (!cancelledRef.current) {
        setState({ data: result ?? defaultValue, loading: false, error: null });
      }
    } catch (err) {
      if (!cancelledRef.current) {
        const error = err instanceof Error ? err : new Error(String(err));
        setState({ data: defaultValue, loading: false, error });
      }
    }
  }, deps);

  useEffect(() => {
    execute();

    return () => {
      cancelledRef.current = true;
    };
  }, [execute]);

  const retry = useCallback(() => {
    execute();
  }, [execute]);

  return { ...state, retry };
}

/**
 * Example usage:
 *
 * const { data, loading, error, retry } = useSafeAsync(
 *   async () => {
 *     const res = await fetch('/api/programs');
 *     if (!res.ok) throw new Error('Failed to fetch');
 *     return res.json();
 *   },
 *   [],
 *   [] // default empty array
 * );
 *
 * if (loading) return <Skeleton />;
 * if (error) return <ErrorState onRetry={retry} />;
 * if (!data || data.length === 0) return <EmptyState />;
 * return <ProgramsList programs={data} />;
 */
