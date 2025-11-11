# 🔐 Netlify Environment Variables

**Site**: elevateforhumanityfix  
**Dashboard**: https://app.netlify.com/sites/elevateforhumanityfix/settings/env

---

## ✅ Required Variables (From .env.local)

These are the **actual values** from your `.env.local` file:

### Supabase Configuration
```bash
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ
```

### API Configuration
```bash
VITE_API_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SITE_URL=https://portal.elevateforhumanity.org
```

### Environment
```bash
NODE_ENV=production
```

---

## 💳 Optional Variables (Stripe)

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx
```

---

## 📊 Optional Variables (Analytics)

```bash
VITE_GA_MEASUREMENT_ID=G-EFHWORKFORCE01
```

---

## 🚀 How to Set These Variables

### Method 1: Netlify Dashboard (Easiest)

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/env
2. Click **Add a variable**
3. For each variable above:
   - **Key**: Copy the variable name (e.g., `VITE_SUPABASE_URL`)
   - **Value**: Copy the value
   - **Scopes**: Select "Production"
4. Click **Create variable**
5. Repeat for all variables

### Method 2: Netlify CLI (Automated)

```bash
# Login to Netlify
netlify login

# Run the sync script
./sync-env-to-netlify.sh
```

This will automatically set all variables from `.env.local`

### Method 3: Manual CLI Commands

```bash
netlify login

# Required variables
netlify env:set VITE_SUPABASE_URL "https://cuxzzpsyufcewtmicszk.supabase.co" --context production
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3MzI0NzUsImV4cCI6MjA0NjMwODQ3NX0.9y3VZ_pqLbHqEqGJYqxQxqxQxqxQxqxQxqxQxqxQxqxQ" --context production
netlify env:set VITE_API_URL "https://cuxzzpsyufcewtmicszk.supabase.co" --context production
netlify env:set VITE_SITE_URL "https://portal.elevateforhumanity.org" --context production
netlify env:set NODE_ENV "production" --context production

# Optional - Stripe
netlify env:set VITE_STRIPE_PUBLISHABLE_KEY "pk_live_51RvqjzIRNf5vPH3ABuHQofarfuWw0PW5ww9eTwkj21A6VLJaLopuYbPdpAFCTU10O5uLgGHeCTBEcu9xeM8ErbFy004j2KPoSx" --context production

# Optional - Analytics
netlify env:set VITE_GA_MEASUREMENT_ID "G-EFHWORKFORCE01" --context production
```

---

## ✅ Verification

### Check Variables Are Set

**Dashboard:**
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/settings/env
2. Verify all variables are listed

**CLI:**
```bash
netlify env:list
```

### After Setting Variables

**Trigger a new deploy:**
1. Go to: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Click: **Trigger deploy → Clear cache and deploy site**
3. Wait 2-3 minutes
4. Check site: https://elevateforhumanityfix.netlify.app

---

## 🔍 Why These Variables Are Needed

| Variable | Purpose | Impact if Missing |
|----------|---------|-------------------|
| `VITE_SUPABASE_URL` | Database connection | ❌ Site won't load data |
| `VITE_SUPABASE_ANON_KEY` | Database authentication | ❌ Auth fails |
| `VITE_API_URL` | Backend API endpoint | ⚠️ API calls fail |
| `VITE_SITE_URL` | Site URL for redirects | ⚠️ OAuth redirects fail |
| `NODE_ENV` | Build optimization | ⚠️ Dev mode in production |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Payment processing | ⚠️ Payments disabled |
| `VITE_GA_MEASUREMENT_ID` | Analytics tracking | ℹ️ No analytics |

---

## 🚨 Common Issues

### Issue: Site Shows Blank Page

**Cause**: Missing `VITE_SUPABASE_URL` or `VITE_SUPABASE_ANON_KEY`

**Fix**:
1. Add the variables in Netlify dashboard
2. Trigger new deploy
3. Clear browser cache

### Issue: "Failed to fetch" Errors

**Cause**: Wrong `VITE_API_URL` or missing Supabase variables

**Fix**:
1. Verify `VITE_API_URL` matches Supabase URL
2. Check `VITE_SUPABASE_URL` is correct
3. Redeploy

### Issue: Authentication Not Working

**Cause**: Missing or wrong `VITE_SUPABASE_ANON_KEY`

**Fix**:
1. Copy exact key from `.env.local`
2. Set in Netlify dashboard
3. Redeploy

---

## 📋 Quick Checklist

Before deploying, ensure:

- [ ] All required variables are set in Netlify
- [ ] Variables are set for "Production" scope
- [ ] Values match exactly from `.env.local`
- [ ] No extra spaces or quotes in values
- [ ] Triggered a new deploy after adding variables

---

## 🔐 Security Notes

- ✅ **VITE_SUPABASE_ANON_KEY** is safe to expose (it's public)
- ✅ **VITE_STRIPE_PUBLISHABLE_KEY** is safe to expose (it's public)
- ❌ **NEVER expose** `SUPABASE_SERVICE_ROLE` or `STRIPE_SECRET_KEY`
- ❌ These are in `.env.local` but should **NOT** be added to Netlify

---

## 📞 Support

**If variables are set but site still not working:**

1. Check build log for errors: https://app.netlify.com/sites/elevateforhumanityfix/deploys
2. Look for: `VITE_SUPABASE_URL is not defined`
3. Verify variable names are **exact** (case-sensitive)
4. Ensure scope is set to "Production"
5. Clear cache and redeploy

---

**Current Status**: Variables documented from `.env.local`  
**Next Action**: Set these in Netlify dashboard or run `./sync-env-to-netlify.sh`  
**After Setting**: Trigger deploy → Clear cache and deploy site

🔐 **Set these variables to fix the deployment!**
