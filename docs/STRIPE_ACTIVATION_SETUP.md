# Stripe Activation Pipeline Setup
## Complete Guide: Stripe → Webhook → Supabase → Feature Gates

---

## Overview

This system automatically activates user access when they subscribe:
1. User clicks "Get Started" on pricing page
2. Redirects to Stripe Checkout
3. User completes payment
4. Stripe webhook fires
5. Webhook updates Supabase `user_access` table
6. LMS pages check tier and grant/deny access

---

## Step 1: Create Supabase Table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.user_access (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tier text not null default 'free', -- free | student | career | partner
  stripe_customer_id text,
  stripe_subscription_id text,
  stripe_price_id text,
  status text, -- active | trialing | past_due | canceled | incomplete | unpaid
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.user_access enable row level security;

create policy "user can read own access"
on public.user_access
for select
to authenticated
using (auth.uid() = user_id);

create policy "service role writes access"
on public.user_access
for all
to service_role
using (true)
with check (true);

create index if not exists idx_user_access_user_id on public.user_access(user_id);
create index if not exists idx_user_access_stripe_customer on public.user_access(stripe_customer_id);
```

---

## Step 2: Create Stripe Products

### In Stripe Dashboard (https://dashboard.stripe.com/products):

**Product 1: Student Platform Access**
- Name: `Student Platform Access`
- Description: `Monthly platform access for enrolled learners. Includes LMS access, progress tracking, and assigned coursework.`
- Price: `$39.00 USD`
- Billing: `Recurring - Monthly`
- After creating, copy the **Price ID** (starts with `price_...`)

**Product 2: Career Track Platform Access**
- Name: `Career Track Platform Access`
- Description: `Advanced platform access for career pathways, professional tools, and priority support.`
- Price: `$149.00 USD`
- Billing: `Recurring - Monthly`
- After creating, copy the **Price ID** (starts with `price_...`)

---

## Step 3: Set Environment Variables

Add these to your hosting environment (Vercel/Netlify/etc):

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_live_...  # or sk_test_... for testing
STRIPE_WEBHOOK_SECRET=whsec_...  # Get this in Step 4

# Stripe Price IDs (from Step 2)
STRIPE_PRICE_STUDENT=price_...  # Student Access Price ID
STRIPE_PRICE_CAREER=price_...   # Career Track Price ID

# Site URL
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org

# Supabase (you should already have these)
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Service role key (NOT anon key)
```

---

## Step 4: Register Webhook in Stripe

### In Stripe Dashboard → Developers → Webhooks:

1. Click "Add endpoint"
2. **Endpoint URL**: `https://www.elevateforhumanity.org/api/stripe/webhook`
3. **Events to send** (select these 3):
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click "Add endpoint"
5. Copy the **Signing secret** (starts with `whsec_...`)
6. Add it to your environment as `STRIPE_WEBHOOK_SECRET`

---

## Step 5: Test the Flow

### Test Checklist:

1. **Create a test user**:
   - Sign up at `/signup`
   - Verify email
   - Log in

2. **Check initial state**:
   - User should have `tier = 'free'` in Supabase (or no record)
   - LMS pages should redirect to `/pricing`

3. **Subscribe to Student Access**:
   - Go to `/pricing`
   - Click "Get Started" on Student Access
   - Should redirect to `/checkout/student`
   - Click "Continue to secure checkout"
   - Should redirect to Stripe Checkout
   - Use test card: `4242 4242 4242 4242`, any future date, any CVC
   - Complete checkout

4. **Verify activation**:
   - Check Supabase `user_access` table
   - Should see record with `tier = 'student'`, `status = 'active'`
   - Go to `/lms/(app)/dashboard`
   - Should load without redirect

5. **Test cancellation**:
   - In Stripe Dashboard, cancel the subscription
   - Webhook should fire
   - Supabase should update to `tier = 'free'`, `status = 'canceled'`
   - LMS pages should redirect to `/pricing` again

---

## Step 6: Add Feature Gates

### Example: Protect an LMS page

```typescript
// app/lms/(app)/assignments/page.tsx
import { redirect } from "next/navigation";
import { getAccessTier } from "@/lib/access";

export default async function AssignmentsPage() {
  const access = await getAccessTier();
  
  // Require at least Student tier
  if (access.tier === 'free') {
    redirect('/pricing');
  }
  
  return (
    <div className="p-6">
      <h1>Assignments</h1>
      {/* Protected content */}
    </div>
  );
}
```

### Example: Require Career tier

```typescript
// app/lms/(app)/career-tools/page.tsx
import { requireTier } from "@/lib/access";

export default async function CareerToolsPage() {
  // This will auto-redirect if user doesn't have career tier
  await requireTier('career');
  
  return (
    <div className="p-6">
      <h1>Career Tools</h1>
      {/* Career-only content */}
    </div>
  );
}
```

---

## Troubleshooting

### Webhook not firing:
- Check Stripe Dashboard → Developers → Webhooks → Your endpoint
- Look at "Recent events" - should see attempts
- If failing, check the error message
- Verify `STRIPE_WEBHOOK_SECRET` is correct

### User not getting activated:
- Check webhook logs in Stripe Dashboard
- Verify `user_id` is in subscription metadata
- Check Supabase logs for errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct (not anon key)

### Access not updating:
- Check `user_access` table in Supabase
- Verify RLS policies are correct
- Check that `STRIPE_PRICE_STUDENT` and `STRIPE_PRICE_CAREER` match actual Price IDs

---

## App Store Compliance Notes

### For iOS App:
- Show pricing information
- Use "Manage on Website" button (not "Buy")
- Link to website for purchases
- This complies with Apple's updated U.S. guidelines

### For Android App:
- Can show "Get Started" buttons
- Can link directly to checkout
- Google Play allows external payments in U.S.

### Both Stores:
- App download is FREE
- Clearly state "payments processed on website"
- No in-app purchase APIs used
- Education/training services exemption

---

## Files Created

- `lib/access.ts` - Access tier helpers
- `app/api/checkout/student/route.ts` - Student checkout endpoint
- `app/api/checkout/career/route.ts` - Career checkout endpoint
- `app/api/stripe/webhook/route.ts` - Webhook handler
- `app/checkout/student/page.tsx` - Student checkout page
- `app/checkout/career/page.tsx` - Career checkout page
- `supabase/migrations/create_user_access_table.sql` - Database schema

---

## Next Steps

1. ✅ Run Supabase migration
2. ✅ Create Stripe products
3. ✅ Add environment variables
4. ✅ Register webhook
5. ✅ Test with test card
6. ✅ Add feature gates to LMS pages
7. ✅ Deploy to production
8. ✅ Test with real card (small amount)
9. ✅ Submit to app stores

---

## Support

If you encounter issues:
1. Check Stripe webhook logs
2. Check Supabase logs
3. Check browser console for errors
4. Verify all environment variables are set
5. Test with Stripe test mode first
