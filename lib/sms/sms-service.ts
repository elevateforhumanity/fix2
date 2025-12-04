/**
 * SMS Service - Simple logging implementation
 * Can be extended with any SMS provider (Twilio, AWS SNS, etc.)
 */

export interface SMSOptions {
  to: string;
  message: string;
  from?: string;
}

export async function sendSMS(options: SMSOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Log SMS for now - can be extended with real SMS provider
    console.log('[SMS] Would send:', {
      to: options.to,
      from: options.from || 'Elevate For Humanity',
      message: options.message,
    });

    // In production, integrate with your preferred SMS provider:
    // - Twilio: https://www.twilio.com/docs/sms
    // - AWS SNS: https://aws.amazon.com/sns/
    // - MessageBird: https://www.messagebird.com/
    // - Vonage: https://www.vonage.com/communications-apis/sms/

    return { 
      success: true, 
      messageId: `sms_${Date.now()}` 
    };
  } catch (error: any) {
    console.error('[SMS] Error:', error);
    return { success: false, error: error.message };
  }
}

// SMS templates
export const smsTemplates = {
  enrollmentConfirmation: (name: string, programName: string) => 
    `Hi ${name}! You're enrolled in ${programName}. Access your courses at ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,

  classReminder: (name: string, className: string, time: string) =>
    `Hi ${name}! Reminder: ${className} starts at ${time}. See you there!`,

  assignmentDue: (name: string, assignmentName: string, hours: number) =>
    `Hi ${name}! ${assignmentName} is due in ${hours} hours. Submit at ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,

  certificateReady: (name: string, courseName: string) =>
    `Congratulations ${name}! Your ${courseName} certificate is ready. Download at ${process.env.NEXT_PUBLIC_SITE_URL}/certificates`,

  attendanceAlert: (name: string, eventName: string) =>
    `Hi ${name}! You're marked absent for ${eventName}. Contact us if this is incorrect.`,

  emergencyAlert: (message: string) =>
    `ALERT: ${message}. Check your email for details.`,
};
