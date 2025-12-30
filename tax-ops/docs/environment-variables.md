# Environment Variables - Tax Ops Payment System

## Required Environment Variables

### Stripe
```bash
STRIPE_SECRET_KEY=sk_live_...           # Stripe secret key (server-side only)
STRIPE_WEBHOOK_SECRET=whsec_...         # Webhook signing secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  # Client-side publishable key
```

### Supabase
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...    # Public anon key (safe for client)
SUPABASE_SERVICE_ROLE_KEY=eyJ...        # Service role key (server-only, NEVER expose)
```

### Site Configuration
```bash
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
NEXT_PUBLIC_BASE_URL=https://www.elevateforhumanity.org  # For redirects
```

---

## Stripe Dashboard Setup

### 1. Create Webhook Endpoint
1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → Developers → Webhooks
2. Click "Add endpoint"
3. Enter URL: `https://www.elevateforhumanity.org/api/stripe/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
5. Copy the **Signing secret** → Set as `STRIPE_WEBHOOK_SECRET`

### 2. Test Webhook Locally (Optional)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local dev
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Use the webhook signing secret provided by CLI for local testing
```

---

## Security Notes

### ⚠️ NEVER Expose These:
- `STRIPE_SECRET_KEY` - Server-side only
- `STRIPE_WEBHOOK_SECRET` - Server-side only
- `SUPABASE_SERVICE_ROLE_KEY` - Server-side only, bypasses RLS

### ✅ Safe to Expose (Client-Side):
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL`

---

## Vercel Deployment

Add all environment variables in:
**Vercel Dashboard → Your Project → Settings → Environment Variables**

Make sure to set them for:
- Production
- Preview (optional)
- Development (optional)

---

## Gitpod / Local Development

Create `.env.local` in project root:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**⚠️ Never commit `.env.local` to git!**

---

## Testing Checklist

- [ ] Stripe webhook endpoint added in dashboard
- [ ] Webhook secret copied to environment variables
- [ ] All Supabase keys configured
- [ ] Site URL matches deployment URL
- [ ] Test payment completes successfully
- [ ] Webhook marks intake as paid in database
- [ ] RLS policies prevent public from marking themselves paid

---

## Troubleshooting

### Webhook Not Firing
1. Check Stripe Dashboard → Developers → Webhooks → Recent deliveries
2. Verify endpoint URL is correct
3. Check webhook secret matches environment variable
4. Look for errors in webhook delivery logs

### Payment Not Marking as Paid
1. Check Supabase logs for errors
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
3. Check that `intake_id` is being passed to checkout
4. Verify RLS policies allow service role to update

### RLS Blocking Inserts
1. Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
2. Check that RLS policy allows anon inserts
3. Verify trigger function isn't raising exceptions
4. Check Supabase logs for detailed error messages
