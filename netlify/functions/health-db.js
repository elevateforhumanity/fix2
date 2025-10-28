/**
 * Database Health Check Endpoint
 *
 * Returns 200 if database is healthy, 500 if not
 * Use for uptime monitoring (Pingdom, UptimeRobot, etc.)
 *
 * Endpoint: /.netlify/functions/health-db
 */

import { createClient } from '@supabase/supabase-js';

export const handler = async (event, context) => {
  const startTime = Date.now();

  try {
    // Check environment variables
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Missing Supabase configuration',
          timestamp: new Date().toISOString(),
        }),
      };
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test 1: Check connection with simple query
    const { data: connectionTest, error: connectionError } = await supabase
      .from('programs')
      .select('count')
      .limit(1)
      .single();

    if (connectionError && connectionError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is OK for health check
      throw new Error(`Connection test failed: ${connectionError.message}`);
    }

    // Test 2: Verify critical tables exist
    const criticalTables = [
      'programs',
      'courses',
      'lessons',
      'enrollments',
      'lesson_progress',
      'certificates',
    ];

    const tableChecks = await Promise.all(
      criticalTables.map(async (table) => {
        const { error } = await supabase.from(table).select('count').limit(1);

        return {
          table,
          ok: !error || error.code === 'PGRST116',
          error: error ? error.message : null,
        };
      })
    );

    const failedTables = tableChecks.filter((check) => !check.ok);

    if (failedTables.length > 0) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        },
        body: JSON.stringify({
          ok: false,
          error: 'Some tables are not accessible',
          failedTables: failedTables.map((t) => ({
            table: t.table,
            error: t.error,
          })),
          timestamp: new Date().toISOString(),
          responseTime: Date.now() - startTime,
        }),
      };
    }

    // Test 3: Check RLS is working (try to query as anonymous)
    const anonSupabase = createClient(
      supabaseUrl,
      process.env.VITE_SUPABASE_ANON_KEY
    );
    const { data: rlsTest, error: rlsError } = await anonSupabase
      .from('programs')
      .select('id')
      .limit(1);

    // Should succeed (programs are public read)
    const rlsWorking = !rlsError;

    const responseTime = Date.now() - startTime;

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify({
        ok: true,
        status: 'healthy',
        checks: {
          connection: true,
          tables: tableChecks.map((t) => t.table),
          rls: rlsWorking,
        },
        responseTime,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    const responseTime = Date.now() - startTime;

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify({
        ok: false,
        error: error.message,
        responseTime,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
