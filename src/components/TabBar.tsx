import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';

const TabBar: React.FC = () => {
  const { tabs, closeTab, setActiveTab } = useBrowserStore();
  
  return (
    <div className="flex-1 flex overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          className={`
            flex items-center min-w-[120px] max-w-[200px] h-8 px-3 mr-1 rounded-t-lg
            ${tab.isActive 
              ? 'bg-white dark:bg-gray-800 border-b-2 border-blue-500' 
              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
          onClick={() => setActiveTab(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          layout
        >
          {tab.favicon && (
            <img src={tab.favicon} alt="" className="w-4 h-4 mr-2" />
          )}
          <span className="flex-1 truncate text-sm">{tab.title}</span>
          <button
            className="ml-2 p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            <X size={12} />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default TabBar;