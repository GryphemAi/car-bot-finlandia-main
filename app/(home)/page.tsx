'use client';

import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import Footer from '@/components/footer';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <Logo />
          <div className="flex items-center gap-4">
            {!session ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/signin')}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => router.push('/signup')}
                >
                  Cadastrar
                </Button>
              </>
            ) : (
              <Button
                onClick={() => router.push('/dashboard')}
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
        <div className="grid gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Veículos Ativos</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Manutenções Pendentes</h3>
            <p className="text-3xl font-bold">3</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-2">Total de Motoristas</h3>
            <p className="text-3xl font-bold">8</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
