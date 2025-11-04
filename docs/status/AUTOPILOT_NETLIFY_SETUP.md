# Autopilot Netlify Complete Setup

## 🤖 Automated Configuration Script

The autopilot can now automatically configure your entire Netlify setup using the Netlify API.

**Script:** `scripts/autopilot-configure-netlify-complete.sh`

---

## 🚀 Quick Start

### Step 1: Get Netlify Auth Token

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Click "New access token"
3. Name it: "Autopilot Configuration"
4. Copy the token

### Step 2: Set Environment Variable

```bash
export NETLIFY_AUTH_TOKEN='your_token_here'
```

Or add to `.env`:

```bash
echo "NETLIFY_AUTH_TOKEN=your_token_here" >> .env
```

### Step 3: Run Autopilot Configuration

```bash
bash scripts/autopilot-configure-netlify-complete.sh
```

**That's it!** The script will:

- ✅ Configure all environment variables
- ✅ Create build hooks
- ✅ Set up deploy notifications
- ✅ Generate configuration report
- ⚠️ Provide instructions for manual steps

---

## 📋 What Gets Configured

### 1. Environment Variables (Automated)

```bash
AUTOPILOT_MODE=autonomous
AUTOPILOT_ENABLED=true
AUTOPILOT_AUTO_FIX=true
AUTOPILOT_AUTO_DEPLOY=true
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=(from .env)
SUPABASE_SERVICE_ROLE_KEY=(from .env)
SUPABASE_PROJECT_REF=cuxzzpsyufcewtmicszk
VITE_STRIPE_PUBLISHABLE_KEY=(from .env)
STRIPE_SECRET_KEY=(from .env)
STRIPE_WEBHOOK_SECRET=(from .env)
VITE_APPLICATION_FORM_URL=(from .env)
GOOGLE_ANALYTICS_ID=G-EFHWORKFORCE01
```

### 2. Build Hooks (Automated)

- **Autopilot Auto-Deploy** (main branch)
- **Manual Production Deploy** (main branch)
- **Staging Environment** (staging branch)
- **Content Update Hook** (main branch)

Hook URLs saved to: `/tmp/netlify-build-hooks.env`

### 3. Deploy Notifications (Automated)

- Email on deploy failed
- Email on deploy succeeded
- Email on deploy locked

### 4. Analytics (Manual - 2 minutes)

**Why manual:** Netlify API doesn't have endpoint for this

**Steps:**

1. Go to: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/analytics
2. Click "Enable Analytics"
3. Done!

### 5. Supabase Integration (Manual - 5 minutes)

**Why manual:** Requires OAuth authorization

**Steps:**

1. Go to: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/integrations
2. Search "Supabase"
3. Click "Enable"
4. Connect to project: `cuxzzpsyufcewtmicszk`
5. Authorize

---

## 📊 Script Output

The script generates these reports:

### 1. Configuration Report

**File:** `/tmp/netlify-configuration-report.md`

Contains:

- ✅ What was configured
- ⚠️ Manual actions needed
- 🔗 Quick links
- 📋 Status checklist

### 2. Build Hooks

**File:** `/tmp/netlify-build-hooks.env`

Contains:

```bash
NETLIFY_BUILD_HOOK_PRODUCTION=https://api.netlify.com/build_hooks/...
```

**Action:** Add to GitHub Secrets

### 3. Analytics Reminder

**File:** `/tmp/netlify-analytics-reminder.txt`

Instructions for enabling analytics.

### 4. Supabase Reminder

**File:** `/tmp/netlify-supabase-reminder.txt`

Instructions for enabling Supabase integration.

---

## 🔧 Manual Steps (10 minutes total)

After running the script, complete these 3 manual steps:

### 1. Enable Analytics (2 minutes)

```
URL: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/analytics
Action: Click "Enable Analytics"
Cost: Included in Pro plan
```

### 2. Enable Supabase Integration (5 minutes)

```
URL: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/integrations
Action: Search "Supabase" → Enable → Connect to cuxzzpsyufcewtmicszk
Cost: Free
```

### 3. Add Build Hook to GitHub Secrets (3 minutes)

```
File: /tmp/netlify-build-hooks.env
URL: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
Action: Add NETLIFY_BUILD_HOOK_PRODUCTION secret
```

---

## ✅ Verification

After configuration, verify everything works:

### Check Environment Variables

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/accounts/sites/12f120ab-3f63-419b-bc49-430f043415c1/env
```

### Check Build Hooks

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/build_hooks
```

### Check Notifications

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/notifications
```

### Trigger Test Deploy

```bash
# Get build hook URL from /tmp/netlify-build-hooks.env
curl -X POST https://api.netlify.com/build_hooks/YOUR_HOOK_ID
```

---

## 🔄 Re-running the Script

The script is idempotent - safe to run multiple times:

- Existing environment variables will be updated
- Duplicate build hooks will be skipped
- Existing notifications will be skipped

```bash
# Re-run anytime
bash scripts/autopilot-configure-netlify-complete.sh
```

---

## 🐛 Troubleshooting

### Error: "NETLIFY_AUTH_TOKEN not set"

**Solution:**

```bash
export NETLIFY_AUTH_TOKEN='your_token_here'
```

### Error: "API connection failed (HTTP 401)"

**Solution:** Token is invalid or expired

1. Generate new token: https://app.netlify.com/user/applications#personal-access-tokens
2. Update environment variable

### Error: "API connection failed (HTTP 404)"

**Solution:** Site ID is incorrect

- Verify site ID in script matches your site
- Check: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1

### Error: "already exists"

**Solution:** This is normal - resource already configured

- Script will skip and continue

### Environment variables not showing in dashboard

**Solution:** Wait 1-2 minutes for API sync

- Refresh dashboard
- Check API directly (see Verification section)

---

## 📖 API Documentation

The script uses these Netlify API endpoints:

### Get Site Info

```bash
GET /api/v1/sites/{site_id}
```

### Set Environment Variable

```bash
PUT /api/v1/accounts/sites/{site_id}/env/{key}
```

### Create Build Hook

```bash
POST /api/v1/sites/{site_id}/build_hooks
```

### Create Notification

```bash
POST /api/v1/sites/{site_id}/notifications
```

**Full API Docs:** https://docs.netlify.com/api/get-started/

---

## 🎯 What You Get

After running the script and completing manual steps:

### ✅ Real-time Analytics

- Server-side tracking (no JavaScript)
- Visitor data, page views, referrers
- No cookie consent needed
- Included in Pro plan

### ✅ Automated Deployments

- Build hooks for autopilot
- Trigger deploys from GitHub Actions
- Manual deploy option
- Staging environment

### ✅ Database Integration

- Supabase auto-sync
- Environment variables managed
- Real-time updates

### ✅ Build Monitoring

- Email notifications on failures
- Success confirmations
- Deploy locked alerts

### ✅ Error Notifications

- Instant alerts on build failures
- Deploy status updates
- Team notifications

---

## 🔐 Security Notes

### Auth Token

- Keep token secret
- Don't commit to repository
- Use environment variables
- Rotate periodically

### Environment Variables

- Sensitive values encrypted by Netlify
- Only accessible during builds
- Not exposed in client-side code
- Scoped to contexts (production/preview/branch)

### Build Hooks

- Treat URLs as secrets
- Don't expose publicly
- Use for automation only
- Can be regenerated if compromised

---

## 📈 Next Steps

After configuration:

### 1. Test Deployment

```bash
# Trigger build via hook
curl -X POST $(cat /tmp/netlify-build-hooks.env | cut -d'=' -f2)
```

### 2. Verify Analytics

```
Visit: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/analytics
Check: Real-time visitor data appearing
```

### 3. Test Notifications

```
Make a commit → Push → Check email for deploy notification
```

### 4. Verify Supabase

```
Check: Environment variables synced
Test: Database connection from functions
```

### 5. Monitor Usage

```
Visit: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/general#usage
Check: Build minutes, bandwidth, function invocations
```

---

## 🎉 Success Criteria

Configuration is complete when:

- [x] Script runs without errors
- [x] Environment variables visible in dashboard
- [x] Build hooks created (4 hooks)
- [x] Deploy notifications configured (3 notifications)
- [ ] Analytics enabled (manual)
- [ ] Supabase integration enabled (manual)
- [ ] Build hook added to GitHub Secrets (manual)
- [ ] Test deploy succeeds
- [ ] Notifications received
- [ ] Analytics showing data

---

## 🆘 Support

### Script Issues

- Check `/tmp/netlify-configuration-report.md` for details
- Review error messages
- Verify auth token is valid
- Check API rate limits

### Netlify Support

- Dashboard: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1
- Docs: https://docs.netlify.com
- Support: https://www.netlify.com/support/
- Community: https://answers.netlify.com

### GitHub Actions

- Workflows: https://github.com/elevateforhumanity/fix2/actions
- Secrets: https://github.com/elevateforhumanity/fix2/settings/secrets/actions

---

## 📝 Summary

**Automated by Script:**

- ✅ 13 environment variables
- ✅ 4 build hooks
- ✅ 3 deploy notifications
- ✅ Configuration verification
- ✅ Detailed reports

**Manual Steps Required:**

- ⚠️ Enable Analytics (2 min)
- ⚠️ Enable Supabase Integration (5 min)
- ⚠️ Add build hook to GitHub Secrets (3 min)

**Total Time:** ~15 minutes (5 min automated + 10 min manual)

**Result:** Fully configured Netlify site with autopilot integration! 🚀

---

_Last Updated: 2025-10-29_  
_Script Version: 1.0_  
_Site: elevateforhumanityfix2 (12f120ab-3f63-419b-bc49-430f043415c1)_
