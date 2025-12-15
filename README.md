# Elevate For Humanity

Free and funded career training that leads to real jobs.

## About

Elevate For Humanity connects individuals to career training, workforce grants, and employers. We partner with workforce boards, case managers, and community organizations to provide accessible pathways to employment in healthcare, skilled trades, beauty, business, and more.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm package manager
- Vercel account with project access
- Vercel CLI token

### Quick Start

1. **Pull environment variables from Vercel:**
   ```bash
   # Set your Vercel token (one-time setup)
   gp env VERCEL_TOKEN='your-vercel-token-here'
   
   # Pull environment variables
   npm run env:pull
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm run dev
   ```

### Environment Setup

This project is configured to pull environment variables directly from Vercel:

```bash
# Pull latest environment variables from Vercel
npm run env:pull

# Or use the script directly
bash pull-vercel-env.sh
```

**Getting your Vercel token:**
1. Go to [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Give it a name (e.g., "Development Environment")
4. Copy the token and set it:
   ```bash
   gp env VERCEL_TOKEN='your-token-here'
   ```

### Development

```bash
# Start development server
pnpm run dev

# Start with autopilot
pnpm run dev:with-autopilot

# Run database migrations
pnpm run db:migrate

# Seed database
pnpm run db:seed
```

### Build

```bash
# Create production build
pnpm run build

# Verify build
pnpm run verify:build

# Start production server
pnpm start
```

## Project Structure

```
.
├── app/                    # Next.js app directory
├── components/             # React components
├── lib/                    # Utility functions and libraries
├── public/                 # Static assets
├── scripts/                # Build and deployment scripts
├── supabase/              # Database migrations and types
├── .archive/              # Archived documentation and scripts
│   ├── docs/              # Historical documentation
│   ├── scripts/           # Utility scripts
│   ├── sql/               # SQL migration files
│   └── temp/              # Temporary files
└── pull-vercel-env.sh     # Environment variable sync script
```

## Environment Variables

Environment variables are managed in Vercel and pulled locally using `npm run env:pull`.

**Required variables:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

See `.env.example` for a complete list of available variables.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

## Key Pages

- `/` - Homepage
- `/programs` - Training programs catalog
- `/apply` - Application form
- `/funding` - Funding information
- `/employers` - Employer partnerships
- `/about` - About us
- `/contact` - Contact form

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (PostgreSQL)
- Vercel (Deployment)

## Contact

Email: Elevate4humanityedu@gmail.com

## License

Copyright © 2024 Elevate For Humanity. All rights reserved.
