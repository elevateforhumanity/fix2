/**
 * Safe fetch utility that never crashes the app
 * Returns null on error instead of throwing
 */

export async function safeFetch<T = any>(
  url: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
      `Fetch error: ${url}`,
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

/**
 * Safe Supabase query wrapper
 * Returns empty array on error instead of throwing
 */
export async function safeSupabaseQuery<T = any>(
  queryFn: () => Promise<{ data: T[] | null; error: any }>
): Promise<T[]> {
  try {
    const { data, error } = await queryFn();

    if (error) {
      return [];
    }

    return data ?? [];
  } catch (error) {
      'Supabase query failed:',
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
