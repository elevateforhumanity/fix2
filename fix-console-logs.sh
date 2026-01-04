#!/bin/bash

# Fix all console.log/error/warn to use logger
# This script replaces console statements with proper logging

echo "🔧 Fixing Console Logs"
echo "======================"
echo ""

# Count total console statements
TOTAL=$(find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "console\." {} \; | wc -l)
echo "Found $TOTAL files with console statements"
echo ""

# Replace console.error with logger.error
echo "Replacing console.error..."
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/console\.error(/logger.error(/g' {} \;

# Replace console.log with logger.info
echo "Replacing console.log..."
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/console\.log(/logger.info(/g' {} \;

# Replace console.warn with logger.warn
echo "Replacing console.warn..."
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/console\.warn(/logger.warn(/g' {} \;

# Replace console.debug with logger.debug
echo "Replacing console.debug..."
find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i 's/console\.debug(/logger.debug(/g' {} \;

# Count remaining console statements
REMAINING=$(find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "console\." {} \; | wc -l)

echo ""
echo "✅ Replaced console statements"
echo "   Remaining files with console: $REMAINING"
echo ""

# Now add logger imports where needed
echo "Adding logger imports..."

# Find files that use logger but don't import it
for file in $(find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "logger\." {} \;); do
  # Check if file already imports logger
  if ! grep -q "import.*logger.*from.*@/lib/logger" "$file"; then
    # Check if file has any imports
    if grep -q "^import" "$file"; then
      # Add logger import after first import
      sed -i "0,/^import/s//import { logger } from '@\/lib\/logger';\nimport/" "$file"
    else
      # Add logger import at the top (after 'use client' or 'use server' if present)
      if grep -q "^'use " "$file"; then
        sed -i "/^'use /a import { logger } from '@/lib/logger';" "$file"
      else
        sed -i "1i import { logger } from '@/lib/logger';" "$file"
      fi
    fi
  fi
done

echo "✅ Added logger imports"
echo ""

# Verify
LOGGER_FILES=$(find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "logger\." {} \; | wc -l)
LOGGER_IMPORTS=$(find app lib -type f \( -name "*.ts" -o -name "*.tsx" \) -exec grep -l "import.*logger" {} \; | wc -l)

echo "📊 Summary:"
echo "   Files using logger: $LOGGER_FILES"
echo "   Files importing logger: $LOGGER_IMPORTS"
echo ""

if [ $REMAINING -eq 0 ]; then
  echo "✅ All console statements replaced!"
else
  echo "⚠️  $REMAINING files still have console statements"
  echo "   These may need manual review"
fi
