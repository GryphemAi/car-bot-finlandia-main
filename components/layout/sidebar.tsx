'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Car,
  Heart,
  Contact,
  UserCircle,
  BarChart,
  LogOut,
  Home,
  Bell,
  Users,
  FileText,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';
import { NotificationsPopup } from '@/components/notifications/notifications-popup';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { logUserActivity } from '@/services/activity-logs';

const menuItems = [
  {
    title: 'Início',
    icon: Home,
    href: '/dashboard'
  },
  {
    title: 'Painel',
    icon: LayoutDashboard,
    href: '/painel'
  },
  {
    title: 'Analytics',
    icon: BarChart,
    href: '/analytics'
  },
  {
    title: 'Equipe',
    icon: Users,
    href: '/equipe'
  },
  {
    title: 'Veículos',
    icon: Car,
    href: '/veiculos'
  },
  {
    title: 'Favoritos',
    icon: Heart,
    href: '/favoritos'
  },
  {
    title: 'Contatos',
    icon: Contact,
    href: '/contatos'
  }
];

const legalItems = [
  {
    title: 'Termos de Uso',
    icon: FileText,
    href: '/termos-de-uso'
  },
  {
    title: 'Política de Privacidade',
    icon: Shield,
    href: '/politica-de-privacidade'
  }
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    await logUserActivity({
      userId: session?.user?.email || 'unknown',
      action: 'logout',
      timestamp: new Date(),
      location: { ip: 'user_ip' }, // Substitua 'user_ip' pelo IP real
      userAgent: navigator.userAgent,
    });
    router.push('/signin');
  };

  return (
    <aside className="fixed left-4 top-4 z-40 h-[calc(100vh-32px)] w-64 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-sm text-white shadow-xl">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-center border-b border-zinc-800/50">
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            CarBoard
          </span>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {/* Language Selector */}
          <div className="mb-4 flex items-center justify-between rounded-lg bg-zinc-800/30 px-3 py-2">
            <span className="text-sm text-zinc-400">Idioma</span>
            <select 
              className="bg-transparent text-sm text-zinc-200 outline-none cursor-pointer"
              onChange={(e) => {
                const lang = e.target.value;
                // Salva a preferência
                localStorage.setItem('selected_language', lang);
                
                // Encontra o iframe do Google Translate
                const iframe = document.querySelector('iframe.goog-te-menu-frame') as HTMLIFrameElement;
                if (iframe) {
                  // Encontra o select dentro do iframe
                  const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                  if (iframeDoc) {
                    const select = iframeDoc.querySelector('.goog-te-combo') as HTMLSelectElement;
                    if (select) {
                      select.value = lang;
                      select.dispatchEvent(new Event('change'));
                    }
                  }
                } else {
                  // Se não encontrar o iframe, tenta o método alternativo
                  const element = document.querySelector('.goog-te-combo') as HTMLSelectElement;
                  if (element) {
                    element.value = lang;
                    element.dispatchEvent(new Event('change'));
                  }
                }
              }}
              defaultValue={typeof window !== 'undefined' ? localStorage.getItem('selected_language') || 'en' : 'en'}
            >
              <option value="en" className="bg-zinc-800">English</option>
              <option value="fi" className="bg-zinc-800">Suomi</option>
            </select>
          </div>

          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                  'hover:bg-zinc-800/50 hover:text-white hover:translate-x-1',
                  isActive 
                    ? 'bg-zinc-800/50 text-white' 
                    : 'text-zinc-400'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Buttons */}
        <div className="px-3 py-4 border-t border-zinc-800/50 space-y-2">
          <Link
            href="/perfil"
            className={cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
              'hover:bg-zinc-800/50 hover:text-white hover:translate-x-1',
              pathname === '/perfil' ? 'bg-zinc-800/50 text-white' : 'text-zinc-400'
            )}
          >
            <UserCircle className="mr-3 h-5 w-5" />
            Perfil
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 hover:translate-x-1"
              >
                <Bell className="mr-3 h-5 w-5" />
                Notificações
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 border-none" align="start">
              <NotificationsPopup />
            </PopoverContent>
          </Popover>

          {legalItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                'hover:bg-zinc-800/50 hover:text-white hover:translate-x-1',
                pathname === item.href ? 'bg-zinc-800/50 text-white' : 'text-zinc-400'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          ))}

          <Button
            variant="ghost"
            className="w-full justify-start text-zinc-400 hover:bg-zinc-800/50 hover:text-white transition-all duration-200 hover:translate-x-1"
            onClick={handleSignOut}
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>
    </aside>
  );
}
