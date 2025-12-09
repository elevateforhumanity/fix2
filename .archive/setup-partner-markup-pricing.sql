-- Pricing Model:
-- 1. DOL/WRG/WIOA Programs = FREE
-- 2. JRI Courses = FREE
-- 3. Partner Courses = Partner Cost + 50% markup (student pays, you keep markup, pay partner)
-- 4. Your Own Courses = You set price, you keep 100%

-- Add partner cost tracking
ALTER TABLE courses ADD COLUMN IF NOT EXISTS partner_cost_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS markup_percentage INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS student_price_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS your_revenue_cents INTEGER DEFAULT 0;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS partner_id UUID REFERENCES credentialing_partners(id);
ALTER TABLE courses ADD COLUMN IF NOT EXISTS is_partner_course BOOLEAN DEFAULT false;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS course_type TEXT CHECK (course_type IN ('funded_program', 'jri', 'partner_course', 'elevate_course'));

-- Mark funded programs as FREE
UPDATE courses SET 
  course_type = 'funded_program',
  partner_cost_cents = 0,
  markup_percentage = 0,
  student_price_cents = 0,
  your_revenue_cents = 0,
  requires_payment = false,
  is_free = true,
  is_partner_course = false
WHERE slug IN (
  'barber-apprenticeship',
  'hvac-technician', 
  'medical-assistant',
  'direct-support-professional',
  'nrf-rise-up'
);

-- Mark JRI courses as FREE
UPDATE courses SET 
  course_type = 'jri',
  partner_cost_cents = 0,
  markup_percentage = 0,
  student_price_cents = 0,
  your_revenue_cents = 0,
  requires_payment = false,
  is_free = true,
  is_partner_course = false
WHERE title ILIKE '%jri%' OR title ILIKE '%justice%' OR title ILIKE '%reentry%' OR slug = 'jri-complete-series';

-- Example: Milady courses (partner charges $200, you mark up 50%)
UPDATE courses SET 
  course_type = 'partner_course',
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'Milady'),
  partner_cost_cents = 20000,  -- Partner charges $200
  markup_percentage = 50,  -- You add 50%
  student_price_cents = 30000,  -- Student pays $300 ($200 + 50%)
  your_revenue_cents = 10000,  -- You keep $100
  requires_payment = true,
  is_free = false,
  is_partner_course = true
WHERE slug IN ('professional-esthetician', 'beauty-educator');

-- Example: Red Cross courses (partner charges $50, you mark up 50%)
UPDATE courses SET 
  course_type = 'partner_course',
  partner_id = (SELECT id FROM credentialing_partners WHERE name = 'Red Cross'),
  partner_cost_cents = 5000,  -- Partner charges $50
  markup_percentage = 50,  -- You add 50%
  student_price_cents = 7500,  -- Student pays $75 ($50 + 50%)
  your_revenue_cents = 2500,  -- You keep $25
  requires_payment = true,
  is_free = false,
  is_partner_course = true
WHERE slug = 'cpr-aed-first-aid';

-- Your own courses (you set price, keep 100%)
UPDATE courses SET 
  course_type = 'elevate_course',
  partner_cost_cents = 0,
  markup_percentage = 0,
  student_price_cents = 9900,  -- You charge $99
  your_revenue_cents = 9900,  -- You keep $99
  requires_payment = true,
  is_free = false,
  is_partner_course = false
WHERE slug IN ('business-startup', 'tax-preparation');

-- Track partner payments (what you owe them after student pays)
CREATE TABLE IF NOT EXISTS partner_course_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enrollment_id UUID REFERENCES enrollments(id),
  course_id UUID REFERENCES courses(id),
  partner_id UUID REFERENCES credentialing_partners(id),
  student_paid_cents INTEGER NOT NULL,
  partner_owed_cents INTEGER NOT NULL,
  your_revenue_cents INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed')),
  due_date TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  payment_method TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_course_payments_status ON partner_course_payments(status);
CREATE INDEX IF NOT EXISTS idx_partner_course_payments_partner_id ON partner_course_payments(partner_id);

-- Update enrollments to track revenue split
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS partner_owed_cents INTEGER DEFAULT 0;
ALTER TABLE enrollments ADD COLUMN IF NOT EXISTS your_revenue_cents INTEGER DEFAULT 0;

-- Function to calculate pricing when student enrolls
CREATE OR REPLACE FUNCTION calculate_enrollment_pricing()
RETURNS TRIGGER AS $$
BEGIN
  -- Get course pricing
  SELECT 
    student_price_cents,
    partner_cost_cents,
    your_revenue_cents
  INTO 
    NEW.amount_paid_cents,
    NEW.partner_owed_cents,
    NEW.your_revenue_cents
  FROM courses
  WHERE id = NEW.course_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate pricing
DROP TRIGGER IF EXISTS trigger_calculate_enrollment_pricing ON enrollments;
CREATE TRIGGER trigger_calculate_enrollment_pricing
  BEFORE INSERT ON enrollments
  FOR EACH ROW
  EXECUTE FUNCTION calculate_enrollment_pricing();
