/**
 * Drake Tax Software API Integration
 */

interface DrakeTaxConfig {
  apiKey: string;
  apiSecret: string;
  firmId: string;
}

interface TaxReturn {
  taxpayerId: string;
  taxYear: number;
  filingStatus: string;
  income: number;
  deductions: number;
  credits: number;
}

interface EFileResponse {
  success: boolean;
  confirmationNumber?: string;
  errors?: string[];
}

export class DrakeTaxClient {
  private config: DrakeTaxConfig;
  private baseUrl = 'https://api.drakesoftware.com/v1';

  constructor(config: DrakeTaxConfig) {
    this.config = config;
  }

  async createReturn(taxReturn: TaxReturn): Promise<any> {
    const response = await fetch(`${this.baseUrl}/returns`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-Firm-ID': this.config.firmId,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taxReturn),
    });

    if (!response.ok) {
      throw new Error(`Drake Tax API error: ${response.statusText}`);
    }

    return response.json();
  }

  async eFileReturn(returnId: string): Promise<EFileResponse> {
    const response = await fetch(`${this.baseUrl}/returns/${returnId}/efile`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-Firm-ID': this.config.firmId,
      },
    });

    if (!response.ok) {
      throw new Error(`Drake Tax API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getReturnStatus(returnId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/returns/${returnId}/status`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'X-Firm-ID': this.config.firmId,
      },
    });

    if (!response.ok) {
      throw new Error(`Drake Tax API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createDrakeTaxClient(): DrakeTaxClient {
  return new DrakeTaxClient({
    apiKey: process.env.DRAKE_TAX_API_KEY || '',
    apiSecret: process.env.DRAKE_TAX_API_SECRET || '',
    firmId: process.env.DRAKE_TAX_FIRM_ID || '',
  });
}
