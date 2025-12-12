# 💳 Payment Testing Guide

## Complete End-to-End Payment Testing

### Test Stripe Payments

#### Test Card Numbers

```
# Success
4242 4242 4242 4242 - Visa (Success)
5555 5555 5555 4444 - Mastercard (Success)
3782 822463 10005 - American Express (Success)

# Declined
4000 0000 0000 0002 - Card declined
4000 0000 0000 9995 - Insufficient funds
4000 0000 0000 9987 - Lost card
4000 0000 0000 9979 - Stolen card

# 3D Secure
4000 0027 6000 3184 - Requires authentication
4000 0025 0000 3155 - Authentication required

# Use any future expiry date (e.g., 12/25)
# Use any 3-digit CVC (e.g., 123)
# Use any ZIP code (e.g., 12345)
```

#### Test Payment Flow

1. **Full Payment Test**
```bash
# Navigate to course
https://elevateforhumanity.org/programs/healthcare/cna

# Click "Enroll Now"
# Select "Pay in Full" (10% discount)
# Enter test card: 4242 4242 4242 4242
# Complete payment
# Verify enrollment confirmation
```

2. **Payment Plan Test**
```bash
# Navigate to course
https://elevateforhumanity.org/programs/business/accounting

# Click "Enroll Now"
# Select "Monthly Payment Plan"
# Choose 3, 6, or 12 months
# Enter test card: 4242 4242 4242 4242
# Complete payment
# Verify payment schedule
```

3. **Affirm Financing Test**
```bash
# Navigate to expensive course
https://elevateforhumanity.org/programs/technology/cybersecurity

# Click "Enroll Now"
# Select "Affirm Financing"
# Use Affirm test credentials:
  Email: test@affirm.com
  Phone: 555-555-5555
# Complete Affirm flow
# Verify enrollment
```

4. **PayPal Test**
```bash
# Navigate to any course
# Click "Enroll Now"
# Select "PayPal"
# Use PayPal Sandbox credentials:
  Email: sb-buyer@business.example.com
  Password: test1234
# Complete PayPal flow
# Verify enrollment
```

### Test Webhook Processing

#### Stripe Webhooks

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger checkout.session.completed
stripe trigger payment_intent.payment_failed
```

#### Verify Webhook Handling

1. Check Stripe Dashboard → Developers → Webhooks
2. View recent webhook deliveries
3. Verify all return 200 OK
4. Check database for updated records

### Test Payment Plans

#### Create Payment Plan

```sql
-- Check payment plan was created
SELECT * FROM payment_plans 
WHERE enrollment_id = 'your-enrollment-id';

-- Check installments were created
SELECT * FROM payment_installments 
WHERE payment_plan_id = 'your-plan-id'
ORDER BY installment_number;
```

#### Test Installment Processing

```bash
# Manually trigger installment payment
curl -X POST https://elevateforhumanity.org/api/payments/process-installment \
  -H "Content-Type: application/json" \
  -d '{
    "installment_id": "your-installment-id"
  }'
```

### Test Refunds

#### Full Refund

```bash
# Go to admin dashboard
https://elevateforhumanity.org/admin/payments

# Find payment
# Click "Refund"
# Select "Full Refund"
# Confirm

# Verify in Stripe Dashboard
# Verify enrollment status updated
```

#### Partial Refund

```bash
# Same as above but select "Partial Refund"
# Enter amount
# Confirm
# Verify refund processed
```

### Test Failed Payments

#### Simulate Failed Payment

```bash
# Use declined card: 4000 0000 0000 0002
# Attempt enrollment
# Verify error message shown
# Verify no enrollment created
# Verify no charge made
```

#### Test Payment Retry

```bash
# Create payment plan
# Wait for installment due date
# Use failed card for auto-payment
# Verify retry logic triggers
# Verify notification sent
```

### Test Payment Security

#### Test Rate Limiting

```bash
# Attempt 10 payments in 1 minute
# Should be rate limited after 5 attempts
# Verify 429 error returned
```

#### Test CSRF Protection

```bash
# Attempt payment without CSRF token
# Should return 403 Forbidden
```

#### Test Amount Validation

```bash
# Attempt to modify payment amount in browser
# Should be rejected by server validation
```

### Test Payment Notifications

#### Email Notifications

Test these emails are sent:

- [ ] Payment confirmation
- [ ] Payment receipt
- [ ] Payment failed
- [ ] Installment reminder (3 days before due)
- [ ] Installment overdue
- [ ] Refund processed

#### SMS Notifications (if enabled)

Test these SMS are sent:

- [ ] Payment confirmation
- [ ] Payment failed
- [ ] Installment reminder
- [ ] Installment overdue

### Test Payment Dashboard

#### Student Dashboard

```bash
# Login as student
# Go to /dashboard/payments

# Verify shows:
- [ ] Payment history
- [ ] Upcoming installments
- [ ] Payment methods
- [ ] Download receipts
```

#### Admin Dashboard

```bash
# Login as admin
# Go to /admin/payments

# Verify shows:
- [ ] All payments
- [ ] Filter by status
- [ ] Export to CSV
- [ ] Refund capability
- [ ] Payment analytics
```

### Test Edge Cases

#### Multiple Enrollments

```bash
# Enroll in 3 courses simultaneously
# Use different payment methods
# Verify all process correctly
# Verify no race conditions
```

#### Concurrent Payments

```bash
# Open 2 browser tabs
# Start payment in both
# Complete both simultaneously
# Verify both process correctly
```

#### Browser Back Button

```bash
# Start payment
# Click browser back button
# Verify payment not duplicated
# Verify can restart payment
```

#### Session Timeout

```bash
# Start payment
# Wait 30 minutes
# Complete payment
# Verify session handling
```

### Test Payment Methods Management

#### Add Payment Method

```bash
# Go to /dashboard/payment-methods
# Click "Add Payment Method"
# Enter card: 4242 4242 4242 4242
# Save
# Verify appears in list
```

#### Set Default Payment Method

```bash
# Go to payment methods
# Click "Set as Default" on a card
# Verify marked as default
# Verify used for next payment
```

#### Remove Payment Method

```bash
# Go to payment methods
# Click "Remove" on a card
# Confirm removal
# Verify removed from Stripe
# Verify removed from database
```

### Test Payment Analytics

#### Revenue Reports

```bash
# Go to /admin/analytics/revenue
# Verify shows:
- [ ] Total revenue
- [ ] Revenue by payment method
- [ ] Revenue by course
- [ ] Revenue trends
- [ ] Refund rate
```

#### Payment Success Rate

```bash
# Go to /admin/analytics/payments
# Verify shows:
- [ ] Success rate
- [ ] Failure reasons
- [ ] Average transaction value
- [ ] Payment method distribution
```

### Test Compliance

#### PCI Compliance

- [ ] No card numbers stored in database
- [ ] All payments use Stripe.js (client-side)
- [ ] No card data in logs
- [ ] SSL/TLS enabled
- [ ] Stripe Elements used for card input

#### GDPR Compliance

- [ ] Payment data can be exported
- [ ] Payment data can be deleted
- [ ] Privacy policy linked
- [ ] Terms of service linked
- [ ] Cookie consent obtained

### Automated Testing

#### Run Payment Tests

```bash
# Run all payment tests
npm run test:payments

# Run specific test
npm run test tests/payments/stripe.test.ts

# Run with coverage
npm run test:coverage
```

#### Expected Results

```
✓ Stripe payment succeeds
✓ PayPal payment succeeds
✓ Affirm payment succeeds
✓ Payment plan created correctly
✓ Installments scheduled correctly
✓ Failed payment handled correctly
✓ Refund processes correctly
✓ Webhooks handled correctly
✓ Rate limiting works
✓ Security validations pass

Total: 10/10 tests passing
```

### Production Checklist

Before going live:

- [ ] Switch to live Stripe keys
- [ ] Switch to live PayPal credentials
- [ ] Switch to live Affirm credentials
- [ ] Configure production webhooks
- [ ] Test with real $1 transaction
- [ ] Verify refund works
- [ ] Set up payment monitoring
- [ ] Configure payment alerts
- [ ] Review payment logs
- [ ] Test customer support flow

### Monitoring

#### Set Up Alerts

```bash
# Stripe Dashboard → Settings → Notifications
- Enable: Payment failed
- Enable: Dispute created
- Enable: Refund created
- Enable: Payout failed
```

#### Monitor Metrics

Track these daily:

- Payment success rate (target: >95%)
- Average transaction value
- Refund rate (target: <5%)
- Failed payment reasons
- Payment method distribution

### Troubleshooting

#### Payment Fails

1. Check Stripe Dashboard for error
2. Check webhook logs
3. Check database for enrollment
4. Check email logs
5. Contact Stripe support if needed

#### Webhook Not Received

1. Check Stripe Dashboard → Webhooks
2. Verify endpoint URL is correct
3. Verify webhook secret is correct
4. Check server logs
5. Test with Stripe CLI

#### Refund Fails

1. Check Stripe Dashboard
2. Verify payment is refundable
3. Check refund amount
4. Verify payment method still valid
5. Contact Stripe support

---

## Quick Test Script

Run this to test all payment methods:

```bash
#!/bin/bash

echo "🧪 Testing Payment System..."

# Test Stripe
echo "Testing Stripe..."
curl -X POST http://localhost:3000/api/payments/test-stripe

# Test PayPal
echo "Testing PayPal..."
curl -X POST http://localhost:3000/api/payments/test-paypal

# Test Affirm
echo "Testing Affirm..."
curl -X POST http://localhost:3000/api/payments/test-affirm

# Test Webhooks
echo "Testing Webhooks..."
stripe trigger payment_intent.succeeded

echo "✅ All tests complete!"
```

---

## Support

For payment issues:
- Stripe: https://support.stripe.com
- PayPal: https://www.paypal.com/us/smarthelp/contact-us
- Affirm: https://helpcenter.affirm.com

---

**Last Updated:** December 2024
**Status:** Ready for Testing ✅
