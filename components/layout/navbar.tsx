'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, LogIn } from 'lucide-react';
import { useState } from 'react';
import { UserNav } from './user-nav';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Temporário, depois usar auth real

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <nav className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="text-xl font-bold">
            Finlândia Carros
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              Início
            </Link>
            <Link href="/carros" className="text-gray-600 hover:text-gray-900">
              Carros
            </Link>
            <UserNav />
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden absolute left-0 right-0 top-20 bg-white border-b shadow-lg transition-all duration-200 ease-in-out">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsOpen(false)}
              >
                Início
              </Link>
              <Link
                href="/carros"
                className="text-gray-600 hover:text-gray-900 py-2"
                onClick={() => setIsOpen(false)}
              >
                Carros
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/perfil"
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    href="/meus-carros"
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Meus Carros
                  </Link>
                  <Link
                    href="/favoritos"
                    className="text-gray-600 hover:text-gray-900 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Favoritos
                  </Link>
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsOpen(false);
                    }}
                    className="text-red-600 hover:text-red-700 py-2 text-left"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Button 
                  variant="default" 
                  onClick={() => {
                    setIsLoggedIn(true);
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
