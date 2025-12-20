import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    // Check environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY;
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const urlPrefix = process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30);

    // Try to create admin client
    let clientCreated = false;
    let clientError = null;
    try {
      const supabase = createAdminClient();
      clientCreated = true;

      // Try a simple query
      const { data, error } = await supabase
        .from('applications')
        .select('count')
        .limit(1);

      return NextResponse.json({
        status: 'success',
        environment: {
          hasUrl,
          hasServiceKey,
          hasAnonKey,
          urlPrefix,
        },
        client: {
          created: clientCreated,
        },
        database: {
          querySuccess: !error,
          error: error
            ? {
                code: error.code,
                message: error.message,
                details: error.details,
                hint: error.hint,
              }
            : null,
        },
      });
    } catch (err: any) {
      clientError = err.message;
      return NextResponse.json({
        status: 'error',
        environment: {
          hasUrl,
          hasServiceKey,
          hasAnonKey,
          urlPrefix,
        },
        client: {
          created: false,
          error: clientError,
        },
      });
    }
  } catch (err: any) {
    return NextResponse.json({
      status: 'error',
      message: err.message,
    });
  }
}
