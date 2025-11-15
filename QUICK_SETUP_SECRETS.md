# Quick Setup - Add GitHub Secrets Now

## ⚠️ IMPORTANT: Delete This File After Setup

This file contains instructions for adding your secrets. **Delete it after completing setup.**

---

## Step 1: Add GitHub Secrets

Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new](https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new)

### Secret 1: SUPABASE_ANON_KEY

**Name**: `SUPABASE_ANON_KEY`

**Value**: 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
```

Click "Add secret"

---

### Secret 2: SUPABASE_SERVICE_ROLE_KEY

**Name**: `SUPABASE_SERVICE_ROLE_KEY`

**Value**: 
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE
```

⚠️ **IMPORTANT**: This is a sensitive key - keep it secret!

Click "Add secret"

---

### Secret 3: NETLIFY_AUTH_TOKEN

**Name**: `NETLIFY_AUTH_TOKEN`

**Where to find**:
1. Go to: [https://app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. Scroll to "Personal access tokens"
3. Click "New access token"
4. Name it: "Elevate Autopilot"
5. Click "Generate token"
6. Copy the token (you'll only see it once!)
7. Paste into GitHub Secret

Click "Add secret"

---

### Secret 4: NETLIFY_SITE_ID

**Name**: `NETLIFY_SITE_ID`

**Where to find**:
1. Go to: [https://app.netlify.com/sites/elevateconnectsdirectory/settings/general](https://app.netlify.com/sites/elevateconnectsdirectory/settings/general)
2. Scroll to "Site details"
3. Find "API ID"
4. Copy the ID (looks like: `abc123def-4567-89gh-ijkl-mnopqrstuvwx`)
5. Paste into GitHub Secret

Click "Add secret"

---

## Step 2: Verify Secrets Added

After adding all 4 secrets, verify:

1. Go to: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
2. You should see:
   - ✅ NETLIFY_AUTH_TOKEN
   - ✅ NETLIFY_SITE_ID
   - ✅ SUPABASE_ANON_KEY
   - ✅ SUPABASE_SERVICE_ROLE_KEY

---

## Step 3: Run Autopilot Validation

Click this link to validate secrets:
[https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-secrets-validator.yml)

1. Click "Run workflow"
2. Click "Run workflow" again
3. Wait ~30 seconds
4. Check the summary - should show ✅ for all 4 secrets

---

## Step 4: Sync to Netlify

Click this link to sync environment variables:
[https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-netlify-guardian.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-netlify-guardian.yml)

1. Click "Run workflow"
2. Leave `force_redeploy` as `false`
3. Click "Run workflow"
4. Wait ~2-3 minutes
5. Check summary - should show environment variables synced

---

## Step 5: Test Production Site

Click this link to test the site:
[https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/autopilot-readiness.yml)

1. Click "Run workflow"
2. Click "Run workflow" again
3. Wait ~1 minute
4. Check summary - should show all pages passing

---

## Step 6: Visit Your Site

Go to: [https://elevateconnectsdirectory.org](https://elevateconnectsdirectory.org)

You should see:
- ✅ Homepage loads
- ✅ No "Internal Server Error"
- ✅ Programs page works
- ✅ Navigation works

---

## Step 7: Clean Up This File

**IMPORTANT**: Delete this file after setup:

```bash
git rm QUICK_SETUP_SECRETS.md
git commit -m "Remove secrets setup file"
git push
```

Or delete via GitHub:
1. Go to: [https://github.com/elevateforhumanity/fix2/blob/main/QUICK_SETUP_SECRETS.md](https://github.com/elevateforhumanity/fix2/blob/main/QUICK_SETUP_SECRETS.md)
2. Click the trash icon
3. Commit the deletion

---

## Troubleshooting

### "Secret already exists"
- That's fine! It means it was added before
- You can update it by clicking on the secret name

### "Netlify API authentication failed"
- Double-check the NETLIFY_AUTH_TOKEN
- Make sure you copied the entire token
- Try generating a new token

### "Site still shows error"
- Wait 5 minutes for Netlify to redeploy
- Clear your browser cache
- Try incognito/private mode

### "Workflow failed"
- Check the workflow logs for specific error
- Verify all 4 secrets are added correctly
- Re-run the workflow

---

## Quick Links

- **Add Secrets**: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new](https://github.com/elevateforhumanity/fix2/settings/secrets/actions/new)
- **View Secrets**: [https://github.com/elevateforhumanity/fix2/settings/secrets/actions](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
- **Supabase Dashboard**: [https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk)
- **Netlify Dashboard**: [https://app.netlify.com/sites/elevateconnectsdirectory](https://app.netlify.com/sites/elevateconnectsdirectory)
- **GitHub Actions**: [https://github.com/elevateforhumanity/fix2/actions](https://github.com/elevateforhumanity/fix2/actions)

---

**Estimated Time**: 10 minutes  
**Status**: Ready to start  

🚀 *Let's get your site running!*
