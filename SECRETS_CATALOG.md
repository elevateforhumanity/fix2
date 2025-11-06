# Secrets and Credentials Catalog

## Netlify
- **NETLIFY_AUTH_TOKEN**: `nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae`
- **NETLIFY_SITE_ID**: `12f120ab-3f63-419b-bc49-430f043415c1`
- **Found in**: ACTIVATE_ALL_AUTOPILOT.sh, scripts/autopilot-retry-failed-deploys.sh, multiple docs

## Supabase
- **VITE_SUPABASE_URL**: `https://cuxzzpsyufcewtmicszk.supabase.co`
- **VITE_SUPABASE_ANON_KEY**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ`
- **Found in**: .env.production, .autopilot-tasks/*.json

## Cloudflare
- **CLOUDFLARE_ACCOUNT_ID**: `6ba1d2a52a3fa230972960db307ac7c0`
- **Found in**: wrangler.toml
- **Status**: CLOUDFLARE_API_TOKEN needed (pending)

## API URLs
- **VITE_API_URL**: `https://api.elevateforhumanity.org`
- **FRONTEND_URL**: `https://elevateforhumanity.org`

## GitHub Secrets (from workflows)
- ANTHROPIC_API_KEY
- AUTOPILOT_TOKEN
- AUTOPILOT_SECRET
- CLOUDFLARE_API_TOKEN
- DURABLE_EMAIL
- DURABLE_PASSWORD
- GITHUB_TOKEN (auto-provided)
- NETLIFY_AUTH_TOKEN
- NETLIFY_SITE_ID
- NETLIFY_BUILD_HOOK
- OPENAI_API_KEY
- REPO_ADMIN_TOKEN
- SUPABASE_URL
- SUPABASE_PROJECT_REF
- SUPABASE_SERVICE_ROLE_KEY
- ZAPIER_WEBHOOK_URL

## Missing/Needed Secrets
- CLOUDFLARE_API_TOKEN (for workers deployment)
- STRIPE_SECRET_KEY (mentioned in docs, not set)
- STRIPE_PUBLISHABLE_KEY (mentioned in docs, not set)
- SUPABASE_SERVICE_KEY (mentioned in audit, not set)

## Security Notes
- ⚠️ Netlify token exposed in multiple files (should be GitHub secret only)
- ⚠️ Supabase anon key exposed (public key, acceptable)
- ⚠️ Need to secure Cloudflare API token when added
- ✅ Most secrets properly stored in GitHub Secrets
