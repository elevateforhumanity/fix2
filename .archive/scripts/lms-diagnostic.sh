#!/usr/bin/env bash
set -euo pipefail

echo ""
echo "==================================================================="
echo "🩺 ELEVATE LMS & APPLICATION – GITPOD DIAGNOSTIC"
echo "==================================================================="
echo ""

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT_DIR"

# Helper: print section headers
section () {
  echo ""
  echo "-------------------------------------------------------------------"
  echo "✅ $1"
  echo "-------------------------------------------------------------------"
}

# Helper: safe env print
print_env () {
  local name="$1"
  local value="${!name:-__MISSING__}"
  if [ "$value" = "__MISSING__" ]; then
    printf "   ❌ %s is MISSING\n" "$name"
  else
    local masked="${value:0:4}********"
    printf "   ✅ %s is set (%s)\n" "$name" "$masked"
  fi
}

section "BASIC REPO INFO"
echo "   📁 Root directory: $ROOT_DIR"
echo "   🌿 Git branch: $(git rev-parse --abbrev-ref HEAD || echo 'unknown')"
echo "   📦 Package manager files present:"
[ -f package.json ] && echo "      - package.json ✅" || echo "      - package.json ❌"
[ -f pnpm-lock.yaml ] && echo "      - pnpm-lock.yaml ✅ (pnpm)" || true
[ -f yarn.lock ] && echo "      - yarn.lock ✅ (yarn)" || true
[ -f package-lock.json ] && echo "      - package-lock.json ✅ (npm)" || true

section "ENVIRONMENT – SUPABASE & AUTH VARIABLES"
print_env "NEXT_PUBLIC_SUPABASE_URL"
print_env "NEXT_PUBLIC_SUPABASE_ANON_KEY"
print_env "SUPABASE_SERVICE_ROLE_KEY"
print_env "NEXTAUTH_URL"
print_env "NEXTAUTH_SECRET"
print_env "ELEVATE_APP_ENV"
print_env "STRIPE_SECRET_KEY"
print_env "STRIPE_WEBHOOK_SECRET"

echo ""
echo "   👉 If any required env vars are ❌ MISSING, the LMS login/enrollment"
echo "      and admin dashboard may not function correctly."

section "NEXT.JS APP ROUTES – ADMIN / APPLICATION / LMS ENROLLMENT"

if [ -d "app" ]; then
  echo "   📂 Scanning app/**/page.(ts|tsx|js|jsx) for key routes..."
  echo ""

  # List routes we care about
  declare -a ROUTE_KEYS=(
    "admin"
    "dashboard"
    "lms"
    "student"
    "instructor"
    "application"
    "apply"
    "enroll"
    "enrollment"
    "programs"
    "auth"
    "login"
    "register"
  )

  for key in "${ROUTE_KEYS[@]}"; do
    matches=$(find app -type f \( -name "page.tsx" -o -name "page.ts" -o -name "page.jsx" -o -name "page.js" \) | grep "/$key/" || true)
    if [ -n "$matches" ]; then
      echo "   ✅ Route(s) containing \"$key\":"
      echo "$matches" | sed 's/^/      - /'
    else
      echo "   ❌ No app route folder containing \"$key\" found (e.g. app/$key/page.tsx)"
    fi
  done
else
  echo "   ❌ No app/ directory found (expected for Next.js App Router)."
  echo "      If you are using pages/ router, update this script to scan pages/ instead."
fi

section "API ROUTES – APPLICATION / ENROLLMENT HANDLERS"

if [ -d "app" ]; then
  echo "   📂 Checking app/**/route.(ts|js) for APIs named like apply/enroll/application..."
  declare -a API_KEYS=(
    "apply"
    "enroll"
    "enrollment"
    "application"
    "student-registration"
    "program-enroll"
  )

  for key in "${API_KEYS[@]}"; do
    matches=$(find app -type f \( -name "route.ts" -o -name "route.js" \) | grep "$key" || true)
    if [ -n "$matches" ]; then
      echo "   ✅ API route(s) containing \"$key\":"
      echo "$matches" | sed 's/^/      - /'
    else
      echo "   ❌ No API route filename containing \"$key\" found."
    fi
  done
else
  echo "   ❌ Skipped (no app/ directory found)."
fi

section "FORM COMPONENTS – APPLICATION / ENROLLMENT UI"

echo "   🔍 Searching for form components that look like application/enrollment..."
grep -RInE "ApplicationForm|EnrollmentForm|applyToProgram|enrollStudent|handleEnroll" app components pages 2>/dev/null | head -20 || echo "   ❌ No obvious Application/Enrollment form components found."

echo ""
echo "   🔍 Searching for words 'apply', 'application', 'enroll', 'enrollment' in components/pages..."
grep -RInE "apply|enroll|enrollment|application" app components pages 2>/dev/null | head -n 50 || echo "   ⚠️ No matches (or limited matches) – review manually."

section "SUPABASE AUTH – SIGN UP / SIGN IN"

echo "   🔍 Looking for supabase auth usage in the codebase..."
grep -RInE "supabase\.auth\.signUp|supabase\.auth\.signIn|supabase\.auth\.signInWithPassword|supabase\.auth\.signOut" . 2>/dev/null | head -n 40 || echo "   ⚠️ No Supabase auth calls found in repo (or not under standard patterns)."

section "SUMMARY – WHAT THIS SCRIPT CHECKED"

cat <<EOF
   ✅ Env vars for Supabase, NextAuth, Stripe – flagged if missing
   ✅ Presence of key Next.js routes:
        - /admin, /dashboard, /lms, /student, /application, /apply, /enroll, /programs, /auth, /login, /register
   ✅ Presence of application/enrollment-related API routes in app/**/route.ts
   ✅ Presence of application/enrollment form components
   ✅ Presence of Supabase auth usage (sign up / sign in / sign out)

   👉 Use this as a checklist:
        - Any route you EXPECT but see as ❌ above must be created or fixed.
        - Any env var marked ❌ must be added to Gitpod and deployment envs.
        - If Supabase auth calls are missing, students won't be able to log in/enroll.
        - Type errors or build errors will break pages even if routes exist.
EOF

echo ""
echo "==================================================================="
echo "✅ DIAGNOSTIC COMPLETE – scroll up to review ❌ items."
echo "==================================================================="
echo ""
