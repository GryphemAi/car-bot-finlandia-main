import { Metadata } from 'next';
import HomeView from '../_components/home-view';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard principal do sistema.'
};

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/signin');
  }

  return <HomeView />;
}
