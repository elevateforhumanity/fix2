# Configure Netlify NOW - Autopilot

## 🤖 One Command - Everything Configured

Run this **ONE command** and autopilot will configure everything on Netlify:

```bash
bash scripts/autopilot-configure-netlify-now.sh
```

**That's it!** The script will:

1. ✅ Ask for your Netlify token (one-time)
2. ✅ Test connection
3. ✅ Install Netlify CLI (if needed)
4. ✅ Configure all environment variables
5. ✅ Create build hooks
6. ✅ Set up notifications
7. ✅ Verify everything
8. ✅ Show completion report

---

## 📋 What You'll Need

### 1. Netlify Personal Access Token

The script will guide you through getting it:

- Opens: https://app.netlify.com/user/applications#personal-access-tokens
- You click: "New access token"
- You copy the token
- You paste it into the script

**That's the only manual step!**

---

## 🚀 Complete Walkthrough

### Step 1: Run the Script

```bash
bash scripts/autopilot-configure-netlify-now.sh
```

### Step 2: Get Token (Guided)

The script will show you:

```
▶ Getting Netlify Auth Token

ℹ You need a Netlify Personal Access Token

  1. Open: https://app.netlify.com/user/applications#personal-access-tokens
  2. Click: New access token
  3. Name it: Autopilot Configuration
  4. Copy the token

Press ENTER when you have your token ready...

Paste your Netlify token: [paste here]
```

### Step 3: Autopilot Takes Over

```
✓ Token saved to .env
✓ Connected to site: elevateforhumanityfix2
✓ Netlify CLI installed
✓ Configuring environment variables...
✓ Creating build hooks...
✓ Setting up notifications...
✓ Configuration complete!
```

### Step 4: Done!

```
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   ✅ CONFIGURATION COMPLETE                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝

What was configured:
  ✓ Environment variables (13+ variables)
  ✓ Build hooks (3 hooks)
  ✓ Deploy notifications (email)
  ✓ Build settings verified

Your site:
  Production: https://elevateforhumanity.org
  Dashboard: https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1

Everything is configured and ready! 🚀
```

---

## ✅ What Gets Configured

### 1. Environment Variables (Automated)

```bash
AUTOPILOT_MODE=autonomous
AUTOPILOT_ENABLED=true
AUTOPILOT_AUTO_FIX=true
AUTOPILOT_AUTO_DEPLOY=true
NODE_VERSION=20.11.1
PNPM_VERSION=9.7.0
NODE_OPTIONS=--max_old_space_size=4096
CI=true
GENERATE_SOURCEMAP=false
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=(from .env)
SUPABASE_SERVICE_ROLE_KEY=(from .env)
SUPABASE_PROJECT_REF=cuxzzpsyufcewtmicszk
```

Plus any Stripe/Google variables in your .env

### 2. Build Hooks (Automated)

- **Autopilot Auto-Deploy** (main branch)
- **Manual Production Deploy** (main branch)
- **Staging Environment** (staging branch)

Hook URLs saved to `.env.netlify`

### 3. Deploy Notifications (Automated)

- Email on deploy failed
- Email on deploy succeeded

### 4. Verification (Automated)

- Tests all configurations
- Verifies site connection
- Checks build settings
- Confirms everything works

---

## 🔄 Re-running

Safe to run multiple times:

```bash
bash scripts/autopilot-configure-netlify-now.sh
```

If token already exists in .env, it will ask if you want to use it or enter a new one.

---

## 🎯 Time Required

**Total time:** 5 minutes

- Get token: 2 minutes (one-time)
- Script runs: 3 minutes (automated)

**Manual steps:** 1 (get token)
**Automated steps:** Everything else

---

## 📊 Verification

After configuration, check status:

```bash
# Check what was configured
bash scripts/check-netlify-status.sh

# Or visit dashboard
open https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1
```

---

## 🐛 Troubleshooting

### Script says "Token may be invalid"

**Solution:** Get a new token

1. Go to: https://app.netlify.com/user/applications#personal-access-tokens
2. Delete old token
3. Create new token
4. Re-run script

### Script can't find .env file

**Solution:** Create it

```bash
cp .env.example .env
# Edit .env with your values
```

### Environment variables not loading

**Solution:** Check .env file has values

```bash
cat .env | grep SUPABASE
# Should show your Supabase credentials
```

---

## 🔐 Security

### Token Storage

- Saved to `.env` (gitignored)
- Not committed to repository
- Only used for configuration
- Can be deleted after setup

### Token Permissions

The token needs:

- Read site settings
- Write environment variables
- Create build hooks
- Configure notifications

---

## 📝 Summary

**What you do:**

1. Run one command
2. Get Netlify token (2 minutes)
3. Paste token
4. Done!

**What autopilot does:**

1. ✅ Saves token securely
2. ✅ Tests connection
3. ✅ Installs CLI
4. ✅ Configures 13+ environment variables
5. ✅ Creates 3 build hooks
6. ✅ Sets up email notifications
7. ✅ Verifies everything
8. ✅ Shows completion report

**Result:**

- Fully configured Netlify site
- All automation enabled
- Production ready
- Zero manual configuration

---

## 🚀 Quick Start

```bash
# One command does everything
bash scripts/autopilot-configure-netlify-now.sh
```

**That's it! Autopilot handles the rest.** 🤖

---

_Last Updated: 2025-10-29_  
_Script: scripts/autopilot-configure-netlify-now.sh_  
_Site: elevateforhumanityfix2 (12f120ab-3f63-419b-bc49-430f043415c1)_
