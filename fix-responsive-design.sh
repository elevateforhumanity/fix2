#!/bin/bash

echo "🎨 Fixing responsive design for all pages..."
echo ""

# List of pages to fix
PAGES=(
  "app/documents/upload/page.tsx"
  "app/partner/courses/create/page.tsx"
  "app/licenses/purchase/page.tsx"
  "app/enroll/[programId]/page.tsx"
  "app/admin/licenses/page.tsx"
  "app/admin/dashboard/page.tsx"
)

echo "Pages to fix:"
for page in "${PAGES[@]}"; do
  echo "  - $page"
done

echo ""
echo "Applying responsive fixes..."
