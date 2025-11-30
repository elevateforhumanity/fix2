// Public API - Applications Endpoint
// Handles student applications and tracks their journey through the system

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

// GET /api/lms/v1/applications - List all applications
export async function GET(request: NextRequest) {
  try {
    const tenant = await verifyApiKey(request);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid API key' } },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const status = searchParams.get('status');
    const programId = searchParams.get('programId');
    
    let query = supabase
      .from('applications')
      .select(`
        *,
        program:courses!program_id(*),
        applicant:tenant_users!applicant_id(*)
      `, { count: 'exact' })
      .eq('tenant_id', tenant.id)
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1);
    
    if (status) query = query.eq('status', status);
    if (programId) query = query.eq('program_id', programId);
    
    const { data: applications, error, count } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: applications,
      meta: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

// POST /api/lms/v1/applications - Submit new application
export async function POST(request: NextRequest) {
  try {
    const tenant = await verifyApiKey(request);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid API key' } },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.firstName || !body.lastName || !body.programId) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'VALIDATION_ERROR', 
            message: 'Email, firstName, lastName, and programId are required' 
          } 
        },
        { status: 400 }
      );
    }
    
    // Check if user exists, create if not
    let { data: user } = await supabase
      .from('tenant_users')
      .select('id')
      .eq('tenant_id', tenant.id)
      .eq('email', body.email)
      .single();
    
    if (!user) {
      const { data: newUser, error: userError } = await supabase
        .from('tenant_users')
        .insert({
          tenant_id: tenant.id,
          email: body.email,
          first_name: body.firstName,
          last_name: body.lastName,
          phone: body.phone,
          role: 'student',
          status: 'pending',
        })
        .select()
        .single();
      
      if (userError) throw userError;
      user = newUser;
    }
    
    // Create application
    const { data: application, error } = await supabase
      .from('applications')
      .insert({
        tenant_id: tenant.id,
        applicant_id: user.id,
        program_id: body.programId,
        status: 'submitted',
        application_data: {
          personalInfo: {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            dateOfBirth: body.dateOfBirth,
            address: body.address,
          },
          education: body.education || [],
          workExperience: body.workExperience || [],
          fundingSource: body.fundingSource,
          referralSource: body.referralSource,
          additionalInfo: body.additionalInfo,
        },
        submitted_at: new Date().toISOString(),
      })
      .select(`
        *,
        program:courses!program_id(*),
        applicant:tenant_users!applicant_id(*)
      `)
      .single();
    
    if (error) throw error;
    
    // Create activity log
    await supabase.from('activity_logs').insert({
      tenant_id: tenant.id,
      user_id: user.id,
      action: 'application.submitted',
      entity_type: 'application',
      entity_id: application.id,
      metadata: {
        programId: body.programId,
        source: 'api',
      },
    });
    
    // Trigger automation rules
    await triggerAutomation(tenant.id, 'application.submitted', application);
    
    // Send confirmation email
    await sendApplicationConfirmation(tenant, application);
    
    // Trigger webhook
    await triggerWebhook(tenant.id, 'application.submitted', application);
    
    return NextResponse.json({
      success: true,
      data: application,
      message: 'Application submitted successfully. You will receive a confirmation email shortly.',
      meta: { timestamp: new Date().toISOString() },
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

// Helper functions
async function triggerAutomation(tenantId: string, trigger: string, data: any) {
  const { data: rules } = await supabase
    .from('automation_rules')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('trigger_type', trigger)
    .eq('is_active', true)
    .order('priority', { ascending: false });
  
  if (!rules) return;
  
  for (const rule of rules) {
    try {
      for (const action of rule.actions) {
        await executeAction(tenantId, action, data);
      }
      
      await supabase
        .from('automation_rules')
        .update({
          executions_count: rule.executions_count + 1,
          last_executed_at: new Date().toISOString(),
        })
        .eq('id', rule.id);
    } catch (error) {
      console.error('Automation execution failed:', error);
    }
  }
}

async function executeAction(tenantId: string, action: any, data: any) {
  switch (action.type) {
    case 'send_email':
      await sendEmail(tenantId, action.config, data);
      break;
    case 'create_task':
      await createTask(tenantId, action.config, data);
      break;
    case 'notify_slack':
      await notifySlack(tenantId, action.config, data);
      break;
    case 'update_crm':
      await updateCRM(tenantId, action.config, data);
      break;
  }
}

async function sendApplicationConfirmation(tenant: any, application: any) {
  // Implementation depends on email service (SendGrid, AWS SES, etc.)
  console.log('Sending confirmation email to:', application.applicant.email);
}

async function sendEmail(tenantId: string, config: any, data: any) {
  // Email sending logic
}

async function createTask(tenantId: string, config: any, data: any) {
  // Task creation logic
}

async function notifySlack(tenantId: string, config: any, data: any) {
  const { data: tenant } = await supabase
    .from('tenants')
    .select('integrations')
    .eq('id', tenantId)
    .single();
  
  if (!tenant?.integrations?.slack?.enabled) return;
  
  const slackConfig = tenant.integrations.slack;
  
  await fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${slackConfig.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel: slackConfig.channelId,
      text: `New application submitted: ${data.applicant.first_name} ${data.applicant.last_name} for ${data.program.title}`,
    }),
  });
}

async function updateCRM(tenantId: string, config: any, data: any) {
  // CRM update logic (Salesforce, HubSpot, etc.)
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
