-- MARKETPLACE DATABASE - PART 2
-- Run this AFTER the main tables are created
-- This adds: Product Reports, Indexes, Triggers, and RLS Policies

-- ============================================
-- TABLE 4: Product Reports
-- ============================================
CREATE TABLE IF NOT EXISTS product_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES marketplace_products(id) ON DELETE CASCADE,
  reporter_email TEXT,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT DEFAULT 'pending',
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- INDEXES (for faster queries)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_marketplace_creators_user ON marketplace_creators(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_creators_status ON marketplace_creators(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_creator ON marketplace_products(creator_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_status ON marketplace_products(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_creator ON marketplace_sales(creator_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_product ON marketplace_sales(product_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_session ON marketplace_sales(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_token ON marketplace_sales(download_token);
CREATE INDEX IF NOT EXISTS idx_marketplace_sales_paidout ON marketplace_sales(paid_out);
CREATE INDEX IF NOT EXISTS idx_product_reports_product ON product_reports(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reports_status ON product_reports(status);
CREATE INDEX IF NOT EXISTS idx_product_reports_created ON product_reports(created_at DESC);

-- ============================================
-- TIMESTAMP UPDATE FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION update_marketplace_creators_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_marketplace_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS (auto-update timestamps)
-- ============================================
DROP TRIGGER IF EXISTS trigger_update_marketplace_creators_updated_at ON marketplace_creators;
CREATE TRIGGER trigger_update_marketplace_creators_updated_at
  BEFORE UPDATE ON marketplace_creators
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_creators_updated_at();

DROP TRIGGER IF EXISTS trigger_update_marketplace_products_updated_at ON marketplace_products;
CREATE TRIGGER trigger_update_marketplace_products_updated_at
  BEFORE UPDATE ON marketplace_products
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_products_updated_at();

-- ============================================
-- ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE product_reports ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - marketplace_creators
-- ============================================
DROP POLICY IF EXISTS "Anyone can view approved creators" ON marketplace_creators;
CREATE POLICY "Anyone can view approved creators" ON marketplace_creators
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Users can manage own creator profile" ON marketplace_creators;
CREATE POLICY "Users can manage own creator profile" ON marketplace_creators
  FOR ALL USING (user_id = auth.uid());

-- ============================================
-- RLS POLICIES - marketplace_products
-- ============================================
DROP POLICY IF EXISTS "Anyone can view approved products" ON marketplace_products;
CREATE POLICY "Anyone can view approved products" ON marketplace_products
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Creators can manage own products" ON marketplace_products;
CREATE POLICY "Creators can manage own products" ON marketplace_products
  FOR ALL USING (
    creator_id IN (
      SELECT id FROM marketplace_creators WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- RLS POLICIES - marketplace_sales
-- ============================================
DROP POLICY IF EXISTS "Allow webhook inserts" ON marketplace_sales;
CREATE POLICY "Allow webhook inserts" ON marketplace_sales
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Creators can view own sales" ON marketplace_sales;
CREATE POLICY "Creators can view own sales" ON marketplace_sales
  FOR SELECT USING (
    creator_id IN (
      SELECT id FROM marketplace_creators WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Buyers can access via download token" ON marketplace_sales;
CREATE POLICY "Buyers can access via download token" ON marketplace_sales
  FOR SELECT USING (download_token IS NOT NULL);

-- ============================================
-- RLS POLICIES - product_reports
-- ============================================
DROP POLICY IF EXISTS "Anyone can submit reports" ON product_reports;
CREATE POLICY "Anyone can submit reports" ON product_reports
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view reports" ON product_reports;
CREATE POLICY "Admins can view reports" ON product_reports
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%admin%' OR
        auth.users.email LIKE '%elevate%'
      )
    )
  );

DROP POLICY IF EXISTS "Admins can update reports" ON product_reports;
CREATE POLICY "Admins can update reports" ON product_reports
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND (
        auth.users.email LIKE '%admin%' OR
        auth.users.email LIKE '%elevate%'
      )
    )
  );
