# Environment Configuration – Elevate for Humanity

These environment variables MUST be set in production (Vercel or other host):

## Core

- `NEXT_PUBLIC_SITE_URL`
  - Example: `https://www.elevateforhumanity.org`
  - Used for links in emails, redirects, and Stripe success/cancel URLs.

- `STRIPE_SECRET_KEY`
  - Your Stripe secret key (starts with `sk_live_...` in production).
  - Used by `/api/checkout` to create payment sessions.

- `OPENAI_API_KEY`
  - Your OpenAI API key, used for AI tutor, AI content generation, and future AI staff tools.

## Optional / Future

- `SUPABASE_URL` and `SUPABASE_ANON_KEY`
  - For live data storage (students, enrollments, progress).

- `SUPABASE_SERVICE_ROLE_KEY`
  - For secure backend operations (never expose to browser).

- `SENTRY_DSN` or other monitoring keys
  - For error tracking and performance monitoring.

## Where to Set These

- Vercel → Project → Settings → Environment Variables
- Gitpod → Variables (for local dev)
- `.env.local` (never commit this file to git)

Keep this document updated whenever we add new critical environment variables.
