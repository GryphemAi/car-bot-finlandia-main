'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { UserNav } from './user-nav';
import { company } from '@/constants/data';

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex h-20 items-center justify-between bg-gray-100 px-8">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <company.logo className="h-8 w-8 text-primary" />
            <span className="text-xl font-semibold text-gray-800">{company.name}</span>
          </div>
        </div>
        
        <nav className="flex-1 flex justify-center items-center gap-8">
          <Link 
            href="/" 
            className="text-base font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Início
          </Link>
          <Link 
            href="/cars" 
            className="text-base font-medium text-gray-600 hover:text-primary transition-colors"
          >
            Carros
          </Link>
        </nav>

        <div className="flex-1 flex justify-end">
          {session?.user && (
            <div className="mr-4">
              <UserNav />
            </div>
          )}
        </div>
      </header>
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
}
