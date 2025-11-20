# Disable Vercel Password Protection

## Current Issue

The site returns `{"error":"Access denied"}` because **Vercel Authentication** is enabled.

This is why:

- You can't access the site publicly
- Build markers don't show
- The site appears to show old content

## How to Disable

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/deployment-protection

2. Under "Deployment Protection":
   - Find "Vercel Authentication"
   - Click "Edit"
   - Select "Disabled" or "Only Preview Deployments"
   - Click "Save"

3. Redeploy:
   ```bash
   export VERCEL_TOKEN="your-token"
   npx vercel --prod --yes --token=$VERCEL_TOKEN
   ```

### Option 2: Via vercel.json

Add this to `vercel.json`:

```json
{
  "protection": {
    "enabled": false
  }
}
```

Then commit and push:

```bash
git add vercel.json
git commit -m "Disable Vercel password protection"
git push origin main
```

## Why This Happened

Vercel projects can have password protection enabled for:

- Security during development
- Preventing public access before launch
- Protecting staging environments

## After Disabling

The site will be publicly accessible at:

- https://www.elevateforhumanity.org
- No password required
- Build markers will be visible
- Fresh content will show

## Verify It's Disabled

```bash
curl -I https://www.elevateforhumanity.org
```

Should return `200 OK` instead of `401 Unauthorized` or access denied error.
