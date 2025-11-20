# 🚨 FIX DEPLOYMENT NOW - Quick Guide

## Error

```
Error: Missing Supabase environment variables for admin client
```

## ⚡ Quick Fix (5 minutes)

### Step 1: Get Supabase Keys (2 minutes)

Go to: **https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api**

Copy these 3 values:

1. **Project URL**: `https://cuxzzpsyufcewtmicszk.supabase.co`
2. **anon public**: `eyJhbGci...` (long string)
3. **service_role**: `eyJhbGci...` (different long string)

### Step 2: Add to Netlify (3 minutes)

Go to: **https://app.netlify.com/** → Your site → **Site settings** → **Environment variables**

Click **Add a variable** and add these 6:

```
1. NEXT_PUBLIC_SUPABASE_URL = https://cuxzzpsyufcewtmicszk.supabase.co
2. NEXT_PUBLIC_SUPABASE_ANON_KEY = [paste anon key]
3. SUPABASE_SERVICE_ROLE_KEY = [paste service_role key]
4. NEXT_PUBLIC_APP_URL = https://www.elevateforhumanity.org
5. NEXT_PUBLIC_SITE_URL = https://www.elevateforhumanity.org
6. NODE_ENV = production
```

### Step 3: Deploy

1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Clear cache and deploy site**
3. Wait 2-3 minutes
4. ✅ Done!

---

## 📋 Checklist

- [ ] Got 3 keys from Supabase dashboard
- [ ] Added 6 variables to Netlify
- [ ] Triggered clear cache deploy
- [ ] Site deployed successfully
- [ ] Verified site loads: https://www.elevateforhumanity.org

---

## 🔗 Quick Links

- **Supabase API Keys**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
- **Netlify Environment**: https://app.netlify.com/ → Site settings → Environment variables
- **Netlify Deploys**: https://app.netlify.com/ → Deploys tab
- **Your Site**: https://www.elevateforhumanity.org

---

## ⚠️ Important

**NEVER commit the service_role key to Git!**

It's stored safely in:

- ✅ Netlify Environment Variables
- ✅ GitHub Secrets (optional)

---

## 📞 Need Help?

See detailed instructions in: `.autopilot/tasks/fix-supabase-deployment.json`

Or follow: `NETLIFY_ENV_SETUP.md`
