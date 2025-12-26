# Development Environment - Complete Setup

## ✅ What You Have

You have a **complete development environment** with:
- ✅ Dev Container configuration
- ✅ GitHub Codespaces support
- ✅ Built-in Dev Studio in admin dashboard
- ✅ CI/CD workflows
- ✅ Automated migrations
- ✅ Branch protection

---

## 🐳 Dev Container

### Configuration
**Location:** `.devcontainer/devcontainer.json`

**Features:**
- Node.js 20 (TypeScript)
- GitHub CLI
- Auto port forwarding (3000, 5432)
- VS Code extensions pre-installed
- Auto npm install on create
- Environment variable sync

### Pre-installed VS Code Extensions

**Code Quality:**
- ESLint
- Prettier
- TypeScript Next

**Development:**
- GitHub Copilot
- GitHub Copilot Chat
- GitLens
- Path Intellisense

**Frameworks:**
- Tailwind CSS IntelliSense
- Prisma

**Utilities:**
- Docker
- YAML
- Markdown All in One
- GitHub Pull Requests

### Ports

| Port | Service | Auto-Open |
|------|---------|-----------|
| 3000 | Next.js Dev Server | ✅ Yes (Preview) |
| 5432 | PostgreSQL (local) | ❌ No |

### How to Use

**Option 1: GitHub Codespaces**
1. Go to: https://github.com/elevateforhumanity/fix2
2. Click "Code" → "Codespaces" → "Create codespace on main"
3. Wait for container to build (2-3 minutes)
4. Dev environment opens in browser
5. Run: `npm run dev`
6. Preview opens automatically

**Option 2: VS Code Dev Containers**
1. Install "Dev Containers" extension in VS Code
2. Clone repository
3. Open in VS Code
4. Click "Reopen in Container" when prompted
5. Wait for container to build
6. Run: `npm run dev`

**Option 3: Local Development**
1. Clone repository
2. Run: `npm install`
3. Copy `.env.local.template` to `.env.local`
4. Add your environment variables
5. Run: `npm run dev`

---

## 🎨 Built-In Dev Studio

### Access
**URL:** [/admin/dev-studio](https://elevateforhumanity.org/admin/dev-studio)

**Requirements:**
- Admin access
- GitHub token (for repo access)

### Features

**1. Code Editor**
- Monaco Editor (VS Code engine)
- Syntax highlighting
- IntelliSense
- Multi-file editing

**2. File Tree**
- Browse repository files
- Filter by file type
- Quick file switching
- Course files filter

**3. Terminal**
- Command execution
- Output display
- Command history

**4. Preview Panel**
- Live preview
- Hot reload
- Mobile/desktop views

**5. GitHub Integration**
- Repository selector
- Branch selector
- Commit changes
- Push to GitHub

### How to Use Dev Studio

**Step 1: Connect GitHub**
1. Go to `/admin/dev-studio`
2. Enter GitHub Personal Access Token
3. Token is stored in localStorage

**Step 2: Select Repository**
1. Choose repository from dropdown
2. Default: `elevateforhumanity/fix2`

**Step 3: Select Branch**
1. Choose branch to work on
2. Default: `main`

**Step 4: Edit Files**
1. Click file in tree
2. Edit in Monaco editor
3. Changes tracked automatically

**Step 5: Save & Commit**
1. Click "Save" button
2. Enter commit message
3. Changes pushed to GitHub

### GitHub Token Setup

**Create Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "Dev Studio Access"
4. Scopes needed:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Click "Generate token"
6. Copy token immediately

**Add to Dev Studio:**
1. Go to `/admin/dev-studio`
2. Paste token in "GitHub Token" field
3. Click "Connect"

---

## 🔄 CI/CD Workflows

### Active Workflows
**Location:** `.github/workflows/`

**1. CI/CD Pipeline** (`ci-cd.yml`)
- Runs on: Push to main, Pull requests
- Steps:
  - Checkout code
  - Setup Node.js
  - Install dependencies
  - Run linting
  - Run type checking
  - Run tests
  - Build application

**2. Branch Protection** (`branch-protection.yml`)
- Enforces branch rules
- Requires reviews
- Blocks direct pushes to main

**3. Design Policy Enforcement** (`design-policy-enforcement.yml`)
- Validates design consistency
- Checks component usage
- Enforces style guidelines

**4. Supabase Migrations** (`supabase-migrations.yml`)
- Auto-runs migrations on deploy
- Seeds database
- Validates schema

**5. Supabase Auto Migrate** (`supabase-auto-migrate-seed.yml`)
- Automated migration runner
- Scheduled or manual trigger

### Workflow Status

View workflow runs:
https://github.com/elevateforhumanity/fix2/actions

---

## 📦 Package Management

### Dependencies

**Production:**
- Next.js 16.0.10
- React 19
- Supabase
- Stripe
- Resend
- And 200+ more...

**Development:**
- TypeScript
- ESLint
- Prettier
- Tailwind CSS
- PostCSS

### Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # TypeScript check
npm run format           # Format with Prettier

# Testing
npm run test             # Run tests
npm run test:watch       # Watch mode
npm run test:coverage    # Coverage report

# Database
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:reset         # Reset database

# Deployment
npm run deploy           # Deploy to Vercel
```

---

## 🔧 Environment Variables

### Required Variables

**Supabase:**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

**Stripe:**
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

**Email:**
```bash
RESEND_API_KEY=
```

**Site:**
```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_ORGANIZATION_NAME=
```

### Setup

**Local Development:**
1. Copy `.env.local.template` to `.env.local`
2. Fill in your values
3. Never commit `.env.local`

**Vercel:**
1. Go to: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/settings/environment-variables
2. Add all required variables
3. Set for Production, Preview, Development

**Dev Container:**
- Automatically syncs `VERCEL_TOKEN` from local env
- Runs `setup-env.sh` to pull other variables

---

## 🎯 Development Workflow

### Standard Workflow

**1. Create Feature Branch**
```bash
git checkout -b feature/your-feature-name
```

**2. Make Changes**
```bash
# Edit files
npm run dev  # Test locally
```

**3. Commit Changes**
```bash
git add .
git commit -m "feat: add your feature"
```

**4. Push to GitHub**
```bash
git push origin feature/your-feature-name
```

**5. Create Pull Request**
1. Go to: https://github.com/elevateforhumanity/fix2/pulls
2. Click "New pull request"
3. Select your branch
4. Fill in PR template
5. Request review

**6. Merge After Approval**
- CI/CD runs automatically
- Tests must pass
- Review required
- Auto-deploys to Vercel

### Using Dev Studio

**1. Open Dev Studio**
```
https://elevateforhumanity.org/admin/dev-studio
```

**2. Connect GitHub**
- Enter token
- Select repository

**3. Edit Files**
- Browse file tree
- Edit in Monaco
- Preview changes

**4. Commit & Push**
- Save changes
- Enter commit message
- Push to GitHub

---

## 🐛 Debugging

### VS Code Debugging

**Configuration:** `.vscode/launch.json`

**Debug Next.js:**
1. Set breakpoints in code
2. Press F5 or click "Run and Debug"
3. Choose "Next.js: debug full stack"
4. Debugger attaches to dev server

### Browser DevTools

**React DevTools:**
- Install extension
- Inspect component tree
- View props and state

**Network Tab:**
- Monitor API calls
- Check request/response
- Debug timing issues

### Logging

**Server-side:**
```typescript
import { logger } from '@/lib/logger';

logger.info('Info message');
logger.error('Error message', error);
logger.warn('Warning message');
```

**Client-side:**
```typescript
console.log('Debug info');
console.error('Error info');
```

**View Logs:**
- Vercel: https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2/logs
- Local: Terminal output

---

## 📊 Code Quality

### ESLint

**Configuration:** `.eslintrc.json`

**Rules:**
- Next.js recommended
- React hooks
- TypeScript
- Accessibility

**Run:**
```bash
npm run lint
npm run lint:fix  # Auto-fix
```

### Prettier

**Configuration:** `.prettierrc`

**Settings:**
- Single quotes
- 2 space indent
- Trailing commas
- Semicolons

**Run:**
```bash
npm run format
```

### TypeScript

**Configuration:** `tsconfig.json`

**Strict Mode:** Enabled

**Run:**
```bash
npm run type-check
```

---

## 🔐 Security

### Branch Protection

**Main Branch:**
- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ No direct pushes
- ✅ No force pushes

### Code Scanning

**GitHub Advanced Security:**
- Dependabot alerts
- Code scanning
- Secret scanning

### Environment Security

**Dev Container:**
- Isolated environment
- No secrets in image
- Environment variables from host

**Codespaces:**
- Encrypted secrets
- Automatic cleanup
- Time-limited access

---

## 📚 Documentation

### Code Documentation

**JSDoc Comments:**
```typescript
/**
 * Create a new user account
 * @param email - User email address
 * @param password - User password
 * @returns User object or error
 */
async function createUser(email: string, password: string) {
  // Implementation
}
```

### API Documentation

**Location:** `/docs/api/`

**Format:** OpenAPI/Swagger

### Component Documentation

**Storybook:** (If configured)
- Component library
- Interactive examples
- Props documentation

---

## 🚀 Deployment

### Vercel Deployment

**Automatic:**
- Push to `main` → Production deploy
- Pull request → Preview deploy
- Commit to branch → Preview deploy

**Manual:**
```bash
npm run deploy
# or
vercel --prod
```

### Preview Deployments

**Every PR gets:**
- Unique preview URL
- Full environment
- Database access
- All features enabled

**Example:**
```
https://fix2-git-feature-branch-elevateforhumanity.vercel.app
```

---

## 💡 Tips & Tricks

### Dev Container

**Rebuild Container:**
```bash
# In VS Code
Cmd/Ctrl + Shift + P → "Dev Containers: Rebuild Container"
```

**Access Container Shell:**
```bash
# In VS Code terminal
# You're already in the container!
```

### Dev Studio

**Keyboard Shortcuts:**
- `Cmd/Ctrl + S` - Save file
- `Cmd/Ctrl + F` - Find in file
- `Cmd/Ctrl + /` - Toggle comment

**Quick File Switch:**
- Click file in tree
- Or use search/filter

### GitHub Codespaces

**Stop Codespace:**
- Closes automatically after 30 min idle
- Or manually stop in GitHub

**Resume Codespace:**
- Go to GitHub → Codespaces
- Click your codespace
- Resumes where you left off

---

## 🆘 Troubleshooting

### Issue: Dev Container won't build

**Solution:**
```bash
# Rebuild without cache
Cmd/Ctrl + Shift + P → "Dev Containers: Rebuild Container Without Cache"
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Issue: Environment variables not loading

**Solution:**
```bash
# Check .env.local exists
ls -la .env.local

# Restart dev server
npm run dev
```

### Issue: Dev Studio can't connect to GitHub

**Solution:**
1. Check token has correct scopes
2. Token not expired
3. Repository access granted
4. Clear localStorage and re-enter token

---

## 📋 Quick Reference

### URLs

| Service | URL |
|---------|-----|
| Dev Studio | https://elevateforhumanity.org/admin/dev-studio |
| GitHub Repo | https://github.com/elevateforhumanity/fix2 |
| Vercel Dashboard | https://vercel.com/team_wnZ7iyQz1kUNni7yIDVUnhZf/fix2 |
| Supabase Dashboard | https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk |
| GitHub Actions | https://github.com/elevateforhumanity/fix2/actions |
| GitHub Codespaces | https://github.com/codespaces |

### Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run lint                   # Lint code
npm run type-check             # Check types

# Git
git checkout -b feature/name   # New branch
git add .                      # Stage changes
git commit -m "message"        # Commit
git push origin branch-name    # Push

# Vercel
vercel                         # Deploy preview
vercel --prod                  # Deploy production
vercel logs                    # View logs
```

---

## 🎉 Summary

**You have a complete development environment with:**

✅ **Dev Container** - Consistent dev environment
✅ **GitHub Codespaces** - Cloud development
✅ **Built-in Dev Studio** - Browser-based IDE
✅ **CI/CD Workflows** - Automated testing and deployment
✅ **Branch Protection** - Code quality enforcement
✅ **Auto Migrations** - Database management
✅ **Preview Deployments** - Test before merge

**Everything is configured and ready to use!**

---

**Last Updated:** December 26, 2025

**Status:** ✅ Fully configured and operational

**Access Dev Studio:** [/admin/dev-studio](https://elevateforhumanity.org/admin/dev-studio)
