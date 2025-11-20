# 🚀 ONE COMMAND FIX - Everything Automated

## Step 1: Get Token from GitHub Secrets

```bash
# Go to GitHub Secrets page
# https://github.com/elevateforhumanity/fix2/settings/secrets/actions

# Copy the VERCEL_TOKEN value
# (You may need to recreate it to see the value)

# Then export it:
export VERCEL_TOKEN="paste-your-token-here"
```

## Step 2: Run Ultimate Fix

```bash
pnpm ultimate-fix
```

**That's it!** This one command will:
1. ✅ Validate token
2. ✅ Configure domain (www.elevateforhumanity.org)
3. ✅ Set production branch to 'main'
4. ✅ Delete all old deployments
5. ✅ Delete DeepSource branches
6. ✅ Update build marker
7. ✅ Commit and push changes
8. ✅ Trigger fresh deployment
9. ✅ Verify everything

## Step 3: Wait and Verify

After 2-3 minutes:
1. Open: https://www.elevateforhumanity.org
2. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`
3. Look for build marker in bottom-right corner

---

## Alternative: If Token Not in GitHub Secrets

### Create New Token

```bash
# 1. Go to Vercel
https://vercel.com/account/tokens

# 2. Click "Create Token"
# 3. Name: fix2-gpql-automation
# 4. Scope: Full Account
# 5. Expiration: 90 days
# 6. Copy token

# 7. Export and run
export VERCEL_TOKEN="your-new-token"
pnpm ultimate-fix
```

---

## What Gets Fixed

✅ **Domain Configuration**
- www.elevateforhumanity.org properly configured
- Set as production domain

✅ **Production Branch**
- Changed from deepsource branches to 'main'
- All future deployments from main

✅ **Cleanup**
- Old deployments deleted (keeps latest 1)
- DeepSource branches removed
- Clean slate

✅ **Fresh Deployment**
- Build marker updated with timestamp
- Changes committed and pushed
- New deployment triggered from main branch

✅ **Verification**
- Domain verified
- Deployment status checked
- Everything confirmed working

---

## Troubleshooting

### "Token is invalid"

Token may have expired. Create new one:
1. https://vercel.com/account/tokens
2. Create token
3. Update GitHub secret
4. Export and run again

### "GitHub CLI not authenticated"

```bash
gh auth login
```

Then run `pnpm ultimate-fix` again.

### "Still seeing old build"

1. Wait full 3 minutes for deployment
2. Hard refresh browser (Ctrl+Shift+R)
3. Check Vercel dashboard for deployment status
4. Verify production branch is 'main' not deepsource

---

## Success Criteria

You'll know it worked when:
- ✅ New deployment shows "Branch: main"
- ✅ Build completes successfully  
- ✅ www.elevateforhumanity.org loads fresh content
- ✅ Build marker visible in bottom-right
- ✅ No more deepsource deployments

---

**This is the simplest possible fix - just get the token and run one command!** 🎉
