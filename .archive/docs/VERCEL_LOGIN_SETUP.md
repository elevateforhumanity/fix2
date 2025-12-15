# Vercel CLI Setup - Quick Login

## Step 1: Login to Vercel

Run this command:
```bash
vercel login
```

You'll see:
```
Vercel CLI 50.0.1
? Log in to Vercel
  Continue with GitHub
  Continue with GitLab
  Continue with Bitbucket
> Continue with Email
```

**Choose your preferred method** (probably Email or GitHub)

---

## Step 2: Verify Login

```bash
vercel whoami
```

Should show your Vercel username/email.

---

## Step 3: Link to Your Project

```bash
cd /workspaces/fix2
vercel link
```

You'll be asked:
```
? Set up "~/workspaces/fix2"? [Y/n] Y
? Which scope contains your project? [Your Team/Username]
? Link to existing project? [Y/n] Y
? What's the name of your existing project? [elevate-for-humanity or similar]
```

---

## Step 4: Pull Environment Variables

```bash
npm run env:pull
```

Or:
```bash
vercel env pull .env.local --yes
```

---

## Step 5: Check Stripe Products

```bash
npm run check:stripe
```

---

## Quick Commands

```bash
# Login
vercel login

# Link project
vercel link

# Pull environment variables
npm run env:pull

# Check Stripe products
npm run check:stripe
```

---

## Troubleshooting

### "No existing credentials found"
```bash
vercel login
```

### "Project not found"
```bash
vercel link
# Select your project from the list
```

### "Permission denied"
Make sure you have access to the Vercel project. Check:
```
https://vercel.com/[your-team]/[your-project]/settings
```

---

## After Setup

Once logged in and linked, you can:

1. ✅ Pull environment variables anytime: `npm run env:pull`
2. ✅ Check Stripe products: `npm run check:stripe`
3. ✅ Deploy: `vercel --prod`

---

**Start here:** Run `vercel login` now!
