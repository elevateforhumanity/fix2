# 🤖 AUTOPILOT: Supabase Keys Setup

## 🎯 OBJECTIVE

Automatically retrieve and configure Supabase keys for the project using GitHub Actions.

**Project URL**: https://cuxzzpsyufcewtmicszk.supabase.co  
**Project Reference**: `cuxzzpsyufcewtmicszk`

---

## 🚀 QUICK START (3 Methods)

### Method 1: Automated Script (Recommended)

```bash
# Run the automated setup script
bash scripts/add-github-secrets.sh
```

This script will:

1. ✅ Check GitHub CLI is installed
2. ✅ Prompt you for each secret
3. ✅ Add secrets to GitHub repository
4. ✅ Trigger the autopilot workflow

### Method 2: GitHub Actions Workflow

1. **Get your Supabase keys**:
   - Visit: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
   - Copy the **anon public** key
   - Copy the **service_role** key

2. **Add to GitHub Secrets**:
   - Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
   - Click "New repository secret"
   - Add `SUPABASE_ANON_KEY` with the anon key
   - Add `SUPABASE_SERVICE_ROLE_KEY` with the service role key

3. **Run the workflow**:
   - Go to: https://github.com/elevateforhumanity/fix2/actions/workflows/setup-supabase-keys.yml
   - Click "Run workflow"
   - Wait for completion

### Method 3: Manual Setup

```bash
# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
EOF

# Start development server
npm run dev
```

---

## 📋 WHAT THE AUTOPILOT DOES

The GitHub Actions workflow (`.github/workflows/setup-supabase-keys.yml`) automatically:

1. ✅ **Checks Project Status**
   - Verifies Supabase project is accessible
   - Extracts project reference

2. ✅ **Retrieves Keys from GitHub Secrets**
   - Looks for `SUPABASE_ANON_KEY`
   - Looks for `SUPABASE_SERVICE_ROLE_KEY`

3. ✅ **Creates Environment File**
   - Generates `.env.local` with all keys
   - Includes optional keys (Stripe, Resend, etc.)

4. ✅ **Verifies Configuration**
   - Tests Supabase connection
   - Validates keys are working

5. ✅ **Updates Netlify** (if configured)
   - Sets environment variables in Netlify
   - Triggers redeployment

6. ✅ **Provides Instructions**
   - Shows what's missing
   - Links to where to get keys
   - Guides next steps

---

## 🔑 REQUIRED SECRETS

Add these to GitHub Secrets:

| Secret Name                 | Description                | Where to Get                                                                             |
| --------------------------- | -------------------------- | ---------------------------------------------------------------------------------------- |
| `SUPABASE_ANON_KEY`         | Public/anon key            | [API Settings](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (secret!) | [API Settings](https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api) |

---

## 🔧 OPTIONAL SECRETS (for full functionality)

| Secret Name              | Description           | Purpose             |
| ------------------------ | --------------------- | ------------------- |
| `RESEND_API_KEY`         | Resend API key        | Email notifications |
| `STRIPE_SECRET_KEY`      | Stripe secret key     | Payment processing  |
| `STRIPE_PUBLISHABLE_KEY` | Stripe public key     | Payment forms       |
| `STRIPE_WEBHOOK_SECRET`  | Stripe webhook secret | Payment webhooks    |
| `NETLIFY_AUTH_TOKEN`     | Netlify token         | Auto-deployment     |
| `NETLIFY_SITE_ID`        | Netlify site ID       | Auto-deployment     |

---

## 📖 STEP-BY-STEP GUIDE

### Step 1: Get Supabase Keys

1. **Login to Supabase**:

   ```
   https://app.supabase.com
   ```

2. **Navigate to your project**:

   ```
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
   ```

3. **Go to API Settings**:

   ```
   https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
   ```

4. **Copy the keys**:
   - **Project URL**: `https://cuxzzpsyufcewtmicszk.supabase.co (already known)
   - **anon public**: Long string starting with `eyJhbGci...`
   - **service_role**: Different long string starting with `eyJhbGci...`

### Step 2: Add to GitHub Secrets

**Option A: Using GitHub CLI**

```bash
# Install GitHub CLI if needed
# macOS: brew install gh
# Linux: https://github.com/cli/cli/blob/trunk/docs/installlinux.md

# Login
gh auth login

# Add secrets
gh secret set SUPABASE_ANON_KEY --repo elevateforhumanity/fix2
# Paste your anon key when prompted

gh secret set SUPABASE_SERVICE_ROLE_KEY --repo elevateforhumanity/fix2
# Paste your service role key when prompted
```

**Option B: Using GitHub Web Interface**

1. Go to: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
2. Click "New repository secret"
3. Name: `SUPABASE_ANON_KEY`
4. Value: Paste your anon key
5. Click "Add secret"
6. Repeat for `SUPABASE_SERVICE_ROLE_KEY`

### Step 3: Run Autopilot Workflow

**Option A: Using GitHub CLI**

```bash
gh workflow run setup-supabase-keys.yml --repo elevateforhumanity/fix2
```

**Option B: Using GitHub Web Interface**

1. Go to: https://github.com/elevateforhumanity/fix2/actions
2. Click "Setup Supabase Keys (Autopilot)"
3. Click "Run workflow"
4. Click "Run workflow" button

### Step 4: Verify Setup

```bash
# Check workflow status
gh run list --workflow=setup-supabase-keys.yml --repo elevateforhumanity/fix2

# Or view in browser
# https://github.com/elevateforhumanity/fix2/actions/workflows/setup-supabase-keys.yml
```

---

## 🧪 TESTING THE SETUP

After the workflow completes:

```bash
# Pull latest changes
git pull

# Check .env.local was created
cat .env.local

# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
# Should NOT see "project's URL and Key are required" error
```

---

## 🐛 TROUBLESHOOTING

### Error: "Secrets not found"

**Solution**: Add secrets to GitHub first

```bash
# Check what secrets exist
gh secret list --repo elevateforhumanity/fix2

# Add missing secrets
bash scripts/add-github-secrets.sh
```

### Error: "GitHub CLI not found"

**Solution**: Install GitHub CLI

```bash
# macOS
brew install gh

# Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Then login
gh auth login
```

### Error: "Workflow failed"

**Solution**: Check the workflow logs

```bash
# View recent runs
gh run list --workflow=setup-supabase-keys.yml --repo elevateforhumanity/fix2

# View specific run (replace RUN_ID)
gh run view RUN_ID --repo elevateforhumanity/fix2 --log
```

### Error: "Permission denied"

**Solution**: Make script executable

```bash
chmod +x scripts/add-github-secrets.sh
```

---

## 📊 WORKFLOW DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTOPILOT WORKFLOW                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Check Project   │
                    │     Status       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Get Keys from   │
                    │ GitHub Secrets   │
                    └────────┬─────────┘
                             │
                    ┌────────┴─────────┐
                    │                  │
                    ▼                  ▼
            ┌──────────────┐   ┌──────────────┐
            │ Keys Found?  │   │ Keys Missing?│
            │     YES      │   │     NO       │
            └──────┬───────┘   └──────┬───────┘
                   │                  │
                   ▼                  ▼
         ┌──────────────────┐  ┌──────────────────┐
         │ Create .env.local│  │ Show Instructions│
         └────────┬─────────┘  │  on how to add   │
                  │            │      keys        │
                  ▼            └──────────────────┘
         ┌──────────────────┐
         │ Verify Config    │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │ Update Netlify   │
         │  (if configured) │
         └────────┬─────────┘
                  │
                  ▼
         ┌──────────────────┐
         │  ✅ SUCCESS!     │
         │  App is ready    │
         └──────────────────┘
```

---

## 🎯 SUCCESS CRITERIA

After running the autopilot, you should have:

- ✅ `.env.local` file created with all keys
- ✅ Supabase connection working
- ✅ No "project's URL and Key are required" error
- ✅ Application starts without errors
- ✅ Can sign up / login
- ✅ Can access LMS dashboard

---

## 📞 SUPPORT

### If you need help:

1. **Check the workflow logs**:

   ```bash
   gh run list --workflow=setup-supabase-keys.yml --repo elevateforhumanity/fix2
   ```

2. **Review the setup guide**:
   - [SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)

3. **Contact support**:
   - Phone: (317) 314-3757
   - Email: support@elevateforhumanity.org

---

## 🔗 USEFUL LINKS

- **Supabase Dashboard**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
- **API Settings**: https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk/settings/api
- **GitHub Secrets**: https://github.com/elevateforhumanity/fix2/settings/secrets/actions
- **GitHub Actions**: https://github.com/elevateforhumanity/fix2/actions
- **Workflow**: https://github.com/elevateforhumanity/fix2/actions/workflows/setup-supabase-keys.yml

---

## ✅ CHECKLIST

Before running autopilot:

- [ ] Have access to Supabase dashboard
- [ ] Can view API settings
- [ ] Have GitHub repository access
- [ ] GitHub CLI installed (optional but recommended)
- [ ] Authenticated with GitHub

After running autopilot:

- [ ] Workflow completed successfully
- [ ] `.env.local` file exists
- [ ] Application starts without errors
- [ ] Can access homepage
- [ ] Can sign up / login
- [ ] No console errors

---

**The autopilot will handle everything else automatically!** 🤖✨
