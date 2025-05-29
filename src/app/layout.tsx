import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GrantForge.cloud - Find and Apply for Grants',
  description: 'Discover and apply for grants with AI-powered assistance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
} 