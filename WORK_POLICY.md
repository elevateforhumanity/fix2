# STRICT WORK POLICY - MUST FOLLOW

## Core Principles

1. **READ FULLY** - Read entire files, documentation, and context before making ANY changes
2. **UNDERSTAND COMPLETELY** - Verify understanding before proceeding
3. **NO HIDING** - Every feature must be visible, accessible, and complete
4. **NO SKIPPING** - Complete each step fully before moving to next
5. **VERIFY EVERYTHING** - Test and verify after each change

## Mandatory Checklist Before ANY Action

### Before Creating/Modifying Files:

- [ ] Read existing related files completely
- [ ] Understand the current structure and patterns
- [ ] Check if feature already exists (avoid duplicates)
- [ ] Verify dependencies are available
- [ ] Understand navigation/routing structure
- [ ] Read official documentation if external service (IRS, Stripe, etc.)

### Before Creating Database Tables:

- [ ] Check if table already exists in ANY migration file
- [ ] Verify column names match existing patterns
- [ ] Ensure RLS policies are complete
- [ ] Add proper indexes
- [ ] Add comments explaining purpose

### Before Creating API Routes:

- [ ] Read the database schema it will use
- [ ] Implement ALL methods (GET, POST, PATCH, DELETE as needed)
- [ ] Add authentication checks
- [ ] Add authorization/role checks
- [ ] Add input validation
- [ ] Add proper error handling (try/catch)
- [ ] Return consistent response format
- [ ] Add comments explaining purpose

### Before Creating Pages:

- [ ] Read existing pages in same directory for patterns
- [ ] Verify API routes exist and work
- [ ] Use proper Next.js patterns (Server/Client components)
- [ ] Add metadata (title, description)
- [ ] Add loading states
- [ ] Add error states
- [ ] Add success states
- [ ] Make it responsive
- [ ] Add to navigation (MANDATORY - NO HIDDEN PAGES)

### Before Creating Components:

- [ ] Check if similar component exists
- [ ] Read existing component patterns
- [ ] Make it reusable
- [ ] Add proper TypeScript types
- [ ] Add error boundaries
- [ ] Add loading states

### Before Updating Navigation:

- [ ] Read entire navigation.ts file
- [ ] Understand existing structure
- [ ] Find correct section for new pages
- [ ] Use consistent naming and icons
- [ ] Verify paths match actual page locations
- [ ] Test navigation after changes

### Before Creating Integrations:

- [ ] Read official documentation FULLY
- [ ] Understand authentication requirements
- [ ] Understand rate limits
- [ ] Add proper error handling
- [ ] Add retry logic where appropriate
- [ ] Store credentials securely (env vars)
- [ ] Add TypeScript types

## Verification Steps (MANDATORY)

After creating database migrations:

- [ ] Check SQL syntax
- [ ] Verify no duplicate tables
- [ ] Confirm RLS policies exist
- [ ] List all tables created

After creating API routes:

- [ ] Test with curl or similar
- [ ] Verify authentication works
- [ ] Verify authorization works
- [ ] Test error cases
- [ ] Verify response format

After creating pages:

- [ ] Visit page in browser
- [ ] Verify it renders without errors
- [ ] Check it's in navigation
- [ ] Test all interactive elements
- [ ] Verify data loads correctly
- [ ] Test error states
- [ ] Test loading states

After updating navigation:

- [ ] Verify all links work
- [ ] Check no broken links
- [ ] Verify proper hierarchy
- [ ] Test on mobile view

## Completion Criteria

A feature is NOT complete until:

- [ ] Database tables exist with RLS
- [ ] API routes exist and tested
- [ ] Pages exist and render
- [ ] Pages are in navigation (visible to users)
- [ ] All states handled (loading, error, success)
- [ ] Documentation/comments added
- [ ] No console errors
- [ ] Responsive design works

## Forbidden Actions

❌ NEVER create hidden pages (not in navigation)
❌ NEVER skip error handling
❌ NEVER skip authentication checks
❌ NEVER assume libraries are installed
❌ NEVER create duplicate tables/routes
❌ NEVER move fast without reading
❌ NEVER skip verification steps
❌ NEVER create incomplete features

## Required Reading Before Implementation

For VITA/Tax features:

- Read IRS.gov documentation
- Understand official volunteer process
- Link to official IRS forms/processes

For Payment features:

- Read Stripe documentation
- Understand webhook handling
- Understand PCI compliance

For Email features:

- Read Mailchimp/service documentation
- Understand list management
- Understand GDPR compliance

## Work Flow

1. READ the todo item completely
2. READ all related documentation
3. READ existing code patterns
4. UNDERSTAND what needs to be done
5. VERIFY prerequisites exist
6. CREATE/MODIFY with full implementation
7. VERIFY it works
8. UPDATE navigation if needed
9. VERIFY navigation works
10. Mark todo as complete ONLY when fully verified

## Communication

When reporting progress:

- State what was READ
- State what was UNDERSTOOD
- State what was CREATED
- State what was VERIFIED
- State what remains incomplete
