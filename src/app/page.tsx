'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from './lib/AuthContext';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      router.push('/editor');
    }
  }, [user, router]);

  // Only show loading spinner if not mounted yet
  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fadeIn">
          🃏 Caster Card
        </h1>
        <p className="text-xl text-gray-300 mb-10 animate-fadeIn delay-100">
          Create and share your Farcaster stats with a beautiful digital profile card
        </p>
        
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700 animate-fadeIn delay-200">
          <div className="mb-8 flex justify-center animate-fadeIn delay-300">
            <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-xl overflow-hidden w-64 h-32 flex items-center p-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4 animate-pulse" />
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2 animate-pulse"></div>
                <div className="h-3 bg-gray-400 rounded w-32 animate-pulse"></div>
              </div>
            </div>
          </div>
          
          <div className="mb-8 flex justify-center">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 w-full max-w-xs">
              <p className="text-gray-300 mb-4">Sign in to create your card</p>
              <button 
                onClick={async () => {
                  try {
                    await sdk.experimental.quickAuth();
                  } catch (error) {
                    console.error('Sign in failed:', error);
                    alert('Failed to sign in. Please try again.');
                  }
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-medium transition-all duration-300 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02]"
              >
                Sign in with Farcaster
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: '✨', text: 'Custom Cards' },
              { icon: '📊', text: 'Rich Stats' },
              { icon: '🔗', text: 'Easy Sharing' },
              { icon: '🎨', text: 'Themes' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-700 p-4 rounded-lg transition-transform hover:scale-105 hover:bg-gray-600/50"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-sm">{feature.text}</div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-gray-400">
            <p>By using Caster Card, you agree to our{' '}
              <Link href="#" className="text-purple-400 hover:underline hover:text-purple-300">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
        
        <footer className="mt-12 text-gray-500 text-sm">
          <p>Open source project. Contribute on{' '}
            <Link href="#" className="text-indigo-400 hover:underline hover:text-indigo-300">
              GitHub
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
