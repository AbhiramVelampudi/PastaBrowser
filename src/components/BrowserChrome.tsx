import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, X, ChevronLeft, ChevronRight, RefreshCw, Home, 
  BookOpen, Settings, Menu, Search, Shield, Moon, Sun
} from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';
import TabBar from './TabBar';
import AddressBar from './AddressBar';
import BrowserContent from './BrowserContent';
import BookmarksBar from './BookmarksBar';
import ExtensionsPanel from './ExtensionsPanel';
import SettingsPanel from './SettingsPanel';

const BrowserChrome: React.FC = () => {
  const { 
    tabs, 
    addTab, 
    settings,
    updateSettings
  } = useBrowserStore();
  
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
    updateSettings({ theme: newTheme });
  };

  return (
    <div className={`h-screen flex flex-col ${settings.theme === 'dark' ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Top Chrome */}
      <motion.div 
        className="flex flex-col border-b dark:border-gray-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tab Bar */}
        <div className="flex items-center px-2 pt-1">
          <TabBar />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-1 ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => addTab('about:blank')}
          >
            <Plus size={16} />
          </motion.button>
        </div>
        
        {/* Navigation Bar */}
        <div className="flex items-center px-2 py-1 space-x-2">
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ChevronRight size={18} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <RefreshCw size={18} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Home size={18} />
          </button>
          
          <AddressBar />
          
          <button 
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowBookmarks(!showBookmarks)}
          >
            <BookOpen size={18} />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={toggleTheme}
          >
            {settings.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowExtensions(!showExtensions)}
          >
            <Shield size={18} />
          </button>
          <button 
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings size={18} />
          </button>
          <button className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <Menu size={18} />
          </button>
        </div>
        
        {/* Bookmarks Bar (conditionally rendered) */}
        {showBookmarks && <BookmarksBar />}
      </motion.div>
      
      {/* Browser Content */}
      <div className="flex-1 relative overflow-hidden">
        <BrowserContent />
        
        {/* Panels */}
        {showExtensions && (
          <motion.div 
            className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-10"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ExtensionsPanel onClose={() => setShowExtensions(false)} />
          </motion.div>
        )}
        
        {showSettings && (
          <motion.div 
            className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg z-10"
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: 300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <SettingsPanel onClose={() => setShowSettings(false)} />
          </motion.div>
        )}
      </div>
      
      {/* Status Bar */}
      <motion.div 
        className="h-6 px-2 flex items-center justify-between text-xs bg-gray-100 dark:bg-gray-800 border-t dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <div>AstaPasta Browser v0.1.0</div>
        <div className="flex items-center space-x-2">
          <Shield size={12} />
          <span>Secure Connection</span>
        </div>
      </motion.div>
    </div>
  );
};

export default BrowserChrome;