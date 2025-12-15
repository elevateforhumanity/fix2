#!/bin/bash
# Fix duplicate imports in client components

echo "🔧 Fixing client component imports..."

FILES=(
  "app/admin/autopilots/page.tsx"
  "app/admin/course-studio/page.tsx"
  "app/admin/course-studio-ai/page.tsx"
  "app/admin/course-studio-simple/page.tsx"
  "app/admin/dev-studio/page.tsx"
  "app/admin/editor/page.tsx"
  "app/admin/email-marketing/analytics/page.tsx"
  "app/admin/email-marketing/automation/new/page.tsx"
  "app/admin/email-marketing/automation/page.tsx"
  "app/admin/email-marketing/campaigns/new/page.tsx"
  "app/admin/email-marketing/page.tsx"
  "app/admin/live-chat/page.tsx"
  "app/admin/media-studio/page.tsx"
  "app/admin/social-media/campaigns/new/page.tsx"
  "app/admin/social-media/page.tsx"
)

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Remove duplicate useState import if exists
    sed -i '/^import { useEffect } from/,/^import { useRouter } from/{
      /^import { useState } from/d
    }' "$file"
    
    # Combine useState with useEffect if needed
    if grep -q "import { useEffect }" "$file" && grep -q "useState" "$file"; then
      sed -i "s/import { useEffect } from 'react';/import { useEffect, useState } from 'react';/" "$file"
    fi
    
    echo "  ✅ Fixed: $file"
  fi
done

echo ""
echo "✅ Client component imports fixed!"
