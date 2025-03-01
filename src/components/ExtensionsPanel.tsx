import React from 'react';
import { X, ToggleLeft, ToggleRight } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';
import { Extension } from '../types';

interface ExtensionsPanelProps {
  onClose: () => void;
}

const ExtensionsPanel: React.FC<ExtensionsPanelProps> = ({ onClose }) => {
  const { extensions } = useBrowserStore();
  
  const toggleExtension = (extension: Extension) => {
    // In a real implementation, this would update the extension state
    console.log('Toggle extension:', extension.name);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
        <h2 className="text-lg font-semibold">Extensions</h2>
        <button 
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {extensions.map((extension) => (
          <div 
            key={extension.id}
            className="flex items-center justify-between p-3 mb-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                {extension.icon.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium">{extension.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {extension.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
            </div>
            
            <button 
              className="text-blue-500"
              onClick={() => toggleExtension(extension)}
            >
              {extension.isActive ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
            </button>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="font-medium mb-2">Install New Extension</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Browse the extension store to find and install new extensions.
          </p>
          <button className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
            Open Extension Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtensionsPanel;