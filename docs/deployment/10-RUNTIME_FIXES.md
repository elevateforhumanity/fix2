# ⚡ Runtime Fixes

## Redis URL Newline Issue

### The Problem

```
Error [UrlError]: Upstash Redis client was passed an invalid URL.
Received: "https://feasible-seahorse-5573.upstash.io\n"
```

Redis URLs had trailing newline characters causing runtime errors.

### The Fix

Added `.trim()` to clean environment variables in `lib/rate-limit.ts`:

```typescript
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL.trim(),
  token: process.env.UPSTASH_REDIS_REST_TOKEN.trim(),
});
```

### Why This Works

`.trim()` removes:

- Leading whitespace
- Trailing whitespace
- Newline characters (`\n`)
- Carriage returns (`\r`)

### Result

✅ Build successful
✅ Redis connection working
✅ Rate limiting operational

---

## Edge Runtime Warning

### The Warning

```
⚠ Using edge runtime on a page currently disables static generation for that page
```

### Is This a Problem?

**No.** This is expected and normal for API routes that need to be dynamic.

### Why It Appears

Some API routes use `export const runtime = 'edge'` for better performance.

### Action Required

None. This is working as intended.
