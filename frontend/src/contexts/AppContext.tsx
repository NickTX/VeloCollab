import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAuthenticated: boolean;
}

interface AppState {
  user: User | null;
  isLoading: boolean;
  sidebarOpen: boolean;
  theme: 'light' | 'dark';
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
}

interface AppContextType {
  state: AppState;

  // User actions
  setUser: (user: User | null) => void;
  login: (user: Omit<User, 'isAuthenticated'>) => void;
  logout: () => void;

  // UI actions
  setLoading: (loading: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;

  // Notification actions
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

// Initial state
const initialState: AppState = {
  user: null,
  isLoading: false,
  sidebarOpen: false,
  theme: 'light',
  notifications: [],
};

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  // Load persisted state from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('velocollab-theme') as 'light' | 'dark' | null;
      const savedUser = localStorage.getItem('velocollab-user');

      setState(prevState => ({
        ...prevState,
        theme: savedTheme || 'light',
        user: savedUser ? JSON.parse(savedUser) : null,
      }));
    } catch (error) {
      console.error('Error loading persisted state:', error);
    }
  }, []);

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem('velocollab-theme', state.theme);
    // Apply theme to document
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  // Persist user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('velocollab-user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('velocollab-user');
    }
  }, [state.user]);

  // User actions
  const setUser = (user: User | null) => {
    setState(prevState => ({ ...prevState, user }));
  };

  const login = (userData: Omit<User, 'isAuthenticated'>) => {
    const user: User = { ...userData, isAuthenticated: true };
    setState(prevState => ({ ...prevState, user }));
  };

  const logout = () => {
    setState(prevState => ({ ...prevState, user: null }));
    localStorage.removeItem('velocollab-user');
  };

  // UI actions
  const setLoading = (isLoading: boolean) => {
    setState(prevState => ({ ...prevState, isLoading }));
  };

  const setSidebarOpen = (sidebarOpen: boolean) => {
    setState(prevState => ({ ...prevState, sidebarOpen }));
  };

  const toggleSidebar = () => {
    setState(prevState => ({ ...prevState, sidebarOpen: !prevState.sidebarOpen }));
  };

  const setTheme = (theme: 'light' | 'dark') => {
    setState(prevState => ({ ...prevState, theme }));
  };

  const toggleTheme = () => {
    setState(prevState => ({
      ...prevState,
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  // Notification actions
  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp'>) => {
    const notification: Notification = {
      ...notificationData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };

    setState(prevState => ({
      ...prevState,
      notifications: [...prevState.notifications, notification],
    }));

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setState(prevState => ({
      ...prevState,
      notifications: prevState.notifications.filter(notification => notification.id !== id),
    }));
  };

  const clearNotifications = () => {
    setState(prevState => ({ ...prevState, notifications: [] }));
  };

  const contextValue: AppContextType = {
    state,
    setUser,
    login,
    logout,
    setLoading,
    setSidebarOpen,
    toggleSidebar,
    setTheme,
    toggleTheme,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the app context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Convenience hooks for specific parts of the state
export const useUser = () => {
  const { state, login, logout, setUser } = useApp();
  return {
    user: state.user,
    isAuthenticated: !!state.user?.isAuthenticated,
    login,
    logout,
    setUser,
  };
};

export const useNotifications = () => {
  const { state, addNotification, removeNotification, clearNotifications } = useApp();
  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };
};

export const useTheme = () => {
  const { state, setTheme, toggleTheme } = useApp();
  return {
    theme: state.theme,
    setTheme,
    toggleTheme,
    isDark: state.theme === 'dark',
  };
};

export const useUI = () => {
  const { state, setLoading, setSidebarOpen, toggleSidebar } = useApp();
  return {
    isLoading: state.isLoading,
    sidebarOpen: state.sidebarOpen,
    setLoading,
    setSidebarOpen,
    toggleSidebar,
  };
};
