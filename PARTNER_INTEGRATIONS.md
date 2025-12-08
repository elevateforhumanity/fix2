# 🤝 Partner Integrations - Drake Software & EPS Financial

## Overview

Your system is integrated with industry-leading partners for professional tax preparation and financial services:

1. **Drake Software** - Professional tax preparation software
2. **EPS Financial** - Refund advances, cash advances, and banking services (Powered by Pathward®)

---

## 🦆 Drake Software Integration

### About Drake
- **Website:** https://www.drakesoftware.com
- **Purpose:** Professional tax preparation software
- **Features:** All IRS forms, e-file, calculations, error checking, state returns

### What Drake Provides:
- ✅ Complete tax preparation software
- ✅ IRS e-file integration
- ✅ All federal and state forms
- ✅ Automatic calculations
- ✅ Error checking and validation
- ✅ Document management
- ✅ Client portal
- ✅ Bank products integration

### Integration Points:

#### 1. Tax Return Creation
```typescript
// Create return in Drake
const drakeReturn = await drakeIntegration.createReturn({
  taxpayer: { /* client info */ },
  income: { /* W-2, 1099, etc */ },
  deductions: { /* itemized/standard */ }
});
```

#### 2. Document Upload
- **Drake Cloud:** Secure document storage
- **Gruntworks:** Document management system
- **Features:**
  - W-2 upload and OCR
  - 1099 forms
  - Receipts and supporting documents
  - E-signature collection
  - Secure client portal

#### 3. E-File Submission
```typescript
// Submit to IRS through Drake
await drakeIntegration.eFileReturn(drakeReturnId);

// Check acknowledgment status
const status = await drakeIntegration.getAcknowledgmentStatus(drakeReturnId);
```

### Required Credentials:
```env
DRAKE_API_KEY=your-api-key
DRAKE_API_URL=https://api.drakesoftware.com
DRAKE_OFFICE_ID=your-office-id
DRAKE_PREPARER_ID=your-preparer-id
DRAKE_EFIN=your-efin
```

### Setup Steps:
1. Purchase Drake Software license
2. Complete IRS e-file application (Form 8633)
3. Obtain EFIN (E-File Identification Number)
4. Get Drake API credentials
5. Configure integration in your system

---

## 💳 EPS Financial Partnership

### About EPS
- **Website:** https://www.epstax.net
- **Powered by:** Pathward®, N.A. (Member FDIC)
- **Purpose:** Tax-related financial products and services
- **Scale:** 44,000+ tax offices enrolled

### EPS Products:

#### 1. **E-Advance** (Taxpayer Advance Loans)
- No cost to taxpayers
- No in-season marketing fees
- Same-day funding available
- Loans from $250 to $7,500
- 0% APR on smaller loans
- 36% APR on larger loans

#### 2. **E-Collect** (Refund Transfer)
- Low-cost: $20 per transfer
- Simple refund transfer program
- Get paid before client receives refund
- Multiple disbursement options

#### 3. **E-Bonus** (High Incentive RT)
- Earn up to $20 more per return
- $8 rebate for check/direct deposit
- $16 rebate for card disbursement
- $4 additional for multiple deposits

#### 4. **FasterMoney® Visa® Prepaid Card**
- Federal refunds up to 4 days early
- No traditional bank account needed
- Secure and convenient
- Reloadable

#### 5. **Tax Office Loans**
- Pre-season startup capital
- In-season fee advances
- Software purchase assistance
- December Loyalty Program

#### 6. **Merchant Services (E-Pay)**
- Credit/debit card processing
- ACH payments
- Rates starting at 1.74%
- No monthly fees outside tax season
- No long-term contracts

### Integration Points:

#### 1. Refund Advance Application
```typescript
// Submit to EPS for underwriting
const result = await epsFinancialIntegration.submitApplication({
  applicant: { /* client info */ },
  employment: { /* income details */ },
  banking: { /* account info */ },
  requestedAmount: 2500
});

// Result includes:
// - Approval/denial status
// - Approved amount
// - Interest rate
// - Repayment schedule
```

#### 2. Refund Transfer Setup
```typescript
// Create refund transfer
const transfer = await epsFinancialIntegration.createRefundTransfer({
  taxReturnId: returnId,
  program: 'e-collect', // or 'e-bonus', 'e-advance'
  disbursementMethod: 'card', // or 'check', 'direct-deposit'
  fees: {
    taxPrep: 300,
    bankProduct: 20
  }
});
```

#### 3. Fund Disbursement
```typescript
// Initiate funding
const funding = await epsFinancialIntegration.initiateFunding({
  epsApplicationId: appId,
  amount: 2500,
  bankAccount: { /* routing/account */ }
});

// Track status
const status = await epsFinancialIntegration.getFundingStatus(transactionId);
```

### Required Credentials:
```env
EPS_FINANCIAL_API_KEY=your-api-key
EPS_FINANCIAL_API_URL=https://api.epsfinancial.com
EPS_FINANCIAL_MERCHANT_ID=your-merchant-id
EPS_FINANCIAL_WEBHOOK_SECRET=your-webhook-secret
EPS_OFFICE_ID=your-office-id
```

### Setup Steps:
1. Enroll at https://www.epstax.net/getstarted/
2. Complete EPS application
3. Choose your programs (E-Advance, E-Collect, E-Bonus)
4. Get API credentials from EPS
5. Configure webhook endpoints
6. Test in sandbox environment
7. Go live for tax season

### Support:
- **Phone:** 888-782-0850
- **Email:** support@epsfinancial.net
- **Live Chat:** Available on website
- **Languages:** English & Spanish

---

## 🔄 Integration Workflow

### Complete Tax Return Process:

```
1. Client Application
   ↓
2. Create Return in Drake
   ↓
3. Upload Documents (Drake Cloud/Gruntworks)
   ↓
4. Prepare Return (Drake Software)
   ↓
5. Client Chooses Payment Method
   ├─→ Pay Now (E-Pay merchant services)
   └─→ Pay from Refund (E-Collect/E-Bonus)
   ↓
6. Client Wants Advance?
   ├─→ Yes: Apply for E-Advance
   │   ↓
   │   EPS Underwriting
   │   ↓
   │   Approval/Denial
   │   ↓
   │   Fund Disbursement (same day)
   └─→ No: Continue
   ↓
7. E-File Return (Drake → IRS)
   ↓
8. IRS Acknowledgment
   ↓
9. Refund Processing
   ↓
10. Disbursement
    ├─→ FasterMoney Card (4 days early)
    ├─→ Direct Deposit
    └─→ Check
```

---

## 📊 Revenue Opportunities

### With EPS Financial:

**E-Bonus Program:**
- Base fee: $39.95 per return
- Rebate: $8-$16 per return
- Net revenue: $23.95-$31.95 per return

**E-Advance Program:**
- Marketing fee: $0 (with card disbursement)
- Or: $34.95 (with other disbursement)
- Volume bonus potential

**Merchant Services:**
- Processing fees: 1.74%+
- Convenience fee pass-through to clients
- Additional revenue stream

**Tax Office Loans:**
- Pre-season capital for marketing
- In-season fee advances
- Software purchase assistance

### Example Revenue (100 returns):
- Tax prep fees: $300 × 100 = $30,000
- E-Bonus rebates: $16 × 50 = $800
- Merchant fees: 2% × $15,000 = $300
- **Total: $31,100**

---

## 🎨 Branding & Marketing

### EPS Provides:
- ✅ Marketing materials
- ✅ Window clings
- ✅ Posters and flyers
- ✅ Digital assets
- ✅ Social media graphics
- ✅ Email templates
- ✅ Website banners

### Drake Provides:
- ✅ Professional software interface
- ✅ Client portal branding
- ✅ Document upload portal
- ✅ E-signature tools
- ✅ Tax organizer

### Your Branding:
- Use EPS logos and materials
- Promote "Powered by EPS Financial"
- Highlight "Drake Software" for credibility
- Emphasize "Refunds up to 4 days early"
- Market "No cost advances available"

---

## 📱 Client Experience

### What Clients See:

1. **Your Website/Office**
   - Apply for tax preparation
   - Upload documents securely
   - Choose payment options

2. **Drake Client Portal**
   - View return status
   - Upload additional documents
   - E-sign forms
   - Download completed returns

3. **EPS Products**
   - Apply for advance (if desired)
   - Choose disbursement method
   - Track refund status
   - Access FasterMoney Card

### Mobile Experience:
- Responsive web interface
- Mobile document upload
- SMS notifications
- Card management app

---

## 🔒 Security & Compliance

### Drake Software:
- IRS-approved e-file provider
- SOC 2 Type II certified
- Bank-level encryption
- Secure document storage
- Audit trail

### EPS Financial:
- FDIC insured (through Pathward)
- PCI DSS compliant
- Bank-level security
- Fraud prevention
- Identity verification

### Your Responsibilities:
- Maintain IRS EFIN
- Follow IRS e-file rules
- Protect client data
- Secure API credentials
- Monitor for fraud

---

## 📞 Support Contacts

### Drake Software:
- **Sales:** 828-524-8020
- **Support:** 828-524-8020
- **Website:** https://www.drakesoftware.com
- **Hours:** Mon-Fri 8am-8pm ET

### EPS Financial:
- **Sales:** 888-782-0850
- **Support:** 888-782-0850
- **Website:** https://www.epstax.net
- **Email:** support@epsfinancial.net
- **Hours:** Extended hours during tax season

### Your System:
- **Admin Dashboard:** /admin/tax-filing
- **Cash Advances:** /admin/cash-advances
- **API Docs:** /api/docs
- **Integration Status:** Check admin dashboards

---

## 🚀 Getting Started

### Week 1: Drake Setup
1. Purchase Drake license
2. Apply for IRS EFIN
3. Get Drake API credentials
4. Configure integration
5. Test return creation

### Week 2: EPS Enrollment
1. Enroll at epstax.net
2. Choose programs
3. Get API credentials
4. Configure webhooks
5. Test in sandbox

### Week 3: Testing
1. Create test returns
2. Test advance applications
3. Test refund transfers
4. Test disbursements
5. Verify webhooks

### Week 4: Go Live
1. Final configuration
2. Train staff
3. Update marketing
4. Launch to clients
5. Monitor and optimize

---

## 💡 Best Practices

### For Drake:
- Keep software updated
- Use document management
- Enable e-signatures
- Backup client data
- Monitor e-file status

### For EPS:
- Promote advances early
- Offer all disbursement options
- Use FasterMoney cards
- Track rebates
- Monitor approval rates

### For Your Business:
- Train staff thoroughly
- Market all options
- Track revenue by product
- Monitor client satisfaction
- Optimize conversion rates

---

## 📈 Success Metrics

### Track These KPIs:
- Returns filed per season
- Advance approval rate
- Average advance amount
- Refund transfer adoption
- Card disbursement rate
- Revenue per return
- Client retention rate

### EPS Provides:
- Real-time reporting
- Transaction history
- Rebate tracking
- Performance analytics
- Benchmark comparisons

---

## 🎉 You're Ready!

With Drake Software and EPS Financial, you have:
- ✅ Professional tax preparation
- ✅ IRS e-file capability
- ✅ Refund advances
- ✅ Multiple disbursement options
- ✅ Merchant services
- ✅ Office financing
- ✅ Marketing support
- ✅ 24/7 customer support

**Your system is configured to work with both partners seamlessly!**

Start enrolling clients and growing your tax business! 🚀
