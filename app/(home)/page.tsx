import { Metadata } from 'next';
import HomeView from './_components/home-view';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Homepage',
  description: 'Selling cars homepage.'
};

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/signin');
  }

  return <HomeView />;
}
