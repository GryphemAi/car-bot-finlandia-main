import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CarBoard - Login',
  description: 'Acesse o sistema de gestão de frotas',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {children}
    </div>
  );
}
