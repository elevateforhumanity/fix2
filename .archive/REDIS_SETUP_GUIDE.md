# 🔴 Redis Setup Guide for Rate Limiting

**Time Required:** 10 minutes  
**Cost:** FREE (Upstash free tier)

---

## Step 1: Create Free Redis Database (5 minutes)

### Option A: Upstash (Recommended - Free Tier)

1. **Go to:** [https://upstash.com](https://upstash.com)

2. **Sign up** with GitHub or email

3. **Create Database:**
   - Click "Create Database"
   - Name: `elevate-rate-limiting`
   - Type: **Regional** (faster, free)
   - Region: Choose closest to your Vercel deployment (e.g., `us-east-1`)
   - Click "Create"

4. **Get Credentials:**
   - Click on your database
   - Scroll to "REST API" section
   - Copy these values:
     - `UPSTASH_REDIS_REST_URL`
     - `UPSTASH_REDIS_REST_TOKEN`

---

## Step 2: Add to Environment Variables (2 minutes)

### Local Development

Add to `.env.local`:
```bash
UPSTASH_REDIS_REST_URL=https://your-database.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

### Vercel Production

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these variables:
   - Key: `UPSTASH_REDIS_REST_URL`
   - Value: `https://your-database.upstash.io`
   - Click "Add"
   
   - Key: `UPSTASH_REDIS_REST_TOKEN`
   - Value: `your-token-here`
   - Click "Add"

5. **Redeploy** your app for changes to take effect

---

## Step 3: Install Redis Client (1 minute)

```bash
cd /workspaces/fix2
pnpm install @upstash/redis
```

---

## Step 4: Update Middleware (2 minutes)

I'll create the updated middleware for you:

**File:** `middleware.ts`

Replace the rate limiting section with this:

```typescript
import { Redis } from '@upstash/redis';

// Initialize Redis (only if configured)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

// Rate limiting function
async function checkRateLimit(ip: string, limit: number): Promise<boolean> {
  if (!redis) {
    // Fallback to in-memory if Redis not configured
    console.warn('Redis not configured, using in-memory rate limiting');
    return false; // Allow request
  }

  const key = `rate_limit:${ip}`;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour

  try {
    // Increment counter
    const count = await redis.incr(key);
    
    // Set expiry on first request
    if (count === 1) {
      await redis.expire(key, Math.ceil(windowMs / 1000));
    }

    // Check if limit exceeded
    return count > limit;
  } catch (error) {
    console.error('Redis error:', error);
    return false; // Allow request on error
  }
}

// In your middleware function:
export async function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
  const country = request.geo?.country || 'unknown';
  
  // Determine rate limit
  const isHighRisk = HIGH_RISK_COUNTRIES.includes(country);
  const rateLimit = isHighRisk ? 200 : 500;
  
  // Check rate limit
  const isLimited = await checkRateLimit(ip, rateLimit);
  
  if (isLimited) {
    console.log(`Rate limit exceeded for ${ip}`);
    return new NextResponse('Rate Limit Exceeded', { 
      status: 429,
      headers: {
        'Retry-After': '3600', // 1 hour
      }
    });
  }
  
  // Continue with request
  return NextResponse.next();
}
```

---

## Step 5: Test Redis Connection

Create a test file:

**File:** `test-redis.ts`

```typescript
import { Redis } from '@upstash/redis';
import 'dotenv/config';

async function testRedis() {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  });

  try {
    // Test write
    await redis.set('test_key', 'Hello Redis!');
    console.log('✅ Write successful');

    // Test read
    const value = await redis.get('test_key');
    console.log('✅ Read successful:', value);

    // Test increment
    await redis.incr('test_counter');
    const count = await redis.get('test_counter');
    console.log('✅ Increment successful:', count);

    // Test expiry
    await redis.setex('temp_key', 10, 'expires in 10 seconds');
    console.log('✅ Expiry set successful');

    console.log('\n🎉 Redis is working perfectly!');
  } catch (error) {
    console.error('❌ Redis error:', error);
  }
}

testRedis();
```

**Run test:**
```bash
pnpm tsx test-redis.ts
```

You should see:
```
✅ Write successful
✅ Read successful: Hello Redis!
✅ Increment successful: 1
✅ Expiry set successful

🎉 Redis is working perfectly!
```

---

## ✅ Verification Checklist

- [ ] Upstash account created
- [ ] Redis database created
- [ ] Environment variables added locally
- [ ] Environment variables added to Vercel
- [ ] `@upstash/redis` installed
- [ ] Test script runs successfully
- [ ] Middleware updated
- [ ] App redeployed to Vercel

---

## 🎯 What This Fixes

### Before (In-Memory)
```
Server Restart → Rate limits reset ❌
Multiple servers → Each has own limits ❌
No persistence → Can't track long-term ❌
```

### After (Redis)
```
Server Restart → Rate limits persist ✅
Multiple servers → Shared rate limits ✅
Persistence → Track across deployments ✅
```

---

## 📊 Redis Dashboard

After setup, you can monitor in Upstash dashboard:
- Request count
- Memory usage
- Active keys
- Performance metrics

---

## 💰 Pricing

**Upstash Free Tier:**
- 10,000 commands/day
- 256 MB storage
- Perfect for rate limiting
- No credit card required

**If you exceed:**
- Pay-as-you-go: $0.20 per 100K commands
- Very affordable for most sites

---

## 🔧 Alternative: Vercel KV (If using Vercel)

If you prefer Vercel's built-in solution:

1. Go to Vercel Dashboard → Storage
2. Create KV Database
3. Connect to your project
4. Use `@vercel/kv` instead of `@upstash/redis`

**Code is almost identical:**
```typescript
import { kv } from '@vercel/kv';

// Same API
await kv.incr('rate_limit:' + ip);
```

---

## 🚨 Troubleshooting

### Error: "Connection refused"
- Check URL and token are correct
- Verify environment variables are set
- Restart dev server after adding .env

### Error: "Rate limit not working"
- Check Redis is initialized in middleware
- Verify middleware is running (add console.log)
- Check Upstash dashboard for activity

### Error: "Too many requests"
- Check your Upstash free tier limits
- Upgrade plan if needed
- Consider caching strategy

---

## 📞 Need Help?

**Upstash Docs:** https://docs.upstash.com/redis  
**Vercel KV Docs:** https://vercel.com/docs/storage/vercel-kv

---

## 🎉 You're Done!

Once Redis is set up:
- ✅ Rate limiting works across server restarts
- ✅ Works with multiple server instances
- ✅ Production-ready
- ✅ One less security vulnerability!

**Next:** Update admin API routes with `withAuth()` wrapper.
