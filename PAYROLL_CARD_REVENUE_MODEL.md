# Payroll Card Revenue Model

## Business Overview

The Elevate Payroll Card is a **prepaid debit card product** that generates revenue through transaction fees. This is a proven business model used by companies like Wisely (ADP), Paycard, and others.

## How You Make Money

### 1. Monthly Maintenance Fees
- **Fee**: $4.95/month per active card
- **Revenue Potential**: 847 active cards × $4.95 = **$4,192.65/month**
- **Annual**: $50,311.80

### 2. Load Fees
- **Fee**: $1.50 per load transaction
- **Average**: 1.5 loads per card per month
- **Revenue Potential**: 847 cards × 1.5 loads × $1.50 = **$1,905.75/month**
- **Annual**: $22,869

### 3. ATM Withdrawal Fees
- **Fee**: $2.50 per withdrawal
- **Average**: 1.5 withdrawals per card per month
- **Revenue Potential**: 847 cards × 1.5 withdrawals × $2.50 = **$3,176.25/month**
- **Annual**: $38,115

### 4. Other Fees
- Balance Inquiry: $0.50
- Card Replacement: $5.00
- Inactivity Fee: $2.00/month (after 6 months)
- **Estimated**: **$500-800/month**

## Total Revenue Projection

### Per Card (Monthly)
- Monthly Fee: $4.95
- Load Fees: $2.25 (1.5 loads)
- ATM Fees: $3.75 (1.5 withdrawals)
- Other: $0.60
- **Total per card**: **$11.55/month**

### With 847 Active Cards
- **Monthly Revenue**: $9,774.85
- **Annual Revenue**: $117,298.20

### Growth Scenarios

| Active Cards | Monthly Revenue | Annual Revenue |
|--------------|-----------------|----------------|
| 500          | $5,775          | $69,300        |
| 1,000        | $11,550         | $138,600       |
| 2,500        | $28,875         | $346,500       |
| 5,000        | $57,750         | $693,000       |
| 10,000       | $115,500        | $1,386,000     |

## Implementation Steps

### Phase 1: Partner Setup (Weeks 1-4)
1. **Choose a Card Processor**
   - Options: Marqeta, Galileo, Sutton Bank, MetaBank
   - They handle: Card issuance, transaction processing, compliance
   - Your cost: $0.50-1.50 per card/month + setup fees

2. **Negotiate Revenue Share**
   - Typical split: 60-80% to you, 20-40% to processor
   - Example: $4.95 monthly fee → You keep $3.96, processor gets $0.99

3. **Set Up BIN Sponsorship**
   - Processor provides BIN (Bank Identification Number)
   - Your cards will have your branding but their BIN

### Phase 2: Platform Integration (Weeks 5-8)
1. **API Integration**
   - Connect to processor's API
   - Automate card issuance
   - Real-time balance updates
   - Transaction webhooks

2. **Compliance Setup**
   - KYC (Know Your Customer) verification
   - AML (Anti-Money Laundering) monitoring
   - OFAC screening
   - Processor typically handles this

### Phase 3: Launch (Week 9+)
1. **Pilot Program**
   - Issue 50-100 cards to test
   - Monitor transactions and fees
   - Gather feedback

2. **Scale Up**
   - Market to employers, program holders
   - Offer as payroll solution
   - Partner with workforce boards

## Revenue Optimization Strategies

### 1. Increase Card Adoption
- **Target**: Employers who want to pay workers without bank accounts
- **Pitch**: "No more check cashing fees for your employees"
- **Partner**: Workforce development programs, temp agencies

### 2. Encourage Usage
- **Incentives**: Waive first month fee
- **Education**: Show cardholders how to avoid fees
- **Features**: Add direct deposit, bill pay

### 3. Add Premium Tiers
- **Basic Card**: $4.95/month (current)
- **Premium Card**: $9.95/month (lower ATM fees, cashback)
- **Business Card**: $14.95/month (expense tracking, receipts)

### 4. B2B Partnerships
- **Employers**: Charge $2/card/month to employer, reduce cardholder fee
- **Program Holders**: Revenue share on cards issued to their students
- **Workforce Boards**: Bulk pricing for WIOA participants

## Cost Structure

### Per Card Costs
- Card Production: $2-5 (one-time)
- Monthly Processing: $0.50-1.50
- Transaction Processing: $0.10-0.25 per transaction
- Customer Support: $1-2 per card/month

### Example Economics (1,000 cards)
- **Revenue**: $11,550/month
- **Costs**: $3,500/month (processing + support)
- **Gross Profit**: $8,050/month
- **Margin**: 70%

## Compliance Requirements

### Federal Regulations
- **Regulation E**: Electronic fund transfer protections
- **Regulation Z**: Truth in lending (if credit features)
- **BSA/AML**: Bank Secrecy Act compliance
- **OFAC**: Sanctions screening

### State Regulations
- Money transmitter licenses (processor handles)
- State-specific fee disclosures

### Consumer Protections
- Fee disclosure before issuance
- Monthly statements
- Dispute resolution process
- Lost/stolen card protection

## Marketing Strategy

### Target Markets
1. **Unbanked/Underbanked Workers**
   - 7% of US households (9 million)
   - Need payroll solution without bank account

2. **Gig Economy Workers**
   - Uber, DoorDash, temp agencies
   - Want instant pay options

3. **Workforce Development Programs**
   - WIOA participants
   - Job training programs
   - Need stipend distribution method

4. **Small Businesses**
   - Restaurants, retail, construction
   - High turnover, many unbanked workers

### Value Propositions
- **For Workers**: "Get paid instantly, no bank account needed"
- **For Employers**: "Simplify payroll, reduce check costs"
- **For Programs**: "Easy stipend distribution, track spending"

## Technology Stack

### Required Integrations
1. **Card Processor API** (Marqeta, Galileo, etc.)
2. **KYC Provider** (Alloy, Persona, Onfido)
3. **Payment Gateway** (Stripe, Plaid for loads)
4. **SMS/Email** (Twilio for notifications)

### Features to Build
- Card application flow
- Real-time balance display
- Transaction history
- Load funds interface
- Fee calculator
- Cardholder portal
- Admin dashboard (already built!)

## Next Steps

### Immediate (This Week)
1. ✅ Database schema created
2. ✅ Admin dashboard built
3. ⏳ Research card processors
4. ⏳ Get pricing quotes

### Short Term (Next 2-4 Weeks)
1. Choose processor partner
2. Sign agreement
3. Complete API integration
4. Build cardholder portal
5. Set up KYC flow

### Medium Term (2-3 Months)
1. Launch pilot with 50-100 cards
2. Test fee collection
3. Monitor revenue
4. Refine processes

### Long Term (6-12 Months)
1. Scale to 1,000+ cards
2. Add premium features
3. Partner with employers
4. Expand to new markets

## Financial Projections

### Year 1
- Month 1-3: 100 cards, $1,155/month revenue
- Month 4-6: 300 cards, $3,465/month revenue
- Month 7-9: 600 cards, $6,930/month revenue
- Month 10-12: 1,000 cards, $11,550/month revenue
- **Year 1 Total**: ~$60,000 revenue

### Year 2
- Scale to 2,500 cards
- **Year 2 Total**: ~$346,500 revenue

### Year 3
- Scale to 5,000 cards
- **Year 3 Total**: ~$693,000 revenue

## Questions to Answer

1. **Which card processor should we partner with?**
   - Marqeta (best API, higher cost)
   - Galileo (mid-tier, good support)
   - Sutton Bank (lower cost, basic features)

2. **What's our target market?**
   - Focus on workforce development programs?
   - Target employers directly?
   - Both?

3. **What's our pricing strategy?**
   - Competitive with Wisely ($4.95/month)?
   - Premium pricing with better features?
   - Freemium model?

4. **How do we acquire cardholders?**
   - Partner with existing programs?
   - Direct marketing?
   - B2B sales?

## Resources

### Card Processors
- Marqeta: https://www.marqeta.com
- Galileo: https://www.galileo-ft.com
- Sutton Bank: https://www.suttonbank.com

### Compliance
- CFPB Prepaid Rule: https://www.consumerfinance.gov/prepaid
- Regulation E: https://www.federalreserve.gov/regulations

### Industry Research
- Mercator Advisory Group (prepaid card reports)
- Javelin Strategy & Research
- FDIC Survey of Unbanked Households

---

**Bottom Line**: With 1,000 active cards, you can generate **$11,550/month** ($138,600/year) in revenue with 70% margins. The key is partnering with the right processor and acquiring cardholders through your existing workforce development programs.
