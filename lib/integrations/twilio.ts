/**
 * Twilio SMS and Voice Integration
 * Handles SMS notifications and voice calls
 */

interface TwilioConfig {
  accountSid: string;
  authToken: string;
  phoneNumber: string;
}

interface TwilioSMSOptions {
  to: string;
  body: string;
  from?: string;
}

interface TwilioCallOptions {
  to: string;
  url: string;
  from?: string;
  method?: 'GET' | 'POST';
}

interface TwilioSMSResponse {
  sid: string;
  status: string;
  to: string;
  from: string;
  body: string;
  date_created: string;
}

interface TwilioCallResponse {
  sid: string;
  status: string;
  to: string;
  from: string;
  date_created: string;
}

class TwilioClient {
  private config: TwilioConfig;
  private baseUrl: string;

  constructor(config: TwilioConfig) {
    this.config = config;
    this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}`;
  }

  private getAuthHeader(): string {
    return `Basic ${Buffer.from(`${this.config.accountSid}:${this.config.authToken}`).toString('base64')}`;
  }

  async sendSMS(options: TwilioSMSOptions): Promise<TwilioSMSResponse> {
    const params = new URLSearchParams({
      To: options.to,
      From: options.from || this.config.phoneNumber,
      Body: options.body,
    });

    const response = await fetch(`${this.baseUrl}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Twilio SMS failed: ${response.statusText}`);
    }

    return response.json();
  }

  async makeCall(options: TwilioCallOptions): Promise<TwilioCallResponse> {
    const params = new URLSearchParams({
      To: options.to,
      From: options.from || this.config.phoneNumber,
      Url: options.url,
      Method: options.method || 'POST',
    });

    const response = await fetch(`${this.baseUrl}/Calls.json`, {
      method: 'POST',
      headers: {
        Authorization: this.getAuthHeader(),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Twilio call failed: ${response.statusText}`);
    }

    return response.json();
  }

  async sendEnrollmentSMS(phoneNumber: string, studentName: string, courseName: string): Promise<TwilioSMSResponse> {
    return this.sendSMS({
      to: phoneNumber,
      body: `Hi ${studentName}! You've successfully enrolled in ${courseName}. Welcome to Elevate for Humanity!`,
    });
  }

  async sendCompletionSMS(phoneNumber: string, studentName: string, courseName: string): Promise<TwilioSMSResponse> {
    return this.sendSMS({
      to: phoneNumber,
      body: `Congratulations ${studentName}! You've completed ${courseName}. Your certificate is ready!`,
    });
  }

  async sendReminderSMS(phoneNumber: string, studentName: string, courseName: string): Promise<TwilioSMSResponse> {
    return this.sendSMS({
      to: phoneNumber,
      body: `Hi ${studentName}, don't forget to continue your progress in ${courseName}. Keep up the great work!`,
    });
  }

  async sendVerificationCode(phoneNumber: string, code: string): Promise<TwilioSMSResponse> {
    return this.sendSMS({
      to: phoneNumber,
      body: `Your Elevate for Humanity verification code is: ${code}. This code expires in 10 minutes.`,
    });
  }

  async sendPaymentConfirmation(phoneNumber: string, amount: number, courseName: string): Promise<TwilioSMSResponse> {
    return this.sendSMS({
      to: phoneNumber,
      body: `Payment of $${(amount / 100).toFixed(2)} received for ${courseName}. Thank you!`,
    });
  }

  async getMessageStatus(messageSid: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/Messages/${messageSid}.json`, {
      headers: {
        Authorization: this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get message status: ${response.statusText}`);
    }

    return response.json();
  }

  async getCallStatus(callSid: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/Calls/${callSid}.json`, {
      headers: {
        Authorization: this.getAuthHeader(),
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get call status: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createTwilioClient(): TwilioClient | null {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNumber = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !phoneNumber) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Twilio not configured');
    }
    return null;
  }

  return new TwilioClient({
    accountSid,
    authToken,
    phoneNumber,
  });
}

export const twilio = createTwilioClient();
