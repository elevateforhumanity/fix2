# DEFINITION OF DONE

Use this checklist before marking any substantive task as complete. If you cannot check every box, the work is not done.

## CODE QUALITY

The code builds without errors. Run `npm run build` or equivalent and confirm zero errors. Warnings are acceptable only if documented and justified.

The code passes type checking. Run `npm run typecheck` or `tsc --noEmit` and confirm zero type errors. Any `@ts-ignore` or `any` types must be documented with a comment explaining why they are necessary.

The code passes linting. Run `npm run lint` and confirm zero errors. Warnings are acceptable only if they are pre-existing or documented.

The code follows existing patterns. New code matches the style, structure, and conventions of the surrounding codebase. Do not introduce new patterns without justification.

## FUNCTIONALITY

The core flow works end-to-end. Walk through the user journey manually or with automated tests. Confirm that the happy path works from start to finish.

Edge cases are handled. Test with empty states, missing data, invalid inputs, and error conditions. Confirm the system degrades gracefully.

Nothing critical broke. Test related features and flows to confirm no regressions. If something broke, either fix it or document it as a known issue with a plan.

## SECURITY & DATA

Server-side enforcement is in place. Access control, gating, permissions, and validation happen on the server, not just in the UI. Direct API calls and URL manipulation cannot bypass security.

Database changes are correct. If you modified schema, RLS policies, or triggers, confirm they work with test queries. Show before and after states.

No secrets are exposed. Confirm that API keys, tokens, and sensitive data are not logged, committed, or exposed in client-side code.

Multi-tenant boundaries are preserved. If the system is multi-tenant, confirm that users cannot access data from other organizations or accounts.

## EVIDENCE

You have proof the fix works. This includes build output, test results, SQL query results, screenshots, logs, or reproducible steps. Opinions and assumptions do not count as proof.

You tested the acceptance criteria. Every condition listed in the task requirements has been verified and documented.

You can explain what changed and why. If someone asks "what did you do and why did you do it that way," you have a clear, honest answer.

## DOCUMENTATION

Changes are committed with a clear message. The commit message explains what changed and why, following the repository's conventions. It includes `Co-authored-by: Ona <no-reply@ona.com>`.

A handoff document exists. For non-trivial changes, create or update a markdown file that explains what changed, why it changed, how to verify it, and how to roll it back.

Next actions are clear. If there are remaining tasks, blockers, or follow-up work, they are documented with precise instructions.

## CLEANUP

Temporary files are removed. Any scripts, backups, test files, or artifacts created during the work are deleted unless they are part of the deliverable.

Dependencies are justified. If you added new packages, you documented why they were necessary and confirmed they do not introduce security or licensing issues.

The workspace is clean. Run `git status` and confirm that only intentional changes are staged. No accidental modifications, generated files, or debug code remains.

## BLOCKERS & HANDOFF

External blockers are documented. If something requires access to Vercel, Supabase, DNS, or other external systems, you provided exact step-by-step instructions for completing it.

The next three actions are clear. You told the user exactly what to do next so they do not stall or spiral.

You challenged bad assumptions. If the original request was unclear, risky, or inefficient, you said so and proposed a better alternative.

---

**If you cannot check every box, the work is not done. Do not mark the task complete. Do not move on. Finish the work or document what is blocking you.**
