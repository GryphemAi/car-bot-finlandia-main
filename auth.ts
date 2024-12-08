import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizedUsers } from "./auth.config";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email e senha são obrigatórios');
        }

        const user = authorizedUsers.find(
          user => user.email === credentials.email && 
                 user.password === credentials.password
        );

        if (!user) {
          throw new Error('Acesso não autorizado. Este sistema é exclusivo para funcionários da Finlândia Veículos.');
        }

        return {
          id: user.email,
          email: user.email
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 // 24 horas
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    }
  }
});
