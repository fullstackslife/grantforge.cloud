import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GrantForge - Win Grants 10x Faster with AI',
  description: 'Discover, apply, and win grants for your startup or business with our AI-powered platform.',
  keywords: 'grants, funding, startup, business, AI, grant writing, proposal generation',
  authors: [{ name: 'GrantForge' }],
  openGraph: {
    title: 'GrantForge - Win Grants 10x Faster with AI',
    description: 'Discover, apply, and win grants for your startup or business with our AI-powered platform.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Navigation />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
} 