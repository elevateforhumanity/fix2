# TypeScript Error Fix Strategies

## Error Pattern Analysis

### Top Error Codes

1. **TS2339** (549 errors) - Property does not exist on type
2. **TS2345** (200 errors) - Argument type not assignable
3. **TS2304** (96 errors) - Cannot find name
4. **TS2554** (86 errors) - Expected N arguments, got M
5. **TS2352** (67 errors) - Conversion may be a mistake

### Most Common Missing Properties

- `message` (112 occurrences) - Error objects
- `id` (44) - Database records
- `email` (35) - User objects
- `post`/`get` (43) - Supabase client methods
- `title` (21) - Content objects

---

## Fix Strategy by Error Type

### 1. TS2339: Property Does Not Exist (549 errors)

**Pattern:** `Property 'X' does not exist on type 'unknown'`

**Root Cause:** Supabase queries, API responses, catch blocks return `unknown`

**Fix Approach:**

```typescript
// BEFORE (error)
const { data } = await supabase.from('users').select();
console.log(data.email); // TS2339

// AFTER (fixed)
interface User {
  id: string;
  email: string;
  full_name: string;
}

const { data } = await supabase.from('users').select();
const users = data as User[];
console.log(users[0]?.email);

// OR with validation
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  full_name: z.string(),
});

const { data } = await supabase.from('users').select();
const users = z.array(UserSchema).parse(data);
```

**Specific Fixes:**

- **Error.message:** Wrap unknown errors: `error instanceof Error ? error : new Error(String(error))`
- **Supabase data:** Add type parameters: `supabase.from<Database['public']['Tables']['users']['Row']>('users')`
- **API responses:** Define response interfaces

### 2. TS2345: Argument Type Not Assignable (200 errors)

**Pattern:** `Argument of type 'unknown' is not assignable to parameter of type 'Error'`

**Fix Approach:**

```typescript
// BEFORE
catch (error) {
  logError(error); // TS2345
}

// AFTER
catch (error) {
  const err = error instanceof Error ? error : new Error(String(error));
  logError(err);
}

// OR create helper
function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  return new Error(String(error));
}

catch (error) {
  logError(toError(error));
}
```

### 3. TS2304: Cannot Find Name (96 errors)

**Pattern:** `Cannot find name 'resend'`, `Cannot find name 'Link'`

**Fix Approach:**

```typescript
// Missing import
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// OR for Link
import Link from 'next/link';
```

**Common Missing Imports:**

- `resend` - Email service (3 files)
- `Link` - Next.js component (2 files)
- Type definitions from libraries

### 4. TS2554: Expected N Arguments (86 errors)

**Pattern:** `Expected 1-2 arguments, but got 3`

**Root Cause:** Function signature mismatches, especially in auth handlers

**Fix Approach:**

```typescript
// BEFORE
export const GET = withAuth(async (req, context, user) => {
  // TS2554: AuthHandler expects 2 params, got 3
});

// AFTER - Check withAuth signature
// Option 1: Fix wrapper to accept 3 params
export function withAuth<T>(
  handler: (req: Request, context: T, user: User) => Promise<Response>
): (req: Request, context: T) => Promise<Response> {
  return async (req, context) => {
    const user = await getUser(req);
    return handler(req, context, user);
  };
}

// Option 2: Adjust handler to match signature
export const GET = withAuth(async (req, context) => {
  const user = await getUser(req); // Get user inside
});
```

### 5. TS2352: Conversion May Be Mistake (67 errors)

**Pattern:** `Conversion of type 'X' to type 'Y' may be a mistake`

**Fix Approach:**

```typescript
// BEFORE
const session = (await getSession()) as string; // TS2352

// AFTER
const session = await getSession();
if (typeof session === 'string') {
  // Use session
}

// OR if conversion is intentional
const session = (await getSession()) as unknown as string;
```

---

## Module-Specific Strategies

### lib/ (397 errors)

**Focus Areas:**

1. **Supabase client calls** - Add Database types
2. **Error handling** - Wrap unknown errors
3. **Data validation** - Add zod schemas

**Priority Files:**

- `lib/data/careers.ts` - Supabase client type issues
- `lib/actions/enrollments.ts` - Error message access
- `lib/partners/http-client.ts` - Generic type constraints

### api-other/ (339 errors)

**Focus Areas:**

1. **Auth handlers** - Fix withAuth signature
2. **Request body parsing** - Add validation
3. **Error responses** - Proper error wrapping

**Priority Files:**

- Admin routes - AuthHandler signature mismatch
- Email routes - Missing resend import
- Webhook routes - Unknown payload types

### app/ (157 errors)

**Focus Areas:**

1. **Page components** - Missing imports (Link)
2. **API route handlers** - Type mismatches
3. **Server actions** - Proper typing

### components/ (45 errors)

**Focus Areas:**

1. **Props interfaces** - Define proper types
2. **Event handlers** - Type event parameters
3. **Ref usage** - Proper ref typing

---

## Implementation Plan

### Phase 1: Create Utilities (Do First)

```typescript
// lib/utils/errors.ts
export function toError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (typeof error === 'string') return new Error(error);
  return new Error(JSON.stringify(error));
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

// lib/utils/validation.ts
import { z } from 'zod';

export function parseOrNull<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T | null {
  const result = schema.safeParse(data);
  return result.success ? result.data : null;
}
```

### Phase 2: Fix by Module (Parallel)

1. Create type definitions for common patterns
2. Fix lib/ errors (foundation)
3. Fix api/ errors (use lib utilities)
4. Fix app/ errors (use api types)
5. Fix components/ errors (use app types)

### Phase 3: Verify

```bash
pnpm typecheck  # 0 errors
pnpm lint       # Pass
pnpm test       # All green
pnpm build      # Success
```

---

## Quick Reference

### Common Fixes

**Unknown error:**

```typescript
catch (error) {
  const err = error instanceof Error ? error : new Error(String(error));
}
```

**Unknown data:**

```typescript
const data = result as ExpectedType;
// OR
const schema = z.object({ ... });
const data = schema.parse(result);
```

**Missing import:**

```typescript
import { MissingThing } from 'package';
```

**Wrong argument count:**

```typescript
// Check function signature, adjust call or definition
```

**Type conversion:**

```typescript
const value = input as unknown as TargetType; // If truly needed
```
