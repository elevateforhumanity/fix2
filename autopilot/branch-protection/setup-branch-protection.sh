#!/usr/bin/env bash
set -euo pipefail

: "${REPO_SLUG:=elevateforhumanity/fix2}"
: "${BRANCH:=main}"
: "${REQUIRED_CHECKS:=build-test,check}"
: "${REVIEWERS:=1}"
: "${DISMISS_STALE:=true}"
: "${ENFORCE_ADMINS:=true}"
: "${REQUIRE_CONVO_RES:=true}"
: "${STRICT_UP_TO_DATE:=true}"

# Requires: gh CLI authenticated (GH_TOKEN or gh auth login) with 'repo:admin'
if ! command -v gh >/dev/null; then
  echo "❌ GitHub CLI (gh) is required. Install: https://cli.github.com/"
  exit 1
fi

echo "▶ Applying branch protection to ${REPO_SLUG}@${BRANCH}"
# shellcheck disable=SC2206
IFS=',' read -r -a CTX <<< "${REQUIRED_CHECKS}"

ARGS=(repos/${REPO_SLUG}/branches/${BRANCH}/protection
  --method PUT
  --field required_status_checks[strict]="${STRICT_UP_TO_DATE}"
)

for c in "${CTX[@]}"; do
  # trim whitespace
  c="$(echo "$c" | sed 's/^ *//;s/ *$//')"
  ARGS+=(--field "required_status_checks[contexts][]=${c}")
done

ARGS+=(
  --field required_pull_request_reviews[required_approving_review_count]="${REVIEWERS}"
  --field required_pull_request_reviews[dismiss_stale_reviews]="${DISMISS_STALE}"
  --field enforce_admins="${ENFORCE_ADMINS}"
  --field required_conversation_resolution="${REQUIRE_CONVO_RES}"
)

gh api "${ARGS[@]}" >/dev/null

echo "✅ Branch protection applied with required checks: ${REQUIRED_CHECKS}"
