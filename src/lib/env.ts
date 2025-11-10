/**
 * Environment Variable Validation and Helper
 * Ensures all required VITE_ prefixed variables are present
 */

interface EnvConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  stripe?: {
    publishableKey: string;
  };
  applicationFormUrl?: string;
  sentry?: {
    dsn: string;
    enabled: boolean;
  };
  environment: string;
}

/**
 * Validate and return environment configuration
 * Shows friendly error if required variables are missing
 */
export function getEnvConfig(): EnvConfig {
  const errors: string[] = [];

  // Required variables
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    errors.push('VITE_SUPABASE_URL is required');
  }
  if (!supabaseAnonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is required');
  }

  // Optional variables
  const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const applicationFormUrl = import.meta.env.VITE_APPLICATION_FORM_URL;
  const sentryDsn = import.meta.env.VITE_SENTRY_DSN;
  const sentryEnabled = import.meta.env.VITE_SENTRY_ENABLED === 'true';
  const environment = import.meta.env.VITE_ENVIRONMENT || 'development';

  // Show errors if any required variables are missing
  if (errors.length > 0) {
    const errorMessage = `
❌ Missing Required Environment Variables:

${errors.map((e) => `  • ${e}`).join('\n')}

To fix this:

1. In Gitpod, set environment variables:
   gp env VITE_SUPABASE_URL="https://your-project.supabase.co"
   gp env VITE_SUPABASE_ANON_KEY="your-anon-key"

2. Or create a .env file in the project root:
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key

3. Restart the dev server: pnpm dev

Note: All client-side env vars MUST be prefixed with VITE_
    `;


    // Show user-friendly banner in the app
    if (typeof document !== 'undefined') {
      showEnvErrorBanner(errors);
    }

    // Return partial config to prevent crashes
    return {
      supabase: {
        url: supabaseUrl || '',
        anonKey: supabaseAnonKey || '',
      },
      environment,
    };
  }

  // All good, return full config
  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
    },
    stripe: stripePublishableKey
      ? {
          publishableKey: stripePublishableKey,
        }
      : undefined,
    applicationFormUrl,
    sentry: sentryDsn
      ? {
          dsn: sentryDsn,
          enabled: sentryEnabled,
        }
      : undefined,
    environment,
  };
}

/**
 * Show a friendly error banner in the app
 */
function showEnvErrorBanner(errors: string[]) {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: var(--brand-danger);
    color: white;
    padding: 1rem;
    z-index: 9999;
    font-family: monospace;
    font-size: 14px;
  `;

  banner.innerHTML = `
    <div style="max-width: 1200px; margin: 0 auto;">
      <strong>⚠️ Missing Environment Variables</strong>
      <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
        ${errors.map((e) => `<li>${e}</li>`).join('')}
      </ul>
      <details style="margin-top: 0.5rem;">
        <summary style="cursor: pointer;">How to fix</summary>
        <pre style="margin-top: 0.5rem; background: rgba(0,0,0,0.2); padding: 0.5rem; border-radius: 4px; overflow-x: auto;">
In Gitpod terminal:
if (!supabase) throw new Error('Supabase not initialized');
gp env VITE_SUPABASE_URL="https://your-project.supabase.co"
gp env VITE_SUPABASE_ANON_KEY="your-anon-key"

Then restart: pnpm dev
        </pre>
      </details>
    </div>
  `;

  document.body.insertBefore(banner, document.body.firstChild);
}

/**
 * Check if environment is properly configured
 */
export function isEnvConfigured(): boolean {
  return !!(
    import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY
  );
}

/**
 * Get environment name
 */
export function getEnvironment(): string {
  return import.meta.env.VITE_ENVIRONMENT || 'development';
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return getEnvironment() === 'production';
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return getEnvironment() === 'development';
}

// Export the config
export const env = getEnvConfig();
