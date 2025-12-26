# CODE QUALITY POLICY - ENFORCED

**Effective:** December 26, 2025  
**Status:** MANDATORY - NO EXCEPTIONS

---

## THE RULE

**NO PLACEHOLDER CODE. NO FAKE DATA. NO MOCK FUNCTIONS.**

Every file created must:
1. Connect to real database/API
2. Have actual working queries
3. Handle real data
4. Include error handling
5. Be production-ready

---

## VIOLATIONS

### ❌ PROHIBITED:

```typescript
// WRONG - Placeholder data
const data = [
  { id: 1, name: 'Example' },
  { id: 2, name: 'Sample' }
];

// WRONG - Mock function
async function getData() {
  return { success: true };
}

// WRONG - Hardcoded values
const totalStudents = 1247;
```

### ✅ REQUIRED:

```typescript
// RIGHT - Real database query
const supabase = await createClient();
const { data } = await supabase
  .from('students')
  .select('*');

// RIGHT - Real API call
const response = await fetch('/api/students');
const data = await response.json();

// RIGHT - Actual calculation
const totalStudents = data?.length || 0;
```

---

## ENFORCEMENT

**Before committing ANY file:**

1. ✅ Does it query a real database?
2. ✅ Does it call a real API?
3. ✅ Does it handle actual data?
4. ✅ Does it have error handling?
5. ✅ Is it production-ready?

**If ANY answer is NO → DELETE THE FILE AND START OVER**

---

## CURRENT VIOLATIONS TO FIX

Files that need real code:
- app/staff/training/page.tsx (needs TrainingChecklist component)
- app/staff/processes/page.tsx (needs real process data from DB)
- app/staff/qa-checklist/page.tsx (needs real checklist from DB)
- app/staff/customer-service/page.tsx (needs real protocols from DB)

---

**NO MORE PLACEHOLDER CODE. PERIOD.**
