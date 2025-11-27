# Supabase Setup Guide for Elevate for Humanity

Complete guide to setting up Supabase for the platform.

---

## Quick Setup (5 minutes)

1. Create Supabase project at [supabase.com](https://supabase.com)
2. Copy API credentials to `.env.local`
3. Run migration SQL in SQL Editor
4. Test connection

---

## Step 1: Create Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: `elevate-for-humanity`
   - Database Password: (save this!)
   - Region: US East
4. Click "Create"
5. Wait 2-3 minutes

---

## Step 2: Get Credentials

1. Go to Settings → API
2. Copy these values to `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
```

---

## Step 3: Run Migration

1. Go to SQL Editor in Supabase
2. Click "New Query"
3. Paste this SQL:

```sql
-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Programs Table
CREATE TABLE programs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  duration_weeks INTEGER,
  salary_range TEXT,
  job_titles TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Programs
INSERT INTO programs (name, slug, description, duration_weeks, salary_range, job_titles) VALUES
('Medical Assistant', 'medical-assistant', 'Clinical and administrative support', 12, '$35K-$45K', ARRAY['Clinical MA', 'Administrative MA']),
('Phlebotomy Technician', 'phlebotomy', 'Blood collection specialist', 8, '$32K-$42K', ARRAY['Hospital Phlebotomist', 'Lab Phlebotomist']),
('EKG Technician', 'ekg-technician', 'Cardiac monitoring specialist', 6, '$33K-$43K', ARRAY['EKG Tech', 'Cardiac Monitor Tech']),
('Pharmacy Technician', 'pharmacy-technician', 'Medication preparation', 12, '$34K-$44K', ARRAY['Retail Pharmacy Tech', 'Hospital Pharmacy Tech']),
('Dental Assistant', 'dental-assistant', 'Dental care support', 10, '$36K-$46K', ARRAY['Chairside Assistant', 'Orthodontic Assistant']),
('Patient Care Technician', 'patient-care-technician', 'Direct patient care', 14, '$35K-$45K', ARRAY['PCT', 'Telemetry Tech']),
('Sterile Processing', 'sterile-processing', 'Instrument sterilization', 12, '$37K-$47K', ARRAY['SPT', 'Central Supply Tech']),
('Healthcare Administration', 'healthcare-administration', 'Office management', 16, '$40K-$50K', ARRAY['Office Manager', 'Billing Specialist']);

-- Applications Table
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date_of_birth DATE,
  address TEXT,
  city TEXT,
  state TEXT DEFAULT 'IN',
  zip_code TEXT,
  program_id UUID REFERENCES programs(id),
  start_date_preference TEXT,
  schedule_preference TEXT,
  funding_type TEXT,
  employment_status TEXT,
  household_income TEXT,
  has_high_school_diploma BOOLEAN,
  has_transportation BOOLEAN,
  needs_childcare BOOLEAN,
  has_computer_access BOOLEAN,
  additional_info TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_status ON applications(status);

-- Contact Messages Table
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);

-- Enable RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Programs viewable by all" ON programs FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can submit applications" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can submit contact" ON contact_messages FOR INSERT WITH CHECK (true);
```

4. Click "Run"
5. Verify success

---

## Step 4: Test Connection

Run this in your terminal:

```bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "317-555-1234",
    "program": "medical-assistant",
    "fundingType": "wioa"
  }'
```

---

## Done!

Your Supabase database is ready. The API endpoints will now work.

---

## Troubleshooting

**Error: "relation does not exist"**
→ Run the migration SQL again

**Error: "invalid API key"**
→ Check your `.env.local` credentials

**Error: "permission denied"**
→ Verify RLS policies are created

---

For full documentation, see `SUPABASE_SETUP_OLD.md`
