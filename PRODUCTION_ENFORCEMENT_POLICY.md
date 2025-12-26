# PRODUCTION ENFORCEMENT POLICY

**EFFECTIVE IMMEDIATELY - ZERO TOLERANCE**

---

## ABSOLUTE REQUIREMENTS

Every single file, component, page, API route, and database table MUST be:

1. ✅ **100% COMPLETE** - No partial implementations
2. ✅ **FULLY WIRED** - Connected to real database/API
3. ✅ **PRODUCTION GRADE** - Error handling, validation, security
4. ✅ **TESTED** - Actually works with real data
5. ✅ **ACTIVATED** - No disabled features, no "coming soon"

---

## ZERO TOLERANCE FOR:

❌ **Placeholder data** - No mock arrays, no fake data
❌ **TODO comments** - No "TODO: implement this later"
❌ **Coming soon** - No "Feature coming soon" messages
❌ **Partial implementations** - No half-finished functions
❌ **Non-activated features** - Everything must work NOW
❌ **Non-wired components** - Must connect to real backend
❌ **Hardcoded values** - Must pull from database/API
❌ **Fake functions** - Must have real logic
❌ **Empty handlers** - Must have actual implementation
❌ **Commented out code** - Delete it or implement it

---

## ENFORCEMENT CHECKLIST

Before creating ANY file, verify:

### Database Connection
- [ ] Uses `createClient()` from Supabase
- [ ] Has actual SELECT/INSERT/UPDATE/DELETE queries
- [ ] Handles query errors properly
- [ ] Returns real data, not mocks

### API Integration
- [ ] Makes real fetch() calls to endpoints
- [ ] Handles response errors (400, 401, 403, 404, 500)
- [ ] Parses and validates response data
- [ ] Has retry logic for failures

### Error Handling
- [ ] Try-catch blocks around async operations
- [ ] User-friendly error messages
- [ ] Logs errors for debugging
- [ ] Graceful degradation

### Security
- [ ] Authentication checks (requireRole)
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention (proper escaping)
- [ ] CSRF protection where needed

### User Experience
- [ ] Loading states while fetching data
- [ ] Empty states when no data exists
- [ ] Success/error notifications
- [ ] Proper form validation
- [ ] Accessible (keyboard nav, screen readers)

---

## VIOLATION CONSEQUENCES

**If ANY file violates this policy:**

1. DELETE the file immediately
2. Start over from scratch
3. Do it right this time

**No exceptions. No excuses. No shortcuts.**

---

## EXAMPLES

### ❌ WRONG - Placeholder Data
```typescript
const students = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' }
];
```

### ✅ RIGHT - Real Database Query
```typescript
const supabase = await createClient();
const { data: students, error } = await supabase
  .from('profiles')
  .select('id, name')
  .eq('role', 'student');

if (error) {
  console.error('Failed to fetch students:', error);
  return { students: [] };
}
```

### ❌ WRONG - Fake Function
```typescript
async function sendEmail(to: string, subject: string) {
  // TODO: Implement email sending
  return { success: true };
}
```

### ✅ RIGHT - Real Implementation
```typescript
async function sendEmail(to: string, subject: string, body: string) {
  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, body }),
    });

    if (!response.ok) {
      throw new Error(`Email API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('Email send failed:', error);
    return { success: false, error: error.message };
  }
}
```

### ❌ WRONG - Coming Soon
```typescript
<div>
  <h2>Analytics Dashboard</h2>
  <p>Coming soon!</p>
</div>
```

### ✅ RIGHT - Fully Functional
```typescript
const { data: analytics } = await supabase
  .from('page_views')
  .select('*')
  .gte('created_at', thirtyDaysAgo);

const uniqueVisitors = new Set(analytics?.map(v => v.user_id)).size;

<div>
  <h2>Analytics Dashboard</h2>
  <div className="metric">
    <div className="value">{uniqueVisitors.toLocaleString()}</div>
    <div className="label">Unique Visitors (30 days)</div>
  </div>
</div>
```

---

## CURRENT STATUS

**This policy is NOW ACTIVE.**

Every file created from this point forward MUST comply 100%.

Any file that doesn't comply will be DELETED and rebuilt correctly.

**NO MORE STARTING OVER. GET IT RIGHT THE FIRST TIME.**

---

**Signed:** Ona AI Agent  
**Date:** December 26, 2025  
**Status:** ENFORCED
