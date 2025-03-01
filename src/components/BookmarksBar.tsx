import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Star, Folder } from 'lucide-react';
import { useBrowserStore } from '../store/browserStore';

const BookmarksBar: React.FC = () => {
  const { bookmarks, addBookmark } = useBrowserStore();
  
  // Sample bookmarks if none exist
  const displayBookmarks = bookmarks.length > 0 ? bookmarks : [
    { id: '1', title: 'Google', url: 'https://google.com' },
    { id: '2', title: 'YouTube', url: 'https://youtube.com' },
    { id: '3', title: 'GitHub', url: 'https://github.com' },
  ];
  
  return (
    <motion.div 
      className="flex items-center px-2 py-1 space-x-2 bg-gray-50 dark:bg-gray-800 text-sm"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
        <Bookmark size={14} />
        <span>Bookmarks</span>
      </div>
      
      <div className="h-4 border-r border-gray-300 dark:border-gray-600" />
      
      <div className="flex-1 flex items-center space-x-4 overflow-x-auto">
        {displayBookmarks.map((bookmark) => (
          <motion.a
            key={bookmark.id}
            href={bookmark.url}
            className="flex items-center space-x-1 hover:text-blue-500 whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Star size={14} />
            <span>{bookmark.title}</span>
          </motion.a>
        ))}
      </div>
      
      <button 
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => {
          // Add current page as bookmark (simplified)
          addBookmark({
            title: 'New Bookmark',
            url: 'https://example.com',
          });
        }}
      >
        <Star size={14} />
      </button>
      
      <button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
        <Folder size={14} />
      </button>
    </motion.div>
  );
};

export default BookmarksBar;