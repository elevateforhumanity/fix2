// Public API - Analytics Endpoint
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

// GET /api/lms/v1/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    const tenant = await verifyApiKey(request);
    if (!tenant) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Invalid API key' } },
        { status: 401 }
      );
    }
    
    // Check if tenant has analytics feature
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
    
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    const dateRange = startDate && endDate ? {
      start: new Date(startDate),
      end: new Date(endDate),
    } : undefined;
    
    const analytics = createAnalyticsEngine(tenant.id);
    const metrics = await analytics.getPlatformMetrics(dateRange);
    
    return NextResponse.json({
      success: true,
      data: metrics,
      meta: { 
        timestamp: new Date().toISOString(),
        dateRange: dateRange ? {
          start: dateRange.start.toISOString(),
          end: dateRange.end.toISOString(),
        } : null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: error.message } },
      { status: 500 }
    );
  }
}
