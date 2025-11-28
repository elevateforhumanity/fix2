#!/bin/bash

echo "🚀 DEPLOYMENT MONITOR"
echo "===================="
echo ""

# Check environment variables
echo "📋 Checking Prerequisites..."
echo ""

if [ -f ".env.local" ]; then
  echo "✅ .env.local exists"
  
  # Check required variables
  required_vars=("NEXT_PUBLIC_SUPABASE_URL" "NEXT_PUBLIC_SUPABASE_ANON_KEY" "SUPABASE_SERVICE_ROLE_KEY" "NEXT_PUBLIC_SITE_URL")
  missing=0
  
  for var in "${required_vars[@]}"; do
    if grep -q "^${var}=" .env.local 2>/dev/null; then
      echo "  ✅ $var configured"
    else
      echo "  ❌ $var missing"
      missing=$((missing + 1))
    fi
  done
  
  if [ $missing -gt 0 ]; then
    echo ""
    echo "⚠️  $missing required variable(s) missing"
    echo "Action: Edit .env.local and add missing variables"
    exit 1
  fi
else
  echo "❌ .env.local not found"
  echo ""
  echo "Action: Create .env.local file"
  echo "Run: cp .env.example .env.local"
  echo "Then edit with your Supabase credentials"
  exit 1
fi

echo ""
echo "📝 Checking TypeScript..."
pnpm run typecheck 2>&1 | grep -E "(error TS|Found [0-9]+ error)" | head -5

echo ""
echo "🏗️  Testing Build..."
pnpm run build 2>&1 | tail -20

echo ""
echo "===================="
echo "✅ Deployment Check Complete"
echo "===================="
