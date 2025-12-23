# Contributing to Elevate for Humanity

Thank you for contributing to this project. This guide ensures code quality and consistency.

---

## Code Quality Standards

### TypeScript Guidelines

**Current Status:** This repository has ~206 known TypeScript errors documented in [`docs/typecheck-status.md`](./docs/typecheck-status.md). These represent technical debt that does not block production deployment.

**Rules for New Code:**

✅ **Required:**
- All new code must be properly typed
- No new `@ts-ignore` or `@ts-expect-error` directives in production code
- Type assertions must be justified with comments
- New features must not increase the existing error count

❌ **Prohibited:**
- Adding type suppressions without review
- Weakening TypeScript compiler settings
- Using `any` type without justification
- Disabling type checking for convenience

**Legacy Code:**
- Existing type suppressions in legacy API routes, mock implementations, and deprecated portal pages are documented and accepted
- Do not attempt to fix legacy type errors without coordination (regression risk)

---

## Development Workflow

### Before Committing

Run these checks:

```bash
# Build must pass
npm run build

# Lint must pass with 0 errors
npm run lint

# TypeCheck is informational (errors expected)
npm run type-check
```

**Gate Requirements:**
- ✅ Build: PASS
- ✅ Lint: 0 errors
- ⚠️ TypeCheck: Baseline maintained (~206 errors)

### Pull Request Checklist

- [ ] Build passes
- [ ] Lint passes (0 errors)
- [ ] TypeScript error count not increased
- [ ] New code is properly typed
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated (if applicable)

---

## Architecture Guidelines

### Security
- All database queries must be scoped to user/organization
- Use layout-level authentication for protected routes
- Verify RLS policies are enabled for multi-tenant tables

### Content Quality
- No placeholder text ("Coming Soon", "TBD", lorem ipsum)
- Every page must answer: "Who is this for?" and "What do I do next?"
- Self-service model: No content should require staff intervention

### Code Style
- Follow existing patterns in the codebase
- Use TypeScript for type safety
- Prefer server components over client components
- Use Tailwind CSS for styling

---

## Getting Help

- **Documentation:** See [`docs/`](./docs/) directory
- **Security Issues:** See [`docs/typecheck-status.md`](./docs/typecheck-status.md)
- **Questions:** Open a GitHub issue

---

## License

By contributing, you agree that your contributions will be licensed under the same license as this project.
