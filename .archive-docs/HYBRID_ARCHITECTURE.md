# SupersonicFastCash Hybrid Platform Architecture

**DIY Tax Preparation + Professional Service**

---

## Platform Overview

### Two Service Paths

```
┌─────────────────────────────────────────────────────────────┐
│                  SupersonicFastCash Platform                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────┐      ┌──────────────────────┐    │
│  │   DIY Tax Prep       │      │  Professional Service │    │
│  │   (Self-Service)     │      │  (Tax Pro Assisted)   │    │
│  └──────────────────────┘      └──────────────────────┘    │
│           │                              │                   │
│           ├─ Tax Interview               ├─ Book Appointment│
│           ├─ Real-Time Calculator        ├─ Upload Documents│
│           ├─ Auto E-File                 ├─ Tax Pro Review  │
│           ├─ $49-$99                     ├─ Human Filing    │
│           └─ Upgrade to Pro Available    └─ $150-$500      │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## User Journey

### Path 1: DIY User (Simple Return)

1. Land on homepage
2. Click "Start Your Taxes" (DIY)
3. Complete tax interview wizard
4. See real-time refund calculation
5. Review generated forms
6. E-file directly
7. Track refund status

**Upgrade Option:** At any step, upgrade to tax pro review

---

### Path 2: Professional Service User (Complex Return)

1. Land on homepage
2. Click "Book Tax Pro" (Professional)
3. Schedule appointment
4. Upload documents
5. Tax pro prepares return
6. Review with tax pro (video call)
7. Tax pro files return
8. Track refund status

**Downgrade Option:** Simple returns can use DIY next year

---

### Path 3: Hybrid User (Start DIY, Upgrade to Pro)

1. Start DIY tax interview
2. Encounter complex situation
3. Click "Get Help from Tax Pro"
4. Pay upgrade fee
5. Tax pro reviews and completes
6. Continue with professional service

---

## Database Schema Extensions

### New Tables for DIY Features

```sql
-- Tax Returns (DIY)
CREATE TABLE tax_returns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  tax_year INTEGER NOT NULL,
  filing_status TEXT NOT NULL, -- single, married_joint, married_separate, head_of_household
  service_type TEXT NOT NULL, -- diy, professional, hybrid
  status TEXT DEFAULT 'in_progress', -- in_progress, review, filed, accepted, rejected
  federal_refund DECIMAL(10,2),
  state_refund DECIMAL(10,2),
  total_income DECIMAL(10,2),
  total_deductions DECIMAL(10,2),
  total_credits DECIMAL(10,2),
  agi DECIMAL(10,2), -- Adjusted Gross Income
  taxable_income DECIMAL(10,2),
  federal_tax_owed DECIMAL(10,2),
  state_tax_owed DECIMAL(10,2),
  assigned_tax_pro_id UUID REFERENCES auth.users(id),
  upgraded_from_diy BOOLEAN DEFAULT false,
  upgrade_date TIMESTAMPTZ,
  filed_date TIMESTAMPTZ,
  irs_confirmation TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tax Interview Responses
CREATE TABLE tax_interview_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id) ON DELETE CASCADE,
  section TEXT NOT NULL, -- personal_info, income, deductions, credits
  question_id TEXT NOT NULL,
  question_text TEXT NOT NULL,
  answer_value TEXT,
  answer_type TEXT, -- text, number, boolean, date, file
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Income Sources
CREATE TABLE income_sources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id) ON DELETE CASCADE,
  income_type TEXT NOT NULL, -- w2, 1099_misc, 1099_nec, 1099_int, 1099_div, business, rental
  employer_name TEXT,
  ein TEXT,
  wages DECIMAL(10,2),
  federal_withholding DECIMAL(10,2),
  state_withholding DECIMAL(10,2),
  social_security_wages DECIMAL(10,2),
  medicare_wages DECIMAL(10,2),
  document_id UUID REFERENCES tax_documents(id),
  ocr_extracted BOOLEAN DEFAULT false,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deductions
CREATE TABLE deductions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id) ON DELETE CASCADE,
  deduction_type TEXT NOT NULL, -- mortgage_interest, property_tax, charitable, medical, student_loan_interest
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  document_id UUID REFERENCES tax_documents(id),
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tax Credits
CREATE TABLE tax_credits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id) ON DELETE CASCADE,
  credit_type TEXT NOT NULL, -- child_tax_credit, earned_income_credit, education_credit
  amount DECIMAL(10,2) NOT NULL,
  qualifying_info JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-File Submissions
CREATE TABLE efile_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id),
  submission_type TEXT NOT NULL, -- federal, state
  submission_id TEXT, -- IRS submission ID
  status TEXT DEFAULT 'pending', -- pending, accepted, rejected, processing
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  rejection_reason TEXT,
  irs_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Refund Tracking
CREATE TABLE refund_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id),
  refund_type TEXT NOT NULL, -- federal, state
  expected_amount DECIMAL(10,2),
  actual_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending', -- pending, approved, sent, received
  direct_deposit_date DATE,
  check_mailed_date DATE,
  received_date DATE,
  irs_status_code TEXT,
  last_checked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Video Consultations
CREATE TABLE video_consultations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES appointments(id),
  tax_return_id UUID REFERENCES tax_returns(id),
  meeting_url TEXT,
  meeting_id TEXT,
  meeting_password TEXT,
  provider TEXT DEFAULT 'zoom', -- zoom, twilio, whereby
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  recording_url TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, in_progress, completed, cancelled
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id),
  sender_id UUID REFERENCES auth.users(id),
  sender_type TEXT NOT NULL, -- client, tax_pro, system
  message_text TEXT NOT NULL,
  attachments JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payment Transactions
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tax_return_id UUID REFERENCES tax_returns(id),
  appointment_id UUID REFERENCES appointments(id),
  amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL, -- preparation_fee, upgrade_fee, refund_advance
  payment_method TEXT, -- card, ach, cash
  stripe_payment_intent_id TEXT,
  status TEXT DEFAULT 'pending', -- pending, completed, failed, refunded
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tax_returns_user_id ON tax_returns(user_id);
CREATE INDEX idx_tax_returns_tax_year ON tax_returns(tax_year);
CREATE INDEX idx_tax_returns_status ON tax_returns(status);
CREATE INDEX idx_income_sources_tax_return_id ON income_sources(tax_return_id);
CREATE INDEX idx_deductions_tax_return_id ON deductions(tax_return_id);
CREATE INDEX idx_chat_messages_tax_return_id ON chat_messages(tax_return_id);
CREATE INDEX idx_refund_tracking_tax_return_id ON refund_tracking(tax_return_id);
```

---

## File Structure

```
app/
├── supersonic-fast-cash/
│   ├── page.tsx                          # Homepage with DIY vs Pro choice
│   ├── diy/                              # DIY Tax Prep Section
│   │   ├── start/page.tsx                # Choose tax year, filing status
│   │   ├── interview/
│   │   │   ├── page.tsx                  # Main interview wizard
│   │   │   ├── personal/page.tsx         # Personal info
│   │   │   ├── income/page.tsx           # Income section
│   │   │   ├── deductions/page.tsx       # Deductions section
│   │   │   ├── credits/page.tsx          # Credits section
│   │   │   └── review/page.tsx           # Review before filing
│   │   ├── calculator/page.tsx           # Real-time tax calculator
│   │   ├── forms/page.tsx                # View generated forms
│   │   ├── efile/page.tsx                # E-file submission
│   │   └── upgrade/page.tsx              # Upgrade to professional
│   ├── professional/                     # Professional Service Section
│   │   ├── book-appointment/page.tsx     # (existing)
│   │   ├── upload-documents/page.tsx     # (existing)
│   │   └── video-call/page.tsx           # Video consultation
│   ├── portal/                           # Unified Client Portal
│   │   ├── page.tsx                      # Dashboard (DIY + Pro)
│   │   ├── returns/[id]/page.tsx         # View specific return
│   │   ├── documents/page.tsx            # All documents
│   │   ├── appointments/page.tsx         # All appointments
│   │   ├── messages/page.tsx             # Chat with tax pro
│   │   ├── refund-tracking/page.tsx      # Track refunds
│   │   └── payments/page.tsx             # Payment history
│   ├── services/page.tsx                 # (existing)
│   ├── pricing/page.tsx                  # Updated with DIY pricing
│   └── locations/page.tsx                # (existing)
│
├── api/
│   └── supersonic-fast-cash/
│       ├── diy/
│       │   ├── tax-return/route.ts       # CRUD for tax returns
│       │   ├── interview/route.ts        # Save interview responses
│       │   ├── calculate/route.ts        # Tax calculation engine
│       │   ├── generate-forms/route.ts   # Generate PDF forms
│       │   ├── efile/route.ts            # E-file submission
│       │   └── upgrade/route.ts          # Upgrade to professional
│       ├── professional/
│       │   ├── appointments/route.ts     # (existing)
│       │   ├── upload/route.ts           # (existing)
│       │   └── video/route.ts            # Video consultation
│       ├── ocr/
│       │   ├── w2/route.ts               # OCR for W-2
│       │   └── 1099/route.ts             # OCR for 1099
│       ├── refund-tracking/route.ts      # IRS refund status
│       ├── chat/route.ts                 # Real-time messaging
│       └── payments/route.ts             # Stripe integration
│
└── components/
    └── supersonic-fast-cash/
        ├── TaxInterviewWizard.tsx        # Multi-step form
        ├── TaxCalculator.tsx             # Real-time calculator
        ├── DocumentScanner.tsx           # OCR interface
        ├── VideoConsultation.tsx         # Video call UI
        ├── ChatWidget.tsx                # Live chat
        ├── RefundTracker.tsx             # Refund status
        ├── PaymentForm.tsx               # Stripe payment
        └── UpgradePrompt.tsx             # Upgrade to pro CTA
```

---

## Pricing Structure

### DIY Tax Preparation

- **Basic (W-2 only):** $49
- **Deluxe (Multiple income sources):** $79
- **Premium (Business/Rental):** $99
- **State Return:** +$39 per state

### Professional Service

- **Basic Tax Filing:** $150-$250
- **Deluxe Tax Filing:** $250-$350
- **Premium Tax Filing:** $350-$500
- **Business Returns:** $500-$2,500

### Hybrid Options

- **Start DIY, Upgrade to Pro:** Pay difference
- **DIY + Pro Review:** DIY price + $50
- **Pro Prep + DIY Next Year:** Discount on DIY

### Refund Advance

- **Same for both:** 3.5% + $35 fee
- **Available for:** $250-$7,500

---

## Technology Stack

### Frontend

- **Next.js 14+** (App Router)
- **React** (Client components for interactive features)
- **TypeScript** (Type safety)
- **Tailwind CSS** (Styling)
- **Shadcn/ui** (Component library)

### Backend

- **Supabase** (Database, Auth, Storage)
- **Resend** (Email notifications)
- **Stripe** (Payment processing)

### New Integrations

- **Tax Calculation:** Custom engine or TaxJar API
- **E-Filing:** IRS e-file API or Drake Tax API
- **OCR:** Tesseract.js or Google Vision API
- **Video:** Zoom API or Twilio Video
- **Chat:** Supabase Realtime or Pusher
- **Refund Tracking:** IRS "Where's My Refund" API

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

- ✅ Database migrations
- ✅ Basic routing structure
- ✅ Homepage with DIY vs Pro choice
- ✅ User flow design

### Phase 2: DIY Tax Interview (Weeks 3-6)

- Tax interview wizard
- Multi-step form with validation
- Progress saving
- Income section (W-2, 1099)
- Deductions section
- Credits section

### Phase 3: Tax Calculator (Weeks 7-8)

- Federal tax calculation engine
- Standard deduction
- Tax brackets
- Basic credits
- Real-time refund estimate

### Phase 4: Form Generation (Weeks 9-10)

- Generate Form 1040
- Generate state forms
- PDF export
- E-signature

### Phase 5: E-Filing (Weeks 11-12)

- IRS e-file integration
- State e-file
- Submission tracking
- Rejection handling

### Phase 6: Professional Enhancements (Weeks 13-14)

- Video consultation integration
- Live chat/messaging
- Tax pro dashboard
- Review workflow

### Phase 7: Advanced Features (Weeks 15-16)

- Document OCR
- Refund tracking
- Payment processing
- Mobile optimization

### Phase 8: Testing & Launch (Weeks 17-18)

- End-to-end testing
- Security audit
- Performance optimization
- Production deployment

**Total Timeline:** 18 weeks (4.5 months)

---

## Next Steps

1. **Approve architecture**
2. **Create database migrations**
3. **Build tax interview wizard**
4. **Implement tax calculator**
5. **Add video consultations**
6. **Integrate payment processing**
7. **Test complete flows**
8. **Launch hybrid platform**

---

**Status:** Architecture designed, ready to implement
