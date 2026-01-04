# 🚀 Vercel Deployment

## Project Configuration

**Project ID:** prj_mqHr6z23gRSqM5In6bLXtEo9cMGI
**Team ID:** team_MrVTNV6aoxL54Bw6ZP6MFviT
**Project Name:** fix2
**Repository:** elevateforhumanity/fix2

---

## Deployment Settings

### Build Command

```bash
pnpm run build
```

### Output Directory

```
.next
```

### Install Command

```bash
pnpm install
```

### Node Version

```
20.x
```

---

## Environment Variables

**Total:** 53 variables set for production

**Critical Variables:**

- DATABASE_URL (pooler connection)
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- NEXTAUTH_URL

---

## Build Configuration

### package.json Scripts

```json
{
  "prebuild": "echo 'Migrations already run manually in Supabase - skipping'",
  "build": "NODE_OPTIONS='--max-old-space-size=8192 --max-semi-space-size=128' next build"
}
```

### Next.js Configuration

- Turbopack enabled
- Edge runtime for some API routes
- Static generation where possible

---

## Deployment Process

1. Code pushed to GitHub (main branch)
2. Vercel detects changes
3. Runs `pnpm install`
4. Runs `pnpm run build`
5. Deploys to production
6. Updates DNS

---

## Production URL

**Current:** https://fix2-om14i4j77-selfish2.vercel.app
**Custom Domain:** (Configure in Vercel dashboard)

---

## Monitoring

- Build logs available in Vercel dashboard
- Runtime logs available in Vercel dashboard
- Analytics available in Vercel dashboard

---

## Troubleshooting

### Build Failures

1. Check environment variables
2. Check build logs
3. Verify DATABASE_URL format
4. Verify Redis URLs have no newlines

### Runtime Errors

1. Check runtime logs
2. Verify database connection
3. Check Redis connection
4. Verify environment variables
