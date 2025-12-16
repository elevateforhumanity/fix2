/**
 * Type-safe helpers for narrowing unknown types
 * Use these to safely access properties on unknown/Record<string, unknown> values
 */

export const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

export const rec = (v: unknown): Record<string, unknown> =>
  isRecord(v) ? v : {};

export const str = (v: unknown, fallback: string | null = null) =>
  typeof v === 'string' ? v : fallback;

export const num = (v: unknown, fallback: number | null = null) =>
  typeof v === 'number' && Number.isFinite(v) ? v : fallback;

export const bool = (v: unknown, fallback: boolean | null = null) =>
  typeof v === 'boolean' ? v : fallback;

export const date = (v: unknown, fallback: Date | null = null) => {
  if (v instanceof Date) return v;
  if (typeof v === 'string' || typeof v === 'number') {
    const d = new Date(v);
    return isNaN(d.getTime()) ? fallback : d;
  }
  return fallback;
};

export const arr = <T = unknown>(v: unknown): T[] =>
  Array.isArray(v) ? v : [];
