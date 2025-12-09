-- Seed the programs table (different from courses)
-- Programs are the main workforce programs, courses are the training content

INSERT INTO programs (name, code, description, category, duration_weeks, funding_sources, status)
VALUES
  ('Certified Nursing Assistant', 'CNA-001', 'Entry-level healthcare training for nursing assistants', 'Healthcare', 6, ARRAY['WIOA', 'WRG'], 'active'),
  ('HVAC Technician', 'HVAC-001', 'Heating, ventilation, and air conditioning training', 'Skilled Trades', 12, ARRAY['WIOA', 'ETPL'], 'active'),
  ('Barber Apprenticeship', 'BARB-001', 'DOL registered barber apprenticeship program', 'Beauty & Wellness', 52, ARRAY['WIOA', 'DOL'], 'active'),
  ('Commercial Drivers License', 'CDL-001', 'Class A and Class B CDL training', 'Transportation', 8, ARRAY['WIOA', 'WRG'], 'active'),
  ('Building Maintenance', 'BLDG-001', 'Building repair and facility maintenance', 'Skilled Trades', 10, ARRAY['WIOA'], 'active'),
  ('Workforce Readiness', 'WFR-001', 'Job readiness and soft skills training', 'Career Development', 4, ARRAY['WIOA', 'JRI'], 'active')
ON CONFLICT (code) DO UPDATE SET
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  updated_at = NOW();

SELECT id, name, code, category, status FROM programs ORDER BY name;
