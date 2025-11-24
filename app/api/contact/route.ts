// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

// Email sending function
async function sendEmail(to: string, subject: string, html: string) {
  // TODO: Implement email sending with your SMTP provider
  console.log('Email would be sent to:', to);
  console.log('Subject:', subject);
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
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
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
    
    // Validate message length
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters' },
        { status: 400 }
      );
    }
    
    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message must be less than 5000 characters' },
        { status: 400 }
      );
    }
    
    // Store contact message in database (optional)
    const { data: contact, error: dbError } = await supabase
      .from('contact_messages')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        status: 'new',
        created_at: new Date().toISOString(),
      })
      .select()
      .single();
    
    if (dbError) {
      console.error('Database error:', dbError);
      // Continue even if database insert fails - still send email
    }
    
    // Send confirmation email to sender
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Message Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${body.name},</p>
              
              <p>Thank you for contacting Elevate for Humanity! We've received your message and will respond within 1-2 business days.</p>
              
              <p><strong>Your Message:</strong></p>
              <div style="background: white; padding: 15px; border-left: 3px solid #10b981; margin: 20px 0;">
                <p><strong>Subject:</strong> ${body.subject}</p>
                <p><strong>Message:</strong><br>${body.message.replace(/\n/g, '<br>')}</p>
              </div>
              
              <p>If you need immediate assistance, please call us at <strong>(317) 555-1234</strong>.</p>
              
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
      'Message Received - Elevate for Humanity',
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
            .message-box { background: white; padding: 15px; border: 1px solid #e5e7eb; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div>${body.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div><a href="mailto:${body.email}">${body.email}</a></div>
              </div>
              ${body.phone ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div><a href="tel:${body.phone}">${body.phone}</a></div>
              </div>
              ` : ''}
              <div class="field">
                <div class="label">Subject:</div>
                <div>${body.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${body.message.replace(/\n/g, '<br>')}</div>
              </div>
              ${contact ? `
              <div class="field">
                <div class="label">Message ID:</div>
                <div>${contact.id}</div>
              </div>
              ` : ''}
              <p style="margin-top: 20px;">
                <a href="mailto:${body.email}?subject=Re: ${encodeURIComponent(body.subject)}" 
                   style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                  Reply to ${body.name}
                </a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;
    
    await sendEmail(
      process.env.ADMIN_EMAIL || 'info@elevateforhumanity.org',
      `Contact Form: ${body.subject} - ${body.name}`,
      adminEmailHtml
    );
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully',
      messageId: contact?.id,
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
