-- Add pricing to credentials (what students pay to credentialing partners)
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS exam_fee_cents INTEGER DEFAULT 0;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS license_fee_cents INTEGER DEFAULT 0;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS total_cost_cents INTEGER DEFAULT 0;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS payment_required BOOLEAN DEFAULT false;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS payment_recipient TEXT; -- 'partner' or 'elevate'
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE credentials ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;

-- Add payment tracking to student_credentials
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'waived', 'failed'));
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE student_credentials ADD COLUMN IF NOT EXISTS amount_paid_cents INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_student_credentials_payment_status ON student_credentials(payment_status);

-- Set credential costs (typical fees)
UPDATE credentials SET 
  exam_fee_cents = 15000,  -- $150 exam fee
  license_fee_cents = 5000,  -- $50 license fee
  total_cost_cents = 20000,  -- $200 total
  payment_required = true,
  payment_recipient = 'partner'
WHERE name = 'Barber License';

UPDATE credentials SET 
  exam_fee_cents = 12500,  -- $125
  total_cost_cents = 12500,
  payment_required = true,
  payment_recipient = 'partner'
WHERE name = 'Milady Barber Certification';

UPDATE credentials SET 
  exam_fee_cents = 10000,  -- $100
  total_cost_cents = 10000,
  payment_required = true,
  payment_recipient = 'partner'
WHERE name = 'EPA 608';

UPDATE credentials SET 
  exam_fee_cents = 7500,  -- $75
  total_cost_cents = 7500,
  payment_required = true,
  payment_recipient = 'partner'
WHERE name = 'OSHA 10';

UPDATE credentials SET 
  exam_fee_cents = 5000,  -- $50
  total_cost_cents = 5000,
  payment_required = true,
  payment_recipient = 'partner'
WHERE name = 'CPR/AED Certification';

UPDATE credentials SET 
  exam_fee_cents = 0,
  total_cost_cents = 0,
  payment_required = false,
  payment_recipient = 'elevate'
WHERE name IN ('Rise Up Credential', 'Certificate of Completion');

-- Courses remain FREE
UPDATE courses SET 
  price_cents = 0,
  is_free = true,
  requires_payment = false;
