/**
 * Microsoft OAuth Integration
 * Handles Microsoft/Azure AD authentication
 */

interface MicrosoftConfig {
  clientId: string;
  clientSecret: string;
  tenantId?: string;
  redirectUri: string;
}

interface MicrosoftTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
}

interface MicrosoftUserProfile {
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
  givenName?: string;
  surname?: string;
}

class MicrosoftOAuthClient {
  private config: MicrosoftConfig;
  private baseUrl: string;

  constructor(config: MicrosoftConfig) {
    this.config = config;
    this.baseUrl = config.tenantId 
      ? `https://login.microsoftonline.com/${config.tenantId}`
      : 'https://login.microsoftonline.com/common';
  }

  getAuthorizationUrl(state: string, scopes: string[] = ['openid', 'profile', 'email']): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      scope: scopes.join(' '),
      state,
      response_mode: 'query',
    });

    return `${this.baseUrl}/oauth2/v2.0/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<MicrosoftTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      redirect_uri: this.config.redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch(`${this.baseUrl}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Microsoft token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  async refreshAccessToken(refreshToken: string): Promise<MicrosoftTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    const response = await fetch(`${this.baseUrl}/oauth2/v2.0/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Microsoft token refresh failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserProfile(accessToken: string): Promise<MicrosoftUserProfile> {
    const response = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Microsoft user profile: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createMicrosoftOAuthClient(): MicrosoftOAuthClient | null {
  const clientId = process.env.MICROSOFT_CLIENT_ID;
  const clientSecret = process.env.MICROSOFT_CLIENT_SECRET;
  const tenantId = process.env.AZURE_AD_TENANT_ID;

  if (!clientId || !clientSecret) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new MicrosoftOAuthClient({
    clientId,
    clientSecret,
    tenantId,
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/microsoft`,
  });
}

export const microsoftOAuth = createMicrosoftOAuthClient();
