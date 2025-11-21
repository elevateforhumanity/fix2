# Stripe Split Payouts - Revenue Sharing System

Automated revenue sharing for Elevate for Humanity using Stripe Connect.

## Revenue Split Model

**IMPORTANT:** Split payouts only apply to **self-pay programs**.

**Government-Funded Programs (WIOA, WRG, OJT):**

- FREE to students
- EFH receives 100% of government reimbursement
- No split payout (instructors paid separately via salary/contract)

**Self-Pay Programs:**

- Students pay tuition directly
- 50/50 split between EFH and Partners

Every self-pay program payment is automatically split:

| Recipient                | Percentage                 | Purpose                                   |
| ------------------------ | -------------------------- | ----------------------------------------- |
| **Elevate for Humanity** | 50%                        | Operations, facilities, staff, technology |
| **Partners (Total)**     | 50%                        | Instructors + Selfish Inc Foundation      |
| ↳ Instructor             | 40% (80% of partner share) | Teaching fees, curriculum development     |
| ↳ Selfish Inc Foundation | 10% (20% of partner share) | Scholarships, emergency assistance        |

### Example: $1,000 Program Payment

- **EFH:** $500 (50% - operations, technology, facilities)
- **Partners:** $500 (50% total)
  - **Instructor:** $400 (80% of partner share)
  - **Selfish Inc:** $100 (20% of partner share)

### Program Pricing Model

Programs have **50% markup** for profit:

**Example: Tax Business Program**

- **Cost:** $2,000 (instruction, materials, facilities)
- **Markup:** $1,000 (50% profit margin)
- **Price:** $3,000 (student pays)

**Revenue Split on $3,000:**

- **EFH:** $1,500 (covers $2,000 cost + contributes to overhead)
- **Instructor:** $1,200 (teaching fees)
- **Selfish Inc:** $300 (scholarships)

## Architecture

### Stripe Connect

Uses **Stripe Connect Express** accounts for instructors and Selfish Inc:

1. **Platform Account (EFH):** Main Stripe account that receives all payments
2. **Connected Accounts:** Instructor and Selfish Inc accounts that receive transfers
3. **Automatic Transfers:** Triggered by webhook after successful payment

### Flow

```
Student Payment ($1,000)
    ↓
Platform Account (EFH)
    ↓
Webhook: checkout.session.completed
    ↓
Split Payout Function
    ├─→ Transfer $400 to Instructor Account (40%)
    ├─→ Transfer $100 to Selfish Inc Account (10%)
    └─→ Retain $500 (EFH - 50%)
```

## Setup

### 1. Enable Stripe Connect

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Navigate to **Connect** → **Settings**
3. Enable **Express** accounts
4. Set branding (logo, colors)
5. Configure payout schedule (daily, weekly, monthly)

### 2. Create Selfish Inc Connected Account

```bash
# Using Stripe CLI
stripe accounts create \
  --type=express \
  --email=finance@selfishinc.org \
  --capabilities[transfers][requested]=true \
  --business_type=company \
  --company[name]="Selfish Inc Foundation" \
  --company[tax_id]=XX-XXXXXXX

# Save the account ID
export STRIPE_SELFISH_INC_ACCOUNT_ID="acct_xxxxxxxxxxxxx"
```

Or use the Stripe Dashboard:

1. Go to **Connect** → **Accounts**
2. Click **+ New account**
3. Select **Express**
4. Enter Selfish Inc details
5. Complete onboarding
6. Copy account ID

### 3. Configure Environment Variables

Add to Netlify Dashboard → Site settings → Environment variables:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_live_your_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret

# Stripe Connect
STRIPE_SELFISH_INC_ACCOUNT_ID=acct_xxxxxxxxxxxxx

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key

# Frontend
FRONTEND_URL=https://elevateforhumanity.org
```

### 4. Run Database Migration

```bash
# Using Supabase CLI
supabase db push

# Or manually in Supabase Dashboard
# Run: supabase/migrations/20250127_create_stripe_split_tables.sql
```

### 5. Configure Webhook

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **+ Add endpoint**
3. Endpoint URL: `https://elevateforhumanity.org/.netlify/functions/stripe-webhook
4. Select events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `account.updated`
5. Click **Add endpoint**
6. Copy **Signing secret** to `STRIPE_WEBHOOK_SECRET`

## Usage

### Instructor Onboarding

**1. Create Instructor Record**

```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/stripe-connect-onboarding \
  -H "Content-Type: application/json" \
  -d '{
    "instructor_id": "uuid-here",
    "email": "instructor@example.com",
    "return_url": "https://elevateforhumanity.org/instructor/dashboard",
    "refresh_url": "https://elevateforhumanity.org/instructor/connect/refresh"
  }'
```

**Response:**

```json
{
  "success": true,
  "account_id": "acct_xxxxxxxxxxxxx",
  "onboarding_url": "https://connect.stripe.com/setup/...",
  "message": "Stripe Connect onboarding link created"
}
```

**2. Redirect Instructor to Onboarding URL**

The instructor completes:

- Identity verification
- Bank account details
- Tax information (W-9)
- Terms of service

**3. Verify Account Status**

After onboarding, Stripe sends `account.updated` webhook.
Check `instructors` table for `stripe_account_status = 'active'`.

### Automatic Split Payouts

Split payouts are **automatically triggered** when a payment succeeds:

1. Student completes checkout
2. Stripe sends `checkout.session.completed` webhook
3. Webhook handler calls `stripe-split-payout` function
4. Transfers are created to connected accounts
5. Payout is logged in `split_payouts` table

### Manual Split Payout

For manual or retroactive payouts:

```bash
curl -X POST https://elevateforhumanity.org/.netlify/functions/stripe-split-payout \
  -H "Content-Type: application/json" \
  -d '{
    "payment_intent_id": "pi_xxxxxxxxxxxxx",
    "amount": 100000,
    "program_id": "tax-business",
    "instructor_id": "uuid-here"
  }'
```

## Monitoring

### View Payouts

**Supabase Dashboard:**

```sql
SELECT
  sp.*,
  i.first_name || ' ' || i.last_name as instructor_name,
  i.email as instructor_email
FROM split_payouts sp
LEFT JOIN instructors i ON sp.instructor_id = i.id
ORDER BY sp.created_at DESC
LIMIT 100;
```

**Stripe Dashboard:**

1. Go to **Connect** → **Transfers**
2. Filter by date, account, or amount
3. View transfer details and status

### Payout Statistics

```sql
-- Total payouts by recipient
SELECT
  SUM(efh_amount) / 100.0 as efh_total,
  SUM(instructor_amount) / 100.0 as instructor_total,
  SUM(selfish_inc_amount) / 100.0 as selfish_inc_total,
  SUM(platform_amount) / 100.0 as platform_total,
  SUM(total_amount) / 100.0 as grand_total
FROM split_payouts
WHERE created_at >= NOW() - INTERVAL '30 days';

-- Payouts by instructor
SELECT
  i.first_name || ' ' || i.last_name as instructor,
  COUNT(*) as payout_count,
  SUM(sp.instructor_amount) / 100.0 as total_earned
FROM split_payouts sp
JOIN instructors i ON sp.instructor_id = i.id
WHERE sp.created_at >= NOW() - INTERVAL '30 days'
GROUP BY i.id, i.first_name, i.last_name
ORDER BY total_earned DESC;
```

## Customization

### Adjust Split Percentages

**Per-Instructor Custom Split:**

The `payout_percentage` field represents the instructor's share of the **partner portion** (50% of total).

```sql
-- Give instructor 90% of partner share (45% of total) instead of 80% (40% of total)
UPDATE instructors
SET payout_percentage = 90.00
WHERE email = 'instructor@example.com';
```

This would result in:

- EFH: 50% ($500)
- Instructor: 45% ($450) - 90% of $500 partner share
- Selfish Inc: 5% ($50) - 10% of $500 partner share

**Global Split Change:**

Edit `netlify/functions/stripe-split-payout.js`:

```javascript
// Change partner share distribution
const instructorPercentage = instructor?.payout_percentage || 70; // 70% of partner share = 35% of total
const selfishIncPercentage = 30; // 30% of partner share = 15% of total
```

### Add Additional Recipients

To add more recipients (e.g., referral partners):

1. Add connected account ID to env vars
2. Update split calculation in `stripe-split-payout.js`
3. Create transfer to new account
4. Update database schema to track new split

## Tax Reporting

### 1099 Generation

Stripe automatically generates 1099-K forms for instructors earning >$600/year.

**Enable in Stripe Dashboard:**

1. Go to **Connect** → **Settings**
2. Enable **Tax reporting**
3. Set threshold: $600
4. Stripe will collect W-9 during onboarding

### Payout Reports

Generate annual payout reports for tax purposes:

```sql
-- Annual instructor payouts
SELECT
  i.first_name || ' ' || i.last_name as instructor,
  i.email,
  i.stripe_account_id,
  COUNT(*) as payment_count,
  SUM(sp.instructor_amount) / 100.0 as total_earned,
  EXTRACT(YEAR FROM sp.created_at) as year
FROM split_payouts sp
JOIN instructors i ON sp.instructor_id = i.id
WHERE EXTRACT(YEAR FROM sp.created_at) = 2025
GROUP BY i.id, i.first_name, i.last_name, i.email, i.stripe_account_id, EXTRACT(YEAR FROM sp.created_at)
ORDER BY total_earned DESC;
```

## Troubleshooting

### Transfer Failed

**Error:** "No such destination"

**Solution:**

- Verify instructor has completed Stripe Connect onboarding
- Check `stripe_account_id` is correct in database
- Ensure account status is `active`

**Error:** "Insufficient funds"

**Solution:**

- Ensure payment has settled (usually 2-3 days)
- Check platform account balance in Stripe Dashboard
- Adjust payout schedule if needed

### Payout Not Triggered

**Check:**

1. Webhook is configured correctly
2. Webhook secret matches env var
3. Netlify function logs for errors
4. Supabase `activity_log` for webhook events

**Manual Trigger:**

```bash
# Manually trigger split payout
curl -X POST https://elevateforhumanity.org/.netlify/functions/stripe-split-payout \
  -H "Content-Type: application/json" \
  -d '{
    "payment_intent_id": "pi_xxxxxxxxxxxxx",
    "amount": 100000,
    "program_id": "tax-business",
    "instructor_id": "uuid-here"
  }'
```

### Instructor Can't Complete Onboarding

**Common Issues:**

- Invalid SSN/EIN
- Bank account verification failed
- Identity verification failed

**Solution:**

1. Check Stripe Dashboard → Connect → Accounts
2. View account details and requirements
3. Generate new onboarding link
4. Contact Stripe support if needed

## Security

### Best Practices

1. **Never expose secret keys** in frontend code
2. **Verify webhook signatures** (already implemented)
3. **Use HTTPS** for all endpoints
4. **Validate amounts** before creating transfers
5. **Log all transactions** for audit trail
6. **Monitor for fraud** using Stripe Radar

### Fraud Prevention

Stripe Radar is automatically enabled:

- Machine learning fraud detection
- 3D Secure for high-risk payments
- Velocity checks
- IP/email/card blocking

## Compliance

### PCI Compliance

Stripe handles PCI compliance:

- No card data touches your servers
- Stripe Checkout is PCI Level 1 certified
- Automatic security updates

### Financial Regulations

- **Money Transmitter License:** Not required (Stripe is licensed)
- **1099 Reporting:** Automatic via Stripe
- **State Tax:** Instructors responsible for own taxes
- **Nonprofit Compliance:** Selfish Inc must maintain 501(c)(3) status

## Resources

- [Stripe Connect Documentation](https://stripe.com/docs/connect)
- [Stripe Transfers API](https://stripe.com/docs/connect/charges-transfers)
- [Stripe Tax Reporting](https://stripe.com/docs/connect/taxes)
- [Stripe Radar](https://stripe.com/docs/radar)

## Support

For issues:

1. Check Netlify function logs
2. Review Stripe Dashboard events
3. Query Supabase `activity_log` table
4. Contact Stripe support (24/7)

---

**Revenue sharing is now automated! Instructors and Selfish Inc receive payouts automatically after each successful payment. 🎉**
