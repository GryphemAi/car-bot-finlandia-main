'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import Navbar from '@/components/layout/navbar';

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
