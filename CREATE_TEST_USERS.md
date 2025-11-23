# Create Test Users - 2 Minute Guide

## Quick Steps (Copy/Paste Ready)

### 1. Open Supabase Auth Users Page
**Direct Link:** https://supabase.com/dashboard/project/YOUR_PROJECT_ID/auth/users

(Or: Dashboard → Authentication → Users)

---

### 2. Click "Add User" Button (Green Button Top Right)

---

### 3. Create Student Account

**Fill in the form:**

```
Email: student@test.com
Password: Test123!
☑️ Auto Confirm User (CHECK THIS BOX!)
```

**Click "User Metadata" tab, paste this:**
```json
{"role": "student", "name": "Test Student"}
```

**Click "Create User"**

---

### 4. Create Staff Account

Click "Add User" again:

```
Email: staff@test.com
Password: Test123!
☑️ Auto Confirm User
```

**User Metadata:**
```json
{"role": "staff", "name": "Test Staff"}
```

**Click "Create User"**

---

### 5. Create Employer Account

Click "Add User" again:

```
Email: employer@test.com
Password: Test123!
☑️ Auto Confirm User
```

**User Metadata:**
```json
{"role": "employer", "name": "Test Employer"}
```

**Click "Create User"**

---

## ✅ Done!

Now test login:
1. Go to: https://www.elevateforhumanity.org/portal
2. Click "Student Portal"
3. Login with: `student@test.com` / `Test123!`
4. Should redirect to dashboard!

---

## 🎥 Visual Guide

**What you'll see:**

```
┌─────────────────────────────────────┐
│  Add User                      [X]  │
├─────────────────────────────────────┤
│  Email: student@test.com            │
│  Password: Test123!                 │
│  ☑️ Auto Confirm User               │
│                                     │
│  Tabs: [Details] [User Metadata]   │
│                                     │
│  User Metadata:                     │
│  {"role": "student", ...}           │
│                                     │
│         [Cancel]  [Create User]     │
└─────────────────────────────────────┘
```

---

**Total time: 2 minutes for all 3 users**
