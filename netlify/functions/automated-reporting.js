/**
 * Netlify Function: Automated Reporting
 * 
 * Generates automated reports for WIOA/WRG compliance, stakeholders, and internal use.
 * Can be triggered manually or via scheduled function.
 * 
 * Endpoint: POST /.netlify/functions/automated-reporting
 */

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    const { report_type, start_date, end_date } = JSON.parse(event.body || '{}');

    const startDate = start_date || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = end_date || new Date().toISOString();

    let report = {};

    switch (report_type) {
      case 'monthly':
        report = await generateMonthlyReport(supabase, startDate, endDate);
        break;
      case 'wioa':
        report = await generateWIOAReport(supabase, startDate, endDate);
        break;
      case 'placement':
        report = await generatePlacementReport(supabase, startDate, endDate);
        break;
      case 'financial':
        report = await generateFinancialReport(supabase, startDate, endDate);
        break;
      default:
        report = await generateMonthlyReport(supabase, startDate, endDate);
    }

    // Save report to database
    const { data: savedReport, error: saveError } = await supabase
      .from('reports')
      .insert({
        report_type: report_type || 'monthly',
        start_date: startDate,
        end_date: endDate,
        data: report,
        generated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) throw saveError;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        report_id: savedReport.id,
        report,
      }),
    };
  } catch (error) {
    console.error('Automated reporting error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};

/**
 * Generate monthly summary report
 */
async function generateMonthlyReport(supabase, startDate, endDate) {
  // Enrollments
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  // Completions
  const { data: completions } = await supabase
    .from('enrollments')
    .select('*')
    .eq('status', 'completed')
    .gte('completion_date', startDate)
    .lte('completion_date', endDate);

  // Job placements
  const { data: placements } = await supabase
    .from('job_placements')
    .select('*')
    .gte('placement_date', startDate)
    .lte('placement_date', endDate);

  // Calculate metrics
  const avgSalary = placements.reduce((sum, p) => sum + (p.starting_salary || 0), 0) / placements.length || 0;

  return {
    period: { start: startDate, end: endDate },
    enrollments: {
      total: enrollments.length,
      by_program: groupBy(enrollments, 'program_name'),
      by_funding: groupBy(enrollments, 'funding_source'),
    },
    completions: {
      total: completions.length,
      completion_rate: (completions.length / enrollments.length) * 100 || 0,
    },
    placements: {
      total: placements.length,
      placement_rate: (placements.length / completions.length) * 100 || 0,
      average_salary: Math.round(avgSalary),
      by_industry: groupBy(placements, 'industry'),
    },
  };
}

/**
 * Generate WIOA compliance report
 */
async function generateWIOAReport(supabase, startDate, endDate) {
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      students (*),
      job_placements (*)
    `)
    .eq('funding_source', 'WIOA')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  const placed = enrollments.filter((e) => e.job_placements && e.job_placements.length > 0);
  const retained = placed.filter((e) => {
    const placementDate = new Date(e.job_placements[0].placement_date);
    const sixMonthsAgo = new Date(Date.now() - 180 * 24 * 60 * 60 * 1000);
    return placementDate < sixMonthsAgo;
  });

  return {
    period: { start: startDate, end: endDate },
    wioa_metrics: {
      total_participants: enrollments.length,
      completions: enrollments.filter((e) => e.status === 'completed').length,
      placements: placed.length,
      placement_rate: (placed.length / enrollments.length) * 100 || 0,
      six_month_retention: retained.length,
      retention_rate: (retained.length / placed.length) * 100 || 0,
      average_wage: Math.round(
        placed.reduce((sum, e) => sum + (e.job_placements[0]?.starting_salary || 0), 0) / placed.length || 0
      ),
    },
    demographics: {
      // Add demographic breakdowns as needed
    },
  };
}

/**
 * Generate placement report
 */
async function generatePlacementReport(supabase, startDate, endDate) {
  const { data: placements } = await supabase
    .from('job_placements')
    .select(`
      *,
      students (*),
      enrollments (*)
    `)
    .gte('placement_date', startDate)
    .lte('placement_date', endDate);

  return {
    period: { start: startDate, end: endDate },
    summary: {
      total_placements: placements.length,
      average_salary: Math.round(
        placements.reduce((sum, p) => sum + (p.starting_salary || 0), 0) / placements.length || 0
      ),
      by_program: groupBy(placements, (p) => p.enrollments?.program_name),
      by_industry: groupBy(placements, 'industry'),
      by_employment_type: groupBy(placements, 'employment_type'),
    },
    placements: placements.map((p) => ({
      student_name: `${p.students?.first_name} ${p.students?.last_name}`,
      program: p.enrollments?.program_name,
      employer: p.employer_name,
      job_title: p.job_title,
      salary: p.starting_salary,
      placement_date: p.placement_date,
    })),
  };
}

/**
 * Generate financial report
 */
async function generateFinancialReport(supabase, startDate, endDate) {
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate);

  // Calculate revenue by funding source
  const revenueBySource = {};
  enrollments.forEach((e) => {
    const source = e.funding_source || 'unknown';
    if (!revenueBySource[source]) {
      revenueBySource[source] = { count: 0, estimated_revenue: 0 };
    }
    revenueBySource[source].count++;
    // Estimate revenue based on funding source (adjust these values)
    const revenuePerStudent = {
      WIOA: 3000,
      WRG: 2500,
      OJT: 2000,
      'self-pay': 1500,
    };
    revenueBySource[source].estimated_revenue += revenuePerStudent[source] || 0;
  });

  return {
    period: { start: startDate, end: endDate },
    revenue: {
      total_estimated: Object.values(revenueBySource).reduce((sum, s) => sum + s.estimated_revenue, 0),
      by_source: revenueBySource,
    },
    enrollments: {
      total: enrollments.length,
      by_program: groupBy(enrollments, 'program_name'),
    },
  };
}

/**
 * Helper: Group array by key
 */
function groupBy(array, key) {
  return array.reduce((result, item) => {
    const value = typeof key === 'function' ? key(item) : item[key];
    if (!result[value]) {
      result[value] = 0;
    }
    result[value]++;
    return result;
  }, {});
}
