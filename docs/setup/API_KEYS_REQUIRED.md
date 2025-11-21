# 🔑 API Keys Required for Full Functionality

**Last Updated**: 2025-10-29 04:03 UTC  
**Autopilot Version**: 7.0 (Autonomous Mode)

---

## 📊 Quick Setup Guide

### 🎯 80% Functionality (5 minutes)

**What You Get**: Full LMS, courses, lessons, quizzes, certificates

1. ✅ Apply Supabase migrations (copy/paste SQL)
2. ✅ Create 4 storage buckets
3. ✅ Done - LMS fully functional

**Required**:

- Supabase Project URL
- Supabase Anon Key
- Supabase Service Role Key

---

### 🎯 95% Functionality (15 minutes)

**What You Get**: Everything above + Payments + AI content generation

1. ✅ Do 80% setup above
2. ✅ Add Stripe keys (3 keys)
3. ✅ Add OpenAI key (1 key)
4. ✅ Done - Payments and AI work

**Additional Required**:

- Stripe Publishable Key
- Stripe Secret Key
- Stripe Webhook Secret
- OpenAI API Key

---

### 🎯 100% Functionality (30 minutes)

**What You Get**: Everything above + Social automation + Monitoring

1. ✅ Do 95% setup above
2. ✅ Add social media API keys
3. ✅ Add Slack webhook
4. ✅ Deploy Cloudflare worker
5. ✅ Done - Everything works

**Additional Required**:

- Twitter/X API credentials (4 keys)
- LinkedIn API credentials (2 keys)
- Facebook API credentials (2 keys)
- Slack Webhook URL
- Cloudflare Account ID & API Token

---

## 🔐 Complete API Keys List

### 1️⃣ SUPABASE (Required for 80%)

**Where to Get**: https://supabase.com/dashboard

```bash
# .env file
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**How to Get**:

1. Go to https://supabase.com/dashboard
2. Create new project (or select existing)
3. Go to Settings → API
4. Copy:
   - Project URL → `VITE_SUPABASE_URL`
   - anon/public key → `VITE_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

**Used For**:

- ✅ Database (all tables)
- ✅ Authentication (users, sessions)
- ✅ Storage (files, images, videos)
- ✅ Real-time subscriptions

---

### 2️⃣ STRIPE (Required for 95%)

**Where to Get**: https://dashboard.stripe.com/apikeys

```bash
# .env file
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**How to Get**:

1. Go to https://dashboard.stripe.com/apikeys
2. Copy:
   - Publishable key → `VITE_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`
3. Go to Webhooks → Add endpoint
4. URL: `https://your-domain.com/api/stripe-webhook
5. Events: `checkout.session.completed`, `payment_intent.succeeded`
6. Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

**Used For**:

- ✅ Course payments
- ✅ Program enrollments
- ✅ Revenue sharing (Stripe Connect)
- ✅ Subscription management

---

### 3️⃣ OPENAI (Required for 95%)

**Where to Get**: https://platform.openai.com/api-keys

```bash
# .env file
OPENAI_API_KEY=sk-proj-...
```

**How to Get**:

1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy key → `OPENAI_API_KEY`

**Used For**:

- ✅ AI content generation
- ✅ Course material creation
- ✅ Quiz question generation
- ✅ Certificate text generation

---

### 4️⃣ TWITTER/X (Required for 100%)

**Where to Get**: https://developer.twitter.com/en/portal/dashboard

```bash
# .env file
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret
```

**How to Get**:

1. Go to https://developer.twitter.com/en/portal/dashboard
2. Create app (or select existing)
3. Go to Keys and tokens
4. Copy all 4 credentials

**Used For**:

- ✅ Auto-posting course updates
- ✅ Social media automation
- ✅ Student achievement announcements

---

### 5️⃣ LINKEDIN (Required for 100%)

**Where to Get**: https://www.linkedin.com/developers/apps

```bash
# .env file
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
```

**How to Get**:

1. Go to https://www.linkedin.com/developers/apps
2. Create app (or select existing)
3. Go to Auth tab
4. Copy Client ID and Client Secret

**Used For**:

- ✅ Professional network posting
- ✅ Job placement announcements
- ✅ Certificate sharing

---

### 6️⃣ FACEBOOK (Required for 100%)

**Where to Get**: https://developers.facebook.com/apps

```bash
# .env file
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret
```

**How to Get**:

1. Go to https://developers.facebook.com/apps
2. Create app (or select existing)
3. Go to Settings → Basic
4. Copy App ID and App Secret

**Used For**:

- ✅ Social media automation
- ✅ Community engagement
- ✅ Program promotion

---

### 7️⃣ SLACK (Required for 100%)

**Where to Get**: https://api.slack.com/apps

```bash
# .env file
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX
```

**How to Get**:

1. Go to https://api.slack.com/apps
2. Create app (or select existing)
3. Enable Incoming Webhooks
4. Add New Webhook to Workspace
5. Copy Webhook URL

**Used For**:

- ✅ Autopilot notifications
- ✅ Build failure alerts
- ✅ System monitoring
- ✅ Error reporting

---

### 8️⃣ CLOUDFLARE (Required for 100%)

**Where to Get**: https://dash.cloudflare.com/profile/api-tokens

```bash
# .env file
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

**How to Get**:

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Create Token → Edit Cloudflare Workers
3. Copy API Token
4. Go to Workers & Pages → Overview
5. Copy Account ID from right sidebar

**Used For**:

- ✅ Edge functions
- ✅ API rate limiting
- ✅ DDoS protection
- ✅ Global CDN

---

## 📝 Environment File Template

Create `.env` file in project root:

```bash
# ============================================
# SUPABASE (Required for 80%)
# ============================================
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# STRIPE (Required for 95%)
# ============================================
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# ============================================
# OPENAI (Required for 95%)
# ============================================
OPENAI_API_KEY=sk-proj-...

# ============================================
# TWITTER/X (Required for 100%)
# ============================================
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

# ============================================
# LINKEDIN (Required for 100%)
# ============================================
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# ============================================
# FACEBOOK (Required for 100%)
# ============================================
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

# ============================================
# SLACK (Required for 100%)
# ============================================
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXX

# ============================================
# CLOUDFLARE (Required for 100%)
# ============================================
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
```

---

## 🚀 Netlify Environment Variables

Add these in Netlify Dashboard → Site settings → Environment variables:

**For 80% Functionality**:

```
VITE_SUPABASE_URL
VITE_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

**For 95% Functionality** (add these):

```
VITE_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
OPENAI_API_KEY
```

**For 100% Functionality** (add these):

```
TWITTER_API_KEY
TWITTER_API_SECRET
TWITTER_ACCESS_TOKEN
TWITTER_ACCESS_SECRET
LINKEDIN_CLIENT_ID
LINKEDIN_CLIENT_SECRET
FACEBOOK_APP_ID
FACEBOOK_APP_SECRET
SLACK_WEBHOOK_URL
CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_API_TOKEN
```

---

## ✅ Verification Checklist

### After Adding Keys:

- [ ] Run `pnpm run typecheck` - Should pass
- [ ] Run `pnpm run lint` - Should pass
- [ ] Run `pnpm test` - Should pass (72 tests)
- [ ] Run `pnpm run build` - Should succeed
- [ ] Check Netlify build logs - Should deploy successfully
- [ ] Test Supabase connection - Should authenticate
- [ ] Test Stripe payment - Should process (if added)
- [ ] Test OpenAI generation - Should create content (if added)
- [ ] Check Slack notifications - Should receive alerts (if added)
- [ ] Verify Cloudflare worker - Should respond (if added)

---

## 🔄 Autonomous Autopilot Status

The autopilot system monitors and auto-fixes issues every 30 minutes:

- ✅ TypeScript errors → Auto-regenerates routes
- ✅ ESLint errors → Auto-fixes with `--fix`
- ✅ Test failures → Creates GitHub issues
- ✅ Build failures → Creates GitHub issues
- ✅ Netlify failures → Monitors and alerts
- ✅ Supabase health → Monitors connection
- ✅ Cloudflare health → Monitors worker status

**No manual intervention required** - System self-heals automatically.

---

## 📞 Support

If you need help:

1. Check GitHub Issues for autopilot-created alerts
2. Review Slack notifications (if configured)
3. Check Netlify build logs
4. Review Supabase logs

**Autopilot will handle most issues automatically within 30 minutes.**

---

**Generated by**: Autonomous Autopilot v7.0  
**Status**: Production Ready  
**Last Check**: 2025-10-29 04:03 UTC
