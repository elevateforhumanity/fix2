// app/api/auth/[...nextauth]/route.ts
// NextAuth v5 configuration
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
  ],
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret',
});

export const { GET, POST } = handlers;
