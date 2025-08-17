'use client';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion } from 'framer-motion';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      window.scrollTo({ 
        top: featuresElement.offsetTop, 
        behavior: 'smooth' 
      });
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
      <div className="min-h-screen flex items-center justify-center bg-[#121212]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#121212] overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Showcase Your
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mt-2">
                    Farcaster Stats
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Create beautiful digital profile cards to share your Farcaster achievements across the web
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleQuickAuth}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Create Your Card
                  </button>
                  <button 
                    onClick={handleScrollToFeatures}
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-lg text-white font-bold shadow-lg hover:bg-white/20 transition-all border border-white/20"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full lg:w-1/2"
            >
              <div className="bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-blue-900/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center">
                  <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-1 rounded-full mb-6">
                    <div className="bg-gray-800 rounded-full p-1">
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32" />
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">@farcaster_user</h3>
                    <p className="text-blue-300 mb-6">Building the future of social media</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      <div className="text-center bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-4">
                        <p className="text-xl font-bold text-white">1.2K</p>
                        <p className="text-purple-300 text-sm">Casts</p>
                      </div>
                      <div className="text-center bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-4">
                        <p className="text-xl font-bold text-white">4.5K</p>
                        <p className="text-purple-300 text-sm">Followers</p>
                      </div>
                      <div className="text-center bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-4">
                        <p className="text-xl font-bold text-white">98</p>
                        <p className="text-purple-300 text-sm">Following</p>
                      </div>
                      <div className="text-center bg-gradient-to-br from-purple-800/40 to-blue-800/40 rounded-xl p-4">
                        <p className="text-xl font-bold text-white">87</p>
                        <p className="text-purple-300 text-sm">Score</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Caster Card?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Beautiful, shareable profile cards for the Farcaster community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Stunning Designs", 
                description: "Pre-built templates with beautiful gradients and animations",
                icon: "🎨",
                color: "from-purple-900/30 to-blue-900/30"
              },
              { 
                title: "Rich Statistics", 
                description: "Display your casts, followers, replies and engagement score",
                icon: "📊",
                color: "from-purple-900/30 to-blue-900/30"
              },
              { 
                title: "Easy Sharing", 
                description: "Share directly to Warpcast or download as an image",
                icon: "📤",
                color: "from-purple-900/30 to-blue-900/30"
              },
              { 
                title: "Custom Themes", 
                description: "Personalize colors to match your personal brand",
                icon: "🎨",
                color: "from-purple-900/30 to-blue-900/30"
              },
              { 
                title: "Always Free", 
                description: "No hidden fees or premium tiers",
                icon: "🎁",
                color: "from-purple-900/30 to-blue-900/30"
              },
              { 
                title: "Open Source", 
                description: "Transparent code you can contribute to",
                icon: "🔓",
                color: "from-purple-900/30 to-blue-900/30"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-lg`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Create your Farcaster card in just 3 simple steps
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
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
                color: "from-purple-600 to-blue-600" 
              },
              { 
                step: "3", 
                title: "Share", 
                description: "Post to Warpcast or download", 
                color: "from-purple-600 to-blue-600" 
              }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-2xl p-8 text-center border border-white/10 shadow-lg"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-xl rounded-3xl p-12 border border-white/10 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Create Your Card?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of Farcaster users showcasing their stats with beautiful cards
            </p>
            <button
              onClick={handleQuickAuth}
              className="px-10 py-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🃏</span>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Caster Card
                </span>
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
