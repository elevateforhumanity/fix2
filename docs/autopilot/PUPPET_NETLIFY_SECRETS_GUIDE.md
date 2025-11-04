# Puppet Autopilot: Add Secrets to Netlify

This guide provides **three automated methods** to add environment variables (secrets) to Netlify without manual dashboard interaction.

---

## 🎯 What This Does

Automatically adds these secrets to Netlify:
- ✅ `OPENAI_API_KEY`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `CLOUDFLARE_API_TOKEN`

---

## 📋 Prerequisites

Before running any method, ensure:

1. **GitHub Secrets are configured** with:
   - `NETLIFY_AUTH_TOKEN` - Your Netlify personal access token
   - `NETLIFY_SITE_ID` - Your Netlify site ID
   - `OPENAI_API_KEY` - Your OpenAI API key
   - `STRIPE_SECRET_KEY` - Your Stripe secret key
   - `CLOUDFLARE_API_TOKEN` - Your Cloudflare API token

2. **Get Netlify Auth Token:**
   - Go to: https://app.netlify.com/user/applications#personal-access-tokens
   - Click "New access token"
   - Give it a name (e.g., "Puppet Autopilot")
   - Copy the token
   - Add to GitHub Secrets as `NETLIFY_AUTH_TOKEN`

3. **Get Netlify Site ID:**
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/general
   - Copy the "Site ID" (under "Site information")
   - Add to GitHub Secrets as `NETLIFY_SITE_ID`

---

## 🚀 Method 1: GitHub Actions (Recommended)

**Best for:** Fully automated, no local setup required

### Steps:

1. **Ensure GitHub Secrets are configured** (see Prerequisites above)

2. **Trigger the workflow:**
   ```bash
   gh workflow run puppet-add-netlify-secrets.yml -f confirm=yes
   ```

   Or via GitHub UI:
   - Go to: https://github.com/elevateforhumanity/fix2/actions/workflows/puppet-add-netlify-secrets.yml
   - Click "Run workflow"
   - Type "yes" in the confirmation field
   - Click "Run workflow"

3. **Monitor progress:**
   ```bash
   gh run watch
   ```

4. **Verify:**
   - Check: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment

### What it does:
- ✅ Installs Netlify CLI
- ✅ Adds all three secrets to Netlify
- ✅ Verifies secrets were added
- ✅ Triggers a new deployment
- ✅ Provides summary and next steps

---

## 🖥️ Method 2: Local CLI Script

**Best for:** Running from your local machine or Gitpod

### Steps:

1. **Ensure you have Netlify CLI installed:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Set environment variables:**
   ```bash
   export NETLIFY_AUTH_TOKEN='your-netlify-token'
   ```
   
   Or add to `.env`:
   ```bash
   echo "NETLIFY_AUTH_TOKEN=your-netlify-token" >> .env
   ```

3. **Run the script:**
   ```bash
   ./scripts/puppet-netlify-cli-secrets.sh
   ```

### What it does:
- ✅ Loads API keys from `.env`
- ✅ Authenticates with Netlify
- ✅ Adds all three secrets
- ✅ Provides success/failure summary

---

## 🌐 Method 3: Direct API Script

**Best for:** Advanced users, CI/CD pipelines

### Steps:

1. **Set environment variables:**
   ```bash
   export NETLIFY_AUTH_TOKEN='your-netlify-token'
   ```

2. **Run the script:**
   ```bash
   ./scripts/puppet-add-netlify-secrets.sh
   ```

### What it does:
- ✅ Uses Netlify REST API directly
- ✅ Handles existing variables (updates them)
- ✅ Verifies all variables were added
- ✅ Provides detailed error messages

---

## 🔍 Verification

After running any method, verify the secrets were added:

### Option 1: Netlify Dashboard
Visit: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys#environment

You should see:
- ✅ OPENAI_API_KEY
- ✅ STRIPE_SECRET_KEY
- ✅ CLOUDFLARE_API_TOKEN

### Option 2: Netlify CLI
```bash
netlify env:list --site elevateforhumanityfix2
```

### Option 3: Check Deployment Logs
After deployment, check the build logs to ensure the variables are available.

---

## 🚀 Trigger New Deployment

After adding secrets, trigger a new deployment to use them:

### Option 1: Git Push
```bash
git commit --allow-empty -m "chore: trigger deployment with new env vars"
git push origin main
```

### Option 2: Netlify CLI
```bash
netlify deploy --prod
```

### Option 3: Netlify Dashboard
- Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
- Click "Trigger deploy" > "Deploy site"

---

## 🛠️ Troubleshooting

### Error: "Not logged in to Netlify"

**Solution:**
```bash
# Option 1: Interactive login
netlify login

# Option 2: Use auth token
export NETLIFY_AUTH_TOKEN='your-token-here'
```

### Error: "Site not found"

**Solution:**
1. Verify site name: `elevateforhumanityfix2`
2. Check you have access to the site
3. Ensure NETLIFY_AUTH_TOKEN is correct

### Error: "Environment variable already exists"

**Solution:**
The scripts handle this automatically by updating existing variables. If you see this error, the variable was still updated successfully.

### Error: "NETLIFY_SITE_ID not found"

**Solution:**
1. Get your site ID from: https://app.netlify.com/sites/elevateforhumanityfix2/settings/general
2. Add to GitHub Secrets or export locally:
   ```bash
   export NETLIFY_SITE_ID='your-site-id'
   ```

---

## 📊 What Gets Added

Each secret is added with these contexts:
- ✅ **Production** - Used for main branch deployments
- ✅ **Deploy Preview** - Used for pull request previews
- ✅ **Branch Deploy** - Used for branch deployments

This ensures the secrets are available in all deployment contexts.

---

## 🔐 Security Notes

1. **Never commit secrets to Git**
   - All scripts load secrets from environment variables or `.env`
   - `.env` is in `.gitignore`

2. **Use GitHub Secrets for CI/CD**
   - Store secrets in GitHub repository settings
   - Access via `${{ secrets.SECRET_NAME }}`

3. **Rotate tokens regularly**
   - Netlify tokens: https://app.netlify.com/user/applications
   - API keys: Regenerate from respective services

4. **Limit token permissions**
   - Use tokens with minimum required permissions
   - Create separate tokens for different purposes

---

## 📋 Summary

### Method Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **GitHub Actions** | Fully automated, no local setup | Requires GitHub Secrets | CI/CD, team workflows |
| **CLI Script** | Simple, interactive | Requires local setup | Local development |
| **API Script** | Direct control, detailed errors | More complex | Advanced users, debugging |

### Recommended Workflow

1. **First time setup:** Use GitHub Actions (Method 1)
2. **Local testing:** Use CLI Script (Method 2)
3. **Debugging:** Use API Script (Method 3)

---

## 🎉 Success!

Once secrets are added:

1. ✅ Verify in Netlify dashboard
2. ✅ Trigger new deployment
3. ✅ Test site functionality
4. ✅ Monitor deployment logs

Your site will now have access to:
- OpenAI for AI features
- Stripe for payment processing
- Cloudflare for Workers and CDN

---

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Netlify build logs
3. Verify all prerequisites are met
4. Ensure tokens are valid and not expired

---

**Created by:** Puppet Autopilot  
**Last Updated:** 2025-10-30  
**Status:** ✅ Ready to use
