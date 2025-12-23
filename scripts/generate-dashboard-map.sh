#!/bin/bash
# Generate comprehensive dashboard route map

echo "# Dashboard Route Map"
echo ""
echo "**Generated:** $(date)"
echo ""
echo "## Canonical Dashboards"
echo ""
echo "| Route | File Path | Role | Auth Guard | Status |"
echo "|-------|-----------|------|------------|--------|"

# Canonical dashboards
dashboards=(
  "/admin/dashboard:app/admin/dashboard/page.tsx:admin:requireRole:CANONICAL"
  "/lms/dashboard:app/lms/(app)/dashboard/page.tsx:student:requireRole:CANONICAL"
  "/program-holder/dashboard:app/program-holder/dashboard/page.tsx:program_holder:manual:CANONICAL"
  "/employer/dashboard:app/employer/dashboard/page.tsx:employer:requireRole:CANONICAL"
  "/staff-portal/dashboard:app/staff-portal/dashboard/page.tsx:staff:requireRole:CANONICAL"
  "/instructor/dashboard:app/instructor/dashboard/page.tsx:instructor:requireRole:CANONICAL"
  "/board/dashboard:app/board/dashboard/page.tsx:board_member:requireRole:CANONICAL"
  "/workforce-board/dashboard:app/workforce-board/dashboard/page.tsx:workforce_board:requireRole:CANONICAL"
)

for entry in "${dashboards[@]}"; do
  IFS=':' read -r route file role guard status <<< "$entry"
  echo "| \`$route\` | \`$file\` | \`$role\` | $guard | ✅ $status |"
done

echo ""
echo "## Legacy/Duplicate Dashboards"
echo ""
echo "| Route | File Path | Status | Redirect To | Notes |"
echo "|-------|-----------|--------|-------------|-------|"

# Legacy dashboards
legacy=(
  "/portal/student/dashboard:app/portal/student/dashboard/page.tsx:LEGACY:/lms/dashboard:Old student portal"
  "/portal/staff/dashboard:app/portal/staff/dashboard/page.tsx:LEGACY:/staff-portal/dashboard:Old staff portal"
  "/student/dashboard:app/student/dashboard/page.tsx:LEGACY:/lms/dashboard:Duplicate student route"
  "/partner/dashboard:app/partner/dashboard/page.tsx:LEGACY:/program-holder/dashboard:Partner alias"
  "/(partner)/partners/dashboard:app/(partner)/partners/dashboard/page.tsx:LEGACY:/program-holder/dashboard:Route group variant"
  "/programs/admin/dashboard:app/programs/admin/dashboard/page.tsx:LEGACY:/admin/dashboard:Old admin route"
  "/portal/parent/dashboard:app/portal/parent/dashboard/page.tsx:DISABLED:N/A:No schema support"
)

for entry in "${legacy[@]}"; do
  IFS=':' read -r route file status redirect notes <<< "$entry"
  if [ -f "/workspaces/fix2/$file" ]; then
    exists="✅ EXISTS"
  else
    exists="❌ MISSING"
  fi
  echo "| \`$route\` | \`$file\` | $exists $status | \`$redirect\` | $notes |"
done

echo ""
echo "## Portal Routes (Non-Dashboard)"
echo ""
echo "| Route | File Path | Purpose | Status |"
echo "|-------|-----------|---------|--------|"

portals=(
  "/portal:app/portal/page.tsx:Portal landing:ACTIVE"
  "/portals:app/portals/page.tsx:Portal directory:ACTIVE"
  "/parent-portal:app/parent-portal/page.tsx:Parent landing:DISABLED"
  "/student-portal:app/student-portal/page.tsx:Student landing:REDIRECT"
  "/partners/portal:app/partners/portal/page.tsx:Partner landing:ACTIVE"
  "/program-holder/portal:app/program-holder/portal/page.tsx:Program holder portal:ACTIVE"
)

for entry in "${portals[@]}"; do
  IFS=':' read -r route file purpose status <<< "$entry"
  if [ -f "/workspaces/fix2/$file" ]; then
    exists="✅"
  else
    exists="❌"
  fi
  echo "| \`$route\` | \`$file\` | $purpose | $exists $status |"
done

echo ""
echo "## Special Dashboards"
echo ""
echo "| Route | File Path | Purpose | Status |"
echo "|-------|-----------|---------|--------|"

special=(
  "/dashboard:app/dashboard/page.tsx:Role router:ACTIVE"
  "/dashboards:app/dashboards/page.tsx:Dashboard directory:ACTIVE"
  "/creator/dashboard:app/creator/dashboard/page.tsx:Creator role:UNKNOWN"
  "/delegate/dashboard:app/delegate/dashboard/page.tsx:Delegate role:UNKNOWN"
  "/shop/dashboard:app/shop/dashboard/page.tsx:Shop management:UNKNOWN"
  "/admin/compliance-dashboard:app/admin/compliance-dashboard/page.tsx:WIOA compliance:ACTIVE"
)

for entry in "${special[@]}"; do
  IFS=':' read -r route file purpose status <<< "$entry"
  if [ -f "/workspaces/fix2/$file" ]; then
    exists="✅"
  else
    exists="❌"
  fi
  echo "| \`$route\` | \`$file\` | $purpose | $exists $status |"
done
