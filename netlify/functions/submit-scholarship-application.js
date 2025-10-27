/**
 * Netlify Function: Submit Scholarship Application
 *
 * Handles scholarship application submissions with file uploads.
 * Stores data in Supabase and uploads files to Supabase Storage.
 *
 * Endpoint: POST /.netlify/functions/submit-scholarship-application
 */

const { createClient } = require('@supabase/supabase-js');
const multipart = require('parse-multipart-data');

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

    // Parse multipart form data
    const boundary = event.headers['content-type'].split('boundary=')[1];
    const parts = multipart.parse(Buffer.from(event.body, 'base64'), boundary);

    // Extract form fields
    const formData = {};
    const files = {};

    parts.forEach((part) => {
      if (part.filename) {
        // It's a file
        files[part.name] = {
          filename: part.filename,
          type: part.type,
          data: part.data,
        };
      } else {
        // It's a form field
        formData[part.name] = part.data.toString();
      }
    });

    // Upload files to Supabase Storage
    const uploadedFiles = {};

    for (const [fieldName, file] of Object.entries(files)) {
      const fileName = `${Date.now()}-${file.filename}`;
      const filePath = `scholarship-applications/${formData.email}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file.data, {
          contentType: file.type,
        });

      if (uploadError) {
        console.error(`Failed to upload ${fieldName}:`, uploadError);
      } else {
        uploadedFiles[fieldName] = filePath;
      }
    }

    // Create scholarship application record
    const { data: application, error: applicationError } = await supabase
      .from('scholarship_applications')
      .insert({
        // Personal Information
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,

        // Scholarship & Program
        scholarship_type: formData.scholarship_type,
        program_interest: formData.program_interest,

        // Eligibility
        household_income: formData.household_income,
        household_size: parseInt(formData.household_size),
        employment_status: formData.employment_status,
        education_level: formData.education_level,

        // Circumstances
        is_single_parent: formData.is_single_parent === 'true',
        is_formerly_incarcerated: formData.is_formerly_incarcerated === 'true',
        is_homeless: formData.is_homeless === 'true',
        is_veteran: formData.is_veteran === 'true',
        has_disability: formData.has_disability === 'true',

        // Essays
        why_scholarship: formData.why_scholarship,
        career_goals: formData.career_goals,
        financial_need: formData.financial_need,

        // Uploaded Files
        proof_of_income_url: uploadedFiles.proof_of_income,
        identification_url: uploadedFiles.identification,
        additional_docs_url: uploadedFiles.additional_docs,

        // Status
        status: 'pending',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (applicationError) throw applicationError;

    // Log activity
    await supabase.from('activity_log').insert({
      entity_type: 'scholarship_application',
      entity_id: application.id,
      action: 'submitted',
      details: {
        email: formData.email,
        scholarship_type: formData.scholarship_type,
        program: formData.program_interest,
      },
      created_at: new Date().toISOString(),
    });

    // TODO: Send confirmation email
    // await sendConfirmationEmail(formData.email, application);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        application_id: application.id,
        message: 'Scholarship application submitted successfully',
      }),
    };
  } catch (error) {
    console.error('Scholarship application error:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to submit scholarship application',
      }),
    };
  }
};
