/**
 * Auth0 SSO Integration
 * Handles Auth0 single sign-on authentication
 */

interface Auth0Config {
  domain: string;
  clientId: string;
  clientSecret: string;
  audience?: string;
}

interface Auth0TokenResponse {
  access_token: string;
  id_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface Auth0UserInfo {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  picture?: string;
  nickname?: string;
  updated_at?: string;
}

interface Auth0User {
  user_id: string;
  email: string;
  email_verified: boolean;
  name: string;
  nickname: string;
  picture: string;
  created_at: string;
  updated_at: string;
}

class Auth0SSOClient {
  private config: Auth0Config;
  private baseUrl: string;

  constructor(config: Auth0Config) {
    this.config = config;
    this.baseUrl = `https://${config.domain}`;
  }

  getAuthorizationUrl(
    redirectUri: string,
    state: string,
    scopes: string[] = ['openid', 'profile', 'email']
  ): string {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.config.clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      state,
      ...(this.config.audience && { audience: this.config.audience }),
    });

    return `${this.baseUrl}/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string, redirectUri: string): Promise<Auth0TokenResponse> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`Auth0 token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserInfo(accessToken: string): Promise<Auth0UserInfo> {
    const response = await fetch(`${this.baseUrl}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Auth0 user info: ${response.statusText}`);
    }

    return response.json();
  }

  async getManagementToken(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        audience: `${this.baseUrl}/api/v2/`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get Auth0 management token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  }

  async getUser(userId: string, managementToken: string): Promise<Auth0User> {
    const response = await fetch(`${this.baseUrl}/api/v2/users/${encodeURIComponent(userId)}`, {
      headers: {
        Authorization: `Bearer ${managementToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Auth0 user: ${response.statusText}`);
    }

    return response.json();
  }

  async updateUser(userId: string, managementToken: string, updates: Partial<Auth0User>): Promise<Auth0User> {
    const response = await fetch(`${this.baseUrl}/api/v2/users/${encodeURIComponent(userId)}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${managementToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Failed to update Auth0 user: ${response.statusText}`);
    }

    return response.json();
  }

  async searchUsers(query: string, managementToken: string): Promise<Auth0User[]> {
    const params = new URLSearchParams({
      q: query,
      search_engine: 'v3',
    });

    const response = await fetch(`${this.baseUrl}/api/v2/users?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${managementToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search Auth0 users: ${response.statusText}`);
    }

    return response.json();
  }

  async logout(returnTo: string): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      returnTo,
    });

    return `${this.baseUrl}/v2/logout?${params.toString()}`;
  }
}

export function createAuth0SSOClient(): Auth0SSOClient | null {
  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;
  const audience = process.env.AUTH0_AUDIENCE;

  if (!domain || !clientId || !clientSecret) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Auth0 SSO not configured');
    }
    return null;
  }

  return new Auth0SSOClient({
    domain,
    clientId,
    clientSecret,
    audience,
  });
}

export const auth0SSO = createAuth0SSOClient();
