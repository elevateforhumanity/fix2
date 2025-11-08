# ☁️ Cloudflare Worker Setup Guide (10 Minutes)

**Last Updated**: 2025-10-29 04:08 UTC  
**Autopilot Version**: 7.0  
**Gets You**: 100% Functionality (Edge Functions + CDN)

---

## 🎯 What You'll Get

After deploying Cloudflare Worker:

- ✅ Edge functions for API rate limiting
- ✅ Global CDN for faster content delivery
- ✅ DDoS protection
- ✅ Automated health checks every 10 minutes
- ✅ Autopilot deployment monitoring
- ✅ Zero-downtime deployments
- ✅ Geographic load balancing

---

## 📋 Prerequisites

1. ✅ Supabase setup complete (80% functionality)
2. ✅ Cloudflare account: https://dash.cloudflare.com/sign-up
3. ✅ Domain added to Cloudflare (optional but recommended)

---

## 🔑 Step 1: Get Cloudflare API Credentials (3 minutes)

### 1.1 Create Cloudflare Account

1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email
3. Verify your email
4. Complete onboarding

### 1.2 Get Account ID

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages** in left sidebar
3. Look for **Account ID** in right sidebar
4. Copy it:

```bash
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 1.3 Create API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **Create Token**
3. Use **Edit Cloudflare Workers** template
4. Or create custom token with these permissions:
   - **Account** → **Cloudflare Workers Scripts** → **Edit**
   - **Account** → **Account Settings** → **Read**
   - **Zone** → **Workers Routes** → **Edit** (if using custom domain)
5. Click **Continue to summary**
6. Click **Create Token**
7. ⚠️ **COPY THE TOKEN NOW** - You won't see it again!

```bash
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 🔧 Step 2: Install Wrangler CLI (2 minutes)

Wrangler is Cloudflare's CLI tool for deploying workers.

### Install Globally:

```bash
# Using npm
npm install -g wrangler

# Or using pnpm
pnpm add -g wrangler

# Or using yarn
yarn global add wrangler
```

### Verify Installation:

```bash
wrangler --version
```

Should show: `wrangler 3.x.x` or higher

---

## 🚀 Step 3: Configure Wrangler (2 minutes)

### 3.1 Login to Cloudflare

```bash
wrangler login
```

This opens a browser window to authorize Wrangler.

- Click **Allow** to grant access
- ✅ You should see "Successfully logged in"

### 3.2 Update wrangler.toml

The project already has a `wrangler.toml` file. Update it with your account ID:

```bash
# Edit wrangler.toml
nano wrangler.toml
```

Add your account ID:

```toml
# Account details
account_id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Save and exit (Ctrl+X, then Y, then Enter)

---

## 📦 Step 4: Deploy Worker (3 minutes)

### 4.1 Deploy to Production

```bash
# Deploy worker
wrangler deploy

# Or deploy to specific environment
wrangler deploy --env production
```

Expected output:

```
✨ Built successfully!
✨ Uploading...
✨ Deployed autopilot-deploy-worker
   https://autopilot-deploy-worker.your-subdomain.workers.dev
```

### 4.2 Set Secrets

Set sensitive environment variables as secrets:

```bash
# Set Netlify token (if monitoring Netlify)
wrangler secret put NETLIFY_TOKEN
# Paste your Netlify token when prompted

# Set GitHub token (if monitoring GitHub)
wrangler secret put GITHUB_TOKEN
# Paste your GitHub token when prompted

# Set Supabase URL
wrangler secret put SUPABASE_URL
# Paste your Supabase URL when prompted

# Set Supabase service role key
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
# Paste your Supabase service role key when prompted
```

---

## 🔧 Step 5: Add Keys to Environment

### For Local Development:

Add to `.env` file:

```bash
# Cloudflare Configuration
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_API_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### For Netlify:

1. Go to Netlify Dashboard → Your site
2. Click **Site settings** → **Environment variables**
3. Click **Add a variable** and add both:

| Key                     | Value    | Scope      |
| ----------------------- | -------- | ---------- |
| `CLOUDFLARE_ACCOUNT_ID` | `xxx...` | All scopes |
| `CLOUDFLARE_API_TOKEN`  | `xxx...` | All scopes |

4. Click **Save**

---

## 🧪 Step 6: Test Worker (2 minutes)

### Test Health Check Endpoint

```bash
# Test worker endpoint
curl https://autopilot-deploy-worker.your-subdomain.workers.dev/health

# Expected response:
# {"status":"ok","timestamp":"2025-10-29T04:08:00Z","environment":"production"}
```

### Test API Endpoint

```bash
# Test API endpoint
curl https://autopilot-deploy-worker.your-subdomain.workers.dev/api/status

# Expected response:
# {"autopilot":"active","version":"7.0","mode":"autonomous"}
```

---

## 🌐 Step 7: Configure Custom Domain (Optional)

If you have a custom domain on Cloudflare:

### 7.1 Add Route

1. Go to https://dash.cloudflare.com
2. Select your domain
3. Click **Workers Routes** in left sidebar
4. Click **Add route**
5. Configure:
   - **Route**: `your-domain.com/api/worker/*`
   - **Worker**: `autopilot-deploy-worker`
6. Click **Save**

### 7.2 Update wrangler.toml

```toml
routes = [
  { pattern = "your-domain.com/api/worker/*", zone_name = "your-domain.com" }
]
```

### 7.3 Redeploy

```bash
wrangler deploy
```

---

## 📊 What's Enabled Now

With Cloudflare Worker deployed:

### ✅ Edge Functions

- API rate limiting
- Request validation
- Response caching
- Geographic routing
- Load balancing

### ✅ Monitoring

- Health checks every 10 minutes
- Automated deployment monitoring
- Uptime tracking
- Performance metrics

### ✅ Security

- DDoS protection
- Bot mitigation
- SSL/TLS encryption
- WAF (Web Application Firewall)

### ✅ Performance

- Global CDN (200+ locations)
- Edge caching
- Smart routing
- Automatic optimization

---

## 📈 Monitoring and Logs

### View Worker Logs

```bash
# Tail logs in real-time
wrangler tail

# View logs for specific environment
wrangler tail --env production
```

### View Analytics

1. Go to https://dash.cloudflare.com
2. Click **Workers & Pages**
3. Click on your worker
4. View:
   - ✅ Requests per second
   - ✅ CPU time
   - ✅ Errors
   - ✅ Success rate

---

## 🔄 Automated Deployment

The GitHub Actions workflow automatically deploys the worker:

### Workflow File: `.github/workflows/cloudflare-worker-deploy.yml`

```yaml
name: Deploy Cloudflare Worker

on:
  push:
    branches: [main]
    paths:
      - 'workers/**'
      - 'wrangler.toml'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

### Add GitHub Secrets

1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Add both secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`

---

## 🔒 Security Best Practices

### ✅ DO:

- Store API token in environment variables
- Use secrets for sensitive data
- Rotate tokens periodically
- Monitor worker logs
- Set rate limits
- Use HTTPS only

### ❌ DON'T:

- Commit API token to git
- Expose secrets in worker code
- Share tokens publicly
- Use tokens in frontend
- Exceed free tier limits
- Deploy untested code

---

## 💰 Pricing

### Free Tier (Generous)

- ✅ 100,000 requests per day
- ✅ 10ms CPU time per request
- ✅ 128 MB memory
- ✅ Unlimited workers
- ✅ No credit card required

### Paid Plan ($5/month)

- ✅ 10 million requests per month
- ✅ 50ms CPU time per request
- ✅ 128 MB memory
- ✅ Additional requests: $0.50 per million

**For this project**: Free tier is sufficient for most use cases.

---

## 🆘 Troubleshooting

### Issue: "Authentication error"

**Solution**:

- Run `wrangler login` again
- Check API token is correct
- Verify token has correct permissions
- Regenerate token if needed

### Issue: "Account ID not found"

**Solution**:

- Verify account ID in Cloudflare dashboard
- Check wrangler.toml has correct account_id
- Make sure you're logged into correct account

### Issue: "Deployment failed"

**Solution**:

- Check worker code for syntax errors
- Run `wrangler dev` to test locally
- Check wrangler.toml configuration
- Review deployment logs

### Issue: "Route not working"

**Solution**:

- Verify domain is on Cloudflare
- Check route pattern is correct
- Make sure DNS is proxied (orange cloud)
- Wait a few minutes for propagation

---

## 🧪 Local Development

### Run Worker Locally

```bash
# Start local dev server
wrangler dev

# Worker runs at: http://localhost:8787
```

### Test Locally

```bash
# Test health endpoint
curl http://localhost:8787/health

# Test API endpoint
curl http://localhost:8787/api/status
```

---

## 📚 Additional Resources

### Documentation

- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler
- Workers Docs: https://developers.cloudflare.com/workers
- API Reference: https://developers.cloudflare.com/api

### Status

- Cloudflare Status: https://www.cloudflarestatus.com

### Community

- Discord: https://discord.gg/cloudflaredev
- Forum: https://community.cloudflare.com

---

## 🎉 Congratulations!

You now have **100% functionality**:

### ✅ 80% - Core LMS

- Supabase database
- Storage buckets
- Authentication
- Course catalog

### ✅ 95% - Payments + AI

- Stripe payments
- OpenAI content generation
- Revenue sharing

### ✅ 100% - Full Platform

- Social media automation
- Slack notifications
- Cloudflare edge functions
- Global CDN
- DDoS protection

---

## 📞 Support

If you encounter issues:

1. Check Cloudflare dashboard for errors
2. Review worker logs with `wrangler tail`
3. Test locally with `wrangler dev`
4. Check GitHub Actions for deployment errors
5. Autopilot will monitor and alert on worker failures

---

**Setup Time**: 10 minutes  
**Cost**: Free (100k requests/day)  
**Functionality**: Edge Functions + CDN  
**Status**: Production Ready  
**Generated by**: Autonomous Autopilot v7.0
