#!/usr/bin/env bash
set -euo pipefail

echo "▶ EFH Autopilot: installing performance, blog, and social systems"

# Ensure Node and Git
if ! command -v node >/dev/null; then echo "Node is required"; exit 1; fi
if ! command -v git >/dev/null; then echo "Git is required"; exit 1; fi

# Create dirs
mkdir -p autopilot/performance autopilot/social/templates autopilot/blog/astro/src/{pages,layouts,content/posts}
mkdir -p autopilot/training .github/workflows

echo "✅ Autopilot scaffolding done. Check autopilot/README.md for next steps"
