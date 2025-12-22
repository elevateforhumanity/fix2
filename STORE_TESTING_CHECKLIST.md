# Store Checkout Testing Checklist

## Prerequisites

- [ ] Stripe account created
- [ ] Test API keys added to `.env.local`
- [ ] Products created in Stripe Dashboard (test mode)
- [ ] Price IDs updated in code
- [ ] Development server running

## Test Environment Setup

1. **Configure Test Keys**

   ```bash
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   STRIPE_SECRET_KEY=sk_test_...
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Access Store**
   - Navigate to `http://localhost:3000/store`

## Digital Products Checkout Flow

### Test 1: Browse Store

- [ ] Store page loads successfully
- [ ] All featured products display correctly
- [ ] Product cards show name, price, and features
- [ ] Category icons display properly

### Test 2: Product Selection

- [ ] Click on "Tax Business Toolkit" product
- [ ] Product details page loads (if exists)
- [ ] "Buy Now" or "Checkout" button is visible
- [ ] Price displays correctly ($49)

### Test 3: Checkout Page

- [ ] Navigate to `/store/checkout/tax-toolkit`
- [ ] Checkout page loads
- [ ] Order summary displays:
  - [ ] Product name
  - [ ] Price
  - [ ] Features list
- [ ] Payment form loads (Stripe Elements)
- [ ] Security badges display

### Test 4: Payment Form

- [ ] Card number field accepts input
- [ ] Expiry date field accepts input
- [ ] CVC field accepts input
- [ ] Form validation works
- [ ] Error messages display for invalid input

### Test 5: Test Payment (Success)

Use Stripe test card: `4242 4242 4242 4242`

- [ ] Enter test card number
- [ ] Enter future expiry date (e.g., 12/25)
- [ ] Enter any 3-digit CVC (e.g., 123)
- [ ] Click "Pay $49" button
- [ ] Processing indicator shows
- [ ] Redirects to success page

### Test 6: Success Page

- [ ] Success page loads at `/store/success?product=tax-toolkit`
- [ ] Success icon displays
- [ ] "Payment Successful" message shows
- [ ] Product name displays
- [ ] Email confirmation message shows
- [ ] Download button appears (for download products)
- [ ] "What's Included" section lists features
- [ ] "What Happens Next" instructions display
- [ ] Action buttons work (Browse More, Return Home)

### Test 7: Test Payment (Decline)

Use Stripe test card: `4000 0000 0000 0002`

- [ ] Enter declined test card
- [ ] Enter future expiry date
- [ ] Enter any CVC
- [ ] Click "Pay" button
- [ ] Error message displays
- [ ] User remains on checkout page
- [ ] Can retry with different card

### Test 8: Test Payment (3D Secure)

Use Stripe test card: `4000 0025 0000 3155`

- [ ] Enter 3D Secure test card
- [ ] 3D Secure modal appears
- [ ] Complete authentication
- [ ] Payment processes successfully
- [ ] Redirects to success page

## Platform License Checkout Flow

### Test 9: Core Platform License

- [ ] Navigate to store
- [ ] Select "EFH Core Platform" ($4,999)
- [ ] Checkout page loads
- [ ] Order summary shows correct price
- [ ] Payment form works
- [ ] Test payment succeeds
- [ ] Success page displays

### Test 10: Monthly Subscription

- [ ] Select "Monthly Subscription" ($499/month)
- [ ] Checkout indicates recurring billing
- [ ] Payment form works
- [ ] Test subscription payment succeeds
- [ ] Success page confirms subscription

## Error Handling

### Test 11: Missing Stripe Keys

- [ ] Remove Stripe keys from environment
- [ ] Restart server
- [ ] Navigate to checkout
- [ ] Error message displays: "Payment processing is not configured"

### Test 12: Invalid Product

- [ ] Navigate to `/store/checkout/invalid-product`
- [ ] Redirects to store page or shows error
- [ ] No crash or blank page

### Test 13: Network Errors

- [ ] Disconnect internet
- [ ] Attempt checkout
- [ ] Error message displays
- [ ] User can retry when connection restored

## Webhook Testing

### Test 14: Local Webhook Setup

- [ ] Install Stripe CLI
- [ ] Run `stripe listen --forward-to localhost:3000/api/store/webhook`
- [ ] Copy webhook signing secret
- [ ] Add to `.env.local`
- [ ] Complete test payment
- [ ] Webhook receives `payment_intent.succeeded` event
- [ ] Check server logs for webhook processing

### Test 15: Webhook Event Handling

- [ ] Payment success triggers webhook
- [ ] Webhook verifies signature
- [ ] Webhook processes event
- [ ] User receives confirmation email (if configured)
- [ ] Database updated (if applicable)

## Mobile Responsiveness

### Test 16: Mobile Checkout

- [ ] Open store on mobile device or emulator
- [ ] Store page displays correctly
- [ ] Product cards stack vertically
- [ ] Checkout page is mobile-friendly
- [ ] Payment form is usable on mobile
- [ ] Success page displays correctly

## Accessibility

### Test 17: Keyboard Navigation

- [ ] Tab through store page
- [ ] All interactive elements focusable
- [ ] Tab through checkout form
- [ ] Can complete purchase with keyboard only

### Test 18: Screen Reader

- [ ] Use screen reader (VoiceOver, NVDA, JAWS)
- [ ] Product information announced
- [ ] Form labels read correctly
- [ ] Error messages announced
- [ ] Success confirmation announced

## Performance

### Test 19: Page Load Times

- [ ] Store page loads in < 2 seconds
- [ ] Checkout page loads in < 2 seconds
- [ ] Payment form initializes quickly
- [ ] No layout shift during load

### Test 20: Stripe Elements Performance

- [ ] Payment form loads smoothly
- [ ] No lag when typing card number
- [ ] Validation is instant
- [ ] Submit button responds immediately

## Security

### Test 21: HTTPS Requirement

- [ ] Checkout requires HTTPS in production
- [ ] Payment form only loads on secure connection
- [ ] Stripe Elements enforces security

### Test 22: Client-Side Validation

- [ ] Card number validated before submission
- [ ] Expiry date validated
- [ ] CVC validated
- [ ] Cannot submit with invalid data

### Test 23: Server-Side Validation

- [ ] Server validates payment amount
- [ ] Server validates product exists
- [ ] Server prevents price manipulation
- [ ] Server verifies webhook signatures

## Edge Cases

### Test 24: Concurrent Purchases

- [ ] Open two checkout sessions
- [ ] Complete both purchases
- [ ] Both succeed independently
- [ ] No conflicts or errors

### Test 25: Abandoned Checkout

- [ ] Start checkout
- [ ] Close browser
- [ ] Return later
- [ ] Can start new checkout
- [ ] No orphaned payment intents

### Test 26: Duplicate Submissions

- [ ] Submit payment
- [ ] Quickly click submit again
- [ ] Only one payment processes
- [ ] No duplicate charges

## Production Readiness

### Test 27: Live Mode Preparation

- [ ] Switch to live Stripe keys
- [ ] Test with real payment method
- [ ] Verify webhook endpoint is accessible
- [ ] Confirm email notifications work
- [ ] Check Stripe Dashboard for payment

### Test 28: Error Monitoring

- [ ] Sentry or error tracking configured
- [ ] Payment errors logged
- [ ] Webhook failures logged
- [ ] Alerts set up for critical errors

### Test 29: Customer Support

- [ ] Support email displays on success page
- [ ] Support phone number displays
- [ ] Contact information is correct
- [ ] Support team can access payment records

### Test 30: Compliance

- [ ] Privacy policy linked
- [ ] Terms of service linked
- [ ] Refund policy documented
- [ ] Tax handling configured (if applicable)

## Test Results

| Test                            | Status     | Notes |
| ------------------------------- | ---------- | ----- |
| 1. Browse Store                 | ⏳ Pending |       |
| 2. Product Selection            | ⏳ Pending |       |
| 3. Checkout Page                | ⏳ Pending |       |
| 4. Payment Form                 | ⏳ Pending |       |
| 5. Test Payment (Success)       | ⏳ Pending |       |
| 6. Success Page                 | ⏳ Pending |       |
| 7. Test Payment (Decline)       | ⏳ Pending |       |
| 8. Test Payment (3D Secure)     | ⏳ Pending |       |
| 9. Core Platform License        | ⏳ Pending |       |
| 10. Monthly Subscription        | ⏳ Pending |       |
| 11. Missing Stripe Keys         | ⏳ Pending |       |
| 12. Invalid Product             | ⏳ Pending |       |
| 13. Network Errors              | ⏳ Pending |       |
| 14. Local Webhook Setup         | ⏳ Pending |       |
| 15. Webhook Event Handling      | ⏳ Pending |       |
| 16. Mobile Checkout             | ⏳ Pending |       |
| 17. Keyboard Navigation         | ⏳ Pending |       |
| 18. Screen Reader               | ⏳ Pending |       |
| 19. Page Load Times             | ⏳ Pending |       |
| 20. Stripe Elements Performance | ⏳ Pending |       |
| 21. HTTPS Requirement           | ⏳ Pending |       |
| 22. Client-Side Validation      | ⏳ Pending |       |
| 23. Server-Side Validation      | ⏳ Pending |       |
| 24. Concurrent Purchases        | ⏳ Pending |       |
| 25. Abandoned Checkout          | ⏳ Pending |       |
| 26. Duplicate Submissions       | ⏳ Pending |       |
| 27. Live Mode Preparation       | ⏳ Pending |       |
| 28. Error Monitoring            | ⏳ Pending |       |
| 29. Customer Support            | ⏳ Pending |       |
| 30. Compliance                  | ⏳ Pending |       |

## Notes

- Use Stripe test mode for all testing
- Document any bugs or issues found
- Update this checklist as new features are added
- Retest after any checkout-related code changes
