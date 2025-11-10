import { describe, it, expect, vi, beforeEach } from 'vitest';
import { safeFetch, safeSupabaseQuery } from '../safeFetch';

describe('safeFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('returns data on successful fetch', async () => {
    const mockData = { id: 1, name: 'Test' };
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const result = await safeFetch('https://api.example.com/data');
    expect(result).toEqual(mockData);
  });

  it('returns null on failed fetch', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const result = await safeFetch('https://api.example.com/data');
    expect(result).toBeNull();
  });

  it('returns null on network error', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const result = await safeFetch('https://api.example.com/data');
    expect(result).toBeNull();
  });

  it('includes Accept header', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await safeFetch('https://api.example.com/data');

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/json',
        }),
      })
    );
  });

  it('merges custom headers', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await safeFetch('https://api.example.com/data', {
      headers: { Authorization: 'Bearer token' },
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.example.com/data',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/json',
          Authorization: 'Bearer token',
        }),
      })
    );
  });
});

describe('safeSupabaseQuery', () => {
  it('returns data on successful query', async () => {
    const mockData = [{ id: 1 }, { id: 2 }];
    const queryFn = vi.fn().mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await safeSupabaseQuery(queryFn);
    expect(result).toEqual(mockData);
  });

  it('returns empty array on error', async () => {
    const queryFn = vi.fn().mockResolvedValue({
      data: null,
      error: { message: 'Database error' },
    });

    const result = await safeSupabaseQuery(queryFn);
    expect(result).toEqual([]);
  });

  it('returns empty array on exception', async () => {
    const queryFn = vi.fn().mockRejectedValue(new Error('Connection failed'));

    const result = await safeSupabaseQuery(queryFn);
    expect(result).toEqual([]);
  });

  it('returns empty array when data is null', async () => {
    const queryFn = vi.fn().mockResolvedValue({
      data: null,
      error: null,
    });

    const result = await safeSupabaseQuery(queryFn);
    expect(result).toEqual([]);
  });
});
