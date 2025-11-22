# Vercel Deployment from Gitpod

## Quick Start

This repo includes an automated script to configure Vercel domains and deploy from Gitpod.

### Required Environment Variables

Set these in Gitpod (Settings → Variables):

```bash
VERCEL_TOKEN=your_vercel_personal_access_token
VERCEL_PROJECT_NAME=fix2-gpql
VERCEL_TEAM_ID=team_Ae8f33vVYR36quLOS8HCeROs
ELEVATE_DOMAIN=elevateforhumanity.org
```

### Run the Script

```bash
./scripts/vercel-config-and-deploy.sh
```

### What It Does

1. Attaches `elevateforhumanity.org` and `www.elevateforhumanity.org` to your Vercel project
2. Pulls Vercel environment configuration
3. Triggers a production deployment

### Troubleshooting

**Domain already in use (409 error):**
1. Log into Vercel Dashboard
2. Find the old project holding the domain
3. Remove the domain from that project
4. Run the script again

**Missing Vercel CLI:**
The script will auto-install it if needed.

### Automatic Deployment

The `.gitpod.yml` is configured to run this script automatically when you open the workspace.

To disable auto-deploy, comment out the `vercel-setup` task in `.gitpod.yml`.
