import { supa } from './supa';

export interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface EmailNotification {
  to: string;
  subject: string;
  html: string;
  text: string;
  type:
    | 'welcome'
    | 'course_enrollment'
    | 'lesson_complete'
    | 'course_complete'
    | 'certificate_issued'
    | 'assignment_graded'
    | 'discussion_reply';
}

// Email templates
export const emailTemplates = {
  welcome: (userName: string): EmailTemplate => ({
    subject: 'Welcome to Elevate for Humanity!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to Elevate for Humanity</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Hello ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            We're thrilled to have you join our community of learners. Elevate for Humanity is committed to providing you with high-quality workforce training and career development opportunities.
          </p>
          <p style="color: #5D4037; line-height: 1.6;">
            Get started by exploring our courses and programs designed to help you achieve your career goals.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/lms/courses" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Browse Courses
            </a>
          </div>
          <p style="color: #5D4037; line-height: 1.6;">
            If you have any questions, our support team is here to help.
          </p>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
          <p>Indianapolis, IN • ETPL Provider • DOL Apprenticeship Sponsor</p>
        </div>
      </div>
    `,
    text: `Welcome to Elevate for Humanity!\n\nHello ${userName}!\n\nWe're thrilled to have you join our community of learners. Get started by exploring our courses at ${window.location.origin}/lms/courses\n\nIf you have any questions, our support team is here to help.`,
  }),

  courseEnrollment: (
    userName: string,
    courseName: string,
    courseUrl: string
  ): EmailTemplate => ({
    subject: `You're enrolled in ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Course Enrollment Confirmed</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Hello ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            You've successfully enrolled in <strong>${courseName}</strong>. We're excited to support you on this learning journey!
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${courseUrl}" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Start Learning
            </a>
          </div>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `You're enrolled in ${courseName}!\n\nHello ${userName}!\n\nYou've successfully enrolled in ${courseName}. Start learning at ${courseUrl}`,
  }),

  courseComplete: (
    userName: string,
    courseName: string,
    certificateUrl: string
  ): EmailTemplate => ({
    subject: `Congratulations! You completed ${courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🎉 Course Completed!</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Congratulations ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            You've successfully completed <strong>${courseName}</strong>. This is a significant achievement in your professional development journey!
          </p>
          <p style="color: #5D4037; line-height: 1.6;">
            Your certificate is now available for download.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${certificateUrl}" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Certificate
            </a>
          </div>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Congratulations! You completed ${courseName}\n\nHello ${userName}!\n\nYou've successfully completed ${courseName}. View your certificate at ${certificateUrl}`,
  }),

  certificateIssued: (
    userName: string,
    courseName: string,
    certificateUrl: string,
    certificateNumber: string
  ): EmailTemplate => ({
    subject: `Your Certificate for ${courseName} is Ready`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">🏆 Certificate Issued</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Hello ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            Your certificate for <strong>${courseName}</strong> has been issued!
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #5D4037; margin: 0;"><strong>Certificate Number:</strong></p>
            <p style="color: #2D5016; font-family: monospace; font-size: 18px; margin: 10px 0;">${certificateNumber}</p>
          </div>
          <p style="color: #5D4037; line-height: 1.6;">
            You can download, print, and share your certificate. It's digitally verified and permanently stored.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${certificateUrl}" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Certificate
            </a>
          </div>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Your Certificate for ${courseName} is Ready\n\nHello ${userName}!\n\nCertificate Number: ${certificateNumber}\n\nView your certificate at ${certificateUrl}`,
  }),

  assignmentGraded: (
    userName: string,
    assignmentName: string,
    grade: string,
    feedback: string,
    courseUrl: string
  ): EmailTemplate => ({
    subject: `Your assignment "${assignmentName}" has been graded`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Assignment Graded</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Hello ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            Your assignment <strong>${assignmentName}</strong> has been graded.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #5D4037; margin: 0;"><strong>Grade:</strong></p>
            <p style="color: #2D5016; font-size: 24px; font-weight: bold; margin: 10px 0;">${grade}</p>
            ${feedback ? `<p style="color: #5D4037; margin-top: 15px;"><strong>Feedback:</strong></p><p style="color: #5D4037; line-height: 1.6;">${feedback}</p>` : ''}
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${courseUrl}" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Details
            </a>
          </div>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `Your assignment "${assignmentName}" has been graded\n\nHello ${userName}!\n\nGrade: ${grade}\n${feedback ? `Feedback: ${feedback}\n` : ''}\nView details at ${courseUrl}`,
  }),

  discussionReply: (
    userName: string,
    replierName: string,
    postTitle: string,
    replyContent: string,
    discussionUrl: string
  ): EmailTemplate => ({
    subject: `${replierName} replied to your discussion`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2D5016 0%, #4A7C2C 100%); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">New Discussion Reply</h1>
        </div>
        <div style="padding: 40px 20px; background: #F5F1E8;">
          <h2 style="color: #3E2723;">Hello ${userName}!</h2>
          <p style="color: #5D4037; line-height: 1.6;">
            <strong>${replierName}</strong> replied to your post: <strong>${postTitle}</strong>
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2D5016;">
            <p style="color: #5D4037; line-height: 1.6;">${replyContent}</p>
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${discussionUrl}" style="background: #2D5016; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
              View Discussion
            </a>
          </div>
        </div>
        <div style="background: #3E2723; padding: 20px; text-align: center; color: white; font-size: 12px;">
          <p>© ${new Date().getFullYear()} Elevate for Humanity. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `${replierName} replied to your discussion\n\nHello ${userName}!\n\n${replierName} replied to: ${postTitle}\n\n"${replyContent}"\n\nView discussion at ${discussionUrl}`,
  }),
};

// Send email notification
export async function sendEmail(
  notification: EmailNotification
): Promise<boolean> {
  try {
    // In production, this would integrate with an email service like SendGrid, AWS SES, or Supabase Edge Functions
    // For now, we'll log the email and store it in a notifications table

    const { error } = await supa.from('email_notifications').insert([
      {
        to: notification.to,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        type: notification.type,
        sent_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error storing email notification:', error);
      return false;
    }

    // Log for development
    console.log('Email notification queued:', {
      to: notification.to,
      subject: notification.subject,
      type: notification.type,
    });

    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

// Helper functions for common notifications
export async function sendWelcomeEmail(
  userEmail: string,
  userName: string
): Promise<boolean> {
  const template = emailTemplates.welcome(userName);
  return sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'welcome',
  });
}

export async function sendCourseEnrollmentEmail(
  userEmail: string,
  userName: string,
  courseName: string,
  courseId: string
): Promise<boolean> {
  const courseUrl = `${window.location.origin}/lms/courses/${courseId}`;
  const template = emailTemplates.courseEnrollment(
    userName,
    courseName,
    courseUrl
  );
  return sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'course_enrollment',
  });
}

export async function sendCourseCompleteEmail(
  userEmail: string,
  userName: string,
  courseName: string,
  certificateId: string
): Promise<boolean> {
  const certificateUrl = `${window.location.origin}/certificate/${certificateId}`;
  const template = emailTemplates.courseComplete(
    userName,
    courseName,
    certificateUrl
  );
  return sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'course_complete',
  });
}

export async function sendCertificateIssuedEmail(
  userEmail: string,
  userName: string,
  courseName: string,
  certificateId: string,
  certificateNumber: string
): Promise<boolean> {
  const certificateUrl = `${window.location.origin}/certificate/${certificateId}`;
  const template = emailTemplates.certificateIssued(
    userName,
    courseName,
    certificateUrl,
    certificateNumber
  );
  return sendEmail({
    to: userEmail,
    subject: template.subject,
    html: template.html,
    text: template.text,
    type: 'certificate_issued',
  });
}
