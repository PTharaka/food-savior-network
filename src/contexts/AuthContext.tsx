
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  businessName?: string;
  businessType?: string;
} | null;

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, businessName: string, businessType: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('wastewise_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate authentication API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check for demo credentials
      if (email === 'demo@wastewise.com' && password === 'demo123') {
        const demoUser = {
          id: 'user_demo',
          email: 'demo@wastewise.com',
          businessName: 'Demo Restaurant',
          businessType: 'restaurant'
        };
        setUser(demoUser);
        localStorage.setItem('wastewise_user', JSON.stringify(demoUser));
        return;
      }
      
      // In a real app, validate credentials with backend
      // For demo, any email with password longer than 6 chars works
      if (password.length >= 6) {
        const newUser = {
          id: `user_${Date.now()}`,
          email,
          businessName: 'Demo Business'
        };
        setUser(newUser);
        localStorage.setItem('wastewise_user', JSON.stringify(newUser));
      } else {
        throw new Error('Invalid credentials');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, businessName: string, businessType: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        businessName,
        businessType
      };
      setUser(newUser);
      localStorage.setItem('wastewise_user', JSON.stringify(newUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('wastewise_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isLoading, 
        login, 
        signup, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
