# Custom Card Printing & Loading Guide

## Overview
You can order **blank prepaid cards** from a card manufacturer, have them printed with your branding, and load them with funds yourself. This gives you more control and higher profit margins than using a full-service processor.

---

## Two-Part System

### Part 1: Card Manufacturing (Physical Cards)
Order physical cards from a card printer

### Part 2: Card Processing (Loading & Transactions)
Partner with a processor to activate and load the cards

---

## Option 1: Print + Load with Processor (RECOMMENDED)

### How It Works
1. **Order printed cards** from a card manufacturer
2. **Partner with processor** who provides the BIN and processing
3. **Processor activates** your printed cards
4. **You load funds** through processor's API
5. **You keep more profit** (no processor markup on cards)

### Card Manufacturers (Printing Only)

#### 1. **CPI Card Group**
- **Website**: https://www.cpicardgroup.com
- **Minimum Order**: 500-1,000 cards
- **Cost**: $0.50-1.50 per card
- **Features**:
  - Full custom design
  - Embossing, magnetic stripe, chip
  - Your logo, colors, branding
  - Ships in 2-3 weeks
- **What They Provide**: Physical cards only (no processing)

#### 2. **Valid USA**
- **Website**: https://www.validusa.com
- **Minimum Order**: 250-500 cards
- **Cost**: $0.75-2.00 per card
- **Features**:
  - Custom printing
  - EMV chip cards
  - Contactless (tap-to-pay)
  - Fast turnaround (1-2 weeks)
- **What They Provide**: Physical cards only

#### 3. **Plastek Cards**
- **Website**: https://www.plastekcard.com
- **Minimum Order**: 100-250 cards
- **Cost**: $1.00-2.50 per card
- **Features**:
  - Small batch printing
  - Full customization
  - Quick turnaround
- **What They Provide**: Physical cards only

#### 4. **CardWorks**
- **Website**: https://www.cardworks.com
- **Minimum Order**: 500 cards
- **Cost**: $0.60-1.80 per card
- **Features**:
  - High-quality printing
  - Security features
  - Bulk discounts
- **What They Provide**: Physical cards only

### Processing Partners (Activate & Load Your Cards)

#### 1. **Marqeta** (Best for Custom Cards)
- **Website**: https://www.marqeta.com
- **How It Works**:
  1. You order printed cards from CPI/Valid
  2. Marqeta provides BIN number for printing
  3. You send card numbers to Marqeta
  4. Marqeta activates cards in their system
  5. You load funds via API
- **Cost**:
  - Setup: $5,000-10,000
  - Monthly platform: $500-1,000
  - Per card activation: $0.50-1.00
  - Transaction fees: $0.10-0.25
- **Your Savings**: $1-2 per card (vs buying from them)

#### 2. **Galileo**
- **Website**: https://www.galileo-ft.com
- **How It Works**: Same as Marqeta
- **Cost**:
  - Setup: $3,000-7,000
  - Monthly platform: $300-800
  - Per card activation: $0.40-0.80
  - Transaction fees: $0.08-0.20
- **Your Savings**: $1-1.50 per card

#### 3. **i2c Inc.**
- **Website**: https://www.i2cinc.com
- **How It Works**: Same as above
- **Cost**:
  - Setup: $2,000-5,000
  - Monthly platform: $400-700
  - Per card activation: $0.30-0.70
  - Transaction fees: $0.08-0.18
- **Your Savings**: $1-2 per card

### Complete Process

#### Step 1: Partner with Processor (Week 1-4)
```
1. Contact Marqeta/Galileo/i2c
2. Explain: "I want to print my own cards"
3. They provide:
   - BIN number (for printing)
   - Card number ranges
   - API access
   - Activation system
4. Sign agreement
```

#### Step 2: Design Your Card (Week 2-3)
```
1. Create card design:
   - Front: Logo, cardholder name, card number, expiry
   - Back: Magnetic stripe, signature panel, CVV, support number
2. Include processor's BIN number
3. Get processor approval
4. Finalize artwork
```

#### Step 3: Order Cards (Week 3-4)
```
1. Contact CPI Card Group or Valid USA
2. Provide:
   - Card design artwork
   - BIN number from processor
   - Card number ranges
   - Quantity (500-1,000 minimum)
3. Pay for printing ($500-1,500 for 1,000 cards)
4. Wait 2-3 weeks for delivery
```

#### Step 4: Activate Cards (Week 5+)
```
1. Receive printed cards
2. Upload card numbers to processor system
3. Cards are now "active" but zero balance
4. Ready to issue to customers
```

#### Step 5: Issue & Load Cards (Ongoing)
```
1. Give card to customer
2. Customer activates via phone/app
3. You load funds via API
4. Customer can use immediately
```

---

## Option 2: Full DIY with Gift Card System (CHEAPEST)

### How It Works
Use a **gift card processor** instead of a bank processor. Much cheaper but more limited.

### Gift Card Processors

#### 1. **Blackhawk Network**
- **Website**: https://www.blackhawknetwork.com
- **How It Works**:
  - They provide BIN and processing
  - You order printed cards
  - They activate and load
  - Works like a gift card
- **Cost**:
  - Setup: $1,000-3,000
  - Per card: $0.50-1.00
  - Load fee: $0.25-0.50
  - Transaction fee: $0.05-0.15
- **Limitations**:
  - May not work at all merchants
  - No ATM access
  - Limited to US
  - Seen as "gift card" not "debit card"

#### 2. **InComm Payments**
- **Website**: https://www.incomm.com
- **Similar to Blackhawk**
- **Cost**: Slightly cheaper
- **Same limitations**

#### 3. **Stored Value Solutions (SVS)**
- **Website**: https://www.svs.com
- **Best for**: Small programs (100-500 cards)
- **Cost**:
  - Setup: $500-2,000
  - Per card: $0.75-1.50
  - Very low transaction fees
- **Limitations**: Same as above

### When to Use Gift Card System
- ✅ Small pilot (100-500 cards)
- ✅ Limited budget ($2,000-5,000)
- ✅ Don't need ATM access
- ✅ Only need POS purchases
- ❌ Not for payroll (seen as gift card)
- ❌ Not for large scale

---

## Option 3: White-Label Card Program (EASIEST)

### How It Works
Partner with a company that handles everything but puts your branding on the cards.

### White-Label Providers

#### 1. **Payfare**
- **Website**: https://www.payfare.com
- **What They Do**:
  - Print cards with your logo
  - Handle all processing
  - Provide cardholder app
  - Customer support
  - Compliance
- **Cost**:
  - Setup: $0-2,000
  - Per card: $2-4 (includes everything)
  - Revenue share: You keep 40-60% of fees
- **Best For**: Want to launch fast, don't want to manage tech

#### 2. **Branch**
- **Website**: https://www.branchapp.com
- **Similar to Payfare**
- **Cost**: Slightly higher but better app
- **Revenue share**: 30-50% to you

#### 3. **DailyPay**
- **Website**: https://www.dailypay.com
- **Focus**: Earned wage access + payroll cards
- **Cost**: Higher but full-service
- **Revenue share**: 25-40% to you

---

## Cost Comparison (1,000 Cards)

### Option 1: Print Your Own + Processor
**Upfront**:
- Card printing: $1,000 (1,000 cards × $1)
- Processor setup: $5,000
- Legal/compliance: $2,000
- **Total**: $8,000

**Monthly**:
- Platform fee: $500
- Customer support: $500
- **Total**: $1,000/month

**Per Transaction**:
- Load: $0.15
- Purchase: $0.10
- ATM: $0.20

**Your Revenue** (1,000 cards):
- Monthly fees: $4,950
- Load fees: $2,250
- ATM fees: $3,750
- **Total**: $10,950/month
- **Costs**: $1,000/month
- **Profit**: $9,950/month (91% margin!)

### Option 2: Gift Card System
**Upfront**:
- Card printing: $750
- Processor setup: $1,500
- **Total**: $2,250

**Monthly**:
- Platform fee: $200
- **Total**: $200/month

**Per Transaction**:
- Load: $0.25
- Purchase: $0.10

**Your Revenue** (1,000 cards):
- Monthly fees: $4,950
- Load fees: $2,250
- **Total**: $7,200/month (no ATM)
- **Costs**: $200/month
- **Profit**: $7,000/month (97% margin!)

**Limitations**: No ATM, limited acceptance

### Option 3: White-Label
**Upfront**:
- Setup: $1,000
- **Total**: $1,000

**Monthly**:
- No platform fees
- **Total**: $0

**Your Revenue** (1,000 cards):
- Revenue share: 50% of $10,950 = $5,475/month
- **Costs**: $0
- **Profit**: $5,475/month

**Trade-off**: Less profit but zero hassle

---

## Recommended Path for You

### Phase 1: Start with White-Label (Month 1-3)
**Why**: Test the market with zero risk
1. Partner with Payfare or Branch
2. Issue 100-200 cards
3. Learn what customers want
4. Earn $500-1,000/month
5. Validate the business model

**Investment**: $1,000
**Time to Launch**: 2-4 weeks
**Risk**: Very low

### Phase 2: Switch to Print Your Own (Month 4-12)
**Why**: Once proven, maximize profit
1. Partner with Marqeta or Galileo
2. Order 1,000 printed cards from CPI
3. Migrate customers to your cards
4. Earn $9,000-10,000/month
5. Scale to 5,000+ cards

**Investment**: $8,000-10,000
**Time to Launch**: 8-12 weeks
**Risk**: Medium (but validated)

### Phase 3: Scale (Year 2+)
**Why**: Maximize profit at scale
1. Order 10,000+ cards (bulk discount)
2. Negotiate better processor rates
3. Add premium features
4. Earn $50,000-100,000/month

---

## Detailed Steps: Print Your Own Cards

### Step 1: Choose Processor (Week 1-2)
```
Contact 3 processors:
1. Marqeta - sales@marqeta.com
2. Galileo - info@galileo-ft.com
3. i2c - sales@i2cinc.com

Ask for:
- "BYO card" pricing (Bring Your Own)
- BIN number for printing
- Card number ranges
- API documentation
- Contract terms
```

### Step 2: Design Card (Week 2-3)
```
Hire designer or use template:
- Front: Logo, name, number, expiry, chip
- Back: Stripe, CVV, signature, support #
- Include processor's BIN
- Follow ISO 7810 standard (credit card size)
- Get processor approval
```

### Step 3: Order Cards (Week 3-4)
```
Contact CPI Card Group:
1. Request quote for 1,000 cards
2. Provide artwork
3. Specify:
   - EMV chip (required)
   - Magnetic stripe (required)
   - Contactless (optional, +$0.50/card)
   - Card material (PVC standard)
4. Pay 50% deposit
5. Wait 2-3 weeks for production
```

### Step 4: Receive & Activate (Week 5-6)
```
1. Cards arrive in boxes of 100
2. Each card has unique number
3. Upload card numbers to processor
4. Processor activates in system
5. Cards ready to issue
```

### Step 5: Issue to Customers (Week 6+)
```
1. Customer applies online
2. You approve application
3. Mail card to customer (or hand deliver)
4. Customer activates via phone/app
5. You load initial funds
6. Customer can use immediately
```

---

## Card Design Requirements

### Front of Card
```
Required Elements:
- Card network logo (Visa/Mastercard)
- Your company logo
- Cardholder name (embossed or printed)
- 16-digit card number
- Expiration date (MM/YY)
- EMV chip
- Contactless symbol (if enabled)

Optional:
- Card program name
- Customer service number
```

### Back of Card
```
Required Elements:
- Magnetic stripe
- Signature panel
- CVV/CVC code (3 digits)
- Customer service number
- Issuing bank name
- Terms & conditions URL

Optional:
- Your logo
- Activation instructions
```

### Design Tips
- Use high contrast colors
- Make card number easy to read
- Include 24/7 support number
- Add activation instructions
- Use professional designer
- Get processor approval before printing

---

## Legal Requirements

### Disclosures (Must Provide)
1. **Fee Schedule**
   - All fees in writing
   - Before card issuance
   - In plain English

2. **Terms & Conditions**
   - Cardholder agreement
   - Dispute process
   - Lost/stolen card policy
   - Privacy policy

3. **Cardholder Rights**
   - Regulation E protections
   - Dispute rights
   - Error resolution
   - Unauthorized transaction protection

### Compliance
- **KYC**: Know Your Customer verification
- **AML**: Anti-Money Laundering monitoring
- **OFAC**: Sanctions screening
- **State Laws**: Money transmitter licenses (processor handles)

**Note**: Processor handles most compliance, but you need proper disclosures.

---

## Sample Card Order

### Scenario: Order 1,000 Cards

**Card Manufacturer**: CPI Card Group
```
Quantity: 1,000 cards
Type: EMV chip + magnetic stripe + contactless
Material: PVC
Printing: Full color, both sides
Personalization: Sequential numbering
Delivery: 2-3 weeks
Cost: $1,200 ($1.20/card)
```

**Processor**: Marqeta
```
Setup fee: $5,000
BIN number: Provided
Card activation: $0.50/card = $500
Monthly platform: $500/month
API access: Included
```

**Total Investment**:
- Cards: $1,200
- Setup: $5,000
- Activation: $500
- First month platform: $500
- Legal/compliance: $2,000
- **Total**: $9,200

**Monthly Revenue** (1,000 cards):
- Monthly fees: $4,950
- Load fees: $2,250
- ATM fees: $3,750
- **Total**: $10,950

**Monthly Costs**:
- Platform: $500
- Support: $500
- **Total**: $1,000

**Monthly Profit**: $9,950
**ROI**: Break even in 1 month!

---

## Next Steps

### This Week
1. ✅ Decide: White-label (fast) or Print your own (more profit)?
2. ✅ Contact 2-3 processors for quotes
3. ✅ Contact 2-3 card manufacturers for quotes
4. ✅ Create card design mockup

### Next 2 Weeks
1. Choose processor partner
2. Sign agreement
3. Get BIN number
4. Finalize card design
5. Order first batch (500-1,000 cards)

### Next 4-6 Weeks
1. Receive cards
2. Activate in processor system
3. Issue 10-20 pilot cards
4. Test everything
5. Launch to customers

---

## Bottom Line

**Yes, you can print your own cards!** This gives you:
- ✅ More control over branding
- ✅ Higher profit margins (90%+ vs 60-70%)
- ✅ Lower per-card costs ($1 vs $2-3)
- ✅ Bulk discounts at scale

**Investment needed**: $8,000-10,000
**Time to launch**: 6-8 weeks
**Profit potential**: $9,000-10,000/month with 1,000 cards

**Recommended**: Start with white-label to test, then switch to printing your own once validated.
