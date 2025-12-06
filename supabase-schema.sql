-- Programs table for Elevate for Humanity
-- Run this in Supabase SQL Editor

create table if not exists public.programs (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  hero_image text,
  tagline text,
  summary text,
  bullets text[],
  funding text[],
  cta text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for fast slug lookups
create index if not exists idx_programs_slug on public.programs (slug);

-- Enable Row Level Security
alter table public.programs enable row level security;

-- Allow public read access
create policy "Allow public read access"
  on public.programs
  for select
  using (true);

-- Seed data
insert into public.programs (slug, title, tagline, description, summary, bullets, funding, hero_image) values
(
  'barber',
  'Barber Apprenticeship',
  'Master the craft of barbering',
  'State-approved apprenticeship program leading to Indiana barber license.',
  'Learn cutting, styling, and business skills in a real barbershop environment.',
  ARRAY[
    'State-approved curriculum',
    '1500 hours of training',
    'Hands-on experience',
    'Business management skills',
    'Prepare for state licensing exam'
  ],
  ARRAY['WIOA', 'Apprenticeship'],
  '/images/barber.jpg'
),
(
  'cna',
  'Certified Nursing Assistant (CNA)',
  'Start your healthcare career',
  'State-aligned CNA training with clinicals and WorkOne eligibility.',
  'Become a certified nursing assistant and begin your healthcare journey.',
  ARRAY[
    'State-approved training',
    'Clinical experience',
    'Exam preparation',
    'Job placement assistance',
    'Fast-track to employment'
  ],
  ARRAY['WIOA', 'WRG'],
  '/images/cna.jpg'
),
(
  'hvac',
  'HVAC Technician',
  'Build a career in HVAC',
  'Hands-on HVAC fundamentals with stackable NATE-ready skills.',
  'Learn heating, ventilation, and air conditioning systems from industry experts.',
  ARRAY[
    'EPA certification prep',
    'Hands-on training',
    'NATE-ready curriculum',
    'Industry-recognized credentials',
    'High-demand career path'
  ],
  ARRAY['WIOA', 'WRG'],
  '/images/hvac.jpg'
),
(
  'building-tech',
  'Building Services Technician',
  'Master building systems',
  'Comprehensive training in building maintenance and systems.',
  'Learn to maintain and repair commercial building systems.',
  ARRAY[
    'Electrical systems',
    'Plumbing basics',
    'HVAC fundamentals',
    'Safety protocols',
    'Preventive maintenance'
  ],
  ARRAY['WIOA', 'Apprenticeship'],
  '/images/building.jpg'
),
(
  'digital-skills',
  'Digital Skills Training',
  'Get job-ready digital skills',
  'Essential computer and digital literacy for modern workplaces.',
  'Master Microsoft Office, Google Workspace, and professional communication.',
  ARRAY[
    'Microsoft Office Suite',
    'Google Workspace',
    'Email and communication',
    'Online collaboration',
    'Digital citizenship'
  ],
  ARRAY['WIOA', 'WRG'],
  '/images/digital.jpg'
)
on conflict (slug) do update set
  title = excluded.title,
  tagline = excluded.tagline,
  description = excluded.description,
  summary = excluded.summary,
  bullets = excluded.bullets,
  funding = excluded.funding,
  hero_image = excluded.hero_image,
  updated_at = now();
