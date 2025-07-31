'use client';
import { useEffect, useState, useRef } from 'react';
import { useProfile } from '@farcaster/auth-kit';
import AuthButton from '../components/AuthButton';
import StatBadge from '../components/StatBadge';
import { ScoreRadial } from '../components/ScoreRadial';
import { generateCardImage } from '../lib/cardRenderer';
import { saveAs } from 'file-saver';
import { Warpcast } from 'warpcast';

// ... existing imports ...
import { 
  saveTemplate as saveTemplateToRedis,
  getUserTemplates
} from '../lib/redis';

export default function EditorPage() {
  // ... existing state ...
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);

  // Load user templates
  useEffect(() => {
    if (isAuthenticated && profile?.fid) {
      loadTemplates();
    }
  }, [isAuthenticated, profile]);

  const loadTemplates = async () => {
    try {
      const response = await fetch('/api/templates');
      const data = await response.json();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
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
          theme_config: themeConfig,
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

  // ... existing JSX ...

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      {/* ... existing header ... */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Stats Selection */}
        <div className="bg-gray-800 rounded-xl p-6">
          {/* ... existing stats ... */}
          
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

        {/* ... center and right panels ... */}

        {/* Right Panel: Theme Customizer */}
        <div className="bg-gray-800 rounded-xl p-6">
          {/* ... existing theme customizer ... */}
          
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
  );
}
