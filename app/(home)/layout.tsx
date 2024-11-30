import AppTopbar from '@/components/layout/app-topbar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Autoshop - Home',
  description: 'Selling cars market - Home'
};

export default function HomeLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppTopbar>{children}</AppTopbar>
    </>
  );
}
