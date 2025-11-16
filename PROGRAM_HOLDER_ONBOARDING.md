# Program Holder Onboarding System

## Overview

Complete self-service onboarding system for Training Providers (barber shops, CNA schools, HVAC partners, etc.) with automated MOU generation and revenue share management.

---

## Features Implemented

### 1. Self-Service Application ✅

**Route:** `/program-holder/apply`

**Features:**

- Public application form for training providers
- Collects organization details, contact info, training focus
- Requires agreement to MOU terms
- Automatic account creation with "pending" status
- Success confirmation with next steps

**Fields Collected:**

- Organization name
- Primary contact name and email
- Phone number
- Site address (training location)
- Training focus (barber, CNA, HVAC, etc.)
- Funding sources (WRG, WIOA, JRI, etc.)
- Agreement checkbox

### 2. Admin Management Portal ✅

**Route:** `/admin/program-holders`

**Features:**

- View all program holder applications
- See application status (pending, approved, inactive)
- Review contact details and training focus
- Approve/deactivate program holders
- Download MOU documents
- Track MOU status (not_sent, sent, signed)
- View payout share percentage

**Actions Available:**

- **Approve** - Changes status from pending to approved
- **Deactivate** - Changes status to inactive
- **Download MOU** - Generates personalized MOU document
- **Mark Signed** - Updates MOU status to signed

### 3. Automated MOU Generation ✅

**API:** `/api/admin/program-holders/mou?id={holder_id}`

**Features:**

- Generates personalized MOU with program holder name
- Includes payout share percentage (default 33.3%)
- Pre-fills contact information
- Downloadable as text file
- Automatically marks MOU as "sent" on first download
- Professional legal language
- Ready for signature

**MOU Sections:**

1. Purpose and scope
2. Roles and responsibilities
3. Programs covered
4. Compensation and revenue share
5. Data and reporting requirements
6. Term and termination
7. Independent contractor relationship
8. Non-exclusivity
9. Entire understanding and amendments

### 4. Revenue Share Model ✅

**Default:** 1/3 (33.3%) to Program Holder

**Calculation:**

```
Net Program Revenue = Total Revenue - Direct Costs

Direct Costs Include:
- Credentialing partner fees
- Background checks and drug screens
- Learner toolkits and equipment
- Platform and compliance fees

Program Holder Share = Net Program Revenue × payout_share
Elevate Retains = Net Program Revenue × (1 - payout_share)
```

**Customizable:**

- Admin can adjust payout_share per program holder
- Default is 0.333 (33.3%)
- Stored in database for easy modification

### 5. Status Management ✅

**Program Holder Statuses:**

- **pending** - Application submitted, awaiting review
- **approved** - Approved and active, can receive participants
- **inactive** - Deactivated, no longer receiving participants

**MOU Statuses:**

- **not_sent** - MOU not yet generated
- **sent** - MOU downloaded/sent to program holder
- **signed** - MOU signed and returned

**Status Workflow:**

```
Application → pending → approved → active operations
                ↓
            inactive (if needed)

MOU: not_sent → sent → signed
```

### 6. Delegate Portal Integration ✅

**Route:** `/delegate/reports`

**Features:**

- Shows status banner if pending or inactive
- Pending: "Application Under Review" message
- Inactive: "Account Inactive" message
- Approved: Full access to participant tracking
- Automatic access upon approval

**Permissions:**

- View reports: ✅ (default)
- View learners: ✅ (default)
- Edit courses: ❌ (default)
- View financials: ❌ (default)

---

## Database Schema

### Tables Created/Modified

```sql
-- Program holders table (modified)
create table public.program_holders(
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_user_id uuid references auth.users(id),
  status text default 'pending', -- NEW
  payout_share numeric default 0.333, -- NEW
  mou_status text default 'not_sent', -- NEW
  mou_signed_at timestamptz, -- NEW
  created_at timestamptz default now()
);

-- Program holder applications (new)
create table public.program_holder_applications(
  id uuid primary key default gen_random_uuid(),
  program_holder_id uuid references public.program_holders(id) on delete cascade,
  contact_name text not null,
  contact_email text not null,
  phone text,
  site_address text,
  training_focus text,
  funding_sources text,
  created_at timestamptz default now()
);
```

---

## API Endpoints

### Public/Authenticated

**POST `/api/program-holder/apply`**

- Submit training provider application
- Requires authentication
- Creates program_holder, application, profile, and delegate records
- Returns: `{ ok: true, program_holder_id: uuid }`

**GET `/api/program-holder/status`**

- Get current user's program holder status
- Requires authentication
- Returns: `{ status: string, mou_status: string }`

### Admin Only

**GET `/api/admin/program-holders`**

- List all program holders with application details
- Admin only
- Returns: Array of program holder objects

**POST `/api/admin/program-holders/update`**

- Update program holder status or MOU status
- Admin only
- Body: `{ id: uuid, status?: string, mou_status?: string }`
- Returns: `{ ok: true }`

**GET `/api/admin/program-holders/mou?id={holder_id}`**

- Generate and download MOU document
- Admin only
- Automatically updates mou_status to 'sent'
- Returns: Text file download

---

## Workflows

### 1. Training Provider Onboarding

**Step 1: Application**

1. Training provider creates account at `/signup`
2. Logs in and navigates to `/program-holder/apply`
3. Fills out application form
4. Agrees to MOU terms
5. Submits application

**Step 2: Admin Review**

1. Admin receives notification (optional)
2. Admin navigates to `/admin/program-holders`
3. Reviews application details
4. Clicks "Approve" button
5. Status changes to "approved"

**Step 3: MOU Process**

1. Admin clicks "Download MOU" button
2. MOU generated with program holder details
3. MOU status changes to "sent"
4. Admin sends MOU to program holder via email
5. Program holder signs and returns MOU
6. Admin clicks "Mark Signed"
7. MOU status changes to "signed"

**Step 4: Active Operations**

1. Program holder logs into `/delegate/reports`
2. Sees their assigned participants
3. Documents case notes and progress
4. Receives revenue share payments

### 2. Revenue Share Payment

**Monthly/Quarterly Process:**

1. Elevate receives funding for participants
2. Calculate Net Program Revenue:
   - Total revenue received
   - Minus credentialing fees
   - Minus toolkit costs
   - Minus platform fees
3. Calculate program holder share:
   - Net Revenue × payout_share (33.3%)
4. Generate payment statement
5. Issue payment to program holder
6. Document in financial records

**Statement Includes:**

- Number of participants
- Funding sources
- Gross revenue
- Direct program expenses
- Net Program Revenue
- Program holder share amount

### 3. Participant Assignment

**Process:**

1. Participant enrolls in training
2. Admin assigns to program holder's course
3. Program holder sees participant in portal
4. Program holder documents progress
5. Upon completion, revenue share calculated
6. Payment issued to program holder

---

## MOU Template Details

### Key Terms

**Payout Share:** 33.3% (1/3) of Net Program Revenue

**Net Program Revenue Definition:**

- Total revenue received
- MINUS credentialing fees
- MINUS background checks
- MINUS learner toolkits
- MINUS platform fees

**Payment Timing:**

- Monthly or quarterly cycles
- After funds received and cleared
- With detailed statement

**Programs Covered:**

- Barber/Beauty Apprenticeship
- CNA/Patient Care
- HVAC/Construction
- Peer Support/Recovery Coach
- Financial Literacy
- Other industry-recognized credentials

**Responsibilities:**

_Elevate:_

- System of record
- LMS and portal
- Compliance coordination
- Fund collection
- Payment processing

_Program Holder:_

- Safe training environment
- Hands-on instruction
- Attendance tracking
- Case note documentation
- Compliance with regulations

**Term:**

- Effective upon signature
- Continues until terminated
- 30 days notice required
- Immediate termination for breach

**Relationship:**

- Independent contractor
- Not employment
- Not partnership
- Not joint venture

---

## User Experience

### For Training Providers

**Application Process:**

1. Visit `/program-holder/apply`
2. See clear form with all required fields
3. Read MOU terms summary
4. Submit with one click
5. Receive confirmation message
6. Wait for approval email

**Portal Access:**

1. Log in to account
2. Navigate to `/delegate/reports`
3. If pending: See "Under Review" banner
4. If approved: See full participant list
5. Document case notes
6. Track progress

**Revenue Tracking:**

1. Receive monthly/quarterly statements
2. Review participant count
3. See revenue calculations
4. Receive payments
5. Access historical records

### For Admins

**Review Applications:**

1. Navigate to `/admin/program-holders`
2. See all applications in table
3. Review contact details
4. Check training focus
5. Approve or request more info

**Manage MOUs:**

1. Click "Download MOU" for approved holders
2. MOU auto-generated with details
3. Send to program holder
4. Track signature status
5. Mark as signed when returned

**Monitor Status:**

1. See all holders at a glance
2. Filter by status
3. View MOU status
4. Check payout share
5. Deactivate if needed

---

## Configuration

### Environment Variables

No new environment variables required. Uses existing Supabase configuration.

### Database Migration

Run the updated `supabase/schema.sql` to add:

- `status`, `payout_share`, `mou_status`, `mou_signed_at` to `program_holders`
- New `program_holder_applications` table

### Customization

**Payout Share:**

- Default: 0.333 (33.3%)
- Adjustable per program holder in database
- Can be modified in admin interface (future enhancement)

**MOU Template:**

- Located in `/lib/mou-template.ts`
- Fully customizable
- Supports variable substitution
- Can add custom sections

**Application Fields:**

- Modify form in `/app/program-holder/apply/page.tsx`
- Add fields to `program_holder_applications` table
- Update API to handle new fields

---

## Security & Compliance

### Access Control

- Application requires authentication
- Admin endpoints verify admin role
- Program holders only see their data
- MOU download requires admin role

### Data Privacy

- Contact information stored securely
- Application details linked to program holder
- No PII exposed in URLs
- Audit trail via timestamps

### Legal Protection

- MOU establishes independent contractor relationship
- Clear revenue share terms
- Termination clauses
- Non-exclusivity provisions

---

## Testing Checklist

### Application Flow

- [ ] User can access application form
- [ ] All fields validate correctly
- [ ] Agreement checkbox required
- [ ] Submission creates all records
- [ ] Success message displays
- [ ] User redirected appropriately

### Admin Management

- [ ] Admin can view all applications
- [ ] Status updates work correctly
- [ ] MOU downloads successfully
- [ ] MOU status updates properly
- [ ] Approval grants portal access

### Portal Access

- [ ] Pending users see banner
- [ ] Approved users see full portal
- [ ] Inactive users see warning
- [ ] Status checks work correctly

### MOU Generation

- [ ] MOU includes correct details
- [ ] Payout share displays correctly
- [ ] Contact info pre-filled
- [ ] File downloads properly
- [ ] Status updates on download

---

## Future Enhancements

### Suggested Features

1. **Email Notifications**
   - Auto-email on application submission
   - Notify applicant when approved
   - Send MOU via email automatically
   - Reminder for unsigned MOUs

2. **Digital Signatures**
   - DocuSign integration
   - E-signature workflow
   - Automatic status update on signing
   - Store signed PDF

3. **Revenue Dashboard**
   - Program holder revenue portal
   - Real-time participant count
   - Payment history
   - Downloadable statements

4. **Application Workflow**
   - Multi-step approval process
   - Request additional information
   - Internal notes on applications
   - Approval notifications

5. **Payout Management**
   - Adjust payout share in UI
   - Custom rates per program
   - Payment scheduling
   - ACH integration

6. **Compliance Tracking**
   - Required documents checklist
   - Expiration tracking
   - Renewal reminders
   - Audit trail

---

## Support & Troubleshooting

### Common Issues

**Application not submitting:**

- Check all required fields filled
- Verify agreement checkbox checked
- Check browser console for errors
- Ensure user is logged in

**MOU not downloading:**

- Verify admin role
- Check program holder exists
- Review browser download settings
- Check API logs for errors

**Portal access denied:**

- Verify program holder status is "approved"
- Check delegate record exists
- Verify user_profile.program_holder_id set
- Check permissions in delegates table

### Debug Queries

```sql
-- Check program holder status
SELECT * FROM program_holders WHERE owner_user_id = 'user-id';

-- Check application details
SELECT * FROM program_holder_applications WHERE program_holder_id = 'holder-id';

-- Check delegate permissions
SELECT * FROM delegates WHERE user_id = 'user-id';

-- Check user profile linkage
SELECT * FROM user_profiles WHERE user_id = 'user-id';
```

---

## Documentation Files

- `/PROGRAM_HOLDER_ONBOARDING.md` - This document
- `/lib/mou-template.ts` - MOU template code
- `/app/program-holder/apply/page.tsx` - Application form
- `/app/admin/program-holders/page.tsx` - Admin management
- `/supabase/schema.sql` - Database schema

---

## Version History

- **v1.0** - Initial program holder onboarding system
- **v1.1** - Added MOU generation and status tracking
- **v1.2** - Added revenue share management
- **v1.3** - Added delegate portal integration
