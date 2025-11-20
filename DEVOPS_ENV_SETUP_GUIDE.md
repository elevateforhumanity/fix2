# 🚀 DevOps Dashboard Environment Variables Setup Guide

## Overview

The DevOps Dashboard requires 6 environment variables to function. This guide shows you exactly how to get each one.

---

## ⚠️ CRITICAL: Add These to Vercel NOW

The build warning you're seeing means these variables are missing. Add them to Vercel to enable the DevOps Dashboard.

---

## 1️⃣ VERCEL_API_TOKEN

**What it does:** Allows the dashboard to fetch deployments, view logs, and trigger rollbacks.

**How to get it:**

1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it: `DevOps Dashboard API Token`
4. Scope: **Full Account** (or select specific projects)
5. Expiration: **No Expiration** (or set to 1 year)
6. Click **"Create"**
7. **Copy the token immediately** (you won't see it again)

**Example value:**

```
vercel_1a2b3c4d5e6f7g8h9i0j
```

---

## 2️⃣ VERCEL_PROJECT_ID

**What it does:** Identifies which Vercel project to manage.

**How to get it:**

1. Go to your Vercel project: [https://vercel.com/elevateforhumanity/fix2-gpql](https://vercel.com/elevateforhumanity/fix2-gpql)
2. Click **"Settings"** in the top navigation
3. Scroll to **"General"** section
4. Look for **"Project ID"**
5. Copy the value (starts with `prj_`)

**Example value:**

```
prj_abc123def456ghi789
```

---

## 3️⃣ VERCEL_TEAM_ID (Optional)

**What it does:** Required only if your project is under a Vercel team account.

**How to get it:**

1. Go to [https://vercel.com/teams](https://vercel.com/teams)
2. Click on your team name
3. Go to **"Settings"**
4. Look for **"Team ID"**
5. Copy the value (starts with `team_`)

**Example value:**

```
team_xyz789abc123def456
```

**Note:** If you're using a personal account (not a team), **leave this blank** or omit it entirely.

---

## 4️⃣ GITHUB_TOKEN

**What it does:** Allows the dashboard to fetch GitHub Actions workflow runs.

**How to get it:**

1. Go to [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Name it: `DevOps Dashboard CI/CD Monitor`
4. Expiration: **No expiration** (or set to 1 year)
5. Select scopes:
   - ✅ **`repo`** (Full control of private repositories)
   - ✅ **`workflow`** (Update GitHub Action workflows)
6. Click **"Generate token"**
7. **Copy the token immediately** (starts with `ghp_`)

**Example value:**

```
ghp_1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0
```

---

## 5️⃣ GITHUB_OWNER

**What it does:** Specifies the GitHub organization or username.

**Value:**

```
elevateforhumanity
```

**Note:** This is already set correctly in `.env.example`. Just copy it to Vercel.

---

## 6️⃣ GITHUB_REPO

**What it does:** Specifies the GitHub repository name.

**Value:**

```
fix2
```

**Note:** This is already set correctly in `.env.example`. Just copy it to Vercel.

---

## 📋 Quick Copy-Paste Checklist

Once you have all the values, add them to Vercel:

1. Go to [https://vercel.com/elevateforhumanity/fix2-gpql/settings/environment-variables](https://vercel.com/elevateforhumanity/fix2-gpql/settings/environment-variables)
2. Add each variable:

```bash
# Variable 1
Name: VERCEL_API_TOKEN
Value: [paste your token from step 1]
Environment: Production, Preview, Development

# Variable 2
Name: VERCEL_PROJECT_ID
Value: [paste your project ID from step 2]
Environment: Production, Preview, Development

# Variable 3 (Optional - only if using team account)
Name: VERCEL_TEAM_ID
Value: [paste your team ID from step 3, or leave blank]
Environment: Production, Preview, Development

# Variable 4
Name: GITHUB_TOKEN
Value: [paste your GitHub token from step 4]
Environment: Production, Preview, Development

# Variable 5
Name: GITHUB_OWNER
Value: elevateforhumanity
Environment: Production, Preview, Development

# Variable 6
Name: GITHUB_REPO
Value: fix2
Environment: Production, Preview, Development
```

3. Click **"Save"** for each variable
4. **Redeploy** your project to apply the changes

---

## 🧪 Testing the DevOps Dashboard

After adding the environment variables and redeploying:

1. Go to: `https://www.elevateforhumanity.org/admin/devops/overview`
2. Log in as admin
3. You should see:
   - ✅ **Deployment Timeline** with recent deployments
   - ✅ **View Logs** buttons that work
   - ✅ **Rollback** buttons for production deployments
   - ✅ **CI/CD Runs** table with GitHub Actions status

---

## ❌ Troubleshooting

### "Unauthorized" or "403 Forbidden" errors

**Problem:** Invalid or missing API tokens.

**Solution:**

1. Verify `VERCEL_API_TOKEN` is correct
2. Verify `GITHUB_TOKEN` has `repo` scope
3. Check that tokens haven't expired

### "Project not found" error

**Problem:** Wrong `VERCEL_PROJECT_ID` or `VERCEL_TEAM_ID`.

**Solution:**

1. Double-check the Project ID from Vercel settings
2. If using a team, verify the Team ID
3. If using personal account, remove `VERCEL_TEAM_ID` entirely

### "Repository not found" error

**Problem:** Wrong `GITHUB_OWNER` or `GITHUB_REPO`.

**Solution:**

1. Verify the repository is `elevateforhumanity/fix2`
2. Check that the GitHub token has access to this repository

### Build warning still appears

**Problem:** Environment variables not applied to the build.

**Solution:**

1. After adding variables, trigger a new deployment
2. Go to Vercel dashboard → Deployments → Click "Redeploy"
3. Wait for build to complete

---

## 🔒 Security Best Practices

1. **Never commit tokens to Git**
   - All tokens should only be in Vercel environment variables
   - Never add them to `.env.local` and commit

2. **Use token expiration**
   - Set tokens to expire after 1 year
   - Rotate tokens regularly

3. **Limit token scopes**
   - GitHub token only needs `repo` scope
   - Vercel token can be scoped to specific projects

4. **Monitor token usage**
   - Check Vercel audit logs regularly
   - Review GitHub token activity

---

## 📚 Additional Resources

- [Vercel API Documentation](https://vercel.com/docs/rest-api)
- [GitHub Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Completion Checklist

- [ ] Created Vercel API token
- [ ] Found Vercel Project ID
- [ ] Found Vercel Team ID (if applicable)
- [ ] Created GitHub Personal Access Token with `repo` scope
- [ ] Added all 6 environment variables to Vercel
- [ ] Redeployed the project
- [ ] Tested DevOps Dashboard at `/admin/devops/overview`
- [ ] Verified deployment timeline loads
- [ ] Verified logs viewer works
- [ ] Verified CI/CD runs display
- [ ] Tested rollback button (optional, be careful!)

---

**Status:** Once all variables are added and the project is redeployed, the build warning will disappear and the DevOps Dashboard will be fully functional.
