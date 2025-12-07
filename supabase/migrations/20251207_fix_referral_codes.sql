-- Fix referral_codes table if it exists without enabled column
DO $$ 
BEGIN
  -- Check if referral_codes table exists
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'referral_codes') THEN
    -- Check if enabled column exists
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'referral_codes' 
      AND column_name = 'enabled'
    ) THEN
      -- Add enabled column if it doesn't exist
      ALTER TABLE referral_codes ADD COLUMN enabled BOOLEAN DEFAULT true;
      RAISE NOTICE 'Added enabled column to referral_codes table';
    END IF;
    
    -- Ensure index exists
    IF NOT EXISTS (
      SELECT FROM pg_indexes 
      WHERE tablename = 'referral_codes' 
      AND indexname = 'idx_referral_codes_enabled'
    ) THEN
      CREATE INDEX idx_referral_codes_enabled ON referral_codes(enabled);
      RAISE NOTICE 'Created index on referral_codes.enabled';
    END IF;
  ELSE
    RAISE NOTICE 'referral_codes table does not exist, skipping';
  END IF;
END $$;

-- Fix webhooks table if it exists without enabled column
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'webhooks') THEN
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'webhooks' 
      AND column_name = 'enabled'
    ) THEN
      ALTER TABLE webhooks ADD COLUMN enabled BOOLEAN DEFAULT true;
      RAISE NOTICE 'Added enabled column to webhooks table';
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM pg_indexes 
      WHERE tablename = 'webhooks' 
      AND indexname = 'idx_webhooks_enabled'
    ) THEN
      CREATE INDEX idx_webhooks_enabled ON webhooks(enabled);
      RAISE NOTICE 'Created index on webhooks.enabled';
    END IF;
  END IF;
END $$;

-- Fix moderation_rules table if it exists without enabled column
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'moderation_rules') THEN
    IF NOT EXISTS (
      SELECT FROM information_schema.columns 
      WHERE table_name = 'moderation_rules' 
      AND column_name = 'enabled'
    ) THEN
      ALTER TABLE moderation_rules ADD COLUMN enabled BOOLEAN DEFAULT true;
      RAISE NOTICE 'Added enabled column to moderation_rules table';
    END IF;
    
    IF NOT EXISTS (
      SELECT FROM pg_indexes 
      WHERE tablename = 'moderation_rules' 
      AND indexname = 'idx_moderation_rules_enabled'
    ) THEN
      CREATE INDEX idx_moderation_rules_enabled ON moderation_rules(enabled);
      RAISE NOTICE 'Created index on moderation_rules.enabled';
    END IF;
  END IF;
END $$;
