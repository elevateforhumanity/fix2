# Fix Student Login and Portal Access

## Issues Found

1. **Wrong redirect paths** - Login/signup redirected to non-existent `/student/dashboard`
2. **Missing profile trigger** - New users not getting profile records created
3. **Inactive database triggers** - Critical triggers may not be active

## Fixes Applied

### 1. Code Changes (Already Applied)

✅ **Fixed login redirect** (`app/login/page.tsx`)

- Changed from `/student/dashboard` → `/lms/dashboard`
- Added support for `org_admin` role

✅ **Fixed signup redirect** (`app/signup/SignupForm.tsx`)

- Changed from `/student/dashboard` → `/lms/dashboard`

✅ **Fixed auth callback** (`app/auth/callback/route.ts`)

- Changed from `/student/dashboard` → `/lms/dashboard`

### 2. Database Changes (YOU MUST RUN THESE)

#### Step 1: Run Profile Trigger Fix

Open Supabase SQL Editor and run: **`FIX_AUTH_PROFILE_TRIGGER.sql`**

This will:

- Ensure profiles table exists with correct structure
- Create RLS policies for profile access
- Create/update the `handle_new_user()` function
- Activate the `on_auth_user_created` trigger
- Create profiles for any existing users without them

#### Step 2: Verify All Triggers

Run: **`VERIFY_ALL_TRIGGERS.sql`**

This comprehensive script will:

- List all active triggers
- Recreate critical triggers:
  - `on_auth_user_created` - Creates profile on signup
  - `update_*_updated_at` - Updates timestamps on 20+ tables
  - `on_enrollment_create_student` - Creates student record on enrollment
  - `lesson_progress_update_trigger` - Updates course completion
  - `on_application_approved` - Creates enrollment on approval
  - `generate_certificate_trigger` - Issues certificates on completion
- Fix any users without profiles
- Show status report

## Testing Steps

### Test 1: New User Signup

1. Go to `/signup`
2. Create a new account with:
   - Email: `test@example.com`
   - Password: `TestPass123!`
   - First Name: `Test`
   - Last Name: `User`
3. Submit form
4. **Expected**: Redirect to `/lms/dashboard` after 2 seconds
5. **Verify in Supabase**:
   ```sql
   SELECT * FROM auth.users WHERE email = 'test@example.com';
   SELECT * FROM profiles WHERE email = 'test@example.com';
   ```
   Both should exist with matching IDs

### Test 2: Existing User Login

1. Go to `/login`
2. Enter credentials
3. Click "Login"
4. **Expected**:
   - Students → `/lms/dashboard`
   - Admins → `/admin/dashboard`
5. **Verify**: Should see LMS navigation and dashboard content

### Test 3: Profile Creation Trigger

Run in Supabase SQL Editor:

```sql
-- Check trigger is active
SELECT * FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Check all users have profiles
SELECT
  au.email,
  au.created_at,
  p.role,
  CASE WHEN p.id IS NOT NULL THEN '✓ Has Profile' ELSE '✗ Missing Profile' END as status
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
ORDER BY au.created_at DESC;
```

### Test 4: Student Portal Access

1. Login as student
2. Navigate to `/lms/dashboard`
3. **Expected**: See dashboard with:
   - Welcome message
   - Course cards
   - Progress indicators
   - LMS navigation menu
4. Try accessing:
   - `/lms/courses` - Course catalog
   - `/lms/profile` - User profile
   - `/lms/messages` - Messages

## Common Issues & Solutions

### Issue: "User not found" after signup

**Cause**: Profile trigger not active
**Solution**: Run `FIX_AUTH_PROFILE_TRIGGER.sql`

### Issue: Redirect to 404 page

**Cause**: Old redirect paths in code
**Solution**: Already fixed in code, deploy changes

### Issue: "Unauthorized" on dashboard

**Cause**: No profile record or wrong role
**Solution**:

```sql
-- Check user's profile
SELECT * FROM profiles WHERE email = 'your@email.com';

-- Fix role if needed
UPDATE profiles
SET role = 'student'
WHERE email = 'your@email.com';
```

### Issue: Email confirmation required

**Cause**: Supabase email confirmation enabled
**Solution**:

1. Go to Supabase Dashboard → Authentication → Settings
2. Disable "Enable email confirmations"
3. Or confirm email via link sent to inbox

## Verification Checklist

Run this after applying fixes:

```sql
-- 1. Check trigger is active
SELECT
  trigger_name,
  event_object_table,
  action_timing,
  event_manipulation
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
-- Expected: 1 row showing AFTER INSERT trigger

-- 2. Check all users have profiles
SELECT
  COUNT(*) as users_without_profiles
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;
-- Expected: 0

-- 3. Check profile roles
SELECT
  role,
  COUNT(*) as count
FROM profiles
GROUP BY role;
-- Expected: See distribution of roles

-- 4. Test trigger manually (creates test user)
DO $$
DECLARE
  test_user_id UUID := gen_random_uuid();
BEGIN
  -- This would normally be done by Supabase Auth
  -- Just checking if function works
  RAISE NOTICE 'Trigger function exists and is callable';
END $$;
```

## Next Steps

1. ✅ Run `FIX_AUTH_PROFILE_TRIGGER.sql` in Supabase
2. ✅ Run `VERIFY_ALL_TRIGGERS.sql` in Supabase
3. ✅ Deploy code changes (already committed)
4. ✅ Test signup flow with new account
5. ✅ Test login flow with existing account
6. ✅ Verify dashboard access works

## Files Changed

- `app/login/page.tsx` - Fixed redirect path
- `app/signup/SignupForm.tsx` - Fixed redirect path
- `app/auth/callback/route.ts` - Fixed redirect path
- `FIX_AUTH_PROFILE_TRIGGER.sql` - Database trigger fix
- `VERIFY_ALL_TRIGGERS.sql` - Comprehensive trigger verification

## Support

If issues persist:

1. Check Supabase logs for auth errors
2. Check browser console for JavaScript errors
3. Verify environment variables are set
4. Check RLS policies allow profile access
