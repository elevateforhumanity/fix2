# Bypass Login - Development Access Guide

## ⚠️ Current Issue

The admin dashboard requires:
1. User authentication (login)
2. Admin role in database

**Problem:** You can't access admin without logging in first.

---

## 🔧 Solutions

### Option 1: Disable Auth Check (Quick Dev Mode)

**For Development Only** - Remove auth requirement temporarily:

Edit `/app/admin/page.tsx`:

```typescript
// COMMENT OUT these lines:
// const { data: { user } } = await supabase.auth.getUser();
// if (!user) redirect('/login');
// if (profile?.role !== 'admin') redirect('/unauthorized');

// ADD this instead:
const user = { id: 'dev-user' }; // Mock user for development
```

**⚠️ WARNING:** This removes all security. Only use for local development!

---

### Option 2: Create Admin User in Supabase

1. **Go to Supabase Dashboard:**
   - https://supabase.com/dashboard
   - Select your project

2. **Create User:**
   - Go to Authentication → Users
   - Click "Add User"
   - Email: `admin@test.com`
   - Password: `admin123`
   - Click "Create User"

3. **Set Admin Role:**
   - Go to Table Editor → `profiles`
   - Find the user you just created
   - Set `role` = `'admin'`
   - Save

4. **Login:**
   - Go to `/login`
   - Email: `admin@test.com`
   - Password: `admin123`
   - Access `/admin`

---

### Option 3: Use Environment Variable Override

Create a dev mode flag:

**Add to `.env.local`:**
```
DEV_MODE=true
BYPASS_AUTH=true
```

**Update admin page:**
```typescript
const devMode = process.env.DEV_MODE === 'true';
if (!devMode) {
  // Only check auth in production
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');
}
```

---

### Option 4: Direct Database Access

**Access Supabase directly:**

1. **Go to Supabase Dashboard**
2. **Table Editor → `courses`**
3. **Find barber course**
4. **Edit directly in database**

**No login needed!**

---

### Option 5: Create Public Admin Demo Page

Create a new page without auth:

**File:** `/app/admin-demo/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server';

export default async function AdminDemo() {
  const supabase = await createClient();
  
  // NO AUTH CHECK - Public access
  
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .order('created_at', { ascending: false });
  
  return (
    <div className="p-8">
      <h1>Admin Demo - No Login Required</h1>
      <div className="grid gap-4">
        {courses?.map(course => (
          <div key={course.id} className="border p-4">
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <a href={`/admin-demo/courses/${course.id}`}>
              Edit Course
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Access:** `/admin-demo` (no login needed)

---

## 🎯 Recommended Solution

### For Immediate Access:

**Create this file:** `/app/dev-admin/page.tsx`

```typescript
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DevAdmin() {
  const supabase = await createClient();
  
  // Fetch courses without auth
  const { data: courses } = await supabase
    .from('courses')
    .select('*')
    .ilike('title', '%barber%');
  
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Dev Admin - Barber Courses
        </h1>
        
        <div className="grid gap-6">
          {courses?.map(course => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex gap-4">
                <Link 
                  href={`/lms/courses/${course.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View Course
                </Link>
                <Link 
                  href={`/admin/courses/${course.id}`}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Edit Course (requires login)
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {courses?.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded">
            <p className="text-yellow-800">
              No barber courses found in database.
              <br />
              Check Supabase to verify course exists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Access:** `/dev-admin` (no login required)

---

## 🚀 Quick Implementation

Want me to create the dev-admin page for you right now?

I can create:
1. `/dev-admin` - View all courses without login
2. `/dev-admin/courses/[id]` - View specific course
3. Direct links to Supabase for editing

This will let you:
- ✅ See all courses
- ✅ Find barber course
- ✅ View course details
- ✅ Get direct edit links
- ✅ No login required

---

## 📊 Alternative: Supabase Studio

**Easiest way to edit without login:**

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Go to: Table Editor → `courses`
4. Find barber course
5. Click to edit
6. Make changes
7. Save

**This is the fastest way to edit course data!**

---

## ✅ Summary

**Problem:** Admin requires login  
**Solution:** Multiple options available

**Fastest:** Use Supabase Studio directly  
**Best for Dev:** Create `/dev-admin` page  
**Production:** Keep auth enabled

Would you like me to create the dev-admin page now?
