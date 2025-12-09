-- Check what enum values are valid for partner_delivery_mode
SELECT 
  enumlabel as valid_value
FROM pg_enum
WHERE enumtypid = (
  SELECT oid 
  FROM pg_type 
  WHERE typname = 'partner_delivery_mode'
)
ORDER BY enumsortorder;
