-- Workforce Development Funding Model
-- Students enroll FREE, WIOA/WRG/DOL pays Elevate, Elevate pays credentialing partners

-- All courses are FREE for students
UPDATE courses SET 
  price_cents = 0,
  requires_payment = false,
  is_free = true;

-- Track funding sources for enrollments
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_source TEXT CHECK (funding_source IN ('wioa', 'wrg', 'dol', 'jri', 'vr', 'pell', 'self_pay', 'scholarship'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_status TEXT DEFAULT 'pending' CHECK (funding_status IN ('pending', 'approved', 'denied', 'paid'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_amount_cents INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_approved_at TIMESTAMPTZ;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_paid_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_enrollments_funding_source ON enrollments(funding_source);
CREATE INDEX IF NOT EXISTS idx_enrollments_funding_status ON enrollments(funding_status);

-- Track what credentialing partners charge (what YOU pay them)
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS partner_fee_cents INTEGER DEFAULT 0;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS partner_payment_required BOOLEAN DEFAULT false;

-- Set partner fees (what YOU owe them)
UPDATE credentials SET 
  partner_fee_cents = 15000,  -- You pay $150 to State Board
  partner_payment_required = true
WHERE name = 'Barber License';

UPDATE credentials SET 
  partner_fee_cents = 12500,  -- You pay $125 to Milady
  partner_payment_required = true
WHERE name = 'Milady Barber Certification';

UPDATE credentials SET 
  partner_fee_cents = 10000,  -- You pay $100 to EPA
  partner_payment_required = true
WHERE name = 'EPA 608';

UPDATE credentials SET 
  partner_fee_cents = 7500,  -- You pay $75 to OSHA
  partner_payment_required = true
WHERE name = 'OSHA 10';

UPDATE credentials SET 
  partner_fee_cents = 5000,  -- You pay $50 to Red Cross
  partner_payment_required = true
WHERE name = 'CPR/AED Certification';

-- Track payments TO credentialing partners (what you owe)
CREATE TABLE IF NOT EXISTS partner_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_credential_id UUID REFERENCES student_credentials(id),
  partner_id UUID REFERENCES credentialing_partners(id),
  credential_id UUID REFERENCES credentials(id),
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  due_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_payments_status ON partner_payments(status);
CREATE INDEX IF NOT EXISTS idx_partner_payments_due_date ON partner_payments(due_date);

-- Track payments FROM funding sources (what they owe you)
CREATE TABLE IF NOT EXISTS funding_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  funding_source TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'invoiced', 'paid', 'denied')),
  invoice_number TEXT,
  invoice_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_funding_payments_status ON funding_payments(status);
CREATE INDEX IF NOT EXISTS idx_funding_payments_funding_source ON funding_payments(funding_source);
