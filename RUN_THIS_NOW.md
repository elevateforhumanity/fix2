# 🚀 RUN THIS NOW - Complete Vercel Fix

## One Command to Fix Everything

```bash
# 1. Get your Vercel token from GitHub Secrets
# Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
# Copy the VERCELACESSTOKEN value

# 2. Set the token
export VERCELACESSTOKEN="paste-your-token-here"

# 3. Run complete setup
pnpm vercel:setup
```

## What It Does

This single command will:

1. ✅ Configure www.elevateforhumanity.org domain
2. ✅ Set production branch to 'main'
3. ✅ Delete all old deployments (keeps latest 1)
4. ✅ Verify configuration

## After Running

The script will tell you to:

1. Push code: `git push origin main`
2. Wait 2-3 minutes
3. Check: https://www.elevateforhumanity.org

## Individual Commands

If you want to run steps separately:

```bash
# Configure domain only
pnpm configure:domain

# Clean up deployments only
pnpm cleanup:deployments-api

# Check current setup
pnpm vercel:check
```

## If Token is Invalid

1. Go to: https://vercel.com/account/tokens
2. Create new token
3. Update GitHub Secret: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
4. Export and run again

---

**This fixes everything automatically via Vercel API!** 🎉
