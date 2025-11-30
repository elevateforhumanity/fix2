// Public API - Courses Endpoint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Verify API key
async function verifyApiKey(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }
  
  const apiKey = authHeader.substring(7);
  
  // Verify API key and get tenant
  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('api_key', apiKey)
    .eq('status', 'active')
    .single();
  
  return tenant;
}

// GET /api/lms/v1/courses - List all courses
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
    const status = searchParams.get('status') || 'published';
    const category = searchParams.get('category');
    
    let query = supabase
      .from('courses')
      .select('*, instructor:tenant_users!instructor_id(*)', { count: 'exact' })
      .eq('tenant_id', tenant.id)
      .eq('status', status)
      .range((page - 1) * limit, page * limit - 1);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data: courses, error, count } = await query;
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: courses,
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

// POST /api/lms/v1/courses - Create new course
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
    if (!body.title || !body.slug) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Title and slug are required' } },
        { status: 400 }
      );
    }
    
    // Create course
    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        tenant_id: tenant.id,
        title: body.title,
        slug: body.slug,
        description: body.description,
        short_description: body.shortDescription,
        category: body.category,
        level: body.level,
        price: body.price || 0,
        is_free: body.isFree !== false,
        instructor_id: body.instructorId,
        status: body.status || 'draft',
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: course,
      meta: { timestamp: new Date().toISOString() },
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
