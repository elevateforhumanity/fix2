# ⚙️ Set Environment Variables on Supabase

**Project**: cuxzzpsyufcewtmicszk  
**Action**: Configure Edge Functions environment variables

---

## 🎯 Why Set Variables on Supabase?

Supabase Edge Functions need access to:

- ✅ Stripe keys (for payment processing)
- ✅ Social media API keys (for posting)
- ✅ OpenAI key (for AI content generation)
- ✅ Other service credentials

---

## 🚀 Option 1: Via Supabase Dashboard (Easiest - 5 minutes)

### Step 1: Go to Edge Functions Settings

**Link**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/functions

### Step 2: Add Environment Variables

Click **Add new secret** for each variable:

#### Stripe Variables (3 secrets):

```
STRIPE_SECRET_KEY = sk_test_YOUR_KEY_HERE
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET = whsec_YOUR_SECRET_HERE
```

#### Facebook Variables (2 secrets):

```
FACEBOOK_PAGE_ID = YOUR_PAGE_ID_HERE
FACEBOOK_PAGE_ACCESS_TOKEN = YOUR_PAGE_ACCESS_TOKEN_HERE
```

#### LinkedIn Variables (2 secrets):

```
LINKEDIN_ACCESS_TOKEN = YOUR_ACCESS_TOKEN_HERE
LINKEDIN_ORGANIZATION_ID = YOUR_ORG_ID_HERE
```

#### OpenAI Variable (1 secret):

```
OPENAI_API_KEY = sk-proj-YOUR_KEY_HERE
```

#### Supabase Service Key (1 secret):

```
SUPABASE_SERVICE_KEY = YOUR_SERVICE_ROLE_KEY_HERE
```

**Note**: `SUPABASE_URL` is automatically available in Edge Functions.

### Step 3: Save Changes

Click **Save** after adding each secret.

---

## 🤖 Option 2: Via Supabase CLI (Advanced)

### Prerequisites:

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref cuxzzpsyufcewtmicszk
```

### Set Secrets:

```bash
# Stripe
supabase secrets set STRIPE_SECRET_KEY=sk_test_YOUR_KEY
supabase secrets set VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET

# Facebook
supabase secrets set FACEBOOK_PAGE_ID=YOUR_PAGE_ID
supabase secrets set FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_TOKEN

# LinkedIn
supabase secrets set LINKEDIN_ACCESS_TOKEN=YOUR_TOKEN
supabase secrets set LINKEDIN_ORGANIZATION_ID=YOUR_ORG_ID

# OpenAI
supabase secrets set OPENAI_API_KEY=sk-proj-YOUR_KEY

# Supabase Service Key
supabase secrets set SUPABASE_SERVICE_KEY=YOUR_SERVICE_KEY
```

### Verify Secrets:

```bash
# List all secrets (values are hidden)
supabase secrets list
```

---

## 📋 Complete Environment Variables List

### Required for Netlify Functions:

These variables are used by Netlify Functions (not Supabase Edge Functions):

**Netlify Dashboard**: https://app.netlify.com → elevateforhumanityfix2 → Site settings → Environment variables

```bash
# Supabase
VITE_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
SUPABASE_SERVICE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# Stripe
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# Facebook
FACEBOOK_PAGE_ID=YOUR_PAGE_ID_HERE
FACEBOOK_PAGE_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN_HERE

# LinkedIn
LINKEDIN_ACCESS_TOKEN=YOUR_ACCESS_TOKEN_HERE
LINKEDIN_ORGANIZATION_ID=YOUR_ORG_ID_HERE

# OpenAI
OPENAI_API_KEY=sk-proj-YOUR_KEY_HERE

# Cloudflare
CLOUDFLARE_ACCOUNT_ID=YOUR_ACCOUNT_ID_HERE
CLOUDFLARE_API_TOKEN=YOUR_API_TOKEN_HERE

# Optional
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOURWEBHOOKHERE
```

---

## 🔍 Where Each Variable Is Used

### Netlify Functions (netlify/functions/):

**stripe-webhook.js**:

- `STRIPE_SECRET_KEY` - Verify webhook signatures
- `STRIPE_WEBHOOK_SECRET` - Validate Stripe events
- `SUPABASE_URL` - Connect to database
- `SUPABASE_SERVICE_KEY` - Admin access to Supabase

**create-checkout-session.js**:

- `STRIPE_SECRET_KEY` - Create payment sessions
- `VITE_STRIPE_PUBLISHABLE_KEY` - Frontend Stripe.js
- `SUPABASE_URL` - Store payment records
- `SUPABASE_SERVICE_KEY` - Database access

**post-to-social-media.js**:

- `FACEBOOK_PAGE_ID` - Facebook page to post to
- `FACEBOOK_PAGE_ACCESS_TOKEN` - Facebook API access
- `LINKEDIN_ACCESS_TOKEN` - LinkedIn API access
- `LINKEDIN_ORGANIZATION_ID` - LinkedIn organization
- `SUPABASE_URL` - Get content from database
- `SUPABASE_SERVICE_KEY` - Database access

**generate-social-content.js**:

- `OPENAI_API_KEY` - Generate AI content
- `SUPABASE_URL` - Store generated content
- `SUPABASE_SERVICE_KEY` - Database access

---

## ✅ Verify Configuration

### Check Netlify Functions:

```bash
# Test Stripe webhook
curl -X POST https://elevateforhumanityfix2.netlify.app/.netlify/functions/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Test health check
curl https://elevateforhumanityfix2.netlify.app/.netlify/functions/health-check
```

### Check Supabase Edge Functions:

```bash
# List deployed functions
supabase functions list

# Test function
supabase functions invoke YOUR_FUNCTION_NAME --data '{"test": true}'
```

---

## 🔒 Security Best Practices

### ✅ DO:

- Use different keys for development and production
- Rotate keys periodically (every 90 days)
- Set usage limits on all APIs
- Monitor API usage regularly
- Use service role key only on backend
- Never expose secrets in frontend code

### ❌ DON'T:

- Commit secrets to git
- Share secrets publicly
- Use production keys in development
- Expose service role key in frontend
- Leave unlimited API usage enabled
- Reuse keys across projects

---

## 🆘 Troubleshooting

### Issue: "Environment variable not found"

**Solution**:

- Check variable name spelling (case-sensitive)
- Verify variable is set in correct location (Netlify vs Supabase)
- Redeploy after adding variables
- Check function logs for specific error

### Issue: "Stripe webhook signature verification failed"

**Solution**:

- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Check webhook endpoint URL in Stripe Dashboard
- Ensure webhook is sending to correct URL
- Test with Stripe CLI: `stripe listen --forward-to localhost:8888/.netlify/functions/stripe-webhook`

### Issue: "Facebook API error"

**Solution**:

- Verify `FACEBOOK_PAGE_ACCESS_TOKEN` hasn't expired
- Check `FACEBOOK_PAGE_ID` is correct
- Ensure token has `pages_manage_posts` permission
- Regenerate token if needed

### Issue: "LinkedIn API error"

**Solution**:

- Verify `LINKEDIN_ACCESS_TOKEN` is valid
- Check `LINKEDIN_ORGANIZATION_ID` is correct
- Ensure token has `w_organization_social` permission
- Refresh token if expired

### Issue: "OpenAI API error"

**Solution**:

- Verify `OPENAI_API_KEY` is correct
- Check usage limits: https://platform.openai.com/account/limits
- Ensure payment method is added
- Check API status: https://status.openai.com

---

## 📊 Environment Variables Summary

### Total Variables Needed:

**Netlify (11 required + 2 optional)**:

- Supabase: 3 (URL, anon key, service key)
- Stripe: 3 (secret, publishable, webhook secret)
- Facebook: 2 (page ID, access token)
- LinkedIn: 2 (access token, org ID)
- OpenAI: 1 (API key)
- Cloudflare: 2 (account ID, API token) - optional
- Slack: 1 (webhook URL) - optional

**Supabase Edge Functions (9 variables)**:

- Same as above, but `SUPABASE_URL` is automatic

---

## 🎉 After Setting Variables

Once all variables are set:

1. ✅ Netlify Functions can process payments
2. ✅ Social media posting works
3. ✅ AI content generation works
4. ✅ Webhooks are verified
5. ✅ Database access is secure
6. ✅ All integrations functional

---

## 🔗 Quick Links

**Supabase Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk  
**Edge Functions Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/functions  
**Netlify Dashboard**: https://app.netlify.com  
**Netlify Env Vars**: https://app.netlify.com/sites/elevateforhumanityfix2/settings/env

---

## 📚 Next Steps

After setting environment variables:

1. ✅ Create Supabase storage buckets (see `CREATE_SUPABASE_BUCKETS.md`)
2. ✅ Get OpenAI API key (see `GET_OPENAI_API_KEY.md`)
3. ✅ Deploy to Netlify (see `QUICK_DEPLOY_CHECKLIST.md`)
4. ✅ Deploy Cloudflare Worker (see `DEPLOY_WITH_YOUR_KEYS.md`)
5. ✅ Test all features

---

**Time to Setup**: 5 minutes  
**Variables Needed**: 11 required + 2 optional  
**Status**: Required for full functionality

---

**🚀 SET VARIABLES NOW: https://app.netlify.com/sites/elevateforhumanityfix2/settings/env 🚀**
