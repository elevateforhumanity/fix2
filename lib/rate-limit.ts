// lib/rate-limit.ts
import { Redis } from '@upstash/redis';

const redis = process.env.REDIS_URL && process.env.REDIS_TOKEN
  ? new Redis({
      url: process.env.REDIS_URL,
      token: process.env.REDIS_TOKEN,
    })
  : null;

interface RateLimitConfig {
  key: string;
  limit: number;
  windowSeconds: number;
}

export async function checkRateLimit(config: RateLimitConfig) {
  if (!redis) {
    console.warn('Redis not configured, skipping rate limit');
    return { ok: true, remaining: config.limit, current: 0 };
  }

  const { key, limit, windowSeconds } = config;
  const now = Math.floor(Date.now() / 1000);
  const windowKey = `${key}:${Math.floor(now / windowSeconds)}`;

  const current = (await redis.incr(windowKey)) as number;

  if (current === 1) {
    await redis.expire(windowKey, windowSeconds);
  }

  const remaining = Math.max(limit - current, 0);
  const ok = current <= limit;

  return {
    ok,
    remaining,
    current,
  };
}
