// Public API - Approve Application
// Approves application and automatically enrolls student

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyApiKey(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const apiKey = authHeader.substring(7);
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('api_key', apiKey)
    .eq('status', 'active')
    .single();
  return tenant;
}

// POST /api/lms/v1/applications/:id/approve
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const tenant = await verifyApiKey(request);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid API key' } },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Get application
    const { data: application, error: appError } = await supabase
      .from('applications')
      .select('*, applicant:tenant_users!applicant_id(*), program:courses!program_id(*)')
      .eq('id', params.id)
      .eq('tenant_id', tenant.id)
      .single();
    
    if (appError) throw appError;
    if (!application) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }
    
    // Update application status
    await supabase
      .from('applications')
      .update({
        status: 'approved',
        reviewed_by: body.reviewerId,
        reviewed_at: new Date().toISOString(),
        approval_notes: body.notes,
      })
      .eq('id', params.id);
    
    // Activate user account
    await supabase
      .from('tenant_users')
      .update({ status: 'active' })
      .eq('id', application.applicant_id);
    
    // Get course lessons count
    const { count: lessonsCount } = await supabase
      .from('course_lessons')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', application.program_id);
    
    // Create enrollment
    const { data: enrollment, error: enrollError } = await supabase
      .from('enrollments')
      .insert({
        tenant_id: tenant.id,
        student_id: application.applicant_id,
        course_id: application.program_id,
        enrollment_type: 'application',
        total_lessons: lessonsCount || 0,
        status: 'active',
      })
      .select()
      .single();
    
    if (enrollError) throw enrollError;
    
    // Log activity
    await supabase.from('activity_logs').insert({
      tenant_id: tenant.id,
      user_id: application.applicant_id,
      action: 'application.approved',
      entity_type: 'application',
      entity_id: application.id,
      metadata: {
        enrollmentId: enrollment.id,
        reviewerId: body.reviewerId,
      },
    });
    
    // Send approval email
    await sendApprovalEmail(tenant, application, enrollment);
    
    // Trigger webhook
    await triggerWebhook(tenant.id, 'application.approved', {
      application,
      enrollment,
    });
    
    // Sync to integrations
    await syncToIntegrations(tenant, application, enrollment);
    
    return NextResponse.json({
      success: true,
      data: {
        application: { ...application, status: 'approved' },
        enrollment,
      },
      message: 'Application approved and student enrolled successfully',
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

async function sendApprovalEmail(tenant: any, application: any, enrollment: any) {
  // Send approval email with enrollment details
  console.log('Sending approval email to:', application.applicant.email);
}

async function triggerWebhook(tenantId: string, event: string, data: any) {
  const { data: webhooks } = await supabase
    .from('webhooks')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('event', event)
    .eq('is_active', true);
  
  if (!webhooks) return;
  
  for (const webhook of webhooks) {
    try {
      await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': webhook.secret,
        },
        body: JSON.stringify({
          event,
          data,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Webhook delivery failed:', error);
    }
  }
}

async function syncToIntegrations(tenant: any, application: any, enrollment: any) {
  const integrations = tenant.integrations || {};
  
  // Salesforce
  if (integrations.salesforce?.enabled) {
    await syncToSalesforce(integrations.salesforce, application, enrollment);
  }
  
  // HubSpot
  if (integrations.hubspot?.enabled) {
    await syncToHubSpot(integrations.hubspot, application, enrollment);
  }
  
  // Slack notification
  if (integrations.slack?.enabled && integrations.slack.notifyEnrollments) {
    await notifySlack(integrations.slack, application, enrollment);
  }
}

async function syncToSalesforce(config: any, application: any, enrollment: any) {
  // Create/update Contact and Opportunity in Salesforce
  try {
    await fetch(`${config.instanceUrl}/services/data/v57.0/sobjects/Contact`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: application.applicant.first_name,
        LastName: application.applicant.last_name,
        Email: application.applicant.email,
        LMS_Student_ID__c: application.applicant_id,
        LMS_Enrollment_ID__c: enrollment.id,
      }),
    });
  } catch (error) {
    console.error('Salesforce sync failed:', error);
  }
}

async function syncToHubSpot(config: any, application: any, enrollment: any) {
  // Create/update Contact in HubSpot
  try {
    await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: {
          firstname: application.applicant.first_name,
          lastname: application.applicant.last_name,
          email: application.applicant.email,
          lms_student_id: application.applicant_id,
          lms_enrollment_id: enrollment.id,
        },
      }),
    });
  } catch (error) {
    console.error('HubSpot sync failed:', error);
  }
}

async function notifySlack(config: any, application: any, enrollment: any) {
  try {
    await fetch('https://slack.com/api/chat.postMessage', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        channel: config.channelId,
        text: `✅ Application approved: ${application.applicant.first_name} ${application.applicant.last_name} enrolled in ${application.program.title}`,
      }),
    });
  } catch (error) {
    console.error('Slack notification failed:', error);
  }
}
