# Engineering Standards - Quick Start

This document provides a quick reference to all engineering standards, prompts, and checklists in this repository.

## Core Documents

### 1. Definition of Done

**Location:** `.gitpod/DEFINITION_OF_DONE.md`

**Use when:** Before marking any substantive task as complete

**Covers:**

- Code quality (build, typecheck, lint, patterns)
- Functionality (end-to-end flow, edge cases, no regressions)
- Security & data (server-side enforcement, RLS, secrets, multi-tenant)
- Evidence (proof, acceptance criteria, explanation)
- Documentation (commits, handoff docs, next actions)
- Cleanup (temp files, dependencies, workspace state)
- Blockers & handoff (external blockers, next actions, challenge assumptions)

**Key principle:** If you cannot check every box, the work is not done.

---

### 2. Prompt Snippets

**Location:** `.gitpod/PROMPT_SNIPPETS.md`

**Use when:** Starting any substantive engineering work

**Available prompts:**

1. **Master Backbone Prompt** - General use for any substantive work
2. **Gating & Access Control** - Security-critical access control fixes
3. **Broken Links & Routing** - Navigation and routing issues
4. **Supabase Security Warnings** - RLS policies and database security
5. **Performance & Page Speed** - Load time and query optimization
6. **Deployment & Environment Issues** - Build, deploy, and config problems
7. **Developer Test Prompt** - Evaluate capability and judgment

**Workflow:** Copy prompt → Fill in goal/scope/criteria → Agent follows audit → fix → prove → document

---

### 3. Pull Request Template

**Location:** `.github/PULL_REQUEST_TEMPLATE.md`

**Use when:** Creating any pull request for substantive changes

**Requires:**

- What changed (outcome, not implementation)
- Why this changed (motivation and problem)
- How to verify (step-by-step instructions)
- Evidence (logs, tests, screenshots, queries)
- Rollback plan (exact steps to revert)
- Pre-merge checklist (code quality, functionality, security, testing, documentation, cleanup, deployment)
- Deployment notes (special instructions)
- Risks & tradeoffs (what could go wrong, what to watch)

**Key principle:** Do not approve without evidence and completed checklist.

---

### 4. Red Flags List

**Location:** `.gitpod/RED_FLAGS_SENIOR_DEVELOPER.md`

**Use when:** Evaluating developers, contractors, or AI agents

**Categories:**

- Communication (vague confidence, defensive, jargon, no tradeoffs, blame)
- Technical (jumps to code, overengineering, underengineering, copy-paste, ignores patterns, no failure handling)
- Process (no verification, no rollback, skips docs, ignores constraints, no testing, bad commits)
- Judgment (premature optimization, bikeshedding, resists feedback, no curiosity, treats prod like dev, no ownership)
- Collaboration (isolation, doesn't read code, ignores conventions, no empathy, blames users)
- Reliability (inconsistent quality, misses deadlines, doesn't follow through, no urgency, repeats mistakes)

**Key principle:** One or two patterns might be a bad day. Five or more consistently means not senior.

---

## Workflow

### For Every Substantive Task

1. **Start with a prompt** from `.gitpod/PROMPT_SNIPPETS.md`
2. **Follow the structure:** Audit → Fix → Prove → Document
3. **Check Definition of Done** before marking complete
4. **Create PR** using `.github/PULL_REQUEST_TEMPLATE.md`
5. **Self-review** against `.gitpod/RED_FLAGS_SENIOR_DEVELOPER.md`

### For Simple Tasks

Simple tasks (content updates, single-file cosmetic changes, quick documentation fixes) do not require the full workflow. Use judgment.

---

## Philosophy

These standards enforce one principle: **prove your work**.

Do not claim something works without evidence. Do not mark tasks complete without verification. Do not merge code without testing. Do not deploy without a rollback plan.

Senior engineering is not about writing clever code. It is about judgment, ownership, and discipline.

---

## Quick Links

- [Definition of Done](.gitpod/DEFINITION_OF_DONE.md)
- [Prompt Snippets](.gitpod/PROMPT_SNIPPETS.md)
- [PR Template](.github/PULL_REQUEST_TEMPLATE.md)
- [Red Flags List](.gitpod/RED_FLAGS_SENIOR_DEVELOPER.md)
- [Gitpod Standards README](.gitpod/README.md)

---

## Next Actions

1. **Bookmark this document** for quick reference
2. **Read Definition of Done** to understand completion criteria
3. **Try a prompt** from PROMPT_SNIPPETS.md on your next task
4. **Create a test PR** to see the template in action
5. **Review red flags** to calibrate your self-evaluation

---

**Last Updated:** 2025-12-22
