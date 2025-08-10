import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from './lib/AuthContext';

// Initialize Inter font with proper subsets
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Caster Card - Farcaster Stats Profile',
  description: 'Create and share your Farcaster stats with a beautiful digital profile card',
};

export const viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Preload font to avoid FOUT */}
        <link
          rel="preload"
          href={inter.variable}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-black`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
