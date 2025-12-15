# Payment Setup - Complete Configuration

## Overview
Complete payment infrastructure for Elevate for Humanity with Stripe, Affirm, and partner course integration.

## Programs Configured

### Main Programs (9)
1. **Barber Apprenticeship** - $4,890
   - Vendor: Milady ($295)
   - EFH Revenue: $4,595
   
2. **Direct Support Professional (DSP)** - $4,325
   - No vendor cost
   - EFH Revenue: $4,325

3. **HVAC Technician** - $5,000
   - No vendor cost
   - EFH Revenue: $5,000

4. **CPR Certification** - $575
   - No vendor cost
   - EFH Revenue: $575

5. **Emergency Health & Safety Tech** - $4,950
   - No vendor cost
   - EFH Revenue: $4,950

6. **Professional Esthetician** - $4,575
   - No vendor cost
   - EFH Revenue: $4,575

7. **Peer Recovery Coach** - $4,750
   - No vendor cost
   - EFH Revenue: $4,750

8. **Tax Prep & Financial Services** - $4,950
   - No vendor cost
   - EFH Revenue: $4,950

9. **Business Startup & Marketing** - $4,550
   - No vendor cost
   - EFH Revenue: $4,550

### Micro Courses (Partner Programs)

Partner courses are standalone certifications with 40-60% markup over wholesale cost.

#### Certiport (59 courses)
- Microsoft Office Specialist (MOS)
- Adobe Certified Professional
- IC3 Digital Literacy
- IT Specialist Certifications
- Autodesk, Unity, QuickBooks
- **Markup**: 40% (1.4x)
- **Example**: MOS Excel $117 → $164 student price

#### HSI (18 courses)
- CPR/AED Certifications
- First Aid
- Bloodborne Pathogens
- Workplace Safety
- Food Safety
- **Markup**: 59% (1.59x)
- **Example**: Adult CPR $85 → $135 student price

#### JRI (13 courses)
- Medical Assistant
- Phlebotomy
- EKG/ECG
- Pharmacy Technician
- Medical Billing & Coding
- **Markup**: 50% (1.5x)
- **Example**: CCMA $150 → $225 student price

#### NRF RISE Up (12 courses)
- Customer Service
- Retail Operations
- Sales Training
- Management
- **Markup**: 30% (1.3x)
- **Example**: Customer Service $25 → $33 student price

#### CareerSafe (10 courses)
- OSHA 10-Hour
- OSHA 30-Hour
- Forklift Safety
- Specialized Safety
- **Markup**: 40% (1.4x)
- **Example**: OSHA 10 $25 → $35 student price

#### Milady (12 courses)
- RISE Certifications
- Professional Makeup
- Master Educator
- Nail Technology
- **Markup**: 60% (1.6x)
- **Example**: RISE Barbering $29.95 → $48 student price

#### National Drug Screening (6 courses)
- Drug Testing Certifications
- Workplace Drug Testing
- **Markup**: 50% (1.5x)
- **Example**: DOT Collector $75 → $113 student price

**Total Partner Courses**: 130+ micro courses

## Payment Methods

### 1. Stripe Checkout
- **Location**: `/api/create-checkout-session`
- **Features**:
  - Credit/Debit cards
  - Affirm (BNPL)
  - Payment plans (1, 3, 6 months)
- **Status**: ✅ Configured

### 2. Affirm (Buy Now, Pay Later)
- **API Endpoints**:
  - `/api/affirm/checkout` - Create checkout session
  - `/api/affirm/transactions` - Process transactions
- **Features**:
  - 0% APR financing
  - Instant approval
  - Monthly payments
- **Status**: ✅ Configured
- **Keys**: Set in `.env.local`

### 3. WIOA/WRG Funding
- **Process**: Students apply through Indiana Career Connect
- **Cost to Student**: $0
- **Payment to EFH**: Paid by workforce board
- **Status**: ✅ Active

## Stripe Product Setup

### Script Location
`/workspaces/fix2/scripts/setup-stripe-products.mjs`

### To Create Products
```bash
# 1. Get valid Stripe API key
# Go to: https://dashboard.stripe.com/test/apikeys

# 2. Update .env.local
STRIPE_SECRET_KEY=sk_test_...

# 3. Run script
node scripts/setup-stripe-products.mjs
```

### Products to Create
- 9 main programs with payment plans
- Each program gets:
  - Full payment price
  - 3-month plan (recurring)
  - 6-month plan (recurring)

## Payment Split System

### Configuration
**File**: `/workspaces/fix2/app/api/payments/split/route.ts`

### How It Works
1. Student pays full amount via Stripe/Affirm
2. System calculates split:
   - Vendor cost (if applicable)
   - EFH revenue (remainder)
3. Vendor payment processed automatically
4. Split recorded in `payment_splits` table

### Example: Barber Program
- Student pays: $4,890
- Milady cost: $295 (auto-enrolled)
- EFH receives: $4,595

### Database Table
```sql
CREATE TABLE payment_splits (
  id uuid PRIMARY KEY,
  enrollment_id uuid REFERENCES enrollments(id),
  total_amount numeric,
  vendor_name text,
  vendor_amount numeric,
  elevate_amount numeric,
  payment_method text,
  transaction_id text,
  vendor_paid_at timestamptz,
  vendor_payment_id text,
  created_at timestamptz DEFAULT now()
);
```

## Partner Course Integration

### Database Schema
```sql
CREATE TABLE partner_courses_catalog (
  id uuid PRIMARY KEY,
  provider_id uuid REFERENCES partner_lms_providers(id),
  course_name text NOT NULL,
  description text,
  category text,
  wholesale_price numeric,
  retail_price numeric,
  duration_hours numeric,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
```

### Import Script
**Location**: `/workspaces/fix2/scripts/scrape-all-partner-courses.ts`

**To Import All Partner Courses**:
```bash
ts-node scripts/scrape-all-partner-courses.ts
```

This imports 130+ courses from all 7 partners with automatic markup calculation.

## Enrollment Flow

### 1. Student Applies
- **Page**: `/apply`
- **Options**: 9 main programs + 4 micro course categories
- **Form**: Name, email, phone, program selection

### 2. Payment Selection
- **Stripe Checkout**: Credit card or Affirm
- **Payment Plans**: Full, 3-month, 6-month
- **WIOA**: Free (if eligible)

### 3. Payment Processing
- Stripe/Affirm processes payment
- Webhook triggers enrollment
- Payment split calculated
- Vendor payment processed (if applicable)

### 4. Enrollment Complete
- Student enrolled in program
- Vendor enrollment triggered (if applicable)
- Confirmation email sent
- Access granted to LMS

## API Endpoints

### Stripe
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Affirm
- `POST /api/affirm/checkout` - Create Affirm checkout
- `POST /api/affirm/transactions` - Process Affirm transactions
- `GET /payment/affirm/confirm` - Affirm confirmation page
- `GET /payment/affirm/cancel` - Affirm cancellation page

### Payment Splits
- `POST /api/payments/split` - Process payment split

### Partner Enrollment
- `POST /api/milady/auto-enroll` - Auto-enroll in Milady
- Similar endpoints for other partners

## Environment Variables Required

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Affirm
AFFIRM_PUBLIC_KEY=...
AFFIRM_PRIVATE_KEY=...
NEXT_PUBLIC_AFFIRM_PUBLIC_KEY=...

# Partner APIs
HSI_API_KEY=...
CERTIPORT_API_KEY=...
CAREERSAFE_API_KEY=...
MILADY_API_KEY=...
JRI_API_KEY=...
NRF_API_KEY=...
NDS_API_KEY=...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...

# Site
NEXT_PUBLIC_SITE_URL=https://elevateforhumanity.org
```

## Testing

### Test Stripe Checkout
```bash
# Use test card
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any 5 digits
```

### Test Affirm
```bash
# Use test credentials
Name: John Doe
Email: test@example.com
Phone: 555-555-5555
DOB: 01/01/1990
SSN Last 4: 1234
```

### Test Payment Split
```bash
# Run test script
node scripts/test-affirm-payment.mjs
```

## Next Steps

### 1. Create Stripe Products
- Get valid Stripe API key
- Run setup script
- Update price IDs in code

### 2. Import Partner Courses
- Run import script
- Verify courses in database
- Test partner enrollment

### 3. Test Complete Flow
- Apply for program
- Complete payment
- Verify enrollment
- Check payment split

### 4. Production Deployment
- Switch to live Stripe keys
- Update Affirm to production
- Configure partner production APIs
- Test with real payment

## Support

### Documentation
- Stripe: https://stripe.com/docs
- Affirm: https://docs.affirm.com
- Partner APIs: See individual partner documentation

### Contact
- Email: info@elevateforhumanity.org
- Phone: 317-314-3757

## Status Summary

✅ **Complete**:
- 9 main programs configured
- Payment config with vendor costs
- Affirm integration
- Payment split system
- Partner course catalog (130+ courses)
- Enrollment page updated
- API endpoints ready

⚠️ **Requires Action**:
- Create Stripe products (need valid API key)
- Import partner courses to database
- Test complete payment flow
- Switch to production keys

📋 **Optional**:
- Add more payment plans
- Configure additional partners
- Set up automated reporting
- Add payment analytics
