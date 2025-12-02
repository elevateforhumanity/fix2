/**
 * Authorize.Net Payment Integration
 * Handles payment processing and recurring billing
 */

interface AuthorizeNetConfig {
  apiLoginId: string;
  transactionKey: string;
  environment: 'sandbox' | 'production';
}

interface AuthorizeNetTransaction {
  transId: string;
  responseCode: string;
  authCode: string;
  avsResultCode: string;
  cvvResultCode: string;
  accountNumber: string;
  accountType: string;
}

interface AuthorizeNetPaymentRequest {
  amount: string;
  cardNumber: string;
  expirationDate: string;
  cardCode: string;
  description?: string;
  invoiceNumber?: string;
  customerId?: string;
  email?: string;
}

interface AuthorizeNetResponse {
  transactionResponse: {
    responseCode: string;
    authCode: string;
    avsResultCode: string;
    cvvResultCode: string;
    transId: string;
    accountNumber: string;
    accountType: string;
    messages: Array<{
      code: string;
      description: string;
    }>;
    errors?: Array<{
      errorCode: string;
      errorText: string;
    }>;
  };
  messages: {
    resultCode: string;
    message: Array<{
      code: string;
      text: string;
    }>;
  };
}

class AuthorizeNetClient {
  private config: AuthorizeNetConfig;
  private baseUrl: string;

  constructor(config: AuthorizeNetConfig) {
    this.config = config;
    this.baseUrl = config.environment === 'sandbox'
      ? 'https://apitest.authorize.net/xml/v1/request.api'
      : 'https://api.authorize.net/xml/v1/request.api';
  }

  private async request(requestType: string, requestData: any): Promise<any> {
    const payload = {
      [requestType]: {
        merchantAuthentication: {
          name: this.config.apiLoginId,
          transactionKey: this.config.transactionKey,
        },
        ...requestData,
      },
    };

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Authorize.Net API error: ${response.statusText}`);
    }

    return response.json();
  }

  async chargeCard(paymentData: AuthorizeNetPaymentRequest): Promise<AuthorizeNetResponse> {
    return this.request('createTransactionRequest', {
      transactionRequest: {
        transactionType: 'authCaptureTransaction',
        amount: paymentData.amount,
        payment: {
          creditCard: {
            cardNumber: paymentData.cardNumber,
            expirationDate: paymentData.expirationDate,
            cardCode: paymentData.cardCode,
          },
        },
        order: {
          invoiceNumber: paymentData.invoiceNumber,
          description: paymentData.description,
        },
        customer: {
          id: paymentData.customerId,
          email: paymentData.email,
        },
      },
    });
  }

  async authorizeCard(paymentData: AuthorizeNetPaymentRequest): Promise<AuthorizeNetResponse> {
    return this.request('createTransactionRequest', {
      transactionRequest: {
        transactionType: 'authOnlyTransaction',
        amount: paymentData.amount,
        payment: {
          creditCard: {
            cardNumber: paymentData.cardNumber,
            expirationDate: paymentData.expirationDate,
            cardCode: paymentData.cardCode,
          },
        },
      },
    });
  }

  async captureTransaction(transactionId: string, amount: string): Promise<AuthorizeNetResponse> {
    return this.request('createTransactionRequest', {
      transactionRequest: {
        transactionType: 'priorAuthCaptureTransaction',
        amount,
        refTransId: transactionId,
      },
    });
  }

  async refundTransaction(transactionId: string, amount: string, lastFourDigits: string): Promise<AuthorizeNetResponse> {
    return this.request('createTransactionRequest', {
      transactionRequest: {
        transactionType: 'refundTransaction',
        amount,
        payment: {
          creditCard: {
            cardNumber: lastFourDigits,
            expirationDate: 'XXXX',
          },
        },
        refTransId: transactionId,
      },
    });
  }

  async voidTransaction(transactionId: string): Promise<AuthorizeNetResponse> {
    return this.request('createTransactionRequest', {
      transactionRequest: {
        transactionType: 'voidTransaction',
        refTransId: transactionId,
      },
    });
  }

  async getTransactionDetails(transactionId: string): Promise<any> {
    return this.request('getTransactionDetailsRequest', {
      transId: transactionId,
    });
  }

  async chargeCourseEnrollment(
    cardNumber: string,
    expirationDate: string,
    cardCode: string,
    amount: number,
    courseId: string,
    courseName: string,
    customerEmail: string
  ): Promise<AuthorizeNetResponse> {
    return this.chargeCard({
      amount: (amount / 100).toFixed(2),
      cardNumber,
      expirationDate,
      cardCode,
      description: `Course enrollment: ${courseName}`,
      invoiceNumber: courseId,
      email: customerEmail,
    });
  }

  isSuccessful(response: AuthorizeNetResponse): boolean {
    return response.transactionResponse.responseCode === '1';
  }

  getErrorMessage(response: AuthorizeNetResponse): string {
    if (response.transactionResponse.errors && response.transactionResponse.errors.length > 0) {
      return response.transactionResponse.errors[0].errorText;
    }
    if (response.messages.message && response.messages.message.length > 0) {
      return response.messages.message[0].text;
    }
    return 'Unknown error';
  }
}

export function createAuthorizeNetClient(): AuthorizeNetClient | null {
  const apiLoginId = process.env.AUTHORIZE_NET_API_LOGIN_ID;
  const transactionKey = process.env.AUTHORIZE_NET_TRANSACTION_KEY;
  const environment = (process.env.AUTHORIZE_NET_ENVIRONMENT as 'sandbox' | 'production') || 'sandbox';

  if (!apiLoginId || !transactionKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Authorize.Net not configured');
    }
    return null;
  }

  return new AuthorizeNetClient({
    apiLoginId,
    transactionKey,
    environment,
  });
}

export const authorizeNet = createAuthorizeNetClient();
