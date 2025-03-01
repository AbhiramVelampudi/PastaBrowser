import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Tab, Bookmark, BookmarkFolder, Extension, BrowserSettings } from '../types';

interface BrowserState {
  tabs: Tab[];
  bookmarks: Bookmark[];
  bookmarkFolders: BookmarkFolder[];
  extensions: Extension[];
  settings: BrowserSettings;
  activeTabId: string | null;
  
  // Tab actions
  addTab: (url: string, title?: string) => void;
  closeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  updateTab: (id: string, updates: Partial<Tab>) => void;
  
  // Bookmark actions
  addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
  removeBookmark: (id: string) => void;
  
  // Settings actions
  updateSettings: (settings: Partial<BrowserSettings>) => void;
}

// Generate a unique ID
const generateId = () => Math.random().toString(36).substring(2, 9);

// Default settings
const defaultSettings: BrowserSettings = {
  theme: 'system',
  enableParallax: true,
  defaultSearchEngine: 'https://www.google.com/search?q=',
  startPage: 'about:blank',
  enableAdBlock: true,
  enableTrackerBlocking: true,
  enableCookieControl: true,
};

// Sample extensions
const defaultExtensions: Extension[] = [
  {
    id: 'adblock-plus',
    name: 'AdBlock Plus',
    icon: 'shield',
    isActive: true,
  },
  {
    id: 'dark-reader',
    name: 'Dark Reader',
    icon: 'moon',
    isActive: true,
  },
  {
    id: 'password-manager',
    name: 'Password Manager',
    icon: 'key',
    isActive: true,
  },
];

export const useBrowserStore = create<BrowserState>()(
  persist(
    (set) => ({
      tabs: [
        {
          id: generateId(),
          title: 'New Tab',
          url: 'about:blank',
          isActive: true,
          isLoading: false,
        },
      ],
      bookmarks: [],
      bookmarkFolders: [
        {
          id: 'root',
          name: 'Bookmarks',
        },
      ],
      extensions: defaultExtensions,
      settings: defaultSettings,
      activeTabId: null,
      
      addTab: (url, title = 'New Tab') => {
        const newTab: Tab = {
          id: generateId(),
          title,
          url,
          isActive: true,
          isLoading: true,
        };
        
        set((state) => ({
          tabs: state.tabs.map(tab => ({
            ...tab,
            isActive: false,
          })).concat(newTab),
          activeTabId: newTab.id,
        }));
      },
      
      closeTab: (id) => {
        set((state) => {
          const tabIndex = state.tabs.findIndex(tab => tab.id === id);
          if (state.tabs.length === 1) {
            // If it's the last tab, create a new one
            return {
              tabs: [
                {
                  id: generateId(),
                  title: 'New Tab',
                  url: 'about:blank',
                  isActive: true,
                  isLoading: false,
                },
              ],
            };
          }
          
          const newTabs = state.tabs.filter(tab => tab.id !== id);
          
          // If we're closing the active tab, activate the next one or the previous one
          if (state.tabs[tabIndex].isActive) {
            const newActiveIndex = tabIndex === state.tabs.length - 1 ? tabIndex - 1 : tabIndex;
            newTabs[newActiveIndex].isActive = true;
            return {
              tabs: newTabs,
              activeTabId: newTabs[newActiveIndex].id,
            };
          }
          
          return { tabs: newTabs };
        });
      },
      
      setActiveTab: (id) => {
        set((state) => ({
          tabs: state.tabs.map(tab => ({
            ...tab,
            isActive: tab.id === id,
          })),
          activeTabId: id,
        }));
      },
      
      updateTab: (id, updates) => {
        set((state) => ({
          tabs: state.tabs.map(tab => 
            tab.id === id ? { ...tab, ...updates } : tab
          ),
        }));
      },
      
      addBookmark: (bookmark) => {
        const newBookmark: Bookmark = {
          ...bookmark,
          id: generateId(),
        };
        
        set((state) => ({
          bookmarks: [...state.bookmarks, newBookmark],
        }));
      },
      
      removeBookmark: (id) => {
        set((state) => ({
          bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== id),
        }));
      },
      
      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
          },
        }));
      },
    }),
    {
      name: 'astapasta-browser-storage',
    }
  )
);