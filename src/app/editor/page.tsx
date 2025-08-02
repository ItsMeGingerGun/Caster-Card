'use client';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import StatBadge from '../components/StatBadge';
import { ScoreRadial } from '../components/ScoreRadial';
import { saveAs } from 'file-saver';
import { sdk } from '@farcaster/miniapp-sdk';

export default function EditorPage() {
  const { user, loading } = useAuth();
  const [themeConfig, setThemeConfig] = useState({
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    accentColor: '#8b5cf6',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateCard = async () => {
    if (!user) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-card', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userData: {
            pfpUrl: user.pfpUrl,
            username: user.username,
            bio: user.bio || '',
            casts: user.casts,
            replies: user.replies,
            followers: user.followers,
            following: user.following,
            score: user.score,
          },
          themeConfig
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate card');
      }

      const imageBlob = await response.blob();
      
      // Update canvas preview
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        const img = new Image();
        img.onload = () => {
          if (ctx && canvasRef.current) {
            canvasRef.current.width = img.width;
            canvasRef.current.height = img.height;
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(img, 0, 0);
          }
          setIsGenerating(false);
        };
        img.src = URL.createObjectURL(imageBlob);
      }
    } catch (error) {
      console.error('Card generation error:', error);
      setIsGenerating(false);
    }
  };

  const downloadCard = () => {
    if (canvasRef.current) {
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `caster-card-${user?.username || 'user'}.png`);
        }
      }, 'image/png');
    }
  };

  const shareToWarpcast = async () => {
    if (!user) return;

    try {
      await sdk.actions.cast({
        text: `Check out my Farcaster stats! Made with @castercard`,
        embeds: [
          {
            url: `${window.location.origin}/api/card-image?fid=${user.fid}`,
          },
        ],
      });
      alert('Shared to Warpcast successfully!');
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('Failed to share to Warpcast');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Caster Card Editor</h1>
        <p className="text-gray-300 mb-8">Sign in to create your card</p>
        <button 
          onClick={() => sdk.actions.redirect()}
          className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-medium"
        >
          Sign in with Farcaster
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            🃏 Caster Card Editor
          </h1>
          <div className="flex items-center">
            <img 
              src={user.pfpUrl} 
              alt={user.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-300">@{user.username}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Stats Selection */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatBadge icon="✍️" value={user.casts} label="Casts" />
              <StatBadge icon="💬" value={user.replies} label="Replies" />
              <StatBadge icon="👥" value={user.followers} label="Followers" />
              <StatBadge icon="👀" value={user.following} label="Following" />
            </div>
            <div className="mt-6 flex justify-center">
              <ScoreRadial score={user.score} />
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <p>Member since: {new Date(user.registeredAt).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Center Panel: Card Preview */}
          <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Card Preview</h2>
            <div className="w-full max-w-md border-2 border-gray-700 rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef} 
                className="w-full"
                style={{ backgroundColor: themeConfig.backgroundColor }}
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button 
                onClick={generateCard}
                disabled={isGenerating}
                className={`px-5 py-2 rounded-lg font-medium ${
                  isGenerating 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Update Preview'}
              </button>
              <button 
                onClick={downloadCard}
                className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-medium"
              >
                Download
              </button>
              <button 
                onClick={shareToWarpcast}
                className="px-5 py-2 bg-green-600 rounded-lg hover:bg-green-700 font-medium"
              >
                Share to Warpcast
              </button>
            </div>
          </div>

          {/* Right Panel: Theme Customizer */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Customize Theme</h2>
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-gray-300">Background Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={themeConfig.backgroundColor}
                    onChange={(e) => setThemeConfig({...themeConfig, backgroundColor: e.target.value})}
                    className="w-12 h-12 cursor-pointer"
                  />
                  <span className="text-gray-400">{themeConfig.backgroundColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-gray-300">Text Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={themeConfig.textColor}
                    onChange={(e) => setThemeConfig({...themeConfig, textColor: e.target.value})}
                    className="w-12 h-12 cursor-pointer"
                  />
                  <span className="text-gray-400">{themeConfig.textColor}</span>
                </div>
              </div>
              
              <div>
                <label className="block mb-2 text-gray-300">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={themeConfig.accentColor}
                    onChange={(e) => setThemeConfig({...themeConfig, accentColor: e.target.value})}
                    className="w-12 h-12 cursor-pointer"
                  />
                  <span className="text-gray-400">{themeConfig.accentColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
