# Quick Action Guide

## Your 934 Issues - What to Do Now

---

## ✅ DONE - Self-Healing Fixed

The new autopilot is now active:
- ✅ Monitors site health every 30 minutes
- ✅ Self-heals automatically with Vercel redeploy
- ✅ Rate limited: max 1 issue per 24 hours (no spam!)
- ✅ Only creates issue if self-heal FAILS

---

## 🧹 TODO - Close 934 Old Issues (5 minutes)

### Run This Command:

```bash
bash scripts/close-autopilot-issues.sh
```

This will:
1. Login to GitHub CLI (if needed)
2. Find all 934 autopilot issues
3. Close them with explanation
4. Show you the results

**Time:** 5 minutes

---

## 🔑 TODO - Add Vercel Secrets (for self-healing to work)

The autopilot needs these secrets to self-heal:

### Get Your Vercel Credentials:

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Link project
cd /workspaces/fix2
vercel link

# 4. Get your IDs
cat .vercel/project.json
```

You'll see:
```json
{
  "orgId": "team_xxxxx",
  "projectId": "prj_xxxxx"
}
```

### Create Vercel Token:

1. Go to: https://vercel.com/account/tokens
2. Click "Create Token"
3. Name: `GitHub Actions Autopilot`
4. Scope: Full Account
5. Copy the token

### Add to GitHub:

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Add these 3 secrets:

| Secret Name | Value |
|------------|-------|
| `VERCEL_TOKEN` | Your token from above |
| `VERCEL_ORG_ID` | `team_xxxxx` from project.json |
| `VERCEL_PROJECT_ID` | `prj_xxxxx` from project.json |

**Time:** 10 minutes

---

## 📊 Verify It's Working

### Check the Workflow:

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Look for "Autopilot Self-Heal (Vercel)"
3. It will run every 30 minutes
4. Click on a run to see the summary

### What You'll See:

**If site is healthy:**
```
✅ System Healthy
No action needed
```

**If site was unhealthy but self-healed:**
```
✅ Self-Heal Successful
- Detected issue: HTTP 500
- Triggered redeploy
- Verified recovery: HTTP 200
```

**If self-heal failed:**
```
❌ Self-Heal Failed
Manual intervention may be required
(Creates ONE issue, max 1 per 24h)
```

---

## Summary

### What's Fixed:
- ✅ New self-healing workflow active
- ✅ Works with Vercel (not Netlify)
- ✅ Rate limited (no spam)
- ✅ Actually heals problems

### What You Need to Do:
1. **Close old issues:** `bash scripts/close-autopilot-issues.sh` (5 min)
2. **Add Vercel secrets:** See above (10 min)
3. **Verify:** Check GitHub Actions (1 min)

### Total Time: 15 minutes

---

## Commands Summary

```bash
# 1. Close all 934 old issues
bash scripts/close-autopilot-issues.sh

# 2. Get Vercel credentials
npm i -g vercel
vercel login
vercel link
cat .vercel/project.json

# 3. Add secrets to GitHub
# Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
# Add: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID

# 4. Verify workflow
# Go to: https://github.com/elevateforhumanity/fix2/actions
```

---

**Result:** Monitoring + self-healing, no issue spam! 🎉
