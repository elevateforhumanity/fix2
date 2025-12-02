/**
 * Azure AD SSO Integration
 * Handles Azure Active Directory single sign-on
 */

interface AzureADConfig {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  redirectUri: string;
}

interface AzureADTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  id_token: string;
  refresh_token?: string;
}

interface AzureADUserProfile {
  id: string;
  displayName: string;
  mail: string;
  userPrincipalName: string;
  givenName?: string;
  surname?: string;
  jobTitle?: string;
  department?: string;
  officeLocation?: string;
  mobilePhone?: string;
}

class AzureADSSOClient {
  private config: AzureADConfig;
  private baseUrl: string;
  private graphUrl = 'https://graph.microsoft.com/v1.0';

  constructor(config: AzureADConfig) {
    this.config = config;
    this.baseUrl = `https://login.microsoftonline.com/${config.tenantId}`;
  }

  getAuthorizationUrl(state: string, scopes: string[] = ['openid', 'profile', 'email', 'User.Read']): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      response_mode: 'query',
      scope: scopes.join(' '),
      state,
    });

    return `${this.baseUrl}/oauth2/v2.0/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<AzureADTokenResponse> {
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
      throw new Error(`Azure AD token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  async refreshAccessToken(refreshToken: string): Promise<AzureADTokenResponse> {
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
      throw new Error(`Azure AD token refresh failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserProfile(accessToken: string): Promise<AzureADUserProfile> {
    const response = await fetch(`${this.graphUrl}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Azure AD user profile: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserPhoto(accessToken: string): Promise<Blob | null> {
    const response = await fetch(`${this.graphUrl}/me/photo/$value`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.blob();
  }

  async getGroupMemberships(accessToken: string): Promise<any[]> {
    const response = await fetch(`${this.graphUrl}/me/memberOf`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Azure AD group memberships: ${response.statusText}`);
    }

    const data = await response.json();
    return data.value || [];
  }

  async revokeToken(token: string): Promise<void> {
    const params = new URLSearchParams({
      token,
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
    });

    const response = await fetch(`${this.baseUrl}/oauth2/v2.0/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error(`Failed to revoke Azure AD token: ${response.statusText}`);
    }
  }

  getLogoutUrl(postLogoutRedirectUri: string): string {
    const params = new URLSearchParams({
      post_logout_redirect_uri: postLogoutRedirectUri,
    });

    return `${this.baseUrl}/oauth2/v2.0/logout?${params.toString()}`;
  }
}

export function createAzureADSSOClient(): AzureADSSOClient | null {
  const clientId = process.env.AZURE_AD_CLIENT_ID;
  const clientSecret = process.env.AZURE_AD_CLIENT_SECRET;
  const tenantId = process.env.AZURE_AD_TENANT_ID;

  if (!clientId || !clientSecret || !tenantId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Azure AD SSO not configured');
    }
    return null;
  }

  return new AzureADSSOClient({
    clientId,
    clientSecret,
    tenantId,
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/azure-ad`,
  });
}

export const azureADSSO = createAzureADSSOClient();
