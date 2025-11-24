// app/api/applications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Email sending function (configure with your SMTP provider)
async function sendEmail(to: string, subject: string, html: string) {
  // TODO: Implement email sending with your SMTP provider
  // Example providers: SendGrid, Mailgun, AWS SES, Resend
  
  console.log('Email would be sent to:', to);
  console.log('Subject:', subject);
  
  // For now, just log. Replace with actual email service
  return true;
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database not configured. Please contact support.' },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'phone',
      'program',
      'fundingType',
    ];
    
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }
    
    // Check if application already exists for this email
    const { data: existingApp } = await supabase
      .from('applications')
      .select('id')
      .eq('email', body.email)
      .eq('status', 'pending')
      .single();
    
    if (existingApp) {
      return NextResponse.json(
        { error: 'An application with this email already exists and is pending review' },
        { status: 409 }
      );
    }
    
    // Create application record
    const { data: application, error: dbError } = await supabase
      .from('applications')
      .insert({
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        phone: body.phone,
        date_of_birth: body.dateOfBirth,
        address: body.address,
        city: body.city,
        state: body.state,
        zip_code: body.zipCode,
        program_id: body.program, // This should be mapped to actual program UUID
        start_date_preference: body.startDate,
        schedule_preference: body.schedule,
        funding_type: body.fundingType,
        employment_status: body.employmentStatus,
        household_income: body.householdIncome,
        has_high_school_diploma: body.hasHighSchoolDiploma === 'yes',
        has_transportation: body.hasTransportation === 'yes',
        needs_childcare: body.needsChildcare === 'yes',
        has_computer_access: body.hasComputerAccess === 'yes',
        additional_info: body.additionalInfo,
        status: 'pending',
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      );
    }
    
    // Send confirmation email to applicant
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Application Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${body.firstName} ${body.lastName},</p>
              
              <p>Thank you for applying to Elevate for Humanity! We've received your application for the <strong>${body.program}</strong> program.</p>
              
              <p><strong>What happens next?</strong></p>
              <ul>
                <li>Our team will review your application within 2-3 business days</li>
                <li>We'll verify your funding eligibility</li>
                <li>You'll receive an email with next steps</li>
                <li>If approved, we'll help you complete the enrollment process</li>
              </ul>
              
              <p><strong>Application Details:</strong></p>
              <ul>
                <li>Program: ${body.program}</li>
                <li>Preferred Start: ${body.startDate}</li>
                <li>Schedule: ${body.schedule}</li>
                <li>Funding: ${body.fundingType}</li>
              </ul>
              
              <p>If you have any questions, please don't hesitate to contact us:</p>
              <ul>
                <li>Email: info@elevateforhumanity.org</li>
                <li>Phone: (317) 555-1234</li>
              </ul>
              
              <p>We're excited to help you start your new career!</p>
              
              <p>Best regards,<br>
              <strong>Elevate for Humanity Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
              <p>Marion County, Indiana</p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    await sendEmail(
      body.email,
      'Application Received - Elevate for Humanity',
      confirmationEmailHtml
    );
    
    // Send notification email to admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #1f2937; color: white; padding: 20px; }
            .content { background: #f9fafb; padding: 20px; }
            .field { margin: 10px 0; padding: 10px; background: white; border-left: 3px solid #10b981; }
            .label { font-weight: bold; color: #6b7280; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Application Received</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${body.firstName} ${body.lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div>${body.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div>${body.phone}</div>
              </div>
              <div class="field">
                <div class="label">Program:</div>
                <div>${body.program}</div>
              </div>
              <div class="field">
                <div class="label">Funding Type:</div>
                <div>${body.fundingType}</div>
              </div>
              <div class="field">
                <div class="label">Employment Status:</div>
                <div>${body.employmentStatus}</div>
              </div>
              <div class="field">
                <div class="label">Application ID:</div>
                <div>${application.id}</div>
              </div>
              <p style="margin-top: 20px;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/applications/${application.id}" 
                   style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Review Application
                </a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    await sendEmail(
      process.env.ADMIN_EMAIL || 'info@elevateforhumanity.org',
      `New Application: ${body.firstName} ${body.lastName}`,
      adminEmailHtml
    );
    
    return NextResponse.json({
      success: true,
      applicationId: application.id,
      message: 'Application submitted successfully',
    });
    
  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve application status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const id = searchParams.get('id');
    
    if (!email && !id) {
      return NextResponse.json(
        { error: 'Email or ID required' },
        { status: 400 }
      );
    }
    
    let query = supabase.from('applications').select('*');
    
    if (id) {
      query = query.eq('id', id);
    } else if (email) {
      query = query.eq('email', email);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to retrieve application' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ applications: data });
    
  } catch (error) {
    console.error('Application retrieval error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
