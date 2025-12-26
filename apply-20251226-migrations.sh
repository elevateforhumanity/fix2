#!/bin/bash
export SUPABASE_ACCESS_TOKEN='sbp_6a0b18ab48ff439e067802559f0a50f3d30035d3'

echo "=== APPLYING 20251226 MIGRATIONS INDIVIDUALLY ==="

for file in supabase/migrations/20251226_*.sql; do
  filename=$(basename "$file")
  echo ""
  echo "Applying: $filename"
  
  # Read SQL content
  sql_content=$(cat "$file")
  
  # Apply via Supabase CLI
  echo "$sql_content" | npx supabase db execute --file - 2>&1 | head -20
  
  if [ $? -eq 0 ]; then
    echo "✓ SUCCESS: $filename"
  else
    echo "✗ FAILED: $filename"
  fi
done

echo ""
echo "=== MIGRATION APPLICATION COMPLETE ==="
