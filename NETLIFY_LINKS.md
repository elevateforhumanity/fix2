# Correct Netlify Links

## Your Site ID
```
12f120ab-3f63-419b-bc49-430f043415c1
```

## Direct Links

### Environment Variables
https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/env

### Deploys
https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/deploys

### Site Settings
https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/general

### Domain Settings
https://app.netlify.com/sites/12f120ab-3f63-419b-bc49-430f043415c1/settings/domain

## Get Netlify Auth Token
https://app.netlify.com/user/applications

## Run Script to Set Env Vars

```bash
# Get your Netlify auth token first from link above
export NETLIFY_AUTH_TOKEN='your-token-here'

# Run the script
./scripts/set-netlify-env-direct.sh
```

This will automatically:
- Set all environment variables
- Trigger a new deployment
- Clear the cache
