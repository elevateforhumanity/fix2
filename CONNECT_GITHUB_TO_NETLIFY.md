# Connect GitHub to Netlify - Step by Step

## Current Status

- ✅ Only 1 Netlify site exists (elevateforhumanityfix2)
- ✅ All code pushed to GitHub main branch
- ✅ All configuration complete
- ❌ GitHub App not connected (causing deploy failures)

## The Problem

Netlify can't access your GitHub repository because the Netlify GitHub App isn't installed/connected.

**Error**: `Host key verification failed. Could not read from remote repository.`

## The Solution (5 minutes)

### Option 1: Connect via Netlify Dashboard (Recommended)

#### Step 1: Go to Site Settings

Open: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys

#### Step 2: Find "Continuous Deployment" Section

Scroll down to the "Continuous Deployment" section

#### Step 3: Link Repository

You'll see one of these options:

**If you see "Link to repository"**:

1. Click "Link to repository"
2. Select "GitHub"
3. Click "Authorize Netlify" if prompted
4. Select repository: `elevateforhumanity/fix2`
5. Select branch: `main`
6. Click "Save"

**If you see "Configure repository"**:

1. Click "Configure repository"
2. Click "Edit settings"
3. Verify repository: `elevateforhumanity/fix2`
4. Verify branch: `main`
5. Click "Save"

**If you see "Repository not found"**:

1. Click "Configure Netlify on GitHub"
2. This opens GitHub
3. Click "Configure" next to Netlify
4. Under "Repository access", select "Only select repositories"
5. Choose `elevateforhumanity/fix2`
6. Click "Save"
7. Go back to Netlify and refresh

#### Step 4: Verify Build Settings

After linking, verify these settings are correct:

- **Build command**: `pnpm install --frozen-lockfile && pnpm run build`
- **Publish directory**: `dist`
- **Functions directory**: `netlify/functions`

If they're wrong, click "Edit settings" and update them.

#### Step 5: Trigger Deploy

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
2. Click "Trigger deploy" → "Deploy site"
3. Watch the build logs

### Option 2: Install Netlify GitHub App Manually

#### Step 1: Go to GitHub Apps

Open: https://github.com/apps/netlify

#### Step 2: Install the App

1. Click "Install" or "Configure"
2. Select account: `elevateforhumanity`
3. Under "Repository access":
   - Select "Only select repositories"
   - Choose `elevateforhumanity/fix2`
4. Click "Install" or "Save"

#### Step 3: Return to Netlify

1. Go back to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
2. The repository should now be connected
3. Trigger a deploy

### Option 3: Use Deploy Key (Alternative)

If the GitHub App doesn't work, you can use a deploy key:

#### Step 1: Get the Deploy Key

A deploy key was already created. The public key is:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCPMF79Mgb22CIPTyLQlABDdrff0NWGApQoZAv+I06YdHOiCgCabR9m5NVpj7n/k32UN14vs7HPtip6KRDJnW2YiPVuA0U9NUtuh1+hIxULD6f2S8HFNKvVZV0uS8wpHytKuavtMOOeOYBlNMrl4Ditau4i5/S1uYKZ0sQ7StSnx3xRES6qLQh7QD6H538/SudeadqjSVYD4E/32ZlG551kTPuFb+YkJp4BuzIrnFwpRkiCBxabjTvOhtJC9q1gPv62jPdetwsVq6qgjdNEHKbXBKmVtwAkDseLjEX/JFoQzYot9GfPbOjvK8QmDuVs9Aw9iRrDCnLCEQdKdiAC1byHabtlZOiVa3SgFTZxLxoOFahHncYCDGlyUgS0MNY1lvWNWp0tqk4DOj3UPIbdfs3orcmqk3uG1ovL01euXIopl4EGmbWzx16vPP28zpFM+0Lbi5eoNtTR7vqn/U1HCa9wNinFielRfaYwK5XKFqenClb4FgNWpSsQOfZlMd5fM7rj2B9scPJngEmhYzH2URunRED8BUqvfsPgjFFFXRNXQqx5SjRrEhcvPuQik6wniM6NWIeJUYXOwPwOHojluTZCFcbhz5+ejHw1M6HDygYTTVEjPOovWuHm0Uaj4fV/mC5NIX/+DBWbNA8UqsbBoid9Sah1GAzpFNn7qNBh8+wPMw==
```

#### Step 2: Add to GitHub

1. Go to: https://github.com/elevateforhumanity/fix2/settings/keys
2. Click "Add deploy key"
3. Title: `Netlify Deploy Key`
4. Key: Paste the public key above
5. ✅ Check "Allow write access"
6. Click "Add key"

#### Step 3: Update Netlify

1. Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
2. The connection should now work
3. Trigger a deploy

## Verification

After connecting, verify:

1. **Check Connection**:
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
   - Under "Continuous Deployment", you should see:
     - Repository: `elevateforhumanity/fix2`
     - Branch: `main`
     - Status: Connected ✅

2. **Trigger Deploy**:
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
   - Click "Trigger deploy" → "Deploy site"
   - Build should start immediately

3. **Watch Build**:
   - Monitor build logs
   - Should complete in 3-5 minutes
   - Look for "Site is live" message

## Expected Build Output

When successful, you'll see:

```
✓ Build completed
✓ Functions deployed (17 functions)
✓ Site deployed
✓ Plugins executed (Lighthouse, cache, sitemap)
```

## After Successful Deploy

1. **Test the site**:
   - Visit: https://elevateforhumanityfix2.netlify.app
   - Should load without errors

2. **Test health check**:

   ```bash
   curl https://elevateforhumanityfix2.netlify.app/api/health-check
   ```

3. **Add missing environment variables**:

   ```bash
   netlify env:set OPENAI_API_KEY "your-key"
   netlify env:set STRIPE_WEBHOOK_SECRET "whsec_your_secret"
   ```

4. **Enable Supabase integration**:
   - Go to: https://app.netlify.com/sites/elevateforhumanityfix2/integrations
   - Enable Supabase

## Troubleshooting

### "Repository not found"

- Install Netlify GitHub App (Option 2 above)
- Make sure app has access to the repository

### "Permission denied"

- Use deploy key method (Option 3 above)
- Ensure "Allow write access" is checked

### Build still failing

- Check build logs for specific errors
- Verify environment variables are set
- Test build locally: `pnpm install && pnpm run build`

### "Host key verification failed"

- GitHub connection not properly set up
- Try Option 1, then Option 2, then Option 3

## Quick Links

- **Netlify Site Settings**: https://app.netlify.com/sites/elevateforhumanityfix2/settings/deploys
- **Netlify Deploys**: https://app.netlify.com/sites/elevateforhumanityfix2/deploys
- **GitHub Repository**: https://github.com/elevateforhumanity/fix2
- **GitHub Deploy Keys**: https://github.com/elevateforhumanity/fix2/settings/keys
- **Netlify GitHub App**: https://github.com/apps/netlify

## Summary

**Current Issue**: GitHub not connected to Netlify
**Solution**: Follow Option 1 (easiest) or Option 2 or Option 3
**Time Required**: 5 minutes
**Result**: Automatic deployments on every push to main

Once connected, every push to the `main` branch will automatically trigger a Netlify deployment!
