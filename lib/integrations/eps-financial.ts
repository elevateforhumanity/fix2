// lib/integrations/eps-financial.ts
// EPS Financial API Integration
// Reference implementation - configure with your EPS credentials
interface EPSConfig {
  apiKey: string;
  apiUrl: string;
  merchantId: string;
  webhookSecret: string;
}
interface CashAdvanceApplication {
  id: string;
  applicant: {
    firstName: string;
    lastName: string;
    ssn: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  employment: {
    employer: string;
    monthlyIncome: number;
    employmentLength: number;
  };
  banking: {
    accountNumber: string;
    routingNumber: string;
    accountType: 'checking' | 'savings';
  };
  requestedAmount: number;
}
interface EPSUnderwritingResult {
  applicationId: string;
  epsApplicationId: string;
  status: 'approved' | 'denied' | 'pending' | 'review_required';
  approvedAmount?: number;
  interestRate?: number;
  fees?: number;
  repaymentSchedule?: {
    amount: number;
    frequency: 'weekly' | 'biweekly' | 'monthly';
    numberOfPayments: number;
  };
  denialReason?: string;
  riskScore?: number;
}
interface EPSFundingRequest {
  epsApplicationId: string;
  amount: number;
  bankAccount: {
    accountNumber: string;
    routingNumber: string;
  };
}
interface EPSFundingResult {
  transactionId: string;
  status: 'initiated' | 'processing' | 'completed' | 'failed';
  estimatedDelivery: string;
  trackingNumber?: string;
}
export class EPSFinancialIntegration {
  private config: EPSConfig;
  constructor() {
    this.config = {
      apiKey: process.env.EPS_FINANCIAL_API_KEY || '',
      apiUrl:
        process.env.EPS_FINANCIAL_API_URL || 'https://api.epsfinancial.com',
      merchantId: process.env.EPS_FINANCIAL_MERCHANT_ID || '',
      webhookSecret: process.env.EPS_FINANCIAL_WEBHOOK_SECRET || '',
    };
  }
  /**
   * Check if EPS integration is configured
   */
  isConfigured(): boolean {
    return !!(
      this.config.apiKey &&
      this.config.merchantId &&
      this.config.webhookSecret
    );
  }
  /**
   * Submit application to EPS for underwriting
   * Reference: Use EPS API to submit application
   */
  async submitApplication(
    application: CashAdvanceApplication
  ): Promise<EPSUnderwritingResult> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    // Reference implementation - replace with actual EPS API call
    const response = await fetch(`${this.config.apiUrl}/applications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-Merchant-Id': this.config.merchantId,
      },
      body: JSON.stringify({
        merchantId: this.config.merchantId,
        applicant: application.applicant,
        employment: application.employment,
        banking: application.banking,
        requestedAmount: application.requestedAmount,
        applicationId: application.id,
      }),
    });
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      applicationId: application.id,
      epsApplicationId: data.applicationId,
      status: data.status,
      approvedAmount: data.approvedAmount,
      interestRate: data.interestRate,
      fees: data.fees,
      repaymentSchedule: data.repaymentSchedule,
      denialReason: data.denialReason,
      riskScore: data.riskScore,
    };
  }
  /**
   * Get application status from EPS
   */
  async getApplicationStatus(
    epsApplicationId: string
  ): Promise<EPSUnderwritingResult> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(
      `${this.config.apiUrl}/applications/${epsApplicationId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'X-Merchant-Id': this.config.merchantId,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Initiate fund transfer through EPS
   */
  async initiateFunding(request: EPSFundingRequest): Promise<EPSFundingResult> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(`${this.config.apiUrl}/funding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-Merchant-Id': this.config.merchantId,
      },
      body: JSON.stringify({
        applicationId: request.epsApplicationId,
        amount: request.amount,
        bankAccount: request.bankAccount,
        merchantId: this.config.merchantId,
      }),
    });
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    const data = await response.json();
    return {
      transactionId: data.transactionId,
      status: data.status,
      estimatedDelivery: data.estimatedDelivery,
      trackingNumber: data.trackingNumber,
    };
  }
  /**
   * Get funding status
   */
  async getFundingStatus(transactionId: string): Promise<EPSFundingResult> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(
      `${this.config.apiUrl}/funding/${transactionId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'X-Merchant-Id': this.config.merchantId,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Verify bank account through EPS
   */
  async verifyBankAccount(
    accountNumber: string,
    routingNumber: string
  ): Promise<{
    verified: boolean;
    accountType?: 'checking' | 'savings';
    bankName?: string;
  }> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(`${this.config.apiUrl}/verify-bank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-Merchant-Id': this.config.merchantId,
      },
      body: JSON.stringify({
        accountNumber,
        routingNumber,
      }),
    });
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Get repayment schedule
   */
  async getRepaymentSchedule(epsApplicationId: string): Promise<{
    payments: Array<{
      dueDate: string;
      amount: number;
      principal: number;
      interest: number;
      fees: number;
      status: 'pending' | 'paid' | 'late' | 'defaulted';
    }>;
  }> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(
      `${this.config.apiUrl}/applications/${epsApplicationId}/schedule`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          'X-Merchant-Id': this.config.merchantId,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Process repayment
   */
  async processRepayment(
    epsApplicationId: string,
    amount: number
  ): Promise<{
    success: boolean;
    transactionId: string;
    remainingBalance: number;
  }> {
    if (!this.isConfigured()) {
      throw new Error('EPS Financial integration not configured');
    }
    const response = await fetch(`${this.config.apiUrl}/repayments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.config.apiKey}`,
        'X-Merchant-Id': this.config.merchantId,
      },
      body: JSON.stringify({
        applicationId: epsApplicationId,
        amount,
      }),
    });
    if (!response.ok) {
      throw new Error(`EPS API error: ${response.statusText}`);
    }
    return await response.json();
  }
  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    if (!this.config.webhookSecret) {
      return false;
    }
    // Reference: Implement signature verification based on EPS documentation
    // This is a placeholder - replace with actual EPS signature verification
    // @ts-expect-error TS1308: 'await' expressions are only allowed within async functions and at the top le...
    const crypto = await import('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', this.config.webhookSecret)
      .update(payload)
      .digest('hex');
    return signature === expectedSignature;
  }
  /**
   * Handle webhook event
   */
  async handleWebhook(event: {
    type: string;
    applicationId: string;
    data: unknown;
  }): Promise<void> {
    // Reference: Handle different webhook event types
    switch (event.type) {
      case 'application.approved':
        // Handle approval
        break;
      case 'application.denied':
        // Handle denial
        break;
      case 'funding.completed':
        // Handle funding completion
        break;
      case 'repayment.received':
        // Handle repayment
        break;
      case 'repayment.late':
        // Handle late payment
        break;
      case 'application.defaulted':
        // Handle default
        break;
      default:
    }
  }
}
// Export singleton instance
export const epsFinancialIntegration = new EPSFinancialIntegration();
