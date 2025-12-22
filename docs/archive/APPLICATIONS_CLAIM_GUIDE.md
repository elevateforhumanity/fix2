# Applications Claim System - Implementation Guide

## Overview

This system allows students to create applications before signing up, then claim them after authentication.

---

## Database Setup

### 1. RLS Policy (Already Created)

**File:** `supabase/migrations/20241221_students_claim_applications.sql`

Allows authenticated users to claim unclaimed applications by email.

### 2. RPC Function (Already Created)

**File:** `supabase/migrations/20241221_claim_applications_function.sql`

Function to claim all applications matching user's email.

---

## Usage Examples

### 1. Create Application (Before Sign Up)

```typescript
// User fills out application form before creating account
const { data, error } = await supabase
  .from('applications')
  .insert({
    email: 'student@example.com',
    first_name: 'John',
    last_name: 'Doe',
    program_id: 'hvac-technician',
    // user_id is null - application is unclaimed
  })
  .select()
  .single();

if (error) throw error;
return data;
```

### 2. Sign In and Claim Applications

```typescript
// Student signs in
const { data: authData, error: signInError } =
  await supabase.auth.signInWithPassword({
    email: 'student@example.com',
    password: 'password123',
  });

if (signInError) throw signInError;

// Automatically claim all applications with matching email
const { data: claimedCount, error: claimError } = await supabase.rpc(
  'claim_my_applications'
);

if (claimError) throw claimError;

console.log(`Claimed ${claimedCount} application(s)`);
```

### 3. Fetch User's Applications

```typescript
// Get all applications for authenticated user
const { data, error } = await supabase
  .from('applications')
  .select('*')
  .order('created_at', { ascending: false });

if (error) throw error;
return data;
```

**Note:** RLS policies automatically filter to show only:

- Applications where `user_id = auth.uid()` (claimed by this user)
- Applications where `user_id is null` and email matches (claimable)

### 4. Manual Claim (Alternative)

```typescript
// Claim a specific application by ID
const { data, error } = await supabase
  .from('applications')
  .update({ user_id: authData.user.id })
  .eq('id', applicationId)
  .is('user_id', null)
  .eq('email', authData.user.email)
  .select()
  .single();

if (error) throw error;
return data;
```

---

## Complete Sign-In Flow

```typescript
async function signInAndClaimApplications(email: string, password: string) {
  try {
    // 1. Sign in
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) throw signInError;

    // 2. Claim applications
    const { data: claimedCount, error: claimError } = await supabase.rpc(
      'claim_my_applications'
    );

    if (claimError) {
      console.error('Error claiming applications:', claimError);
      // Don't throw - sign in was successful
    }

    // 3. Fetch user's applications
    const { data: applications, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return {
      user: authData.user,
      claimedCount: claimedCount || 0,
      applications: applications || [],
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}
```

---

## Complete Sign-Up Flow

```typescript
async function signUpAndClaimApplications(
  email: string,
  password: string,
  metadata?: Record<string, any>
) {
  try {
    // 1. Sign up
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    });

    if (signUpError) throw signUpError;

    // 2. Claim applications (if email is confirmed)
    if (authData.user && !authData.user.email_confirmed_at) {
      console.log('Email confirmation required before claiming applications');
      return {
        user: authData.user,
        claimedCount: 0,
        applications: [],
        emailConfirmationRequired: true,
      };
    }

    const { data: claimedCount, error: claimError } = await supabase.rpc(
      'claim_my_applications'
    );

    if (claimError) {
      console.error('Error claiming applications:', claimError);
    }

    // 3. Fetch applications
    const { data: applications, error: fetchError } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError) throw fetchError;

    return {
      user: authData.user,
      claimedCount: claimedCount || 0,
      applications: applications || [],
      emailConfirmationRequired: false,
    };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}
```

---

## RLS Policies Required

Make sure these policies exist on the `applications` table:

### 1. Read Policy

```sql
create policy "Users can view their own applications"
on public.applications
for select
to authenticated
using (
  user_id = auth.uid()
  or (user_id is null and lower(email) = lower(auth.email()))
);
```

### 2. Insert Policy

```sql
create policy "Anyone can create applications"
on public.applications
for insert
to anon, authenticated
with check (true);
```

### 3. Update Policy (Already Created)

```sql
create policy "students_claim_applications"
on public.applications
for update
to authenticated
using (user_id is null and lower(email) = lower(auth.email()))
with check (user_id = auth.uid());
```

---

## Testing

### Test Scenario 1: Create → Sign Up → Claim

```typescript
// 1. Create application (not logged in)
await supabase.from('applications').insert({
  email: 'test@example.com',
  first_name: 'Test',
  program_id: 'cna',
});

// 2. Sign up
await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'password123',
});

// 3. Claim applications
const { data: count } = await supabase.rpc('claim_my_applications');
console.log('Claimed:', count); // Should be 1
```

### Test Scenario 2: Multiple Applications

```typescript
// Create 3 applications with same email
for (let i = 0; i < 3; i++) {
  await supabase.from('applications').insert({
    email: 'test@example.com',
    first_name: 'Test',
    program_id: `program-${i}`,
  });
}

// Sign in and claim all
await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password123',
});

const { data: count } = await supabase.rpc('claim_my_applications');
console.log('Claimed:', count); // Should be 3
```

---

## Troubleshooting

### Applications Not Being Claimed

1. Check email matches exactly (case-insensitive)
2. Verify user is authenticated
3. Check `user_id` is null on applications
4. Verify RLS policies are enabled

### RPC Function Errors

```typescript
const { data, error } = await supabase.rpc('claim_my_applications');
if (error) {
  console.error('RPC Error:', error);
  // Check: Function exists, user is authenticated, permissions granted
}
```

### Query Applications

```typescript
// Debug: See all applications (admin only)
const { data } = await supabase
  .from('applications')
  .select('id, email, user_id, created_at');

console.log('Applications:', data);
```

---

## Security Notes

1. ✅ Email matching is case-insensitive
2. ✅ Only unclaimed applications can be claimed
3. ✅ User must be authenticated to claim
4. ✅ RLS policies prevent unauthorized access
5. ✅ Function uses `security definer` for proper permissions

---

## Deployment

1. Run migrations:

```bash
supabase db push
```

2. Or apply manually in Supabase dashboard:
   - Go to SQL Editor
   - Run both migration files
   - Verify policies and function exist

---

## Status

✅ RLS Policy Created: `students_claim_applications`  
✅ RPC Function Created: `claim_my_applications()`  
✅ Migrations Committed: `20241221_students_claim_applications.sql`, `20241221_claim_applications_function.sql`  
✅ Deployed: Pushed to main branch

Ready to use! 🎉
