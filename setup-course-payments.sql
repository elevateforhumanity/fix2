-- Courses require payment to Elevate for Humanity
-- (which covers credentialing partner fees)

-- Add pricing to courses
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requires_payment BOOLEAN DEFAULT true;

-- Add payment tracking to enrollments
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'waived'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS amount_paid_cents INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);

-- Set course prices (what students pay YOU)
-- These prices cover your costs + credentialing partner fees

UPDATE courses SET 
  price_cents = 49900,  -- $499 (covers Barber License $200 + Milady $125 + your costs)
  requires_payment = true
WHERE slug = 'barber-apprenticeship';

UPDATE courses SET 
  price_cents = 39900,  -- $399 (covers EPA $100 + OSHA $75 + your costs)
  requires_payment = true
WHERE slug = 'hvac-technician';

UPDATE courses SET 
  price_cents = 29900,  -- $299 (covers CPR $50 + your costs)
  requires_payment = true
WHERE slug = 'medical-assistant';

UPDATE courses SET 
  price_cents = 19900,  -- $199
  requires_payment = true
WHERE slug IN ('business-startup', 'tax-preparation', 'professional-esthetician');

-- Some courses remain FREE (funded by grants/WIOA)
UPDATE courses SET 
  price_cents = 0,
  requires_payment = false,
  is_free = true
WHERE slug IN ('nrf-rise-up', 'jri-complete-series', 'reentry-specialist');

-- Track what YOU owe credentialing partners
CREATE TABLE IF NOT EXISTS partner_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_credential_id UUID REFERENCES student_credentials(id),
  partner_id UUID REFERENCES credentialing_partners(id),
  amount_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_payments_status ON partner_payments(status);
