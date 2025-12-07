#!/bin/bash
# Fix all marketing pages - remove gradients, add hero images, professional content

echo "Fixing marketing pages for government compliance..."

# List of pages to fix
pages=(
  "faq"
  "features"
  "pricing"
  "what-we-do"
  "what-we-offer"
  "careers"
  "press"
  "partners"
)

for page in "${pages[@]}"; do
  if [ -f "app/$page/page.tsx" ]; then
    echo "Processing: $page"
    # Check if has gradient
    if grep -q "bg-gradient" "app/$page/page.tsx"; then
      echo "  - Has gradient (needs manual fix)"
    fi
    # Check if has placeholder content
    if grep -q "Discover more about" "app/$page/page.tsx"; then
      echo "  - Has placeholder content (needs manual fix)"
    fi
  fi
done

echo "Done. Manual fixes required for pages listed above."
