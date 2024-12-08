import Providers from '@/components/layout/providers';
import { Toaster } from 'sonner';
import { auth } from '@/auth';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import { TranslationPersist } from '@/components/translation-persist';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CarBoard',
  description: 'Intelligent system for vehicle fleet management',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        {/* Google Translate Script */}
        <script type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" async />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false,
                  includedLanguages: 'en,fi',
                  layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT
                }, 'google_translate_element');
              }
            `
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Google Translate Element */}
        <div id="google_translate_element" className="goog-te-gadget google-translate-hidden"></div>
        <TranslationPersist />
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          {children}
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
