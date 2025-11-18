-- Multi-Tenant White-Labeling
-- Migration: 20251118_tenant_whitelabel

-- Add white-labeling columns to tenants table
ALTER TABLE tenants
ADD COLUMN IF NOT EXISTS custom_domain text,
ADD COLUMN IF NOT EXISTS custom_css text,
ADD COLUMN IF NOT EXISTS custom_logo_url text,
ADD COLUMN IF NOT EXISTS primary_color text DEFAULT '#f97316',
ADD COLUMN IF NOT EXISTS secondary_color text DEFAULT '#0f172a',
ADD COLUMN IF NOT EXISTS custom_favicon_url text;

-- Create index for custom domain lookups
CREATE INDEX IF NOT EXISTS idx_tenants_custom_domain ON tenants(custom_domain);

-- Add unique constraint for custom domains
ALTER TABLE tenants ADD CONSTRAINT unique_custom_domain UNIQUE (custom_domain);
