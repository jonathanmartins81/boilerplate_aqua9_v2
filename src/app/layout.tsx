import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Boilerplate Aqua9 - Next.js Profissional',
  description:
    'Template Next.js profissional da Aqua9 com TypeScript, SEO otimizado e ferramentas de qualidade de código',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR' className='scroll-smooth'>
      <body className={`${inter.className} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
