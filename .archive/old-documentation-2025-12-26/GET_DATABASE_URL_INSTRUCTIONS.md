# GET DATABASE_URL FROM SUPABASE

## 🔗 DIRECT LINKS

### Step 1: Go to Supabase Dashboard

**Link:** [https://supabase.com/dashboard](https://supabase.com/dashboard)

### Step 2: Select Your Project

**Link:** [https://supabase.com/dashboard/projects](https://supabase.com/dashboard/projects)

- Click on: **elevateforhumanity** (or your project name)

### Step 3: Go to Database Settings

**Direct link format:**

```
https://supabase.com/dashboard/project/[YOUR-PROJECT-REF]/settings/database
```

**Or navigate:**

1. Click **Settings** (gear icon in left sidebar)
2. Click **Database**

### Step 4: Find Connection String

Scroll down to: **Connection string** section

### Step 5: Select Transaction Mode

**IMPORTANT:** Click the dropdown and select:

- ✅ **Transaction mode** (pooler - port 6543)
- ❌ NOT "Session mode" (direct - port 5432)

### Step 6: Copy the Connection String

Click the **Copy** button

**Format will be:**

```
postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres
```

---

## 🎯 WHAT TO LOOK FOR

### Connection String Components:

```
postgresql://
  postgres.[project-ref]     ← Your project reference
  :[password]                ← Your database password
  @aws-0-[region].pooler.supabase.com  ← Pooler hostname
  :6543                      ← Port 6543 (Transaction mode)
  /postgres                  ← Database name
```

### ✅ CORRECT (Transaction mode):

```
postgresql://postgres.abcdefgh:your-password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

### ❌ WRONG (Session mode):

```
postgresql://postgres:your-password@db.abcdefgh.supabase.co:5432/postgres
```

**Key difference:**

- ✅ Has `.pooler.supabase.com` and port `:6543`
- ❌ Has `db.` prefix and port `:5432`

---

## 📋 QUICK CHECKLIST

Before copying:

- [ ] Logged into Supabase dashboard
- [ ] Selected correct project (elevateforhumanity)
- [ ] In Settings → Database
- [ ] Found "Connection string" section
- [ ] Selected **Transaction mode** from dropdown
- [ ] Verified it shows port `:6543`
- [ ] Clicked Copy button

---

## 🚨 SECURITY NOTE

**DO NOT:**

- ❌ Commit this to git
- ❌ Share publicly
- ❌ Post in screenshots

**DO:**

- ✅ Copy directly to Vercel
- ✅ Store in password manager
- ✅ Keep it secret

---

## 🔄 NEXT STEP AFTER GETTING URL

Once you have the DATABASE_URL, go to:

**Vercel Dashboard:**
[https://vercel.com/dashboard](https://vercel.com/dashboard)

Then:

1. Select your project
2. Go to: **Settings** → **Environment Variables**
3. Click: **Add New**
4. Name: `DATABASE_URL`
5. Value: (paste the connection string)
6. Environments: ✅ Production ✅ Preview ✅ Development
7. Click: **Save**

---

## ❓ CAN'T FIND IT?

### If you don't see "Connection string":

1. Make sure you're in **Settings** → **Database**
2. Scroll down past "Database password"
3. Look for "Connection string" section
4. Should have dropdown with modes

### If dropdown doesn't show "Transaction mode":

1. Try refreshing the page
2. Make sure project is fully initialized
3. Check you have database access permissions

### If you see "Reveal password" button:

1. Click it to show the password
2. Then copy the full connection string
3. Password will be visible in the string

---

## 🎬 VISUAL GUIDE

**Navigation path:**

```
Supabase Dashboard
  → Projects
    → [Your Project]
      → Settings (⚙️ icon)
        → Database
          → Scroll to "Connection string"
            → Dropdown: Select "Transaction mode"
              → Click "Copy" button
```

---

## ⏱️ TIME ESTIMATE

- Finding the page: 30 seconds
- Selecting Transaction mode: 10 seconds
- Copying the string: 5 seconds

**Total: ~1 minute**

---

## ✅ VERIFICATION

After copying, your connection string should:

- Start with `postgresql://`
- Contain `.pooler.supabase.com`
- End with `:6543/postgres`
- Be one long line (no line breaks)
- Include your password (visible)

**Example (with fake values):**

```
postgresql://postgres.abcdefgh:Xy9$mK2pQ7nR@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## 🆘 NEED HELP?

If you're stuck:

1. Take a screenshot of the Database settings page
2. Make sure to hide/blur any passwords
3. Share what you see

Common issues:

- Wrong project selected
- Looking at API keys instead of database settings
- Using Session mode instead of Transaction mode
- Copying incomplete string
