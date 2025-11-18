// lib/integrations/salesforce.ts
const SF_INSTANCE_URL = process.env.SF_INSTANCE_URL;
const SF_CLIENT_ID = process.env.SF_CLIENT_ID;
const SF_CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD; // optionally + security token

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.accessToken;
  }

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('client_id', SF_CLIENT_ID!);
  body.append('client_secret', SF_CLIENT_SECRET!);
  body.append('username', SF_USERNAME!);
  body.append('password', SF_PASSWORD!);

  const res = await fetch(`${SF_INSTANCE_URL}/services/oauth2/token`, {
    method: 'POST',
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Salesforce auth error:', text);
    throw new Error('Failed to authenticate with Salesforce');
  }

  const json: any = await res.json();
  cachedToken = {
    accessToken: json.access_token,
    expiresAt: now + json.expires_in * 1000,
  };

  return cachedToken.accessToken;
}

export async function createOrUpdateContact(params: {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}) {
  const token = await getAccessToken();

  // Try to find existing contact by email
  const soql = `SELECT Id, Email FROM Contact WHERE Email = '${params.email.replace(
    /'/g,
    "\\'"
  )}' LIMIT 1`;

  const queryRes = await fetch(
    `${SF_INSTANCE_URL}/services/data/v57.0/query?q=${encodeURIComponent(soql)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const queryJson: any = await queryRes.json();
  const existing = queryJson.records?.[0];

  const contactBody = {
    FirstName: params.firstName ?? '',
    LastName: params.lastName ?? params.email,
    Email: params.email,
    Phone: params.phone ?? undefined,
  };

  if (existing) {
    // Update
    await fetch(
      `${SF_INSTANCE_URL}/services/data/v57.0/sobjects/Contact/${existing.Id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactBody),
      }
    );

    return existing.Id;
  } else {
    // Create
    const res = await fetch(
      `${SF_INSTANCE_URL}/services/data/v57.0/sobjects/Contact`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactBody),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Salesforce create contact error:', text);
      throw new Error('Failed to create Salesforce contact');
    }

    const json: any = await res.json();
    return json.id;
  }
}

export async function createOpportunity(params: {
  name: string;
  accountId?: string;
  closeDate: string; // YYYY-MM-DD
  stageName: string; // e.g. 'Qualification'
  amount?: number;
}) {
  const token = await getAccessToken();

  const body: any = {
    Name: params.name,
    CloseDate: params.closeDate,
    StageName: params.stageName,
  };

  if (params.accountId) body.AccountId = params.accountId;
  if (typeof params.amount === 'number') body.Amount = params.amount;

  const res = await fetch(
    `${SF_INSTANCE_URL}/services/data/v57.0/sobjects/Opportunity`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error('Salesforce create opportunity error:', text);
    throw new Error('Failed to create Salesforce opportunity');
  }

  const json: any = await res.json();
  return json.id;
}
