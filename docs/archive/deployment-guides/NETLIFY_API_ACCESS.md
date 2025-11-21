# Netlify API Access for Autopilot

## Overview

Your autopilot CAN access Netlify via the API to:

- ✅ Check site configuration
- ✅ Trigger deployments
- ✅ View deploy status
- ✅ Update build settings
- ✅ Manage environment variables

## Setup

### Step 1: Get Netlify Access Token

1. Go to: https://app.netlify.com/user/applications
2. Click **New access token**
3. Name it: "Autopilot Deploy Token"
4. Click **Generate token**
5. **Copy the token** (you won't see it again!)

### Step 2: Set Environment Variable

In your terminal or Gitpod:

```bash
export NETLIFY_AUTH_TOKEN='your_token_here'
```

To make it permanent in Gitpod:

```bash
gp env NETLIFY_AUTH_TOKEN='your_token_here'
```

### Step 3: Run the Script

```bash
bash scripts/netlify-api-deploy.sh
```

## What the Script Does

The script will:

1. **Fetch site information**
   - Site URL
   - Repository connection
   - Build settings
   - Current configuration

2. **Verify build settings**
   - Build command should be: `npm run build`
   - Publish directory should be: `dist`
   - Branch should be: `main`

3. **Check latest deploy**
   - Deploy status
   - Deploy time
   - Deploy URL

4. **Trigger new deployment** (optional)
   - Clears cache
   - Rebuilds from latest commit
   - Monitors deploy progress

5. **Check environment variables**
   - NODE_VERSION
   - Other configured variables

## Manual API Calls

If you want to use the API directly:

### Get Site Info

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1
```

### Trigger Deploy

```bash
curl -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clear_cache": true}' \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/builds
```

### Get Deploys

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys
```

### Update Build Settings

```bash
curl -X PATCH \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "build_settings": {
      "cmd": "npm run build",
      "dir": "dist",
      "repo_branch": "main"
    }
  }' \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1
```

## Your Site Details

```
Site ID: 12f120ab-3f63-419b-bc49-430f043415c1
Site Name: elevateproduction
URL: https://elevateproduction.netlify.app
Repository: elevateforhumanity/fix2
```

## Common Tasks

### Force Rebuild

```bash
# Using the script
bash scripts/netlify-api-deploy.sh

# Or directly
curl -X POST \
  -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"clear_cache": true}' \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/builds
```

### Check Deploy Status

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys | jq '.[0]'
```

### Get Build Logs

```bash
# Get latest deploy ID
DEPLOY_ID=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys | jq -r '.[0].id')

# Get logs
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/deploys/$DEPLOYID/log
```

## Autopilot Integration

You can integrate this into your autopilot workflow:

### Option 1: Use the Script

```bash
# In your autopilot script
export NETLIFY_AUTH_TOKEN='your_token'
bash scripts/netlify-api-deploy.sh
```

### Option 2: Direct API Calls

```bash
# Check if deploy is needed
LATEST_COMMIT=$(git rev-parse HEAD)
DEPLOYED_COMMIT=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys | \
  jq -r '.[0].commit_ref')

if [ "$LATEST_COMMIT" != "$DEPLOYED_COMMIT" ]; then
  echo "Triggering new deploy..."
  curl -X POST \
    -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"clear_cache": true}' \
    https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/builds
fi
```

### Option 3: Use Build Hooks

Create a build hook in Netlify dashboard:

1. Go to: https://app.netlify.com/sites/elevateproduction/settings/deploys
2. Scroll to **Build hooks**
3. Click **Add build hook**
4. Name: "Autopilot Deploy"
5. Branch: main
6. Copy the webhook URL

Then trigger with:

```bash
curl -X POST https://api.netlify.com/build_hooks/yourhookid
```

## Monitoring Deploys

### Watch Deploy Progress

```bash
# Get latest deploy ID
DEPLOY_ID=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys | \
  jq -r '.[0].id')

# Watch status
while true; do
  STATE=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
    https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys/$DEPLOYID | \
    jq -r '.state')

  echo "Deploy state: $STATE"

  if [ "$STATE" = "ready" ]; then
    echo "✅ Deploy complete!"
    break
  elif [ "$STATE" = "error" ]; then
    echo "❌ Deploy failed!"
    break
  fi

  sleep 10
done
```

## API Documentation

Full Netlify API docs: https://docs.netlify.com/api/get-started/

Key endpoints:

- **Sites:** `/sites/{site_id}`
- **Deploys:** `/sites/{site_id}/deploys`
- **Builds:** `/sites/{site_id}/builds`
- **Environment:** `/accounts/{account_slug}/env`

## Security

**Important:**

- Never commit your NETLIFY_AUTH_TOKEN to git
- Store it as an environment variable
- Use Gitpod secrets: `gp env NETLIFY_AUTH_TOKEN='...'`
- Rotate tokens periodically

## Troubleshooting

### "Unauthorized" Error

Your token is invalid or expired. Get a new one:

1. Go to: https://app.netlify.com/user/applications
2. Revoke old token
3. Create new token
4. Update environment variable

### "Site not found" Error

Check the site ID is correct:

```bash
curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites | jq '.[] | {name, id, url}'
```

### Deploy Stuck in "Building"

Check build logs:

```bash
DEPLOY_ID=$(curl -s -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys | \
  jq -r '.[0].id')

curl -H "Authorization: Bearer $NETLIFY_AUTH_TOKEN" \
  https://api.netlify.com/api/v1/deploys/$DEPLOYID/log
```

## Summary

✅ **Autopilot CAN access Netlify**  
✅ **Script created:** `scripts/netlify-api-deploy.sh`  
✅ **Full API access** to check and update configuration  
✅ **Can trigger deployments** programmatically

**Next step:** Get your Netlify access token and run the script!
