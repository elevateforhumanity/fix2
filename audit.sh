#!/bin/bash
set -euo pipefail

echo "=== EFH AUDIT: typescript + lint + build ==="
echo "Started: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo "PWD: $(pwd)"
echo

OUT_DIR="audit-$(date -u +"%Y%m%dT%H%M%SZ")"
mkdir -p "$OUT_DIR"

# Basic environment proof
{
  echo "## ENV"
  echo "date_utc=$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  echo "node=$(node -v 2>/dev/null || true)"
  echo "pnpm=$(pnpm -v 2>/dev/null || true)"
  echo "npm=$(npm -v 2>/dev/null || true)"
  echo
  echo "## GIT"
  git rev-parse --abbrev-ref HEAD 2>/dev/null || true
  git rev-parse HEAD 2>/dev/null || true
  git status --porcelain 2>/dev/null || true
} | tee "$OUT_DIR/00_env_and_git.txt"

# Dependency proof (non-fatal, but logged)
{
  echo "## PACKAGE MANAGER / LOCKFILE"
  if [ -f pnpm-lock.yaml ]; then
    echo "lockfile=pnpm-lock.yaml"
  elif [ -f package-lock.json ]; then
    echo "lockfile=package-lock.json"
  elif [ -f yarn.lock ]; then
    echo "lockfile=yarn.lock"
  else
    echo "lockfile=none_found"
  fi

  echo
  echo "## PACKAGE.JSON (top level)"
  if [ -f package.json ]; then
    node -e "const p=require('./package.json'); console.log('name='+p.name); console.log('private='+p.private); console.log('scripts='+Object.keys(p.scripts||{}).join(','));"
  else
    echo "package.json not found"
  fi
} | tee "$OUT_DIR/01_package_info.txt"

run_step () {
  local NAME="$1"
  local CMD="$2"
  local LOG="$OUT_DIR/${NAME}.log"
  local STATUS="$OUT_DIR/${NAME}.status"

  echo
  echo "=== RUN: $NAME ==="
  echo "CMD: $CMD"
  echo "LOG: $LOG"
  echo

  set +e
  bash -lc "$CMD" >"$LOG" 2>&1
  local RC=$?
  set -e

  echo "$RC" > "$STATUS"

  if [ "$RC" -eq 0 ]; then
    echo "RESULT: PASS ($NAME)"
  else
    echo "RESULT: FAIL ($NAME) exit_code=$RC"
  fi

  # Show tail for quick view in terminal
  echo
  echo "--- tail (last 60 lines): $LOG ---"
  tail -n 60 "$LOG" || true
  echo "----------------------------------"
}

# Prefer pnpm if available
if command -v pnpm >/dev/null 2>&1; then
  PM="pnpm"
elif command -v npm >/dev/null 2>&1; then
  PM="npm"
else
  echo "ERROR: Neither pnpm nor npm found in PATH."
  exit 1
fi

# Identify likely TS typecheck script; fallback to tsc
TYPECHECK_CMD=""
if [ -f package.json ]; then
  if node -e "const p=require('./package.json'); process.exit((p.scripts&&p.scripts.typecheck)?0:1)"; then
    TYPECHECK_CMD="$PM run typecheck"
  elif node -e "const p=require('./package.json'); process.exit((p.scripts&&p.scripts.check)?0:1)"; then
    TYPECHECK_CMD="$PM run check"
  else
    # Fallback: if tsc is available via node_modules
    if [ -f node_modules/.bin/tsc ] || [ -f ./node_modules/typescript/bin/tsc ]; then
      TYPECHECK_CMD="$PM exec tsc -p tsconfig.json --noEmit"
    else
      TYPECHECK_CMD="$PM exec tsc -p tsconfig.json --noEmit"
    fi
  fi
else
  TYPECHECK_CMD="$PM exec tsc -p tsconfig.json --noEmit"
fi

LINT_CMD="$PM run lint"
BUILD_CMD="$PM run build"

# Run audits (do NOT stop on failure; capture all)
run_step "02_typecheck" "$TYPECHECK_CMD" || true
run_step "03_lint" "$LINT_CMD" || true
run_step "04_build" "$BUILD_CMD" || true

# Summarize results
{
  echo "## SUMMARY"
  echo "out_dir=$OUT_DIR"
  echo
  for f in "$OUT_DIR"/*.status; do
    base="$(basename "$f" .status)"
    rc="$(cat "$f" 2>/dev/null || echo "unknown")"
    if [ "$rc" = "0" ]; then
      echo "$base=PASS"
    else
      echo "$base=FAIL (exit_code=$rc)"
    fi
  done

  echo
  echo "## QUICK NEXT ACTION"
  echo "Paste back: 00_env_and_git.txt and the last ~120 lines of any FAIL logs."
  echo "If multiple fail, start with 04_build.log then 02_typecheck.log then 03_lint.log."
} | tee "$OUT_DIR/05_summary.txt"

echo
echo "=== DONE ==="
echo "Artifacts saved to: $OUT_DIR"
echo "To share quickly, run:"
echo "  ls -la $OUT_DIR"
