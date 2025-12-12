/**
 * HubSpot CRM Integration
 * Handles contact and deal management
 */

interface HubSpotConfig {
  apiKey: string;
}

interface HubSpotContact {
  id?: string;
  properties: {
    email: string;
    firstname?: string;
    lastname?: string;
    phone?: string;
    company?: string;
    website?: string;
    lifecyclestage?: string;
  };
}

interface HubSpotDeal {
  id?: string;
  properties: {
    dealname: string;
    amount?: string;
    dealstage: string;
    pipeline?: string;
    closedate?: string;
  };
}

interface HubSpotCompany {
  id?: string;
  properties: {
    name: string;
    domain?: string;
    industry?: string;
    phone?: string;
    city?: string;
    state?: string;
  };
}

class HubSpotClient {
  private config: HubSpotConfig;
  private baseUrl = 'https://api.hubapi.com';

  constructor(config: HubSpotConfig) {
    this.config = config;
  }

  private async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    return response.json();
  }

  async createContact(contact: HubSpotContact): Promise<HubSpotContact> {
    return this.request('/crm/v3/objects/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async updateContact(contactId: string, properties: Partial<HubSpotContact['properties']>): Promise<HubSpotContact> {
    return this.request(`/crm/v3/objects/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    });
  }

  async getContact(contactId: string): Promise<HubSpotContact> {
    return this.request(`/crm/v3/objects/contacts/${contactId}`);
  }

  async searchContactByEmail(email: string): Promise<HubSpotContact[]> {
    const result = await this.request('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [
              {
                propertyName: 'email',
                operator: 'EQ',
                value: email,
              },
            ],
          },
        ],
      }),
    });
    return result.results;
  }

  async createDeal(deal: HubSpotDeal): Promise<HubSpotDeal> {
    return this.request('/crm/v3/objects/deals', {
      method: 'POST',
      body: JSON.stringify(deal),
    });
  }

  async updateDeal(dealId: string, properties: Partial<HubSpotDeal['properties']>): Promise<HubSpotDeal> {
    return this.request(`/crm/v3/objects/deals/${dealId}`, {
      method: 'PATCH',
      body: JSON.stringify({ properties }),
    });
  }

  async createCompany(company: HubSpotCompany): Promise<HubSpotCompany> {
    return this.request('/crm/v3/objects/companies', {
      method: 'POST',
      body: JSON.stringify(company),
    });
  }

  async associateContactWithCompany(contactId: string, companyId: string): Promise<void> {
    await this.request(`/crm/v3/objects/contacts/${contactId}/associations/companies/${companyId}/contact_to_company`, {
      method: 'PUT',
    });
  }

  async associateDealWithContact(dealId: string, contactId: string): Promise<void> {
    await this.request(`/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`, {
      method: 'PUT',
    });
  }
}

export function createHubSpotClient(): HubSpotClient | null {
  const apiKey = process.env.HUBSPOT_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new HubSpotClient({ apiKey });
}

export const hubspot = createHubSpotClient();
