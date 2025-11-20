# How to Get Your Supabase Database Password

## Quick Steps:

1. **Go to Supabase Dashboard**:

   ```
   https://app.supabase.com/project/cuxzzpsyufcewtmicszk/settings/database
   ```

2. **Look for "Database Password" section**

3. **Click "Reset Database Password"** (if you don't remember it)
   - Or use the password you set when creating the project

4. **Copy the password**

---

## Alternative: Get Connection String

1. **Go to**: https://app.supabase.com/project/cuxzzpsyufcewtmicszk/settings/database

2. **Scroll to "Connection string"**

3. **Copy the "URI" connection string**
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.cuxzzpsyufcewtmicszk.supabase.co:5432/postgres`

4. **Give me the full string** (I'll extract the password)

---

## What I'll Do With It:

Once you give me the password, I'll:

1. Connect to PostgreSQL directly
2. Create the courses table
3. Insert all 17 courses
4. Verify success
5. Done in 30 seconds!

---

**Which do you prefer?**

- Give me the password
- Give me the full connection string
- Or just run the SQL yourself (fastest - 10 seconds)
