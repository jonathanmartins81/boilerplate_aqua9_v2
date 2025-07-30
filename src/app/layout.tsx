import { JsonLd } from '@/components/JsonLd';
import { generateDynamicSEO } from '@/utils/SEO';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';



export const metadata: Metadata = generateDynamicSEO('/');

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans">
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
