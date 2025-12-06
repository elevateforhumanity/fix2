-- Simple credential system setup
-- Copy this ENTIRE file and paste into Supabase SQL Editor

CREATE TABLE IF NOT EXISTS credentialing_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  description TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID REFERENCES credentialing_partners(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS course_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  credential_id UUID REFERENCES credentials(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(course_id, credential_id)
);

CREATE TABLE IF NOT EXISTS student_credentials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  credential_id UUID REFERENCES credentials(id),
  issued_date TIMESTAMPTZ DEFAULT NOW(),
  credential_number TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO credentialing_partners (name, type, description, website) VALUES
('Indiana State Board', 'state_board', 'State licensing', 'https://www.in.gov'),
('Milady', 'industry', 'Beauty education', 'https://www.milady.com'),
('NRF Rise Up', 'industry', 'Retail certification', 'https://nrf.com/riseup'),
('Red Cross', 'national', 'CPR/First Aid', 'https://www.redcross.org'),
('OSHA', 'federal', 'Safety training', 'https://www.osha.gov'),
('EPA', 'federal', 'HVAC certification', 'https://www.epa.gov'),
('Elevate for Humanity', 'internal', 'Completion certificates', 'https://www.elevateforhumanity.org');

INSERT INTO credentials (partner_id, name, type, description) VALUES
((SELECT id FROM credentialing_partners WHERE name = 'Indiana State Board'), 'Barber License', 'license', 'State barber license'),
((SELECT id FROM credentialing_partners WHERE name = 'Milady'), 'Milady Barber Certification', 'certification', 'Industry certification'),
((SELECT id FROM credentialing_partners WHERE name = 'NRF Rise Up'), 'Rise Up Credential', 'credential', 'Workforce readiness'),
((SELECT id FROM credentialing_partners WHERE name = 'Red Cross'), 'CPR/AED Certification', 'certification', 'CPR and AED'),
((SELECT id FROM credentialing_partners WHERE name = 'OSHA'), 'OSHA 10', 'certification', 'Safety training'),
((SELECT id FROM credentialing_partners WHERE name = 'EPA'), 'EPA 608', 'certification', 'Refrigerant handling'),
((SELECT id FROM credentialing_partners WHERE name = 'Elevate for Humanity'), 'Certificate of Completion', 'certificate', 'Program completion');
