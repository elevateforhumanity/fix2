# How to Get Payroll Cards - Step-by-Step Guide

## Overview
You need to partner with a **card processor/issuer** who will manufacture and issue the physical cards. You don't make the cards yourself - you partner with a bank or fintech company that has the licenses and infrastructure.

---

## Option 1: Full-Service Card Processor (RECOMMENDED FOR BEGINNERS)

### Best Providers

#### 1. **Marqeta** (Premium Option)
- **Website**: https://www.marqeta.com
- **Best For**: Tech-savvy companies, best API
- **Cost**: 
  - Setup: $5,000-10,000
  - Per card: $2-3 (physical card)
  - Monthly platform: $500-1,000
  - Transaction fees: $0.10-0.25 each
- **What They Provide**:
  - Physical cards with your branding
  - Virtual cards (instant issuance)
  - Full API for card management
  - Compliance and KYC
  - Transaction processing
  - Customer support
- **Revenue Share**: You keep 60-80% of fees
- **Timeline**: 2-3 months to launch

#### 2. **Galileo Financial Technologies** (Mid-Tier)
- **Website**: https://www.galileo-ft.com
- **Best For**: Mid-size programs, good balance
- **Cost**:
  - Setup: $3,000-7,000
  - Per card: $1.50-2.50
  - Monthly platform: $300-800
  - Transaction fees: $0.08-0.20 each
- **What They Provide**:
  - Physical and virtual cards
  - API integration
  - Compliance support
  - White-label platform
- **Revenue Share**: You keep 65-85% of fees
- **Timeline**: 6-8 weeks to launch

#### 3. **Sutton Bank / MetaBank** (Budget Option)
- **Website**: https://www.suttonbank.com
- **Best For**: Smaller programs, lower volume
- **Cost**:
  - Setup: $1,000-3,000
  - Per card: $1-2
  - Monthly platform: $200-500
  - Transaction fees: $0.05-0.15 each
- **What They Provide**:
  - Basic card program
  - Limited API
  - Basic compliance
- **Revenue Share**: You keep 70-90% of fees
- **Timeline**: 4-6 weeks to launch

---

## Option 2: Fintech-as-a-Service Platforms (EASIEST)

### Best Providers

#### 1. **Stripe Issuing**
- **Website**: https://stripe.com/issuing
- **Best For**: Already using Stripe, fastest setup
- **Cost**:
  - No setup fee
  - Per card: $3 (physical), $0 (virtual)
  - Transaction fees: 2.9% + $0.30 (loads), $0.10 (purchases)
- **What They Provide**:
  - Instant virtual cards
  - Physical cards in 7-10 days
  - Full API integration
  - Built-in compliance
  - Dashboard for management
- **Revenue Model**: You set your own fees, keep 100%
- **Timeline**: Can start issuing virtual cards TODAY
- **Limitations**: Higher transaction costs, less customization

#### 2. **Unit.co**
- **Website**: https://www.unit.co
- **Best For**: Embedded banking, full control
- **Cost**:
  - Setup: $0-2,000
  - Per card: $2-3
  - Monthly: $500-1,000
  - Transaction fees: $0.10-0.20 each
- **What They Provide**:
  - Cards + bank accounts
  - Full white-label solution
  - API-first platform
  - Compliance included
- **Revenue Share**: You keep 100% of fees
- **Timeline**: 2-4 weeks to launch

#### 3. **Lithic** (formerly Privacy.com)
- **Website**: https://lithic.com
- **Best For**: Developer-friendly, modern API
- **Cost**:
  - Setup: $0-1,000
  - Per card: $2-3
  - Transaction fees: $0.10-0.15 each
- **What They Provide**:
  - Virtual and physical cards
  - Real-time API
  - Sandbox for testing
  - Compliance support
- **Revenue Share**: You keep 100% of fees
- **Timeline**: 1-2 weeks to launch

---

## Recommended Path: Start with Stripe Issuing

### Why Stripe?
1. ✅ **No upfront costs** - pay as you go
2. ✅ **Fast setup** - can issue virtual cards in 1 day
3. ✅ **Already integrated** - you're using Stripe for payments
4. ✅ **Easy API** - well-documented, simple to use
5. ✅ **Compliance included** - they handle KYC, AML, etc.

### How to Get Started with Stripe Issuing

#### Step 1: Apply for Stripe Issuing (Today)
```bash
1. Log into your Stripe Dashboard
2. Go to "Products" → "Issuing"
3. Click "Get Started"
4. Fill out application:
   - Business type: Financial services / Workforce development
   - Use case: Payroll cards for unbanked workers
   - Expected volume: Start with 100 cards, scale to 1,000+
5. Submit application
```

**Timeline**: Approval in 1-3 business days

#### Step 2: Design Your Card (Week 1)
```bash
1. Upload your logo
2. Choose card design:
   - Background color
   - Text color
   - Logo placement
3. Add cardholder name format
4. Submit for approval
```

**Timeline**: Design approval in 2-3 days

#### Step 3: Integrate API (Week 1-2)
```javascript
// Install Stripe SDK
npm install stripe

// Create a cardholder
const cardholder = await stripe.issuing.cardholders.create({
  name: 'John Smith',
  email: 'john@example.com',
  phone_number: '+15555551234',
  billing: {
    address: {
      line1: '123 Main St',
      city: 'Indianapolis',
      state: 'IN',
      postal_code: '46204',
      country: 'US',
    },
  },
  type: 'individual',
});

// Issue a card
const card = await stripe.issuing.cards.create({
  cardholder: cardholder.id,
  currency: 'usd',
  type: 'physical', // or 'virtual' for instant
  status: 'active',
  spending_controls: {
    spending_limits: [
      {
        amount: 50000, // $500 daily limit
        interval: 'daily',
      },
    ],
  },
});

// Load funds onto card
const authorization = await stripe.issuing.authorizations.approve(
  'iauth_xxxxx',
  { amount: 10000 } // $100
);
```

#### Step 4: Set Up Fee Structure (Week 2)
```javascript
// Your fee structure
const feeStructure = {
  monthlyFee: 4.95,
  loadFee: 1.50,
  atmFee: 2.50,
  replacementFee: 5.00,
};

// Charge monthly fee
await stripe.charges.create({
  amount: 495, // $4.95 in cents
  currency: 'usd',
  customer: customerId,
  description: 'Monthly card maintenance fee',
});

// Charge load fee when adding funds
await stripe.charges.create({
  amount: 150, // $1.50 in cents
  currency: 'usd',
  customer: customerId,
  description: 'Card load fee',
});
```

#### Step 5: Order Physical Cards (Week 2-3)
```bash
1. In Stripe Dashboard:
   - Go to Issuing → Cards
   - Click "Create card"
   - Select "Physical"
   - Enter cardholder details
   - Click "Create"

2. Stripe will:
   - Manufacture the card
   - Print your design
   - Mail to cardholder
   - Takes 7-10 business days
```

#### Step 6: Launch Pilot (Week 3-4)
```bash
1. Issue 10-20 cards to test users
2. Monitor transactions
3. Test fee collection
4. Gather feedback
5. Fix any issues
```

---

## Complete Setup Checklist

### Legal & Compliance
- [ ] Register business entity (LLC or Corp)
- [ ] Get EIN from IRS
- [ ] Open business bank account
- [ ] Review state money transmitter laws (processor handles most)
- [ ] Create Terms of Service for cardholders
- [ ] Create Privacy Policy
- [ ] Create Fee Disclosure document

### Technical Setup
- [ ] Choose card processor (Stripe recommended)
- [ ] Apply for card issuing program
- [ ] Set up API integration
- [ ] Build cardholder portal (already done!)
- [ ] Build admin dashboard (already done!)
- [ ] Set up KYC verification
- [ ] Configure fee collection
- [ ] Set up transaction webhooks
- [ ] Test in sandbox environment

### Operations
- [ ] Create cardholder onboarding flow
- [ ] Set up customer support process
- [ ] Create dispute resolution process
- [ ] Set up fraud monitoring
- [ ] Create card replacement process
- [ ] Set up monthly fee billing
- [ ] Create reporting dashboards

### Marketing & Sales
- [ ] Create card program website
- [ ] Design marketing materials
- [ ] Identify target customers
- [ ] Reach out to employers/programs
- [ ] Create partnership agreements
- [ ] Set up referral program

---

## Cost Breakdown (First Year with Stripe)

### Startup Costs
- Stripe Issuing application: **$0**
- Card design: **$0**
- API integration: **$0** (DIY) or $2,000-5,000 (hire developer)
- Legal/compliance: **$1,000-3,000**
- **Total Startup**: **$1,000-8,000**

### Monthly Costs (100 cards)
- Physical cards: $3 × 100 = **$300** (one-time)
- Transaction fees: ~$50-100/month
- Customer support: $200-500/month
- **Total Monthly**: **$250-600**

### Revenue (100 cards)
- Monthly fees: 100 × $4.95 = **$495**
- Load fees: 100 × 1.5 loads × $1.50 = **$225**
- ATM fees: 100 × 1.5 withdrawals × $2.50 = **$375**
- **Total Monthly Revenue**: **$1,095**

### Profit (100 cards)
- Revenue: $1,095
- Costs: $400
- **Monthly Profit**: **$695**
- **Annual Profit**: **$8,340**

### Scaling (1,000 cards)
- Monthly Revenue: **$11,550**
- Monthly Costs: **$2,500**
- **Monthly Profit**: **$9,050**
- **Annual Profit**: **$108,600**

---

## Timeline to Launch

### Week 1: Application & Setup
- Day 1: Apply for Stripe Issuing
- Day 2-3: Wait for approval
- Day 4-5: Design card, set up API

### Week 2: Integration
- Day 1-3: Build cardholder portal
- Day 4-5: Test card issuance in sandbox
- Day 6-7: Create fee collection system

### Week 3: Testing
- Day 1: Issue first test card
- Day 2-5: Test all features
- Day 6-7: Fix bugs, refine process

### Week 4: Pilot Launch
- Day 1: Issue 10-20 pilot cards
- Day 2-7: Monitor, gather feedback

### Week 5+: Scale
- Issue 50-100 cards
- Refine processes
- Market to employers/programs
- Scale to 500+ cards

---

## Next Steps (Do This Now)

### 1. Apply for Stripe Issuing (30 minutes)
```
1. Go to https://dashboard.stripe.com
2. Click "Products" → "Issuing"
3. Click "Get Started"
4. Fill out application
5. Submit
```

### 2. While Waiting for Approval (1-3 days)
- [ ] Read Stripe Issuing documentation
- [ ] Design your card (logo, colors)
- [ ] Write Terms of Service
- [ ] Create fee disclosure document
- [ ] Plan pilot program (who gets first 20 cards?)

### 3. After Approval (Week 1)
- [ ] Upload card design
- [ ] Set up API integration
- [ ] Test in sandbox
- [ ] Issue first test card to yourself

### 4. Launch Pilot (Week 2-3)
- [ ] Issue 10-20 cards to trusted users
- [ ] Monitor transactions
- [ ] Collect feedback
- [ ] Refine process

### 5. Scale (Week 4+)
- [ ] Market to employers
- [ ] Partner with workforce programs
- [ ] Issue 100+ cards
- [ ] Start earning revenue!

---

## Alternative: Partner with Existing Card Program

If you don't want to set up your own program, you can partner with an existing payroll card provider:

### Option A: White-Label Partnership
- Partner with Wisely, ADP, or similar
- They provide cards with your branding
- You get 10-30% revenue share
- No setup costs
- Faster to launch (1-2 weeks)

### Option B: Referral Partnership
- Refer your users to existing card program
- Get $5-10 per card issued
- Get 5-15% of ongoing fees
- No setup, no integration
- Easiest option

---

## Questions?

### "How long does it really take?"
- **Stripe Issuing**: 2-4 weeks to first card
- **Marqeta/Galileo**: 2-3 months to first card
- **White-label partner**: 1-2 weeks to first card

### "How much money do I need to start?"
- **Minimum**: $1,000 (legal + first 100 cards with Stripe)
- **Recommended**: $5,000 (includes marketing, support)
- **Ideal**: $10,000 (includes developer, contingency)

### "Can I start with virtual cards only?"
- **Yes!** Virtual cards are instant and free with Stripe
- Test your program with virtual cards first
- Add physical cards later

### "What if I only have 50 users?"
- **Still profitable!** 50 cards × $11.55/month = $577/month
- Costs: ~$200/month
- Profit: ~$377/month ($4,524/year)

---

## Bottom Line

**Fastest Path**: Apply for Stripe Issuing today. You can be issuing virtual cards within a week and physical cards within 2-3 weeks. Start with 10-20 pilot cards, then scale to 100+.

**Total Investment**: $1,000-5,000 to start
**Time to First Card**: 1-2 weeks (virtual), 2-3 weeks (physical)
**Revenue Potential**: $11.55 per card per month
**Break-even**: 50-100 cards

**Ready to start?** Go to https://dashboard.stripe.com and apply for Issuing now!
