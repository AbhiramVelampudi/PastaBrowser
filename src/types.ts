export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  isActive: boolean;
  isLoading: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
  folderId?: string;
}

export interface BookmarkFolder {
  id: string;
  name: string;
  parentId?: string;
}

export interface Extension {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
}

export interface BrowserSettings {
  theme: 'light' | 'dark' | 'system';
  enableParallax: boolean;
  defaultSearchEngine: string;
  startPage: string;
  enableAdBlock: boolean;
  enableTrackerBlocking: boolean;
  enableCookieControl: boolean;
}