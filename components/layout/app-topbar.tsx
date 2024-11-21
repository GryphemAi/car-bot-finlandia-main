'use client';
import { GalleryVerticalEnd } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
import { UserNav } from './user-nav';

export const company = {
  name: 'Auto Shop',
  logo: GalleryVerticalEnd
};

export default function AppTopbar({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="flex h-screen flex-col">
      <header className="flex h-16 items-center justify-between bg-gray-200 px-2">
        <div className="flex items-center gap-2 py-2 text-sidebar-accent-foreground"></div>
        <div className="flex items-center gap-4">
          {session?.user ? (
            <UserNav />
          ) : (
            <>
              <Link href="/signin" className="text-sm">
                Login
              </Link>
              <Link href="/signup" className="text-sm">
                Registro
              </Link>
            </>
          )}
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
