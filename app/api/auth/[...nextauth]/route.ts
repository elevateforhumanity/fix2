// app/api/auth/[...nextauth]/route.ts
// NextAuth v5 configuration
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Okta from 'next-auth/providers/okta';
import AzureAD from 'next-auth/providers/azure-ad';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        // TODO: Implement actual authentication
        if (credentials?.email && credentials?.password) {
          return {
            id: '1',
            email: credentials.email as string,
            name: 'User',
          };
        }
        return null;
      },
    }),
    // Enterprise SSO providers
    ...(process.env.OKTA_CLIENT_ID && process.env.OKTA_CLIENT_SECRET && process.env.OKTA_ISSUER
      ? [
          Okta({
            clientId: process.env.OKTA_CLIENT_ID,
            clientSecret: process.env.OKTA_CLIENT_SECRET,
            issuer: process.env.OKTA_ISSUER,
          }),
        ]
      : []),
    ...(process.env.AZURE_AD_CLIENT_ID && process.env.AZURE_AD_CLIENT_SECRET && process.env.AZURE_AD_TENANT_ID
      ? [
          AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            issuer: `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANT_ID}/v2.0`,
          }),
        ]
      : []),
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
});

export const { GET, POST } = handlers;
