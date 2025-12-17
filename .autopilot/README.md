# Autopilot System

## Structure

- `.autopilot/tsc.log`: raw TypeScript output
- `.autopilot/reports/errors.json`: parsed, structured errors
- `.autopilot/tasks/*.md`: assigned fix missions (40 autopilots)

## Rules

Each autopilot must:

1. Fix assigned errors (real fix, not masked)
2. Add/adjust tests where needed
3. Run: `pnpm typecheck + pnpm lint + pnpm test`
4. Log proof in task file

## No Masking Allowed

- ❌ No `@ts-ignore`
- ❌ No `any` without justification
- ❌ No disabling tsconfig rules
- ❌ No `skipLibCheck` as permanent solution
- ✅ Real type fixes
- ✅ Runtime validation where needed
- ✅ Proper guards and narrowing
