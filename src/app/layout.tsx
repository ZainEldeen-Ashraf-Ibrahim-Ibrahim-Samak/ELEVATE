import type { Metadata } from 'next';
import { Anton, Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import './globals.css';
import { Providers } from './providers';
import { clientEnv } from '@/core/env/client';
import { serverEnv } from '@/core/env/server';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(serverEnv.siteUrl),
  title: `${clientEnv.appName} — Coaching Platform`,
  description:
    'Real trainers, daily adaptive plans, and workouts + meals sent straight to your phone.',
  icons: { icon: '/assets/elevate-wordmark.png' },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${anton.variable} ${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
