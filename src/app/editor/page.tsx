'use client';
import { useEffect, useState, useRef } from 'react';
import { useProfile } from '@farcaster/auth-kit';
import AuthButton from '../components/AuthButton';
import StatBadge from '../components/StatBadge';
import { ScoreRadial } from '../components/ScoreRadial';
import { generateCardImage } from '../lib/cardRenderer';
import { saveAs } from 'file-saver';
import { Warpcast } from 'warpcast';

export default function EditorPage() {
  const { profile, isAuthenticated } = useProfile();
  const [userData, setUserData] = useState<any>(null);
  const [themeConfig, setThemeConfig] = useState({
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    accentColor: '#8b5cf6',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  useEffect(() => {
    if (isAuthenticated && profile?.fid) {
      fetchUserData(profile.fid);
      loadTemplates();
    }
  }, [isAuthenticated, profile]);

  const fetchUserData = async (fid: number) => {
    if (!profile?.signature || !profile?.signer || !profile?.message) return;
    
    try {
      const response = await fetch('/api/user-stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fid,
          message: profile.message,
          signature: profile.signature,
          address: profile.signer
        }),
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
    }
  };

  const loadTemplates = async () => {
    if (!profile?.fid) return;
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  const generateCard = async () => {
    if (!userData) return;
    
    setIsGenerating(true);
    try {
      const imageBlob = await generateCardImage(userData, themeConfig);
      
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
        img.src = URL.createObjectURL(new Blob([imageBlob], { type: 'image/png' }));
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
          saveAs(blob, `caster-card-${userData?.username || 'user'}.png`);
        }
      }, 'image/png');
    }
  };

  const shareToWarpcast = async () => {
    if (!userData || !profile) return;

    try {
      const warpcast = new Warpcast();
      await warpcast.composeCast({
        text: `Check out my Farcaster stats! Made with @castercard`,
        embeds: [
          {
            url: `${window.location.origin}/api/card-image?fid=${userData.fid}`,
          },
        ],
      });
      alert('Shared to Warpcast successfully!');
    } catch (error) {
      console.error('Sharing failed:', error);
      alert('Failed to share to Warpcast');
    }
  };

  const handleSaveTemplate = async () => {
    if (!profile?.fid) return;
    
    setIsSavingTemplate(true);
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          theme_config: JSON.stringify(themeConfig),
          is_public: false,
        }),
      });
      
      const { id } = await response.json();
      await loadTemplates();
      setSelectedTemplate(id);
      
      setIsSavingTemplate(false);
    } catch (error) {
      console.error('Template save error:', error);
      setIsSavingTemplate(false);
    }
  };

  const handleLoadTemplate = async (templateId: string) => {
    try {
      const response = await fetch(`/api/templates?id=${templateId}`);
      const template = await response.json();
      
      if (template) {
        setThemeConfig(JSON.parse(template.theme_config));
        setSelectedTemplate(templateId);
      }
    } catch (error) {
      console.error('Template load error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-6">Caster Card Editor</h1>
        <p className="text-gray-300 mb-8">Sign in to create your card</p>
        <AuthButton />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
              src={userData.pfpUrl} 
              alt={userData.username}
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="text-gray-300">@{userData.username}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel: Stats Selection */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <StatBadge icon="✍️" value={userData.casts} label="Casts" />
              <StatBadge icon="💬" value={userData.replies} label="Replies" />
              <StatBadge icon="👥" value={userData.followers} label="Followers" />
              <StatBadge icon="👀" value={userData.following} label="Following" />
            </div>
            <div className="mt-6 flex justify-center">
              <ScoreRadial score={userData.score} />
            </div>
            <div className="mt-6 text-sm text-gray-400">
              <p>Member since: {new Date(userData.registeredAt).toLocaleDateString()}</p>
            </div>

            {/* Template Selection */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Your Templates</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {templates.length === 0 ? (
                  <p className="text-gray-400 text-sm">No templates saved yet</p>
                ) : (
                  templates.map(template => (
                    <div 
                      key={template.id}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedTemplate === template.id 
                          ? 'bg-indigo-900 border border-indigo-500' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                      onClick={() => handleLoadTemplate(template.id)}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm truncate">
                          Template {new Date(template.created_at).toLocaleDateString()}
                        </span>
                        {template.is_public && (
                          <span className="text-xs bg-green-800 text-green-200 px-2 py-1 rounded">
                            Public
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
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
              
              <div className="pt-4 border-t border-gray-700">
                <button 
                  onClick={handleSaveTemplate}
                  disabled={isSavingTemplate}
                  className={`w-full py-3 rounded-lg font-medium ${
                    isSavingTemplate
                      ? 'bg-gray-700 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isSavingTemplate ? 'Saving...' : 'Save as Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
