# 🤖 Vercel Autopilot Guide

## What It Does

The Vercel Autopilot script uses Puppeteer to automatically:

1. ✅ Login to Vercel dashboard
2. ✅ Navigate to fix2-gpql project
3. ✅ Check and fix production branch (set to 'main')
4. ✅ Review deployments
5. ✅ Trigger fresh deployment without cache
6. ✅ Verify domain configuration

## How to Use

### Step 1: Set Credentials

```bash
export VERCEL_EMAIL="your-vercel-email@example.com"
export VERCEL_PASSWORD="your-vercel-password"
```

### Step 2: Run Autopilot

```bash
pnpm vercel:autopilot
```

The browser will open and you'll see it automatically:

- Login to Vercel
- Navigate through settings
- Fix configuration issues
- Trigger deployment

### Step 3: Wait and Verify

After the script completes:

1. Wait 2-3 minutes for deployment
2. Open: https://www.elevateforhumanity.org
3. Hard refresh: `Ctrl+Shift+R` or `Cmd+Shift+R`

## What It Fixes

### Production Branch

- Checks if production branch is set to 'main'
- If it finds 'deepsource' references, it updates to 'main'
- Saves the configuration

### Build Cache

- Disables "Use existing Build Cache" when redeploying
- Ensures completely fresh build

### Deployments

- Counts existing deployments
- Warns if there are too many (>5)
- Triggers new deployment

### Domain

- Verifies www.elevateforhumanity.org is configured
- Reports if domain is missing

## Troubleshooting

### "Missing credentials" error

Set your Vercel login credentials:

```bash
export VERCEL_EMAIL="your-email"
export VERCEL_PASSWORD="your-password"
```

### Browser doesn't open

The script runs in non-headless mode so you can see what's happening. If it doesn't open:

- Check if you're in a graphical environment
- Try running in Gitpod desktop mode

### Script can't find elements

Vercel's UI may have changed. Manual steps:

1. Go to: https://vercel.com/elevate-48e460c9/fix2-gpql/settings/git
2. Find "Production Branch" setting
3. Change to: `main`
4. Save
5. Go to Deployments → Click "Redeploy"
6. Uncheck "Use existing Build Cache"
7. Click "Redeploy"

## Security Notes

- ⚠️ Never commit credentials to git
- ✅ Use environment variables
- ✅ Consider using Vercel API tokens instead
- ✅ The script runs locally in your browser

## Alternative: Manual Steps

If autopilot doesn't work, follow these manual steps:

1. **Login to Vercel**
   - Go to: https://vercel.com/login

2. **Navigate to Project**
   - Go to: https://vercel.com/elevate-48e460c9/fix2-gpql

3. **Check Git Settings**
   - Click: Settings → Git
   - Find: "Production Branch"
   - Set to: `main`
   - Click: Save

4. **Trigger Deployment**
   - Go to: Deployments tab
   - Click: "Redeploy" button
   - Uncheck: "Use existing Build Cache"
   - Click: "Redeploy"

5. **Verify**
   - Wait 2-3 minutes
   - Open: https://www.elevateforhumanity.org
   - Hard refresh

## Success Criteria

You'll know it worked when:

- ✅ New deployment shows "Branch: main" (not deepsource)
- ✅ Build completes successfully
- ✅ www.elevateforhumanity.org shows fresh content
- ✅ Build marker visible (if added to code)

---

**The autopilot saves you from clicking through the Vercel dashboard manually!**
