# Deployment Ready Guide

This project is configured for seamless deployment with Vercel environment variable management.

## Quick Setup

### 1. Environment Variables

Pull environment variables from Vercel:

```bash
# Set your Vercel token (one-time)
gp env VERCEL_TOKEN='your-vercel-token-here'

# Pull environment variables
npm run env:pull
```

**Get your Vercel token:**
- Visit: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
- Create a new token
- Copy and save it using `gp env VERCEL_TOKEN='...'`

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Run Development Server

```bash
pnpm run dev
```

## Environment Variable Management

### Automatic Sync

The project uses Vercel as the source of truth for environment variables:

1. **Update in Vercel Dashboard** → Environment Variables
2. **Pull to Local:** `npm run env:pull`
3. **Verify:** `cat .env.local | grep SUPABASE`

### Backup

The pull script automatically backs up your existing `.env.local`:
- Format: `.env.local.backup.YYYYMMDD_HHMMSS`

### Verification

The script verifies:
- ✅ All critical environment variables present
- ✅ No placeholder values
- ✅ Supabase credentials valid

## Project Cleanup

Run the cleanup script to organize the root directory:

```bash
bash cleanup-root.sh
```

This moves files to `.archive/`:
- Documentation → `.archive/docs/`
- SQL scripts → `.archive/sql/`
- Utility scripts → `.archive/scripts/`
- Temporary files → `.archive/temp/`

## Available Scripts

### Environment
- `npm run env:pull` - Pull environment variables from Vercel

### Development
- `npm run dev` - Start development server
- `npm run build` - Create production build

### Database
- `npm run db:migrate` - Run migrations
- `npm run db:seed` - Seed database

## Pre-Deployment Checklist

- [ ] Environment variables pulled from Vercel
- [ ] Dependencies installed
- [ ] Build succeeds
- [ ] Database migrations applied

## Deploy to Vercel

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```
