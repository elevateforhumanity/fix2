-- Tenant billing for Stripe
CREATE TABLE IF NOT EXISTS tenant_billing (
  tenant_id uuid PRIMARY KEY REFERENCES tenants(id) ON DELETE CASCADE,
  stripe_customer_id text,
  stripe_subscription_id text,
  price_id text, -- Stripe price for per-active-learner or similar
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tenant_usage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  metric_key text NOT NULL, -- e.g. 'active_learners'
  quantity integer NOT NULL,
  period_start timestamptz NOT NULL,
  period_end timestamptz NOT NULL,
  reported_to_stripe boolean NOT NULL DEFAULT false,
  stripe_usage_record_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- WIOA/DOL reporting
CREATE TABLE IF NOT EXISTS wioa_participant_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid NOT NULL,
  tenant_id uuid NULL,
  program_id uuid NULL,
  reporting_period_start date NOT NULL,
  reporting_period_end date NOT NULL,
  ssn_last4 text,
  date_of_birth date,
  gender text,
  race_ethnicity text,
  veteran_status text,
  disability_status text,
  employment_status_at_entry text,
  education_level_at_entry text,
  program_entry_date date,
  program_exit_date date,
  employed_q2_after_exit boolean,
  employed_q4_after_exit boolean,
  median_earnings_q2 numeric(10,2),
  credential_attained boolean,
  measurable_skill_gain boolean,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
