# Batch 10 Testing Plan - Enterprise Portals & Compliance

## Overview
This document outlines the testing procedures for Batch 10 features including Workforce Board Portal, Training Partner Portal, Compliance Checklist, and Audit Log Viewer.

## Prerequisites
- Development server running: `npm run dev`
- Database migration applied: `migrations/20251118_audit_logs_portals.sql`
- Test users with different roles (admin, board, partner, instructor, student)

## Feature 1: Workforce Board Portal

### Access
- **URL**: `/board/dashboard`
- **Required Role**: `board`
- **Test User**: Create a profile with `role = 'board'` and `organization = 'Test Workforce Board'`

### Test Cases

#### TC1.1: Dashboard Access
1. Log in as a user with `board` role
2. Navigate to `/board/dashboard`
3. **Expected**: Dashboard loads with organization name in header
4. **Expected**: No access errors

#### TC1.2: Referral Metrics Display
1. View the metrics cards at the top
2. **Expected**: Shows total referrals, active enrollments, completion rate, employment rate
3. **Expected**: All metrics display numeric values (0 or greater)

#### TC1.3: Student Roster by Organization
1. Scroll to the student roster table
2. **Expected**: Shows students referred by the board's organization
3. **Expected**: Displays student name, program, status, progress, completion date
4. **Expected**: Only shows students where `enrollments.referred_by` matches board's organization

#### TC1.4: Role-Based Access Control
1. Log out and log in as a student or instructor
2. Try to access `/board/dashboard`
3. **Expected**: Redirected or shown "Forbidden" message

### Database Verification
```sql
-- Check board user exists
SELECT id, email, role, organization FROM profiles WHERE role = 'board';

-- Check referrals are tracked
SELECT e.id, p.full_name, e.referred_by, e.status 
FROM enrollments e 
JOIN profiles p ON e.user_id = p.id 
WHERE e.referred_by IS NOT NULL;
```

---

## Feature 2: Training Partner Portal

### Access
- **URL**: `/partner/dashboard`
- **Required Role**: `partner`
- **Test User**: Create a profile with `role = 'partner'` and `tenant_id` set

### Test Cases

#### TC2.1: Dashboard Access
1. Log in as a user with `partner` role
2. Navigate to `/partner/dashboard`
3. **Expected**: Dashboard loads with partner organization name
4. **Expected**: Shows tenant-scoped data only

#### TC2.2: Learner Roster Display
1. View the learner roster table
2. **Expected**: Shows only students enrolled in courses from this partner's tenant
3. **Expected**: Displays learner name, program, status, progress, attendance
4. **Expected**: Shows training hours for WIOA reporting

#### TC2.3: Metrics Cards
1. View the metrics at the top
2. **Expected**: Shows total learners, active enrollments, completion rate
3. **Expected**: Metrics are scoped to partner's tenant only

#### TC2.4: Tenant Isolation
1. Create enrollments for different tenants
2. Log in as partner for tenant A
3. **Expected**: Only see learners from tenant A
4. Log in as partner for tenant B
5. **Expected**: Only see learners from tenant B

### Database Verification
```sql
-- Check partner user exists
SELECT id, email, role, tenant_id FROM profiles WHERE role = 'partner';

-- Check tenant isolation
SELECT e.id, p.full_name, p.tenant_id, c.title 
FROM enrollments e 
JOIN profiles p ON e.user_id = p.id 
JOIN courses c ON e.course_id = c.id 
WHERE p.tenant_id = 'test-tenant-id';
```

---

## Feature 3: Compliance Checklist

### Access
- **URL**: `/admin/compliance`
- **Required Role**: `admin`

### Test Cases

#### TC3.1: Checklist Display
1. Log in as admin
2. Navigate to `/admin/compliance`
3. **Expected**: Shows compliance checklist with categories (SOC 2, WIOA, WCAG, FERPA, GDPR)
4. **Expected**: Displays overall progress percentage
5. **Expected**: Shows summary cards (Complete, In Progress, To Do)

#### TC3.2: Category Expansion
1. Click on a category header (e.g., "SOC 2")
2. **Expected**: Category expands to show individual compliance items
3. **Expected**: Each item shows title, description, and status buttons
4. Click again to collapse
5. **Expected**: Category collapses

#### TC3.3: Status Updates
1. Expand a category
2. Click "In Progress" button on a "To Do" item
3. **Expected**: Item status updates immediately (optimistic UI)
4. **Expected**: Summary cards update to reflect new counts
5. **Expected**: Overall progress percentage updates
6. Refresh the page
7. **Expected**: Status change persists

#### TC3.4: Progress Tracking
1. Mark several items as "Complete"
2. **Expected**: Category progress bar updates
3. **Expected**: Overall progress percentage increases
4. **Expected**: "Complete" count in summary card increases

#### TC3.5: Last Reviewed Timestamp
1. Update an item's status
2. Check the "Last reviewed" timestamp
3. **Expected**: Shows current date

### API Testing
```bash
# Get all compliance items
curl -X GET http://localhost:3000/api/compliance/items \
  -H "Cookie: your-session-cookie"

# Update item status
curl -X PATCH http://localhost:3000/api/compliance/items \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  -d '{"id": "item-uuid", "status": "complete"}'
```

### Database Verification
```sql
-- Check compliance items exist
SELECT category, title, status, last_reviewed_at 
FROM compliance_items 
ORDER BY category, title;

-- Check status distribution
SELECT status, COUNT(*) 
FROM compliance_items 
GROUP BY status;
```

---

## Feature 4: Audit Log Viewer

### Access
- **URL**: `/admin/audit-logs`
- **Required Role**: `admin`

### Test Cases

#### TC4.1: Log Display
1. Log in as admin
2. Navigate to `/admin/audit-logs`
3. **Expected**: Shows audit log table with recent events
4. **Expected**: Displays timestamp, actor, action, resource, IP address
5. **Expected**: Shows summary statistics (Total Events, Unique Actions, Resource Types)

#### TC4.2: Filtering by Action
1. Click the "All Actions" dropdown
2. Select a specific action (e.g., "compliance_item_updated")
3. **Expected**: Table filters to show only that action
4. **Expected**: Results update immediately

#### TC4.3: Filtering by Resource Type
1. Click the "All Resources" dropdown
2. Select a resource type (e.g., "compliance_item")
3. **Expected**: Table filters to show only that resource type
4. **Expected**: Can combine with action filter

#### TC4.4: Search Functionality
1. Type in the search box (e.g., actor email or action name)
2. **Expected**: Table filters in real-time
3. **Expected**: Searches across actor name, email, action, and resource type

#### TC4.5: Pagination
1. If more than 50 logs exist, check pagination controls
2. Click "Next" button
3. **Expected**: Shows next page of results
4. **Expected**: Page indicator updates
5. Click "Previous" button
6. **Expected**: Returns to previous page

#### TC4.6: CSV Export
1. Click "Export CSV" button
2. **Expected**: Downloads CSV file with current filtered results
3. **Expected**: CSV includes all relevant columns
4. **Expected**: Filename includes timestamp

#### TC4.7: Audit Log Creation
1. Perform an action that creates an audit log (e.g., update compliance item)
2. Navigate to `/admin/audit-logs`
3. **Expected**: New log entry appears at the top
4. **Expected**: Shows correct actor, action, and resource information

### API Testing
```bash
# Get audit logs
curl -X GET "http://localhost:3000/api/audit-logs?limit=50&offset=0" \
  -H "Cookie: your-session-cookie"

# Get filtered logs
curl -X GET "http://localhost:3000/api/audit-logs?action=compliance_item_updated" \
  -H "Cookie: your-session-cookie"
```

### Database Verification
```sql
-- Check audit logs exist
SELECT actor_email, action, resource_type, created_at 
FROM audit_logs 
ORDER BY created_at DESC 
LIMIT 20;

-- Check log counts by action
SELECT action, COUNT(*) 
FROM audit_logs 
GROUP BY action 
ORDER BY COUNT(*) DESC;

-- Verify compliance updates are logged
SELECT * FROM audit_logs 
WHERE action = 'compliance_item_updated' 
ORDER BY created_at DESC;
```

---

## Integration Testing

### IT1: Compliance Update Creates Audit Log
1. Navigate to `/admin/compliance`
2. Update a compliance item status
3. Navigate to `/admin/audit-logs`
4. **Expected**: See audit log entry for the compliance update
5. **Expected**: Log shows correct actor, action, and resource ID

### IT2: Multi-Role Workflow
1. Log in as board user, view dashboard
2. Log in as partner user, view dashboard
3. Log in as admin, view compliance and audit logs
4. **Expected**: Each role sees appropriate data
5. **Expected**: No cross-contamination of tenant data

### IT3: Data Consistency
1. Create a referral in the database
2. View in board portal
3. **Expected**: Referral appears correctly
4. Update enrollment status
5. Refresh board portal
6. **Expected**: Status update reflects immediately

---

## Performance Testing

### PT1: Large Dataset Handling
1. Seed database with 1000+ audit logs
2. Navigate to `/admin/audit-logs`
3. **Expected**: Page loads in < 2 seconds
4. **Expected**: Pagination works smoothly
5. **Expected**: Filtering is responsive

### PT2: Concurrent Access
1. Open board portal in one browser
2. Open partner portal in another browser
3. Open compliance checklist in a third
4. **Expected**: All portals load without errors
5. **Expected**: No performance degradation

---

## Security Testing

### ST1: Authorization Checks
1. Try accessing `/board/dashboard` without authentication
2. **Expected**: Redirected to login
3. Try accessing `/board/dashboard` as student
4. **Expected**: Forbidden error
5. Try accessing `/admin/compliance` as partner
6. **Expected**: Forbidden error

### ST2: Tenant Isolation
1. Create data for tenant A
2. Log in as partner for tenant B
3. Try to access tenant A's data via API
4. **Expected**: No data returned or forbidden error

### ST3: SQL Injection Prevention
1. Try SQL injection in search fields
2. Try SQL injection in filter parameters
3. **Expected**: No errors, no data leakage

---

## Regression Testing

### RT1: Existing Features Still Work
1. Test student enrollment flow
2. Test course access
3. Test instructor dashboard
4. Test admin user management
5. **Expected**: All existing features work as before

### RT2: Database Schema Compatibility
1. Run existing queries
2. Check existing RLS policies
3. **Expected**: No breaking changes to existing tables

---

## Acceptance Criteria

### Board Portal
- ✅ Board users can view their organization's referrals
- ✅ Metrics display correctly
- ✅ Student roster shows accurate data
- ✅ Role-based access control enforced

### Partner Portal
- ✅ Partner users can view their tenant's learners
- ✅ Tenant isolation works correctly
- ✅ Training hours tracked for WIOA reporting
- ✅ Learner roster displays all required fields

### Compliance Checklist
- ✅ All compliance items display by category
- ✅ Status updates work and persist
- ✅ Progress tracking accurate
- ✅ Admin-only access enforced

### Audit Logs
- ✅ All actions logged correctly
- ✅ Filtering and search work
- ✅ Pagination handles large datasets
- ✅ CSV export functional
- ✅ Admin-only access enforced

---

## Known Issues / Limitations

1. **Migration Required**: The `20251118_audit_logs_portals.sql` migration must be applied before testing
2. **Test Data**: Seed data needed for meaningful testing of portals
3. **IP Address Tracking**: Currently not captured in audit logs (requires middleware enhancement)
4. **User Agent**: Currently not captured in audit logs (requires middleware enhancement)

---

## Next Steps

1. Apply database migration
2. Create test users for each role
3. Seed test data for enrollments and referrals
4. Execute test cases systematically
5. Document any bugs or issues found
6. Verify all acceptance criteria met

---

## Test Data Setup Script

```sql
-- Create test board user
INSERT INTO profiles (id, email, full_name, role, organization)
VALUES (gen_random_uuid(), 'board@test.com', 'Test Board User', 'board', 'Test Workforce Board');

-- Create test partner user
INSERT INTO profiles (id, email, full_name, role, tenant_id)
VALUES (gen_random_uuid(), 'partner@test.com', 'Test Partner User', 'partner', 'test-tenant');

-- Create test enrollments with referrals
INSERT INTO enrollments (user_id, course_id, referred_by, hours_trained, sector, zip_code)
SELECT 
  (SELECT id FROM profiles WHERE role = 'student' LIMIT 1),
  (SELECT id FROM courses LIMIT 1),
  'Test Workforce Board',
  40.5,
  'Healthcare',
  '12345';
```

---

## Sign-Off

- [ ] All test cases executed
- [ ] All acceptance criteria met
- [ ] No critical bugs found
- [ ] Documentation updated
- [ ] Ready for production deployment

**Tested By**: _________________  
**Date**: _________________  
**Approved By**: _________________  
**Date**: _________________
