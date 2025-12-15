# 🚀 Vercel Integration Setup

## Quick Start: Pull Environment Variables from Vercel

### Step 1: Get Your Vercel Token

1. Go to **Vercel Account Settings**: https://vercel.com/account/tokens
2. Click **Create Token**
3. Name it: `Gitpod Development` or `Local Development`
4. Set scope: **Full Account** (or just your team)
5. Click **Create**
6. **Copy the token** (you won't see it again!)

### Step 2: Set the Token in Gitpod

```bash
# Set for this workspace only
export VERCEL_TOKEN='your-token-here'

# Or set permanently for all Gitpod workspaces
gp env VERCEL_TOKEN='your-token-here'
```

### Step 3: Pull Environment Variables

```bash
# Run the automated script
./pull-vercel-env.sh
```

This will:
- ✅ Download all production environment variables from Vercel
- ✅ Update your `.env.local` with real Supabase credentials
- ✅ Verify the credentials are valid

### Step 4: Run the Migration

```bash
# Now that you have real credentials, run the migration
node run-migration.js
```

---

## Alternative: Manual Setup

If you prefer to set up manually:

### 1. Get Credentials from Vercel Dashboard

Visit your project settings:
https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2-gpql/settings/environment-variables

Copy these values:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

### 2. Update .env.local

```bash
# Edit .env.local and replace the placeholder values
nano .env.local

# Or use the update script
export SUPABASE_URL='https://your-project.supabase.co'
export SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
export SUPABASE_SERVICE_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

./update-env.sh
```

---

## Troubleshooting

### "VERCEL_TOKEN not found"

**Solution**: Follow Step 1 and Step 2 above to create and set your token.

### "Failed to pull environment variables"

**Possible causes:**
1. Token doesn't have correct permissions
2. Not a member of the Vercel team
3. Project doesn't exist

**Solution**: 
- Check token permissions at https://vercel.com/account/tokens
- Verify you're a member of the team
- Or use manual setup method

### "Still found placeholder values"

**Possible causes:**
1. Environment variables not set in Vercel
2. Pulling from wrong environment (development vs production)

**Solution**:
- Check Vercel dashboard to ensure variables are set
- Try: `npx vercel env pull .env.local --environment=production --token="$VERCEL_TOKEN"`

---

## Verifying Setup

After pulling environment variables, verify:

```bash
# Check if real credentials are present
grep "SUPABASE" .env.local

# Should show something like:
# NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
# SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

If you see real values (not "placeholder"), you're good to go! ✅

---

## Next Steps After Setup

1. **Run Migration**
   ```bash
   node run-migration.js
   ```

2. **Test Locally**
   ```bash
   npm run dev
   ```

3. **Visit LMS**
   - Open http://localhost:3000/lms/dashboard
   - Login and verify everything works

4. **Commit Changes** (optional)
   ```bash
   # DO NOT commit .env.local (it's in .gitignore)
   # Only commit the setup scripts
   git add pull-vercel-env.sh VERCEL_INTEGRATION_SETUP.md
   git commit -m "Add Vercel integration setup scripts"
   git push
   ```

---

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- Never share your `VERCEL_TOKEN` publicly
- Never share your `SUPABASE_SERVICE_ROLE_KEY` publicly
- Use `gp env` to store tokens securely in Gitpod

✅ **Safe to commit:**
- Setup scripts (`.sh` files)
- Documentation (`.md` files)
- `.env.example` (with placeholder values)

❌ **Never commit:**
- `.env.local` (real credentials)
- Any file with actual API keys or tokens

---

## Quick Reference

```bash
# Get Vercel token
https://vercel.com/account/tokens

# Set token in Gitpod (permanent)
gp env VERCEL_TOKEN='your-token-here'

# Pull environment variables
./pull-vercel-env.sh

# Run migration
node run-migration.js

# Test locally
npm run dev
```

---

## Need Help?

- **Vercel Documentation**: https://vercel.com/docs/cli
- **Supabase Documentation**: https://supabase.com/docs
- **Project Settings**: https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2-gpql/settings
