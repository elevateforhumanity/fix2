# Worker Task: Add Secrets to Fix Deployment

## 🎯 Your Mission
Add environment variables to GitHub and Netlify to fix the deployment error.

**Time**: 5-10 minutes  
**Difficulty**: Easy - just follow the steps  
**Task File**: `.autopilot/tasks/secure-add-secrets.json`

---

## 📋 Quick Checklist

You will add:
- ✅ 3 secrets to GitHub
- ✅ 6 variables to Netlify
- ✅ Trigger deployment
- ✅ Verify site is live

---

## 🚀 Start Here

### Step 1: Get Supabase Keys
1. Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
2. Copy these 3 values:
   - Project URL
   - anon public key
   - service_role key
3. Keep this tab open

### Step 2: Add to GitHub
1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret" 3 times to add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Add to Netlify
1. Go to: https://app.netlify.com/
2. Find site ID: `12f120ab-3f63-419b-bc49-430f043415c1`
3. Go to: Site settings → Environment variables
4. Click "Add a variable" 6 times to add:
   - `NEXT_PUBLIC_SUPABASE_URL` (from Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` (from Supabase)
   - `NEXT_PUBLIC_APP_URL` = `https://www.elevateforhumanity.org`
   - `NEXT_PUBLIC_SITE_URL` = `https://www.elevateforhumanity.org`
   - `NODE_ENV` = `production`

### Step 4: Deploy
1. In Netlify, go to Deploys tab
2. Click "Trigger deploy" → "Clear cache and deploy site"
3. Wait 2-3 minutes
4. Status should show "Published"

### Step 5: Verify
1. Open: https://www.elevateforhumanity.org
2. Site should load without errors
3. Check: https://www.elevateforhumanity.org/sitemap.xml
4. ✅ Done!

---

## 📖 Detailed Instructions

For step-by-step instructions with screenshots and troubleshooting:

**Open the autopilot task file:**
```
.autopilot/tasks/secure-add-secrets.json
```

This file has 15 detailed steps with:
- Exact URLs to visit
- Exact field names
- What to copy/paste
- Validation checks
- Troubleshooting tips

---

## ⚠️ Important Notes

**Security:**
- The `service_role` key is sensitive - never share it
- Keys are encrypted in GitHub Secrets and Netlify
- Don't commit keys to git

**Access Required:**
- GitHub admin access to `elevateforhumanity/fix2`
- Netlify access to site `12f120ab-3f63-419b-bc49-430f043415c1`
- Supabase dashboard access to project `cuxzzpsyufcewtmicszk`

---

## 🆘 Troubleshooting

**Can't see "New repository secret" button?**
- You need admin access to the GitHub repo
- Contact repository owner

**Netlify build still fails?**
- Verify all 6 variables are added
- Check variable names are exact (case-sensitive)
- Try "Clear cache and deploy" again

**Site shows 404?**
- Wait 5-10 minutes for DNS propagation
- Clear browser cache

---

## ✅ Success Criteria

When done, you should have:
- ✅ 3 secrets in GitHub (visible in secrets list)
- ✅ 6 variables in Netlify (visible in env vars list)
- ✅ Netlify deployment status: "Published"
- ✅ Site loads: https://www.elevateforhumanity.org
- ✅ No errors in browser console

---

## 📊 Report Completion

After completing, report:
1. Screenshot of successful Netlify deployment
2. Screenshot of site loading
3. Confirmation all variables are added
4. Any issues encountered

---

**Need help?** Check the detailed task file: `.autopilot/tasks/secure-add-secrets.json`
