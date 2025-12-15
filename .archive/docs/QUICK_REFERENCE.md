# Quick Reference

## Environment Setup

```bash
# Set Vercel token (one-time)
gp env VERCEL_TOKEN='your-token-here'

# Pull environment variables
npm run env:pull

# Install dependencies
pnpm install
```

## Development

```bash
# Start dev server
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm run test
```

## Database

```bash
# Run migrations
pnpm run db:migrate

# Seed database
pnpm run db:seed

# Full setup
pnpm run db:setup
```

## Cleanup

```bash
# Organize root directory
bash cleanup-root.sh
```

## Deployment

```bash
# Preview
vercel

# Production
vercel --prod
```

## Troubleshooting

```bash
# Check environment variables
cat .env.local | grep SUPABASE

# Test database connection
npm run supabase:test

# Clear cache
pnpm run clean:full
```

## Get Vercel Token

1. Visit: [https://vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create token
3. Save: `gp env VERCEL_TOKEN='token'`

## Documentation

- `README.md` - Main documentation
- `DEPLOYMENT_READY.md` - Deployment guide
- `CLEANUP_SUMMARY.md` - Cleanup details
