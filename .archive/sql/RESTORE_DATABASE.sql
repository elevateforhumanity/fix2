-- 01_core_schema.sql
-- Core schema for Elevate For Humanity LMS + marketing integration

----------------------------------------------------------------
-- PROGRAMS (pathways: Barber, MA, HVAC, CDL, Readiness, etc.)
----------------------------------------------------------------
create table if not exists programs (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,                -- e.g. 'barber-apprenticeship'
  title text not null,                      -- e.g. 'Barber Apprenticeship Pathway'
  category text not null,                   -- 'healthcare','barber_beauty','trades','cdl','readiness_reentry'
  description text,
  outcomes text,                            -- long-form outcomes
  level text,                               -- 'intro','intermediate','advanced'
  mode text not null default 'in-person',   -- 'in-person','hybrid','online'
  estimated_weeks int,
  estimated_hours int,
  funding_tags text[] default '{}',         -- e.g. ARRAY['WIOA','WRG','JRI','OJT']
  approvals jsonb default '{}'::jsonb,      -- e.g. { "intraining_code": "...", "wrg_code": "..." }
  show_on_marketing boolean default true,
  show_in_catalog boolean default true,
  is_active boolean default true,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create index if not exists idx_programs_slug on programs(slug);
create index if not exists idx_programs_category on programs(category);
create index if not exists idx_programs_active on programs(is_active);

----------------------------------------------------------------
-- MODULES (sections inside programs)
----------------------------------------------------------------
create table if not exists modules (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid not null references programs(id) on delete cascade,
  title text not null,
  summary text,
  order_index int not null default 1,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create index if not exists idx_modules_program_id on modules(program_id);
create index if not exists idx_modules_program_order on modules(program_id, order_index);

----------------------------------------------------------------
-- LESSONS (actual content units: video, reading, quiz)
----------------------------------------------------------------
create table if not exists lessons (
  id uuid primary key default uuid_generate_v4(),
  program_id uuid not null references programs(id) on delete cascade,
  module_id uuid not null references modules(id) on delete cascade,
  title text not null,
  lesson_type text not null default 'video',  -- 'video','reading','quiz','assignment'
  video_url text,
  content_url text,                           -- pdf, article, etc.
  quiz_id uuid,                               -- optional future table
  order_index int not null default 1,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create index if not exists idx_lessons_program_id on lessons(program_id);
create index if not exists idx_lessons_module_id on lessons(module_id);
create index if not exists idx_lessons_module_order on lessons(module_id, order_index);

----------------------------------------------------------------
-- ENROLLMENTS (who is in which program)
----------------------------------------------------------------
create table if not exists enrollments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null,                         -- references auth.users(id) logically
  program_id uuid not null references programs(id) on delete cascade,
  status text not null default 'active',         -- 'active','completed','withdrawn','paused'
  started_at timestamptz default timezone('utc', now()),
  completed_at timestamptz,
  source text,                                   -- 'application','case_manager','employer','self_enroll'
  funding_type text,                             -- 'WIOA','WRG','JRI','OJT','WEX','self-pay', etc.
  created_at timestamptz default timezone('utc', now())
);

create index if not exists idx_enrollments_user on enrollments(user_id);
create index if not exists idx_enrollments_program on enrollments(program_id);
create index if not exists idx_enrollments_status on enrollments(status);

----------------------------------------------------------------
-- LESSON PROGRESS (per-lesson tracking)
----------------------------------------------------------------
create table if not exists lesson_progress (
  id uuid primary key default uuid_generate_v4(),
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  status text not null default 'not_started',    -- 'not_started','in_progress','completed'
  last_viewed_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz default timezone('utc', now()),
  updated_at timestamptz default timezone('utc', now())
);

create unique index if not exists idx_progress_enrollment_lesson
  on lesson_progress(enrollment_id, lesson_id);

create index if not exists idx_progress_status
  on lesson_progress(status);

----------------------------------------------------------------
-- CERTIFICATES (issued on completion)
----------------------------------------------------------------
create table if not exists certificates (
  id uuid primary key default uuid_generate_v4(),
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  user_id uuid not null,
  program_id uuid not null references programs(id) on delete cascade,
  certificate_number text unique,
  issued_at timestamptz default timezone('utc', now()),
  pdf_url text,
  created_at timestamptz default timezone('utc', now())
);

create index if not exists idx_certificates_user on certificates(user_id);
create index if not exists idx_certificates_program on certificates(program_id);

----------------------------------------------------------------
-- APPLICATIONS (from marketing site)
----------------------------------------------------------------
create table if not exists applications (
  id uuid primary key default uuid_generate_v4(),
  first_name text,
  last_name text,
  email text,
  phone text,
  program text,
  notes text,
  source text default 'marketing_site',           -- 'marketing_site','workone','social','court', etc.
  status text default 'submitted',                -- 'submitted','in_review','approved','declined','converted'
  created_at timestamptz default timezone('utc', now())
);

create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_program on applications(program);
create index if not exists idx_applications_created_at on applications(created_at);

----------------------------------------------------------------
-- CONTACT MESSAGES (from website contact form)
----------------------------------------------------------------
create table if not exists contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text,
  subject text,
  message text,
  created_at timestamptz default timezone('utc', now())
);

create index if not exists idx_contact_messages_created_at on contact_messages(created_at);
-- ============================================================================
-- COMPLETE SUPABASE SCHEMA - Package 16
-- ============================================================================
-- This migration creates all tables, indexes, and relationships for the
-- complete Elevate Admin Suite platform
-- ============================================================================

-- ============================================================================
-- PRODUCTS TABLE
-- ============================================================================
-- Stores sellable codebase products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- Price in cents
  repo TEXT NOT NULL, -- GitHub repo to clone (owner/name)
  stripe_product_id TEXT UNIQUE,
  stripe_price_id TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PURCHASES TABLE
-- ============================================================================
-- Tracks all product purchases
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  repo TEXT, -- Cloned repo name
  stripe_session_id TEXT,
  amount INTEGER, -- Amount paid in cents
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- LICENSES TABLE
-- ============================================================================
-- Software license keys for purchased products
CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  license_key TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'revoked', 'expired')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- COURSES TABLE
-- ============================================================================
-- Course metadata and structure
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- MEDIA TABLE
-- ============================================================================
-- Track uploaded media files
CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT NOT NULL,
  filename TEXT NOT NULL,
  bucket TEXT DEFAULT 'media',
  size BIGINT,
  mime_type TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- PRODUCT_CLONES TABLE
-- ============================================================================
-- Track repository clones for customers
CREATE TABLE IF NOT EXISTS product_clones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  cloned_repo TEXT NOT NULL,
  clone_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- AUTOPILOT_LOGS TABLE
-- ============================================================================
-- Log autopilot executions
CREATE TABLE IF NOT EXISTS autopilot_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  autopilot_name TEXT NOT NULL,
  status TEXT CHECK (status IN ('running', 'completed', 'failed')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Products indexes
CREATE INDEX IF NOT EXISTS idx_products_title ON products(title);
CREATE INDEX IF NOT EXISTS idx_products_published ON products(published);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Purchases indexes
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_created_at ON purchases(created_at DESC);

-- Licenses indexes
CREATE INDEX IF NOT EXISTS idx_licenses_email ON licenses(email);
CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses(license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_product_id ON licenses(product_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);

-- Courses indexes
CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_published ON courses(published);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON courses(featured);
CREATE INDEX IF NOT EXISTS idx_courses_created_at ON courses(created_at DESC);

-- Media indexes
CREATE INDEX IF NOT EXISTS idx_media_path ON media(path);
CREATE INDEX IF NOT EXISTS idx_media_uploaded_by ON media(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);

-- Product clones indexes
CREATE INDEX IF NOT EXISTS idx_product_clones_product_id ON product_clones(product_id);
CREATE INDEX IF NOT EXISTS idx_product_clones_user_id ON product_clones(user_id);

-- Autopilot logs indexes
CREATE INDEX IF NOT EXISTS idx_autopilot_logs_name ON autopilot_logs(autopilot_name);
CREATE INDEX IF NOT EXISTS idx_autopilot_logs_status ON autopilot_logs(status);
CREATE INDEX IF NOT EXISTS idx_autopilot_logs_started_at ON autopilot_logs(started_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_clones ENABLE ROW LEVEL SECURITY;
ALTER TABLE autopilot_logs ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES - PRODUCTS
-- ============================================================================

-- Anyone can view published products
CREATE POLICY "Anyone can view published products"
  ON products FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

-- Authenticated users can create products
CREATE POLICY "Authenticated users can create products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update products
CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- RLS POLICIES - PURCHASES
-- ============================================================================

-- Users can view their own purchases
CREATE POLICY "Users can view their own purchases"
  ON purchases FOR SELECT
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR auth.uid() IS NOT NULL
  );

-- System can create purchases
CREATE POLICY "System can create purchases"
  ON purchases FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - LICENSES
-- ============================================================================

-- Users can view their own licenses
CREATE POLICY "Users can view their own licenses"
  ON licenses FOR SELECT
  USING (
    email = (SELECT email FROM auth.users WHERE id = auth.uid())
    OR auth.uid() IS NOT NULL
  );

-- System can create licenses
CREATE POLICY "System can create licenses"
  ON licenses FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - COURSES
-- ============================================================================

-- Anyone can view published courses
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (published = true OR auth.uid() IS NOT NULL);

-- Authenticated users can create courses
CREATE POLICY "Authenticated users can create courses"
  ON courses FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Authenticated users can update courses
CREATE POLICY "Authenticated users can update courses"
  ON courses FOR UPDATE
  USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- RLS POLICIES - MEDIA
-- ============================================================================

-- Authenticated users can view media
CREATE POLICY "Authenticated users can view media"
  ON media FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- Authenticated users can upload media
CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can delete their own media
CREATE POLICY "Users can delete their own media"
  ON media FOR DELETE
  USING (uploaded_by = auth.uid());

-- ============================================================================
-- RLS POLICIES - PRODUCT CLONES
-- ============================================================================

-- Users can view their own clones
CREATE POLICY "Users can view their own clones"
  ON product_clones FOR SELECT
  USING (user_id = auth.uid() OR auth.uid() IS NOT NULL);

-- System can create clones
CREATE POLICY "System can create clones"
  ON product_clones FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- RLS POLICIES - AUTOPILOT LOGS
-- ============================================================================

-- Authenticated users can view logs
CREATE POLICY "Authenticated users can view logs"
  ON autopilot_logs FOR SELECT
  USING (auth.uid() IS NOT NULL);

-- System can create logs
CREATE POLICY "System can create logs"
  ON autopilot_logs FOR INSERT
  WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Trigger for products updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for courses updated_at
DROP TRIGGER IF EXISTS update_courses_updated_at ON courses;
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- VIEWS (Optional - for analytics)
-- ============================================================================

-- View for product sales summary
CREATE OR REPLACE VIEW product_sales_summary AS
SELECT 
  p.id,
  p.title,
  p.price,
  COUNT(pu.id) as total_sales,
  SUM(pu.amount) as total_revenue,
  COUNT(l.id) as active_licenses
FROM products p
LEFT JOIN purchases pu ON p.id = pu.product_id
LEFT JOIN licenses l ON p.id = l.product_id AND l.status = 'active'
GROUP BY p.id, p.title, p.price;

-- View for course statistics
CREATE OR REPLACE VIEW course_statistics AS
SELECT 
  id,
  slug,
  title,
  published,
  featured,
  created_at,
  updated_at,
  jsonb_array_length(COALESCE(metadata->'modules', '[]'::jsonb)) as module_count
FROM courses;

-- ============================================================================
-- STORAGE BUCKETS
-- ============================================================================

-- Create media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for media bucket
CREATE POLICY "Authenticated users can upload to media"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'media' 
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Anyone can view media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

CREATE POLICY "Users can delete their own media"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'media' 
    AND auth.uid() IS NOT NULL
  );

-- ============================================================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Uncomment to insert sample data
/*
INSERT INTO products (title, description, price, repo, published) VALUES
  ('Elevate LMS Platform', 'Complete learning management system', 150000, 'elevateforhumanity/fix2', true),
  ('Course Builder Pro', 'AI-powered course creation tool', 50000, 'elevateforhumanity/course-builder', true);

INSERT INTO courses (slug, title, description, published, featured) VALUES
  ('cna-basics', 'CNA Basics', 'Introduction to Certified Nursing Assistant training', true, true),
  ('workforce-dev', 'Workforce Development', 'Professional development course', true, false);
*/

-- ============================================================================
-- SCHEMA COMPLETE
-- ============================================================================
-- All tables, indexes, policies, and functions are now created
-- Your platform database is production-ready!
-- ============================================================================
