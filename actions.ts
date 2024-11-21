import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';

export async function authenticateSignIn(email: string, password: string) {
  try {
    return await signIn('credentials', {
      email,
      password,
      redirect: false
    });
  } catch (error: any) {
    return {
      error: {
        message: error.message
      }
    };
  }
}

export async function handleSignIn() {
  redirect('/');
}
