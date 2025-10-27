/**
 * Netlify Function: Enrollment Sync
 * 
 * Syncs student enrollment data from external systems (Google Forms, Zapier, etc.)
 * to Supabase database in real-time.
 * 
 * Endpoint: POST /.netlify/functions/enrollment-sync
 */

const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );

    // Parse request body
    const enrollmentData = JSON.parse(event.body);

    // Validate required fields
    if (!enrollmentData.first_name || !enrollmentData.last_name || !enrollmentData.email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: first_name, last_name, email',
        }),
      };
    }

    // Check if student exists
    const { data: existingStudent, error: studentError } = await supabase
      .from('students')
      .select('id')
      .eq('email', enrollmentData.email)
      .single();

    let studentId;

    if (existingStudent) {
      // Update existing student
      studentId = existingStudent.id;

      const { error: updateError } = await supabase
        .from('students')
        .update({
          first_name: enrollmentData.first_name,
          last_name: enrollmentData.last_name,
          phone: enrollmentData.phone,
          updated_at: new Date().toISOString(),
        })
        .eq('id', studentId);

      if (updateError) throw updateError;
    } else {
      // Create new student
      const { data: newStudent, error: createError } = await supabase
        .from('students')
        .insert({
          first_name: enrollmentData.first_name,
          last_name: enrollmentData.last_name,
          email: enrollmentData.email,
          phone: enrollmentData.phone,
          created_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (createError) throw createError;
      studentId = newStudent.id;
    }

    // Create enrollment record
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        student_id: studentId,
        program_id: enrollmentData.program_id,
        program_name: enrollmentData.program_name,
        enrollment_date: enrollmentData.enrollment_date || new Date().toISOString(),
        funding_source: enrollmentData.funding_source || 'self-pay',
        status: enrollmentData.status || 'pending',
        metadata: enrollmentData.metadata || {},
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (enrollmentError) throw enrollmentError;

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'enrollment',
      entity_id: enrollment.id,
      action: 'created',
      details: {
        student_id: studentId,
        program_id: enrollmentData.program_id,
        source: 'enrollment-sync',
      },
      created_at: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        student_id: studentId,
        enrollment_id: enrollment.id,
        message: 'Enrollment synced successfully',
      }),
    };
  } catch (error) {
    console.error('Enrollment sync error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Internal server error',
      }),
    };
  }
};
