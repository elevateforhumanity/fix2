/**
 * Security Utilities
 * XSS prevention, input sanitization, and security helpers
 */

import DOMPurify from 'dompurify';

/**
 * Sanitize HTML to prevent XSS attacks
 */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li', 'a', 'img', 'blockquote', 'code', 'pre',
    ],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class'],
    ALLOW_DATA_ATTR: false,
  });
}

/**
 * Sanitize user input (remove scripts, dangerous characters)
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidURL(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
}

/**
 * Validate phone number (US format)
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
}

/**
 * Generate secure random string
 */
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash string using SHA-256
 */
export async function hashString(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Rate limiter class
 */
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Check if action is allowed
   */
  isAllowed(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    return true;
  }

  /**
   * Reset attempts for a key
   */
  reset(key: string): void {
    this.attempts.delete(key);
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(key: string): number {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }

  /**
   * Get time until reset
   */
  getTimeUntilReset(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const resetTime = oldestAttempt + this.windowMs;
    return Math.max(0, resetTime - Date.now());
  }
}

/**
 * CSRF Token Manager
 */
export class CSRFTokenManager {
  private static TOKEN_KEY = 'csrf_token';
  private static token: string | null = null;

  /**
   * Generate new CSRF token
   */
  static generateToken(): string {
    const token = generateSecureToken(32);
    this.token = token;
    sessionStorage.setItem(this.TOKEN_KEY, token);
    return token;
  }

  /**
   * Get current CSRF token
   */
  static getToken(): string {
    if (!this.token) {
      this.token = sessionStorage.getItem(this.TOKEN_KEY);
      if (!this.token) {
        this.token = this.generateToken();
      }
    }
    return this.token;
  }

  /**
   * Validate CSRF token
   */
  static validateToken(token: string): boolean {
    const currentToken = this.getToken();
    return token === currentToken;
  }

  /**
   * Clear CSRF token
   */
  static clearToken(): void {
    this.token = null;
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

/**
 * Content Security Policy helper
 */
export function getCSPHeader(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co https://www.google-analytics.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
}

/**
 * Security headers configuration
 */
export const securityHeaders = {
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': getCSPHeader(),
};

/**
 * Validate password strength
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean;
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  else feedback.push('Password must be at least 8 characters');

  if (password.length >= 12) score += 1;

  // Complexity checks
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('Include uppercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else feedback.push('Include numbers');

  if (/[^a-zA-Z0-9]/.test(password)) score += 1;
  else feedback.push('Include special characters');

  // Common password check
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
    score = 0;
    feedback.push('Password is too common');
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  };
}

/**
 * Secure local storage wrapper
 */
export class SecureStorage {
  private static encrypt(data: string, key: string): string {
    // Simple XOR encryption (for demo - use proper encryption in production)
    let result = '';
    for (let i = 0; i < data.length; i++) {
      result += String.fromCharCode(data.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(result);
  }

  private static decrypt(data: string, key: string): string {
    const decoded = atob(data);
    let result = '';
    for (let i = 0; i < decoded.length; i++) {
      result += String.fromCharCode(decoded.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  }

  static setItem(key: string, value: any, encryptionKey?: string): void {
    const stringValue = JSON.stringify(value);
    const finalValue = encryptionKey 
      ? this.encrypt(stringValue, encryptionKey)
      : stringValue;
    localStorage.setItem(key, finalValue);
  }

  static getItem<T>(key: string, encryptionKey?: string): T | null {
    const value = localStorage.getItem(key);
    if (!value) return null;

    try {
      const decrypted = encryptionKey 
        ? this.decrypt(value, encryptionKey)
        : value;
      return JSON.parse(decrypted);
    } catch {
      return null;
    }
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  static clear(): void {
    localStorage.clear();
  }
}

/**
 * Input validation helpers
 */
export const validators = {
  email: isValidEmail,
  url: isValidURL,
  phone: isValidPhone,
  
  required: (value: any): boolean => {
    return value !== null && value !== undefined && value !== '';
  },

  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  pattern: (value: string, pattern: RegExp): boolean => {
    return pattern.test(value);
  },

  numeric: (value: string): boolean => {
    return /^\d+$/.test(value);
  },

  alphanumeric: (value: string): boolean => {
    return /^[a-zA-Z0-9]+$/.test(value);
  },
};
