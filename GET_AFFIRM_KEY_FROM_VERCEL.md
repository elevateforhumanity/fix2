# Get Affirm Private Key from Vercel

## Quick Steps

### Option 1: Via Vercel Dashboard (Fastest)

1. **Go to Vercel Dashboard**
   ```
   https://vercel.com/your-project/settings/environment-variables
   ```

2. **Find AFFIRM_PRIVATE_KEY**
   - Look for: `AFFIRM_PRIVATE_KEY`
   - Click the eye icon to reveal value
   - Copy the value

3. **Add to Local .env.local**
   ```bash
   # Open .env.local
   nano .env.local
   
   # Find this line:
   AFFIRM_PRIVATE_KEY=your-affirm-private-key-here
   
   # Replace with real value:
   AFFIRM_PRIVATE_KEY=paste-value-here
   
   # Save and exit (Ctrl+X, Y, Enter)
   ```

4. **Test Affirm Integration**
   ```bash
   npm run test:affirm
   ```

---

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Pull environment variables
vercel env pull .env.local --yes

# Test Affirm
npm run test:affirm
```

---

## Expected Test Output (Success)

```
🧪 Affirm Payment Test
=====================================

📋 Configuration:
   Supabase URL: https://your-project.supabase.co
   Affirm Public Key: aGax1GLWFexjLyW7PCf2...
   Site URL: http://localhost:3000

📝 Step 1: Create Affirm Checkout Session
-------------------------------------------
   Creating checkout session...
   Amount: $48.90
   Course: Barber Apprenticeship

✅ Checkout session created successfully!
   Checkout Token: ABC123XYZ...
   Redirect URL: https://sandbox.affirm.com/checkout/ABC123XYZ

📝 Step 2: Test Authorization (Simulated)
-------------------------------------------
   ⚠️  Authorization requires customer approval
   ⚠️  This is expected in test mode

📝 Step 3: Test Stripe + Affirm Integration
-------------------------------------------
✅ Stripe checkout session created!
   Checkout URL: https://checkout.stripe.com/...

📝 Step 4: Check Database Configuration
-------------------------------------------
✅ Program found in database
✅ Enrollments table accessible

=====================================
📊 Test Summary
=====================================

Direct Affirm Checkout:
   ✅ PASSED

Stripe + Affirm Integration:
   ✅ PASSED

Database Configuration:
   ✅ PASSED

🎉 All tests passed! Affirm integration is ready.
```

---

## If Test Still Fails

### Check Key Format

The Affirm private key should look like:
```
AFFIRM_PRIVATE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Not:**
```
AFFIRM_PRIVATE_KEY=your-affirm-private-key-here  ❌
AFFIRM_PRIVATE_KEY=""  ❌
AFFIRM_PRIVATE_KEY=  ❌
```

### Verify Both Keys Present

```bash
# Check both keys are set
grep "AFFIRM" .env.local

# Should show:
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=your-actual-key-here
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
```

### Test API Connection

```bash
# Quick test
curl -X POST https://sandbox.affirm.com/api/v2/checkout \
  -u "PUBLIC_KEY:PRIVATE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "merchant": {
      "user_confirmation_url": "https://example.com/confirm",
      "user_cancel_url": "https://example.com/cancel",
      "name": "Test"
    },
    "items": [{
      "display_name": "Test",
      "sku": "test",
      "unit_price": 100,
      "qty": 1
    }],
    "total": 100
  }'
```

**Success Response:**
```json
{
  "checkout_token": "ABC123...",
  "redirect_url": "https://sandbox.affirm.com/checkout/ABC123"
}
```

**Error Response:**
```json
{
  "status_code": 401,
  "type": "unauthorized"
}
```

---

## Quick Commands

```bash
# 1. Get key from Vercel
vercel env pull .env.local --yes

# 2. Verify key is present
grep AFFIRM_PRIVATE_KEY .env.local

# 3. Test Affirm
npm run test:affirm

# 4. If test passes, you're ready!
```

---

## What Happens After Test Passes

1. ✅ Affirm checkout works
2. ✅ Students can select Affirm financing
3. ✅ Payments process through Affirm
4. ✅ Enrollments activate automatically
5. ✅ AI instructor assigned

---

## Need Help?

**If key is in Vercel but test still fails:**

1. Check key is for **sandbox** environment
2. Verify key hasn't expired
3. Confirm Affirm merchant account is active
4. Check Affirm dashboard for any issues

**Affirm Dashboard:**
- Sandbox: https://sandbox-dashboard.affirm.com
- Production: https://dashboard.affirm.com

---

**Next Step:** Get the private key from Vercel and run `npm run test:affirm`
