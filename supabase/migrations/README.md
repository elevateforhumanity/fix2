# Supabase Migrations

Database schema migrations for Elevate for Humanity.

## Applications Table

The `applications` table stores student applications for training programs.

### Running the Migration

#### Option 1: Supabase Dashboard (Recommended)
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to SQL Editor
4. Copy contents of `applications_table.sql`
5. Paste and run

#### Option 2: Supabase CLI
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migration
supabase db push
```

### Schema Overview

```sql
applications (
  id UUID PRIMARY KEY,
  
  -- Personal Info
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  
  -- Address
  street_address TEXT,
  city TEXT NOT NULL,
  state TEXT DEFAULT 'IN',
  zip_code TEXT NOT NULL,
  
  -- Program
  program_id UUID,
  program_name TEXT NOT NULL,
  
  -- Additional
  notes TEXT,
  referral_source TEXT,
  funding_type TEXT,
  has_barriers BOOLEAN,
  barrier_types TEXT[],
  
  -- Status
  status TEXT DEFAULT 'pending',
  
  -- Timestamps
  submitted_at TIMESTAMP,
  reviewed_at TIMESTAMP,
  approved_at TIMESTAMP,
  enrolled_at TIMESTAMP,
  
  -- Reviewer
  reviewed_by UUID,
  reviewer_notes TEXT
)
```

### Status Workflow

1. **pending** - Initial submission
2. **reviewing** - Under review by staff
3. **approved** - Approved for enrollment
4. **rejected** - Application denied
5. **enrolled** - Student enrolled in program
6. **withdrawn** - Application withdrawn

### Funding Types

- `WIOA` - Workforce Innovation and Opportunity Act
- `WRG` - Workforce Ready Grant
- `JRI` - Justice Reinvestment Initiative
- `Self-Pay` - Student paying directly
- `Other` - Other funding sources

### API Integration

#### Submit Application

```typescript
const { data, error } = await supabase
  .from('applications')
  .insert({
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    phone: '317-555-0100',
    city: 'Indianapolis',
    zip_code: '46226',
    program_name: 'CNA Training',
    funding_type: 'WIOA',
  })
  .select()
  .single();
```

#### Query Applications

```typescript
// Get all pending applications
const { data } = await supabase
  .from('applications')
  .select('*')
  .eq('status', 'pending')
  .order('submitted_at', { ascending: false });

// Search applications
const { data } = await supabase
  .from('applications')
  .select('*')
  .textSearch('fts', 'john doe');

// Get applications by program
const { data } = await supabase
  .from('applications')
  .select('*')
  .eq('program_name', 'CNA Training');
```

#### Update Application Status

```typescript
const { data, error } = await supabase
  .from('applications')
  .update({
    status: 'approved',
    approved_at: new Date().toISOString(),
    reviewed_by: userId,
    reviewer_notes: 'Approved for enrollment',
  })
  .eq('id', applicationId);
```

### Row Level Security (RLS)

The table has RLS enabled with the following policies:

1. **Public Insert** - Anyone can submit applications
2. **User Select** - Users can view their own applications
3. **Admin Select** - Admins can view all applications
4. **Admin Update** - Admins can update applications

### Indexes

Optimized indexes for common queries:
- Email lookup
- Status filtering
- Program filtering
- Date sorting
- Full-text search

### Integration with Apply Form

Update your apply form to use this table:

```typescript
// app/apply/actions.ts
'use server';

import { createClient } from '@supabase/supabase-js';
import { ApplySchema } from '@/lib/validation/apply';

export async function submitApplication(formData: FormData) {
  const data = Object.fromEntries(formData.entries());
  const parsed = ApplySchema.safeParse(data);
  
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  
  const { data: application, error } = await supabase
    .from('applications')
    .insert({
      first_name: parsed.data.firstName,
      last_name: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      city: parsed.data.city,
      zip_code: parsed.data.zip,
      program_name: parsed.data.program,
      notes: parsed.data.notes,
    })
    .select()
    .single();
  
  if (error) {
    return { error: 'Failed to submit application' };
  }
  
  // Send confirmation email
  // await sendConfirmationEmail(application);
  
  return { success: true, applicationId: application.id };
}
```

### Admin Dashboard Integration

Query for admin dashboard:

```typescript
// Get application statistics
const { data: stats } = await supabase
  .rpc('get_application_stats');

// Get recent applications
const { data: recent } = await supabase
  .from('applications')
  .select('*')
  .order('submitted_at', { ascending: false })
  .limit(10);

// Get applications by status
const { data: pending } = await supabase
  .from('applications')
  .select('*')
  .eq('status', 'pending')
  .order('submitted_at', { ascending: false });
```

### Email Notifications

Set up email notifications for:
- Application submitted (to applicant)
- Application received (to admin)
- Application approved (to applicant)
- Application rejected (to applicant)

### Future Enhancements

- [ ] Document upload support
- [ ] Interview scheduling
- [ ] Automated eligibility checking
- [ ] Integration with student records
- [ ] Automated status updates
- [ ] SMS notifications
- [ ] Application analytics dashboard

## Other Migrations

Add additional migration files here as needed:
- `certificates_table.sql` - Certificate records
- `students_table.sql` - Student profiles
- `programs_table.sql` - Training programs
- `enrollments_table.sql` - Student enrollments

## Support

For database issues, contact: tech@elevateforhumanity.org
