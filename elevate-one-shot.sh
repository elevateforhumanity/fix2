#!/usr/bin/env bash
# elevate-one-shot.sh
# Top-level Gitpod entrypoint – calls the real autopilot

set -euo pipefail

echo "🔥 Elevate LMS – Gitpod One-Shot Autopilot"
echo "Workspace: $(pwd)"
echo "------------------------------------------"

if [ ! -d "scripts" ]; then
  echo "❌ scripts directory not found. Run from repo root."
  exit 1
fi

if [ ! -f "scripts/elevate-autopilot.sh" ]; then
  echo "❌ scripts/elevate-autopilot.sh not found."
  exit 1
fi

chmod +x scripts/elevate-autopilot.sh

./scripts/elevate-autopilot.sh
