# Environment Setup Guide

This guide walks you through setting up all required environment variables for the Elevate For Humanity platform.

## Quick Start

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the required values (see sections below)

3. Run database migrations:
   ```bash
   npm run db:setup
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Required Environment Variables

### 1. Supabase Configuration

Get these from your Supabase project dashboard:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Where to find:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Go to Settings → API
- Copy the URL and keys

### 2. Database Connection URL

For automated migrations:

```env
SUPABASE_DB_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT.supabase.co:5432/postgres
```

**Where to find:**
- Supabase Dashboard → Settings → Database
- Copy the "Connection string" under "Connection pooling"
- Replace `[YOUR-PASSWORD]` with your database password

### 3. GitHub Integration (for Dev Studio)

Create a GitHub Personal Access Token:

```env
GITHUB_TOKEN=ghp_your-token-here
GITHUB_CLIENT_ID=your-oauth-client-id
GITHUB_CLIENT_SECRET=your-oauth-client-secret
```

**How to create:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `repo`, `read:user`, `user:email`
4. Copy the token

**For OAuth (optional):**
1. GitHub → Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Secret

### 4. OpenAI API Key (for Autopilot)

```env
OPENAI_API_KEY=sk-your-key-here
```

**How to get:**
1. Go to [OpenAI Platform](https://platform.openai.com)
2. Navigate to API keys
3. Create new secret key
4. Copy the key (starts with `sk-`)

### 5. Stripe (for Store/Payments)

```env
STRIPE_SECRET_KEY=sk_test_your-key
STRIPE_PUBLISHABLE_KEY=pk_test_your-key
STRIPE_WEBHOOK_SECRET=whsec_your-secret
```

**How to get:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Developers → API keys
3. Copy Secret key and Publishable key
4. For webhook secret:
   - Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/stripe/webhook`
   - Copy the signing secret

## Optional Environment Variables

### Email (SMTP)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@elevateforhumanity.org
```

### Analytics

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Video Hosting

```env
VIMEO_ACCESS_TOKEN=your-vimeo-token
```

## Database Setup

### Automatic Setup (Recommended)

Run the automated setup script:

```bash
npm run db:setup
```

This will:
1. Connect to your Supabase database
2. Run all migrations in order
3. Seed initial data
4. Track applied migrations

### Manual Setup

If you prefer to run migrations manually:

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of each file in `supabase/migrations/` in order
3. Execute each migration
4. Copy and execute `supabase/seed.sql`

## Vercel Deployment

### Environment Variables

Add these to your Vercel project:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Make sure to add `SUPABASE_DB_URL` for automatic migrations

### Automatic Migrations on Deploy

The GitHub Actions workflow will automatically run migrations when you push changes to `supabase/migrations/` or `supabase/seed.sql`.

To enable:
1. Go to GitHub → Your Repo → Settings → Secrets
2. Add `SUPABASE_DB_URL` as a repository secret

## Troubleshooting

### Database Connection Issues

If you get connection errors:
1. Check that `SUPABASE_DB_URL` is correct
2. Verify your database password
3. Ensure your IP is allowed in Supabase (Settings → Database → Connection pooling)

### Migration Errors

If migrations fail:
1. Check the error message in console
2. Verify SQL syntax in migration files
3. Ensure migrations are numbered correctly (0001, 0002, etc.)
4. Check if migration was already applied: `SELECT * FROM efh_migrations;`

### Missing Environment Variables

If you see warnings about missing variables:
1. Check `.env.local` exists
2. Verify all required variables are set
3. Restart your development server

## Next Steps

After setup:
1. Visit `http://localhost:3000` to see the app
2. Go to `/admin` to access the admin dashboard
3. Go to `/admin/dev-studio` to use the code editor
4. Go to `/admin/course-studio` to create courses
5. Go to `/admin/autopilot` to run AI automation

## Support

For issues or questions:
- Check the main README.md
- Review the documentation in `/docs`
- Open an issue on GitHub
