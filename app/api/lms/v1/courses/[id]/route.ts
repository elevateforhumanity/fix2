// Public API - Single Course Endpoint
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

// GET /api/lms/v1/courses/:id
export async function GET(
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
    
    const { data: course, error } = await supabase
      .from('courses')
      .select(`
        *,
        instructor:tenant_users!instructor_id(*),
        sections:course_sections(
          *,
          lessons:course_lessons(*)
        ),
        enrollments_count:enrollments(count)
      `)
      .eq('id', params.id)
      .eq('tenant_id', tenant.id)
      .single();
    
    if (error) throw error;
    if (!course) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Course not found' } },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: course,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

// PATCH /api/lms/v1/courses/:id
export async function PATCH(
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
    
    const { data: course, error } = await supabase
      .from('courses')
      .update(body)
      .eq('id', params.id)
      .eq('tenant_id', tenant.id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: course,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

// DELETE /api/lms/v1/courses/:id
export async function DELETE(
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
    
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', params.id)
      .eq('tenant_id', tenant.id);
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: { deleted: true },
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
