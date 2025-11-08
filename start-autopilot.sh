#!/usr/bin/env bash
###############################################################################
# START AUTOPILOT - Self-Healing System
###############################################################################

echo "🤖 Starting Self-Healing Autopilot..."
echo ""

# Run self-healing autopilot
node workers/self-healing-autopilot.js

echo ""
echo "✅ Autopilot started and running"
echo ""
echo "The autopilot will:"
echo "  - Monitor system health continuously"
echo "  - Fix issues automatically"
echo "  - Commit and push fixes"
echo "  - Run every 6 hours via GitHub Actions"
echo ""
