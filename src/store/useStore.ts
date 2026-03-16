import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Language } from '../i18n/translations';

export interface User {
  id: string;
  name: string;
  email: string;
  credits: number;
  plan: 'free' | 'pro' | 'elite';
  createdAt: string;
}

export interface ScanResult {
  id: string;
  brand: string;
  timestamp: string;
  supplyChainScore: number;
  carbonScore: number;
  laborScore: number;
  sentimentScore: number;
  overallScore: number;
  recommendations: string[];
  sources: string[];
  details: {
    supplyChain: string;
    carbon: string;
    labor: string;
    sentiment: string;
  };
}

export interface WatchlistItem {
  id: string;
  brand: string;
  lastScore: number;
  lastUpdated: string;
  alertsEnabled: boolean;
}

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  users: Record<string, { password: string; user: User }>;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  deductCredit: () => boolean;
  
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  
  // Scans
  scans: ScanResult[];
  addScan: (scan: ScanResult) => void;
  
  // Watchlist
  watchlist: WatchlistItem[];
  addToWatchlist: (item: WatchlistItem) => void;
  removeFromWatchlist: (id: string) => void;
  toggleWatchlistAlert: (id: string) => void;
  
  // UI
  showAuthModal: boolean;
  authModalType: 'login' | 'signup';
  setShowAuthModal: (show: boolean, type?: 'login' | 'signup') => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      users: {},
      
      login: (email: string, password: string) => {
        const { users } = get();
        const userData = users[email];
        if (userData && userData.password === password) {
          set({ user: userData.user, isAuthenticated: true, showAuthModal: false });
          return true;
        }
        return false;
      },
      
      signup: (name: string, email: string, password: string) => {
        const { users } = get();
        if (users[email]) {
          return false; // User already exists
        }
        const newUser: User = {
          id: crypto.randomUUID(),
          name,
          email,
          credits: 5, // 5 free credits for new users
          plan: 'free',
          createdAt: new Date().toISOString(),
        };
        set({
          users: { ...users, [email]: { password, user: newUser } },
          user: newUser,
          isAuthenticated: true,
          showAuthModal: false,
        });
        return true;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      updateUser: (updates: Partial<User>) => {
        const { user, users } = get();
        if (user) {
          const updatedUser = { ...user, ...updates };
          set({
            user: updatedUser,
            users: {
              ...users,
              [user.email]: { ...users[user.email], user: updatedUser },
            },
          });
        }
      },
      
      deductCredit: () => {
        const { user } = get();
        if (user && user.credits > 0) {
          get().updateUser({ credits: user.credits - 1 });
          return true;
        }
        return false;
      },
      
      // Language
      language: 'tr',
      setLanguage: (lang: Language) => set({ language: lang }),
      
      // Scans
      scans: [],
      addScan: (scan: ScanResult) => {
        set((state) => ({ scans: [scan, ...state.scans].slice(0, 50) }));
      },
      
      // Watchlist
      watchlist: [],
      addToWatchlist: (item: WatchlistItem) => {
        set((state) => {
          if (state.watchlist.find((w) => w.brand === item.brand)) return state;
          return { watchlist: [...state.watchlist, item] };
        });
      },
      removeFromWatchlist: (id: string) => {
        set((state) => ({
          watchlist: state.watchlist.filter((w) => w.id !== id),
        }));
      },
      toggleWatchlistAlert: (id: string) => {
        set((state) => ({
          watchlist: state.watchlist.map((w) =>
            w.id === id ? { ...w, alertsEnabled: !w.alertsEnabled } : w
          ),
        }));
      },
      
      // UI
      showAuthModal: false,
      authModalType: 'login',
      setShowAuthModal: (show: boolean, type?: 'login' | 'signup') => {
        set({ showAuthModal: show, authModalType: type || 'login' });
      },
    }),
    {
      name: 'ozscan-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        users: state.users,
        language: state.language,
        scans: state.scans,
        watchlist: state.watchlist,
      }),
    }
  )
);
