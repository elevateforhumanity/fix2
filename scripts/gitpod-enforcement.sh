#!/usr/bin/env bash
set -e

echo "🔒 Dashboard Enforcement Gate Active"

REQUIRED_FILES=(
  "docs/dashboard-inventory.md"
  "docs/dashboard-canonical-architecture.md"
  "scripts/verify-dashboard-database.sql"
)

REQUIRED_PROOF_FILES=(
  "docs/dashboard-enforcement-baseline.md"
  "docs/dashboard-schema-verification-results.md"
)

echo "Checking required documentation..."

for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing required file: $file"
    echo "STOP: Required documentation not present."
    exit 1
  fi
done

echo "Checking proof files..."

MISSING_PROOF=0
for file in "${REQUIRED_PROOF_FILES[@]}"; do
  if [ ! -f "$file" ]; then
    echo "⚠️ Proof file missing: $file"
    echo "You may NOT proceed with dashboard refactors until this exists."
    MISSING_PROOF=1
  fi
done

if [ $MISSING_PROOF -eq 1 ]; then
  echo ""
  echo "=========================================="
  echo "⚠️  PROOF FILES MISSING"
  echo "=========================================="
  echo ""
  echo "Required proof files are missing."
  echo "You must complete Phase A-C before proceeding:"
  echo ""
  echo "1. docs/dashboard-enforcement-baseline.md"
  echo "   - Run: npm install, npm run build, npm run lint"
  echo "   - Document results"
  echo ""
  echo "2. docs/dashboard-schema-verification-results.md"
  echo "   - Run: scripts/verify-dashboard-database.sql in Supabase"
  echo "   - Paste actual output"
  echo ""
  echo "See: https://github.com/elevateforhumanity/fix2/issues/1387"
  echo ""
  echo "=========================================="
  echo ""
fi

echo "✅ Documentation gate check complete"
