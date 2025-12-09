# 🔐 Environment Configuration Guide

Complete guide for all environment variables needed for the Elevate Admin Suite.

## 📋 Quick Setup Checklist

- [ ] Copy `.env.example` to `.env.local`
- [ ] Configure Supabase
- [ ] Configure GitHub API
- [ ] Configure Stripe
- [ ] Configure OpenAI
- [ ] Configure Vercel (optional)
- [ ] Test all integrations

## 🔑 Required Variables

### App Settings
```env
APP_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_APP_URL=https://www.elevateforhumanity.org
```

### GitHub API
```env
# Create at: https://github.com/settings/tokens?type=beta
# Permissions: Contents (read/write), Metadata (read)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
```

**How to get:**
1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Select repository access
4. Grant permissions: Contents (read/write), Metadata (read)
5. Copy token immediately (shown only once)

### Supabase
```env
# Get from: https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to get:**
1. Go to Supabase Dashboard
2. Select your project
3. Go to Settings → API
4. Copy URL, anon key, and service_role key

### Stripe
```env
# Get from: https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_xxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxx

# Webhook secret from: https://dashboard.stripe.com/webhooks
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxx
```

**How to get:**
1. Go to Stripe Dashboard → Developers → API keys
2. Copy Secret key and Publishable key
3. For webhook secret:
   - Go to Webhooks
   - Add endpoint: `https://yourdomain.com/api/store/webhook`
   - Select events: `checkout.session.completed`
   - Copy signing secret

### OpenAI
```env
# Get from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-proj-xxxxx
```

**How to get:**
1. Go to OpenAI Platform
2. Click API keys
3. Create new secret key
4. Copy immediately

## 🔧 Optional Variables

### Vercel Deployment
```env
VERCEL_DEPLOY_TOKEN=xxxxx123456
VERCEL_PROJECT_ID=prj_xxxxx
VERCEL_TEAM_ID=team_xxxxx
```

**How to get:**
1. Go to Vercel Dashboard → Settings → Tokens
2. Create new token
3. Get project ID from project settings
4. Get team ID from team settings

### GitHub OAuth (for user login)
```env
GITHUB_OAUTH_CLIENT_ID=
GITHUB_OAUTH_CLIENT_SECRET=
GITHUB_OAUTH_REDIRECT_URI=
```

**How to get:**
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL: `https://yourdomain.com/api/auth/github/callback`
4. Copy Client ID and Client Secret

### Clerk Authentication
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

**How to get:**
1. Go to Clerk Dashboard
2. Select your application
3. Go to API Keys
4. Copy publishable and secret keys

### Email Services
```env
# Resend
RESEND_API_KEY=

# SendGrid
SENDGRID_API_KEY=
```

### AI Image Generation
```env
# Stability AI
STABILITY_API_KEY=
```

### Analytics
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

### Error Tracking
```env
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
```

## 🗄️ Storage Configuration

### Supabase Storage
```env
SUPABASE_STORAGE_BUCKET=media
```

**Setup:**
1. Go to Supabase Dashboard → Storage
2. Create bucket named "media"
3. Set to public
4. Configure RLS policies

## 🔒 Security Variables

### Session Management
```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

**Generate secret:**
```bash
openssl rand -base64 32
```

### Rate Limiting
```env
REDIS_URL=redis://localhost:6379
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_SECONDS=60
```

### IP Whitelist
```env
ADMIN_IP_WHITELIST=127.0.0.1,::1
```

## 🧪 Development Variables

```env
NODE_ENV=development
ENABLE_TEST_LOGGING=false
LOG_ENDPOINT=
```

## 📝 Variable Usage by Feature

### Dev Studio
- `GITHUB_TOKEN` - Required
- `NEXT_PUBLIC_SUPABASE_URL` - Required
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Required

### Course Studio
- `GITHUB_TOKEN` - Required
- `OPENAI_API_KEY` - Required for AI features
- `NEXT_PUBLIC_SUPABASE_URL` - Required
- `SUPABASE_SERVICE_ROLE_KEY` - Required

### Autopilot Hub
- `GITHUB_TOKEN` - Required
- `OPENAI_API_KEY` - Optional for AI autopilots
- `VERCEL_DEPLOY_TOKEN` - Optional for deploy autopilot

### Media Studio
- `NEXT_PUBLIC_SUPABASE_URL` - Required
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Required
- `SUPABASE_SERVICE_ROLE_KEY` - Required

### Store Builder
- `STRIPE_SECRET_KEY` - Required
- `STRIPE_PUBLISHABLE_KEY` - Required
- `STRIPE_WEBHOOK_SECRET` - Required
- `GITHUB_TOKEN` - Required for cloning
- `SUPABASE_SERVICE_ROLE_KEY` - Required

## 🚀 Deployment Checklist

### Before Deploying

1. **Update URLs**
   ```env
   APP_URL=https://yourdomain.com
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   NEXTAUTH_URL=https://yourdomain.com
   ```

2. **Switch to Production Keys**
   - Use `sk_live_` for Stripe (not `sk_test_`)
   - Use production Supabase project
   - Use production OpenAI key

3. **Configure Webhooks**
   - Update Stripe webhook URL
   - Update GitHub OAuth callback URL

4. **Set Environment**
   ```env
   NODE_ENV=production
   ```

### Vercel Deployment

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add all variables from `.env.local`
3. Set appropriate scopes (Production, Preview, Development)
4. Redeploy

### Security Best Practices

- ✅ Never commit `.env.local` to git
- ✅ Use different keys for dev/staging/production
- ✅ Rotate keys regularly
- ✅ Use environment-specific Supabase projects
- ✅ Enable Stripe webhook signature verification
- ✅ Use fine-grained GitHub tokens (not classic)
- ✅ Set up IP whitelisting for admin routes
- ✅ Enable rate limiting in production

## 🧪 Testing Configuration

### Test All Integrations

```bash
# Test Supabase
npm run test:supabase

# Test GitHub API
npm run test:github

# Test Stripe
npm run test:stripe

# Test OpenAI
npm run test:openai
```

### Verify Environment

```bash
# Check all required variables are set
npm run check:env
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Stripe Documentation](https://stripe.com/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Vercel Documentation](https://vercel.com/docs)

## 🆘 Troubleshooting

### Common Issues

**"GitHub API rate limit exceeded"**
- Solution: Use authenticated requests with `GITHUB_TOKEN`

**"Supabase RLS policy violation"**
- Solution: Check RLS policies in Supabase dashboard
- Ensure service role key is used for admin operations

**"Stripe webhook signature verification failed"**
- Solution: Verify `STRIPE_WEBHOOK_SECRET` matches webhook endpoint

**"OpenAI API key invalid"**
- Solution: Regenerate key at platform.openai.com

## ✅ Configuration Complete!

Once all required variables are set, your admin suite is ready to use!

Test each feature:
1. Dev Studio - Edit files
2. Course Studio - Generate course with AI
3. Autopilot Hub - Run autopilot
4. Media Studio - Upload image
5. Store Builder - Create product
