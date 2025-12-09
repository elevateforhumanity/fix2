# 🚀 Local Setup Instructions

## Quick Setup (Automated)

On your local machine, run this one command:

```bash
bash setup-local.sh
```

This will:
1. ✅ Create `.env.local` with your Supabase credentials
2. ✅ Install all dependencies with pnpm
3. ✅ Set up everything you need

Then start the dev server:
```bash
pnpm dev
```

Open: http://localhost:3000

---

## Manual Setup (If you prefer)

### 1. Clone the repository
```bash
git clone https://github.com/elevateforhumanity/fix2.git
cd fix2
```

### 2. Checkout the latest branch
```bash
git checkout fix/api-error-handling-attendance
git pull origin fix/api-error-handling-attendance
```

### 3. Create `.env.local` file

Create a file named `.env.local` in the root directory with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cuxzzpsyufcewtmicszk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNjEwNDcsImV4cCI6MjA3MzczNzA0N30.DyFtzoKha_tuhKiSIPoQlKonIpaoSYrlhzntCUvLUnA
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1eHp6cHN5dWZjZXd0bWljc3prIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE2MTA0NywiZXhwIjoyMDczNzM3MDQ3fQ.5JRYvJPzFzsVaZQkbZDLcohP7dq8LWQEFeFdVByyihE

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://www.elevateforhumanity.org
```

### 4. Install dependencies
```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 5. Run the development server
```bash
pnpm dev
```

### 6. Open in browser
```
http://localhost:3000
```

---

## What to Test

Once running locally, test these pages:

- ✅ Homepage: http://localhost:3000
- ✅ Programs: http://localhost:3000/programs
- ✅ Medical Assistant: http://localhost:3000/programs/medical-assistant
- ✅ Barber: http://localhost:3000/programs/barber
- ✅ HVAC: http://localhost:3000/programs/hvac

**Check for:**
- No gradient overlays on images
- Programs load from database
- Images display correctly
- No console errors

---

## Troubleshooting

### "pnpm: command not found"
```bash
npm install -g pnpm
```

### "Port 3000 already in use"
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Database connection errors
- Verify `.env.local` exists and has the correct values
- Check that Supabase project is accessible
- Test connection: `curl https://cuxzzpsyufcewtmicszk.supabase.co`

---

## Next Steps

Once everything works locally:

1. **Commit any changes** (if needed)
2. **Push to GitHub**
3. **Deploy to Vercel** with the same environment variables

---

**Need help?** Check the main README.md or contact support.
