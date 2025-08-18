'use client';
import { useEffect, useState } from 'react';
import { sdk, setup } from '@farcaster/miniapp-sdk';
import { motion } from 'framer-motion';
import Particles from '../components/Particles';

const testimonials = [
  {
    name: "Alice",
    handle: "alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    quote: "My engagement doubled after adding my Caster Card to my profile!"
  },
  {
    name: "Bob",
    handle: "bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    quote: "Finally a way to showcase my Farcaster journey in a beautiful format."
  },
  {
    name: "Charlie",
    handle: "charlie",
    avatar: "https://i.pravatar.cc/150?img=3",
    quote: "The customization options let me create a card that truly represents me."
  }
];

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        await setup();
        await sdk.actions.ready();
        setIsMounted(true);
      } catch (error) {
        console.error('SDK initialization failed:', error);
      }
    };

    initialize();
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <Particles />
      
      {/* Navigation */}
      <nav className="py-4 px-6 border-b border-gray-800 backdrop-blur-sm bg-black/30 relative z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🃏</span>
            <span className="text-xl font-bold text-purple-400">Caster Card</span>
          </div>
          <button 
            onClick={handleQuickAuth}
            className="px-4 py-2 bg-purple-600 rounded-md font-medium hover:bg-purple-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-size-200 animate-gradient">
              Showcase Your Farcaster Stats
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            Create beautiful profile cards to share your Farcaster achievements
            <br />across the decentralized social graph
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={handleQuickAuth}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md font-bold shadow-lg hover:shadow-xl transition-shadow"
            >
              Create Your Card
            </button>
            <button 
              onClick={handleScrollToFeatures}
              className="px-6 py-3 bg-gray-800 rounded-md font-bold hover:bg-gray-700 transition-colors"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50 backdrop-blur relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Stats in Style</h2>
            <p className="text-xl text-gray-300">
              Beautiful cards that showcase your Farcaster achievements
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-1 shadow-xl">
            <div className="bg-gray-900 rounded-xl p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1 rounded-full">
                  <div className="bg-gray-800 rounded-full p-1">
                    <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-400">
                    @farcaster_user
                  </h3>
                  <p className="text-blue-300 mb-6">Building the future of social media</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold">1.2K</p>
                      <p className="text-purple-300 text-sm">Casts</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold">4.5K</p>
                      <p className="text-purple-300 text-sm">Followers</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold">98</p>
                      <p className="text-purple-300 text-sm">Following</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 text-center">
                      <p className="text-xl font-bold">87</p>
                      <p className="text-purple-300 text-sm">Score</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Caster Card?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create stunning profile cards with ease
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Beautiful Designs", 
                description: "Pre-built templates with modern styling",
                icon: "🎨"
              },
              { 
                title: "Rich Statistics", 
                description: "Showcase your Farcaster engagement metrics",
                icon: "📊"
              },
              { 
                title: "Easy Sharing", 
                description: "Share directly to Warpcast or download",
                icon: "📤"
              },
              { 
                title: "Custom Themes", 
                description: "Personalize colors to match your style",
                icon: "🎨"
              },
              { 
                title: "Always Free", 
                description: "No hidden fees or premium tiers",
                icon: "🎁"
              },
              { 
                title: "Open Source", 
                description: "Transparent code you can contribute to",
                icon: "🔓"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-gray-800/50 backdrop-blur rounded-xl p-8 border border-gray-700"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800/50 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Loved by Farcaster Community</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of users showcasing their stats
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-900/70 backdrop-blur rounded-xl p-6 border border-purple-900/50"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-purple-400 text-sm">@{testimonial.handle}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create your Farcaster card in just 3 simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                step: "1", 
                title: "Connect", 
                description: "Sign in with your Farcaster account",
                color: "from-purple-600 to-blue-600"
              },
              { 
                step: "2", 
                title: "Customize", 
                description: "Choose your theme and stats",
                color: "from-blue-600 to-cyan-600"
              },
              { 
                step: "3", 
                title: "Share", 
                description: "Post to Warpcast or download",
                color: "from-cyan-600 to-purple-600"
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-gray-900/70 backdrop-blur rounded-xl p-8 text-center border border-gray-700"
              >
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Ready to Create Your Card?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of Farcaster users showcasing their stats
            </p>
            <button
              onClick={handleQuickAuth}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-md font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-800 bg-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🃏</span>
                <span className="text-xl font-bold text-purple-400">Caster Card</span>
              </div>
              <p className="text-gray-500 mt-2">Showcase your Farcaster stats in style</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-10 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Caster Card. Not affiliated with Farcaster or Warpcast.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
