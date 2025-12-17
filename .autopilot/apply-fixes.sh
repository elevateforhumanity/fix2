#!/bin/bash
# Automated TypeScript error fixes
# Applies systematic fixes to common patterns

set -e

echo "🔧 Starting automated TypeScript fixes..."

# Fix 1: Add await to createClient() calls
echo "📝 Fix 1: Adding await to createClient() calls..."
find app lib components -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/const \([a-zA-Z_][a-zA-Z0-9_]*\) = createClient()/const \1 = await createClient()/g' {} \;

# Fix 2: Add missing Link imports
echo "📝 Fix 2: Adding missing Link imports..."
for file in $(grep -rl "<Link" app --include="*.tsx" --include="*.ts"); do
  if ! grep -q "import Link from 'next/link'" "$file"; then
    # Find first import line and add Link import after it
    sed -i '0,/^import /s//import Link from '\''next\/link'\'';\nimport /' "$file"
  fi
done

# Fix 3: Add missing resend imports
echo "📝 Fix 3: Adding missing resend imports..."
for file in $(grep -rl "resend\." app --include="*.ts"); do
  if ! grep -q "Resend" "$file"; then
    sed -i '0,/^import /s//import { Resend } from '\''resend'\'';\nconst resend = new Resend(process.env.RESEND_API_KEY);\nimport /' "$file"
  fi
done

echo "✅ Automated fixes complete!"
echo "📊 Running typecheck to see progress..."
pnpm -s typecheck 2>&1 | tail -20
