import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FarcasterAuthProvider } from './lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Caster Card - Farcaster Stats Profile',
  description: 'Create and share your Farcaster stats with a beautiful digital profile card',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <FarcasterAuthProvider>
          {children}
        </FarcasterAuthProvider>
      </body>
    </html>
  );
}
