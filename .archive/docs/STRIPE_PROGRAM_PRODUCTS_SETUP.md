# Stripe Program Products Setup

This document outlines the Stripe products that need to be created for each training program with pricing information.

## Programs with Pricing

### Healthcare Programs

#### 1. CNA (Certified Nursing Assistant)

- **Product Name:** CNA Training Program
- **Price:** $1,200
- **Payment Plan:** $200/month for 6 months
- **Funding Note:** "100% FREE with WIOA, WRG, or JRI funding. If funding is not available, self-pay option: $1,200 or $200/month for 6 months"
- **Metadata:**
  - program_slug: cna
  - duration: 4-6 weeks
  - etpl_approved: true
  - wrg_eligible: true
  - wioa_eligible: true

#### 2. Home Health Aide

- **Product Name:** Home Health Aide Training
- **Price:** $800
- **Payment Plan:** $133.33/month for 6 months
- **Funding Note:** "100% FREE with WIOA, WRG, or JRI funding. If funding is not available, self-pay option: $800 or $133.33/month for 6 months"
- **Metadata:**
  - program_slug: home-health-aide
  - duration: 2-4 weeks
  - etpl_approved: true
  - wrg_eligible: true

#### 3. Phlebotomy Technician

- **Product Name:** Phlebotomy Technician Training
- **Price:** $1,500
- **Payment Plan:** $250/month for 6 months
- **Funding Note:** "100% FREE with WIOA, WRG, or JRI funding. If funding is not available, self-pay option: $1,500 or $250/month for 6 months"
- **Metadata:**
  - program_slug: phlebotomy-technician
  - duration: 4-8 weeks
  - etpl_approved: true
  - wrg_eligible: true

### Skilled Trades Programs

#### 4. HVAC Technician

- **Product Name:** HVAC Technician Training
- **Price:** $5,000
- **Payment Plan:** $833.33/month for 6 months
- **Funding Note:** "100% FREE with WIOA or workforce funding. If funding is not available, self-pay option: $5,000 or $833.33/month for 6 months"
- **Metadata:**
  - program_slug: hvac-technician
  - duration: 16-24 weeks
  - etpl_approved: true
  - wioa_eligible: true

#### 5. CDL (Commercial Driver's License)

- **Product Name:** CDL Training Program
- **Price:** $4,500
- **Payment Plan:** $750/month for 6 months
- **Funding Note:** "100% FREE with WIOA or workforce funding. If funding is not available, self-pay option: $4,500 or $750/month for 6 months"
- **Metadata:**
  - program_slug: cdl
  - duration: 3-4 weeks
  - etpl_approved: true
  - wioa_eligible: true

#### 6. Building Maintenance Technician

- **Product Name:** Building Maintenance Technician Training
- **Price:** $3,500
- **Payment Plan:** $583.33/month for 6 months
- **Funding Note:** "100% FREE with WIOA or workforce funding. If funding is not available, self-pay option: $3,500 or $583.33/month for 6 months"
- **Metadata:**
  - program_slug: building-maintenance
  - duration: 12-16 weeks
  - etpl_approved: true
  - wioa_eligible: true

### Beauty & Wellness Programs

#### 7. Barber Apprenticeship

- **Product Name:** Barber Apprenticeship Program
- **Price:** $6,000
- **Payment Plan:** $1,000/month for 6 months
- **Funding Note:** "Earn while you learn through registered apprenticeship. If self-pay needed: $6,000 or $1,000/month for 6 months"
- **Metadata:**
  - program_slug: barber-apprenticeship
  - duration: 12 months
  - apprenticeship: true
  - rapids_approved: true

#### 8. Professional Esthetician

- **Product Name:** Professional Esthetician Training
- **Price:** $4,000
- **Payment Plan:** $666.67/month for 6 months
- **Funding Note:** "100% FREE with WIOA or WRG funding. If funding is not available, self-pay option: $4,000 or $666.67/month for 6 months"
- **Metadata:**
  - program_slug: professional-esthetician
  - duration: 8-12 weeks
  - etpl_approved: true
  - wrg_eligible: true

### Business & Finance Programs

#### 9. Tax Prep & Financial Services

- **Product Name:** Tax Preparation & Financial Services Training
- **Price:** $2,500
- **Payment Plan:** $416.67/month for 6 months
- **Funding Note:** "100% FREE with WIOA or WRG funding. If funding is not available, self-pay option: $2,500 or $416.67/month for 6 months"
- **Metadata:**
  - program_slug: tax-prep-financial-services
  - duration: 8-12 weeks
  - etpl_approved: true
  - wrg_eligible: true

### Workforce Readiness Programs

#### 10. Workforce Readiness

- **Product Name:** Workforce Readiness Training
- **Price:** $500
- **Payment Plan:** $83.33/month for 6 months
- **Funding Note:** "100% FREE with WIOA, WRG, or JRI funding. If funding is not available, self-pay option: $500 or $83.33/month for 6 months"
- **Metadata:**
  - program_slug: workforce-readiness
  - duration: 2-4 weeks
  - etpl_approved: true
  - wrg_eligible: true
  - jri_eligible: true

#### 11. Direct Support Professional

- **Product Name:** Direct Support Professional Training
- **Price:** $1,000
- **Payment Plan:** $166.67/month for 6 months
- **Funding Note:** "100% FREE with WIOA or WRG funding. If funding is not available, self-pay option: $1,000 or $166.67/month for 6 months"
- **Metadata:**
  - program_slug: direct-support-professional
  - duration: 4-6 weeks
  - etpl_approved: true
  - wrg_eligible: true

#### 12. Peer Recovery Coach

- **Product Name:** Peer Recovery Coach Training
- **Price:** $1,800
- **Payment Plan:** $300/month for 6 months
- **Funding Note:** "100% FREE with WIOA, WRG, or JRI funding. If funding is not available, self-pay option: $1,800 or $300/month for 6 months"
- **Metadata:**
  - program_slug: peer-recovery-coach
  - duration: 6-8 weeks
  - etpl_approved: true
  - wrg_eligible: true
  - jri_eligible: true

### Short Certification Programs

#### 13. CPR Certification

- **Product Name:** CPR Certification
- **Price:** $75
- **Payment Plan:** N/A (one-time payment)
- **Funding Note:** "May be included with other program enrollment"
- **Metadata:**
  - program_slug: cpr-certification
  - duration: 1 day
  - standalone: true

## Stripe Setup Instructions

### Step 1: Create Products in Stripe Dashboard

1. Log into Stripe Dashboard
2. Navigate to Products → Add Product
3. For each program above:
   - Enter Product Name
   - Add Description (copy from program data)
   - Add Metadata fields as listed
   - Create Price with one-time payment option
   - Create Price with recurring payment option (6 monthly installments)

### Step 2: Add Payment Links

For each product, create:

1. **One-time payment link** - Full price
2. **Payment plan link** - 6 monthly installments
3. **Funding inquiry link** - Redirects to funding application

### Step 3: Update Environment Variables

Add to `.env.local`:

```
STRIPE_PRODUCT_CNA=prod_xxxxx
STRIPE_PRICE_CNA_FULL=price_xxxxx
STRIPE_PRICE_CNA_PLAN=price_xxxxx

STRIPE_PRODUCT_HVAC=prod_xxxxx
STRIPE_PRICE_HVAC_FULL=price_xxxxx
STRIPE_PRICE_HVAC_PLAN=price_xxxxx

# ... repeat for all programs
```

### Step 4: Update Program Data

Update `app/data/programs.ts` to include:

- `price` field for each program
- `stripeProductId` field
- `stripePriceFullId` field
- `stripePricePlanId` field

### Step 5: Create Payment Flow

Update payment pages to:

1. Show funding options first (WIOA, WRG, JRI)
2. Show self-pay option if funding not available
3. Display monthly payment plan option
4. Include clear messaging about 6-month payment terms

## Funding Eligibility Messaging

### For ETPL/WRG Programs:

"This program is ETPL approved and eligible for 100% FREE funding through WIOA, WRG, or JRI. Most students pay nothing. If funding is not available in your area, self-pay options start at $[price] or $[monthly]/month for 6 months."

### For Apprenticeship Programs:

"This is a Registered Apprenticeship program. You earn while you learn with paid on-the-job training. No tuition required for qualified apprentices. Self-pay option available: $[price] or $[monthly]/month for 6 months."

### For All Programs:

"We help you apply for funding. Contact us to check your eligibility: (317) 123-4567 or apply@elevateforhumanity.org"

## Next Steps

1. Create all products in Stripe Dashboard
2. Test payment flows for each program
3. Update program pages with pricing information
4. Create funding application workflow
5. Train staff on funding eligibility determination
6. Set up automated funding inquiry routing
