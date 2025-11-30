// Public API - Single Application Endpoint
// Track application status and manage approval workflow

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

// GET /api/lms/v1/applications/:id - Get application details
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
    
    const { data: application, error } = await supabase
      .from('applications')
      .select(`
        *,
        program:courses!program_id(*),
        applicant:tenant_users!applicant_id(*),
        reviewer:tenant_users!reviewed_by(*)
      `)
      .eq('id', params.id)
      .eq('tenant_id', tenant.id)
      .single();
    
    if (error) throw error;
    if (!application) {
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Application not found' } },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: application,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}

// PATCH /api/lms/v1/applications/:id - Update application
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
    
    const { data: application, error } = await supabase
      .from('applications')
      .update({
        status: body.status,
        application_data: body.applicationData,
        notes: body.notes,
      })
      .eq('id', params.id)
      .eq('tenant_id', tenant.id)
      .select()
      .single();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      data: application,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
