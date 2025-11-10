import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

/**
 * Safe async hook that prevents infinite loading states
 * Always resolves to a final state (success, error, or empty)
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

  const execute = useCallback(async () => {
    let cancelled = false;
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await asyncFn();
      if (!cancelled) {
        setState({ data: result ?? defaultValue, loading: false, error: null });
      }
    } catch (err) {
      if (!cancelled) {
        const error = err instanceof Error ? err : new Error(String(err));
        console.error('useSafeAsync error:', error);
        setState({ data: defaultValue, loading: false, error });
      }
    }

    return () => {
      cancelled = true;
    };
  }, deps);

  useEffect(() => {
    const cleanup = execute();
    return () => {
      cleanup.then(fn => fn?.());
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
