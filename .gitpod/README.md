# Gitpod Engineering Standards

This directory contains engineering standards, prompts, and checklists for working in this Gitpod workspace.

## Quick Reference

### For Every Task

- **[DEFINITION_OF_DONE.md](DEFINITION_OF_DONE.md)** - Checklist before marking any task complete
- **[PROMPT_SNIPPETS.md](PROMPT_SNIPPETS.md)** - Copy-paste prompts for common tasks

### For Pull Requests

- **[../.github/PULL_REQUEST_TEMPLATE.md](../.github/PULL_REQUEST_TEMPLATE.md)** - PR template with checklist

### For Evaluating Work

- **[RED_FLAGS_SENIOR_DEVELOPER.md](RED_FLAGS_SENIOR_DEVELOPER.md)** - Patterns that indicate poor engineering judgment

## Workflow

1. **Start with a prompt** - Use PROMPT_SNIPPETS.md to get the right structure
2. **Work through the task** - Follow audit → fix → prove → document
3. **Check Definition of Done** - Verify every box before marking complete
4. **Create PR with template** - Use the GitHub PR template for all substantive changes
5. **Review against red flags** - Self-check or peer-review using the red flags list

## File Descriptions

**DEFINITION_OF_DONE.md** (67 lines)
Comprehensive checklist covering code quality, functionality, security, evidence, documentation, cleanup, and handoff. Use this before marking any substantive task as complete.

**PROMPT_SNIPPETS.md** (216 lines)
Seven copy-paste prompts for common engineering tasks:

- Master backbone prompt (general use)
- Gating & access control
- Broken links & routing
- Supabase security warnings
- Performance & page speed
- Deployment & environment issues
- Developer capability test

**RED_FLAGS_SENIOR_DEVELOPER.md** (89 lines)
Patterns that indicate someone is not operating at a senior level, organized by:

- Communication red flags
- Technical red flags
- Process red flags
- Judgment red flags
- Collaboration red flags
- Reliability red flags

**PULL_REQUEST_TEMPLATE.md** (85 lines)
Structured PR template requiring:

- What changed and why
- How to verify
- Evidence
- Rollback plan
- Pre-merge checklist
- Deployment notes
- Risks & tradeoffs

## Philosophy

These documents enforce a single principle: **prove your work**.

Do not claim something works without evidence. Do not mark tasks complete without verification. Do not merge code without testing. Do not deploy without a rollback plan.

Senior engineering is not about writing clever code. It is about judgment, ownership, and discipline. These documents help maintain that standard.
