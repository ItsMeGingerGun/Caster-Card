'use client';
import { useEffect, useState } from 'react';
import { useAuth } from './lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize Farcaster SDK and manifest connection
  useEffect(() => {
    const initializeSdk = async () => {
      try {
        // Set configuration directly on sdk.config
        sdk.config = {
          version: "1.0.0",
          button: { color: "purple", variant: "primary" },
          theme: "dark",
          logo: "https://caster-card.vercel.app/icon-512.png"
        };
        
        // Notify client that app is ready
        await sdk.actions.ready();
        setIsInitialized(true);
      } catch (error) {
        console.error('Farcaster SDK initialization failed:', error);
      }
    };

    initializeSdk();
  }, []);

  useEffect(() => {
    if (user) {
      router.push('/editor');
    }
  }, [user, router]);

  const handleLogin = async () => {
    try {
      const { token } = await sdk.quickAuth.getToken();
      console.log('Farcaster auth token:', token);
      // Here you would typically send the token to your backend
    } catch (error) {
      console.error('Farcaster authentication failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin-slow rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center max-w-2xl w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
          🃏 Caster Card
        </h1>
        <p className="text-xl text-gray-300 mb-10 animate-fade-in [animation-delay:200ms] opacity-0">
          Create and share your Farcaster stats with a beautiful digital profile card
        </p>
        
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700 animate-fade-in [animation-delay:400ms] opacity-0">
          <div className="mb-8 flex justify-center animate-fade-in [animation-delay:600ms] opacity-0">
            <div 
              className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-xl overflow-hidden w-64 h-32 flex items-center p-4 hover-scale"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className={`bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4 transition-all duration-500 ${isHovered ? 'transform rotate-12' : ''}`} />
              <div>
                <div className={`h-4 bg-gray-300 rounded w-24 mb-2 transition-all duration-500 ${isHovered ? 'w-32' : ''}`}></div>
                <div className="h-3 bg-gray-400 rounded w-32"></div>
              </div>
            </div>
          </div>
          
          <div className="mb-8 flex justify-center animate-fade-in [animation-delay:800ms] opacity-0">
            <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 w-full max-w-xs">
              <p className="text-gray-300 mb-4">Connect to Farcaster to create your card</p>
              <button 
                onClick={handleLogin}
                disabled={!isInitialized}
                className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium animate-pulse-slow glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isInitialized ? 'Sign in with Farcaster' : 'Initializing...'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in [animation-delay:1000ms] opacity-0">
            <div className="bg-gray-700 p-4 rounded-lg hover-scale glow">
              <div className="text-3xl mb-2 hover:scale-110 transition-transform">✨</div>
              <div className="text-sm">Custom Cards</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg hover-scale glow">
              <div className="text-3xl mb-2 hover:scale-110 transition-transform">📊</div>
              <div className="text-sm">Rich Stats</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg hover-scale glow">
              <div className="text-3xl mb-2 hover:scale-110 transition-transform">🔗</div>
              <div className="text-sm">Easy Sharing</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg hover-scale glow">
              <div className="text-3xl mb-2 hover:scale-110 transition-transform">🎨</div>
              <div className="text-sm">Themes</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400 animate-fade-in [animation-delay:1200ms] opacity-0">
            <p>Connect your Farcaster account to get started</p>
            <p className="mt-2">
              By using Caster Card, you agree to our{' '}
              <Link href="#" className="text-purple-400 hover:underline hover:text-purple-300">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
        
        <footer className="mt-12 text-gray-500 text-sm animate-fade-in [animation-delay:1400ms] opacity-0">
          <p>Open source project. Contribute on <Link href="#" className="text-indigo-400 hover:underline hover:text-indigo-300">GitHub</Link></p>
        </footer>
      </div>
    </main>
  );
}
