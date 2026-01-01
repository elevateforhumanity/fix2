# Dev Container Setup - Complete Guide

## ✅ What's Configured

Your dev container is now configured with:

- ✅ **Node.js 20** - TypeScript/Next.js development
- ✅ **PostgreSQL 16** - Local database for development
- ✅ **GitHub CLI** - Git operations and GitHub integration
- ✅ **GitHub Copilot** - AI-powered code completion
- ✅ **VS Code Extensions** - Pre-installed development tools
- ✅ **Auto Setup** - Automatic npm install and environment setup

**Platform Support:**

- ✅ **GitHub Codespaces** - Cloud development environment
- ✅ **VS Code Dev Containers** - Local containerized development
- ❌ **NOT Gitpod** - This is configured for GitHub/VS Code, not Gitpod

---

## 🐳 Dev Container Features

### 1. Node.js 20

**Purpose:** JavaScript/TypeScript runtime
**Version:** 20.x LTS
**Includes:**

- npm
- npx
- node
- TypeScript support

### 2. PostgreSQL 16

**Purpose:** Local database for development
**Version:** 16.x
**Configuration:**

- Host: `localhost`
- Port: `5432`
- User: `postgres`
- Password: `postgres`
- Database: `postgres` (default)

**Access:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Or use the PostgreSQL extension in VS Code
```

### 3. GitHub CLI

**Purpose:** GitHub operations from terminal
**Commands:**

```bash
gh auth login          # Authenticate with GitHub
gh repo view           # View repository
gh pr list             # List pull requests
gh issue list          # List issues
gh copilot suggest     # Get AI suggestions
```

### 4. VS Code Extensions

**Pre-installed:**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **GitHub Copilot** - AI code completion
- **GitHub Copilot Chat** - AI assistant
- **GitLens** - Git supercharged
- **TypeScript Next** - TypeScript support
- **GitHub Pull Requests** - PR management
- **YAML** - YAML file support
- **Docker** - Container management
- **Path Intellisense** - Path autocomplete
- **Markdown All in One** - Markdown support
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Prisma** - Database ORM support
- **PostgreSQL Client** - Database management

---

## 🚀 How to Use

### Option 1: GitHub Codespaces (Recommended)

**Step 1: Open in Codespaces**

1. Go to: https://github.com/elevateforhumanity/fix2
2. Click "Code" button
3. Click "Codespaces" tab
4. Click "Create codespace on main"

**Step 2: Wait for Setup**

- Container builds (2-3 minutes first time)
- npm install runs automatically
- Environment setup runs automatically
- VS Code opens in browser

**Step 3: Start Development**

```bash
# Start dev server
npm run dev

# Preview opens automatically at port 3000
```

**Benefits:**

- ✅ No local setup needed
- ✅ Consistent environment
- ✅ Access from anywhere
- ✅ Free 60 hours/month (GitHub Pro)
- ✅ Free 120 hours/month (GitHub Team)

---

### Option 2: VS Code Dev Containers (Local)

**Prerequisites:**

- Docker Desktop installed
- VS Code installed
- "Dev Containers" extension installed

**Step 1: Clone Repository**

```bash
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2
```

**Step 2: Open in Container**

1. Open folder in VS Code
2. Click "Reopen in Container" when prompted
   - Or: `Cmd/Ctrl + Shift + P` → "Dev Containers: Reopen in Container"

**Step 3: Wait for Setup**

- Container builds (5-10 minutes first time)
- npm install runs automatically
- Environment setup runs automatically

**Step 4: Start Development**

```bash
npm run dev
```

**Benefits:**

- ✅ Works offline
- ✅ Faster than cloud
- ✅ Full control
- ✅ No usage limits

---

## 🗄️ PostgreSQL Setup

### Local Database Configuration

**Connection Details:**

```
Host: localhost
Port: 5432
User: postgres
Password: postgres
Database: postgres
```

### Connect to PostgreSQL

**Option 1: Command Line**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE elevate_dev;

# List databases
\l

# Connect to database
\c elevate_dev

# List tables
\dt

# Exit
\q
```

**Option 2: VS Code Extension**

1. Click PostgreSQL icon in sidebar
2. Click "+" to add connection
3. Enter connection details:
   - Host: `localhost`
   - Port: `5432`
   - User: `postgres`
   - Password: `postgres`
4. Click "Connect"
5. Browse tables, run queries

**Option 3: pgAdmin (External)**

```bash
# Install pgAdmin locally
# Connect to localhost:5432
```

### Run Migrations

**Using Supabase CLI:**

```bash
# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref cuxzzpsyufcewtmicszk

# Run migrations
supabase db push
```

**Using SQL Files:**

```bash
# Run migration file
psql -U postgres -d elevate_dev -f supabase/migrations/your_migration.sql
```

### Seed Database

```bash
# Run seed script
npm run db:seed

# Or manually
psql -U postgres -d elevate_dev -f supabase/seed.sql
```

---

## 🔧 Environment Variables

### Auto Setup

The dev container automatically:

1. Checks for `.env.local`
2. If missing and `VERCEL_TOKEN` is set
3. Runs `setup-env.sh` to pull variables from Vercel

### Manual Setup

**Option 1: Copy Template**

```bash
cp .env.local.template .env.local
# Edit .env.local with your values
```

**Option 2: Pull from Vercel**

```bash
# Set Vercel token
export VERCEL_TOKEN=your_token

# Run setup script
./setup-env.sh
```

**Option 3: Manual Entry**

```bash
# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
# ... other variables
EOF
```

---

## 🎯 GitHub Integration

### GitHub Copilot

**Activate:**

1. Sign in to GitHub in VS Code
2. Copilot activates automatically
3. Start typing - suggestions appear

**Usage:**

```javascript
// Type a comment describing what you want
// Copilot suggests code

// Example:
// Function to fetch user by email
// Copilot will suggest the implementation
```

**Chat:**

- Open Copilot Chat: `Cmd/Ctrl + I`
- Ask questions about code
- Get explanations
- Generate tests

### GitHub CLI

**Authenticate:**

```bash
gh auth login
# Follow prompts
```

**Common Commands:**

```bash
# View repository
gh repo view

# Create PR
gh pr create --title "Feature" --body "Description"

# List PRs
gh pr list

# Checkout PR
gh pr checkout 123

# Create issue
gh issue create --title "Bug" --body "Description"

# View issues
gh issue list
```

---

## 📦 Port Forwarding

### Automatic Ports

**Port 3000 - Next.js Dev Server**

- Auto-forwards
- Opens preview automatically
- Label: "Next.js Dev Server"

**Port 5432 - PostgreSQL**

- Auto-forwards
- Doesn't auto-open
- Label: "PostgreSQL"

### Manual Port Forwarding

**In Codespaces:**

1. Go to "Ports" tab
2. Click "Forward a Port"
3. Enter port number
4. Set visibility (Private/Public)

**In VS Code:**

1. `Cmd/Ctrl + Shift + P`
2. "Forward a Port"
3. Enter port number

---

## 🔄 Lifecycle Scripts

### postCreateCommand

**Runs:** Once when container is created
**Command:** `npm install && chmod +x setup-env.sh`
**Purpose:** Install dependencies and prepare setup script

### postStartCommand

**Runs:** Every time container starts
**Command:** `if [ ! -f .env.local ] && [ -n "$VERCEL_TOKEN" ]; then ./setup-env.sh; fi`
**Purpose:** Auto-setup environment if needed

---

## 🎨 VS Code Settings

### Auto-configured:

**Editor:**

- Format on save: ✅ Enabled
- Default formatter: Prettier
- Auto-fix ESLint on save

**TypeScript:**

- Use workspace TypeScript
- Enable prompt for workspace TS

**Extensions:**

- All pre-installed
- Auto-activated

---

## 🔐 Security

### Secrets Management

**GitHub Codespaces:**

1. Go to: https://github.com/settings/codespaces
2. Click "New secret"
3. Add secrets (e.g., `VERCEL_TOKEN`)
4. Select repositories
5. Secrets available in codespace

**Local Dev Containers:**

- Use `.env.local` (gitignored)
- Never commit secrets
- Use environment variables

### PostgreSQL Security

**Development:**

- Default password: `postgres`
- Only accessible from container
- Not exposed to internet

**Production:**

- Use Supabase (already configured)
- Never use local DB for production
- Secure credentials in Vercel

---

## 🚨 Troubleshooting

### Issue: Container won't build

**Solution:**

```bash
# Rebuild without cache
Cmd/Ctrl + Shift + P → "Dev Containers: Rebuild Container Without Cache"
```

### Issue: PostgreSQL won't start

**Solution:**

```bash
# Check PostgreSQL status
sudo service postgresql status

# Start PostgreSQL
sudo service postgresql start

# Restart PostgreSQL
sudo service postgresql restart
```

### Issue: Port 3000 already in use

**Solution:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: npm install fails

**Solution:**

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Environment variables not loading

**Solution:**

```bash
# Check .env.local exists
ls -la .env.local

# Verify contents
cat .env.local

# Restart dev server
npm run dev
```

---

## 💡 Pro Tips

### 1. Use GitHub Copilot

- Write comments describing what you want
- Let Copilot generate code
- Review and accept suggestions

### 2. Use PostgreSQL Extension

- Browse database visually
- Run queries in VS Code
- Export/import data

### 3. Use GitHub CLI

- Create PRs from terminal
- Review code faster
- Automate workflows

### 4. Use Codespaces Secrets

- Store API keys securely
- Access across codespaces
- Never commit secrets

### 5. Customize Container

- Edit `.devcontainer/devcontainer.json`
- Add more features
- Install additional tools

---

## 📊 Comparison

### GitHub Codespaces vs Local Dev Containers

| Feature           | Codespaces | Local            |
| ----------------- | ---------- | ---------------- |
| Setup Time        | 2-3 min    | 5-10 min         |
| Internet Required | Yes        | No (after build) |
| Performance       | Good       | Excellent        |
| Cost              | Free tier  | Free             |
| Access            | Anywhere   | Local only       |
| Storage           | Cloud      | Local disk       |

**Recommendation:**

- **Codespaces:** Quick edits, collaboration, travel
- **Local:** Heavy development, offline work, performance

---

## 🎓 Learning Resources

### GitHub Codespaces

- Docs: https://docs.github.com/en/codespaces
- Quickstart: https://docs.github.com/en/codespaces/getting-started

### Dev Containers

- Docs: https://code.visualstudio.com/docs/devcontainers/containers
- Specification: https://containers.dev/

### PostgreSQL

- Docs: https://www.postgresql.org/docs/
- Tutorial: https://www.postgresqltutorial.com/

### GitHub Copilot

- Docs: https://docs.github.com/en/copilot
- Getting Started: https://github.com/features/copilot

---

## 🎉 Summary

**Your dev container includes:**

✅ **Node.js 20** - JavaScript/TypeScript runtime
✅ **PostgreSQL 16** - Local database
✅ **GitHub CLI** - GitHub integration
✅ **GitHub Copilot** - AI code completion
✅ **14 VS Code Extensions** - Development tools
✅ **Auto Setup** - npm install + environment
✅ **Port Forwarding** - 3000 (Next.js), 5432 (PostgreSQL)
✅ **Volume Mount** - Persistent PostgreSQL data

**Platform Support:**
✅ **GitHub Codespaces** - Cloud development
✅ **VS Code Dev Containers** - Local development
❌ **NOT Gitpod** - Configured for GitHub/VS Code

**Quick Start:**

1. Open in GitHub Codespaces or VS Code
2. Wait for auto-setup
3. Run `npm run dev`
4. Start coding!

---

**Last Updated:** December 26, 2025

**Status:** ✅ Fully configured with PostgreSQL and GitHub integration

**Platform:** GitHub Codespaces + VS Code Dev Containers (NOT Gitpod)
