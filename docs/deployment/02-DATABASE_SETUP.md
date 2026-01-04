# 🗄️ Database Setup

## SQL Files Executed

### 1. FINAL_COMPLETE_ALL.sql (394 lines)

Created core tables and functions:

- program_licenses
- license_usage_log
- store_instances
- store_branding
- check_license_valid()
- increment_license_usage()
- decrement_license_usage()

### 2. EXECUTE_ALL_TRIGGERS_FUNCTIONS.sql (460 lines)

Created triggers and utility functions:

- 11 triggers for automation
- 3 utility functions
- Complete notification system

### 3. MISSING_TABLES.sql

Created additional tables:

- document_audit_log
- document_requirements
- notifications

---

## Tables Schema

### program_licenses

```sql
- id (UUID)
- program_id (UUID)
- license_holder_id (UUID)
- license_key (TEXT, UNIQUE)
- license_type (TEXT)
- max_enrollments (INTEGER)
- current_enrollments (INTEGER)
- lms_model (TEXT)
- can_create_courses (BOOLEAN)
- can_upload_scorm (BOOLEAN)
- status (TEXT)
- expires_at (TIMESTAMPTZ)
```

### document_requirements

```sql
- id (UUID)
- role (TEXT)
- document_type (TEXT)
- is_required (BOOLEAN)
- description (TEXT)
- instructions (TEXT)
```

---

## Triggers

1. **validate_enrollment_license** - Validates license before enrollment
2. **track_license_usage** - Increments usage on enrollment
3. **decrement_license_usage** - Decrements on enrollment deletion
4. **log_document_action** - Creates audit log entries
5. **update_document_timestamp** - Updates timestamps
6. **notify_document_status_change** - Sends notifications
7. **validate_partner_course_creation** - Validates license for courses
8. **notify_enrollment_created** - Sends enrollment notifications

---

## Functions

### Business Logic

- `check_license_valid(license_key)` - Returns boolean
- `increment_license_usage(license_id, enrollment_id, student_id)` - Void
- `decrement_license_usage(license_id, enrollment_id, student_id)` - Void

### Utility Functions

- `get_partner_license_info(partner_id)` - Returns license details
- `can_user_enroll(user_id, program_id, license_key)` - Returns eligibility
- `get_user_document_requirements(user_id)` - Returns requirements

---

## Verification

All tables, triggers, and functions verified working in production database.
