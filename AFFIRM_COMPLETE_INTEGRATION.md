# Affirm Complete Integration Guide

## API Endpoints & Resources

### Affirm API
- **Base URL:** `https://api.affirm.com`
- **Checkout:** `https://api.affirm.com/api/v1/checkout`
- **Transactions:** `https://api.affirm.com/api/v1/transactions`

### Affirm JavaScript SDK
- **CDN:** `https://cdn1.affirm.com/js/v2/affirm.js`
- **Sandbox CDN:** `https://cdn1-sandbox.affirm.com/js/v2/affirm.js`

### Your Credentials
```bash
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=19LMXS807MPAI4C2
```

---

## Frontend Integration (Recommended)

### Step 1: Add Affirm.js to Your Page

```tsx
// app/enroll/page.tsx or layout.tsx

export default function EnrollPage() {
  useEffect(() => {
    // Load Affirm.js
    const script = document.createElement('script');
    script.src = 'https://cdn1.affirm.com/js/v2/affirm.js';
    script.async = true;
    document.head.appendChild(script);

    // Configure Affirm
    script.onload = () => {
      if (window.affirm) {
        window.affirm.ui.ready(() => {
          window.affirm.ui.refresh();
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      {/* Your enrollment form */}
    </div>
  );
}
```

### Step 2: Add Affirm Configuration

```tsx
// Add to <head> or use Script component
<script>
  _affirm_config = {
    public_api_key: "aGax1GLWFexjLyW7PCf23rfznLl6YGyI",
    script: "https://cdn1.affirm.com/js/v2/affirm.js"
  };
</script>
```

### Step 3: Create Affirm Payment Button

```tsx
// components/AffirmPaymentButton.tsx
'use client';

import { useState } from 'react';

export function AffirmPaymentButton({ 
  amount, 
  programName,
  programSlug,
  userEmail,
  userName 
}: {
  amount: number;
  programName: string;
  programSlug: string;
  userEmail: string;
  userName: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleAffirmPayment = async () => {
    setLoading(true);

    try {
      // Create checkout via your API
      const response = await fetch('/api/affirm/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          courseId: programSlug,
          courseName: programName,
          userEmail,
          userName,
        }),
      });

      const data = await response.json();

      if (data.checkout_token) {
        // Use Affirm.js to open checkout
        if (window.affirm && window.affirm.checkout) {
          window.affirm.checkout({
            checkout_token: data.checkout_token
          });
        } else {
          // Fallback: redirect to Affirm
          window.location.href = data.redirect_url;
        }
      } else {
        alert('Failed to create Affirm checkout');
      }
    } catch (error) {
      console.error('Affirm error:', error);
      alert('Payment error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAffirmPayment}
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
    >
      {loading ? 'Processing...' : (
        <>
          Pay with Affirm
          <span className="block text-sm">
            As low as ${Math.round(amount / 12)}/month
          </span>
        </>
      )}
    </button>
  );
}
```

### Step 4: Add TypeScript Definitions

```typescript
// types/affirm.d.ts
declare global {
  interface Window {
    affirm: {
      checkout: (options: { checkout_token: string }) => void;
      ui: {
        ready: (callback: () => void) => void;
        refresh: () => void;
      };
    };
    _affirm_config: {
      public_api_key: string;
      script: string;
    };
  }
}

export {};
```

---

## Backend API Routes (Already Implemented)

### 1. Create Checkout
**File:** `/app/api/affirm/checkout/route.ts`

**Endpoint:** `POST /api/affirm/checkout`

**Request:**
```json
{
  "amount": 4890,
  "courseId": "barber-apprenticeship",
  "courseName": "Barber Apprenticeship",
  "userEmail": "student@example.com",
  "userName": "John Doe"
}
```

**Response:**
```json
{
  "checkout_token": "ABC123XYZ",
  "redirect_url": "https://affirm.com/checkout/ABC123XYZ"
}
```

### 2. Handle Confirmation
**File:** `/app/payment/affirm/confirm/page.tsx`

**URL:** `/payment/affirm/confirm?checkout_token=ABC123`

**Actions:**
1. Authorize transaction
2. Create enrollment
3. Assign AI instructor
4. Show success message

---

## Complete Flow

```
1. Student visits enrollment page
   ↓
2. Clicks "Pay with Affirm" button
   ↓
3. Frontend calls: POST /api/affirm/checkout
   {
     amount: 4890,
     courseId: "barber-apprenticeship",
     courseName: "Barber Apprenticeship",
     userEmail: "student@example.com",
     userName: "John Doe"
   }
   ↓
4. Backend creates Affirm checkout:
   POST https://api.affirm.com/api/v1/checkout
   Authorization: Basic base64(public_key:private_key)
   ↓
5. Affirm returns:
   {
     checkout_token: "ABC123",
     redirect_url: "https://affirm.com/checkout/ABC123"
   }
   ↓
6. Frontend uses Affirm.js:
   affirm.checkout({ checkout_token: "ABC123" })
   OR redirects to redirect_url
   ↓
7. Student completes Affirm approval
   ↓
8. Affirm redirects back:
   /payment/affirm/confirm?checkout_token=ABC123
   ↓
9. Backend authorizes transaction:
   POST https://api.affirm.com/api/v1/transactions
   { checkout_token: "ABC123" }
   ↓
10. Create enrollment in database
   ↓
11. Assign AI instructor
   ↓
12. Show success page
```

---

## Update API Routes to Use Correct Endpoint

The routes are already using `https://api.affirm.com` but let me verify they're using v1:

```typescript
// app/api/affirm/checkout/route.ts
const AFFIRM_API_URL = 'https://api.affirm.com';

// In the POST function:
const response = await fetch(`${AFFIRM_API_URL}/api/v1/checkout`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${auth}`,
  },
  body: JSON.stringify(checkoutData),
});
```

---

## Test the Integration

### Option 1: Via Frontend (Recommended)

1. **Add Affirm button to enrollment page**
2. **Click button**
3. **Complete Affirm approval**
4. **Verify enrollment created**

### Option 2: Via API Test

```bash
# Test checkout creation
curl -X POST http://localhost:3000/api/affirm/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 4890,
    "courseId": "barber-apprenticeship",
    "courseName": "Barber Apprenticeship",
    "userEmail": "test@example.com",
    "userName": "Test Student"
  }'
```

**Expected Response:**
```json
{
  "checkout_token": "ABC123XYZ...",
  "redirect_url": "https://affirm.com/checkout/ABC123XYZ"
}
```

---

## Affirm Promotional Messaging

Add "As low as $X/month" messaging:

```tsx
// components/AffirmPromo.tsx
'use client';

import { useEffect } from 'react';

export function AffirmPromo({ amount }: { amount: number }) {
  useEffect(() => {
    if (window.affirm && window.affirm.ui) {
      window.affirm.ui.refresh();
    }
  }, [amount]);

  return (
    <p
      className="affirm-as-low-as"
      data-amount={amount * 100}
      data-affirm-type="logo"
      data-affirm-color="blue"
    >
      Or pay as low as <span className="affirm-ala-price"></span>/mo with{' '}
      <b>Affirm</b>
    </p>
  );
}
```

---

## Environment Variables

```bash
# .env.local
AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
AFFIRM_PRIVATE_KEY=19LMXS807MPAI4C2
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=aGax1GLWFexjLyW7PCf23rfznLl6YGyI
```

---

## Next Steps

1. ✅ **API Keys Configured** - Done
2. ⏳ **Add Affirm.js to Frontend** - Need to implement
3. ⏳ **Add Payment Button** - Need to implement
4. ⏳ **Test Complete Flow** - After frontend implementation
5. ⏳ **Go Live** - After testing

---

## Quick Implementation Checklist

- [ ] Add Affirm.js script to page
- [ ] Add Affirm configuration
- [ ] Create AffirmPaymentButton component
- [ ] Add button to enrollment page
- [ ] Test checkout creation
- [ ] Test approval flow
- [ ] Verify enrollment activation
- [ ] Test AI instructor assignment

---

**Status:** Backend Ready ✅ | Frontend Needs Implementation ⏳
**API Endpoint:** `https://api.affirm.com/api/v1/`
**SDK:** `https://cdn1.affirm.com/js/v2/affirm.js`
**Keys:** Configured ✅
