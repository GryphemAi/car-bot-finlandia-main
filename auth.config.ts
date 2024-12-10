import { NextAuthConfig } from 'next-auth';

const authorizedUsers = [
  {
    email: "comercial@frontmidie.tech",
    password: "devs1224",
    role: "admin"
  },
  {
    email: "cliente@cliente.com.br",
    password: "cliente0312",
    role: "client"
  }
];

export const authConfig = {
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAuthPage = nextUrl.pathname.startsWith('/signin');
      
      if (isAuthPage) {
        if (isLoggedIn) return Response.redirect(new URL('/', nextUrl));
        return true;
      }

      if (!isLoggedIn) {
        return Response.redirect(new URL('/signin', nextUrl));
      }

      return true;
    },
  },
  providers: [], // Configurado em auth.ts
} satisfies NextAuthConfig;

export { authorizedUsers };
