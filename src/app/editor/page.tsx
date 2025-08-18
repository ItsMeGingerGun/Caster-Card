'use client';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../lib/AuthContext';
import StatBadge from '../components/StatBadge';
import { ScoreRadial } from '../components/ScoreRadial';
import { saveAs } from 'file-saver';
import { sdk } from '@farcaster/miniapp-sdk';

export default function EditorPage() {
  const { user, loading, token } = useAuth();
  const [themeConfig, setThemeConfig] = useState({
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    accentColor: '#8b5cf6',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [appContext, setAppContext] = useState<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        
        await sdk.actions.ready();
        
        const context = await sdk.context;
        if (context?.location) {
          setAppContext(context.location);
        }
      } catch (error) {
        console.error('Failed to fetch Farcaster context:', error);
      }
    };
    
    initialize();
  }, []);

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
            fid: user.fid,
            username: user.username,
            displayName: user.displayName,
            pfpUrl: user.pfpUrl,
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
      if (canvasRef.current && imageBlob) {
        const ctx = canvasRef.current.getContext('2d');
        const img = new Image();
        img.onload = () => {
          if (ctx && canvasRef.current) {
            // Set fixed dimensions
            canvasRef.current.width = 800;
            canvasRef.current.height = 400;
            ctx.clearRect(0, 0, 800, 400);
            ctx.drawImage(img, 0, 0, 800, 400);
          }
          setIsGenerating(false);
        };
        img.src = URL.createObjectURL(imageBlob);
      }
    } catch (error) {
      console.error('Card generation error:', error);
      alert('Failed to generate card preview. Please try again.');
      setIsGenerating(false);
    }
  };

  const downloadCard = () => {
    if (canvasRef.current) {
      try {
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            saveAs(blob, `caster-card-${user?.username || 'user'}.png`);
          } else {
            throw new Error('Failed to create card image');
          }
        }, 'image/png');
      } catch (error) {
        console.error('Download failed:', error);
        alert('Failed to download card. Please try again.');
      }
    }
  };

  const shareToWarpcast = async () => {
    if (!user || !token) return;

    setIsSharing(true);
    try {
      let shareText = `Check out my Farcaster stats! Made with @castercard`;
      
      // Add context if available
      if (appContext?.type === "cast_embed" && appContext.cast?.author?.username) {
        shareText = `Replying to @${appContext.cast.author.username}: Check out my Farcaster stats!`;
      } else if (appContext?.type === "cast_share" && appContext.cast?.author?.username) {
        shareText = `Sharing my stats with @${appContext.cast.author.username}!`;
      }

      const result = await sdk.actions.composeCast({
        text: shareText,
        embeds: [
          `${window.location.origin}/api/frame?fid=${user.fid}`
        ],
      });
      
      if (result?.cast) {
        alert('Shared to Farcaster successfully!');
      } else {
        alert('Cast was not shared');
      }
    } catch (error) {
      console.error('Sharing failed:', error);
      alert(`Failed to share to Farcaster: ${(error as Error).message}`);
    } finally {
      setIsSharing(false);
    }
  };

  useEffect(() => {
    // Initialize canvas with default background
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        canvasRef.current.width = 800;
        canvasRef.current.height = 400;
        ctx.fillStyle = themeConfig.backgroundColor;
        ctx.fillRect(0, 0, 800, 400);
      }
    }
  }, [themeConfig.backgroundColor]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-black">
        <h1 className="text-3xl font-bold mb-6 text-white">Caster Card Editor</h1>
        <p className="text-gray-300 mb-8">Sign in to create your card</p>
        <button 
          onClick={async () => {
            try {
              await sdk.experimental.quickAuth();
            } catch (error) {
              console.error('Sign in failed:', error);
              alert('Failed to sign in. Please try again.');
            }
          }}
          className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-medium text-white"
        >
          Sign in with Farcaster
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
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
            <div>
              <span className="text-gray-300 block">{user.displayName}</span>
              <span className="text-gray-500 text-sm">@{user.username}</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Stats Selection */}
          <div className="bg-gray-800/70 backdrop-blur rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatBadge icon="✍️" value={user.casts} label="Casts" />
              <StatBadge icon="💬" value={user.replies} label="Replies" />
              <StatBadge icon="👥" value={user.followers} label="Followers" />
              <StatBadge icon="👀" value={user.following} label="Following" />
            </div>
            <div className="mt-6 flex justify-center">
              <ScoreRadial score={user.score} />
            </div>
          </div>

          {/* Center Panel: Card Preview */}
          <div className="bg-gray-800/70 backdrop-blur rounded-xl p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4 text-white">Card Preview</h2>
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
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                {isGenerating ? 'Generating...' : 'Update Preview'}
              </button>
              <button 
                onClick={downloadCard}
                className="px-5 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 font-medium text-white"
              >
                Download
              </button>
              <button 
                onClick={shareToWarpcast}
                disabled={isSharing}
                className={`px-5 py-2 rounded-lg font-medium ${
                  isSharing 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSharing ? 'Sharing...' : 'Share to Warpcast'}
              </button>
            </div>
          </div>

          {/* Right Panel: Theme Customizer */}
          <div className="bg-gray-800/70 backdrop-blur rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Customize Theme</h2>
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
