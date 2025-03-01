import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useBrowserStore } from '../store/browserStore';

// Define NewTabPage component before using it
const NewTabPage: React.FC = () => {
  const { addTab } = useBrowserStore();
  
  const quickLinks = [
    { name: 'Google', url: 'https://google.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'GitHub', url: 'https://github.com' },
    { name: 'Twitter', url: 'https://twitter.com' },
    { name: 'Reddit', url: 'https://reddit.com' },
    { name: 'Netflix', url: 'https://netflix.com' },
  ];
  
  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          AstaPasta
        </h1>
        <p className="text-gray-600 dark:text-gray-300">High Performance. Minimalistic. Customizable.</p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-2xl"
      >
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center cursor-pointer"
              onClick={() => addTab(link.url, link.name)}
            >
              <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-2">
                {link.name.charAt(0)}
              </div>
              <span className="text-sm">{link.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center text-sm text-gray-500 dark:text-gray-400 mt-auto"
      >
        <p>AstaPasta Browser v0.1.0 - Chromium Based</p>
        <p>Optimized for speed and minimal resource usage</p>
      </motion.div>
    </div>
  );
};

const BrowserContent: React.FC = () => {
  const { tabs, activeTabId, settings } = useBrowserStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs.find(tab => tab.isActive);
  
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: contentRef });
  
  // Parallax effect for the background
  const bgY = useTransform(scrollY, [0, 300], [0, -50]);
  
  // Determine what to display based on the URL
  const renderContent = () => {
    if (!activeTab) return null;
    
    if (activeTab.url === 'about:blank') {
      return <NewTabPage />;
    }
    
    // Simulate a web page
    return (
      <div className="relative">
        {settings.enableParallax && (
          <motion.div 
            className="absolute inset-0 z-0 overflow-hidden"
            style={{ y: bgY }}
          >
            <div className="h-[120%] w-full bg-gradient-to-b from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 opacity-50" />
          </motion.div>
        )}
        
        <div className="relative z-10 min-h-screen p-6">
          <h1 className="text-2xl font-bold mb-4">{activeTab.title}</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <p className="mb-4">You are viewing a simulated page at: {activeTab.url}</p>
            <p>AstaPasta Browser is a high-performance, minimalistic browser UI concept.</p>
          </div>
          
          {/* Simulated content */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Section {i + 1}</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div 
      ref={contentRef}
      className="h-full overflow-y-auto"
    >
      {activeTab?.isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        renderContent()
      )}
    </div>
  );
};

export default BrowserContent;