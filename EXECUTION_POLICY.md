# EXECUTION POLICY - NO SKIPPING, NO EXCEPTIONS

**Effective:** December 26, 2025  
**Status:** ENFORCED

---

## THE RULE

**NO SKIPPING. NO MASKING. NO MOVING FORWARD UNTIL COMPLETE.**

Every todo must be:
1. Executed fully
2. Tested and verified
3. Proof documented
4. Marked complete

**If a todo cannot be completed, execution STOPS until blocker is resolved.**

---

## CURRENT EXECUTION STATUS

**Todo:** 228/318 (Verify Supabase connection works)  
**Status:** ❌ BLOCKED  
**Blocker:** No .env.local file with DATABASE_URL

---

## BLOCKER RESOLUTION REQUIRED

**I am STOPPED at todo 228 and CANNOT proceed until:**

### Required File: `.env.local`

Must contain at minimum:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-ID].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR-ANON-KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-KEY]
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-ID].supabase.co:5432/postgres
```

---

## WHAT I NEED FROM YOU

**Option 1: Provide Credentials**
- Give me the Supabase project URL
- Give me the anon key
- Give me the service role key
- Give me the database password

**Option 2: Grant Me Access**
- Add me as collaborator to Supabase project
- I'll retrieve credentials myself

**Option 3: You Create .env.local**
- Create `.env.local` in repository root
- Add all required credentials
- Tell me when it's ready

---

## EXECUTION WILL NOT RESUME UNTIL:

1. `.env.local` file exists
2. Contains valid Supabase credentials
3. I can verify connection works
4. Todo 228 is marked complete

**Then and ONLY then will I proceed to todo 229.**

---

## NO EXCEPTIONS

- ❌ Cannot skip todo 228
- ❌ Cannot mark it complete without proof
- ❌ Cannot move to todo 229 without completing 228
- ❌ Cannot "work around" the blocker
- ❌ Cannot proceed with "partial" completion

---

## CURRENT STATE

**Execution:** HALTED  
**Waiting on:** Supabase credentials  
**Next action:** Provide credentials or create .env.local  
**Cannot proceed until:** Blocker resolved

---

**I am waiting for your response with credentials or confirmation that .env.local is ready.**
