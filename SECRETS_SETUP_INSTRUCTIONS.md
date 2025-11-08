# Secrets Setup Instructions

## Required Actions

The following secrets need to be configured manually:

### VERCEL_TOKEN
- Get from: https://vercel.com/account/tokens
- Update in: .env.production
- Upload to GitHub: `gh secret set VERCEL_TOKEN`

### VERCEL_ORG_ID
- Get from: https://vercel.com/dashboard
- Update in: .env.production
- Upload to GitHub: `gh secret set VERCEL_ORG_ID`

### VERCEL_PROJECT_ID
- Get from: https://vercel.com/dashboard
- Update in: .env.production
- Upload to GitHub: `gh secret set VERCEL_PROJECT_ID`


## Configured Secrets

- ✅ VITE_SUPABASE_URL
- ✅ VITE_SUPABASE_ANON_KEY
- ✅ VITE_STRIPE_PUBLISHABLE_KEY
- ✅ SUPABASE_SERVICE_ROLE
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_WEBHOOK_SECRET
- ✅ SECRET_KEY
- ✅ VITE_API_URL
- ✅ VITE_SITE_URL

## Next Steps

1. Get the required secrets from the links above
2. Update .env.production with real values
3. Upload to GitHub: `pnpm run secrets:upload`
4. Deploy: `pnpm run deploy`

## Quick Commands

```bash
# Upload all secrets to GitHub
for secret in VERCEL_TOKEN VERCEL_ORG_ID VERCEL_PROJECT_ID VITE_SUPABASE_URL VITE_SUPABASE_ANON_KEY VITE_STRIPE_PUBLISHABLE_KEY VITE_API_URL VITE_SITE_URL; do
  value=$(grep "^$secret=" .env.production | cut -d'=' -f2-)
  if [ ! -z "$value" ] && [[ ! "$value" =~ PLACEHOLDER ]]; then
    echo "$value" | gh secret set $secret
    echo "✅ Uploaded $secret"
  fi
done
```
