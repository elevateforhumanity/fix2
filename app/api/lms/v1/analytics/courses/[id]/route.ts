// Public API - Course Analytics Endpoint
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createAnalyticsEngine } from '@/lib/lms/analytics/analytics-engine';

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

// GET /api/lms/v1/analytics/courses/:id
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
    
    if (!tenant.features?.advancedAnalytics) {
      return NextResponse.json(
        { 
          success: false, 
          error: { 
            code: 'FEATURE_NOT_AVAILABLE', 
            message: 'Advanced analytics not available in your plan' 
          } 
        },
        { status: 403 }
      );
    }
    
    const analytics = createAnalyticsEngine(tenant.id);
    const courseAnalytics = await analytics.getCourseAnalytics(params.id);
    
    return NextResponse.json({
      success: true,
      data: courseAnalytics,
      meta: { timestamp: new Date().toISOString() },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
