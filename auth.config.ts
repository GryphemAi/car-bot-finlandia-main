import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from './lib/firebase';

const auth = getAuth(app);

const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          required: true
        },
        password: {
          label: 'Password',
          type: 'password',
          required: true
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          );

          const user = userCredential.user;

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/signin'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
