import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';

const AddressBar: React.FC = () => {
  const { tabs, activeTabId, updateTab, settings } = useBrowserStore();
  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs.find(tab => tab.isActive);
  
  const [inputValue, setInputValue] = useState(activeTab?.url || '');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeTab) return;
    
    let url = inputValue.trim();
    
    // Check if it's a URL or a search term
    if (!url.includes('.') || url.includes(' ')) {
      // It's a search term
      url = `${settings.defaultSearchEngine}${encodeURIComponent(url)}`;
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      // Add https:// if missing
      url = `https://${url}`;
    }
    
    updateTab(activeTab.id, { 
      url, 
      isLoading: true,
      title: url
    });
    
    // Simulate loading
    setTimeout(() => {
      updateTab(activeTab.id, { 
        isLoading: false,
        title: url.includes('google.com/search') ? `Search - ${url.split('q=')[1]}` : url.replace('https://', '')
      });
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex-1 relative">
      <div className="flex items-center w-full h-8 px-3 bg-gray-100 dark:bg-gray-700 rounded-full">
        <Search size={16} className="text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 ml-2 bg-transparent outline-none text-sm"
          placeholder="Search or enter website name"
        />
      </div>
    </form>
  );
};

export default AddressBar;