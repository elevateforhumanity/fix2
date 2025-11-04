/**
 * Milady RISE Enrollment API
 * Handles white-label enrollment through Elevate for Humanity
 * Registers students with our school code and tracks in Supabase
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const {
      firstName,
      lastName,
      email,
      phone,
      studentId,
      program,
      schoolCode,
      schoolName,
    } = data;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !program) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Verify school code
    if (schoolCode !== 'efhcti-rise295') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid school code' }),
      };
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store enrollment in our database
    const enrollmentData = {
      first_name: firstName,
      last_name: lastName,
      email: email.toLowerCase(),
      phone,
      student_id: studentId || null,
      program,
      school_code: schoolCode,
      school_name: schoolName,
      enrollment_date: new Date().toISOString(),
      status: 'pending',
      milady_access_sent: false,
      certification_completed: false,
      scholarship_eligible: false,
    };

    const { data: enrollment, error: dbError } = await supabase
      .from('milady_rise_enrollments')
      .insert([enrollmentData])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to save enrollment' }),
      };
    }

    // Send confirmation email to student
    await sendConfirmationEmail({
      to: email,
      firstName,
      lastName,
      enrollmentId: enrollment.id,
    });

    // Notify admin/coordinator
    await notifyCoordinator({
      enrollment: enrollmentData,
      enrollmentId: enrollment.id,
    });

    // Log for Jessica Boyd / Milady tracking
    console.log('Milady RISE Enrollment:', {
      enrollmentId: enrollment.id,
      schoolCode,
      email,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        enrollmentId: enrollment.id,
        message: 'Enrollment successful. Check your email for next steps.',
      }),
    };
  } catch (error) {
    console.error('Enrollment error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};

/**
 * Send confirmation email to student
 */
async function sendConfirmationEmail({
  to,
  firstName,
  lastName,
  enrollmentId,
}) {
  // TODO: Integrate with email service (SendGrid, etc.)
  // For now, log the email that would be sent
  console.log('Confirmation email:', {
    to,
    subject: 'Milady RISE Enrollment Confirmation - Elevate for Humanity',
    body: `
Dear ${firstName} ${lastName},

Thank you for enrolling in the Milady RISE Certification in Client Well-Being & Safety through Elevate for Humanity Career & Technical Institute!

Your enrollment has been confirmed (ID: ${enrollmentId}).

WHAT HAPPENS NEXT:

1. Within 24 hours, you'll receive login credentials for the Milady Training platform
2. You'll have 60 days to complete all three courses:
   - Infection Control (2 hours)
   - Domestic Violence Awareness (1 hour)
   - Human Trafficking Awareness (30 minutes)
3. Upon completion, you'll receive your certification
4. You'll be eligible to apply for the $500 RISE Scholarship

IMPORTANT INFORMATION:
- School Code: efhcti-rise295 (already applied)
- Access Duration: 60 days
- Certification Validity: 2 years
- Cost: FREE (normally $29.95)

Questions? Contact us at support@elevateforhumanity.org or call (317) 555-0123.

Best regards,
Elevate for Humanity Team

---
Partnership managed by Jessica Boyd, Milady
jessica.boyd@cengage.com | (919) 623-4623
    `,
  });
}

/**
 * Notify program coordinator of new enrollment
 */
async function notifyCoordinator({ enrollment, enrollmentId }) {
  console.log('Coordinator notification:', {
    enrollmentId,
    student: `${enrollment.first_name} ${enrollment.last_name}`,
    email: enrollment.email,
    program: enrollment.program,
    timestamp: new Date().toISOString(),
  });

  // TODO: Send email to coordinator
  // TODO: Update dashboard metrics
  // TODO: Notify Jessica Boyd if needed (weekly batch report)
}
