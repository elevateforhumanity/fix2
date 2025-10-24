#!/usr/bin/env bash
# Gitpod Autopilot - Complete Security & Deployment Automation
# Cleans repo, removes hard-coded secrets, fixes CSP, standardizes env handling, wires up CI guards

set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
AP_DIR="$REPO_ROOT/.autopilot"
TPL_DIR="$AP_DIR/templates"
PAT_DIR="$AP_DIR/patterns"

# Configurable knobs
DEPLOY_TARGET="${AUTOPILOT_DEPLOY_TARGET:-cloudflare}" # or: netlify
PURGE_HISTORY="${AUTOPILOT_PURGE_HISTORY:-false}"      # true = destructive rewrite
MAIN_BRANCH="${AUTOPILOT_MAIN_BRANCH:-main}"

header() { echo -e "\n\033[1;36m==> $*\033[0m"; }
info()   { echo -e "   \033[0;32m•\033[0m $*"; }
warn()   { echo -e "   \033[0;33m!\033[0m $*"; }
err()    { echo -e "   \033[0;31m✖\033[0m $*" >&2; }

require_cmd() {
  command -v "$1" >/dev/null 2>&1 || { err "Missing $1"; return 1; }
}

install_tools() {
  header "Installing helper tools"
  if ! command -v yq >/dev/null 2>&1; then
    info "Installing yq (py)"
    pip3 install --user yq==3.2.2 || true
  fi
  if ! command -v git-filter-repo >/dev/null 2>&1; then
    info "Installing git-filter-repo"
    pip3 install --user git-filter-repo || true
  fi
  if ! command -v jq >/dev/null 2>&1; then
    info "Installing jq"
    sudo apt-get update && sudo apt-get install -y jq moreutils
  fi
  info "Tools ready."
}

create_file_if_missing() {
  local path="$1" ; shift
  if [[ ! -f "$path" ]]; then
    printf "%s" "$*" > "$path"
    info "Created $path"
  else
    info "Exists: $path"
  fi
}

replace_in_file() {
  local pattern="$1" file="$2"
  if [[ -f "$file" ]]; then
    sed -i -E "$pattern" "$file" || true
  fi
}

sanitize_repo_secrets() {
  header "Sanitizing hard-coded secrets in tracked files"

  # Cloudflare scripts -> use env reads
  for f in scripts/setup-cloudflare-env.sh scripts/get-cloudflare-zone-id.sh scripts/cleanup-cloudflare-deployments.sh; do
    if [[ -f "$f" ]]; then
      info "Hardening $f"
      replace_in_file 's/export[[:space:]]+CLOUDFLARE_API_TOKEN="[^"]*"/: ${CLOUDFLARE_API_TOKEN:?"Set CLOUDFLARE_API_TOKEN in your env"}/' "$f"
      replace_in_file 's/export[[:space:]]+CLOUDFLARE_ACCOUNT_ID="[^"]*"/: ${CLOUDFLARE_ACCOUNT_ID:?"Set CLOUDFLARE_ACCOUNT_ID in your env"}/' "$f"
      # Ensure script aborts if not set
      if ! grep -q 'CLOUDFLARE_API_TOKEN' "$f"; then
        echo ': ${CLOUDFLARE_API_TOKEN:?"Set CLOUDFLARE_API_TOKEN in your env"}' | cat - "$f" >"$f.tmp" && mv "$f.tmp" "$f"
      fi
      if ! grep -q 'CLOUDFLARE_ACCOUNT_ID' "$f"; then
        echo ': ${CLOUDFLARE_ACCOUNT_ID:?"Set CLOUDFLARE_ACCOUNT_ID in your env"}' | cat - "$f" >"$f.tmp" && mv "$f.tmp" "$f"
      fi
    fi
  done

  # netlify.toml: remove hard-coded client env keys
  if [[ -f "netlify.toml" ]]; then
    info "Scrubbing envs in netlify.toml"
    replace_in_file 's/VITE_SUPABASE_URL *= *"[^"]*"/VITE_SUPABASE_URL = "\$\{VITE_SUPABASE_URL\}"/' netlify.toml
    replace_in_file 's/VITE_SUPABASE_ANON_KEY *= *"[^"]*"/VITE_SUPABASE_ANON_KEY = "\$\{VITE_SUPABASE_ANON_KEY\}"/' netlify.toml
  fi

  # Stripe secrets
  grep -rlE '(sk_live|sk_test|whsec)_[A-Za-z0-9]{16,}' -- . 2>/dev/null | while read -r hit; do
    warn "Stripe-like secret literal found in $hit — replacing with env refs"
    replace_in_file 's/(sk_(live|test)_[A-Za-z0-9]{16,})/\$\{STRIPE_SECRET_KEY\}/g' "$hit"
    replace_in_file 's/(whsec_[A-Za-z0-9]{16,})/\$\{STRIPE_WEBHOOK_SECRET\}/g' "$hit"
  done

  # JWT-like keys
  grep -rlE 'eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}' -- . 2>/dev/null | while read -r hit; do
    warn "JWT-like string found in $hit — redacting"
    replace_in_file 's/eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}/\$\{REDACTED_JWT\}/g' "$hit"
  done
}

emit_env_example() {
  header "Writing .env.example and .gitignore"
  cat > "$REPO_ROOT/.env.example" <<'EOF'
# Frontend (client-safe)
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_STRIPE_PUBLISHABLE_KEY=

# Backend / server-only (DO NOT COMMIT REAL VALUES)
JWT_SECRET=
SUPABASE_SERVICE_KEY=
DATABASE_URL=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_ACCOUNT_ID=
EOF

  # Ensure .env is ignored
  if [[ ! -f ".gitignore" ]] || ! grep -qE '^\.(env|env\.local)$' .gitignore; then
    {
      echo ".env"
      echo ".env.local"
      echo ".pnpm-store/"
    } >> .gitignore
    info "Updated .gitignore"
  else
    info ".gitignore already blocks .env files"
  fi
}

fix_csp_and_headers() {
  header "Fixing Content-Security-Policy"

  # Generate Netlify _headers
  if [[ "$DEPLOY_TARGET" == "netlify" ]]; then
    mkdir -p "public"
    cat > public/_headers <<'EOF'
/*
  Content-Security-Policy: default-src 'self'; base-uri 'self'; form-action 'self' https://*.supabase.co; frame-ancestors 'none'; script-src 'self' https://js.stripe.com https://browser.sentry-cdn.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://*.supabase.co https://api.stripe.com https://hooks.stripe.com https://*.sentry.io; img-src 'self' data: blob:; font-src 'self' data:; frame-src https://js.stripe.com; object-src 'none'; upgrade-insecure-requests
EOF
    info "Wrote public/_headers for Netlify"
  fi

  # Fix netlify.toml CSP
  if [[ -f "netlify.toml" ]]; then
    replace_in_file "s#(Content-Security-Policy.*connect-src[^;]*);#\1 https://*.supabase.co https://api.stripe.com https://hooks.stripe.com https://*.sentry.io;#g" netlify.toml
    replace_in_file "s#(Content-Security-Policy.*script-src[^;]*);#\1 https://js.stripe.com https://browser.sentry-cdn.com;#g" netlify.toml
    info "Relaxed CSP in netlify.toml"
  fi
}

wire_ci_guards() {
  header "Adding CI guards (secret scan + build sanity)"

  mkdir -p .github/workflows

  # Secret scan workflow
  cat > .github/workflows/secret-scan.yml <<'YAML'
name: Secret Scan
on:
  push:
  pull_request:
jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Grep for token-like strings
        run: |
          set -euo pipefail
          patterns='(sk_(live|test)_[A-Za-z0-9]{16,}|whsec_[A-Za-z0-9]{16,}|eyJ[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}\.[A-Za-z0-9_\-]{10,}|CLOUDFLARE_[A-Z_]*="?[^"]{20,}"?)'
          if git grep -nE "$patterns" -- . ':!**/.github/**' ':!**/.autopilot/**' ; then
            echo "::error::Potential secret-like strings found. Replace with env variables."
            exit 1
          fi
YAML

  # Build CI
  cat > .github/workflows/ci.yml <<'YAML'
name: Build CI
on:
  push:
  pull_request:
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: Use PNPM if lockfile present
        id: tool
        run: |
          if [ -f pnpm-lock.yaml ]; then
            echo "use_pnpm=true" >> $GITHUB_OUTPUT
            corepack enable
            corepack prepare pnpm@latest --activate
          fi
      - name: Install deps
        run: |
          if [ "${{ steps.tool.outputs.use_pnpm }}" = "true" ]; then pnpm i; else npm i; fi
      - name: Build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
          VITE_STRIPE_PUBLISHABLE_KEY: ${{ secrets.VITE_STRIPE_PUBLISHABLE_KEY }}
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
          STRIPE_SECRET_KEY: ${{ secrets.STRIPE_SECRET_KEY }}
          STRIPE_WEBHOOK_SECRET: ${{ secrets.STRIPE_WEBHOOK_SECRET }}
        run: |
          if [ "${{ steps.tool.outputs.use_pnpm }}" = "true" ]; then pnpm run build || pnpm build; else npm run build || npm run build --if-present; fi
YAML

  info "GitHub Actions added: secret-scan.yml, ci.yml"
}

pick_deploy_target() {
  header "Normalizing deployment target: ${DEPLOY_TARGET}"
  case "$DEPLOY_TARGET" in
    cloudflare)
      info "Cloudflare Pages selected. Ensure CLOUDFLARE_API_TOKEN/ACCOUNT_ID are set."
      ;;
    netlify)
      info "Netlify selected. Move env to Netlify UI and use public/_headers for CSP."
      ;;
    *)
      warn "Unknown AUTOPILOT_DEPLOY_TARGET=$DEPLOY_TARGET (supported: cloudflare|netlify)"
      ;;
  esac
}

purge_history_if_enabled() {
  if [[ "$PURGE_HISTORY" != "true" ]]; then
    info "History purge disabled (AUTOPILOT_PURGE_HISTORY=false). Skipping."
    return 0
  fi

  header "!!! Destructive history rewrite enabled !!!"
  require_cmd git-filter-repo || { err "git-filter-repo not installed"; return 1; }

  REPLACE_FILE="$AP_DIR/replace-map.txt"
  cat > "$REPLACE_FILE" <<EOF
# Add patterns here: literal==>replacement
EOF

  if [[ $(wc -l < "$REPLACE_FILE") -lt 1 ]]; then
    warn "replace-map.txt empty; skipping purge"
    return 0
  fi

  read -r -p "This will rewrite git history on branch $MAIN_BRANCH. Type 'PURGE' to continue: " CONFIRM
  if [[ "$CONFIRM" != "PURGE" ]]; then
    warn "History purge aborted by user."
    return 0
  fi

  git checkout "$MAIN_BRANCH"
  git filter-repo --replace-text "$REPLACE_FILE" --force
  info "History rewritten locally. Force-push: git push --force-with-lease origin $MAIN_BRANCH"
}

commit_autopilot_changes() {
  header "Committing autopilot changes"
  git add -A
  if ! git diff --cached --quiet; then
    git commit -m "chore(autopilot): sanitize secrets, fix CSP, add CI guards, .env.example

Co-authored-by: Ona <no-reply@ona.com>"
    info "Committed changes."
  else
    info "No changes to commit."
  fi
}

usage() {
  cat <<EOF
Usage:
  $0 --install-tools
  $0 run

Env knobs:
  AUTOPILOT_DEPLOY_TARGET=cloudflare|netlify   (default: cloudflare)
  AUTOPILOT_PURGE_HISTORY=true|false           (default: false)
  AUTOPILOT_MAIN_BRANCH=main                   (default: main)
EOF
}

case "${1:-}" in
  --install-tools) install_tools ;;
  run)
    install_tools
    sanitize_repo_secrets
    emit_env_example
    fix_csp_and_headers
    wire_ci_guards
    pick_deploy_target
    purge_history_if_enabled
    commit_autopilot_changes
    header "Autopilot complete ✅"
    echo "Next steps:"
    echo "  1) Rotate any exposed tokens in Cloudflare/Supabase/Stripe dashboards."
    echo "  2) Add build env secrets in your chosen host & GitHub → Settings → Secrets."
    echo "  3) Push branch and open PR."
    ;;
  *) usage; exit 1;;
esac
