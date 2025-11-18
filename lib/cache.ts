// lib/cache.ts
// Redis caching utilities for performance optimization
import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

async function getClient() {
  if (!process.env.REDIS_URL) {
    return null;
  }

  if (!client) {
    try {
      client = createClient({ url: process.env.REDIS_URL });
      client.on('error', (err) => console.error('Redis error', err));
      await client.connect();
    } catch (error) {
      console.error('Failed to connect to Redis:', error);
      return null;
    }
  }
  return client;
}

export async function cacheGet<T = any>(key: string): Promise<T | null> {
  const c = await getClient();
  if (!c) return null;

  try {
    const value = await c.get(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function cacheSet(
  key: string,
  value: any,
  ttlSeconds: number = 300
): Promise<void> {
  const c = await getClient();
  if (!c) return;

  try {
    await c.set(key, JSON.stringify(value), { EX: ttlSeconds });
  } catch (error) {
    console.error('Cache set error:', error);
  }
}

export async function cacheDel(key: string): Promise<void> {
  const c = await getClient();
  if (!c) return;

  try {
    await c.del(key);
  } catch (error) {
    console.error('Cache delete error:', error);
  }
}

export async function cacheInvalidatePattern(pattern: string): Promise<void> {
  const c = await getClient();
  if (!c) return;

  try {
    const keys = await c.keys(pattern);
    if (keys.length > 0) {
      await c.del(keys);
    }
  } catch (error) {
    console.error('Cache invalidate pattern error:', error);
  }
}
