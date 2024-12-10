'use client';

import { Facebook, Instagram, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 py-6 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col space-y-4">
        {/* Links e Contatos */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="mb-4 sm:mb-0">
            <p className="text-gray-600"> 2024 Desenvolvido por Will</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <div className="flex items-center space-x-4">
              <Link href="tel:+358405503996" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Phone className="h-4 w-4 mr-1" />
                <span>+358 40 550 3996</span>
              </Link>
              <Link href="mailto:contato@exemplo.com" className="text-gray-600 hover:text-gray-900 flex items-center">
                <Mail className="h-4 w-4 mr-1" />
                <span>contato@exemplo.com</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Legais */}
        <div className="flex justify-center space-x-6 text-sm border-t border-gray-200 pt-4">
          <Link 
            href="/termos-de-uso" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Termos de Uso
          </Link>
          <Link 
            href="/politica-de-privacidade" 
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
