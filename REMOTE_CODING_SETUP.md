# 🖥️ Remote Coding Setup - Admin Dashboard Development

## Yes! You Can Code Like Gitpod Anywhere

Your repository is configured for remote development. You can build pages and code from any environment.

---

## Option 1: GitHub Codespaces (Recommended)

**Best for**: Quick access, no setup needed

### Setup:
1. Go to your repository: https://github.com/elevateforhumanity/fix2
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait 2-3 minutes for environment to build
4. Start coding!

### Features:
- ✅ Full VS Code in browser
- ✅ Terminal access
- ✅ Git integration
- ✅ Port forwarding (preview apps)
- ✅ Same as Gitpod experience
- ✅ Free tier: 60 hours/month

### Commands:
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Access at forwarded port (automatic)
```

---

## Option 2: Gitpod

**Best for**: If you're already using Gitpod

### Setup:
1. Open: https://gitpod.io/#https://github.com/elevateforhumanity/fix2
2. Wait for workspace to start
3. Environment auto-configures from `.gitpod-automation.yml`

### Features:
- ✅ Pre-configured environment
- ✅ Automatic dependency installation
- ✅ Database migrations run automatically
- ✅ Dev server auto-starts
- ✅ Free tier: 50 hours/month

---

## Option 3: VS Code Remote SSH

**Best for**: Using your own server/VPS

### Setup:
```bash
# On your server
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2
npm install

# In VS Code
# Install "Remote - SSH" extension
# Connect to your server
# Open folder: /path/to/fix2
```

### Features:
- ✅ Full local VS Code experience
- ✅ Your own server resources
- ✅ No time limits
- ✅ Complete control

---

## Option 4: Local Development

**Best for**: Working offline or with full control

### Setup:
```bash
# Clone repository
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local
# Add your Supabase credentials

# Start dev server
npm run dev
```

---

## Building Admin Dashboard Pages

### File Structure:
```
app/
├── admin/
│   ├── page.tsx                    # Admin dashboard home
│   ├── students/page.tsx           # Student management
│   ├── courses/page.tsx            # Course management
│   ├── staff/page.tsx              # Staff management
│   ├── cash-advances/page.tsx      # NEW: Cash advance admin
│   ├── tax-filing/page.tsx         # NEW: Tax filing admin
│   └── analytics/page.tsx          # Analytics dashboard
```

### Example: Create Cash Advance Admin Page

```bash
# Create new admin page
touch app/admin/cash-advances/page.tsx
```

```typescript
// app/admin/cash-advances/page.tsx
import { createServerClient } from '@/lib/supabase-server';

export default async function CashAdvancesAdmin() {
  const supabase = createServerClient();
  
  // Fetch applications
  const { data: applications } = await supabase
    .from('cash_advance_applications')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Cash Advance Applications</h1>
      
      <div className="bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications?.map((app) => (
              <tr key={app.id}>
                <td>{app.first_name} {app.last_name}</td>
                <td>${app.requested_amount}</td>
                <td>{app.status}</td>
                <td>{new Date(app.created_at).toLocaleDateString()}</td>
                <td>
                  <button>View</button>
                  <button>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

### Preview Changes:
```bash
# Dev server auto-reloads
npm run dev

# Access at:
# - Codespaces: Forwarded port (automatic)
# - Gitpod: Preview URL (automatic)
# - Local: http://localhost:3000
```

---

## Git Workflow

### Make Changes:
```bash
# Create feature branch
git checkout -b feature/admin-cash-advances

# Make changes to files
# ...

# Stage changes
git add app/admin/cash-advances/

# Commit
git commit -m "Add cash advance admin dashboard"

# Push to GitHub
git push origin feature/admin-cash-advances
```

### Create Pull Request:
```bash
# Using GitHub CLI
gh pr create --title "Add cash advance admin" --body "Admin dashboard for managing cash advance applications"

# Or via GitHub web interface
```

---

## Development Commands

### Start Development:
```bash
npm run dev              # Start dev server
npm run build            # Test production build
npm run lint             # Check code quality
npm run type-check       # Check TypeScript
```

### Database:
```bash
npm run db:migrate       # Run migrations
npm run db:seed          # Seed data
node check-database.mjs  # Test connection
```

### Testing:
```bash
npm run test             # Run tests
npm run test:e2e         # End-to-end tests
```

---

## Environment Variables

### For Development:
```bash
# .env.local (local/Codespaces/Gitpod)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### For Production (Vercel):
```bash
# Add via Vercel dashboard or CLI
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

---

## Recommended Extensions

### VS Code Extensions:
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **TypeScript** - Type checking
- **GitLens** - Git integration
- **Thunder Client** - API testing

### Install All:
```bash
# Extensions auto-install in Codespaces/Gitpod
# For local, install from VS Code marketplace
```

---

## Live Preview

### Codespaces:
- Ports auto-forward
- Click "Open in Browser" when dev server starts
- URL: `https://xxx-3000.app.github.dev`

### Gitpod:
- Preview URL auto-generated
- Access from "Ports" panel
- URL: `https://3000-xxx.ws-us.gitpod.io`

### Local:
- Access at `http://localhost:3000`
- Admin dashboard: `http://localhost:3000/admin`

---

## Deployment Workflow

### 1. Develop Locally/Remote:
```bash
# Make changes
# Test locally
npm run dev
```

### 2. Push to GitHub:
```bash
git add .
git commit -m "Add new admin features"
git push origin main
```

### 3. Auto-Deploy (Vercel):
- Vercel watches `main` branch
- Auto-deploys on push
- Preview deployments for PRs

### 4. Manual Deploy:
```bash
vercel --prod
```

---

## Admin Dashboard Pages to Build

### Priority 1 (Core):
- [ ] `/admin/cash-advances` - Manage cash advance applications
- [ ] `/admin/tax-filing` - Manage tax filing applications
- [ ] `/admin/students` - Enhanced student management
- [ ] `/admin/courses` - Course content management

### Priority 2 (Enhanced):
- [ ] `/admin/analytics` - Advanced analytics
- [ ] `/admin/reports` - Custom reports
- [ ] `/admin/settings` - System settings
- [ ] `/admin/integrations` - API integrations

### Priority 3 (Advanced):
- [ ] `/admin/marketing` - Marketing campaigns
- [ ] `/admin/email` - Email management
- [ ] `/admin/social` - Social media management
- [ ] `/admin/compliance` - Compliance tracking

---

## Database Access

### Via Supabase Dashboard:
1. Go to https://supabase.com/dashboard
2. Select your project
3. Navigate to **Table Editor** or **SQL Editor**
4. View/edit data directly

### Via Code:
```typescript
// Server-side (app/admin/*/page.tsx)
import { createServerClient } from '@/lib/supabase-server';

const supabase = createServerClient();
const { data } = await supabase.from('table_name').select('*');

// Client-side (components)
import { createClient } from '@/lib/supabase';

const supabase = createClient();
const { data } = await supabase.from('table_name').select('*');
```

---

## Quick Reference

### File Locations:
- **Admin Pages**: `app/admin/*/page.tsx`
- **Components**: `components/`
- **API Routes**: `app/api/*/route.ts`
- **Database Types**: `types/database.ts`
- **Utilities**: `lib/`

### Common Patterns:
```typescript
// Fetch data
const { data, error } = await supabase.from('table').select('*');

// Insert data
const { data, error } = await supabase.from('table').insert({ ... });

// Update data
const { data, error } = await supabase.from('table').update({ ... }).eq('id', id);

// Delete data
const { data, error } = await supabase.from('table').delete().eq('id', id);
```

---

## Support

- **Documentation**: See `DATABASE_AUDIT_REPORT.md`
- **API Reference**: See `API_CREDENTIAL_SETUP_CHECKLIST.md`
- **Deployment**: See `QUICK_DEPLOY_GUIDE.md`

---

## Ready to Code! 🚀

Choose your environment:
1. **GitHub Codespaces** - Fastest setup
2. **Gitpod** - Pre-configured
3. **VS Code Remote** - Your server
4. **Local** - Full control

All environments work identically. Pick what works best for you!
