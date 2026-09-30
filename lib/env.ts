import { z } from 'zod';

/**
 * Environment variable validation schema
 * Validates critical env vars at runtime
 */
const EnvSchema = z.object({
  // Supabase (required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url('Invalid Supabase URL'),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(20, 'Invalid Supabase anon key'),

  // Service role (required for server operations)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20, 'Service role key required'),

  // Database URL (required)
  DATABASE_URL: z.string().url('Invalid database URL'),

  // Site URL (required)
  NEXT_PUBLIC_SITE_URL: z.string().url('Site URL required'),

  // Email (optional)
  RESEND_API_KEY: z.string().min(10).optional(),

  // Commerce providers
  PAYPAL_CLIENT_ID: z.string().min(5).optional(),
  PAYPAL_CLIENT_SECRET: z.string().min(5).optional(),
  PAYPAL_WEBHOOK_ID: z.string().min(5).optional(),
  QUICKBOOKS_REALM_ID: z.string().min(1).optional(),
  QUICKBOOKS_REFRESH_TOKEN: z.string().min(5).optional(),
  INTUIT_CLIENT_ID: z.string().min(5).optional(),
  INTUIT_CLIENT_SECRET: z.string().min(5).optional(),
  QUICKBOOKS_WEBHOOK_VERIFIER_TOKEN: z.string().min(5).optional(),
});

/**
 * Validated environment variables
 * Use this instead of process.env for type safety
 *
 * @example
 * ```ts
 * import { env } from '@/lib/env';
 *
 * const supabase = createClient(
 *   env.NEXT_PUBLIC_SUPABASE_URL,
 *   env.NEXT_PUBLIC_SUPABASE_ANON_KEY
 * );
 * ```
 */
export const env = EnvSchema.parse(process.env);

/**
 * Check if service role key is configured
 */
export function hasServiceRoleKey(): boolean {
  return !!env.SUPABASE_SERVICE_ROLE_KEY;
}

/**
 * Check if email is configured
 */
export function hasEmailConfigured(): boolean {
  return !!env.RESEND_API_KEY;
}

/** Check if commerce providers are configured */
export function hasCommerceConfigured(): boolean {
  return !!env.PAYPAL_CLIENT_ID && !!env.PAYPAL_CLIENT_SECRET && !!env.QUICKBOOKS_REALM_ID && !!env.QUICKBOOKS_REFRESH_TOKEN;
}
