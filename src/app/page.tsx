'use client';
import { useAuth } from './lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/editor');
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      {/* ... existing UI code ... */}
      <div className="mb-8 flex justify-center">
        <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6">
          <p className="text-gray-300 mb-4">Connect to Farcaster to create your card</p>
          <button 
            onClick={() => sdk.actions.redirect()}
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium"
          >
            Sign in with Farcaster
          </button>
        </div>
      </div>
      {/* ... rest of existing UI ... */}
    </main>
  );
}
