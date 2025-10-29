# 🚀 Deploy With Your Existing API Keys

**Status**: You have Stripe, Facebook, LinkedIn, and Cloudflare keys  
**Action**: Let's deploy everything now!

---

## 🎯 What You Have

Based on the codebase analysis:

✅ **Stripe Keys** - For payments and revenue sharing  
✅ **Facebook API** - For social media posting  
✅ **LinkedIn API** - For professional network posting  
✅ **Cloudflare Keys** - For edge functions and CDN  
✅ **Supabase** - Already configured in netlify.toml  
❌ **Twitter/X** - Deleted (not needed)

---

## 📋 Required Environment Variables

### For Netlify (Add these to Netlify Dashboard)

```bash
# ============================================
# SUPABASE (Already in netlify.toml)
# ============================================
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_SERVICE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# ============================================
# STRIPE (You have these)
# ============================================
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# ============================================
# FACEBOOK (You have these)
# ============================================
FACEBOOK_PAGE_ID=YOUR_PAGE_ID_HERE
FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN_HERE

# ============================================
# LINKEDIN (You have these)
# ============================================
LINKEDIN_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
LINKEDIN_ORGANIZATION_ID=YOUR_ORG_ID_HERE

# ============================================
# CLOUDFLARE (You have these)
# ============================================
CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE
CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN_HERE
CF_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE
CF_API_TOKEN=YOUR_API_TOKEN_HERE

# ============================================
# OPTIONAL (Recommended)
# ============================================
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WEBHOOK_HERE
```

---

## 🚀 Quick Deployment Steps

### Step 1: Add Keys to Netlify Dashboard

1. Go to https://app.netlify.com
2. Select your site: **elevateforhumanityfix2**
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** for each key below:

#### Stripe (3 keys):

```
STRIPE_SECRET_KEY = sk_test_YOUR_KEY
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET = whsec_YOUR_SECRET
```

#### Facebook (2 keys):

```
FACEBOOK_PAGE_ID = YOUR_PAGE_ID
FACEBOOK_PAGE_ACCESS_TOKEN = YOUR_PAGE_ACCESS_TOKEN
```

#### LinkedIn (2 keys):

```
LINKEDIN_ACCESS_TOKEN = YOUR_ACCESS_TOKEN
LINKEDIN_ORGANIZATION_ID = YOUR_ORG_ID
```

#### Cloudflare (2 keys):

```
CLOUDFLARE_ACCOUNT_ID = YOUR_ACCOUNT_ID
CLOUDFLARE_API_TOKEN = YOUR_API_TOKEN
```

#### Supabase Service Key (1 key):

```
SUPABASE_SERVICE_KEY = YOUR_SERVICE_ROLE_KEY
```

5. Click **Save**
6. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

---

### Step 2: Deploy Cloudflare Worker

```bash
# Set environment variables
export CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN_HERE
export CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE

# Update wrangler.toml with your account ID
sed -i 's/# account_id = "your-cloudflare-account-id"/account_id = "YOUR_ACCOUNT_ID_HERE"/' wrangler.toml

# Deploy worker
npx wrangler deploy

# Or use the automated script
./scripts/deploy-cloudflare-worker.sh
```

---

### Step 3: Add Cloudflare Keys to GitHub Secrets

For automated Cloudflare Worker deployments via GitHub Actions:

1. Go to https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click **New repository secret**
3. Add these 2 secrets:
   - Name: `CLOUDFLARE_API_TOKEN`, Value: Your Cloudflare API token
   - Name: `CLOUDFLARE_ACCOUNT_ID`, Value: Your Cloudflare account ID

---

## ✅ Verify Deployment

### Check Netlify Build

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login
netlify login

# Check status
netlify status

# View latest deploy
netlify open:site
```

### Check Cloudflare Worker

```bash
# List deployments
npx wrangler deployments list

# Test worker health endpoint
curl https://autopilot-deploy-worker.YOUR_SUBDOMAIN.workers.dev/health
```

### Test Site Features

1. Visit: https://elevateforhumanityfix2.netlify.app
2. Test:
   - ✅ Course catalog loads
   - ✅ User registration works
   - ✅ Course enrollment works
   - ✅ Payment processing (test card: 4242 4242 4242 4242)
   - ✅ Social media posting (Facebook & LinkedIn)

---

## 📊 What You'll Get

### ✅ 95% Functionality (With Current Keys)

**Payments**:

- Course purchases via Stripe
- Revenue sharing (50% EFH, 50% Partners)
- Subscription management
- Refund handling

**Social Media**:

- Auto-post to Facebook
- Auto-post to LinkedIn
- Scheduled content posting
- Engagement tracking

**Infrastructure**:

- Cloudflare edge functions
- Global CDN (200+ locations)
- DDoS protection
- API rate limiting

**Core LMS**:

- Full learning management system
- Course catalog with 6 programs
- Video lessons with progress tracking
- Quiz system
- Certificate generation
- Student/instructor dashboards

---

## 🔄 Autonomous Autopilot

Once deployed, the autopilot will:

### Every 30 Minutes:

- ✅ Check TypeScript compilation
- ✅ Check ESLint validation
- ✅ Run test suite
- ✅ Verify build
- ✅ Monitor Netlify deployments
- ✅ Check Supabase health
- ✅ Verify Cloudflare worker

### When Errors Detected:

- 🔧 Auto-fix TypeScript errors
- 🔧 Auto-fix ESLint errors
- 📝 Create GitHub issues
- 🚀 Auto-commit and push fixes
- 📊 Send notifications (if Slack configured)

---

## 🎯 Optional: Add OpenAI for AI Content

If you want AI-powered content generation:

```bash
# Add to Netlify environment variables
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE
```

This enables:

- ✅ AI course content generation
- ✅ Quiz question creation
- ✅ Certificate text generation
- ✅ Social media post generation

Get key from: https://platform.openai.com/api-keys

---

## 🎯 Optional: Add Slack for Notifications

If you want autopilot notifications:

```bash
# Add to Netlify environment variables
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WEBHOOK_HERE
```

This enables:

- ✅ Build failure alerts
- ✅ Error notifications
- ✅ Deployment status updates
- ✅ System health alerts

Get webhook from: https://api.slack.com/apps

---

## 📝 Create .env File for Local Development

```bash
# Copy template
cp .env.example .env

# Edit .env and add your keys
nano .env
```

Add these to `.env`:

```bash
# Supabase
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_SERVICE_KEY=YOUR_SERVICE_ROLE_KEY

# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# Facebook
FACEBOOK_PAGE_ID=YOUR_PAGE_ID
FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN

# LinkedIn
LINKEDIN_ACCESS_TOKEN=YOUR_ACCESS_TOKEN
LINKEDIN_ORGANIZATION_ID=YOUR_ORG_ID

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID
CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN
CF_ACCOUNT_ID=YOUR_ACCOUNT_ID
CF_API_TOKEN=YOUR_API_TOKEN

# Optional
OPENAI_API_KEY=sk-proj-YOUR_KEY
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WEBHOOK
```

---

## 🧪 Test Locally Before Deploying

```bash
# Install dependencies
pnpm install

# Test TypeScript
pnpm run typecheck

# Test ESLint
pnpm run lint

# Run tests
pnpm test

# Build project
pnpm run build

# Run dev server
pnpm run dev
```

Expected results:

- ✅ 0 TypeScript errors
- ✅ 0 ESLint errors
- ✅ 72 tests passing
- ✅ Build successful
- ✅ Dev server running on http://localhost:5173

---

## 🆘 Troubleshooting

### Issue: "Missing environment variable"

**Solution**: Make sure all required keys are added to Netlify Dashboard

### Issue: "Facebook API error"

**Solution**:

- Verify `FACEBOOK_PAGE_ID` is correct
- Check `FACEBOOK_PAGE_ACCESS_TOKEN` hasn't expired
- Ensure page access token has `pages_manage_posts` permission

### Issue: "LinkedIn API error"

**Solution**:

- Verify `LINKEDIN_ACCESS_TOKEN` is valid
- Check `LINKEDIN_ORGANIZATION_ID` is correct
- Ensure token has `w_organization_social` permission

### Issue: "Cloudflare deployment failed"

**Solution**:

- Verify `CLOUDFLARE_ACCOUNT_ID` is correct
- Check `CLOUDFLARE_API_TOKEN` has "Edit Cloudflare Workers" permission
- Run `npx wrangler whoami` to verify authentication

### Issue: "Stripe webhook not working"

**Solution**:

- Go to https://dashboard.stripe.com/webhooks
- Verify webhook endpoint URL matches your Netlify domain
- Check webhook secret matches `STRIPE_WEBHOOK_SECRET`
- Ensure these events are selected:
  - `checkout.session.completed`
  - `payment_intent.succeeded`

---

## 🎉 You're Ready!

Once you add your keys:

1. ✅ Add keys to Netlify Dashboard (10 keys total)
2. ✅ Deploy Cloudflare Worker
3. ✅ Add Cloudflare keys to GitHub Secrets
4. ✅ Trigger Netlify deploy
5. ✅ Let the autopilot handle the rest!

**The autonomous autopilot will take care of everything from here.**

---

## 📚 Documentation Reference

- 📄 `STRIPE_SETUP_GUIDE.md` - Detailed Stripe setup
- 📄 `SOCIAL_MEDIA_SETUP_GUIDE.md` - Social media APIs (skip Twitter section)
- 📄 `CLOUDFLARE_SETUP_GUIDE.md` - Cloudflare Workers
- 📄 `COMPLETE_SETUP_CHECKLIST.md` - Master checklist
- 📄 `API_KEYS_REQUIRED.md` - Complete API keys list

---

**🚀 READY TO DEPLOY - ADD YOUR KEYS AND GO! 🚀**

**Generated by**: Autonomous Autopilot v7.0  
**Status**: Ready for deployment  
**Keys Needed**: Stripe (3) + Facebook (2) + LinkedIn (2) + Cloudflare (2) + Supabase (1) = 10 total
