/**
 * PayPal Payment Integration
 * Handles payment processing and subscriptions
 */

interface PayPalConfig {
  clientId: string;
  clientSecret: string;
  mode: 'sandbox' | 'live';
}

interface PayPalAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PayPalOrder {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
  }>;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

interface PayPalCreateOrderRequest {
  intent: 'CAPTURE' | 'AUTHORIZE';
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
    custom_id?: string;
  }>;
  application_context?: {
    return_url?: string;
    cancel_url?: string;
  };
}

class PayPalClient {
  private config: PayPalConfig;
  private baseUrl: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: PayPalConfig) {
    this.config = config;
    this.baseUrl = config.mode === 'sandbox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.config.clientId}:${this.config.clientSecret}`).toString('base64');

    const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!response.ok) {
      throw new Error(`PayPal authentication failed: ${response.statusText}`);
    }

    const data: PayPalAccessToken = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000;

    return this.accessToken;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const token = await this.getAccessToken();

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`PayPal API error: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  async createOrder(orderData: PayPalCreateOrderRequest): Promise<PayPalOrder> {
    return this.request('/v2/checkout/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async captureOrder(orderId: string): Promise<PayPalOrder> {
    return this.request(`/v2/checkout/orders/${orderId}/capture`, {
      method: 'POST',
    });
  }

  async getOrder(orderId: string): Promise<PayPalOrder> {
    return this.request(`/v2/checkout/orders/${orderId}`);
  }

  async refundCapture(captureId: string, amount?: { currency_code: string; value: string }): Promise<any> {
    const body = amount ? { amount } : {};
    return this.request(`/v2/payments/captures/${captureId}/refund`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async createCourseOrder(
    courseId: string,
    courseName: string,
    amount: number,
    returnUrl: string,
    cancelUrl: string
  ): Promise<PayPalOrder> {
    return this.createOrder({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: (amount / 100).toFixed(2),
          },
          description: courseName,
          custom_id: courseId,
        },
      ],
      application_context: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
    });
  }

  getApprovalUrl(order: PayPalOrder): string | null {
    const approveLink = order.links.find(link => link.rel === 'approve');
    return approveLink?.href || null;
  }
}

export function createPayPalClient(): PayPalClient | null {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  const mode = (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox';

  if (!clientId || !clientSecret) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PayPal not configured');
    }
    return null;
  }

  return new PayPalClient({
    clientId,
    clientSecret,
    mode,
  });
}

export const paypal = createPayPalClient();
