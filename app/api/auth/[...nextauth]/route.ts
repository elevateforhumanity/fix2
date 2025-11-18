// app/api/auth/[...nextauth]/route.ts
// NextAuth configuration with Okta and Azure AD SSO
import NextAuth, { NextAuthOptions } from 'next-auth';
import OktaProvider from 'next-auth/providers/okta';
import AzureADProvider from 'next-auth/providers/azure-ad';
import { syncUserProfile } from '@/lib/auth/syncUserProfile';

export const authOptions: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID!,
      clientSecret: process.env.OKTA_CLIENT_SECRET!,
      issuer: process.env.OKTA_ISSUER!, // e.g. https://dev-123456.okta.com/oauth2/default
    }),
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      // On first login or provider change, extend token
      if (account && profile) {
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session as any).provider = token.provider;
        (session as any).providerAccountId = token.providerAccountId;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        // Sync user into Supabase profiles table
        await syncUserProfile({
          email: user.email!,
          name: user.name ?? '',
          provider: account?.provider ?? 'unknown',
          providerAccountId: account?.providerAccountId ?? '',
        });
        return true;
      } catch (error) {
        console.error('Failed to sync user profile:', error);
        return false;
      }
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
