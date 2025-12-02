/**
 * Square Payment Integration
 * Handles payment processing and point of sale
 */

interface SquareConfig {
  accessToken: string;
  locationId: string;
  environment: 'sandbox' | 'production';
}

interface SquarePayment {
  id: string;
  status: string;
  amount_money: {
    amount: number;
    currency: string;
  };
  source_type: string;
  created_at: string;
  receipt_url?: string;
}

interface SquareCreatePaymentRequest {
  source_id: string;
  idempotency_key: string;
  amount_money: {
    amount: number;
    currency: string;
  };
  location_id?: string;
  reference_id?: string;
  note?: string;
  customer_id?: string;
}

interface SquareCustomer {
  id: string;
  email_address?: string;
  given_name?: string;
  family_name?: string;
  phone_number?: string;
  created_at: string;
}

class SquareClient {
  private config: SquareConfig;
  private baseUrl: string;

  constructor(config: SquareConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'sandbox'
      ? 'https://connect.squareupsandbox.com'
      : 'https://connect.squareup.com';
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
        'Square-Version': '2024-01-18',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Square API error: ${response.statusText} - ${error}`);
    }

    return response.json();
  }

  async createPayment(paymentData: SquareCreatePaymentRequest): Promise<SquarePayment> {
    const result = await this.request('/v2/payments', {
      method: 'POST',
      body: JSON.stringify({
        ...paymentData,
        location_id: paymentData.location_id || this.config.locationId,
      }),
    });

    return result.payment;
  }

  async getPayment(paymentId: string): Promise<SquarePayment> {
    const result = await this.request(`/v2/payments/${paymentId}`);
    return result.payment;
  }

  async refundPayment(paymentId: string, amountMoney: { amount: number; currency: string }, idempotencyKey: string): Promise<any> {
    const result = await this.request('/v2/refunds', {
      method: 'POST',
      body: JSON.stringify({
        payment_id: paymentId,
        amount_money: amountMoney,
        idempotency_key: idempotencyKey,
      }),
    });

    return result.refund;
  }

  async createCustomer(customer: {
    email_address?: string;
    given_name?: string;
    family_name?: string;
    phone_number?: string;
  }): Promise<SquareCustomer> {
    const result = await this.request('/v2/customers', {
      method: 'POST',
      body: JSON.stringify(customer),
    });

    return result.customer;
  }

  async getCustomer(customerId: string): Promise<SquareCustomer> {
    const result = await this.request(`/v2/customers/${customerId}`);
    return result.customer;
  }

  async searchCustomers(query: { email_address?: string; phone_number?: string }): Promise<SquareCustomer[]> {
    const result = await this.request('/v2/customers/search', {
      method: 'POST',
      body: JSON.stringify({
        query: {
          filter: query,
        },
      }),
    });

    return result.customers || [];
  }

  async createCoursePayment(
    sourceId: string,
    courseId: string,
    courseName: string,
    amount: number,
    customerEmail?: string
  ): Promise<SquarePayment> {
    const crypto = await import('crypto');
    const idempotencyKey = crypto.randomUUID();

    return this.createPayment({
      source_id: sourceId,
      idempotency_key: idempotencyKey,
      amount_money: {
        amount,
        currency: 'USD',
      },
      reference_id: courseId,
      note: `Course enrollment: ${courseName}`,
    });
  }

  async listPayments(beginTime?: string, endTime?: string): Promise<SquarePayment[]> {
    const params = new URLSearchParams({
      location_id: this.config.locationId,
      ...(beginTime && { begin_time: beginTime }),
      ...(endTime && { end_time: endTime }),
    });

    const result = await this.request(`/v2/payments?${params.toString()}`);
    return result.payments || [];
  }
}

export function createSquareClient(): SquareClient | null {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;
  const environment = (process.env.SQUARE_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox';

  if (!accessToken || !locationId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Square not configured');
    }
    return null;
  }

  return new SquareClient({
    accessToken,
    locationId,
    environment,
  });
}

export const square = createSquareClient();
