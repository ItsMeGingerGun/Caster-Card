import AuthButton from './components/AuthButton';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          🃏 Caster Card
        </h1>
        <p className="text-xl text-gray-300 mb-10">
          Create and share your Farcaster stats with a beautiful digital profile card
        </p>
        
        <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-xl overflow-hidden w-64 h-32 flex items-center p-4">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-4" />
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-400 rounded w-32"></div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <AuthButton />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-gray-700 p-4 rounded-lg transition-transform hover:scale-105">
              <div className="text-3xl mb-2">✨</div>
              <div className="text-sm">Custom Cards</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transition-transform hover:scale-105">
              <div className="text-3xl mb-2">📊</div>
              <div className="text-sm">Rich Stats</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transition-transform hover:scale-105">
              <div className="text-3xl mb-2">🔗</div>
              <div className="text-sm">Easy Sharing</div>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg transition-transform hover:scale-105">
              <div className="text-3xl mb-2">🎨</div>
              <div className="text-sm">Themes</div>
            </div>
          </div>
          
          <div className="text-sm text-gray-400">
            <p>Connect your Farcaster account to get started</p>
            <p className="mt-2">
              By using Caster Card, you agree to our{' '}
              <Link href="#" className="text-purple-400 hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
        
        <footer className="mt-12 text-gray-500 text-sm">
          <p>Open source project. Contribute on <Link href="#" className="text-indigo-400 hover:underline">GitHub</Link></p>
        </footer>
      </div>
    </main>
  );
}
