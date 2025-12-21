# 📋 Copy/Paste Migrations

## How to Run

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the SQL below
6. Paste into the editor
7. Click **Run** (or press Cmd/Ctrl + Enter)

---

## Migration 1: Tenant Licenses (for Stripe)

**Purpose:** Enables Stripe subscription management and license enforcement

**Copy this entire block:**

```sql
-- Add tenant_licenses table for subscription management
-- This enables Stripe-based license enforcement for Sponsor-in-a-Box

-- Create tenant_licenses table
CREATE TABLE IF NOT EXISTS tenant_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  plan TEXT NOT NULL, -- 'starter', 'pro', 'enterprise'
  max_employers INTEGER NOT NULL,
  max_apprentices INTEGER NOT NULL,
  active BOOLEAN DEFAULT true,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tenant_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_tenant_licenses_tenant ON tenant_licenses(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_licenses_stripe_sub ON tenant_licenses(stripe_subscription_id);

-- Add RLS policies
ALTER TABLE tenant_licenses ENABLE ROW LEVEL SECURITY;

-- Tenants can view their own license
CREATE POLICY "Tenants can view own license"
  ON tenant_licenses FOR SELECT
  USING (tenant_id = current_setting('app.current_tenant_id', true)::uuid);

-- Only service role can insert/update licenses (via Stripe webhooks)
CREATE POLICY "Service role can manage licenses"
  ON tenant_licenses FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_tenant_licenses_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tenant_licenses_updated_at
  BEFORE UPDATE ON tenant_licenses
  FOR EACH ROW
  EXECUTE FUNCTION update_tenant_licenses_updated_at();

-- Add license usage view for easy monitoring
CREATE OR REPLACE VIEW license_usage AS
SELECT
  tl.tenant_id,
  tl.plan,
  tl.max_employers,
  tl.max_apprentices,
  tl.active,
  COUNT(DISTINCT e.id) as current_employers,
  COUNT(DISTINCT a.id) as current_apprentices,
  ROUND((COUNT(DISTINCT e.id)::numeric / NULLIF(tl.max_employers, 0)) * 100, 1) as employer_usage_pct,
  ROUND((COUNT(DISTINCT a.id)::numeric / NULLIF(tl.max_apprentices, 0)) * 100, 1) as apprentice_usage_pct
FROM tenant_licenses tl
LEFT JOIN employers e ON e.tenant_id = tl.tenant_id
LEFT JOIN apprentices a ON a.tenant_id = tl.tenant_id
GROUP BY tl.tenant_id, tl.plan, tl.max_employers, tl.max_apprentices, tl.active;

-- Grant permissions on view
GRANT SELECT ON license_usage TO authenticated;

-- Add comment for documentation
COMMENT ON TABLE tenant_licenses IS 'Manages subscription-based license limits for tenants. Updated via Stripe webhooks.';
COMMENT ON VIEW license_usage IS 'Real-time view of license usage vs limits for monitoring and enforcement.';
```

**Expected result:** "Success. No rows returned"

---

## Migration 2: Push Tokens (for Mobile Notifications)

**Purpose:** Enables push notifications for mobile app

**Copy this entire block:**

```sql
-- Add push_tokens table for mobile push notifications
-- Stores Expo push tokens for sending notifications to mobile devices

CREATE TABLE IF NOT EXISTS push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('ios', 'android')),
  device_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, device_id)
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_push_tokens_token ON push_tokens(token);

-- Add RLS policies
ALTER TABLE push_tokens ENABLE ROW LEVEL SECURITY;

-- Users can view and manage their own tokens
CREATE POLICY "Users can view own tokens"
  ON push_tokens FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tokens"
  ON push_tokens FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tokens"
  ON push_tokens FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tokens"
  ON push_tokens FOR DELETE
  USING (auth.uid() = user_id);

-- Service role can manage all tokens (for admin operations)
CREATE POLICY "Service role can manage all tokens"
  ON push_tokens FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_push_tokens_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER push_tokens_updated_at
  BEFORE UPDATE ON push_tokens
  FOR EACH ROW
  EXECUTE FUNCTION update_push_tokens_updated_at();

-- Add notification_logs table for tracking sent notifications
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  type TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'pending')),
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_notification_logs_user ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_type ON notification_logs(type);
CREATE INDEX IF NOT EXISTS idx_notification_logs_status ON notification_logs(status);
CREATE INDEX IF NOT EXISTS idx_notification_logs_created ON notification_logs(created_at DESC);

-- Add RLS policies
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;

-- Users can view their own notification logs
CREATE POLICY "Users can view own notification logs"
  ON notification_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Only service role can insert/update logs (via backend)
CREATE POLICY "Service role can manage notification logs"
  ON notification_logs FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comments for documentation
COMMENT ON TABLE push_tokens IS 'Stores Expo push notification tokens for mobile devices';
COMMENT ON TABLE notification_logs IS 'Logs all push notifications sent to users for tracking and debugging';
```

**Expected result:** "Success. No rows returned"

---

## ✅ Verification

After running both migrations, verify they worked:

```sql
-- Check tenant_licenses table exists
SELECT * FROM tenant_licenses LIMIT 1;

-- Check push_tokens table exists
SELECT * FROM push_tokens LIMIT 1;

-- Check license_usage view exists
SELECT * FROM license_usage LIMIT 1;

-- Check notification_logs table exists
SELECT * FROM notification_logs LIMIT 1;
```

**Expected:** All queries should return "No rows" (not errors)

---

## 🎉 Done!

Both migrations are now complete. Your database is ready for:

- ✅ Stripe subscription management
- ✅ Mobile push notifications

**Time taken:** 2-4 minutes

**Next step:** Deploy your app!

```bash
npm run build && vercel --prod
```
