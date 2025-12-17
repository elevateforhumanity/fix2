import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: Request) {
  try {
    // Verify admin access
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const adminClient = createAdminClient();

    // Check if user is admin
    const { data: profile } = await adminClient
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    if (
      !profile ||
      !['admin', 'super_admin', 'org_admin', 'staff'].includes(profile.role)
    ) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get query parameters
    const url = new URL(req.url);
    const format = url.searchParams.get('format') || 'json';
    const startDate = url.searchParams.get('start_date');
    const endDate = url.searchParams.get('end_date');

    // Build query
    let query = adminClient
      .from('applications')
      .select(
        `
        id,
        first_name,
        last_name,
        email,
        phone,
        city,
        zip,
        program_interest,
        status,
        advisor_email,
        created_at,
        application_checklist (
          created_icc_account,
          scheduled_workone_appointment,
          workone_appointment_date,
          workone_location,
          attended_workone_appointment,
          funding_verified,
          enrollment_started,
          enrollment_completed
        ),
        employer_sponsors (
          company_name,
          contact_name,
          wage_commitment
        ),
        enrollment_agreements (
          signed,
          signed_at
        )
      `
      )
      .order('created_at', { ascending: false });

    if (startDate) {
      query = query.gte('created_at', startDate);
    }
    if (endDate) {
      query = query.lte('created_at', endDate);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Export query error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format data for ETPL compliance
    const exportData = data.map((app: any) => ({
      student_id: app.id,
      first_name: app.first_name,
      last_name: app.last_name,
      email: app.email,
      phone: app.phone,
      city: app.city,
      zip: app.zip,
      program: app.program_interest,
      status: app.status,
      advisor: app.advisor_email,
      application_date: app.created_at,
      icc_account_created:
        app.application_checklist?.[0]?.created_icc_account || false,
      workone_scheduled:
        app.application_checklist?.[0]?.scheduled_workone_appointment || false,
      workone_date:
        app.application_checklist?.[0]?.workone_appointment_date || null,
      workone_location:
        app.application_checklist?.[0]?.workone_location || null,
      workone_attended:
        app.application_checklist?.[0]?.attended_workone_appointment || false,
      funding_verified:
        app.application_checklist?.[0]?.funding_verified || false,
      enrollment_started:
        app.application_checklist?.[0]?.enrollment_started || false,
      enrollment_completed:
        app.application_checklist?.[0]?.enrollment_completed || false,
      employer: app.employer_sponsors?.[0]?.company_name || null,
      employer_contact: app.employer_sponsors?.[0]?.contact_name || null,
      wage_commitment: app.employer_sponsors?.[0]?.wage_commitment || null,
      agreement_signed: app.enrollment_agreements?.[0]?.signed || false,
      agreement_date: app.enrollment_agreements?.[0]?.signed_at || null,
    }));

    if (format === 'csv') {
      // Convert to CSV
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join(','),
        ...exportData.map((row: any) =>
          headers.map((header) => JSON.stringify(row[header] || '')).join(',')
        ),
      ];
      const csv = csvRows.join('\n');

      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="etpl-export-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON by default
    return NextResponse.json({
      export_date: new Date().toISOString(),
      record_count: exportData.length,
      data: exportData,
    });
  } catch (err: any) {
    console.error('Export error:', err);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}
