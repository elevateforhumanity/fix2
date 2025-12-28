# Dashboard Schema Verification - ACTUAL SUPABASE RESULTS

**Date:** 2024-12-24  
**Source:** Live Supabase database queries  
**Purpose:** Verify actual schema state before implementing dashboard changes

---

## Query 1: Roles Actually In Use

**Query:**
```sql
SELECT role, COUNT(*) as user_count 
FROM profiles 
WHERE role IS NOT NULL 
GROUP BY role 
ORDER BY role;
```

**Results:**
```json
[
  {"role": "admin", "user_count": 3},
  {"role": "instructor", "user_count": 1},
  {"role": "staff", "user_count": 2},
  {"role": "student", "user_count": 4}
]
```

**Analysis:**
- ✅ **4 roles have actual users:** admin (3), staff (2), instructor (1), student (4)
- ❌ **0 users for:** program_holder, employer, partner, board_member, workforce_board, delegate, creator, shop_manager
- ⚠️ **CRITICAL:** Staff role is in use (2 users) but was NOT in original enum

---

## Query 2: Profiles Table Schema

**Results:** profiles.role is TEXT (not enum)

**Analysis:**
- ⚠️ **CRITICAL SCHEMA DRIFT:** `role` is TEXT, not user_role enum
- ✅ `organization_id` exists (for org relationships)
- **Impact:** Database does NOT enforce role values (any string accepted)

---

## Query 3: Enrollments Table Schema

**Results:** program_id exists, course_id does NOT exist

**Analysis:**
- ✅ `program_id` exists
- ❌ `course_id` does NOT exist (LMS course flow migration not applied)
- ⚠️ `partner_course_id` exists (suggests partner concept in schema)

---

## Query 4: User Role Enum Definition

**Results:**
```json
[
  {"role_value": "student", "sort_order": 1},
  {"role_value": "admin", "sort_order": 2},
  {"role_value": "program_holder", "sort_order": 3},
  {"role_value": "delegate", "sort_order": 4},
  {"role_value": "instructor", "sort_order": 5},
  {"role_value": "auditor", "sort_order": 6}
]
```

**Analysis:**
- ❌ **Missing from enum:** staff, employer, super_admin, org_admin
- ⚠️ **BUT:** profiles.role is TEXT, so enum is not enforced anyway

---

## Query 5: Partner-Related Data Check

**Results:**
```json
[
  {"source": "profiles.role", "count": 0},
  {"source": "program_holders table exists", "count": 1},
  {"source": "employers table exists", "count": 1}
]
```

**Analysis:**
- ✅ NO users have role='partner' (0 users)
- ✅ `program_holders` table EXISTS
- ✅ `employers` table EXISTS
- **Conclusion:** Partner is a table/relationship concept, not a user role

---

## CRITICAL FINDINGS

### 1. Schema Drift: Role is TEXT, Not Enum
- Database does NOT enforce role values
- Any string can be stored in role column
- Migrations that extend user_role enum are IRRELEVANT

### 2. Roles In Use vs Roles In Code
**In Database:** admin (3), staff (2), instructor (1), student (4)  
**In Code:** Routes 8+ roles including ones with 0 users

### 3. Partner Is NOT a Role
- 0 users have role='partner'
- Partner is an organization classification
- Partner is NOT a user login role

### 4. Missing Tables for Orphan Roles
- board_member, workforce_board, delegate, creator, shop_manager all have 0 users

---

## MIGRATION REQUIREMENTS

1. **Fix Schema Drift** - Convert profiles.role to enum or add constraint
2. **Add Missing Columns** - enrollments.course_id, profiles verification columns
3. **Partner Tables** - partner_profiles, program_partners (org-level)
4. **Orphan Role Tables** - Only if keeping those roles

---

## RECOMMENDATIONS

### Do NOT Proceed Until:
- [ ] Schema drift fixed (role enforcement)
- [ ] Decisions made on orphan roles (keep or deprecate?)
- [ ] Partner model clarified (org vs role)
- [ ] Missing tables created or roles deprecated

---

**STOP HERE - Decisions Required Before Phase 2**

**Verified by:** Ona  
**Date:** 2024-12-24  
**Commit:** Phase 4 - Schema Verification
