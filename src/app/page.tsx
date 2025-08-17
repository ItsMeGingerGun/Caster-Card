'use client';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickAuth = async () => {
    try {
      await sdk.experimental.quickAuth();
    } catch (error) {
      console.error('Sign in failed:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="py-4 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-purple-400">Caster Card</span>
          </div>
          <button 
            onClick={handleQuickAuth}
            className="px-4 py-2 bg-purple-600 rounded font-medium"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            <div className="text-purple-400">Showcase Your</div>
            <div className="text-blue-400 mt-2">Farcaster Stats</div>
          </h1>
          
          <p className="text-lg text-gray-300 mb-8">
            Create profile cards to share your Farcaster achievements
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleQuickAuth}
              className="px-6 py-3 bg-purple-600 rounded font-bold"
            >
              Create Your Card
            </button>
            <button 
              onClick={handleScrollToFeatures}
              className="px-6 py-3 bg-gray-800 rounded font-bold"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Your Stats in Style</h2>
            <p className="text-gray-300">
              Showcase your Farcaster achievements
            </p>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="bg-gray-200 rounded-full w-24 h-24" />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  @farcaster_user
                </h3>
                <p className="text-blue-300 mb-4">Building social media</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-600 rounded p-3 text-center">
                    <p className="font-bold">1.2K</p>
                    <p className="text-sm text-purple-300">Casts</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3 text-center">
                    <p className="font-bold">4.5K</p>
                    <p className="text-sm text-purple-300">Followers</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3 text-center">
                    <p className="font-bold">98</p>
                    <p className="text-sm text-purple-300">Following</p>
                  </div>
                  <div className="bg-gray-600 rounded p-3 text-center">
                    <p className="font-bold">87</p>
                    <p className="text-sm text-purple-300">Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Why Choose Caster Card?</h2>
            <p className="text-gray-300">
              Create profile cards with ease
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { 
                title: "Beautiful Designs", 
                description: "Pre-built templates with styling",
              },
              { 
                title: "Rich Statistics", 
                description: "Showcase your Farcaster metrics",
              },
              { 
                title: "Easy Sharing", 
                description: "Share to Warpcast or download",
              },
              { 
                title: "Custom Themes", 
                description: "Personalize your card",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-300">
              Create your card in 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                step: "1", 
                title: "Connect", 
                description: "Sign in with Farcaster",
              },
              { 
                step: "2", 
                title: "Customize", 
                description: "Choose your theme",
              },
              { 
                step: "3", 
                title: "Share", 
                description: "Post or download",
              }
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-700 rounded-lg p-6 text-center"
              >
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Create Your Card?</h2>
          <p className="text-gray-300 mb-6">
            Join Farcaster users showcasing their stats
          </p>
          <button
            onClick={handleQuickAuth}
            className="px-8 py-3 bg-purple-600 rounded font-bold"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4">
            <span className="font-bold text-purple-400">Caster Card</span>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-white">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-white">
              GitHub
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Caster Card. Not affiliated with Farcaster or Warpcast.
          </p>
        </div>
      </footer>
    </div>
  );
}
