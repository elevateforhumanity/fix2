#!/bin/bash
# Check server-side guards on canonical dashboard routes

echo "Checking server-side guards on canonical dashboards..."
echo ""

dashboards=(
  "/workspaces/fix2/app/admin/dashboard/page.tsx"
  "/workspaces/fix2/app/lms/(app)/dashboard/page.tsx"
  "/workspaces/fix2/app/program-holder/dashboard/page.tsx"
  "/workspaces/fix2/app/employer/dashboard/page.tsx"
  "/workspaces/fix2/app/staff-portal/dashboard/page.tsx"
  "/workspaces/fix2/app/instructor/dashboard/page.tsx"
  "/workspaces/fix2/app/board/dashboard/page.tsx"
  "/workspaces/fix2/app/workforce-board/dashboard/page.tsx"
)

for dashboard in "${dashboards[@]}"; do
  if [ -f "$dashboard" ]; then
    echo "✅ EXISTS: $dashboard"
    
    # Check for auth guard
    if grep -q "requireRole" "$dashboard"; then
      echo "   ✅ Has auth + role guard (requireRole helper)"
    elif grep -q "if (!user)" "$dashboard"; then
      echo "   ✅ Has auth guard (checks !user)"
      
      # Check for role check
      if grep -q "profile.role" "$dashboard" || grep -q "profile?.role" "$dashboard"; then
        echo "   ✅ Has role check"
      else
        echo "   ⚠️  No explicit role check in page (may be in layout)"
      fi
    else
      echo "   ❌ MISSING auth guard"
    fi
    
    echo ""
  else
    echo "❌ MISSING: $dashboard"
    echo ""
  fi
done
