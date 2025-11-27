# Elevate For Humanity

Free and funded career training that leads to real jobs.

## About

Elevate For Humanity connects individuals to career training, workforce grants, and employers. We partner with workforce boards, case managers, and community organizations to provide accessible pathways to employment in healthcare, skilled trades, beauty, business, and more.

## Getting Started

### Prerequisites

- Node.js 20 or higher
- pnpm package manager

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Development

```bash
# Start development server
pnpm run dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
pnpm run build

# Start production server
pnpm start
```

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
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
