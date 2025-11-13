/**
 * Rate Limiting Middleware
 * Prevents brute force attacks and API abuse
 */

import { RateLimiter } from '../utils/security';

// Create rate limiters for different endpoints
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes
export const apiRateLimiter = new RateLimiter(100, 60 * 1000); // 100 requests per minute
export const formRateLimiter = new RateLimiter(10, 60 * 1000); // 10 submissions per minute

/**
 * Get client identifier (IP or user ID)
 */
function getClientId(request?: Request): string {
  // In a real app, get from request headers
  // For now, use a combination of user agent and timestamp
  if (typeof window !== 'undefined') {
    return `${navigator.userAgent}-${Math.floor(Date.now() / 60000)}`;
  }
  return 'unknown';
}

/**
 * Check if login attempt is allowed
 */
export function checkLoginRateLimit(identifier: string = getClientId()): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const allowed = loginRateLimiter.isAllowed(identifier);
  const remaining = loginRateLimiter.getRemainingAttempts(identifier);
  const resetIn = loginRateLimiter.getTimeUntilReset(identifier);

  return { allowed, remaining, resetIn };
}

/**
 * Check if API request is allowed
 */
export function checkApiRateLimit(identifier: string = getClientId()): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const allowed = apiRateLimiter.isAllowed(identifier);
  const remaining = apiRateLimiter.getRemainingAttempts(identifier);
  const resetIn = apiRateLimiter.getTimeUntilReset(identifier);

  return { allowed, remaining, resetIn };
}

/**
 * Check if form submission is allowed
 */
export function checkFormRateLimit(identifier: string = getClientId()): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const allowed = formRateLimiter.isAllowed(identifier);
  const remaining = formRateLimiter.getRemainingAttempts(identifier);
  const resetIn = formRateLimiter.getTimeUntilReset(identifier);

  return { allowed, remaining, resetIn };
}

/**
 * Reset rate limit for a user (e.g., after successful login)
 */
export function resetRateLimit(type: 'login' | 'api' | 'form', identifier: string): void {
  switch (type) {
    case 'login':
      loginRateLimiter.reset(identifier);
      break;
    case 'api':
      apiRateLimiter.reset(identifier);
      break;
    case 'form':
      formRateLimiter.reset(identifier);
      break;
  }
}
