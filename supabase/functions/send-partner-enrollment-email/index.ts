import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface EmailRequest {
  enrollmentId: string;
  type: 'payment_confirmation' | 'course_access' | 'completion_reminder';
}

serve(async (req) => {
  try {
    const { enrollmentId, type }: EmailRequest = await req.json();

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch enrollment details
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('partner_lms_enrollments')
      .select(`
        *,
        partner_lms_providers (
          provider_name,
          provider_type
        ),
        partner_courses (
          course_name,
          description,
          course_url,
          duration_hours
        ),
        profiles (
          email,
          full_name
        )
      `)
      .eq('id', enrollmentId)
      .single();

    if (enrollmentError || !enrollment) {
      throw new Error('Enrollment not found');
    }

    const studentEmail = enrollment.profiles?.email || '';
    const studentName = enrollment.profiles?.full_name || 'Student';
    const courseName = enrollment.partner_courses?.course_name || enrollment.course_name;
    const providerName = enrollment.partner_lms_providers.provider_name;
    const courseUrl = enrollment.partner_courses?.course_url || '';

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'payment_confirmation':
        subject = `Payment Confirmed - ${courseName}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2563eb; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>✅ Payment Confirmed!</h1>
              </div>
              <div class="content">
                <p>Hi ${studentName},</p>
                <p>Thank you for your payment! You're now enrolled in <strong>${courseName}</strong>.</p>
                
                <div class="info-box">
                  <h3>📚 Course Details</h3>
                  <p><strong>Course:</strong> ${courseName}</p>
                  <p><strong>Provider:</strong> ${providerName}</p>
                  <p><strong>Amount Paid:</strong> $${enrollment.payment_amount?.toFixed(2)}</p>
                </div>

                <h3>🎯 What's Next?</h3>
                <ol>
                  <li><strong>Check Your Email</strong> - You'll receive course access details within 24 hours</li>
                  <li><strong>Access Your Course</strong> - Log in to ${providerName}'s platform</li>
                  <li><strong>Complete Training</strong> - Work through materials at your own pace</li>
                  <li><strong>Earn Certificate</strong> - Pass the assessment and get certified</li>
                </ol>

                <p>Need help? Reply to this email or contact us at support@elevateforhumanity.org</p>
                
                <p>Best regards,<br>Elevate for Humanity Career Training Institute</p>
              </div>
              <div class="footer">
                <p>© 2024 Elevate for Humanity. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'course_access':
        subject = `Course Access Ready - ${courseName}`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 Your Course is Ready!</h1>
              </div>
              <div class="content">
                <p>Hi ${studentName},</p>
                <p>Great news! Your enrollment for <strong>${courseName}</strong> is complete and ready to access.</p>
                
                ${courseUrl ? `
                <div style="text-align: center;">
                  <a href="${courseUrl}" class="button">Start Your Training →</a>
                </div>
                ` : ''}

                <div class="info-box">
                  <h3>📖 Course Information</h3>
                  <p><strong>Course:</strong> ${courseName}</p>
                  <p><strong>Provider:</strong> ${providerName}</p>
                  ${enrollment.partner_courses?.duration_hours ? `<p><strong>Duration:</strong> ${enrollment.partner_courses.duration_hours} hours</p>` : ''}
                </div>

                <h3>💡 Tips for Success</h3>
                <ul>
                  <li>Set aside dedicated study time each day</li>
                  <li>Take notes as you progress through the material</li>
                  <li>Complete practice exercises and quizzes</li>
                  <li>Don't hesitate to reach out if you need help</li>
                </ul>

                <p>Questions? We're here to help at support@elevateforhumanity.org</p>
                
                <p>Best regards,<br>Elevate for Humanity Career Training Institute</p>
              </div>
              <div class="footer">
                <p>© 2024 Elevate for Humanity. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;

      case 'completion_reminder':
        subject = `Complete Your ${courseName} Training`;
        htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
              .button { display: inline-block; padding: 12px 30px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
              .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>⏰ Don't Forget Your Training!</h1>
              </div>
              <div class="content">
                <p>Hi ${studentName},</p>
                <p>This is a friendly reminder to complete your <strong>${courseName}</strong> course.</p>
                
                ${courseUrl ? `
                <div style="text-align: center;">
                  <a href="${courseUrl}" class="button">Continue Training →</a>
                </div>
                ` : ''}

                <p>Your certification is waiting! Complete the course to:</p>
                <ul>
                  <li>✅ Earn your industry-recognized certificate</li>
                  <li>✅ Boost your resume and career prospects</li>
                  <li>✅ Gain valuable skills and knowledge</li>
                </ul>

                <p>Need help or have questions? We're here for you at support@elevateforhumanity.org</p>
                
                <p>Best regards,<br>Elevate for Humanity Career Training Institute</p>
              </div>
              <div class="footer">
                <p>© 2024 Elevate for Humanity. All rights reserved.</p>
              </div>
            </div>
          </body>
          </html>
        `;
        break;
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Elevate for Humanity <noreply@elevateforhumanity.org>',
        to: [studentEmail],
        subject,
        html: htmlContent,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailData = await emailResponse.json();

    // Log email in queue
    await supabase.from('email_queue').insert({
      recipient_email: studentEmail,
      subject,
      body: htmlContent,
      status: 'sent',
      sent_at: new Date().toISOString(),
      metadata: {
        enrollment_id: enrollmentId,
        type,
        resend_id: emailData.id,
      },
    });

    return new Response(
      JSON.stringify({ success: true, emailId: emailData.id }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
