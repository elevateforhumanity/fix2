-- Hybrid Pricing Model:
-- Programs (via DOL/WRG/WIOA) = FREE
-- Individual courses = PAID

-- Add program tracking
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_program BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_standalone_course BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS program_id UUID;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS price_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS requires_payment BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS stripe_product_id TEXT;

-- Mark full programs as FREE (funded by DOL/WRG/WIOA)
UPDATE courses SET 
  is_program = true,
  is_standalone_course = false,
  price_cents = 0,
  requires_payment = false,
  is_free = true
WHERE slug IN (
  'barber-apprenticeship',
  'hvac-technician', 
  'medical-assistant',
  'direct-support-professional',
  'reentry-specialist',
  'nrf-rise-up',
  'jri-complete-series'
);

-- JRI courses are also FREE (justice-involved reentry programs)
UPDATE courses SET 
  is_program = true,
  is_standalone_course = false,
  price_cents = 0,
  requires_payment = false,
  is_free = true
WHERE title ILIKE '%jri%' OR title ILIKE '%justice%' OR title ILIKE '%reentry%';

-- Mark standalone courses as PAID
UPDATE courses SET 
  is_program = false,
  is_standalone_course = true,
  price_cents = 9900,  -- $99 per course
  requires_payment = true,
  is_free = false
WHERE slug IN (
  'business-startup',
  'tax-preparation',
  'professional-esthetician',
  'beauty-educator',
  'peer-support-professional',
  'recovery-coach',
  'community-healthcare-worker',
  'home-health-aide',
  'cpr-aed-first-aid',
  'emergency-health-safety'
);

-- Track enrollment type
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS enrollment_type TEXT DEFAULT 'program' CHECK (enrollment_type IN ('program', 'standalone', 'bundle'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS funding_source TEXT CHECK (funding_source IN ('wioa', 'wrg', 'dol', 'jri', 'vr', 'pell', 'self_pay', 'scholarship'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'waived', 'funded'));
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS paid_at TIMESTAMPTZ;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS amount_paid_cents INTEGER DEFAULT 0;

CREATE INDEX IF NOT EXISTS idx_enrollments_enrollment_type ON enrollments(enrollment_type);
CREATE INDEX IF NOT EXISTS idx_enrollments_payment_status ON enrollments(payment_status);

-- When student enrolls in a PROGRAM, set payment_status = 'funded'
-- When student enrolls in STANDALONE course, set payment_status = 'pending' (requires Stripe payment)
