# Update Your Supabase Credentials

You mentioned you have a real Supabase project. Let's get it connected!

---

## Step 1: Get Your Credentials from Supabase

1. Go to your Supabase project dashboard
2. Click **Settings** (gear icon in sidebar)
3. Click **API** in the settings menu
4. You'll see these values:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
Copy the entire URL

### API Keys

**anon/public key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM5NTg3MjAwLCJleHAiOjE5NTUxNjMyMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
Copy the entire key (it's very long - about 200+ characters)

**service_role key:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2Mzk1ODcyMDAsImV4cCI6MTk1NTE2MzIwMH0.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```
Copy the entire key (also very long)

---

## Step 2: Update .env.local

Open your `.env.local` file and find these lines:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder-anon-key
SUPABASE_SERVICE_ROLE_KEY=placeholder-service-role-key
```

Replace them with your real values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_ACTUAL_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjM5NTg3MjAwLCJleHAiOjE5NTUxNjMyMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4eHh4eHh4eHh4eHh4eCIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE2Mzk1ODcyMDAsImV4cCI6MTk1NTE2MzIwMH0.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

**Important:** 
- Make sure you copy the ENTIRE key (they're 200+ characters)
- Don't add quotes around the values
- Don't add spaces

---

## Step 3: Test the Connection

After updating .env.local, run:

```bash
node test-supabase-connection.mjs
```

You should see:
```
✅ Connection successful!
```

---

## Step 4: Update Vercel (For Deployment)

If you're deploying to Vercel, add the same credentials there:

### Via Vercel Dashboard:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** > **Environment Variables**
4. Add these 3 variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Set environment to: **Production, Preview, Development**
6. Save and redeploy

### Via Vercel CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste your URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste your anon key

vercel env add SUPABASE_SERVICE_ROLE_KEY production
# Paste your service role key

# Redeploy
vercel --prod
```

---

## Quick Command to Update .env.local

If you want, I can help you update the file. Just provide:

1. Your Supabase Project URL
2. Your anon/public key
3. Your service_role key

And I'll update the file for you!

---

## Common Issues

### "Still seeing placeholder"
- Make sure you saved .env.local
- Restart your dev server: `pnpm dev`

### "Connection failed"
- Check if your Supabase project is active (not paused)
- Verify you copied the entire key
- Make sure URL starts with `https://`

### "Table does not exist"
- Connection works, but you need to run migrations
- Go to Supabase Dashboard > SQL Editor
- Run `supabase-schema.sql`

---

**Ready to update?** Share your Supabase credentials and I'll update the file for you!
