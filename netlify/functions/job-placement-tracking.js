/**
 * Netlify Function: Job Placement Tracking
 * 
 * Tracks student job placements and outcomes for reporting to WIOA/WRG.
 * 
 * Endpoint: POST /.netlify/functions/job-placement-tracking
 */

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // GET: Retrieve placement statistics
    if (event.httpMethod === 'GET') {
      const { data: placements, error } = await supabase
        .from('job_placements')
        .select(`
          *,
          students (
            first_name,
            last_name,
            email
          ),
          enrollments (
            program_name,
            funding_source
          )
        `)
        .order('placement_date', { ascending: false });

      if (error) throw error;

      // Calculate statistics
      const stats = {
        total_placements: placements.length,
        placements_last_30_days: placements.filter(
          (p) => new Date(p.placement_date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        ).length,
        average_salary: placements.reduce((sum, p) => sum + (p.starting_salary || 0), 0) / placements.length || 0,
        placement_rate: 0, // Calculate from enrollments vs placements
        by_program: {},
        by_funding_source: {},
      };

      // Group by program
      placements.forEach((p) => {
        const program = p.enrollments?.program_name || 'Unknown';
        if (!stats.by_program[program]) {
          stats.by_program[program] = { count: 0, total_salary: 0 };
        }
        stats.by_program[program].count++;
        stats.by_program[program].total_salary += p.starting_salary || 0;
      });

      // Group by funding source
      placements.forEach((p) => {
        const funding = p.enrollments?.funding_source || 'Unknown';
        if (!stats.by_funding_source[funding]) {
          stats.by_funding_source[funding] = { count: 0, total_salary: 0 };
        }
        stats.by_funding_source[funding].count++;
        stats.by_funding_source[funding].total_salary += p.starting_salary || 0;
      });

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          placements,
          stats,
        }),
      };
    }

    // POST: Record new job placement
    if (event.httpMethod === 'POST') {
      const placementData = JSON.parse(event.body);

      // Validate required fields
      if (!placementData.student_id || !placementData.employer_name || !placementData.job_title) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({
            error: 'Missing required fields: student_id, employer_name, job_title',
          }),
        };
      }

      // Get student's enrollment
      const { data: enrollment, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('id, program_id, program_name')
        .eq('student_id', placementData.student_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (enrollmentError) throw enrollmentError;

      // Create job placement record
      const { data: placement, error: placementError } = await supabase
        .from('job_placements')
        .insert({
          student_id: placementData.student_id,
          enrollment_id: enrollment.id,
          employer_name: placementData.employer_name,
          job_title: placementData.job_title,
          starting_salary: placementData.starting_salary,
          employment_type: placementData.employment_type || 'full-time',
          placement_date: placementData.placement_date || new Date().toISOString(),
          industry: placementData.industry,
          location: placementData.location,
          benefits: placementData.benefits || {},
          notes: placementData.notes,
          created_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (placementError) throw placementError;

      // Update enrollment status
      await supabase
        .from('enrollments')
        .update({
          status: 'placed',
          completion_date: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', enrollment.id);

      // Log activity
      await supabase.from('activity_log').insert({
        entity_type: 'job_placement',
        entity_id: placement.id,
        action: 'created',
        details: {
          student_id: placementData.student_id,
          employer: placementData.employer_name,
          job_title: placementData.job_title,
          salary: placementData.starting_salary,
        },
        created_at: new Date().toISOString(),
      });

      // Send notification (optional - integrate with email service)
      // await sendPlacementNotification(placementData);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          placement_id: placement.id,
          message: 'Job placement recorded successfully',
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  } catch (error) {
    console.error('Job placement tracking error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
