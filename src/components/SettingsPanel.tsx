import React from 'react';
import { X, Moon, Sun, Shield, Zap, Search } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const { settings, updateSettings } = useBrowserStore();
  
  const searchEngines = [
    { name: 'Google', url: 'https://www.google.com/search?q=' },
    { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  ];
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Moon size={16} className="mr-2" />
              Appearance
            </h3>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <label htmlFor="theme" className="text-sm">Theme</label>
                <select
                  id="theme"
                  value={settings.theme}
                  onChange={(e) => updateSettings({ theme: e.target.value as 'light' | 'dark' | 'system' })}
                  className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="parallax" className="text-sm">Parallax Effects</label>
                <input
                  type="checkbox"
                  id="parallax"
                  checked={settings.enableParallax}
                  onChange={(e) => updateSettings({ enableParallax: e.target.checked })}
                  className="h-4 w-4 text-blue-500"
                />
              </div>
            </div>
          </section>
          
          {/* Search */}
          <section>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Search size={16} className="mr-2" />
              Search
            </h3>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <label htmlFor="searchEngine" className="text-sm">Default Search Engine</label>
                <select
                  id="searchEngine"
                  value={settings.defaultSearchEngine}
                  onChange={(e) => updateSettings({ defaultSearchEngine: e.target.value })}
                  className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm"
                >
                  {searchEngines.map((engine) => (
                    <option key={engine.name} value={engine.url}>
                      {engine.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="startPage" className="text-sm">Start Page</label>
                <input
                  type="text"
                  id="startPage"
                  value={settings.startPage}
                  onChange={(e) => updateSettings({ startPage: e.target.value })}
                  className="bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 text-sm w-40"
                />
              </div>
            </div>
          </section>
          
          {/* Privacy & Security */}
          <section>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Shield size={16} className="mr-2" />
              Privacy & Security
            </h3>
            <div className="space-y-3 pl-6">
              <div className="flex items-center justify-between">
                <label htmlFor="adBlock" className="text-sm">Ad Blocker</label>
                <input
                  type="checkbox"
                  id="adBlock"
                  checked={settings.enableAdBlock}
                  onChange={(e) => updateSettings({ enableAdBlock: e.target.checked })}
                  className="h-4 w-4 text-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="trackerBlocking" className="text-sm">Tracker Blocking</label>
                <input
                  type="checkbox"
                  id="trackerBlocking"
                  checked={settings.enableTrackerBlocking}
                  onChange={(e) => updateSettings({ enableTrackerBlocking: e.target.checked })}
                  className="h-4 w-4 text-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="cookieControl" className="text-sm">Cookie Control</label>
                <input
                  type="checkbox"
                  id="cookieControl"
                  checked={settings.enableCookieControl}
                  onChange={(e) => updateSettings({ enableCookieControl: e.target.checked })}
                  className="h-4 w-4 text-blue-500"
                />
              </div>
            </div>
          </section>
          
          {/* Performance */}
          <section>
            <h3 className="text-md font-medium mb-3 flex items-center">
              <Zap size={16} className="mr-2" />
              Performance
            </h3>
            <div className="pl-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                AstaPasta is optimized for high performance and low resource usage.
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-xs">Memory Usage</span>
                  <span className="text-xs font-medium">128 MB</span>
                </div>
                <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </section>
          
          {/* About */}
          <section>
            <h3 className="text-md font-medium mb-2">About AstaPasta</h3>
            <div className="pl-6 text-sm text-gray-600 dark:text-gray-400">
              <p>Version: 0.1.0</p>
              <p>Engine: Chromium</p>
              <p>Built with React and Framer Motion</p>
              <p className="mt-2">
                AstaPasta is a high-performance, minimalistic browser UI with a focus on 
                customization and efficiency.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;