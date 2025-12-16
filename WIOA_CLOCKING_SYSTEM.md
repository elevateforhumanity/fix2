# WIOA-Compliant Apprentice Clocking System

## ✅ Implementation Complete

### Files Created:

1. **Database Migration**
   - `supabase/migrations/20251216_wioa_compliant_hours.sql`
   - Upgrades existing `apprentice_hours_log` table
   - Creates `apprentice_funding_profile` table
   - Adds RLS policies for students/mentors/admins

2. **API Routes**
   - `app/api/time/entries/route.ts` - Clock in/out with WIOA validation
   - `app/api/time/approve/route.ts` - Mentor approval workflow

3. **API Routes (Enhanced)**
   - `app/api/time/entries/route.ts` - Clock in/out with WIOA validation (POST/GET)
   - `app/api/time/approve/route.ts` - Mentor approval workflow (POST/GET with apprentice names)
   - `app/api/time/export/route.ts` - CSV export for reporting (GET)

4. **UI Components**
   - `app/mentor/approvals/page.tsx` - Mentor approval dashboard with apprentice names, date filters, CSV export
   - `app/apprentice/hours/page.tsx` - Student clock-in/out interface

## 🚀 Deployment Steps

### 1. Apply Database Migration

Your Supabase project: `cuxzzpsyufcewtmicszk`

```bash
# Link to your Supabase project
npx supabase link --project-ref cuxzzpsyufcewtmicszk

# Push migrations
npx supabase db push
```

**Alternative: Manual Application**

1. Go to https://supabase.com/dashboard/project/cuxzzpsyufcewtmicszk
2. Click "SQL Editor"
3. Copy contents of `supabase/migrations/20251216_wioa_compliant_hours.sql`
4. Paste and run

### 2. Test API Endpoints

```bash
# Test time entries endpoint (should return 401 if not logged in)
curl -i http://localhost:3000/api/time/entries

# Test approval endpoint (should return 401 if not logged in)
curl -i http://localhost:3000/api/time/approve
```

### 3. Access Mentor Dashboard

Navigate to: `/mentor/approvals`

## 📋 What the System Does

### WIOA Compliance Features

✅ **Funding Phase Tracking**

- PRE_WIOA: Before WIOA approval
- WIOA: During WIOA funding period
- POST_CERT: After certification

✅ **Hour Type Classification**

- RTI: Related Technical Instruction (classroom)
- OJT: On-the-Job Training (shop floor)

✅ **Approval Workflow**

- DRAFT: Not submitted
- SUBMITTED: Awaiting mentor approval
- APPROVED: Mentor approved
- REJECTED: Mentor rejected
- LOCKED: Final/audited (cannot be modified)

✅ **Validation Rules**

- No backdating WIOA hours before approval date
- Weekly caps: 40 hrs total, 8 hrs WIOA RTI
- Overlap prevention (can't log same hours twice)
- Attestation required (student confirms accuracy)

✅ **Audit Trail**

- Tracks who approved and when
- Immutable locked entries
- Complete timestamp history

## 🔐 Security (RLS Policies)

### Students Can:

- View their own hours
- Log new hours (DRAFT or SUBMITTED)
- Update their own DRAFT hours

### Mentors Can:

- View hours for their apprentices
- Approve/reject SUBMITTED hours
- Lock APPROVED hours

### Admins Can:

- Full access to all records
- Manage funding profiles

## 📊 Database Schema

### `apprentice_hours_log` (upgraded)

- `id` - UUID primary key
- `enrollment_id` - Links to student_enrollments
- `program_holder_id` - Links to shop/mentor
- `log_date` - Date of work
- `start_at` - Clock-in timestamp
- `end_at` - Clock-out timestamp
- `minutes` - Auto-calculated duration
- `hour_type` - RTI or OJT
- `funding_phase` - PRE_WIOA, WIOA, or POST_CERT
- `status` - DRAFT, SUBMITTED, APPROVED, REJECTED, LOCKED
- `apprentice_attest` - Student attestation
- `milady_module_ref` - Optional module reference
- `activity_note` - What they did
- `submitted_at` - When submitted
- `approved_by` - Who approved
- `approved_at` - When approved

### `apprentice_funding_profile`

- `enrollment_id` - Primary key, links to student_enrollments
- `wioa_start_date` - When WIOA funding begins
- `post_cert_date` - When certification completed
- `wioa_approved_by` - Who approved WIOA
- `wioa_approved_at` - When WIOA approved

### `weekly_hours_summary` (view)

- Aggregates hours by week, funding phase, and hour type
- Used for reporting and compliance checks

## 🎯 Next Steps

### Required Before Production:

1. ✅ Apply database migration
2. ⏳ Set WIOA start dates for existing enrollments
3. ⏳ Train mentors on approval workflow
4. ⏳ Test with sample data

### ✅ Completed Enhancements:

- ✅ Student clock-in UI component (`/apprentice/hours`)
- ✅ Weekly report export (CSV) (`/api/time/export`)
- ✅ Apprentice name lookup in approval dashboard
- ✅ Date range filters (from/to)
- ✅ Bulk actions ready (approve/reject/lock)

### Future Enhancements:

- Email notifications for approvals
- Mobile app for clock-in
- Geolocation verification
- Photo upload for OJT verification

## 📝 Usage Examples

### Student Logs Hours (API)

```bash
POST /api/time/entries
{
  "enrollment_id": "uuid",
  "start_at": "2024-12-16T08:00:00Z",
  "end_at": "2024-12-16T12:00:00Z",
  "hour_type": "OJT",
  "funding_phase": "WIOA",
  "activity_note": "Practiced fades and tapers",
  "apprentice_attest": true
}
```

### Mentor Approves Hours (API)

```bash
POST /api/time/approve
{
  "entry_id": "uuid",
  "action": "APPROVED"
}
```

### Mentor Dashboard (UI)

Navigate to `/mentor/approvals` to:

- View pending submissions
- Filter by status, phase, type
- Approve/reject/lock entries
- See complete audit trail

## 🐛 Troubleshooting

### Migration Fails

- Check if `apprentice_hours_log` table exists
- Verify `student_enrollments` table exists
- Check for conflicting enum types

### API Returns 401

- User not logged in
- Check Supabase auth configuration
- Verify cookies are being sent

### Mentor Can't See Entries

- Check `program_holders` table has mentor's email
- Verify `program_holder_id` is set on entries
- Check RLS policies are enabled

### Weekly Cap Errors

- Adjust `MAX_WEEKLY_TOTAL_MIN` in API route
- Adjust `MAX_WEEKLY_WIOA_RTI_MIN` in API route
- Check week calculation logic

## 📞 Support

For issues or questions:

1. Check this documentation
2. Review API error messages
3. Check Supabase logs
4. Verify RLS policies in Supabase dashboard

## 🎉 Success Criteria

System is working when:

- ✅ Students can log hours via API
- ✅ Mentors can approve via dashboard
- ✅ WIOA hours cannot be backdated
- ✅ Weekly caps are enforced
- ✅ Locked entries cannot be modified
- ✅ Audit trail is complete
