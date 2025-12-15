#!/usr/bin/env bash
# gitpod-lms-health-check.sh
# Elevate for Humanity – LMS / Web Health Check

set -u  # (we won't use -e so we can keep going even if some checks fail)

ROOT_DIR="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT_DIR"

APP_DIR="."   # Next.js app is in root
PUBLIC_URL="https://www.elevateforhumanity.org"

# Common admin paths to test – we'll just curl them and see what responds
ADMIN_PATHS=(
  "/admin"
  "/dashboard"
  "/admin/login"
  "/app/admin"
)

# Required env vars for your stack – adjust this list to match your real keys
REQUIRED_ENV_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "SUPABASE_SERVICE_ROLE_KEY"
  "NEXTAUTH_SECRET"
  "NEXTAUTH_URL"
  "NEXT_PUBLIC_SITE_URL"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
)

PASS_COUNT=0
FAIL_COUNT=0

section() {
  echo ""
  echo "==================================================================="
  echo "🔍 $1"
  echo "==================================================================="
}

pass() {
  echo "✅ $1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

fail() {
  echo "❌ $1"
  FAIL_COUNT=$((FAIL_COUNT + 1))
}

# --------------------------------------------------------------------
section "REPO & ENVIRONMENT INFO"

echo "📁 Root directory: $ROOT_DIR"
git rev-parse --abbrev-ref HEAD >/dev/null 2>&1 && \
  echo "🌿 Git branch: $(git rev-parse --abbrev-ref HEAD)" || \
  echo "🌿 Git branch: (not a git repo?)"

command -v node >/dev/null 2>&1 && echo "🧠 Node: $(node -v)" || echo "❌ Node not found"
command -v npm  >/dev/null 2>&1 && echo "📦 npm:  $(npm -v)"  || echo "❌ npm not found"

# --------------------------------------------------------------------
section "ENVIRONMENT VARIABLES CHECK (.env.local / .env)"

# Load env from .env.local or .env if present (non-destructive)
if [ -f ".env.local" ]; then
  export $(grep -v '^#' .env.local | grep -E '^[A-Za-z0-9_]+=.*' | xargs) 2>/dev/null || true
elif [ -f ".env" ]; then
  export $(grep -v '^#' .env | grep -E '^[A-Za-z0-9_]+=.*' | xargs) 2>/dev/null || true
fi

MISSING_ENV=0
for VAR in "${REQUIRED_ENV_VARS[@]}"; do
  if [ -z "${!VAR-}" ]; then
    echo "❌ Missing env var: $VAR"
    MISSING_ENV=$((MISSING_ENV + 1))
  else
    echo "✅ $VAR is set"
  fi
done

if [ "$MISSING_ENV" -eq 0 ]; then
  pass "All required env vars are present"
else
  fail "$MISSING_ENV required env vars are missing"
fi

# --------------------------------------------------------------------
section "NEXT.JS APP DIRECTORY CHECK"

if [ -d "$APP_DIR" ]; then
  pass "App directory exists: $APP_DIR"
  cd "$APP_DIR"
else
  fail "App directory not found: $APP_DIR (adjust APP_DIR in script)"
fi

# --------------------------------------------------------------------
section "NODE DEPENDENCIES"

if [ -f "package.json" ]; then
  echo "📄 package.json found"
  if [ ! -d "node_modules" ]; then
    echo "📦 node_modules not found – running npm install (this may take a bit)..."
    if npm install --quiet; then
      pass "npm install completed"
    else
      fail "npm install failed"
    fi
  else
    pass "node_modules already present"
  fi
else
  fail "package.json not found in $PWD"
fi

# --------------------------------------------------------------------
section "LINT & BUILD CHECKS"

if command -v npm >/dev/null 2>&1; then
  echo "Running lint check..."
  if npm run lint 2>&1 | tail -20; then
    pass "npm run lint passed"
  else
    fail "npm run lint FAILED (check ESLint errors)"
  fi

  echo "Running build check (this may take a few minutes)..."
  if npm run build 2>&1 | tail -30; then
    pass "npm run build passed"
  else
    fail "npm run build FAILED (Next.js build issues)"
  fi
else
  fail "npm command not available"
fi

# --------------------------------------------------------------------
section "PUBLIC URL & ADMIN PATH CHECKS"

if command -v curl >/dev/null 2>&1; then
  echo "🌐 Checking base site: $PUBLIC_URL"
  STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$PUBLIC_URL" || echo "000")
  echo "➡️ Status: $STATUS"
  if [ "$STATUS" -ge 200 ] && [ "$STATUS" -lt 400 ]; then
    pass "Public site reachable ($STATUS)"
  else
    fail "Public site not reachable or error ($STATUS)"
  fi

  for PATH in "${ADMIN_PATHS[@]}"; do
    URL="${PUBLIC_URL%/}$PATH"
    echo "🔐 Checking possible admin URL: $URL"
    STATUS=$(curl -o /dev/null -s -w "%{http_code}" "$URL" || echo "000")
    echo "   Status: $STATUS"
    if [ "$STATUS" -eq 200 ] || [ "$STATUS" -eq 302 ] || [ "$STATUS" -eq 301 ]; then
      echo "   ✅ Responding (might be login or redirect)"
    else
      echo "   ❌ Not responding as expected"
    fi
  done
else
  fail "curl not available – cannot test public URLs"
fi

# --------------------------------------------------------------------
section "SUMMARY"

echo "✅ PASSED CHECKS: $PASS_COUNT"
echo "❌ FAILED CHECKS: $FAIL_COUNT"

if [ "$FAIL_COUNT" -gt 0 ]; then
  echo ""
  echo "⚠️ Some checks FAILED. Scroll up and fix those items:"
  echo "- Missing env vars → update .env.local in Gitpod & in your hosting"
  echo "- Lint/build failures → fix TypeScript/React/Next.js errors"
  echo "- Public URL / admin path issues → routing or deployment misconfig"
else
  echo ""
  echo "🎉 All health checks passed – if you're still having issues, it's likely"
  echo "   a login/permissions issue or something specific in the app logic."
fi

echo ""
echo "Done."
