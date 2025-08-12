'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-900 rounded-full mix-blend-soft-light filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
          >
            <span className="block bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">
              Showcase Your
            </span>
            <span className="block bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mt-2">
              Farcaster Stats
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
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
              onClick={async () => {
                try {
                  await sdk.experimental.quickAuth();
                } catch (error) {
                  console.error('Sign in failed:', error);
                  alert('Failed to sign in. Please try again.');
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-bold text-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
            >
              Create Your Card
            </button>
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('features')!.offsetTop, behavior: 'smooth' })}
              className="px-8 py-4 bg-gray-800 rounded-lg text-white font-bold text-lg shadow-lg hover:bg-gray-700 transition-all"
            >
              Learn More
            </button>
          </motion.div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="relative py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-16">
            <div className="relative w-full max-w-4xl">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                <div className="p-1">
                  <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-xl p-8">
                    <div className="flex items-center">
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mr-6" />
                      <div>
                        <h3 className="text-2xl font-bold mb-1">@farcaster_user</h3>
                        <p className="text-gray-400 mb-4">Building the future of social media</p>
                        <div className="flex gap-6">
                          <div className="text-center">
                            <p className="text-2xl font-bold">1.2K</p>
                            <p className="text-gray-400 text-sm">Casts</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">4.5K</p>
                            <p className="text-gray-400 text-sm">Followers</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">98</p>
                            <p className="text-gray-400 text-sm">Following</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold">87</p>
                            <p className="text-gray-400 text-sm">Score</p>
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
      <div id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Caster Card?</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Beautiful, shareable profile cards for the Farcaster community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Stunning Designs", 
                description: "Pre-built templates with beautiful gradients and animations",
                icon: "🎨"
              },
              { 
                title: "Rich Statistics", 
                description: "Display your casts, followers, replies and engagement score",
                icon: "📊"
              },
              { 
                title: "Easy Sharing", 
                description: "Share directly to Warpcast or download as an image",
                icon: "📤"
              },
              { 
                title: "Custom Themes", 
                description: "Personalize colors to match your personal brand",
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
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Create your Farcaster card in just 3 simple steps
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center">
            {[
              { step: "1", title: "Connect", description: "Sign in with your Farcaster account" },
              { step: "2", title: "Customize", description: "Choose your theme and stats" },
              { step: "3", title: "Share", description: "Post to Warpcast or download" }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex-1 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-gray-700"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Create Your Card?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of Farcaster users showcasing their stats with beautiful cards
          </p>
          <button
            onClick={async () => {
              try {
                await sdk.experimental.quickAuth();
              } catch (error) {
                console.error('Sign in failed:', error);
                alert('Failed to sign in. Please try again.');
              }
            }}
            className="px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl text-white font-bold text-xl shadow-xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            Get Started Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🃏</span>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Caster Card
                </span>
              </div>
              <p className="text-gray-500 mt-2">Showcase your Farcaster stats in style</p>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                GitHub
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
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
