# Autopilot Secrets Checker - Ready to Use

## ✅ Autopilot Workflow Created

I've created an automated secrets validator that will:
- ✅ Check all 8 required secrets
- ✅ Generate a detailed validation report
- ✅ Create/update a GitHub issue with missing secrets
- ✅ Provide direct links to get each secret
- ✅ Auto-close the issue when all secrets are configured

---

## 🚀 How to Run the Autopilot

### Option 1: Manual Trigger (Recommended)

1. **Go to GitHub Actions:**
   [https://github.com/elevateforhumanity/fix2/actions/workflows/secrets-validator.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/secrets-validator.yml)

2. **Click "Run workflow"** button (top right)

3. **Select branch:** `main`

4. **Click "Run workflow"** (green button)

### Option 2: Push This Change

```bash
git add .github/workflows/secrets-validator.yml
git add AUTOPILOT_SECRETS_CHECK.md
git commit -m "feat: add autopilot secrets validator

Automated workflow to check and validate all required secrets

Co-authored-by: Ona <no-reply@ona.com>"
git push origin main
```

Then manually trigger the workflow using Option 1.

### Option 3: Wait for Weekly Check

The workflow runs automatically every Sunday at midnight UTC.

---

## 📊 What the Autopilot Does

### 1. Validates All Secrets
Checks these 8 required secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `VITE_API_URL`
- `VITE_SITE_URL`

### 2. Generates Report
Creates `SECRETS_VALIDATION_REPORT.md` with:
- ✅ Which secrets are configured
- ❌ Which secrets are missing
- 📝 Direct links to get each secret
- 📚 Step-by-step setup instructions

### 3. Creates GitHub Issue
If secrets are missing:
- Creates an issue titled "🔐 Missing GitHub Secrets - Action Required"
- Labels it with `secrets-missing`, `deployment`, `configuration`
- Updates the issue on each run
- Auto-closes when all secrets are present

### 4. Provides Action Summary
Shows a summary in the GitHub Actions run with:
- Current status
- Missing secrets count
- Next steps

---

## 🔍 Expected Results

### If Secrets Are Missing:
```
⚠️ Missing Secrets: X

The following secrets need to be configured:
- SECRET_NAME_1
- SECRET_NAME_2

Action Required: Please add these secrets to continue.
```

### If All Secrets Present:
```
✅ All Secrets Configured!

All required secrets are properly configured. Your deployment is ready!
```

---

## 📝 After Running the Autopilot

1. **Check the GitHub Issue:**
   - Go to [Issues](https://github.com/elevateforhumanity/fix2/issues)
   - Look for "🔐 Missing GitHub Secrets - Action Required"
   - Follow the links provided in the issue

2. **Add Missing Secrets:**
   - Go to [Repository Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
   - Add each missing secret
   - Use the links in the issue to get the values

3. **Re-run the Autopilot:**
   - After adding secrets, run the workflow again
   - It will validate and close the issue if all secrets are present

4. **Deploy to Vercel:**
   - Once all secrets are configured
   - Run the [Vercel Deployment](https://github.com/elevateforhumanity/fix2/actions/workflows/vercel-deploy.yml) workflow

---

## 🔗 Quick Links

- **Run Autopilot:** [secrets-validator.yml](https://github.com/elevateforhumanity/fix2/actions/workflows/secrets-validator.yml)
- **Add Secrets:** [Repository Secrets](https://github.com/elevateforhumanity/fix2/settings/secrets/actions)
- **View Issues:** [Issues](https://github.com/elevateforhumanity/fix2/issues)
- **Setup Guide:** [SECRETS_SETUP_GUIDE.md](./SECRETS_SETUP_GUIDE.md)

---

## 🆘 Troubleshooting

### Workflow doesn't appear?
- Make sure you've pushed the workflow file to the `main` branch
- Check [All Workflows](https://github.com/elevateforhumanity/fix2/actions) to see if it's listed

### Can't run workflow?
- You need write access to the repository
- Make sure you're logged into GitHub
- Try refreshing the page

### Issue not created?
- Check workflow logs for errors
- Verify the workflow has `issues: write` permission
- Check if an issue already exists with the `secrets-missing` label

---

*Autopilot created by Ona - Ready to validate your secrets!*
