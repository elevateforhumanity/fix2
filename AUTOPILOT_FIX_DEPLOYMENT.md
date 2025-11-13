# Autopilot: Fix Netlify Deployment

## 🚨 Problem
```
Error: Missing Supabase environment variables for admin client
```

## ✅ Automated Solutions

I've created **3 automated ways** to fix this:

---

## Option 1: Bash Script (Fastest - 30 seconds)

### Step 1: Get Service Role Key
Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api

Copy the **service_role** key (starts with `eyJhbGci...`)

### Step 2: Run Script
```bash
./scripts/add-netlify-env-vars.sh "eyJhbGci...YOUR_SERVICE_ROLE_KEY..."
```

### What it does:
- ✅ Adds 6 environment variables to Netlify
- ✅ Triggers deploy with cache clear
- ✅ Shows progress and results

### Output:
```
🚀 Adding environment variables to Netlify...

📝 Adding NEXT_PUBLIC_SUPABASE_URL...
   ✅ Success
📝 Adding NEXT_PUBLIC_SUPABASE_ANON_KEY...
   ✅ Success
📝 Adding SUPABASE_SERVICE_ROLE_KEY...
   ✅ Success
📝 Adding NEXT_PUBLIC_APP_URL...
   ✅ Success
📝 Adding NEXT_PUBLIC_SITE_URL...
   ✅ Success
📝 Adding NODE_ENV...
   ✅ Success

🔄 Triggering deploy with cache clear...
   ✅ Deploy triggered: 507f1f77bcf86cd799439011

✅ Environment variables added and deploy triggered!

📊 Monitor deployment at:
   https://app.netlify.com/sites/elevateconnectsdirectory/deploys

🌐 Site will be live at:
   https://elevateconnectsdirectory.org
```

---

## Option 2: Cloudflare Worker (API-based)

### Step 1: Deploy Worker
```bash
cd workers
wrangler deploy add-netlify-env-vars.js
```

### Step 2: Set Netlify Token Secret
```bash
wrangler secret put NETLIFY_AUTH_TOKEN
# Paste: nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae
```

### Step 3: Call Worker
```bash
curl -X POST https://add-netlify-env-vars.YOUR_SUBDOMAIN.workers.dev/ \
  -H "Content-Type: application/json" \
  -d '{
    "supabase_service_role_key": "eyJhbGci...YOUR_KEY..."
  }'
```

### What it does:
- ✅ Accepts Supabase keys via API
- ✅ Adds all environment variables to Netlify
- ✅ Triggers deployment
- ✅ Returns detailed results

### Response:
```json
{
  "success": true,
  "env_vars_added": 6,
  "env_vars_total": 6,
  "deploy_triggered": true,
  "deploy_id": "507f1f77bcf86cd799439011",
  "deploy_url": "https://app.netlify.com/sites/.../deploys/...",
  "site_url": "https://elevateconnectsdirectory.org",
  "message": "✅ All environment variables added and deploy triggered successfully!"
}
```

---

## Option 3: Autopilot Task (Guided)

### Run Autopilot Task
```bash
# Task will guide you through each step
autopilot run .autopilot/tasks/add-netlify-env-vars.json
```

### What it does:
- ✅ Step-by-step guided process
- ✅ Validates each step
- ✅ Handles errors automatically
- ✅ Provides troubleshooting

---

## Option 4: Manual (5 minutes)

Follow: **FIX_DEPLOYMENT_NOW.md**

1. Get keys from Supabase
2. Add to Netlify manually
3. Trigger deploy

---

## Comparison

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| **Bash Script** | 30 sec | Easy | Quick fix, have terminal access |
| **Cloudflare Worker** | 2 min | Medium | API automation, remote execution |
| **Autopilot Task** | 5 min | Easy | Guided process, learning |
| **Manual** | 5 min | Easy | No automation tools available |

---

## Files Created

### Scripts
- ✅ `scripts/add-netlify-env-vars.sh` - Bash automation script
- ✅ `workers/add-netlify-env-vars.js` - Cloudflare Worker

### Autopilot Tasks
- ✅ `.autopilot/tasks/add-netlify-env-vars.json` - API automation task
- ✅ `.autopilot/tasks/fix-supabase-deployment.json` - Guided manual task

### Documentation
- ✅ `FIX_DEPLOYMENT_NOW.md` - Quick manual guide
- ✅ `NETLIFY_ENV_SETUP.md` - Detailed setup guide
- ✅ `AUTOPILOT_FIX_DEPLOYMENT.md` - This file

---

## What Gets Added to Netlify

```
NEXT_PUBLIC_SUPABASE_URL = https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci... (public key)
SUPABASE_SERVICE_ROLE_KEY = eyJhbGci... (secret key - from you)
NEXT_PUBLIC_APP_URL = https://elevateconnectsdirectory.org
NEXT_PUBLIC_SITE_URL = https://elevateconnectsdirectory.org
NODE_ENV = production
```

---

## After Running

### Verify Deployment
1. Wait 2-3 minutes for build
2. Check: https://elevateconnectsdirectory.org
3. Verify: https://elevateconnectsdirectory.org/sitemap.xml
4. Test: Login/signup functionality

### Monitor
- Netlify Dashboard: https://app.netlify.com/
- Build logs: Check for "Compiled successfully"
- No errors about missing Supabase variables

---

## Troubleshooting

### Script fails with "Unauthorized"
- Check NETLIFY_AUTH_TOKEN is correct
- Token: `nfp_ZQh1EUwZgJt939dcD3kb9sEYGk7DDgwPbaae`

### Worker returns 400
- Verify service_role_key is in request body
- Check JSON format is correct

### Deploy still fails
- Verify all 6 variables are set in Netlify
- Check variable names are exact (case-sensitive)
- Try "Clear cache and deploy" in Netlify

### Can't find service_role key
- Go to: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
- Look for "service_role" under "Project API keys"
- Copy the long string starting with `eyJhbGci...`

---

## Security Notes

⚠️ **NEVER commit service_role key to Git!**

✅ Safe locations:
- Netlify Environment Variables
- GitHub Secrets
- Cloudflare Worker Secrets
- Local environment only

❌ Unsafe:
- Git repository
- Public documentation
- Client-side code
- Logs or screenshots

---

## Recommended: Use Bash Script

**Fastest and simplest:**

```bash
# 1. Get service role key from Supabase dashboard
# 2. Run:
./scripts/add-netlify-env-vars.sh "YOUR_SERVICE_ROLE_KEY"
# 3. Wait 2-3 minutes
# 4. Done! ✅
```

---

## Need Help?

1. Check build logs in Netlify
2. Verify all 6 variables are set
3. Try clearing cache and redeploying
4. Contact support with error details

---

**Status**: Ready to use
**Priority**: Critical - Fixes deployment blocker
**Time to fix**: 30 seconds - 5 minutes depending on method
