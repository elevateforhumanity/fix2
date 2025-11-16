import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll } from 'vitest';

// Set up test environment variables
beforeAll(() => {
  // Use environment variables or fallback to test values
  process.env.VITE_SUPABASE_URL =
    process.env.VITE_SUPABASE_URL || 'https://test.supabase.co';
  process.env.VITE_SUPABASE_ANON_KEY =
    process.env.VITE_SUPABASE_ANON_KEY || 'test-anon-key';
  process.env.JWT_SECRET = 'test_jwt_secret_minimum_16_characters';
  process.env.NODE_ENV = 'test';
});

afterEach(() => {
  cleanup();
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});
