# Affirm Test Links

## 🧪 Test Page
**Direct Test Link**: `/test-affirm`

Full URL (when running locally):
```
http://localhost:3000/test-affirm
```

Full URL (production):
```
https://yourdomain.com/test-affirm
```

## 📍 Live Integration Pages

### Barber Apprenticeship Page
**Link**: `/programs/barber-apprenticeship`

Full URL:
```
http://localhost:3000/programs/barber-apprenticeship
```

Scroll down to the "Alternative: Self-Pay with Financing" section to see the Affirm button.

## 🎯 What's on the Test Page

### 1. Amount Selector
- Test different amounts ($1,000, $2,500, $5,000)
- See how payment plans change

### 2. Payment Plan Calculator
- Interactive widget showing all payment options
- Switch between Pay in 4, 6, 12, and 24 months
- Shows APR, interest, and total for each plan

### 3. Checkout Button
- Full Affirm checkout integration
- Click to test the complete flow
- Shows success/error messages

### 4. Package Information
- Your Premium Adaptive Checkout™ details
- Transaction fee calculator
- Shows exactly what you'll receive

### 5. Testing Instructions
- Step-by-step guide
- Sandbox testing notes

## 🔧 Quick Start

1. **Start the dev server**:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. **Visit the test page**:
   ```
   http://localhost:3000/test-affirm
   ```

3. **Click "Pay with Affirm"** button

4. **Test the flow**:
   - Affirm modal should open
   - Complete checkout (use test credentials)
   - Redirected to confirmation page

## 🎨 Features on Test Page

### Payment Calculator
- **Pay in 4**: $625 every 2 weeks (for $2,500)
- **6 months**: $416.67/month at 0% APR
- **12 months**: $208.33/month at 0% APR
- **24 months**: $104.17/month at 0% APR

### Your Revenue
For $2,500 transaction:
- **Fee**: $250.05 (9.99% + 30¢)
- **You Receive**: $2,249.95
- **Paid**: Immediately

## 📱 Mobile Testing

The test page is fully responsive. Test on:
- Desktop browsers
- Mobile browsers
- Tablet devices

## 🔐 Environment Setup

Make sure these are set in `.env.local`:

```bash
# Client-side (required)
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI

# Server-side (required for backend API)
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-affirm-private-key-here
```

## 🐛 Troubleshooting

### Button doesn't work
- Check browser console for errors
- Verify Affirm SDK loaded (should see "Affirm SDK loaded" in console)
- Check network tab for API calls

### Modal doesn't open
- Verify `NEXT_PUBLIC_AFFIRM_PUBLIC_KEY` is set
- Check if Affirm.js script loaded from CDN
- Look for JavaScript errors in console

### Backend errors
- Verify `AFFIRM_PRIVATE_KEY` is set in `.env.local`
- Check API route logs: `/api/affirm/checkout`
- Verify authentication is working

## 📊 Test Scenarios

### Scenario 1: Quick Test
1. Go to `/test-affirm`
2. Click "Pay with Affirm"
3. Verify modal opens

### Scenario 2: Different Amounts
1. Change amount to $1,000
2. See payment plans update
3. Test checkout with new amount

### Scenario 3: Full Flow
1. Click "Pay with Affirm"
2. Complete Affirm checkout
3. Verify redirect to `/payment/affirm/confirm`
4. Check transaction authorization
5. Verify redirect to success page

### Scenario 4: Cancellation
1. Click "Pay with Affirm"
2. Cancel in Affirm modal
3. Verify redirect to `/payment/affirm/cancel`
4. Check messaging and links

## 🚀 Production Testing

Before going live:
1. ✅ Test with sandbox credentials
2. ✅ Verify all payment plans display correctly
3. ✅ Test complete checkout flow
4. ✅ Test cancellation flow
5. ✅ Verify transaction authorization
6. ✅ Check email notifications (if configured)
7. ✅ Test on mobile devices
8. ✅ Switch to production API keys
9. ✅ Test with real (small) transaction
10. ✅ Monitor first few transactions

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Review API logs in `/api/affirm/`
3. Verify environment variables
4. Check Affirm dashboard for transaction status
5. Contact Affirm support if needed

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Test page loads without errors
- ✅ Payment calculator shows correct amounts
- ✅ "Pay with Affirm" button is enabled
- ✅ Clicking button opens Affirm modal
- ✅ Checkout completes successfully
- ✅ Redirect to confirmation page works
- ✅ Transaction appears in Affirm dashboard

---

**Ready to test?** Visit: `/test-affirm`
