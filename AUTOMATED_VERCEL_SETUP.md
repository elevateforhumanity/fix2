# 🤖 Fully Automated Vercel Setup

## Get Your Vercel Token (One-Time Setup)

### Step 1: Create Token (2 minutes)

1. **Go to**: https://vercel.com/account/tokens
2. **Click**: "Create Token"
3. **Name it**: `Gitpod Auto Sync`
4. **Scope**: Select "Full Account" or your team
5. **Expiration**: Choose "No Expiration" for permanent automation
6. **Click**: "Create"
7. **Copy the token** - it looks like: `vercel_1234abcd...`

### Step 2: Save Token to Gitpod (Permanent)

Run this command **once** in your terminal:

```bash
gp env VERCEL_TOKEN='paste-your-token-here'
```

This saves the token permanently to your Gitpod account. Every new workspace will have it automatically!

### Step 3: Restart Workspace

```bash
# Close this workspace and open a new one, OR:
eval $(gp env -e)
```

---

## ✅ Fully Automated Setup

Once the token is saved, everything happens automatically:

### Option A: Add to .gitpod.yml (Recommended)

I'll add this to your `.gitpod.yml` so it runs automatically on workspace start:

```yaml
tasks:
  - name: Setup Environment
    init: |
      # Pull environment variables from Vercel
      if [ -n "$VERCEL_TOKEN" ]; then
        echo "🔄 Pulling environment variables from Vercel..."
        npx vercel env pull .env.local --token="$VERCEL_TOKEN" --yes
        echo "✅ Environment variables synced!"
      else
        echo "⚠️  VERCEL_TOKEN not set. Run: gp env VERCEL_TOKEN='your-token'"
      fi
      
      # Install dependencies
      pnpm install
      
    command: |
      # Start dev server
      pnpm dev
```

### Option B: Run Script Manually

```bash
# This will pull env vars and run migration automatically
./automated-setup.sh
```

---

## 🎯 What Gets Automated

Once you set the `VERCEL_TOKEN`:

1. ✅ **Environment variables** - Auto-pulled from Vercel on workspace start
2. ✅ **Database migration** - Auto-runs if credentials are present
3. ✅ **Dependencies** - Auto-installed
4. ✅ **Dev server** - Auto-starts

**You never have to do manual setup again!**

---

## Quick Commands

```bash
# Set token (one time only)
gp env VERCEL_TOKEN='your-token-here'

# Pull env vars manually
./pull-vercel-env.sh

# Run migration manually
node run-migration.js

# Full automated setup
./automated-setup.sh
```

---

## Troubleshooting

### "VERCEL_TOKEN not found"

**Solution**: You need to set it once:
```bash
gp env VERCEL_TOKEN='your-token-here'
```

Then restart workspace or run: `eval $(gp env -e)`

### "Token expired"

**Solution**: Create a new token with "No Expiration" option

### "Permission denied"

**Solution**: Make sure token has "Full Account" scope or at least access to your team

---

## Security Notes

✅ **Safe**: Gitpod environment variables are encrypted and private to your account
✅ **Secure**: Token is never committed to git
✅ **Permanent**: Set once, works forever in all workspaces

---

## Next Steps After Token Setup

1. **Restart workspace** - Token will be available
2. **Everything auto-runs** - Env vars pulled, migration runs, dev server starts
3. **Start coding** - No more manual setup!

---

## Visual Guide

```
┌─────────────────────────────────────────┐
│ 1. Get Token from Vercel                │
│    https://vercel.com/account/tokens    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 2. Save to Gitpod (once)                │
│    gp env VERCEL_TOKEN='...'            │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│ 3. Restart Workspace                    │
│    Everything auto-runs!                │
└─────────────────────────────────────────┘
```

---

## That's It!

After this one-time setup, every new Gitpod workspace will:
- ✅ Pull Vercel env vars automatically
- ✅ Run database migrations automatically  
- ✅ Install dependencies automatically
- ✅ Start dev server automatically

**No more manual steps!** 🎉
