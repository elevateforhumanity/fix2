/**
 * GitHub OAuth Integration
 * Handles GitHub authentication
 */

interface GitHubConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface GitHubUserProfile {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
  bio?: string;
  company?: string;
  location?: string;
}

class GitHubOAuthClient {
  private config: GitHubConfig;

  constructor(config: GitHubConfig) {
    this.config = config;
  }

  getAuthorizationUrl(state: string, scopes: string[] = ['read:user', 'user:email']): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.redirectUri,
      scope: scopes.join(' '),
      state,
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<GitHubTokenResponse> {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: this.config.clientId,
        client_secret: this.config.clientSecret,
        code,
        redirect_uri: this.config.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error(`GitHub token exchange failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserProfile(accessToken: string): Promise<GitHubUserProfile> {
    const response = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub user profile: ${response.statusText}`);
    }

    return response.json();
  }

  async getUserEmails(accessToken: string): Promise<Array<{ email: string; primary: boolean; verified: boolean }>> {
    const response = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub user emails: ${response.statusText}`);
    }

    return response.json();
  }
}

export function createGitHubOAuthClient(): GitHubOAuthClient | null {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    if (process.env.NODE_ENV === 'development') {
    }
    return null;
  }

  return new GitHubOAuthClient({
    clientId,
    clientSecret,
    redirectUri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/github`,
  });
}

export const githubOAuth = createGitHubOAuthClient();
