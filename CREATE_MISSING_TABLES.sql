-- CREATE ALL MISSING TABLES

-- student_progress
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  course_id UUID,
  module_id UUID,
  lesson_id UUID,
  progress_percentage INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  last_accessed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_progress_student ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_course ON student_progress(course_id);

-- cash_advances
CREATE TABLE IF NOT EXISTS cash_advances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID,
  disbursed_at TIMESTAMPTZ,
  repayment_status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cash_advances_student ON cash_advances(student_id);
CREATE INDEX IF NOT EXISTS idx_cash_advances_status ON cash_advances(status);

-- external_modules
CREATE TABLE IF NOT EXISTS external_modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID,
  title TEXT NOT NULL,
  description TEXT,
  external_url TEXT,
  provider TEXT,
  duration_minutes INTEGER,
  sort_order INTEGER,
  is_required BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_external_modules_course ON external_modules(course_id);

-- blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  content TEXT,
  excerpt TEXT,
  author_id UUID,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts(author_id);

-- user_profiles (if different from profiles)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_user ON user_profiles(user_id);

-- tax_applications
CREATE TABLE IF NOT EXISTS tax_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  tax_year INTEGER,
  application_type TEXT,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tax_applications_student ON tax_applications(student_id);
CREATE INDEX IF NOT EXISTS idx_tax_applications_year ON tax_applications(tax_year);

-- signatures
CREATE TABLE IF NOT EXISTS signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  document_type TEXT,
  document_id UUID,
  signature_data TEXT,
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_signatures_user ON signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_signatures_document ON signatures(document_type, document_id);

-- shop_orders
CREATE TABLE IF NOT EXISTS shop_orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID,
  customer_id UUID,
  order_number TEXT UNIQUE,
  total_amount DECIMAL(10,2),
  status TEXT DEFAULT 'pending',
  ordered_at TIMESTAMPTZ DEFAULT NOW(),
  fulfilled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_shop_orders_shop ON shop_orders(shop_id);
CREATE INDEX IF NOT EXISTS idx_shop_orders_customer ON shop_orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_shop_orders_status ON shop_orders(status);

-- job_placements
CREATE TABLE IF NOT EXISTS job_placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  employer_id UUID,
  job_title TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active',
  hourly_wage DECIMAL(10,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_job_placements_student ON job_placements(student_id);
CREATE INDEX IF NOT EXISTS idx_job_placements_employer ON job_placements(employer_id);

-- analytics_events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  event_type TEXT,
  event_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_user ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created ON analytics_events(created_at);

-- partner_inquiries
CREATE TABLE IF NOT EXISTS partner_inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  email TEXT,
  phone TEXT,
  organization TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_partner_inquiries_status ON partner_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_partner_inquiries_email ON partner_inquiries(email);

-- license_requests
CREATE TABLE IF NOT EXISTS license_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  license_type TEXT,
  status TEXT DEFAULT 'pending',
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  approved_by UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_license_requests_user ON license_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_license_requests_status ON license_requests(status);

-- onboarding_progress
CREATE TABLE IF NOT EXISTS onboarding_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  role TEXT,
  is_complete BOOLEAN DEFAULT FALSE,
  current_step INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_progress_user ON onboarding_progress(user_id);

-- onboarding_packets
CREATE TABLE IF NOT EXISTS onboarding_packets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT,
  title TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_packets_role ON onboarding_packets(role);

-- onboarding_documents
CREATE TABLE IF NOT EXISTS onboarding_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  packet_id UUID,
  title TEXT,
  document_url TEXT,
  requires_signature BOOLEAN DEFAULT FALSE,
  sort_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_documents_packet ON onboarding_documents(packet_id);

-- onboarding_signatures
CREATE TABLE IF NOT EXISTS onboarding_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  document_id UUID,
  signature_data TEXT,
  signed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_onboarding_signatures_user ON onboarding_signatures(user_id);
CREATE INDEX IF NOT EXISTS idx_onboarding_signatures_document ON onboarding_signatures(document_id);

-- payout_rate_configs
CREATE TABLE IF NOT EXISTS payout_rate_configs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT,
  rate_type TEXT,
  rate_amount DECIMAL(10,2),
  effective_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payout_rate_configs_role ON payout_rate_configs(role);

-- transfer_hours
CREATE TABLE IF NOT EXISTS transfer_hours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID,
  course_id UUID,
  hours_transferred INTEGER,
  source_institution TEXT,
  approved_by UUID,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_transfer_hours_student ON transfer_hours(student_id);
CREATE INDEX IF NOT EXISTS idx_transfer_hours_course ON transfer_hours(course_id);

-- Enable RLS on all new tables
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_advances ENABLE ROW LEVEL SECURITY;
ALTER TABLE external_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tax_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE shop_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_placements ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE license_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_packets ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_signatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE payout_rate_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_hours ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies
CREATE POLICY "Users can view own progress" ON student_progress FOR ALL TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Users can view own cash advances" ON cash_advances FOR ALL TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Anyone can view published blog posts" ON blog_posts FOR SELECT TO authenticated USING (published = true);
CREATE POLICY "Users can view own profile" ON user_profiles FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can view own tax applications" ON tax_applications FOR ALL TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Users can view own signatures" ON signatures FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can view own job placements" ON job_placements FOR ALL TO authenticated USING (student_id = auth.uid());
CREATE POLICY "Users can view own license requests" ON license_requests FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can view own onboarding progress" ON onboarding_progress FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Anyone can view active onboarding packets" ON onboarding_packets FOR SELECT TO authenticated USING (is_active = true);
CREATE POLICY "Users can view own onboarding signatures" ON onboarding_signatures FOR ALL TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users can view own transfer hours" ON transfer_hours FOR ALL TO authenticated USING (student_id = auth.uid());

-- Add triggers
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_student_progress_updated_at ON student_progress;
CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cash_advances_updated_at ON cash_advances;
CREATE TRIGGER update_cash_advances_updated_at BEFORE UPDATE ON cash_advances FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_external_modules_updated_at ON external_modules;
CREATE TRIGGER update_external_modules_updated_at BEFORE UPDATE ON external_modules FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tax_applications_updated_at ON tax_applications;
CREATE TRIGGER update_tax_applications_updated_at BEFORE UPDATE ON tax_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shop_orders_updated_at ON shop_orders;
CREATE TRIGGER update_shop_orders_updated_at BEFORE UPDATE ON shop_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_job_placements_updated_at ON job_placements;
CREATE TRIGGER update_job_placements_updated_at BEFORE UPDATE ON job_placements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_partner_inquiries_updated_at ON partner_inquiries;
CREATE TRIGGER update_partner_inquiries_updated_at BEFORE UPDATE ON partner_inquiries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_license_requests_updated_at ON license_requests;
CREATE TRIGGER update_license_requests_updated_at BEFORE UPDATE ON license_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_onboarding_progress_updated_at ON onboarding_progress;
CREATE TRIGGER update_onboarding_progress_updated_at BEFORE UPDATE ON onboarding_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_onboarding_packets_updated_at ON onboarding_packets;
CREATE TRIGGER update_onboarding_packets_updated_at BEFORE UPDATE ON onboarding_packets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_onboarding_documents_updated_at ON onboarding_documents;
CREATE TRIGGER update_onboarding_documents_updated_at BEFORE UPDATE ON onboarding_documents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payout_rate_configs_updated_at ON payout_rate_configs;
CREATE TRIGGER update_payout_rate_configs_updated_at BEFORE UPDATE ON payout_rate_configs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_transfer_hours_updated_at ON transfer_hours;
CREATE TRIGGER update_transfer_hours_updated_at BEFORE UPDATE ON transfer_hours FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
