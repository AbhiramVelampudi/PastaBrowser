import React, { useEffect } from 'react';
import { useBrowserStore } from './store/browserStore';
import BrowserChrome from './components/BrowserChrome';

function App() {
  const { settings } = useBrowserStore();
  
  // Apply theme to document
  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);
  
  return (
    <div className="h-screen overflow-hidden">
      <BrowserChrome />
    </div>
  );
}

export default App;