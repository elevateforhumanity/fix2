#!/bin/bash
# Cleanup duplicate routes and consolidate platform

echo "🧹 Cleaning up duplicate routes..."

# Remove duplicate apply routes (keep main ones)
rm -f app/shop/apply/page.tsx
rm -f app/program-holder/apply/page.tsx
rm -f app/program-holder/apply/confirmation/page.tsx
rm -f app/tax-filing/apply/page.tsx
rm -f app/programs/admin/apply/page.tsx
rm -f app/marketplace/apply/page.tsx
rm -f app/marketplace/apply/success/page.tsx
rm -f app/supersonic-fast-cash/apply/page.tsx
rm -f app/supersonic-fast-cash/careers/apply/page.tsx
rm -f app/serene-comfort-care/apply/page.tsx
rm -f app/financial-aid/apply/page.tsx
rm -f app/apprenticeships/apply/page.tsx
rm -f app/apply/full/page.tsx

echo "✅ Removed duplicate apply routes"

# Remove duplicate dashboard routes (keep canonical ones)
rm -rf app/board/dashboard
rm -rf app/shop/dashboard
rm -rf app/programs/admin/dashboard
rm -rf app/delegate/dashboard
rm -rf app/partner/dashboard

echo "✅ Removed duplicate dashboard routes"

# Remove old/backup files
find app -name "*-old.tsx" -delete
find app -name "*-backup.tsx" -delete
find app -name "*-new.tsx" -delete
find app -name "*-redesign.tsx" -delete

echo "✅ Removed backup files"

# Remove test pages
rm -f app/test-enrollment/page.tsx
rm -f app/test-simple/page.tsx
rm -f app/test-stripe-iframe/page.tsx

echo "✅ Removed test pages"

echo "🎉 Cleanup complete!"
