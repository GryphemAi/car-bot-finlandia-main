import { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SignUpAuthForm from './signup-auth-form';
import { Car } from 'lucide-react';
import { company } from '@/constants/data';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
};

export default function SignUpViewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/signin"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-8 md:right-8 hover:bg-primary/10'
          )}
        >
          Entrar
        </Link>
        
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-primary" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Car className="mr-2 h-6 w-6" />
            {company.name}
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                "Faça parte da nossa comunidade e encontre o carro perfeito para você."
              </p>
              <footer className="text-sm">Finlândia Veículos</footer>
            </blockquote>
          </div>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="flex items-center gap-2 mb-6 lg:hidden">
                <Car className="h-8 w-8 text-primary" />
                <span className="text-xl font-semibold text-gray-800">{company.name}</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Crie sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Digite suas informações abaixo para criar sua conta
              </p>
            </div>
            <SignUpAuthForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Políticas de Privacidade
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
