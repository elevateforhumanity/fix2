/**
 * Mailchimp Email Marketing Integration
 */

interface MailchimpConfig {
  apiKey: string;
  serverPrefix: string;
  listId: string;
}

interface Subscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

export class MailchimpClient {
  private config: MailchimpConfig;
  private baseUrl: string;

  constructor(config: MailchimpConfig) {
    this.config = config;
    this.baseUrl = `https://${config.serverPrefix}.api.mailchimp.com/3.0`;
  }

  async addSubscriber(subscriber: Subscriber): Promise<any> {
    const response = await fetch(`${this.baseUrl}/lists/${this.config.listId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: subscriber.email,
        status: 'subscribed',
        merge_fields: {
          FNAME: subscriber.firstName || '',
          LNAME: subscriber.lastName || '',
        },
        tags: subscriber.tags || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.statusText}`);
    }

    return response.json();
  }

  async sendCampaign(campaignId: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/campaigns/${campaignId}/actions/send`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createMailchimpClient(): MailchimpClient {
  return new MailchimpClient({
    apiKey: process.env.MAILCHIMP_API_KEY || '',
    serverPrefix: process.env.MAILCHIMP_SERVER_PREFIX || 'us1',
    listId: process.env.MAILCHIMP_LIST_ID || '',
  });
}
