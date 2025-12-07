# Fix Build Error - Missing OpenAI API Key

## 🔴 Error:
```
Error: Missing credentials. Please pass an `apiKey`, or set the `OPENAI_API_KEY` environment variable.
```

## ✅ Quick Fix (2 minutes):

### Add OpenAI API Key to Vercel

1. **Go to Vercel Dashboard**
   https://vercel.com/dashboard

2. **Select Your Project**

3. **Go to Settings → Environment Variables**

4. **Add New Variable:**
   ```
   Name: OPENAI_API_KEY
   Value: sk-placeholder-key
   Environment: Production, Preview, Development
   ```

5. **Click Save**

6. **Redeploy:**
   - Go to Deployments tab
   - Click "Redeploy" on latest

---

## 🎯 Why This Happens

Your app has AI features that require OpenAI API key. During build, Next.js tries to initialize these routes and fails if the key is missing.

---

## 💡 Two Options:

### Option A: Add Placeholder (Quick)
Add `OPENAI_API_KEY=sk-placeholder-key` to Vercel

**Pros:**
- Build will succeed
- Site will deploy
- AI features will return "not configured" error (gracefully)

**Cons:**
- AI features won't work

### Option B: Add Real OpenAI Key (Full)
1. Get API key from https://platform.openai.com/api-keys
2. Add to Vercel: `OPENAI_API_KEY=sk-proj-...`

**Pros:**
- AI features will work
- Full functionality

**Cons:**
- Costs money (OpenAI charges per use)
- Need OpenAI account

---

## 📋 Step-by-Step Fix:

### 1. Go to Vercel
```
https://vercel.com/dashboard
→ Your Project
→ Settings
→ Environment Variables
```

### 2. Click "Add New"

### 3. Enter:
```
Key: OPENAI_API_KEY
Value: sk-placeholder-key
```

### 4. Select Environments:
- ✅ Production
- ✅ Preview  
- ✅ Development

### 5. Click "Save"

### 6. Redeploy:
```
Deployments tab
→ Latest deployment
→ "..." menu
→ Redeploy
```

---

## ✅ After Adding:

Build will succeed and you'll see:
```
✓ Compiled successfully
✓ Generating static pages (666/666)
✓ Build completed
```

---

**Do this now and your build will work!** 🚀
