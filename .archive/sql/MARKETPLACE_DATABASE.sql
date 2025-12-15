-- Creator Marketplace Database Setup
-- Run this in Supabase SQL Editor

-- Table 1: Marketplace Creators
CREATE TABLE IF NOT EXISTS marketplace_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  bio TEXT,
  payout_method TEXT,
  payout_email TEXT,
  revenue_split NUMERIC DEFAULT 0.7,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 2: Marketplace Products
CREATE TABLE IF NOT EXISTS marketplace_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES marketplace_creators(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL CHECK (price_cents > 0),
  stripe_price_id TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  category TEXT,
  status TEXT DEFAULT 'draft',
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 3: Marketplace Sales
CREATE TABLE IF NOT EXISTS marketplace_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES marketplace_products(id),
  creator_id UUID REFERENCES marketplace_creators(id),
  buyer_email TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  creator_earnings_cents INTEGER NOT NULL,
  platform_earnings_cents INTEGER NOT NULL,
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  download_token TEXT UNIQUE,
  download_expires_at TIMESTAMPTZ,
  paid_out BOOLEAN DEFAULT FALSE,
  payout_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table 4: Product Reports
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

-- Indexes for Performance
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

-- Timestamp Update Functions
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

-- Triggers
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

-- Enable Row Level Security
ALTER TABLE marketplace_creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for marketplace_creators
DROP POLICY IF EXISTS "Anyone can view approved creators" ON marketplace_creators;
CREATE POLICY "Anyone can view approved creators" ON marketplace_creators
  FOR SELECT USING (status = 'approved');

DROP POLICY IF EXISTS "Users can manage own creator profile" ON marketplace_creators;
CREATE POLICY "Users can manage own creator profile" ON marketplace_creators
  FOR ALL USING (user_id = auth.uid());

-- RLS Policies for marketplace_products
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

-- RLS Policies for marketplace_sales
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

-- RLS Policies for product_reports
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
