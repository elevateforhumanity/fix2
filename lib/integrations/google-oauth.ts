// Google OAuth Integration
import { OAuth2Client } from 'google-auth-library';

let googleClient: OAuth2Client | null = null;

export function getGoogleOAuthClient(): OAuth2Client | null {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return null;
  }

  if (!googleClient) {
    googleClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/google`
    );
  }

  return googleClient;
}

export async function verifyGoogleToken(token: string) {
  const client = getGoogleOAuthClient();
  if (!client) {
    throw new Error('Google OAuth not configured');
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    return {
      success: true,
      user: {
        id: payload?.sub,
        email: payload?.email,
        name: payload?.name,
        picture: payload?.picture,
        emailVerified: payload?.email_verified,
      },
    };
  } catch (error: unknown) {
    // Error: $1
    // @ts-expect-error TS2339: Property 'message' does not exist on type 'unknown'.
    return { success: false, error: error.message };
  }
}

export function getGoogleAuthUrl(state?: string) {
  const client = getGoogleOAuthClient();
  if (!client) {
    throw new Error('Google OAuth not configured');
  }

  return client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ],
    state: state || '',
  });
}
