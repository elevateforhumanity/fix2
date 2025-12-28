# Error Definitions - What Each One Actually Means

## 1. LINT WARNINGS (2 total)

### What Is Lint?
**Definition:** A code quality checker that enforces style rules and catches common mistakes.

**What It Does:**
- Reads your code
- Compares it to style rules
- Reports violations as "warnings" or "errors"

**The 2 Warnings:**
```
app/layout.tsx:151 - Prop `sizes` must be placed on a new line
app/vita/upload/page.tsx:59 - Prop `multiple` must be placed on a new line
```

### What This Means:
Your code works perfectly. ESLint just wants you to format it differently for readability.

**Current code:**
```jsx
<link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
```

**ESLint wants:**
```jsx
<link
  rel="icon"
  href="/favicon.png"
  type="image/png"
  sizes="192x192"
/>
```

### Impact: ZERO
- Code runs fine
- No bugs
- No crashes
- Just formatting preference

---

## 2. TYPESCRIPT ERRORS (1,732 total)

### What Is TypeScript?
**Definition:** A type-checking system that predicts runtime errors before code runs.

**What It Does:**
- Analyzes your code
- Tracks what type each variable is (string, number, object, etc.)
- Predicts what will crash at runtime
- Reports problems as "errors"

**Key Concept:** TypeScript errors are NOT style preferences. They are crash predictions.

---

### A. Undefined Variables (~200 errors)

#### Definition:
**Using a variable name that doesn't exist in the current scope.**

#### What This Means:
You wrote code that references a variable, but that variable was never created or is out of reach.

#### Example:
```typescript
// File: app/admin/shops/page.tsx:78
applications.map((application) => {
  return {
    id: shop.id,        // ❌ Where is 'shop'?
    name: shop.name,    // ❌ 'shop' doesn't exist here
  }
})
```

#### What JavaScript Does:
```javascript
// Runtime:
applications.map((application) => {
  return {
    id: shop.id,  // JavaScript looks for 'shop'
                  // Can't find it
                  // Throws: ReferenceError: shop is not defined
                  // Page crashes
  }
})
```

#### Why It Happens:
**Copy-paste error.** Developer copied code from a different context:
```typescript
// Original code (correct):
shops.map((shop) => {
  return { id: shop.id, name: shop.name }
})

// Copied to new place (wrong):
applications.map((application) => {
  return { id: shop.id, name: shop.name }  // Still says 'shop'!
})
```

#### Impact:
**IMMEDIATE CRASH**
- User clicks button
- Code runs
- JavaScript can't find variable
- Throws ReferenceError
- Page shows error screen
- User cannot continue

---

### B. Missing Properties (~150 errors)

#### Definition:
**Trying to use an object property that doesn't exist in the type definition.**

#### What This Means:
Your code expects an object to have certain properties, but the type definition says those properties don't exist.

#### Example:
```typescript
// Type definition says:
interface Campaign {
  id: string;
  name: string;
  status: string;
  platforms: string[];  // ← REQUIRED
}

// Your code creates:
const campaign: Campaign = {
  id: '1',
  name: 'Summer Campaign',
  status: 'active',
  // ❌ Missing 'platforms' property
}
```

#### What JavaScript Does:
```javascript
// Runtime:
const campaign = {
  id: '1',
  name: 'Summer Campaign',
  status: 'active',
  // platforms is undefined
}

// Later in code:
campaign.platforms.map(...)  // Tries to call .map() on undefined
                             // Throws: Cannot read property 'map' of undefined
                             // Page crashes
```

#### Why It Happens:
**Interface mismatch.** Two scenarios:
1. Code was written before interface was finalized
2. Interface was updated but code wasn't

#### Impact:
**PARTIAL CRASH**
- Page loads initially
- User interacts with feature
- Code tries to access missing property
- Gets `undefined`
- Tries to use `undefined` as if it's an array/object
- Crashes with TypeError
- Feature breaks mid-use

---

### C. Error Type Mismatches (~300 errors)

#### Definition:
**Catching errors but treating them as the wrong type.**

#### What This Means:
In JavaScript, you can throw anything as an error (string, number, object, Error). Your code assumes it's always an Error object, but it might not be.

#### Example:
```typescript
try {
  await processPayment();
} catch (error) {
  // TypeScript says: 'error' is type 'unknown'
  // You assume: 'error' is type 'Error'
  
  return { error: error.message }  // ❌ 'error' might not have .message
}
```

#### What JavaScript Does:
```javascript
// Scenario 1: Error is a string
throw "Payment failed";

catch (error) {
  error.message  // undefined (strings don't have .message)
  // Returns: { error: undefined }
  // User sees: "undefined"
}

// Scenario 2: Error is Error object
throw new Error("Payment failed");

catch (error) {
  error.message  // "Payment failed"
  // Returns: { error: "Payment failed" }
  // User sees: "Payment failed"
}
```

#### Why It Happens:
**Lazy error handling.** Developer wrote:
```typescript
catch (error) {
  // Assumes error is always Error object
}
```

Instead of:
```typescript
catch (error: unknown) {
  const message = error instanceof Error 
    ? error.message 
    : String(error);
}
```

#### Impact:
**ERROR HANDLER CRASHES**
- Something goes wrong
- Error is thrown
- Error handler catches it
- Tries to access .message
- .message doesn't exist
- Error handler itself crashes
- User sees generic "500 Internal Server Error"
- No useful error message
- Cannot debug what went wrong

---

### D. Unknown Types (~400 errors)

#### Definition:
**Variables typed as `unknown` but code accesses properties without checking.**

#### What This Means:
TypeScript doesn't know what type a variable is, so it marks it `unknown`. Your code tries to use it anyway without checking.

#### Example:
```typescript
// API endpoint receives JSON
const body = await req.json();  // Type: unknown (could be anything)

// Your code assumes it's an object with 'title' property
const title = body.title;  // ❌ TypeScript: "Property 'title' does not exist on type 'unknown'"
```

#### What JavaScript Does:
```javascript
// Scenario 1: Valid JSON
body = { title: "Hello", name: "John" }
body.title  // "Hello" ✅

// Scenario 2: Invalid JSON
body = "just a string"
body.title  // undefined ⚠️

// Scenario 3: Malicious JSON
body = { "<script>alert('xss')</script>": "hack" }
body.title  // undefined
// But if you insert body into HTML without validation...
// XSS attack succeeds ❌
```

#### Why It Happens:
**No input validation.** Developer trusts all incoming data:
```typescript
const body = await req.json();
// Assumes body is always { title: string, name: string }
// Never checks
```

#### Impact:
**SECURITY VULNERABILITY + CRASHES**
1. **No validation** → accepts any JSON
2. **Wrong structure** → code crashes when accessing properties
3. **Malicious input** → XSS, SQL injection, data corruption
4. **Type confusion** → wrong data types stored in database

---

### E. Function Signature Mismatches (~100 errors)

#### Definition:
**Calling a function with wrong number or type of arguments.**

#### What This Means:
A function expects certain parameters, but you're calling it with different parameters.

#### Example:
```typescript
// Function definition:
type AuthHandler = (
  req: Request,
  context: Record<string, string>
) => Promise<Response>;

// Your code:
export const GET = apiAuthGuard(
  async (req: Request, context: Record<string, unknown>, user: Record<string, unknown>) => {
    // ❌ Function expects 2 parameters, you provided 3
  }
);
```

#### What JavaScript Does:
```javascript
// apiAuthGuard calls your function:
function apiAuthGuard(handler) {
  return async (req, context) => {
    // Calls handler with 2 arguments
    return handler(req, context);
  }
}

// Your handler expects 3 arguments:
async (req, context, user) => {
  // 'user' is undefined (never passed)
  console.log(user.id);  // Crashes: Cannot read property 'id' of undefined
}
```

#### Why It Happens:
**API changed.** The `apiAuthGuard` function was updated:
```typescript
// Old version (3 parameters):
type AuthHandler = (req, context, user) => Promise<Response>;

// New version (2 parameters):
type AuthHandler = (req, context) => Promise<Response>;

// Your code still uses old version
```

#### Impact:
**API ROUTE DOESN'T WORK**
- User makes API request
- Route handler has wrong signature
- apiAuthGuard can't call it properly
- Returns 500 error
- Feature completely broken
- No data returned

---

## 3. BUILD FAILURE (Without env vars)

### What Is a Build?
**Definition:** The process of converting your source code into optimized production code.

**What It Does:**
1. Reads all your files
2. Compiles TypeScript to JavaScript
3. Bundles code together
4. Optimizes for production
5. Creates `.next` folder with production-ready code

### What Is Build Failure?
**Definition:** The build process stops with an error before completing.

### The Error:
```
Error: Missing API key. Pass it to the constructor `new Resend("re_123")`
```

### What This Means:
Your code tries to create an API client at the top level of a file:

```typescript
// lib/email/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
//                         ↑ This runs when file is imported
//                         ↑ During build, this is undefined
//                         ↑ Resend throws error
```

### Why It Happens:
**API client initialized at module level** instead of inside a function:

```typescript
// ❌ BAD (runs during build):
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ GOOD (runs at runtime):
function getResendClient() {
  return new Resend(process.env.RESEND_API_KEY);
}
```

### Impact:
**LOCAL DEVELOPMENT ONLY**
- ✅ Production (Vercel) works - has env vars
- ❌ Local build fails - no env vars
- ❌ Cannot test production build locally
- ❌ Cannot preview before deploy

### Why Production Works:
```
Vercel deployment process:
1. Pulls code from GitHub ✅
2. Loads environment variables from dashboard ✅
3. process.env.RESEND_API_KEY = "re_abc123" ✅
4. Runs build ✅
5. new Resend("re_abc123") succeeds ✅
6. Build completes ✅
7. Site deploys ✅
```

### Why Local Fails:
```
Local build process:
1. You run: pnpm run build
2. No .env.local file
3. process.env.RESEND_API_KEY = undefined ❌
4. Runs build
5. new Resend(undefined) throws error ❌
6. Build fails ❌
7. Cannot test locally ❌
```

---

## SUMMARY: WHAT EACH ERROR TYPE IS

| Error Type | What It Is | What It Predicts | Can Code Run? |
|------------|------------|------------------|---------------|
| **Lint warning** | Style preference | Nothing | ✅ Yes, perfectly |
| **Undefined variable** | Variable doesn't exist | ReferenceError crash | ❌ Crashes when reached |
| **Missing property** | Object missing field | TypeError crash | ❌ Crashes when accessed |
| **Error type mismatch** | Wrong error handling | Error handler crashes | ❌ Crashes on error |
| **Unknown type** | No type checking | Potential crash + security risk | ⚠️ Risky |
| **Function signature** | Wrong parameters | Function doesn't execute | ❌ Route doesn't work |
| **Build failure** | Missing env vars | Build can't complete | ❌ Local only |

---

## THE KEY DIFFERENCE

### Lint Warnings = Style
"Your code works, but format it differently"

### TypeScript Errors = Crash Predictions
"Your code WILL crash when this line runs"

### Build Failures = Missing Configuration
"Cannot build without environment variables"

---

## WHY TYPESCRIPT ERRORS MATTER

TypeScript is not being picky. It's telling you:

**"This exact line will crash when a user triggers it."**

Every TypeScript error is a future bug report:
- User clicks button
- Code with TypeScript error runs
- Crashes exactly as TypeScript predicted
- User sees error page
- User complains

**1,732 TypeScript errors = 1,732 potential crash points**

---

## WHAT "IGNORING BUILD ERRORS" MEANS

Your `next.config.mjs` has:
```typescript
typescript: {
  ignoreBuildErrors: true
}
```

**What this does:**
- TypeScript finds 1,732 errors
- Reports them
- You say "ignore them"
- Build continues anyway
- Deploys broken code
- Code crashes at runtime instead

**It's like:**
- Mechanic: "Your brakes are broken"
- You: "Ignore that, I need to drive"
- Car passes inspection (because you told inspector to ignore it)
- Brakes fail while driving
- Crash

**That's what `ignoreBuildErrors: true` does.**

---

## BOTTOM LINE

**Lint warnings:** Cosmetic. Ignore them.

**TypeScript errors:** Crash predictions. Fix them or accept crashes.

**Build failures:** Configuration issue. Works in production, not locally.

**Your choice:**
1. Fix the 1,732 errors (code becomes stable)
2. Keep ignoring them (accept random crashes)

There is no middle ground. TypeScript doesn't lie.
