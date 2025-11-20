# Required Netlify Environment Variables

## ⚠️ CRITICAL: Set These in Netlify Dashboard

To fix the skeleton/blank page issues, you MUST add these environment variables to your Netlify site.

### How to Add Environment Variables

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Select your site: **elevateforhumanityfix**
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each of the following:

---

## Required Variables

### 1. API URL

```
Key: VITE_API_URL
Value: https://api.elevateforhumanity.org
Scopes: Production, Deploy previews, Branch deploys
```

### 2. Supabase URL

```
Key: VITE_SUPABASE_URL
Value: https://cuxzzpsyufcewtmicszk.supabase.co
Scopes: Production, Deploy previews, Branch deploys
```

### 3. Supabase Anon Key

```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
Scopes: Production, Deploy previews, Branch deploys
```

---

## After Adding Variables

1. **Trigger a new deploy** to rebuild with the new environment variables
2. **Clear Netlify cache** (optional but recommended):
   - Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**

---

## Verification

After deployment, check:

1. Visit https://www.elevateforhumanity.org
2. Open browser DevTools → Console
3. Look for API calls - they should go to `https://api.elevateforhumanity.org`
4. No skeleton/blank pages should appear
5. Content should load immediately

---

## Quick Deploy Command

After setting environment variables in Netlify UI, trigger a deploy:

```bash
# Option 1: Push a commit (triggers auto-deploy)
git commit --allow-empty -m "chore: trigger deploy with new env vars"
git push origin main

# Option 2: Use Netlify CLI (if installed)
netlify deploy --prod

# Option 3: Use Netlify Dashboard
# Go to Deploys → Trigger deploy → Deploy site
```

---

## Troubleshooting

### Still seeing skeleton pages?

1. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Check DevTools Console for errors
4. Verify environment variables are set correctly in Netlify

### API calls failing?

1. Check that `VITE_API_URL` is set to `https://api.elevateforhumanity.org`
2. Verify CORS is configured on the API server
3. Check Supabase project is active and accessible

### Build failing?

1. Check build logs in Netlify Dashboard
2. Verify all required dependencies are in package.json
3. Ensure Node version matches (20.11.1)

---

## Related Documentation

- [QUICK_FIX_SKELETON.md](./QUICK_FIX_SKELETON.md) - Quick fix guide
- [IMPLEMENT_SPLIT_ARCHITECTURE.md](./IMPLEMENT_SPLIT_ARCHITECTURE.md) - Full implementation
- [ARCHITECTURE_SPLIT.md](./ARCHITECTURE_SPLIT.md) - Problem analysis
