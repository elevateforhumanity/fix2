-- Add pricing fields to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requires_payment BOOLEAN DEFAULT false;

-- Add payment tracking to enrollments
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS amount_paid_cents INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);

-- Update some courses to require payment (example)
UPDATE courses SET 
  price_cents = 29900,  -- $299
  requires_payment = true
WHERE slug IN ('barber-apprenticeship', 'hvac-technician', 'medical-assistant');

UPDATE courses SET 
  price_cents = 9900,  -- $99
  requires_payment = true
WHERE slug IN ('business-startup', 'tax-preparation');

-- Keep some courses free
UPDATE courses SET 
  price_cents = 0,
  requires_payment = false,
  is_free = true
WHERE slug IN ('nrf-rise-up', 'jri-complete-series');
