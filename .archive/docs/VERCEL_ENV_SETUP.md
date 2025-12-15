# Pull Environment Variables from Vercel

## Quick Command

```bash
# Pull all environment variables from Vercel
npm run env:pull
```

This will:
1. Connect to your Vercel project
2. Pull all environment variables
3. Save them to `.env.local`
4. Overwrite existing `.env.local`

---

## First Time Setup

### 1. Login to Vercel (if not already)
```bash
vercel login
```

### 2. Link to Your Project (if not already)
```bash
vercel link
```

### 3. Pull Environment Variables
```bash
npm run env:pull
```

---

## What Gets Pulled

All environment variables from Vercel:
- ✅ Stripe keys (STRIPE_SECRET_KEY, etc.)
- ✅ Affirm keys (AFFIRM_PUBLIC_KEY, AFFIRM_PRIVATE_KEY)
- ✅ Supabase keys
- ✅ All other secrets

---

## After Pulling

### Verify Keys Are Present
```bash
# Check Stripe keys
grep "STRIPE" .env.local

# Check Affirm keys
grep "AFFIRM" .env.local

# Check all keys
cat .env.local
```

### Test Stripe Connection
```bash
# Run the Stripe products check
node scripts/setup-all-stripe-products.sh
```

---

## Automatic Pull on Startup

Add to your workflow:

```bash
# In your terminal or .bashrc
alias pull-env="cd /workspaces/fix2 && npm run env:pull"
```

Then just run:
```bash
pull-env
```

---

## Manual Method (Alternative)

If `npm run env:pull` doesn't work:

```bash
# Direct Vercel CLI command
vercel env pull .env.local --yes

# Or pull specific environment
vercel env pull .env.local --environment=production
```

---

## Troubleshooting

### "Not logged in"
```bash
vercel login
```

### "Project not linked"
```bash
vercel link
# Follow prompts to select your project
```

### "Permission denied"
```bash
# Make sure you have access to the Vercel project
# Check: https://vercel.com/your-team/your-project/settings
```

---

## Next Steps After Pulling

1. ✅ Pull environment variables: `npm run env:pull`
2. ✅ Verify keys present: `grep STRIPE .env.local`
3. ✅ Check Stripe products: `bash scripts/setup-all-stripe-products.sh`
4. ✅ Create missing products in Stripe Dashboard
5. ✅ Update code with Price IDs

---

**Quick Start:**
```bash
npm run env:pull && grep STRIPE .env.local
```
