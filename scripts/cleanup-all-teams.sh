#!/usr/bin/env bash
set -euo pipefail

echo "🏢 Cleanup All Teams & Projects"
echo "================================"
echo ""

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN not set"
  echo "Set it with: export VERCEL_TOKEN='your-token'"
  exit 1
fi

echo "🔍 Step 1: Listing all teams..."
echo ""

# Get all teams
TEAMS=$(curl -s "https://api.vercel.com/v2/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TEAMS" ]; then
  echo "  ℹ️  No teams found"
  exit 0
fi

CORRECT_TEAM="team_Ae8f33vVYR36quLOS8HCeROs"

echo "Teams found:"
for team in $TEAMS; do
  TEAM_NAME=$(curl -s "https://api.vercel.com/v2/teams/$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  if [ "$team" = "$CORRECT_TEAM" ]; then
    echo "  ✅ $TEAM_NAME ($team) - KEEP THIS ONE"
  else
    echo "  ⚠️  $TEAM_NAME ($team) - Extra team"
  fi
done

echo ""
echo "🔍 Step 2: Listing projects in each team..."
echo ""

for team in $TEAMS; do
  TEAM_NAME=$(curl -s "https://api.vercel.com/v2/teams/$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  echo "Team: $TEAM_NAME ($team)"
  
  # Get projects in this team
  PROJECTS=$(curl -s "https://api.vercel.com/v9/projects?teamId=$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  
  if [ -z "$PROJECTS" ]; then
    echo "  ℹ️  No projects in this team"
  else
    for project in $PROJECTS; do
      if [ "$team" = "$CORRECT_TEAM" ] && [ "$project" = "fix2-gpql" ]; then
        echo "  ✅ $project - KEEP (correct project)"
      else
        echo "  ❌ $project - Should be deleted"
      fi
    done
  fi
  echo ""
done

echo "================================"
echo ""
read -p "Delete all extra projects and teams? (y/N): " confirm

if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
  echo "❌ Cancelled"
  exit 1
fi

echo ""
echo "🗑️  Step 3: Deleting extra projects..."
echo ""

for team in $TEAMS; do
  TEAM_NAME=$(curl -s "https://api.vercel.com/v2/teams/$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  # Get projects in this team
  PROJECTS=$(curl -s "https://api.vercel.com/v9/projects?teamId=$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  
  if [ -n "$PROJECTS" ]; then
    for project in $PROJECTS; do
      # Skip the correct project in the correct team
      if [ "$team" = "$CORRECT_TEAM" ] && [ "$project" = "fix2-gpql" ]; then
        echo "  ⏭️  Skipping: $project (keeping this one)"
        continue
      fi
      
      echo "  🗑️  Deleting project: $project (team: $TEAM_NAME)"
      
      # Get project ID
      PROJECT_ID=$(curl -s "https://api.vercel.com/v9/projects/$project?teamId=$team" \
        -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
      
      if [ -n "$PROJECT_ID" ]; then
        curl -s -X DELETE "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$team" \
          -H "Authorization: Bearer $VERCEL_TOKEN" > /dev/null
        echo "    ✅ Deleted"
      else
        echo "    ⚠️  Could not find project ID"
      fi
    done
  fi
done

echo ""
echo "🗑️  Step 4: Checking if extra teams can be deleted..."
echo ""

for team in $TEAMS; do
  if [ "$team" = "$CORRECT_TEAM" ]; then
    echo "  ⏭️  Skipping correct team: $team"
    continue
  fi
  
  TEAM_NAME=$(curl -s "https://api.vercel.com/v2/teams/$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | head -1)
  
  # Check if team has any projects left
  PROJECTS=$(curl -s "https://api.vercel.com/v9/projects?teamId=$team" \
    -H "Authorization: Bearer $VERCEL_TOKEN" | grep -o '"name":"[^"]*"' | cut -d'"' -f4)
  
  if [ -z "$PROJECTS" ]; then
    echo "  🗑️  Team $TEAM_NAME has no projects - attempting to delete..."
    
    # Note: You typically can't delete teams via API - must be done in dashboard
    echo "    ⚠️  Teams must be deleted manually in Vercel dashboard"
    echo "    Go to: https://vercel.com/teams/$team/settings"
  else
    echo "  ⚠️  Team $TEAM_NAME still has projects - cannot delete"
  fi
done

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "  ✅ Kept: fix2-gpql in correct team"
echo "  🗑️  Deleted: All other projects"
echo ""
echo "⚠️  Manual action required for teams:"
echo "  Go to Vercel dashboard and delete empty teams manually"
echo "  https://vercel.com/account"
echo ""
