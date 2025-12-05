-- Quick Partner Providers Seed
-- Run this in Supabase SQL Editor to add the 7 partner providers

INSERT INTO public.partner_lms_providers (provider_name, provider_type, website_url, support_email, active, metadata)
VALUES
  (
    'Health & Safety Institute (HSI)',
    'hsi',
    'https://www.hsi.com',
    'support@hsi.com',
    true,
    '{"description": "OSHA, First Aid, CPR, Bloodborne Pathogens training"}'::jsonb
  ),
  (
    'Job Readiness Initiative (JRI)',
    'jri',
    'https://www.employindy.org',
    'info@employindy.org',
    true,
    '{"description": "Soft skills and workforce readiness training"}'::jsonb
  ),
  (
    'Milady RISE',
    'milady',
    'https://www.milady.com',
    'support@milady.com',
    true,
    '{"description": "Barber and cosmetology safety training"}'::jsonb
  ),
  (
    'NRF Foundation RISE Up',
    'nrf',
    'https://nrffoundation.org/rise-up',
    'riseup@nrf.com',
    true,
    '{"description": "Customer service and retail credentials"}'::jsonb
  ),
  (
    'Certiport',
    'certiport',
    'https://www.certiport.com',
    'support@certiport.com',
    true,
    '{"description": "Microsoft, Adobe, QuickBooks, IT Specialist certifications"}'::jsonb
  ),
  (
    'CareerSafe (OSHA)',
    'careersafe',
    'https://www.careersafeonline.com',
    'support@careersafeonline.com',
    true,
    '{"description": "OSHA 10 and OSHA 30 training"}'::jsonb
  ),
  (
    'National Drug Screening',
    'nds',
    'https://www.nationaldrugscreening.com',
    'info@nationaldrugscreening.com',
    true,
    '{"description": "DOT oral fluid training"}'::jsonb
  )
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT provider_name, provider_type, active FROM public.partner_lms_providers ORDER BY provider_name;
