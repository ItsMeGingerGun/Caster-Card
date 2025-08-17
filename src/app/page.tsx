'use client';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion } from 'framer-motion';
import Particles from '@/components/Particles';

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
      <div className="loading-overlay min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-pink-700">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section - Fixed */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 via-indigo-800 to-pink-700">
        <Particles />
        <div className="relative max-w-7xl mx-auto text-center z-20"> {/* Increased z-index */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent">
              Showcase Your
            </span>
            <span className="block bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mt-2">
              Farcaster Stats
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10"
          >
            Create beautiful digital profile cards to share your Farcaster achievements across the web
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={handleQuickAuth}
              className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-lg text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 hover:from-yellow-500 hover:to-pink-600"
            >
              Create Your Card
            </button>
            <button 
              onClick={handleScrollToFeatures}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg text-white font-bold text-lg shadow-lg hover:bg-white/20 transition-all border border-white/20"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Your Stats in Style</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Beautiful cards that showcase your Farcaster achievements
            </p>
          </div>
          
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-4xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-cyan-800/30 to-purple-800/30 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-cyan-500/30">
                <div className="p-1">
                  <div className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="bg-gradient-to-br from-cyan-400 to-purple-500 p-1 rounded-full mb-6 md:mb-0 md:mr-6">
                        <div className="bg-gray-800 rounded-full p-1">
                          <div className="bg-gray-200 border-2 border-dashed rounded-full w-24 h-24" />
                        </div>
                      </div>
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-1 bg-gradient-to-r from-cyan-300 to-purple-400 bg-clip-text text-transparent">@farcaster_user</h3>
                        <p className="text-cyan-200 mb-4">Building the future of social media</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6">
                          <div className="text-center bg-gradient-to-br from-cyan-800/40 to-purple-800/40 rounded-xl p-3 min-w-[100px]">
                            <p className="text-2xl font-bold text-white">1.2K</p>
                            <p className="text-cyan-200 text-sm">Casts</p>
                          </div>
                          <div className="text-center bg-gradient-to-br from-cyan-800/40 to-purple-800/40 rounded-xl p-3 min-w-[100px]">
                            <p className="text-2xl font-bold text-white">4.5K</p>
                            <p className="text-cyan-200 text-sm">Followers</p>
                          </div>
                          <div className="text-center bg-gradient-to-br from-cyan-800/40 to-purple-800/40 rounded-xl p-3 min-w-[100px]">
                            <p className="text-2xl font-bold text-white">98</p>
                            <p className="text-cyan-200 text-sm">Following</p>
                          </div>
                          <div className="text-center bg-gradient-to-br from-cyan-800/40 to-purple-800/40 rounded-xl p-3 min-w-[100px]">
                            <p className="text-2xl font-bold text-white">87</p>
                            <p className="text-cyan-200 text-sm">Score</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900/20 to-fuchsia-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose Caster Card?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Beautiful, shareable profile cards for the Farcaster community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Stunning Designs", 
                description: "Pre-built templates with beautiful gradients and animations",
                icon: "🎨",
                color: "from-amber-500/20 to-amber-700/20"
              },
              { 
                title: "Rich Statistics", 
                description: "Display your casts, followers, replies and engagement score",
                icon: "📊",
                color: "from-emerald-500/20 to-emerald-700/20"
              },
              { 
                title: "Easy Sharing", 
                description: "Share directly to Warpcast or download as an image",
                icon: "📤",
                color: "from-cyan-500/20 to-cyan-700/20"
              },
              { 
                title: "Custom Themes", 
                description: "Personalize colors to match your personal brand",
                icon: "🎨",
                color: "from-violet-500/20 to-violet-700/20"
              },
              { 
                title: "Always Free", 
                description: "No hidden fees or premium tiers",
                icon: "🎁",
                color: "from-rose-500/20 to-rose-700/20"
              },
              { 
                title: "Open Source", 
                description: "Transparent code you can contribute to",
                icon: "🔓",
                color: "from-indigo-500/20 to-indigo-700/20"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-gradient-to-br ${feature.color} backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all hover:shadow-xl`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">How It Works</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Create your Farcaster card in just 3 simple steps
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {[
              { step: "1", title: "Connect", description: "Sign in with your Farcaster account", color: "from-amber-500 to-amber-600" },
              { step: "2", title: "Customize", description: "Choose your theme and stats", color: "from-emerald-500 to-emerald-600" },
              { step: "3", title: "Share", description: "Post to Warpcast or download", color: "from-cyan-500 to-cyan-600" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 text-center border border-white/10 backdrop-blur-sm"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/40 to-pink-900/40">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Create Your Card?</h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join thousands of Farcaster users showcasing their stats with beautiful cards
          </p>
          <button
            onClick={handleQuickAuth}
            className="px-10 py-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl text-white font-bold text-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-gradient-to-b from-slate-900/80 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🃏</span>
                <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Caster Card
                </span>
              </div>
              <p className="text-white/60 mt-2">Showcase your Farcaster stats in style</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
          
          <div className="mt-10 text-center text-white/60 text-sm">
            <p>© {new Date().getFullYear()} Caster Card. Not affiliated with Farcaster or Warpcast.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
