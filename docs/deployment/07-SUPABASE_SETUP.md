# 🗄️ Supabase Setup

## Project Configuration

**Project ID:** cuxzzpsyufcewtmicszk
**Region:** US East
**Database:** PostgreSQL 15

---

## Connection Details

### Pooler Connection (Production)

```
Host: aws-0-us-east-1.pooler.supabase.com
Port: 6543
Database: postgres
User: postgres.cuxzzpsyufcewtmicszk
Password: [URL-encoded in DATABASE_URL]
```

### Direct Connection (Development)

```
Host: db.cuxzzpsyufcewtmicszk.supabase.co
Port: 5432
Database: postgres
```

---

## Tables Created

1. program_licenses
2. license_usage_log
3. store_instances
4. store_branding
5. document_audit_log
6. document_requirements
7. notifications

---

## Functions Created

1. check_license_valid(license_key)
2. increment_license_usage(license_id, enrollment_id, student_id)
3. decrement_license_usage(license_id, enrollment_id, student_id)
4. get_partner_license_info(partner_id)
5. can_user_enroll(user_id, program_id, license_key)
6. get_user_document_requirements(user_id)

---

## Triggers Created

1. validate_enrollment_license
2. track_license_usage
3. decrement_license_usage
4. log_document_action
5. update_document_timestamp
6. notify_document_status_change
7. validate_partner_course_creation
8. notify_enrollment_created

---

## Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- Users can view own data
- Admins can view/manage all data
- License holders can view own licenses
- Partners can manage own courses

---

## Storage Buckets

- **documents** - User document uploads
- **scorm-packages** - SCORM package uploads

---

## API Keys

- **Anon Key:** Public, safe for client-side
- **Service Role Key:** Private, server-side only

---

## Dashboard Access

https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
