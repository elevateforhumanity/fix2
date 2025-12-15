# Stripe Connect Upgrade Path

## Overview

This document outlines the migration from manual payouts to Stripe Connect for automated revenue splits and payouts in the creator marketplace.

## Current Architecture (Phase 1)

### How It Works Now

1. All payments go to your main Stripe account
2. Revenue splits calculated in webhook handler
3. Creator earnings tracked in `marketplace_sales` table
4. Manual payouts processed monthly via ACH/PayPal/Zelle
5. You handle all tax reporting and compliance

### Limitations

- Manual payout processing required
- Higher administrative overhead
- Delayed payments to creators
- Complex tax reporting
- No automatic 1099 generation

## Stripe Connect Architecture (Phase 2)

### What Changes

1. Creators become Stripe Connected Accounts
2. Payments automatically split at transaction time
3. Creators receive payouts directly from Stripe
4. Stripe handles tax reporting (1099-K)
5. Reduced administrative burden

### Benefits

- **Automated Payouts**: Creators get paid automatically
- **Instant Splits**: Revenue divided at payment time
- **Tax Compliance**: Stripe handles 1099-K forms
- **Scalability**: Supports thousands of creators
- **Trust**: Creators see transparent payment flow
- **Reduced Liability**: Stripe manages creator funds

## Migration Strategy

### Step 1: Choose Connect Type

**Option A: Standard Connect (Recommended)**

- Creators create their own Stripe accounts
- Full control over their account
- Stripe handles onboarding and compliance
- Best for long-term scalability

**Option B: Express Connect**

- Simplified onboarding
- You manage some compliance
- Faster setup for creators
- Good middle ground

**Option C: Custom Connect**

- Full white-label experience
- You handle all compliance
- Most complex to implement
- Only if you need complete control

**Recommendation:** Start with **Standard Connect**

### Step 2: Database Schema Updates

Add Connect fields to creators table:

```sql
ALTER TABLE marketplace_creators
ADD COLUMN stripe_account_id TEXT UNIQUE,
ADD COLUMN stripe_account_status TEXT, -- 'pending', 'active', 'restricted'
ADD COLUMN stripe_onboarding_complete BOOLEAN DEFAULT FALSE,
ADD COLUMN stripe_charges_enabled BOOLEAN DEFAULT FALSE,
ADD COLUMN stripe_payouts_enabled BOOLEAN DEFAULT FALSE;

CREATE INDEX idx_marketplace_creators_stripe_account
ON marketplace_creators(stripe_account_id);
```

### Step 3: Creator Onboarding Flow

#### New Creator Application

1. Creator applies as usual
2. After approval, redirect to Stripe Connect onboarding
3. Creator completes Stripe identity verification
4. Store `stripe_account_id` in database
5. Enable selling once onboarding complete

#### Existing Creator Migration

1. Email existing creators about upgrade
2. Provide Connect onboarding link
3. Set deadline for migration (e.g., 30 days)
4. Continue manual payouts until migrated
5. Disable selling for non-migrated creators after deadline

### Step 4: Update Checkout Flow

#### Current Checkout

```typescript
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [...],
  metadata: { product_id, creator_id },
  success_url: "...",
  cancel_url: "...",
});
```

#### Connect Checkout (Destination Charges)

```typescript
const session = await stripe.checkout.sessions.create({
  mode: "payment",
  line_items: [...],
  payment_intent_data: {
    application_fee_amount: platformFee, // 30% in cents
    transfer_data: {
      destination: creatorStripeAccountId, // 70% goes here
    },
  },
  metadata: { product_id, creator_id },
  success_url: "...",
  cancel_url: "...",
});
```

### Step 5: Update Webhook Handler

#### Current Webhook

```typescript
// Calculate split manually
const creatorEarnings = Math.floor(amount * 0.7);
const platformEarnings = amount - creatorEarnings;

// Store in database
await supabase.from('marketplace_sales').insert({
  creator_earnings_cents: creatorEarnings,
  platform_earnings_cents: platformEarnings,
  paid_out: false, // Manual payout needed
});
```

#### Connect Webhook

```typescript
// Split happens automatically by Stripe
// Just record the transaction
await supabase.from('marketplace_sales').insert({
  creator_earnings_cents: creatorEarnings,
  platform_earnings_cents: platformEarnings,
  paid_out: true, // Already paid by Stripe
  stripe_transfer_id: transfer.id,
});

// Listen for additional events:
// - account.updated (creator account status changes)
// - payout.paid (creator receives payout)
// - payout.failed (payout issues)
```

### Step 6: API Routes to Add

#### Connect Onboarding

```typescript
// /api/creator/connect/onboard
export async function POST(req: Request) {
  const { creatorId } = await req.json();

  // Create connected account
  const account = await stripe.accounts.create({
    type: 'standard',
    country: 'US',
  });

  // Create onboarding link
  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: `${siteUrl}/creator/connect/refresh`,
    return_url: `${siteUrl}/creator/connect/complete`,
    type: 'account_onboarding',
  });

  // Save account ID
  await supabase
    .from('marketplace_creators')
    .update({ stripe_account_id: account.id })
    .eq('id', creatorId);

  return { url: accountLink.url };
}
```

#### Check Connect Status

```typescript
// /api/creator/connect/status
export async function GET(req: Request) {
  const { creatorId } = await req.json();

  const { data: creator } = await supabase
    .from('marketplace_creators')
    .select('stripe_account_id')
    .eq('id', creatorId)
    .single();

  if (!creator.stripe_account_id) {
    return { status: 'not_connected' };
  }

  const account = await stripe.accounts.retrieve(creator.stripe_account_id);

  return {
    status: 'connected',
    charges_enabled: account.charges_enabled,
    payouts_enabled: account.payouts_enabled,
    details_submitted: account.details_submitted,
  };
}
```

### Step 7: Creator Dashboard Updates

Add Connect status section:

```tsx
{
  !creator.stripe_onboarding_complete && (
    <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
      <h3 className="font-semibold text-yellow-900 mb-2">
        Complete Stripe Setup
      </h3>
      <p className="text-yellow-800 mb-4">
        Connect your Stripe account to receive automatic payouts.
      </p>
      <button
        onClick={handleConnectOnboarding}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Connect Stripe Account
      </button>
    </div>
  );
}

{
  creator.stripe_onboarding_complete && (
    <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
      <h3 className="font-semibold text-green-900 mb-2">✓ Stripe Connected</h3>
      <p className="text-green-800">
        You'll receive automatic payouts from Stripe.
      </p>
    </div>
  );
}
```

## Migration Timeline

### Week 1-2: Preparation

- [ ] Review Stripe Connect documentation
- [ ] Choose Connect type (Standard recommended)
- [ ] Update database schema
- [ ] Test Connect integration in development
- [ ] Create migration communication plan

### Week 3-4: Development

- [ ] Implement Connect onboarding flow
- [ ] Update checkout to use destination charges
- [ ] Update webhook handler for Connect events
- [ ] Add Connect status to creator dashboard
- [ ] Test end-to-end with test accounts

### Week 5-6: Migration

- [ ] Email existing creators about upgrade
- [ ] Provide onboarding links
- [ ] Monitor migration progress
- [ ] Support creators with questions
- [ ] Continue manual payouts for non-migrated

### Week 7-8: Completion

- [ ] Set deadline for migration
- [ ] Final reminder emails
- [ ] Disable selling for non-migrated creators
- [ ] Complete final manual payouts
- [ ] Switch fully to Connect

## Cost Comparison

### Current (Manual Payouts)

- Stripe fee: 2.9% + $0.30 per transaction
- Your time: ~2-4 hours/month for payouts
- ACH/PayPal fees: Variable
- Tax reporting: Manual

### With Stripe Connect

- Stripe fee: 2.9% + $0.30 per transaction
- Connect fee: 0.25% additional (for Standard)
- Your time: ~0 hours/month (automated)
- Payout fees: Included
- Tax reporting: Automated (1099-K)

**Break-even:** ~50 creators or $10k/month in sales

## Testing Checklist

### Development Testing

- [ ] Create test connected account
- [ ] Complete onboarding flow
- [ ] Make test purchase with destination charge
- [ ] Verify split appears in both accounts
- [ ] Test refund flow
- [ ] Test payout schedule

### Production Testing

- [ ] Onboard 1-2 pilot creators
- [ ] Monitor first real transactions
- [ ] Verify payouts arrive correctly
- [ ] Check tax reporting data
- [ ] Gather creator feedback

## Rollback Plan

If issues arise during migration:

1. **Immediate Rollback**
   - Revert checkout code to manual split
   - Continue manual payouts
   - Keep Connect accounts for future retry

2. **Partial Rollback**
   - New creators use Connect
   - Existing creators stay on manual
   - Gradual migration over time

3. **Data Preservation**
   - All Connect account IDs remain in database
   - Transaction history preserved
   - Can resume migration anytime

## Support Resources

### Stripe Documentation

- [Connect Overview](https://stripe.com/docs/connect)
- [Standard Accounts](https://stripe.com/docs/connect/standard-accounts)
- [Destination Charges](https://stripe.com/docs/connect/destination-charges)
- [Testing Connect](https://stripe.com/docs/connect/testing)

### Implementation Help

- Stripe Support: support@stripe.com
- Connect Slack: stripe-connect.slack.com
- Developer Discord: discord.gg/stripe

## Success Metrics

Track these metrics post-migration:

- **Creator Satisfaction**: Survey creators on payout experience
- **Time Saved**: Hours saved on manual payout processing
- **Payout Speed**: Time from sale to creator receiving funds
- **Error Rate**: Failed payouts or disputes
- **Adoption Rate**: % of creators who complete onboarding

## Conclusion

Stripe Connect migration is recommended when:

- You have 10+ active creators
- Processing $5k+/month in marketplace sales
- Manual payouts become time-consuming
- Creators request faster payments

The migration is straightforward and can be done gradually. Your current architecture is already Connect-ready with minimal changes needed.

**Estimated Implementation Time:** 2-3 weeks
**Recommended Start Date:** After 3 months of marketplace operation
