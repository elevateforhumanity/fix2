/**
 * Okta SSO Integration
 * Handles Okta single sign-on authentication
 */

interface OktaConfig {
  clientId: string;
  clientSecret: string;
  issuer: string;
  redirectUri: string;
}

interface OktaTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token: string;
}

interface OktaUserInfo {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
  given_name?: string;
  family_name?: string;
  locale?: string;
  zoneinfo?: string;
}

class OktaSSOClient {
  private config: OktaConfig;

  constructor(config: OktaConfig) {
    this.config = config;
  }

  getAuthorizationUrl(state: string, nonce: string, scopes: string[] = ['openid', 'profile', 'email']): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      scope: scopes.join(' '),
      state,
      nonce,
    });

    return `${this.config.issuer}/v1/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<OktaTokenResponse> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      code,
      redirect_uri: this.config.redirectUri,
      grant_type: 'authorization_code',
    });

    const response = await fetch(`${this.config.issuer}/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Okta token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserInfo(accessToken: string): Promise<OktaUserInfo> {
    const response = await fetch(`${this.config.issuer}/v1/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Okta user info: ${response.statusText}`);
    }

    return response.json();
  }

  async revokeToken(token: string, tokenTypeHint: 'access_token' | 'refresh_token' = 'access_token'): Promise<void> {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      token,
      token_type_hint: tokenTypeHint,
    });

    const response = await fetch(`${this.config.issuer}/v1/revoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to revoke Okta token: ${response.statusText}`);
    }
  }
}

export function createOktaSSOClient(): OktaSSOClient | null {
  const clientId = process.env.OKTA_CLIENT_ID;
  const clientSecret = process.env.OKTA_CLIENT_SECRET;
  const issuer = process.env.OKTA_ISSUER;

  if (!clientId || !clientSecret || !issuer) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new OktaSSOClient({
    clientId,
    clientSecret,
    issuer,
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/okta`,
  });
}

export const oktaSSO = createOktaSSOClient();
