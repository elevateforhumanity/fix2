# Payroll & Onboarding Integration

**Last Updated:** January 1, 2026  
**Status:** ✅ FULLY INTEGRATED AND ACTIVE

---

## Overview

The payroll system IS ALREADY LINKED to the onboarding process. New employees, apprentices, and staff automatically set up their payroll information during onboarding.

---

## Onboarding Payroll Setup

### Location: `/onboarding/payroll-setup`

**Files:**

- `app/onboarding/payroll-setup/page.tsx` (45 lines)
- `app/onboarding/payroll-setup/PayrollSetupForm.tsx` (401 lines)

### How It Works:

#### 1. User Completes Initial Onboarding

- User signs up and creates account
- Completes role selection
- Navigates through onboarding steps

#### 2. Payroll Setup Step

**Route:** `/onboarding/payroll-setup`

**Process:**

```typescript
// 1. Verify user is logged in
const {
  data: { user },
} = await supabase.auth.getUser();
if (!user) redirect('/login?next=/onboarding/payroll-setup');

// 2. Get user profile and role
const { data: profile } = await supabase
  .from('profiles')
  .select('id, full_name, email, role')
  .eq('id', user.id)
  .single();

// 3. Get payout rate config for their role
const { data: rateConfigs } = await supabase
  .from('payout_rate_configs')
  .select('*')
  .eq('role', profile.role)
  .eq('is_active', true);

// 4. Check if payroll profile already exists
const { data: existingProfile } = await supabase
  .from('payroll_profiles')
  .select('*')
  .eq('user_id', user.id)
  .eq('role', profile.role)
  .single();
```

#### 3. User Fills Out Payroll Form

**PayrollSetupForm.tsx** (401 lines) collects:

**Banking Information:**

- Bank name
- Account type (checking/savings)
- Routing number
- Account number (encrypted)
- Direct deposit preference

**Tax Information:**

- W-4 withholding
- Tax filing status
- Number of allowances
- Additional withholding amount
- State tax information

**Payment Preferences:**

- Direct deposit vs. payroll card
- Payment schedule preference
- Split deposit options (if applicable)

**Payout Rate:**

- Role-based payout rate
- Configured from `payout_rate_configs` table
- Automatically applied based on role

#### 4. Data Saved to Database

**Table:** `payroll_profiles`

**Fields Saved:**

```sql
INSERT INTO payroll_profiles (
  user_id,
  role,
  bank_name,
  account_type,
  routing_number,
  account_number_encrypted,
  tax_withholding,
  direct_deposit_enabled,
  payout_rate,
  created_at,
  updated_at
) VALUES (...)
```

#### 5. Onboarding Continues

After payroll setup:

- User marked as having completed payroll step
- Can proceed to next onboarding step
- Payroll information stored securely
- Ready to receive payments

---

## Database Integration

### Tables Used:

#### 1. `payroll_profiles`

**Purpose:** Store user payroll information

**Created in:** `supabase/migrations/20251227_create_missing_tables.sql`

**Schema:**

```sql
CREATE TABLE IF NOT EXISTS payroll_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  role TEXT,
  bank_name TEXT,
  account_type TEXT CHECK (account_type IN ('checking', 'savings')),
  routing_number TEXT,
  account_number_encrypted TEXT,
  tax_withholding JSONB DEFAULT '{}'::jsonb,
  direct_deposit_enabled BOOLEAN DEFAULT FALSE,
  payout_rate DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Security:**

- Row Level Security (RLS) enabled
- Users can view/update own payroll
- Account numbers encrypted at application level
- Admins have full access

#### 2. `payout_rate_configs`

**Purpose:** Define payout rates by role

**Fields:**

- `role` - User role (apprentice, instructor, staff, etc.)
- `rate` - Hourly or salary rate
- `rate_type` - hourly, salary, commission
- `is_active` - Whether rate is currently active
- `effective_date` - When rate takes effect

**Example Data:**

```sql
INSERT INTO payout_rate_configs (role, rate, rate_type, is_active) VALUES
  ('apprentice', 15.00, 'hourly', true),
  ('instructor', 25.00, 'hourly', true),
  ('staff', 20.00, 'hourly', true);
```

---

## Onboarding Flow with Payroll

### Complete Onboarding Sequence:

1. **Start** (`/onboarding/start`)
   - Welcome screen
   - Role selection

2. **Role-Specific Steps**
   - Learner: `/onboarding/learner`
   - Employer: `/onboarding/employer`
   - Staff: `/onboarding/staff`
   - Partner: `/onboarding/partner`
   - School: `/onboarding/school`

3. **Payroll Setup** (`/onboarding/payroll-setup`) ← **INTEGRATED HERE**
   - Banking information
   - Tax withholding
   - Payment preferences
   - Payout rate assignment

4. **Handbook** (`/onboarding/handbook`)
   - Read and acknowledge handbook
   - Accept policies

5. **MOU** (`/onboarding/mou`)
   - Review and sign MOU (if applicable)
   - Electronic signature

6. **Complete**
   - Onboarding finished
   - Redirect to dashboard
   - Ready to work and receive payments

---

## Admin Payroll Management

### After Onboarding Complete:

**Admins can:**

1. **View Payroll Profiles** (`/admin/payroll`)
   - See all users with payroll setup
   - View banking information (encrypted)
   - Check direct deposit status
   - Verify tax withholding

2. **Generate Payroll** (`/admin/payroll`)
   - Calculate hours worked
   - Apply payout rates from profile
   - Generate payment records
   - Process payments

3. **Issue Payroll Cards** (`/admin/payroll-cards`)
   - For users without bank accounts
   - Alternative to direct deposit
   - Instant fund availability

4. **HR Payroll Operations** (`/admin/hr/payroll`)
   - Staff payroll management
   - Tax reporting
   - Benefits administration

---

## Payment Processing Flow

### From Onboarding to Payment:

**Step 1: User Onboards**

- Completes `/onboarding/payroll-setup`
- Payroll profile created in database
- Banking info stored (encrypted)
- Payout rate assigned

**Step 2: User Works**

- Logs hours (apprentice)
- Completes tasks (staff)
- Delivers training (instructor)

**Step 3: Admin Generates Payroll**

- Navigates to `/admin/payroll`
- Selects pay period
- System calculates:
  - Hours × Payout Rate = Gross Pay
  - Applies tax withholding
  - Calculates net pay

**Step 4: Payment Processed**

- Direct deposit to bank account (if enabled)
- OR load to payroll card
- Email notification sent
- Payment record created

**Step 5: User Receives Payment**

- Funds deposited
- Can view payment history
- Can update payroll info if needed

---

## Security & Compliance

### Data Protection:

**Encryption:**

- Account numbers encrypted at application level
- Sensitive data never stored in plain text
- Encryption keys managed securely

**Access Control:**

- RLS policies enforce data isolation
- Users can only view/edit own payroll
- Admins have controlled access
- Audit logs track all changes

**Compliance:**

- PCI DSS compliance for payment data
- SOC 2 standards for data handling
- GDPR/CCPA privacy protections
- IRS tax reporting requirements

---

## User Experience

### For New Users:

**Seamless Integration:**

1. Sign up for account
2. Complete role-specific onboarding
3. Set up payroll (one-time)
4. Start working
5. Receive payments automatically

**No Separate Payroll Setup:**

- Integrated into onboarding flow
- Can't be skipped (required step)
- Guided form with validation
- Help text and tooltips
- Error handling and validation

**User-Friendly:**

- Clear instructions
- Visual progress indicator
- Save and continue later
- Mobile-responsive
- Accessible design

---

## Admin Benefits

### Automated Payroll Setup:

**No Manual Entry:**

- Users enter own information
- Data validated automatically
- Stored securely in database
- Ready for payroll processing

**Reduced Errors:**

- Users verify own banking info
- Validation prevents typos
- Encrypted storage prevents breaches
- Audit trail for changes

**Faster Onboarding:**

- Payroll setup during onboarding
- No separate HR appointment needed
- Users can start working immediately
- First payment processed on schedule

---

## Integration Points

### Connected Systems:

**1. Onboarding System**

- `/onboarding/payroll-setup` page
- PayrollSetupForm component
- Onboarding progress tracking

**2. Payroll System**

- `/admin/payroll` management
- `payroll_profiles` table
- Payment processing

**3. Time Tracking**

- Hours logged by users
- Approved by supervisors
- Fed into payroll calculation

**4. Payment Processing**

- Direct deposit via ACH
- Payroll card loading
- Payment confirmation emails

**5. Reporting**

- Tax reporting (W-2, 1099)
- Payroll reports
- Compliance documentation

---

## Summary

**Payroll & Onboarding Integration Status:** ✅ FULLY ACTIVE

**Components:**

- ✅ Payroll setup page (45 lines)
- ✅ Payroll setup form (401 lines)
- ✅ Database tables with RLS
- ✅ Payout rate configuration
- ✅ Encryption for sensitive data
- ✅ Admin payroll management
- ✅ Payment processing workflow

**User Flow:**

1. Sign up → 2. Onboard → 3. Set up payroll → 4. Work → 5. Get paid

**Admin Flow:**

1. User onboards → 2. Payroll auto-created → 3. Generate payroll → 4. Process payment

**Benefits:**
✅ Seamless user experience  
✅ Automated data collection  
✅ Reduced admin workload  
✅ Secure data handling  
✅ Faster time to first payment  
✅ Compliance built-in

**Ready for production use!**

---

## Contact

**For Payroll/Onboarding Questions:**

- Email: elevate4humanityedu@gmail.com
- Phone: (317) 314-3757
