# 🤖 Advanced Autopilot - Environment Sync

## Your Advanced Autopilot Can Do This!

Your autopilot system can now **instruct a worker inside Vercel** to automatically pull and sync all environment variables!

---

## 🎯 How It Works

```
┌─────────────────────────────────────────────────────────┐
│  Your Command (Local)                                    │
│  $ node scripts/autopilot-sync-env.mjs                  │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Autopilot Orchestrator                                  │
│  Sends instruction to Vercel worker                      │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Worker Inside Vercel                                    │
│  /api/autopilot/sync-env                                │
│  - Connects to Vercel API                               │
│  - Pulls ALL environment variables                       │
│  - Categorizes and formats them                          │
│  - Returns complete .env.local content                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│  Your Local .env.local                                   │
│  All variables synced automatically! ✅                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 Setup (One-Time)

### Step 1: Generate Autopilot Secret

```bash
# Generate a secure secret
openssl rand -base64 32
```

### Step 2: Set Secrets in Vercel

Go to: https://vercel.com/team_Ae8f33vVYR36quLOS8HCeROs/fix2/settings/environment-variables

Add these variables:

**AUTOPILOT_SECRET**
```
[Paste the secret you generated]
```
- Environments: ✅ Production, ✅ Preview, ✅ Development

**VERCEL_TOKEN**
```
[Get from: https://vercel.com/account/tokens]
```
- Environments: ✅ Production, ✅ Preview, ✅ Development

**VERCEL_PROJECT_ID** (Already set)
```
prj_iUns4lz1mbDP6kRIcukXFVsDWUAV
```

**VERCEL_TEAM_ID** (Already set)
```
team_Ae8f33vVYR36quLOS8HCeROs
```

### Step 3: Set Secret Locally

```bash
# Set in Gitpod
gp env AUTOPILOT_SECRET='your-secret-here'

# Or export for this session
export AUTOPILOT_SECRET='your-secret-here'
```

### Step 4: Deploy to Vercel

```bash
# Deploy the autopilot worker
vercel --prod
```

---

## ⚡ Usage

Once deployed, use the autopilot to sync variables:

```bash
# Run the autopilot
node scripts/autopilot-sync-env.mjs
```

**That's it!** The autopilot will:
1. ✅ Connect to your Vercel worker
2. ✅ Instruct it to pull all variables
3. ✅ Download the complete .env.local
4. ✅ Save it locally

---

## 📋 What You'll See

```bash
🤖 Advanced Autopilot - Environment Sync
=========================================

✅ Autopilot secret found
🎯 Target: https://fix2.vercel.app

📡 Step 1: Verifying worker status...
✅ Worker active: env-sync-autopilot
   Version: 1.0.0

📥 Step 2: Instructing worker to sync environment variables...
✅ Worker synced successfully!

📊 Results:
   Total variables: 45

📋 By category:
   supabase: 3 variables
   stripe: 3 variables
   email: 6 variables
   auth: 3 variables
   ai: 2 variables
   analytics: 2 variables
   other: 26 variables

💾 Step 3: Saving to .env.local...
   Backup created: .env.local.backup.1734303600000
✅ Saved to .env.local

📝 Variables synced:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   - STRIPE_SECRET_KEY
   - STRIPE_WEBHOOK_SECRET
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - SMTP_HOST
   - SMTP_USER
   ... and 35 more

🎉 Environment sync complete!

Next steps:
1. Review .env.local
2. Start your app: pnpm run dev
```

---

## 🎯 Features

### Automatic Categorization
Variables are automatically organized by category:
- Supabase (database)
- Stripe (payments)
- Email (SMTP)
- Authentication (NextAuth)
- AI Services (OpenAI, ElevenLabs)
- Analytics (GA, Sentry)
- Site Configuration
- Other

### Automatic Backup
- Creates backup before overwriting
- Format: `.env.local.backup.{timestamp}`

### Security
- Requires AUTOPILOT_SECRET
- Worker runs inside Vercel (secure)
- No credentials exposed

### Real-time Sync
- Pulls latest values from Vercel
- Always up-to-date
- No manual copying

---

## 📡 API Endpoints

The worker exposes these endpoints:

### GET /api/autopilot/sync-env
Check worker status

**Response:**
```json
{
  "status": "active",
  "worker": "env-sync-autopilot",
  "version": "1.0.0",
  "timestamp": "2025-12-15T22:30:00Z"
}
```

### POST /api/autopilot/sync-env
Sync environment variables

**Headers:**
```
Authorization: Bearer {AUTOPILOT_SECRET}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully synced 45 environment variables",
  "variables": {
    "total": 45,
    "categories": {
      "supabase": 3,
      "stripe": 3,
      "email": 6,
      ...
    },
    "keys": ["NEXT_PUBLIC_SUPABASE_URL", ...]
  },
  "envContent": "# ENVIRONMENT VARIABLES...",
  "timestamp": "2025-12-15T22:30:00Z"
}
```

---

## 🔧 Advanced Usage

### Sync from Script
```javascript
import { instructEnvSync } from '@/lib/autopilot/env-sync-orchestrator';

const result = await instructEnvSync();
console.log(result);
```

### Verify Worker
```bash
curl https://fix2.vercel.app/api/autopilot/sync-env
```

### Manual Sync
```bash
curl -X POST https://fix2.vercel.app/api/autopilot/sync-env \
  -H "Authorization: Bearer YOUR_AUTOPILOT_SECRET" \
  -H "Content-Type: application/json"
```

---

## 🔒 Security

### Worker Authentication
- Requires `AUTOPILOT_SECRET` header
- Unauthorized requests are rejected
- Secret is never exposed

### Vercel Token
- Stored securely in Vercel environment
- Never exposed to client
- Used only by worker

### Environment Variables
- Pulled via Vercel API
- Transmitted securely
- Saved locally (gitignored)

---

## 🎯 Benefits

### vs Manual Copy:
- ⚡ **Faster:** One command vs 30 minutes
- 🤖 **Automated:** No manual copying
- ✅ **Accurate:** No typos or missing vars
- 🔄 **Repeatable:** Run anytime to sync

### vs Vercel CLI:
- 🚀 **Advanced:** Uses your autopilot system
- 📊 **Organized:** Categorizes variables
- 💾 **Backup:** Automatic backup creation
- 🎯 **Integrated:** Part of your workflow

---

## 📊 Files Created

```
api/
└── autopilot/
    └── sync-env.ts              # Worker inside Vercel

lib/
└── autopilot/
    └── env-sync-orchestrator.ts # Orchestrator

scripts/
└── autopilot-sync-env.mjs       # CLI tool

ADVANCED_AUTOPILOT_ENV_SYNC.md   # This guide
```

---

## 🚀 Quick Start

**One-time setup:**
```bash
# 1. Generate secret
openssl rand -base64 32

# 2. Set in Vercel dashboard
# Add AUTOPILOT_SECRET and VERCEL_TOKEN

# 3. Set locally
gp env AUTOPILOT_SECRET='your-secret'

# 4. Deploy
vercel --prod
```

**Every time you need to sync:**
```bash
node scripts/autopilot-sync-env.mjs
```

**Done!** All variables synced automatically! 🎉

---

## 🆚 Comparison

| Method | Time | Automated | Categorized | Backup |
|--------|------|-----------|-------------|--------|
| **Advanced Autopilot** | 10 sec | ✅ Yes | ✅ Yes | ✅ Yes |
| Vercel CLI | 2 min | ✅ Yes | ❌ No | ❌ No |
| Manual Copy | 30 min | ❌ No | ❌ No | ❌ No |

---

## ✅ Summary

**Your advanced autopilot can now:**
1. ✅ Instruct workers inside Vercel
2. ✅ Pull all environment variables automatically
3. ✅ Categorize and organize them
4. ✅ Save to .env.local with backup
5. ✅ Run with one command

**Command:**
```bash
node scripts/autopilot-sync-env.mjs
```

**Result:** All Vercel variables → `.env.local` automatically! 🚀
