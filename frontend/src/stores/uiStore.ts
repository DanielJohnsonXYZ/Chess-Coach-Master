import { create } from 'zustand';

interface UIState {
  theme: 'light' | 'dark';
  currentPage: 'dashboard' | 'play' | 'review' | 'profile';
  showHints: boolean;
  isSidebarOpen: boolean;

  // Actions
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentPage: (page: 'dashboard' | 'play' | 'review' | 'profile') => void;
  toggleHints: () => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  theme: 'dark',
  currentPage: 'dashboard',
  showHints: false,
  isSidebarOpen: true,

  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light';
    set({ theme: newTheme });
    localStorage.setItem('theme', newTheme);

    // Update document class for Tailwind dark mode
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  },

  toggleHints: () => {
    set({ showHints: !get().showHints });
  },

  toggleSidebar: () => {
    set({ isSidebarOpen: !get().isSidebarOpen });
  },
}));
