# Revenue Architecture

## One Brand, Multiple Revenue Streams

---

## Overview

Elevate for Humanity operates ONE ecosystem with THREE revenue streams:

1. **Public Digital Store** - Anyone can buy (no login)
2. **Platform Subscriptions** - Enrolled users (login required)
3. **Future Creator Marketplace** - Partners sell through us

All under one brand, one Stripe account, one app.

---

## Stream 1: Public Digital Store

### Purpose

Let anyone buy digital products instantly without:

- App install
- Login
- LMS access
- Subscriptions

### URL

`/store`

### What Sells Here

✅ **Toolkits** - $49-$99
✅ **Templates** - $19-$49
✅ **Guides** - $29-$59
✅ **Mini-courses** - $99-$199
✅ **Replays** - $29-$79
✅ **Downloads** - $19-$49
✅ **Donations** - Custom

❌ **NOT HERE:**

- Subscriptions
- LMS-locked content
- Workforce enrollments
- Platform access

### Stripe Setup

**Product Type**: One-time payments

**Examples**:

- Digital Toolkit - $49 (one-time)
- Grant Guide - $29 (one-time)
- Mini Course - $149 (one-time)
- Donation - Custom amount

**Important**: These do NOT:

- Touch `user_access` table
- Unlock LMS features
- Require login

### Delivery

- Email receipt + download link
- Thank-you page with instant access
- Optional account creation prompt
- No LMS dependency

### Checkout Flow

```
/store → /store/checkout/{slug} → Stripe → /thank-you?product={slug}
```

### Target Audience

- Social media followers
- Google search traffic
- Email subscribers
- Anyone needing quick resources
- No commitment buyers

---

## Stream 2: Platform Subscriptions

### Purpose

Serve enrolled users with:

- LMS access
- Career pathways
- Workforce programs
- Business training
- Partner tools

### URLs

- `/pricing` - Subscription tiers
- `/lms` - Platform access

### What Sells Here

✅ **Student Access** - $39/month
✅ **Career Track Access** - $149/month
✅ **Partner Access** - Custom

❌ **NOT HERE:**

- One-time digital products
- Quick downloads
- No-login purchases

### Stripe Setup

**Product Type**: Recurring subscriptions

**Products**:

1. Student Platform Access - $39/month
2. Career Track Platform Access - $149/month

**Important**: These DO:

- Require login
- Update `user_access` table via webhook
- Unlock LMS features
- Provide ongoing access

### Access Control

**Single Source of Truth**: `user_access` table in Supabase

```sql
tier: free | student | career | partner
status: active | canceled | past_due
```

### Checkout Flow

```
/pricing → /checkout/student → Stripe → /lms/dashboard
```

### Target Audience

- Enrolled students
- Career changers
- Workforce participants
- Business builders
- Partner organizations

---

## Stream 3: Future Creator Marketplace

### Purpose

Let other people sell digital products through Elevate platform.

### Status

**Not yet implemented** - Architecture ready

### How It Works

1. Creators apply to sell
2. Upload products
3. Set prices
4. Earn revenue split (e.g., 70/30)

### We Control

- Brand
- Payments
- Compliance
- Quality
- Approval

### Database Schema (Future)

```sql
marketplace_creators
marketplace_products
marketplace_sales
marketplace_payouts
```

### Revenue Split Example

- Creator earns: 70%
- Platform fee: 30%
- Stripe fees: ~3%

### Benefits

- Turns Elevate into distribution platform
- Scales content without creating it
- Builds creator community
- Additional revenue stream

---

## App Store Compliance

### Mobile App Rules

**App is FREE** ✅

- No forced in-app purchases
- Payments handled on website
- App provides access + tools

### Inside the App - SHOW:

✅ Access tiers
✅ Pricing information
✅ "Manage on website" buttons
✅ Feature descriptions

### Inside the App - DON'T SHOW:

❌ "Buy now" buttons (iOS)
❌ "Unlock app" language
❌ In-app purchase prompts

### Approved Language

> "Some services require paid platform access. Payments are processed securely on our website."

### Why This Works

- Education/training exemption
- External payment allowed
- Clear separation of app vs web
- Complies with Apple + Google policies

---

## What Goes Where (Quick Reference)

| Feature              | Public Store | Platform   | App       |
| -------------------- | ------------ | ---------- | --------- |
| **Login Required**   | ❌ No        | ✅ Yes     | ✅ Yes    |
| **Subscriptions**    | ❌ No        | ✅ Yes     | View only |
| **Digital Products** | ✅ Yes       | ❌ No      | View only |
| **LMS Access**       | ❌ No        | ✅ Yes     | ✅ Yes    |
| **Checkout**         | ✅ Web       | ✅ Web     | ❌ No     |
| **SEO/Social**       | ✅ Yes       | ⚠️ Limited | ❌ No     |

---

## Pricing Structure

### Public Products

- **Range**: $19 - $199
- **Type**: One-time
- **Delivery**: Instant
- **Target**: Quick buyers

### Subscriptions

- **Student**: $39/month
- **Career**: $149/month
- **Type**: Recurring
- **Access**: LMS + features

### Programs (Often Funded)

- **Range**: $1,500 - $6,000
- **Type**: Enrollment
- **Funding**: WIOA, grants, employer

### Partners

- **Type**: Custom contracts
- **Pricing**: Negotiated
- **Access**: White-label options

---

## Revenue Projections

### Public Store (Passive Income)

- 100 sales/month × $49 avg = $4,900/month
- Low maintenance
- Scales with traffic

### Platform Subscriptions (Recurring)

- 200 students × $39 = $7,800/month
- 50 career × $149 = $7,450/month
- **Total**: $15,250/month recurring

### Programs (Funded)

- 50 enrollments/year × $3,000 avg = $150,000/year
- Often 100% funded
- High value, high touch

### Future Marketplace (30% fee)

- 500 creator sales/month × $50 avg × 30% = $7,500/month
- Scales with creator network
- Low overhead

---

## Implementation Checklist

### Phase 1: Public Store (Current)

- [x] Create digital products data model
- [x] Build /store page
- [ ] Create checkout routes
- [ ] Build thank-you/delivery page
- [ ] Add to navigation
- [ ] Test complete flow

### Phase 2: Platform Subscriptions (Current)

- [x] Create Supabase user_access table
- [x] Build webhook handler
- [x] Create checkout endpoints
- [x] Build /pricing page
- [ ] Add Stripe Price IDs
- [ ] Test subscription flow

### Phase 3: App Submission

- [ ] Update app descriptions
- [ ] Create screenshots
- [ ] Add "Manage on website" buttons
- [ ] Submit to Google Play
- [ ] Submit to Apple App Store

### Phase 4: Marketing

- [ ] Launch /store with 5 products
- [ ] Social media promotion
- [ ] SEO optimization
- [ ] Email campaigns
- [ ] Affiliate program

### Phase 5: Creator Marketplace (Future)

- [ ] Design creator onboarding
- [ ] Build product upload system
- [ ] Create payout system
- [ ] Set approval workflow
- [ ] Launch beta program

---

## Why This Architecture Works

✅ **Clean Separation**

- Public vs Platform vs App
- No confusion for buyers
- Clear revenue attribution

✅ **App Store Safe**

- Free download
- External payments
- Education exemption
- Compliant language

✅ **Scalable**

- Passive income (store)
- Recurring revenue (subscriptions)
- Future marketplace ready

✅ **User-Friendly**

- No login for quick buys
- Subscriptions for serious users
- App for convenience

✅ **SEO/Social Ready**

- /store is shareable
- Products rank in Google
- Social media friendly

✅ **Future-Proof**

- Creator marketplace path
- Multiple revenue streams
- Platform positioning

---

## Common Questions

### Q: Should I create separate apps for store vs platform?

**A: NO.** One hub app, two web stores. App shows both, purchases happen on web.

### Q: Can I sell subscriptions in the public store?

**A: NO.** Subscriptions only in /pricing. Public store is one-time only.

### Q: Do digital product buyers get LMS access?

**A: NO.** Completely separate. They get download/email only.

### Q: Can I bundle products later?

**A: YES.** Create bundle products in Stripe, list in /store.

### Q: How do I handle refunds?

**A: Different policies:**

- Digital products: 7-day refund
- Subscriptions: Cancel anytime, no refund for current period
- Programs: Per enrollment agreement

---

## Next Steps

1. **Launch /store** with 3-5 digital products
2. **Launch /pricing** with subscriptions
3. **Submit ONE hub app** to Google + Apple
4. **Market public products** on social + SEO
5. **Onboard users** into LMS
6. **Later: Open creator marketplace**

---

## Support

For questions about revenue architecture:

- Email: support@elevateforhumanity.org
- Docs: /docs/REVENUE_ARCHITECTURE.md

---

**Last Updated**: December 2024
**Status**: Phase 1 & 2 in progress
**Next**: Complete checkout flows and test end-to-end
