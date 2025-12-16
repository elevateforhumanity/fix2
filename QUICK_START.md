# Quick Start - Environment Setup

## ⚡ Automatic Setup (Recommended)

### Step 1: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Click "Create Token"
3. Copy the token

### Step 2: Set Token

**Gitpod (Persistent):**

```bash
gp env VERCEL_TOKEN='paste-your-token-here'
# Restart workspace for it to take effect
```

**Local/Codespaces:**

```bash
export VERCEL_TOKEN='paste-your-token-here'
```

### Step 3: Run Setup Script

```bash
./setup-env.sh
```

✅ **Done!** Your `.env.local` is now configured with all 72 variables.

---

## 🚀 Start Development

```bash
npm install
npm run dev
```

The app will automatically recognize all environment variables from `.env.local`.

---

## 🔄 How It Works

```
Vercel (Production)
    ↓ (vercel env pull)
.env.local (Your Machine)
    ↓ (automatically loaded)
Next.js App
```

- **No secrets in git** ✅
- **Single source of truth** (Vercel)
- **Automatic recognition** by Next.js
- **Team-friendly** (everyone runs same setup)

---

## ❓ Troubleshooting

### `.env.local` missing in another environment?

**This is expected!** `.env.local` is gitignored (never committed).

Each environment needs to run:

```bash
./setup-env.sh
```

### Variables not loading?

Restart dev server:

```bash
pkill -f "next dev"
npm run dev
```

### Need to update variables?

Re-run setup to pull latest from Vercel:

```bash
./setup-env.sh
```

---

## 📚 More Info

- **Full Guide:** [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)
- **What's Configured:** 72 environment variables
- **Where They Come From:** Vercel production environment
- **Security:** `.env.local` is gitignored (safe)

---

## ✅ Verification

Check if setup worked:

```bash
# File exists?
ls -la .env.local

# How many variables?
grep -c "^[A-Z_]*=" .env.local

# Critical variables present?
grep "NEXTAUTH_SECRET\|STRIPE_SECRET_KEY\|SUPABASE_SERVICE_ROLE_KEY" .env.local
```

Should show:

- File exists: ✅
- 72 variables: ✅
- Critical variables have values: ✅

---

**Ready to code!** 🎉
