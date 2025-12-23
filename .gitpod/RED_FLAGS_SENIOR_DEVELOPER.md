# RED FLAGS: SENIOR DEVELOPER EVALUATION

Use this list when evaluating developers, contractors, or AI agents who claim senior-level capability. These patterns indicate someone who talks like a senior but does not think or work like one.

## COMMUNICATION RED FLAGS

**Vague confidence.** They say "should work," "looks good," "probably fine," or "I think this is correct" without providing evidence. Senior engineers either know or explicitly state what they need to verify.

**Defensive explanations.** When questioned, they justify their approach with appeals to authority, popularity, or complexity rather than reasoning from first principles. They say "that's how everyone does it" instead of "here's why this approach fits our constraints."

**Overuse of jargon.** They use technical terms to sound smart rather than to communicate clearly. They say "we'll leverage a microservice architecture with event-driven patterns" when they mean "we'll split this into smaller services that talk via messages."

**No tradeoff discussion.** They present one solution as obviously correct without acknowledging alternatives, costs, or risks. Senior engineers explain what they chose not to do and why.

**Blame deflection.** When something breaks, they blame the framework, the library, the database, the network, or the previous developer. They do not take ownership of understanding and fixing the system as it exists.

## TECHNICAL RED FLAGS

**Jumps to code without understanding.** They start writing code before explaining what they inspected, what the current behavior is, or what the root cause might be. They treat symptoms instead of diagnosing problems.

**Overengineering simple problems.** They introduce abstractions, design patterns, or new dependencies for problems that could be solved with ten lines of straightforward code. They confuse complexity with sophistication.

**Underengineering critical problems.** They apply quick fixes to security, data integrity, or performance issues without addressing root causes. They say "this will work for now" when the problem requires a real solution.

**Copy-paste without understanding.** They pull code from Stack Overflow, documentation, or other parts of the codebase without understanding how it works or whether it fits the context. When asked to explain it, they cannot.

**Ignoring existing patterns.** They introduce new ways of doing things that already have established patterns in the codebase. They do not read the surrounding code before writing new code.

**No consideration for failure modes.** They write happy-path code without handling errors, edge cases, or invalid inputs. They assume the network is reliable, the database is fast, and users behave rationally.

## PROCESS RED FLAGS

**No verification.** They claim something works without running it, testing it, or showing evidence. They say "I fixed it" without proving the fix or checking for regressions.

**No rollback plan.** They deploy changes without explaining how to undo them if something goes wrong. They treat production like a playground.

**Skips documentation.** They do not document what changed, why it changed, or how to verify it. They expect others to reverse-engineer their work.

**Ignores constraints.** When told "do not add new dependencies" or "preserve backward compatibility," they do it anyway and justify it after the fact.

**No testing discipline.** They do not run builds, linters, or type checkers before committing. They push broken code and expect CI to catch it.

**Commits without context.** Their commit messages say "fix bug" or "update code" without explaining what was broken or why the change was necessary.

## JUDGMENT RED FLAGS

**Optimizes prematurely.** They refactor working code for performance or elegance before confirming there is an actual problem. They waste time on micro-optimizations that do not matter.

**Bikesheds on trivial decisions.** They spend significant time debating variable names, formatting, or folder structure while ignoring real problems like broken authentication or data corruption.

**Resists feedback.** When their approach is questioned, they double down instead of reconsidering. They treat code review as a personal attack rather than a collaborative process.

**No curiosity about the system.** They do not ask questions about how things work, why decisions were made, or what the constraints are. They assume they already understand everything.

**Treats production like development.** They make changes directly in production, skip staging environments, or deploy on Fridays without a rollback plan.

**No ownership.** They finish their assigned task and move on without confirming it works in production, checking for side effects, or helping others who depend on their work.

## COLLABORATION RED FLAGS

**Works in isolation.** They do not communicate progress, blockers, or risks until it is too late. They disappear for days and then dump a large, untested change.

**Does not read existing code.** They ask questions that are answered in the codebase, documentation, or recent commit history. They expect others to explain things they could discover themselves.

**Ignores team conventions.** They use their preferred tools, libraries, or patterns instead of following the team's established standards. They say "this is better" without building consensus.

**No empathy for future maintainers.** They write clever code that only they understand. They do not consider that someone else will need to debug, extend, or refactor their work.

**Blames the user.** When something is confusing or broken, they say "users should know better" instead of improving the design or adding guardrails.

## RELIABILITY RED FLAGS

**Inconsistent quality.** Some of their work is excellent, but other parts are sloppy or incomplete. They do not have a repeatable process for delivering consistent results.

**Misses deadlines without warning.** They do not communicate when they are stuck, blocked, or behind schedule. They wait until the deadline to reveal problems.

**Does not follow through.** They start tasks but do not finish them. They leave loose ends, incomplete documentation, or unresolved bugs for others to clean up.

**No sense of urgency.** They treat critical production issues like low-priority tasks. They do not understand the difference between "this can wait" and "this is costing money or trust right now."

**Repeats the same mistakes.** They make the same errors across multiple tasks without learning or adjusting their process. They do not reflect on what went wrong or how to improve.

## HOW TO USE THIS LIST

If you see one or two of these patterns, it might be a bad day or a communication issue. If you see five or more consistently, the person is not operating at a senior level, regardless of their title or resume.

Senior engineers are defined by judgment, ownership, and discipline. They think before they code. They prove their work. They communicate clearly. They take responsibility for the system as it exists, not as they wish it were.

If someone cannot do these things, they are not senior. Do not let credentials, confidence, or technical vocabulary convince you otherwise.
