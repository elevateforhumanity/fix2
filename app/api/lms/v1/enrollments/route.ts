// Public API - Enrollments Endpoint
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

// GET /api/lms/v1/enrollments
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
    const studentId = searchParams.get('studentId');
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');
    
    let query = supabase
      .from('enrollments')
      .select(`
        *,
        student:tenant_users!student_id(*),
        course:courses(*)
      `, { count: 'exact' })
      .eq('tenant_id', tenant.id)
      .range((page - 1) * limit, page * limit - 1);
    
    if (studentId) query = query.eq('student_id', studentId);
    if (courseId) query = query.eq('course_id', courseId);
    if (status) query = query.eq('status', status);
    
    const { data: enrollments, error, count } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: enrollments,
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

// POST /api/lms/v1/enrollments - Enroll student
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
    
    if (!body.studentId || !body.courseId) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'studentId and courseId are required' } },
        { status: 400 }
      );
    }
    
    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('tenant_id', tenant.id)
      .eq('student_id', body.studentId)
      .eq('course_id', body.courseId)
      .single();
    
    if (existing) {
      return NextResponse.json(
        { success: false, error: { code: 'ALREADY_ENROLLED', message: 'Student already enrolled in this course' } },
        { status: 409 }
      );
    }
    
    // Get course lessons count
    const { count: lessonsCount } = await supabase
      .from('course_lessons')
      .select('*', { count: 'exact', head: true })
      .eq('course_id', body.courseId);
    
    // Create enrollment
    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        tenant_id: tenant.id,
        student_id: body.studentId,
        course_id: body.courseId,
        enrollment_type: body.enrollmentType || 'api',
        total_lessons: lessonsCount || 0,
        status: 'active',
      })
      .select(`
        *,
        student:tenant_users!student_id(*),
        course:courses(*)
      `)
      .single();
    
    if (error) throw error;
    
    // Trigger webhook
    await triggerWebhook(tenant.id, 'enrollment.created', enrollment);
    
    return NextResponse.json({
      success: true,
      data: enrollment,
      meta: { timestamp: new Date().toISOString() },
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
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
